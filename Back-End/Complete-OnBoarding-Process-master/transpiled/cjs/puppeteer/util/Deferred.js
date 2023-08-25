"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Deferred = void 0;
const Errors_js_1 = require("../common/Errors.js");
/**
 * Creates and returns a deferred object along with the resolve/reject functions.
 *
 * If the deferred has not been resolved/rejected within the `timeout` period,
 * the deferred gets resolves with a timeout error. `timeout` has to be greater than 0 or
 * it is ignored.
 *
 * @internal
 */
class Deferred {
  #isResolved = false;
  #isRejected = false;
  #value;
  #resolver = () => {};
  #taskPromise = new Promise(resolve => {
    this.#resolver = resolve;
  });
  #timeoutId;
  constructor(opts) {
    this.#timeoutId = opts && opts.timeout > 0 ? setTimeout(() => {
      this.reject(new Errors_js_1.TimeoutError(opts.message));
    }, opts.timeout) : undefined;
  }
  #finish(value) {
    clearTimeout(this.#timeoutId);
    this.#value = value;
    this.#resolver();
  }
  resolve(value) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isResolved = true;
    this.#finish(value);
  }
  reject(error) {
    if (this.#isRejected || this.#isResolved) {
      return;
    }
    this.#isRejected = true;
    this.#finish(error);
  }
  resolved() {
    return this.#isResolved;
  }
  finished() {
    return this.#isResolved || this.#isRejected;
  }
  value() {
    return this.#value;
  }
  async valueOrThrow() {
    await this.#taskPromise;
    if (this.#isRejected) {
      throw this.#value;
    }
    return this.#value;
  }
  static create(opts) {
    return new Deferred(opts);
  }
  static async race(awaitables) {
    const deferredWithTimeout = new Set();
    try {
      const promises = awaitables.map(value => {
        if (value instanceof Deferred) {
          if (value.#timeoutId) {
            deferredWithTimeout.add(value);
          }
          return value.valueOrThrow();
        }
        return value;
      });
      // eslint-disable-next-line no-restricted-syntax
      return await Promise.race(promises);
    } finally {
      for (const deferred of deferredWithTimeout) {
        // We need to stop the timeout else
        // Node.JS will keep running the event loop till the
        // timer executes
        deferred.reject(new Error('Timeout cleared'));
      }
    }
  }
}
exports.Deferred = Deferred;