var n = function (t, r) {
  return n = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (n, t) {
    n.__proto__ = t;
  } || function (n, t) {
    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
  }, n(t, r);
};
function t(t, r) {
  if ("function" != typeof r && null !== r) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null");
  function e() {
    this.constructor = t;
  }
  n(t, r), t.prototype = null === r ? Object.create(r) : (e.prototype = r.prototype, new e());
}
function r(n, t, r, e) {
  return new (r || (r = Promise))(function (o, i) {
    function u(n) {
      try {
        s(e.next(n));
      } catch (n) {
        i(n);
      }
    }
    function c(n) {
      try {
        s(e.throw(n));
      } catch (n) {
        i(n);
      }
    }
    function s(n) {
      var t;
      n.done ? o(n.value) : (t = n.value, t instanceof r ? t : new r(function (n) {
        n(t);
      })).then(u, c);
    }
    s((e = e.apply(n, t || [])).next());
  });
}
function e(n, t) {
  var r,
    e,
    o,
    i,
    u = {
      label: 0,
      sent: function () {
        if (1 & o[0]) throw o[1];
        return o[1];
      },
      trys: [],
      ops: []
    };
  return i = {
    next: c(0),
    throw: c(1),
    return: c(2)
  }, "function" == typeof Symbol && (i[Symbol.iterator] = function () {
    return this;
  }), i;
  function c(c) {
    return function (s) {
      return function (c) {
        if (r) throw new TypeError("Generator is already executing.");
        for (; i && (i = 0, c[0] && (u = 0)), u;) try {
          if (r = 1, e && (o = 2 & c[0] ? e.return : c[0] ? e.throw || ((o = e.return) && o.call(e), 0) : e.next) && !(o = o.call(e, c[1])).done) return o;
          switch (e = 0, o && (c = [2 & c[0], o.value]), c[0]) {
            case 0:
            case 1:
              o = c;
              break;
            case 4:
              return u.label++, {
                value: c[1],
                done: !1
              };
            case 5:
              u.label++, e = c[1], c = [0];
              continue;
            case 7:
              c = u.ops.pop(), u.trys.pop();
              continue;
            default:
              if (!(o = u.trys, (o = o.length > 0 && o[o.length - 1]) || 6 !== c[0] && 2 !== c[0])) {
                u = 0;
                continue;
              }
              if (3 === c[0] && (!o || c[1] > o[0] && c[1] < o[3])) {
                u.label = c[1];
                break;
              }
              if (6 === c[0] && u.label < o[1]) {
                u.label = o[1], o = c;
                break;
              }
              if (o && u.label < o[2]) {
                u.label = o[2], u.ops.push(c);
                break;
              }
              o[2] && u.ops.pop(), u.trys.pop();
              continue;
          }
          c = t.call(n, u);
        } catch (n) {
          c = [6, n], e = 0;
        } finally {
          r = o = 0;
        }
        if (5 & c[0]) throw c[1];
        return {
          value: c[0] ? c[1] : void 0,
          done: !0
        };
      }([c, s]);
    };
  }
}
function o(n) {
  var t = "function" == typeof Symbol && Symbol.iterator,
    r = t && n[t],
    e = 0;
  if (r) return r.call(n);
  if (n && "number" == typeof n.length) return {
    next: function () {
      return n && e >= n.length && (n = void 0), {
        value: n && n[e++],
        done: !n
      };
    }
  };
  throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function i(n, t) {
  var r = "function" == typeof Symbol && n[Symbol.iterator];
  if (!r) return n;
  var e,
    o,
    i = r.call(n),
    u = [];
  try {
    for (; (void 0 === t || t-- > 0) && !(e = i.next()).done;) u.push(e.value);
  } catch (n) {
    o = {
      error: n
    };
  } finally {
    try {
      e && !e.done && (r = i.return) && r.call(i);
    } finally {
      if (o) throw o.error;
    }
  }
  return u;
}
function u(n, t, r) {
  if (r || 2 === arguments.length) for (var e, o = 0, i = t.length; o < i; o++) !e && o in t || (e || (e = Array.prototype.slice.call(t, 0, o)), e[o] = t[o]);
  return n.concat(e || Array.prototype.slice.call(t));
}
function c(n) {
  return this instanceof c ? (this.v = n, this) : new c(n);
}
function s(n, t, r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e,
    o = r.apply(n, t || []),
    i = [];
  return e = {}, u("next"), u("throw"), u("return"), e[Symbol.asyncIterator] = function () {
    return this;
  }, e;
  function u(n) {
    o[n] && (e[n] = function (t) {
      return new Promise(function (r, e) {
        i.push([n, t, r, e]) > 1 || s(n, t);
      });
    });
  }
  function s(n, t) {
    try {
      (r = o[n](t)).value instanceof c ? Promise.resolve(r.value.v).then(l, a) : f(i[0][2], r);
    } catch (n) {
      f(i[0][3], n);
    }
    var r;
  }
  function l(n) {
    s("next", n);
  }
  function a(n) {
    s("throw", n);
  }
  function f(n, t) {
    n(t), i.shift(), i.length && s(i[0][0], i[0][1]);
  }
}
function l(n) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var t,
    r = n[Symbol.asyncIterator];
  return r ? r.call(n) : (n = o(n), t = {}, e("next"), e("throw"), e("return"), t[Symbol.asyncIterator] = function () {
    return this;
  }, t);
  function e(r) {
    t[r] = n[r] && function (t) {
      return new Promise(function (e, o) {
        (function (n, t, r, e) {
          Promise.resolve(e).then(function (t) {
            n({
              value: t,
              done: r
            });
          }, t);
        })(e, o, (t = n[r](t)).done, t.value);
      });
    };
  }
}
function a(n) {
  return "function" == typeof n;
}
function f(n) {
  var t = n(function (n) {
    Error.call(n), n.stack = new Error().stack;
  });
  return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t;
}
"function" == typeof SuppressedError && SuppressedError;
var h = f(function (n) {
  return function (t) {
    n(this), this.message = t ? t.length + " errors occurred during unsubscription:\n" + t.map(function (n, t) {
      return t + 1 + ") " + n.toString();
    }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = t;
  };
});
function p(n, t) {
  if (n) {
    var r = n.indexOf(t);
    0 <= r && n.splice(r, 1);
  }
}
var v = function () {
  function n(n) {
    this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null;
  }
  var t;
  return n.prototype.unsubscribe = function () {
    var n, t, r, e, c;
    if (!this.closed) {
      this.closed = !0;
      var s = this._parentage;
      if (s) if (this._parentage = null, Array.isArray(s)) try {
        for (var l = o(s), f = l.next(); !f.done; f = l.next()) {
          f.value.remove(this);
        }
      } catch (t) {
        n = {
          error: t
        };
      } finally {
        try {
          f && !f.done && (t = l.return) && t.call(l);
        } finally {
          if (n) throw n.error;
        }
      } else s.remove(this);
      var p = this.initialTeardown;
      if (a(p)) try {
        p();
      } catch (n) {
        c = n instanceof h ? n.errors : [n];
      }
      var v = this._finalizers;
      if (v) {
        this._finalizers = null;
        try {
          for (var d = o(v), y = d.next(); !y.done; y = d.next()) {
            var m = y.value;
            try {
              b(m);
            } catch (n) {
              c = null != c ? c : [], n instanceof h ? c = u(u([], i(c)), i(n.errors)) : c.push(n);
            }
          }
        } catch (n) {
          r = {
            error: n
          };
        } finally {
          try {
            y && !y.done && (e = d.return) && e.call(d);
          } finally {
            if (r) throw r.error;
          }
        }
      }
      if (c) throw new h(c);
    }
  }, n.prototype.add = function (t) {
    var r;
    if (t && t !== this) if (this.closed) b(t);else {
      if (t instanceof n) {
        if (t.closed || t._hasParent(this)) return;
        t._addParent(this);
      }
      (this._finalizers = null !== (r = this._finalizers) && void 0 !== r ? r : []).push(t);
    }
  }, n.prototype._hasParent = function (n) {
    var t = this._parentage;
    return t === n || Array.isArray(t) && t.includes(n);
  }, n.prototype._addParent = function (n) {
    var t = this._parentage;
    this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n;
  }, n.prototype._removeParent = function (n) {
    var t = this._parentage;
    t === n ? this._parentage = null : Array.isArray(t) && p(t, n);
  }, n.prototype.remove = function (t) {
    var r = this._finalizers;
    r && p(r, t), t instanceof n && t._removeParent(this);
  }, n.EMPTY = ((t = new n()).closed = !0, t), n;
}();
function d(n) {
  return n instanceof v || n && "closed" in n && a(n.remove) && a(n.add) && a(n.unsubscribe);
}
function b(n) {
  a(n) ? n() : n.unsubscribe();
}
v.EMPTY;
var y = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1
  },
  m = {
    setTimeout: function (n, t) {
      for (var r = [], e = 2; e < arguments.length; e++) r[e - 2] = arguments[e];
      var o = m.delegate;
      return (null == o ? void 0 : o.setTimeout) ? o.setTimeout.apply(o, u([n, t], i(r))) : setTimeout.apply(void 0, u([n, t], i(r)));
    },
    clearTimeout: function (n) {
      var t = m.delegate;
      return ((null == t ? void 0 : t.clearTimeout) || clearTimeout)(n);
    },
    delegate: void 0
  };
function w(n) {
  m.setTimeout(function () {
    throw n;
  });
}
function x() {}
var g = function (n) {
    function r(t) {
      var r = n.call(this) || this;
      return r.isStopped = !1, t ? (r.destination = t, d(t) && t.add(r)) : r.destination = P, r;
    }
    return t(r, n), r.create = function (n, t, r) {
      return new I(n, t, r);
    }, r.prototype.next = function (n) {
      this.isStopped || this._next(n);
    }, r.prototype.error = function (n) {
      this.isStopped || (this.isStopped = !0, this._error(n));
    }, r.prototype.complete = function () {
      this.isStopped || (this.isStopped = !0, this._complete());
    }, r.prototype.unsubscribe = function () {
      this.closed || (this.isStopped = !0, n.prototype.unsubscribe.call(this), this.destination = null);
    }, r.prototype._next = function (n) {
      this.destination.next(n);
    }, r.prototype._error = function (n) {
      try {
        this.destination.error(n);
      } finally {
        this.unsubscribe();
      }
    }, r.prototype._complete = function () {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }, r;
  }(v),
  _ = Function.prototype.bind;
function S(n, t) {
  return _.call(n, t);
}
var E = function () {
    function n(n) {
      this.partialObserver = n;
    }
    return n.prototype.next = function (n) {
      var t = this.partialObserver;
      if (t.next) try {
        t.next(n);
      } catch (n) {
        A(n);
      }
    }, n.prototype.error = function (n) {
      var t = this.partialObserver;
      if (t.error) try {
        t.error(n);
      } catch (n) {
        A(n);
      } else A(n);
    }, n.prototype.complete = function () {
      var n = this.partialObserver;
      if (n.complete) try {
        n.complete();
      } catch (n) {
        A(n);
      }
    }, n;
  }(),
  I = function (n) {
    function r(t, r, e) {
      var o,
        i,
        u = n.call(this) || this;
      a(t) || !t ? o = {
        next: null != t ? t : void 0,
        error: null != r ? r : void 0,
        complete: null != e ? e : void 0
      } : u && y.useDeprecatedNextContext ? ((i = Object.create(t)).unsubscribe = function () {
        return u.unsubscribe();
      }, o = {
        next: t.next && S(t.next, i),
        error: t.error && S(t.error, i),
        complete: t.complete && S(t.complete, i)
      }) : o = t;
      return u.destination = new E(o), u;
    }
    return t(r, n), r;
  }(g);
function A(n) {
  w(n);
}
var P = {
    closed: !0,
    next: x,
    error: function (n) {
      throw n;
    },
    complete: x
  },
  T = "function" == typeof Symbol && Symbol.observable || "@@observable";
function O(n) {
  return n;
}
function j() {
  for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
  return k(n);
}
function k(n) {
  return 0 === n.length ? O : 1 === n.length ? n[0] : function (t) {
    return n.reduce(function (n, t) {
      return t(n);
    }, t);
  };
}
var z = function () {
  function n(n) {
    n && (this._subscribe = n);
  }
  return n.prototype.lift = function (t) {
    var r = new n();
    return r.source = this, r.operator = t, r;
  }, n.prototype.subscribe = function (n, t, r) {
    var e,
      o = this,
      i = (e = n) && e instanceof g || function (n) {
        return n && a(n.next) && a(n.error) && a(n.complete);
      }(e) && d(e) ? n : new I(n, t, r);
    return function () {
      var n = o,
        t = n.operator,
        r = n.source;
      i.add(t ? t.call(i, r) : r ? o._subscribe(i) : o._trySubscribe(i));
    }(), i;
  }, n.prototype._trySubscribe = function (n) {
    try {
      return this._subscribe(n);
    } catch (t) {
      n.error(t);
    }
  }, n.prototype.forEach = function (n, t) {
    var r = this;
    return new (t = L(t))(function (t, e) {
      var o = new I({
        next: function (t) {
          try {
            n(t);
          } catch (n) {
            e(n), o.unsubscribe();
          }
        },
        error: e,
        complete: t
      });
      r.subscribe(o);
    });
  }, n.prototype._subscribe = function (n) {
    var t;
    return null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(n);
  }, n.prototype[T] = function () {
    return this;
  }, n.prototype.pipe = function () {
    for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
    return k(n)(this);
  }, n.prototype.toPromise = function (n) {
    var t = this;
    return new (n = L(n))(function (n, r) {
      var e;
      t.subscribe(function (n) {
        return e = n;
      }, function (n) {
        return r(n);
      }, function () {
        return n(e);
      });
    });
  }, n.create = function (t) {
    return new n(t);
  }, n;
}();
function L(n) {
  var t;
  return null !== (t = null != n ? n : y.Promise) && void 0 !== t ? t : Promise;
}
function U(n) {
  return function (t) {
    if (function (n) {
      return a(null == n ? void 0 : n.lift);
    }(t)) return t.lift(function (t) {
      try {
        return n(t, this);
      } catch (n) {
        this.error(n);
      }
    });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function C(n, t, r, e, o) {
  return new D(n, t, r, e, o);
}
var D = function (n) {
    function r(t, r, e, o, i, u) {
      var c = n.call(this, t) || this;
      return c.onFinalize = i, c.shouldUnsubscribe = u, c._next = r ? function (n) {
        try {
          r(n);
        } catch (n) {
          t.error(n);
        }
      } : n.prototype._next, c._error = o ? function (n) {
        try {
          o(n);
        } catch (n) {
          t.error(n);
        } finally {
          this.unsubscribe();
        }
      } : n.prototype._error, c._complete = e ? function () {
        try {
          e();
        } catch (n) {
          t.error(n);
        } finally {
          this.unsubscribe();
        }
      } : n.prototype._complete, c;
    }
    return t(r, n), r.prototype.unsubscribe = function () {
      var t;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var r = this.closed;
        n.prototype.unsubscribe.call(this), !r && (null === (t = this.onFinalize) || void 0 === t || t.call(this));
      }
    }, r;
  }(g),
  N = {
    now: function () {
      return (N.delegate || Date).now();
    },
    delegate: void 0
  },
  Y = function (n) {
    function r(t, r) {
      return n.call(this) || this;
    }
    return t(r, n), r.prototype.schedule = function (n, t) {
      return this;
    }, r;
  }(v),
  q = {
    setInterval: function (n, t) {
      for (var r = [], e = 2; e < arguments.length; e++) r[e - 2] = arguments[e];
      var o = q.delegate;
      return (null == o ? void 0 : o.setInterval) ? o.setInterval.apply(o, u([n, t], i(r))) : setInterval.apply(void 0, u([n, t], i(r)));
    },
    clearInterval: function (n) {
      var t = q.delegate;
      return ((null == t ? void 0 : t.clearInterval) || clearInterval)(n);
    },
    delegate: void 0
  },
  F = function (n) {
    function r(t, r) {
      var e = n.call(this, t, r) || this;
      return e.scheduler = t, e.work = r, e.pending = !1, e;
    }
    return t(r, n), r.prototype.schedule = function (n, t) {
      var r;
      if (void 0 === t && (t = 0), this.closed) return this;
      this.state = n;
      var e = this.id,
        o = this.scheduler;
      return null != e && (this.id = this.recycleAsyncId(o, e, t)), this.pending = !0, this.delay = t, this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(o, this.id, t), this;
    }, r.prototype.requestAsyncId = function (n, t, r) {
      return void 0 === r && (r = 0), q.setInterval(n.flush.bind(n, this), r);
    }, r.prototype.recycleAsyncId = function (n, t, r) {
      if (void 0 === r && (r = 0), null != r && this.delay === r && !1 === this.pending) return t;
      null != t && q.clearInterval(t);
    }, r.prototype.execute = function (n, t) {
      if (this.closed) return new Error("executing a cancelled action");
      this.pending = !1;
      var r = this._execute(n, t);
      if (r) return r;
      !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }, r.prototype._execute = function (n, t) {
      var r,
        e = !1;
      try {
        this.work(n);
      } catch (n) {
        e = !0, r = n || new Error("Scheduled action threw falsy error");
      }
      if (e) return this.unsubscribe(), r;
    }, r.prototype.unsubscribe = function () {
      if (!this.closed) {
        var t = this.id,
          r = this.scheduler,
          e = r.actions;
        this.work = this.state = this.scheduler = null, this.pending = !1, p(e, this), null != t && (this.id = this.recycleAsyncId(r, t, null)), this.delay = null, n.prototype.unsubscribe.call(this);
      }
    }, r;
  }(Y),
  R = function () {
    function n(t, r) {
      void 0 === r && (r = n.now), this.schedulerActionCtor = t, this.now = r;
    }
    return n.prototype.schedule = function (n, t, r) {
      return void 0 === t && (t = 0), new this.schedulerActionCtor(this, n).schedule(r, t);
    }, n.now = N.now, n;
  }(),
  M = new (function (n) {
    function r(t, r) {
      void 0 === r && (r = R.now);
      var e = n.call(this, t, r) || this;
      return e.actions = [], e._active = !1, e;
    }
    return t(r, n), r.prototype.flush = function (n) {
      var t = this.actions;
      if (this._active) t.push(n);else {
        var r;
        this._active = !0;
        do {
          if (r = n.execute(n.state, n.delay)) break;
        } while (n = t.shift());
        if (this._active = !1, r) {
          for (; n = t.shift();) n.unsubscribe();
          throw r;
        }
      }
    }, r;
  }(R))(F),
  G = new z(function (n) {
    return n.complete();
  });
function H(n) {
  return n && a(n.schedule);
}
function V(n) {
  return n[n.length - 1];
}
var B = function (n) {
  return n && "number" == typeof n.length && "function" != typeof n;
};
function J(n) {
  return a(null == n ? void 0 : n.then);
}
function K(n) {
  return a(n[T]);
}
function Q(n) {
  return Symbol.asyncIterator && a(null == n ? void 0 : n[Symbol.asyncIterator]);
}
function W(n) {
  return new TypeError("You provided " + (null !== n && "object" == typeof n ? "an invalid object" : "'" + n + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
var X = "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
function Z(n) {
  return a(null == n ? void 0 : n[X]);
}
function $(n) {
  return s(this, arguments, function () {
    var t, r, o;
    return e(this, function (e) {
      switch (e.label) {
        case 0:
          t = n.getReader(), e.label = 1;
        case 1:
          e.trys.push([1,, 9, 10]), e.label = 2;
        case 2:
          return [4, c(t.read())];
        case 3:
          return r = e.sent(), o = r.value, r.done ? [4, c(void 0)] : [3, 5];
        case 4:
          return [2, e.sent()];
        case 5:
          return [4, c(o)];
        case 6:
          return [4, e.sent()];
        case 7:
          return e.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return t.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function nn(n) {
  return a(null == n ? void 0 : n.getReader);
}
function tn(n) {
  if (n instanceof z) return n;
  if (null != n) {
    if (K(n)) return i = n, new z(function (n) {
      var t = i[T]();
      if (a(t.subscribe)) return t.subscribe(n);
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
    if (B(n)) return e = n, new z(function (n) {
      for (var t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
      n.complete();
    });
    if (J(n)) return r = n, new z(function (n) {
      r.then(function (t) {
        n.closed || (n.next(t), n.complete());
      }, function (t) {
        return n.error(t);
      }).then(null, w);
    });
    if (Q(n)) return rn(n);
    if (Z(n)) return t = n, new z(function (n) {
      var r, e;
      try {
        for (var i = o(t), u = i.next(); !u.done; u = i.next()) {
          var c = u.value;
          if (n.next(c), n.closed) return;
        }
      } catch (n) {
        r = {
          error: n
        };
      } finally {
        try {
          u && !u.done && (e = i.return) && e.call(i);
        } finally {
          if (r) throw r.error;
        }
      }
      n.complete();
    });
    if (nn(n)) return rn($(n));
  }
  var t, r, e, i;
  throw W(n);
}
function rn(n) {
  return new z(function (t) {
    (function (n, t) {
      var o, i, u, c;
      return r(this, void 0, void 0, function () {
        var r, s;
        return e(this, function (e) {
          switch (e.label) {
            case 0:
              e.trys.push([0, 5, 6, 11]), o = l(n), e.label = 1;
            case 1:
              return [4, o.next()];
            case 2:
              if ((i = e.sent()).done) return [3, 4];
              if (r = i.value, t.next(r), t.closed) return [2];
              e.label = 3;
            case 3:
              return [3, 1];
            case 4:
              return [3, 11];
            case 5:
              return s = e.sent(), u = {
                error: s
              }, [3, 11];
            case 6:
              return e.trys.push([6,, 9, 10]), i && !i.done && (c = o.return) ? [4, c.call(o)] : [3, 8];
            case 7:
              e.sent(), e.label = 8;
            case 8:
              return [3, 10];
            case 9:
              if (u) throw u.error;
              return [7];
            case 10:
              return [7];
            case 11:
              return t.complete(), [2];
          }
        });
      });
    })(n, t).catch(function (n) {
      return t.error(n);
    });
  });
}
function en(n, t, r, e, o) {
  void 0 === e && (e = 0), void 0 === o && (o = !1);
  var i = t.schedule(function () {
    r(), o ? n.add(this.schedule(null, e)) : this.unsubscribe();
  }, e);
  if (n.add(i), !o) return i;
}
function on(n, t) {
  return void 0 === t && (t = 0), U(function (r, e) {
    r.subscribe(C(e, function (r) {
      return en(e, n, function () {
        return e.next(r);
      }, t);
    }, function () {
      return en(e, n, function () {
        return e.complete();
      }, t);
    }, function (r) {
      return en(e, n, function () {
        return e.error(r);
      }, t);
    }));
  });
}
function un(n, t) {
  return void 0 === t && (t = 0), U(function (r, e) {
    e.add(n.schedule(function () {
      return r.subscribe(e);
    }, t));
  });
}
function cn(n, t) {
  if (!n) throw new Error("Iterable cannot be null");
  return new z(function (r) {
    en(r, t, function () {
      var e = n[Symbol.asyncIterator]();
      en(r, t, function () {
        e.next().then(function (n) {
          n.done ? r.complete() : r.next(n.value);
        });
      }, 0, !0);
    });
  });
}
function sn(n, t) {
  if (null != n) {
    if (K(n)) return function (n, t) {
      return tn(n).pipe(un(t), on(t));
    }(n, t);
    if (B(n)) return function (n, t) {
      return new z(function (r) {
        var e = 0;
        return t.schedule(function () {
          e === n.length ? r.complete() : (r.next(n[e++]), r.closed || this.schedule());
        });
      });
    }(n, t);
    if (J(n)) return function (n, t) {
      return tn(n).pipe(un(t), on(t));
    }(n, t);
    if (Q(n)) return cn(n, t);
    if (Z(n)) return function (n, t) {
      return new z(function (r) {
        var e;
        return en(r, t, function () {
          e = n[X](), en(r, t, function () {
            var n, t, o;
            try {
              t = (n = e.next()).value, o = n.done;
            } catch (n) {
              return void r.error(n);
            }
            o ? r.complete() : r.next(t);
          }, 0, !0);
        }), function () {
          return a(null == e ? void 0 : e.return) && e.return();
        };
      });
    }(n, t);
    if (nn(n)) return function (n, t) {
      return cn($(n), t);
    }(n, t);
  }
  throw W(n);
}
function ln(n, t) {
  return t ? sn(n, t) : tn(n);
}
var an = f(function (n) {
  return function () {
    n(this), this.name = "EmptyError", this.message = "no elements in sequence";
  };
});
function fn(n, t) {
  var r = "object" == typeof t;
  return new Promise(function (e, o) {
    var i = new I({
      next: function (n) {
        e(n), i.unsubscribe();
      },
      error: o,
      complete: function () {
        r ? e(t.defaultValue) : o(new an());
      }
    });
    n.subscribe(i);
  });
}
function hn(n, t) {
  return U(function (r, e) {
    var o = 0;
    r.subscribe(C(e, function (r) {
      e.next(n.call(t, r, o++));
    }));
  });
}
var pn = Array.isArray;
function vn(n) {
  return hn(function (t) {
    return function (n, t) {
      return pn(t) ? n.apply(void 0, u([], i(t))) : n(t);
    }(n, t);
  });
}
function dn(n, t, r) {
  return void 0 === r && (r = 1 / 0), a(t) ? dn(function (r, e) {
    return hn(function (n, o) {
      return t(r, n, e, o);
    })(tn(n(r, e)));
  }, r) : ("number" == typeof t && (r = t), U(function (t, e) {
    return function (n, t, r, e, o, i, u, c) {
      var s = [],
        l = 0,
        a = 0,
        f = !1,
        h = function () {
          !f || s.length || l || t.complete();
        },
        p = function (n) {
          return l < e ? v(n) : s.push(n);
        },
        v = function (n) {
          i && t.next(n), l++;
          var c = !1;
          tn(r(n, a++)).subscribe(C(t, function (n) {
            null == o || o(n), i ? p(n) : t.next(n);
          }, function () {
            c = !0;
          }, void 0, function () {
            if (c) try {
              l--;
              for (var n = function () {
                var n = s.shift();
                u ? en(t, u, function () {
                  return v(n);
                }) : v(n);
              }; s.length && l < e;) n();
              h();
            } catch (n) {
              t.error(n);
            }
          }));
        };
      return n.subscribe(C(t, p, function () {
        f = !0, h();
      })), function () {
        null == c || c();
      };
    }(t, e, n, r);
  }));
}
function bn(n) {
  return new z(function (t) {
    tn(n()).subscribe(t);
  });
}
var yn = ["addListener", "removeListener"],
  mn = ["addEventListener", "removeEventListener"],
  wn = ["on", "off"];
function xn(n, t, r, e) {
  if (a(r) && (e = r, r = void 0), e) return xn(n, t, r).pipe(vn(e));
  var o = i(function (n) {
      return a(n.addEventListener) && a(n.removeEventListener);
    }(n) ? mn.map(function (e) {
      return function (o) {
        return n[e](t, o, r);
      };
    }) : function (n) {
      return a(n.addListener) && a(n.removeListener);
    }(n) ? yn.map(gn(n, t)) : function (n) {
      return a(n.on) && a(n.off);
    }(n) ? wn.map(gn(n, t)) : [], 2),
    u = o[0],
    c = o[1];
  if (!u && B(n)) return dn(function (n) {
    return xn(n, t, r);
  })(tn(n));
  if (!u) throw new TypeError("Invalid event target");
  return new z(function (n) {
    var t = function () {
      for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
      return n.next(1 < t.length ? t : t[0]);
    };
    return u(t), function () {
      return c(t);
    };
  });
}
function gn(n, t) {
  return function (r) {
    return function (e) {
      return n[r](t, e);
    };
  };
}
function _n(n, t, r) {
  void 0 === n && (n = 0), void 0 === r && (r = M);
  var e = -1;
  return null != t && (H(t) ? r = t : e = t), new z(function (t) {
    var o,
      i = (o = n) instanceof Date && !isNaN(o) ? +n - r.now() : n;
    i < 0 && (i = 0);
    var u = 0;
    return r.schedule(function () {
      t.closed || (t.next(u++), 0 <= e ? this.schedule(void 0, e) : t.complete());
    }, i);
  });
}
function Sn() {
  for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
  var r = function (n) {
      return H(V(n)) ? n.pop() : void 0;
    }(n),
    e = function (n, t) {
      return "number" == typeof V(n) ? n.pop() : t;
    }(n, 1 / 0),
    o = n;
  return o.length ? 1 === o.length ? tn(o[0]) : function (n) {
    return void 0 === n && (n = 1 / 0), dn(O, n);
  }(e)(ln(o, r)) : G;
}
var En = Array.isArray;
function In(n, t) {
  return U(function (r, e) {
    var o = 0;
    r.subscribe(C(e, function (r) {
      return n.call(t, r, o++) && e.next(r);
    }));
  });
}
function An() {
  for (var n, t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
  return 1 === (t = 1 === (n = t).length && En(n[0]) ? n[0] : n).length ? tn(t[0]) : new z(Pn(t));
}
function Pn(n) {
  return function (t) {
    for (var r = [], e = function (e) {
        r.push(tn(n[e]).subscribe(C(t, function (n) {
          if (r) {
            for (var o = 0; o < r.length; o++) o !== e && r[o].unsubscribe();
            r = null;
          }
          t.next(n);
        })));
      }, o = 0; r && !t.closed && o < n.length; o++) e(o);
  };
}
function Tn(n) {
  return U(function (t, r) {
    var e,
      o = null,
      i = !1;
    o = t.subscribe(C(r, void 0, void 0, function (u) {
      e = tn(n(u, Tn(n)(t))), o ? (o.unsubscribe(), o = null, e.subscribe(r)) : i = !0;
    })), i && (o.unsubscribe(), o = null, e.subscribe(r));
  });
}
function On(n) {
  return U(function (t, r) {
    var e = !1;
    t.subscribe(C(r, function (n) {
      e = !0, r.next(n);
    }, function () {
      e || r.next(n), r.complete();
    }));
  });
}
function jn() {
  return U(function (n, t) {
    n.subscribe(C(t, x));
  });
}
function kn(n) {
  return void 0 === n && (n = zn), U(function (t, r) {
    var e = !1;
    t.subscribe(C(r, function (n) {
      e = !0, r.next(n);
    }, function () {
      return e ? r.complete() : r.error(n());
    }));
  });
}
function zn() {
  return new an();
}
function Ln(n, t) {
  var r = arguments.length >= 2;
  return function (e) {
    return e.pipe(n ? In(function (t, r) {
      return n(t, r, e);
    }) : O, (o = 1) <= 0 ? function () {
      return G;
    } : U(function (n, t) {
      var r = 0;
      n.subscribe(C(t, function (n) {
        ++r <= o && (t.next(n), o <= r && t.complete());
      }));
    }), r ? On(t) : kn(function () {
      return new an();
    }));
    var o;
  };
}
function Un() {
  for (var n = [], t = 0; t < arguments.length; t++) n[t] = arguments[t];
  return n.length ? U(function (t, r) {
    Pn(u([t], i(n)))(r);
  }) : O;
}
function Cn(n) {
  var t;
  void 0 === n && (n = 1 / 0);
  var r = (t = n && "object" == typeof n ? n : {
      count: n
    }).count,
    e = void 0 === r ? 1 / 0 : r,
    o = t.delay,
    i = t.resetOnSuccess,
    u = void 0 !== i && i;
  return e <= 0 ? O : U(function (n, t) {
    var r,
      i = 0,
      c = function () {
        var s = !1;
        r = n.subscribe(C(t, function (n) {
          u && (i = 0), t.next(n);
        }, void 0, function (n) {
          if (i++ < e) {
            var u = function () {
              r ? (r.unsubscribe(), r = null, c()) : s = !0;
            };
            if (null != o) {
              var l = "number" == typeof o ? _n(o) : tn(o(n, i)),
                a = C(t, function () {
                  a.unsubscribe(), u();
                }, function () {
                  t.complete();
                });
              l.subscribe(a);
            } else u();
          } else t.error(n);
        })), s && (r.unsubscribe(), r = null, c());
      };
    c();
  });
}
function Dn(n, t, r) {
  var e = a(n) || t || r ? {
    next: n,
    error: t,
    complete: r
  } : n;
  return e ? U(function (n, t) {
    var r;
    null === (r = e.subscribe) || void 0 === r || r.call(e);
    var o = !0;
    n.subscribe(C(t, function (n) {
      var r;
      null === (r = e.next) || void 0 === r || r.call(e, n), t.next(n);
    }, function () {
      var n;
      o = !1, null === (n = e.complete) || void 0 === n || n.call(e), t.complete();
    }, function (n) {
      var r;
      o = !1, null === (r = e.error) || void 0 === r || r.call(e, n), t.error(n);
    }, function () {
      var n, t;
      o && (null === (n = e.unsubscribe) || void 0 === n || n.call(e)), null === (t = e.finalize) || void 0 === t || t.call(e);
    }));
  }) : O;
}
export { G as EMPTY, z as Observable, Tn as catchError, On as defaultIfEmpty, bn as defer, In as filter, Ln as first, fn as firstValueFrom, ln as from, xn as fromEvent, O as identity, jn as ignoreElements, hn as map, Sn as merge, dn as mergeMap, x as noop, j as pipe, An as race, Un as raceWith, Cn as retry, Dn as tap, kn as throwIfEmpty, _n as timer };