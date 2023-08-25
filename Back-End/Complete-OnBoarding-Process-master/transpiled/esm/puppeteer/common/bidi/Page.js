/**
 * Copyright 2022 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Page as PageBase } from '../../api/Page.js';
import { assert } from '../../util/assert.js';
import { Deferred } from '../../util/Deferred.js';
import { Accessibility } from '../Accessibility.js';
import { ConsoleMessage } from '../ConsoleMessage.js';
import { Coverage } from '../Coverage.js';
import { EmulationManager as CDPEmulationManager } from '../EmulationManager.js';
import { TargetCloseError } from '../Errors.js';
import { FrameTree } from '../FrameTree.js';
import { NetworkManagerEmittedEvents } from '../NetworkManager.js';
import { TimeoutSettings } from '../TimeoutSettings.js';
import { Tracing } from '../Tracing.js';
import { debugError, evaluationString, isString, validateDialogType, waitForEvent, waitWithTimeout, withSourcePuppeteerURLIfNone } from '../util.js';
import { BrowsingContextEmittedEvents, CDPSessionWrapper } from './BrowsingContext.js';
import { Dialog } from './Dialog.js';
import { EmulationManager } from './EmulationManager.js';
import { Frame } from './Frame.js';
import { Keyboard, Mouse, Touchscreen } from './Input.js';
import { NetworkManager } from './NetworkManager.js';
import { getBidiHandle } from './Realm.js';
import { BidiSerializer } from './Serializer.js';
/**
 * @internal
 */
export class Page extends PageBase {
  #accessibility;
  #timeoutSettings = new TimeoutSettings();
  #connection;
  #frameTree = new FrameTree();
  #networkManager;
  #viewport = null;
  #closedDeferred = Deferred.create();
  #subscribedEvents = new Map([['log.entryAdded', this.#onLogEntryAdded.bind(this)], ['browsingContext.load', this.#onFrameLoaded.bind(this)], ['browsingContext.domContentLoaded', this.#onFrameDOMContentLoaded.bind(this)], ['browsingContext.navigationStarted', this.#onFrameNavigationStarted.bind(this)], ['browsingContext.userPromptOpened', this.#onDialog.bind(this)]]);
  #networkManagerEvents = new Map([[NetworkManagerEmittedEvents.Request, this.emit.bind(this, "request" /* PageEmittedEvents.Request */)], [NetworkManagerEmittedEvents.RequestServedFromCache, this.emit.bind(this, "requestservedfromcache" /* PageEmittedEvents.RequestServedFromCache */)], [NetworkManagerEmittedEvents.RequestFailed, this.emit.bind(this, "requestfailed" /* PageEmittedEvents.RequestFailed */)], [NetworkManagerEmittedEvents.RequestFinished, this.emit.bind(this, "requestfinished" /* PageEmittedEvents.RequestFinished */)], [NetworkManagerEmittedEvents.Response, this.emit.bind(this, "response" /* PageEmittedEvents.Response */)]]);

  #browsingContextEvents = new Map([[BrowsingContextEmittedEvents.Created, this.#onContextCreated.bind(this)], [BrowsingContextEmittedEvents.Destroyed, this.#onContextDestroyed.bind(this)]]);
  #tracing;
  #coverage;
  #cdpEmulationManager;
  #emulationManager;
  #mouse;
  #touchscreen;
  #keyboard;
  #browsingContext;
  #browserContext;
  _client() {
    return this.mainFrame().context().cdpSession;
  }
  constructor(browsingContext, browserContext) {
    super();
    this.#browsingContext = browsingContext;
    this.#browserContext = browserContext;
    this.#connection = browsingContext.connection;
    for (const [event, subscriber] of this.#browsingContextEvents) {
      this.#browsingContext.on(event, subscriber);
    }
    this.#networkManager = new NetworkManager(this.#connection, this);
    for (const [event, subscriber] of this.#subscribedEvents) {
      this.#connection.on(event, subscriber);
    }
    for (const [event, subscriber] of this.#networkManagerEvents) {
      this.#networkManager.on(event, subscriber);
    }
    const frame = new Frame(this, this.#browsingContext, this.#timeoutSettings, this.#browsingContext.parent);
    this.#frameTree.addFrame(frame);
    this.emit("frameattached" /* PageEmittedEvents.FrameAttached */, frame);
    // TODO: https://github.com/w3c/webdriver-bidi/issues/443
    this.#accessibility = new Accessibility(this.mainFrame().context().cdpSession);
    this.#tracing = new Tracing(this.mainFrame().context().cdpSession);
    this.#coverage = new Coverage(this.mainFrame().context().cdpSession);
    this.#cdpEmulationManager = new CDPEmulationManager(this.mainFrame().context().cdpSession);
    this.#emulationManager = new EmulationManager(browsingContext);
    this.#mouse = new Mouse(this.mainFrame().context());
    this.#touchscreen = new Touchscreen(this.mainFrame().context());
    this.#keyboard = new Keyboard(this.mainFrame().context());
  }
  _setBrowserContext(browserContext) {
    this.#browserContext = browserContext;
  }
  get accessibility() {
    return this.#accessibility;
  }
  get tracing() {
    return this.#tracing;
  }
  get coverage() {
    return this.#coverage;
  }
  get mouse() {
    return this.#mouse;
  }
  get touchscreen() {
    return this.#touchscreen;
  }
  get keyboard() {
    return this.#keyboard;
  }
  browser() {
    return this.browserContext().browser();
  }
  browserContext() {
    return this.#browserContext;
  }
  mainFrame() {
    const mainFrame = this.#frameTree.getMainFrame();
    assert(mainFrame, 'Requesting main frame too early!');
    return mainFrame;
  }
  frames() {
    return Array.from(this.#frameTree.frames());
  }
  frame(frameId) {
    return this.#frameTree.getById(frameId ?? '') || null;
  }
  childFrames(frameId) {
    return this.#frameTree.childFrames(frameId);
  }
  #onFrameLoaded(info) {
    const frame = this.frame(info.context);
    if (frame && this.mainFrame() === frame) {
      this.emit("load" /* PageEmittedEvents.Load */);
    }
  }

  #onFrameDOMContentLoaded(info) {
    const frame = this.frame(info.context);
    if (frame && this.mainFrame() === frame) {
      this.emit("domcontentloaded" /* PageEmittedEvents.DOMContentLoaded */);
    }
  }

  #onContextCreated(context) {
    if (!this.frame(context.id) && (this.frame(context.parent ?? '') || !this.#frameTree.getMainFrame())) {
      const frame = new Frame(this, context, this.#timeoutSettings, context.parent);
      this.#frameTree.addFrame(frame);
      if (frame !== this.mainFrame()) {
        this.emit("frameattached" /* PageEmittedEvents.FrameAttached */, frame);
      }
    }
  }
  async #onFrameNavigationStarted(info) {
    const frameId = info.context;
    const frame = this.frame(frameId);
    if (frame) {
      // TODO: Investigate if a navigationCompleted event should be in Spec
      const predicate = event => {
        if (event.context === frame?._id) {
          return true;
        }
        return false;
      };
      await Deferred.race([waitForEvent(this.#connection, 'browsingContext.domContentLoaded', predicate, 0, this.#closedDeferred.valueOrThrow()).catch(debugError), waitForEvent(this.#connection, 'browsingContext.fragmentNavigated', predicate, 0, this.#closedDeferred.valueOrThrow()).catch(debugError)]);
      this.emit("framenavigated" /* PageEmittedEvents.FrameNavigated */, frame);
    }
  }
  #onContextDestroyed(context) {
    const frame = this.frame(context.id);
    if (frame) {
      if (frame === this.mainFrame()) {
        this.emit("close" /* PageEmittedEvents.Close */);
      }

      this.#removeFramesRecursively(frame);
    }
  }
  #removeFramesRecursively(frame) {
    for (const child of frame.childFrames()) {
      this.#removeFramesRecursively(child);
    }
    frame.dispose();
    this.#networkManager.clearMapAfterFrameDispose(frame);
    this.#frameTree.removeFrame(frame);
    this.emit("framedetached" /* PageEmittedEvents.FrameDetached */, frame);
  }
  #onLogEntryAdded(event) {
    const frame = this.frame(event.source.context);
    if (!frame) {
      return;
    }
    if (isConsoleLogEntry(event)) {
      const args = event.args.map(arg => {
        return getBidiHandle(frame.context(), arg, frame);
      });
      const text = args.reduce((value, arg) => {
        const parsedValue = arg.isPrimitiveValue ? BidiSerializer.deserialize(arg.remoteValue()) : arg.toString();
        return `${value} ${parsedValue}`;
      }, '').slice(1);
      this.emit("console" /* PageEmittedEvents.Console */, new ConsoleMessage(event.method, text, args, getStackTraceLocations(event.stackTrace)));
    } else if (isJavaScriptLogEntry(event)) {
      let message = event.text ?? '';
      if (event.stackTrace) {
        for (const callFrame of event.stackTrace.callFrames) {
          const location = callFrame.url + ':' + callFrame.lineNumber + ':' + callFrame.columnNumber;
          const functionName = callFrame.functionName || '<anonymous>';
          message += `\n    at ${functionName} (${location})`;
        }
      }
      const error = new Error(message);
      error.stack = ''; // Don't capture Puppeteer stacktrace.
      this.emit("pageerror" /* PageEmittedEvents.PageError */, error);
    } else {
      debugError(`Unhandled LogEntry with type "${event.type}", text "${event.text}" and level "${event.level}"`);
    }
  }
  #onDialog(event) {
    const frame = this.frame(event.context);
    if (!frame) {
      return;
    }
    const type = validateDialogType(event.type);
    const dialog = new Dialog(frame.context(), type, event.message);
    this.emit("dialog" /* PageEmittedEvents.Dialog */, dialog);
  }
  getNavigationResponse(id) {
    return this.#networkManager.getNavigationResponse(id);
  }
  isClosed() {
    return this.#closedDeferred.finished();
  }
  async close() {
    if (this.#closedDeferred.finished()) {
      return;
    }
    this.#closedDeferred.resolve(new TargetCloseError('Page closed!'));
    this.#networkManager.dispose();
    await this.#connection.send('browsingContext.close', {
      context: this.mainFrame()._id
    });
    this.emit("close" /* PageEmittedEvents.Close */);
    this.removeAllListeners();
  }
  async evaluateHandle(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
    return this.mainFrame().evaluateHandle(pageFunction, ...args);
  }
  async evaluate(pageFunction, ...args) {
    pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
    return this.mainFrame().evaluate(pageFunction, ...args);
  }
  async goto(url, options) {
    return this.mainFrame().goto(url, options);
  }
  async reload(options) {
    const [response] = await Promise.all([this.waitForResponse(response => {
      return response.request().isNavigationRequest() && response.url() === this.url();
    }), this.mainFrame().context().reload({
      ...options,
      timeout: options?.timeout ?? this.#timeoutSettings.navigationTimeout()
    })]);
    return response;
  }
  url() {
    return this.mainFrame().url();
  }
  setDefaultNavigationTimeout(timeout) {
    this.#timeoutSettings.setDefaultNavigationTimeout(timeout);
  }
  setDefaultTimeout(timeout) {
    this.#timeoutSettings.setDefaultTimeout(timeout);
  }
  getDefaultTimeout() {
    return this.#timeoutSettings.timeout();
  }
  async setContent(html, options = {}) {
    await this.mainFrame().setContent(html, options);
  }
  async content() {
    return this.mainFrame().content();
  }
  isJavaScriptEnabled() {
    return this.#cdpEmulationManager.javascriptEnabled;
  }
  async setGeolocation(options) {
    return await this.#cdpEmulationManager.setGeolocation(options);
  }
  async setJavaScriptEnabled(enabled) {
    return await this.#cdpEmulationManager.setJavaScriptEnabled(enabled);
  }
  async emulateMediaType(type) {
    return await this.#cdpEmulationManager.emulateMediaType(type);
  }
  async emulateCPUThrottling(factor) {
    return await this.#cdpEmulationManager.emulateCPUThrottling(factor);
  }
  async emulateMediaFeatures(features) {
    return await this.#cdpEmulationManager.emulateMediaFeatures(features);
  }
  async emulateTimezone(timezoneId) {
    return await this.#cdpEmulationManager.emulateTimezone(timezoneId);
  }
  async emulateIdleState(overrides) {
    return await this.#cdpEmulationManager.emulateIdleState(overrides);
  }
  async emulateVisionDeficiency(type) {
    return await this.#cdpEmulationManager.emulateVisionDeficiency(type);
  }
  async setViewport(viewport) {
    if (!this.#browsingContext.supportsCDP()) {
      await this.#emulationManager.emulateViewport(viewport);
      this.#viewport = viewport;
      return;
    }
    const needsReload = await this.#cdpEmulationManager.emulateViewport(viewport);
    this.#viewport = viewport;
    if (needsReload) {
      // TODO: reload seems to hang in BiDi.
      // await this.reload();
    }
  }
  viewport() {
    return this.#viewport;
  }
  async pdf(options = {}) {
    const {
      path = undefined
    } = options;
    const {
      printBackground: background,
      margin,
      landscape,
      width,
      height,
      pageRanges: ranges,
      scale,
      preferCSSPageSize,
      timeout
    } = this._getPDFOptions(options, 'cm');
    const pageRanges = ranges ? ranges.split(', ') : [];
    const {
      result
    } = await waitWithTimeout(this.#connection.send('browsingContext.print', {
      context: this.mainFrame()._id,
      background,
      margin,
      orientation: landscape ? 'landscape' : 'portrait',
      page: {
        width,
        height
      },
      pageRanges,
      scale,
      shrinkToFit: !preferCSSPageSize
    }), 'browsingContext.print', timeout);
    const buffer = Buffer.from(result.data, 'base64');
    await this._maybeWriteBufferToFile(path, buffer);
    return buffer;
  }
  async createPDFStream(options) {
    const buffer = await this.pdf(options);
    try {
      const {
        Readable
      } = await import('stream');
      return Readable.from(buffer);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Can only pass a file path in a Node-like environment.');
      }
      throw error;
    }
  }
  async screenshot(options = {}) {
    const {
      path = undefined,
      encoding,
      ...args
    } = options;
    if (Object.keys(args).length >= 1) {
      throw new Error('BiDi only supports "encoding" and "path" options');
    }
    const {
      result
    } = await this.#connection.send('browsingContext.captureScreenshot', {
      context: this.mainFrame()._id
    });
    if (encoding === 'base64') {
      return result.data;
    }
    const buffer = Buffer.from(result.data, 'base64');
    await this._maybeWriteBufferToFile(path, buffer);
    return buffer;
  }
  waitForRequest(urlOrPredicate, options = {}) {
    const {
      timeout = this.#timeoutSettings.timeout()
    } = options;
    return waitForEvent(this.#networkManager, NetworkManagerEmittedEvents.Request, async request => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === request.url();
      }
      if (typeof urlOrPredicate === 'function') {
        return !!(await urlOrPredicate(request));
      }
      return false;
    }, timeout, this.#closedDeferred.valueOrThrow());
  }
  waitForResponse(urlOrPredicate, options = {}) {
    const {
      timeout = this.#timeoutSettings.timeout()
    } = options;
    return waitForEvent(this.#networkManager, NetworkManagerEmittedEvents.Response, async response => {
      if (isString(urlOrPredicate)) {
        return urlOrPredicate === response.url();
      }
      if (typeof urlOrPredicate === 'function') {
        return !!(await urlOrPredicate(response));
      }
      return false;
    }, timeout, this.#closedDeferred.valueOrThrow());
  }
  async waitForNetworkIdle(options = {}) {
    const {
      idleTime = 500,
      timeout = this.#timeoutSettings.timeout()
    } = options;
    await this._waitForNetworkIdle(this.#networkManager, idleTime, timeout, this.#closedDeferred);
  }
  title() {
    return this.mainFrame().title();
  }
  async createCDPSession() {
    const {
      sessionId
    } = await this.mainFrame().context().cdpSession.send('Target.attachToTarget', {
      targetId: this.mainFrame()._id,
      flatten: true
    });
    return new CDPSessionWrapper(this.mainFrame().context(), sessionId);
  }
  async bringToFront() {
    await this.#connection.send('browsingContext.activate', {
      context: this.mainFrame()._id
    });
  }
  async evaluateOnNewDocument(pageFunction, ...args) {
    const expression = evaluationExpression(pageFunction, ...args);
    const {
      result
    } = await this.#connection.send('script.addPreloadScript', {
      functionDeclaration: expression
      // TODO: should change spec to accept browsingContext
    });

    return {
      identifier: result.script
    };
  }
  async removeScriptToEvaluateOnNewDocument(id) {
    await this.#connection.send('script.removePreloadScript', {
      script: id
    });
  }
}
function isConsoleLogEntry(event) {
  return event.type === 'console';
}
function isJavaScriptLogEntry(event) {
  return event.type === 'javascript';
}
function getStackTraceLocations(stackTrace) {
  const stackTraceLocations = [];
  if (stackTrace) {
    for (const callFrame of stackTrace.callFrames) {
      stackTraceLocations.push({
        url: callFrame.url,
        lineNumber: callFrame.lineNumber,
        columnNumber: callFrame.columnNumber
      });
    }
  }
  return stackTraceLocations;
}
function evaluationExpression(fun, ...args) {
  return `() => {${evaluationString(fun, ...args)}}`;
}