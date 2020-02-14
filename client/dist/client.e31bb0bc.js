// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/vue/dist/vue.runtime.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = '__proto__' in {}; // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set =
  /*@__PURE__*/
  function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */

/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}

var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("development" !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.11';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps =
/*#__PURE__*/
Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

/*  */

/*  */

/*  */
// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.

function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var _default = Vue;
exports.default = _default;
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"node_modules/vue-hot-reload-api/dist/index.js":[function(require,module,exports) {
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      // prevent record.options._Ctor from being overwritten accidentally
      newCtor.options._Ctor = record.options._Ctor
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],"components/loginpage.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: "loginpage",
  props: ["loginshow"],
  data: function data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    showregister: function showregister() {
      this.$parent.showregister();
    },
    signWithGoogle: function signWithGoogle() {
      this.$parent.signGoogle();
    }
  }
};
exports.default = _default;
        var $25b5d8 = exports.default || module.exports;
      
      if (typeof $25b5d8 === 'function') {
        $25b5d8 = $25b5d8.options;
      }
    
        /* template */
        Object.assign($25b5d8, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.loginshow,
          expression: "loginshow"
        }
      ],
      staticClass: "loginpage"
    },
    [
      _c(
        "div",
        {
          staticClass: "card",
          staticStyle: { "max-width": "200rem" },
          attrs: { id: "loginform" }
        },
        [
          _c("h3", { staticClass: "card-header text-center" }, [
            _vm._v("Login")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" }, [
            _c("div", { staticClass: "LoginForm" }, [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.$emit("login", _vm.form)
                    }
                  }
                },
                [
                  _c(
                    "div",
                    { staticClass: "form-group", attrs: { id: "LoginForm" } },
                    [
                      _c("label", { attrs: { for: "email" } }, [
                        _vm._v("Email address:")
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.form.email,
                            expression: "form.email"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "email", id: "LoginEmail" },
                        domProps: { value: _vm.form.email },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.form, "email", $event.target.value)
                          }
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "password" } }, [
                      _vm._v("Password:")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.password,
                          expression: "form.password"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "password", id: "LoginPassword" },
                      domProps: { value: _vm.form.password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "password", $event.target.value)
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _vm._m(0)
                ]
              )
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary btn-lg btn-block",
                attrs: {
                  type: "button",
                  "data-toggle": "modal",
                  "data-target": "#registerModal"
                },
                on: { click: _vm.showregister }
              },
              [_vm._v("\n                Register\n            ")]
            ),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary btn-lg btn-block",
                attrs: { type: "button" },
                on: { click: _vm.signWithGoogle }
              },
              [_vm._v("\n                google\n            ")]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-left" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-primary btn-lg btn-block",
          attrs: { type: "submit", id: "LoginSubmit" }
        },
        [
          _vm._v(
            "\n                            Submit\n                        "
          )
        ]
      )
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$25b5d8', $25b5d8);
          } else {
            api.reload('$25b5d8', $25b5d8);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"components/registerpage.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: "registerpage",
  props: ["registershow"],
  data: function data() {
    return {
      form: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  methods: {
    showlogin: function showlogin() {
      this.$parent.showpage();
    },
    signWithGoogle: function signWithGoogle() {
      this.$parent.signGoogle();
    }
  }
};
exports.default = _default;
        var $fb772f = exports.default || module.exports;
      
      if (typeof $fb772f === 'function') {
        $fb772f = $fb772f.options;
      }
    
        /* template */
        Object.assign($fb772f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.registershow,
          expression: "registershow"
        }
      ],
      staticClass: "registerpage loginpage",
      attrs: { id: "loginregister" }
    },
    [
      _c(
        "div",
        {
          staticClass: "card",
          staticStyle: { "max-width": "200rem" },
          attrs: { id: "loginform" }
        },
        [
          _c("h3", { staticClass: "card-header text-center" }, [
            _vm._v("Register")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body" }, [
            _c("div", { staticClass: "registerForm" }, [
              _c(
                "form",
                {
                  on: {
                    submit: function($event) {
                      $event.preventDefault()
                      return _vm.$emit("register", _vm.form)
                    }
                  }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "form-group",
                      attrs: { id: "registerForm" }
                    },
                    [
                      _c("label", { attrs: { for: "email" } }, [
                        _vm._v("Email address:")
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.form.email,
                            expression: "form.email"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "email" },
                        domProps: { value: _vm.form.email },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.form, "email", $event.target.value)
                          }
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "form-group",
                      attrs: { id: "registerForm" }
                    },
                    [
                      _c("label", { attrs: { for: "email" } }, [
                        _vm._v("Name:")
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.form.name,
                            expression: "form.name"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "text" },
                        domProps: { value: _vm.form.name },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.$set(_vm.form, "name", $event.target.value)
                          }
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c("label", { attrs: { for: "password" } }, [
                      _vm._v("Password:")
                    ]),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.form.password,
                          expression: "form.password"
                        }
                      ],
                      staticClass: "form-control",
                      attrs: { type: "password", id: "registerPassword" },
                      domProps: { value: _vm.form.password },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.form, "password", $event.target.value)
                        }
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _vm._m(0)
                ]
              )
            ]),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary btn-lg btn-block",
                attrs: {
                  type: "button",
                  "data-toggle": "modal",
                  "data-target": "#registerModal"
                },
                on: { click: _vm.showlogin }
              },
              [_vm._v("\n                Login\n            ")]
            ),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-primary btn-lg btn-block",
                attrs: { type: "button" },
                on: { click: _vm.signWithGoogle }
              },
              [_vm._v("\n                google\n            ")]
            )
          ])
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "text-left" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-primary btn-lg btn-block",
          attrs: { type: "submit", id: "registerSubmit" }
        },
        [
          _vm._v(
            "\n                            Submit\n                        "
          )
        ]
      )
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: "data-v-fb772f",
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$fb772f', $fb772f);
          } else {
            api.reload('$fb772f', $fb772f);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"components/menubar.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var _default = {
  name: "MenuBar",
  methods: {
    signout: function signout() {
      localStorage.removeItem("token");
      localStorage.removeItem("UserId");
      this.$parent.$parent.showpage();
    }
  }
};
exports.default = _default;
        var $c41263 = exports.default || module.exports;
      
      if (typeof $c41263 === 'function') {
        $c41263 = $c41263.options;
      }
    
        /* template */
        Object.assign($c41263, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("nav", { staticClass: "navbar navbar-light d-flex" }, [
    _c(
      "a",
      {
        staticClass: "navbar-brand ml-4",
        staticStyle: { "font-size": "25px" },
        attrs: { href: "#" }
      },
      [_vm._v("MYKANBAN")]
    ),
    _vm._v(" "),
    _c("i", {
      staticClass: "fas fa-sign-out-alt mr-5",
      on: {
        click: function($event) {
          return _vm.signout()
        }
      }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$c41263', $c41263);
          } else {
            api.reload('$c41263', $c41263);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":"node_modules/axios/lib/helpers/bind.js"}],"node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"node_modules/axios/lib/core/enhanceError.js"}],"node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"node_modules/axios/lib/core/createError.js"}],"node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"node_modules/axios/lib/helpers/combineURLs.js"}],"node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"node_modules/axios/lib/utils.js","./../core/settle":"node_modules/axios/lib/core/settle.js","./../helpers/buildURL":"node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"node_modules/axios/lib/core/createError.js","./../helpers/cookies":"node_modules/axios/lib/helpers/cookies.js"}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"node_modules/axios/lib/adapters/xhr.js","./adapters/http":"node_modules/axios/lib/adapters/xhr.js","process":"node_modules/process/browser.js"}],"node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"node_modules/axios/lib/utils.js","./transformData":"node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"node_modules/axios/lib/cancel/isCancel.js","../defaults":"node_modules/axios/lib/defaults.js"}],"node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":"node_modules/axios/lib/utils.js"}],"node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"node_modules/axios/lib/utils.js","../helpers/buildURL":"node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"node_modules/axios/lib/core/mergeConfig.js"}],"node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"node_modules/axios/lib/cancel/Cancel.js"}],"node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"node_modules/axios/lib/utils.js","./helpers/bind":"node_modules/axios/lib/helpers/bind.js","./core/Axios":"node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"node_modules/axios/lib/core/mergeConfig.js","./defaults":"node_modules/axios/lib/defaults.js","./cancel/Cancel":"node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"node_modules/axios/lib/helpers/spread.js"}],"node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"node_modules/axios/lib/axios.js"}],"components/kanban-category.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _displaypage = _interopRequireDefault(require("./displaypage"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: ["categorytitle", "tasks", "category"],
  data: function data() {
    return {
      title: null,
      addIndex: null,
      status: null,
      userId: localStorage.UserId
    };
  },
  methods: {
    checkid: function checkid(userid) {
      if (userid == this.userId) {
        return true;
      }

      return false;
    },
    checkzero: function checkzero(params) {
      if (params === 0) {
        return false;
      }

      return true;
    },
    checkdone: function checkdone(params) {
      if (params === 3) {
        return false;
      }

      return true;
    },
    stepback: function stepback(id) {
      var _this = this;

      (0, _axios.default)({
        method: "PUT",
        url: "http://localhost:3000/task/".concat(id),
        data: {
          progress: -1
        }
      }).then(function (res) {
        _this.$emit("showAllTask");
      }).catch(function (err) {
        console.log(err);
      });
    },
    stepforward: function stepforward(id) {
      var _this2 = this;

      (0, _axios.default)({
        method: "PUT",
        url: "http://localhost:3000/task/".concat(id),
        data: {
          progress: 1
        },
        headers: {
          token: localStorage.token
        }
      }).then(function (res) {
        _this2.$emit("showAllTask");
      }).catch(function (err) {
        console.log(err);
      });
    },
    getStatus: function getStatus(status) {
      this.status = status;
    },
    addOne: function addOne(status) {
      var _this3 = this;

      (0, _axios.default)({
        method: "POST",
        url: "http://localhost:3000/task",
        data: {
          title: this.title,
          status: 0,
          UserId: this.userId
        },
        headers: {
          token: localStorage.token
        }
      }).then(function (res) {
        _this3.$emit("showAllTask");

        $("#addModal").modal("hide");
      }).catch(function (err) {
        console.log(err);
      });
    },
    deleteOne: function deleteOne(id) {
      var _this4 = this;

      (0, _axios.default)({
        method: "DELETE",
        url: "http://localhost:3000/task/".concat(id),
        headers: {
          token: localStorage.token
        }
      }).then(function (res) {
        _this4.$emit("showAllTask");
      }).catch(function (err) {
        console.log(err);
      });
    }
  },
  mounted: function mounted() {
    this.userId = localStorage.UserId;
  }
};
exports.default = _default;
        var $a38781 = exports.default || module.exports;
      
      if (typeof $a38781 === 'function') {
        $a38781 = $a38781.options;
      }
    
        /* template */
        Object.assign($a38781, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "kanban-category" }, [
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "addModal",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "exampleModalCenterTitle",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(0),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _c(
                  "form",
                  {
                    attrs: { method: "POST" },
                    on: {
                      submit: function($event) {
                        $event.preventDefault()
                        return _vm.addOne(_vm.category)
                      }
                    }
                  },
                  [
                    _c("div", { staticClass: "form-group" }, [
                      _c(
                        "label",
                        { attrs: { for: "exampleFormControlTextarea1" } },
                        [_vm._v("Fill your task")]
                      ),
                      _vm._v(" "),
                      _c("textarea", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.title,
                            expression: "title"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { id: "exampleFormControlTextarea1", rows: "3" },
                        domProps: { value: _vm.title },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.title = $event.target.value
                          }
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { type: "submit" }
                      },
                      [
                        _vm._v(
                          "\n                            Save changes\n                        "
                        )
                      ]
                    )
                  ]
                )
              ])
            ])
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "kanban-category-title" }, [
      _c("h2", [_vm._v(_vm._s(_vm.tasks.value))])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "kanban-cards-container" },
      _vm._l(_vm.tasks.task, function(task, i) {
        return _c("div", { key: i }, [
          _c("div", { staticClass: "card" }, [
            _c("div", { staticClass: "card-body" }, [
              _c("h5", { staticClass: "card-title" }, [
                _vm._v(_vm._s(task.title))
              ])
            ]),
            _vm._v(" "),
            _vm.checkid(task.UserId)
              ? _c("div", { staticClass: "card-footer text-muted" }, [
                  _c("i", {
                    staticClass: "fas fa-trash",
                    on: {
                      click: function($event) {
                        return _vm.deleteOne(task.id)
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm.checkzero(_vm.category)
                    ? _c("i", {
                        staticClass: "fas fa-arrow-left",
                        on: {
                          click: function($event) {
                            return _vm.stepback(task.id)
                          }
                        }
                      })
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.checkdone(_vm.category)
                    ? _c("i", {
                        staticClass: "fas fa-arrow-right",
                        on: {
                          click: function($event) {
                            return _vm.stepforward(task.id)
                          }
                        }
                      })
                    : _vm._e()
                ])
              : _vm._e()
          ])
        ])
      }),
      0
    ),
    _vm._v(" "),
    _vm.category == 0
      ? _c("div", { staticClass: "addTaskButton" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-primary addButton",
              attrs: {
                type: "button",
                "data-toggle": "modal",
                "data-target": "#addModal"
              }
            },
            [_vm._v("\n            Add Task\n        ")]
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "h5",
        { staticClass: "modal-title", attrs: { id: "exampleModalLabel" } },
        [_vm._v("\n                        Add Task\n                    ")]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      )
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$a38781', $a38781);
          } else {
            api.reload('$a38781', $a38781);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./displaypage":"components/displaypage.vue","axios":"node_modules/axios/index.js","_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"components/displaypage.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menubar = _interopRequireDefault(require("./menubar"));

var _kanbanCategory = _interopRequireDefault(require("./kanban-category"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: "displaypage",
  props: ["showpage"],
  components: {
    MenuBar: _menubar.default,
    Category: _kanbanCategory.default
  },
  data: function data() {
    return {
      categories: ["Backlog", "Todo", "Development", "Completed"],
      status: null,
      allTask: []
    };
  },
  methods: {
    showTask: function showTask() {
      var _this = this;

      (0, _axios.default)({
        method: "GET",
        url: "http://localhost:3000/task",
        headers: {
          token: localStorage.token
        }
      }).then(function (res) {
        _this.allTask = res.data.result;
      }).catch(function (err) {
        console.log(err);
      });
    }
  },
  computed: {
    getAllTask: function getAllTask() {
      var obj = [];

      for (var i = 0; i < this.categories.length; i++) {
        var newObj = {
          value: this.categories[i]
        };
        var arrTask = [];

        for (var j = 0; j < this.allTask.length; j++) {
          if (i === this.allTask[j].status) {
            arrTask.push(this.allTask[j]);
          }
        }

        newObj.task = arrTask;
        obj.push(newObj);
      }

      return obj;
    }
  },
  mounted: function mounted() {
    if (localStorage.token) {
      this.showTask();
    }
  }
};
exports.default = _default;
        var $c95707 = exports.default || module.exports;
      
      if (typeof $c95707 === 'function') {
        $c95707 = $c95707.options;
      }
    
        /* template */
        Object.assign($c95707, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.showpage,
          expression: "showpage"
        }
      ],
      staticClass: "displaypage"
    },
    [
      _c("MenuBar"),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "row" },
        _vm._l(_vm.getAllTask, function(category, i) {
          return _c(
            "div",
            { key: i, staticClass: "col-3" },
            [
              _c("Category", {
                attrs: { tasks: category, category: i },
                on: { showAllTask: _vm.showTask }
              })
            ],
            1
          )
        }),
        0
      ),
      _vm._v(" "),
      _vm._m(0)
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("footer", { staticClass: "page-footer font-small blue" }, [
      _c("div", { staticClass: "footer-copyright text-center py-3" }, [
        _c(
          "a",
          { attrs: { href: "https://mdbootstrap.com/education/bootstrap/" } },
          [_vm._v("WIESO")]
        )
      ])
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$c95707', $c95707);
          } else {
            api.reload('$c95707', $c95707);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"./menubar":"components/menubar.vue","./kanban-category":"components/kanban-category.vue","axios":"node_modules/axios/index.js","_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js","vue":"node_modules/vue/dist/vue.runtime.esm.js"}],"node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

;

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
},{}],"node_modules/@firebase/util/dist/index.cjs.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Firebase constants.  Some of these (@defines) can be overridden at compile-time.
 */
var CONSTANTS = {
    /**
     * @define {boolean} Whether this is the client Node.js SDK.
     */
    NODE_CLIENT: false,
    /**
     * @define {boolean} Whether this is the Admin Node.js SDK.
     */
    NODE_ADMIN: false,
    /**
     * Firebase SDK Version
     */
    SDK_VERSION: '${JSCORE_VERSION}'
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Throws an error if the provided assertion is falsy
 */
var assert = function (assertion, message) {
    if (!assertion) {
        throw assertionError(message);
    }
};
/**
 * Returns an Error object suitable for throwing.
 */
var assertionError = function (message) {
    return new Error('Firebase Database (' +
        CONSTANTS.SDK_VERSION +
        ') INTERNAL ASSERT FAILED: ' +
        message);
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var stringToByteArray = function (str) {
    // TODO(user): Use native implementations if/when available
    var out = [];
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if ((c & 0xfc00) === 0xd800 &&
            i + 1 < str.length &&
            (str.charCodeAt(i + 1) & 0xfc00) === 0xdc00) {
            // Surrogate Pair
            c = 0x10000 + ((c & 0x03ff) << 10) + (str.charCodeAt(++i) & 0x03ff);
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Turns an array of numbers into the string given by the concatenation of the
 * characters to which the numbers correspond.
 * @param bytes Array of numbers representing characters.
 * @return Stringification of the array.
 */
var byteArrayToString = function (bytes) {
    // TODO(user): Use native implementations if/when available
    var out = [];
    var pos = 0, c = 0;
    while (pos < bytes.length) {
        var c1 = bytes[pos++];
        if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
        }
        else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
        }
        else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) -
                0x10000;
            out[c++] = String.fromCharCode(0xd800 + (u >> 10));
            out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
        }
        else {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        }
    }
    return out.join('');
};
// We define it as an object literal instead of a class because a class compiled down to es5 can't
// be treeshaked. https://github.com/rollup/rollup/issues/1691
// Static lookup maps, lazily populated by init_()
var base64 = {
    /**
     * Maps bytes to characters.
     */
    byteToCharMap_: null,
    /**
     * Maps characters to bytes.
     */
    charToByteMap_: null,
    /**
     * Maps bytes to websafe characters.
     * @private
     */
    byteToCharMapWebSafe_: null,
    /**
     * Maps websafe characters to bytes.
     * @private
     */
    charToByteMapWebSafe_: null,
    /**
     * Our default alphabet, shared between
     * ENCODED_VALS and ENCODED_VALS_WEBSAFE
     */
    ENCODED_VALS_BASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789',
    /**
     * Our default alphabet. Value 64 (=) is special; it means "nothing."
     */
    get ENCODED_VALS() {
        return this.ENCODED_VALS_BASE + '+/=';
    },
    /**
     * Our websafe alphabet.
     */
    get ENCODED_VALS_WEBSAFE() {
        return this.ENCODED_VALS_BASE + '-_.';
    },
    /**
     * Whether this browser supports the atob and btoa functions. This extension
     * started at Mozilla but is now implemented by many browsers. We use the
     * ASSUME_* variables to avoid pulling in the full useragent detection library
     * but still allowing the standard per-browser compilations.
     *
     */
    HAS_NATIVE_SUPPORT: typeof atob === 'function',
    /**
     * Base64-encode an array of bytes.
     *
     * @param input An array of bytes (numbers with
     *     value in [0, 255]) to encode.
     * @param webSafe Boolean indicating we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeByteArray: function (input, webSafe) {
        if (!Array.isArray(input)) {
            throw Error('encodeByteArray takes an array as a parameter');
        }
        this.init_();
        var byteToCharMap = webSafe
            ? this.byteToCharMapWebSafe_
            : this.byteToCharMap_;
        var output = [];
        for (var i = 0; i < input.length; i += 3) {
            var byte1 = input[i];
            var haveByte2 = i + 1 < input.length;
            var byte2 = haveByte2 ? input[i + 1] : 0;
            var haveByte3 = i + 2 < input.length;
            var byte3 = haveByte3 ? input[i + 2] : 0;
            var outByte1 = byte1 >> 2;
            var outByte2 = ((byte1 & 0x03) << 4) | (byte2 >> 4);
            var outByte3 = ((byte2 & 0x0f) << 2) | (byte3 >> 6);
            var outByte4 = byte3 & 0x3f;
            if (!haveByte3) {
                outByte4 = 64;
                if (!haveByte2) {
                    outByte3 = 64;
                }
            }
            output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
        }
        return output.join('');
    },
    /**
     * Base64-encode a string.
     *
     * @param input A string to encode.
     * @param webSafe If true, we should use the
     *     alternative alphabet.
     * @return The base64 encoded string.
     */
    encodeString: function (input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return btoa(input);
        }
        return this.encodeByteArray(stringToByteArray(input), webSafe);
    },
    /**
     * Base64-decode a string.
     *
     * @param input to decode.
     * @param webSafe True if we should use the
     *     alternative alphabet.
     * @return string representing the decoded value.
     */
    decodeString: function (input, webSafe) {
        // Shortcut for Mozilla browsers that implement
        // a native base64 encoder in the form of "btoa/atob"
        if (this.HAS_NATIVE_SUPPORT && !webSafe) {
            return atob(input);
        }
        return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
    },
    /**
     * Base64-decode a string.
     *
     * In base-64 decoding, groups of four characters are converted into three
     * bytes.  If the encoder did not apply padding, the input length may not
     * be a multiple of 4.
     *
     * In this case, the last group will have fewer than 4 characters, and
     * padding will be inferred.  If the group has one or two characters, it decodes
     * to one byte.  If the group has three characters, it decodes to two bytes.
     *
     * @param input Input to decode.
     * @param webSafe True if we should use the web-safe alphabet.
     * @return bytes representing the decoded value.
     */
    decodeStringToByteArray: function (input, webSafe) {
        this.init_();
        var charToByteMap = webSafe
            ? this.charToByteMapWebSafe_
            : this.charToByteMap_;
        var output = [];
        for (var i = 0; i < input.length;) {
            var byte1 = charToByteMap[input.charAt(i++)];
            var haveByte2 = i < input.length;
            var byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
            ++i;
            var haveByte3 = i < input.length;
            var byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            var haveByte4 = i < input.length;
            var byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
            ++i;
            if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
                throw Error();
            }
            var outByte1 = (byte1 << 2) | (byte2 >> 4);
            output.push(outByte1);
            if (byte3 !== 64) {
                var outByte2 = ((byte2 << 4) & 0xf0) | (byte3 >> 2);
                output.push(outByte2);
                if (byte4 !== 64) {
                    var outByte3 = ((byte3 << 6) & 0xc0) | byte4;
                    output.push(outByte3);
                }
            }
        }
        return output;
    },
    /**
     * Lazy static initialization function. Called before
     * accessing any of the static map variables.
     * @private
     */
    init_: function () {
        if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {};
            this.charToByteMap_ = {};
            this.byteToCharMapWebSafe_ = {};
            this.charToByteMapWebSafe_ = {};
            // We want quick mappings back and forth, so we precompute two maps.
            for (var i = 0; i < this.ENCODED_VALS.length; i++) {
                this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
                this.charToByteMap_[this.byteToCharMap_[i]] = i;
                this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
                this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
                // Be forgiving when decoding and correctly decode both encodings.
                if (i >= this.ENCODED_VALS_BASE.length) {
                    this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
                    this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
                }
            }
        }
    }
};
/**
 * URL-safe base64 encoding
 */
var base64Encode = function (str) {
    var utf8Bytes = stringToByteArray(str);
    return base64.encodeByteArray(utf8Bytes, true);
};
/**
 * URL-safe base64 decoding
 *
 * NOTE: DO NOT use the global atob() function - it does NOT support the
 * base64Url variant encoding.
 *
 * @param str To be decoded
 * @return Decoded result, if possible
 */
var base64Decode = function (str) {
    try {
        return base64.decodeString(str, true);
    }
    catch (e) {
        console.error('base64Decode failed: ', e);
    }
    return null;
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Do a deep-copy of basic JavaScript Objects or Arrays.
 */
function deepCopy(value) {
    return deepExtend(undefined, value);
}
/**
 * Copy properties from source to target (recursively allows extension
 * of Objects and Arrays).  Scalar values in the target are over-written.
 * If target is undefined, an object of the appropriate type will be created
 * (and returned).
 *
 * We recursively copy all child properties of plain Objects in the source- so
 * that namespace- like dictionaries are merged.
 *
 * Note that the target can be a function, in which case the properties in
 * the source Object are copied onto it as static properties of the Function.
 */
function deepExtend(target, source) {
    if (!(source instanceof Object)) {
        return source;
    }
    switch (source.constructor) {
        case Date:
            // Treat Dates like scalars; if the target date object had any child
            // properties - they will be lost!
            var dateValue = source;
            return new Date(dateValue.getTime());
        case Object:
            if (target === undefined) {
                target = {};
            }
            break;
        case Array:
            // Always copy the array source and overwrite the target.
            target = [];
            break;
        default:
            // Not a plain Object - treat it as a scalar.
            return source;
    }
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) {
            continue;
        }
        target[prop] = deepExtend(target[prop], source[prop]);
    }
    return target;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.reject = function () { };
        this.resolve = function () { };
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    /**
     * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
     * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
     * and returns a node-style callback which will resolve or reject the Deferred's promise.
     */
    Deferred.prototype.wrapCallback = function (callback) {
        var _this = this;
        return function (error, value) {
            if (error) {
                _this.reject(error);
            }
            else {
                _this.resolve(value);
            }
            if (typeof callback === 'function') {
                // Attaching noop handler just in case developer wasn't expecting
                // promises
                _this.promise.catch(function () { });
                // Some of our callbacks don't expect a value and our own tests
                // assert that the parameter length is 1
                if (callback.length === 1) {
                    callback(error);
                }
                else {
                    callback(error, value);
                }
            }
        };
    };
    return Deferred;
}());

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */
function getUA() {
    if (typeof navigator !== 'undefined' &&
        typeof navigator['userAgent'] === 'string') {
        return navigator['userAgent'];
    }
    else {
        return '';
    }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */
function isMobileCordova() {
    return (typeof window !== 'undefined' &&
        // @ts-ignore Setting up an broadly applicable index signature for Window
        // just to deal with this case would probably be a bad idea.
        !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
        /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
}
/**
 * Detect Node.js.
 *
 * @return true if Node.js environment is detected.
 */
// Node detection logic from: https://github.com/iliakan/detect-node/
function isNode() {
    try {
        return (Object.prototype.toString.call(global.process) === '[object process]');
    }
    catch (e) {
        return false;
    }
}
/**
 * Detect Browser Environment
 */
function isBrowser() {
    return typeof self === 'object' && self.self === self;
}
function isBrowserExtension() {
    var runtime = typeof chrome === 'object'
        ? chrome.runtime
        : typeof browser === 'object'
            ? browser.runtime
            : undefined;
    return typeof runtime === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */
function isReactNative() {
    return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
}
/** Detects Electron apps. */
function isElectron() {
    return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */
function isIE() {
    var ua = getUA();
    return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */
function isUWP() {
    return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * Detect whether the current SDK build is the Node version.
 *
 * @return true if it's the Node SDK build.
 */
function isNodeSdk() {
    return CONSTANTS.NODE_CLIENT === true || CONSTANTS.NODE_ADMIN === true;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ERROR_NAME = 'FirebaseError';
// Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
var FirebaseError = /** @class */ (function (_super) {
    tslib.__extends(FirebaseError, _super);
    function FirebaseError(code, message) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        _this.name = ERROR_NAME;
        // Fix For ES5
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
        Object.setPrototypeOf(_this, FirebaseError.prototype);
        // Maintains proper stack trace for where our error was thrown.
        // Only available on V8.
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, ErrorFactory.prototype.create);
        }
        return _this;
    }
    return FirebaseError;
}(Error));
var ErrorFactory = /** @class */ (function () {
    function ErrorFactory(service, serviceName, errors) {
        this.service = service;
        this.serviceName = serviceName;
        this.errors = errors;
    }
    ErrorFactory.prototype.create = function (code) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        var customData = data[0] || {};
        var fullCode = this.service + "/" + code;
        var template = this.errors[code];
        var message = template ? replaceTemplate(template, customData) : 'Error';
        // Service Name: Error message (service/code).
        var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
        var error = new FirebaseError(fullCode, fullMessage);
        // Keys with an underscore at the end of their name are not included in
        // error.data for some reason.
        // TODO: Replace with Object.entries when lib is updated to es2017.
        for (var _a = 0, _b = Object.keys(customData); _a < _b.length; _a++) {
            var key = _b[_a];
            if (key.slice(-1) !== '_') {
                if (key in error) {
                    console.warn("Overwriting FirebaseError base field \"" + key + "\" can cause unexpected behavior.");
                }
                error[key] = customData[key];
            }
        }
        return error;
    };
    return ErrorFactory;
}());
function replaceTemplate(template, data) {
    return template.replace(PATTERN, function (_, key) {
        var value = data[key];
        return value != null ? value.toString() : "<" + key + "?>";
    });
}
var PATTERN = /\{\$([^}]+)}/g;

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Evaluates a JSON string into a javascript object.
 *
 * @param {string} str A string containing JSON.
 * @return {*} The javascript object representing the specified JSON.
 */
function jsonEval(str) {
    return JSON.parse(str);
}
/**
 * Returns JSON representing a javascript object.
 * @param {*} data Javascript object to be stringified.
 * @return {string} The JSON contents of the object.
 */
function stringify(data) {
    return JSON.stringify(data);
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Decodes a Firebase auth. token into constituent parts.
 *
 * Notes:
 * - May return with invalid / incomplete claims if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var decode = function (token) {
    var header = {}, claims = {}, data = {}, signature = '';
    try {
        var parts = token.split('.');
        header = jsonEval(base64Decode(parts[0]) || '');
        claims = jsonEval(base64Decode(parts[1]) || '');
        signature = parts[2];
        data = claims['d'] || {};
        delete claims['d'];
    }
    catch (e) { }
    return {
        header: header,
        claims: claims,
        data: data,
        signature: signature
    };
};
/**
 * Decodes a Firebase auth. token and checks the validity of its time-based claims. Will return true if the
 * token is within the time window authorized by the 'nbf' (not-before) and 'iat' (issued-at) claims.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidTimestamp = function (token) {
    var claims = decode(token).claims;
    var now = Math.floor(new Date().getTime() / 1000);
    var validSince = 0, validUntil = 0;
    if (typeof claims === 'object') {
        if (claims.hasOwnProperty('nbf')) {
            validSince = claims['nbf'];
        }
        else if (claims.hasOwnProperty('iat')) {
            validSince = claims['iat'];
        }
        if (claims.hasOwnProperty('exp')) {
            validUntil = claims['exp'];
        }
        else {
            // token will expire after 24h by default
            validUntil = validSince + 86400;
        }
    }
    return (!!now &&
        !!validSince &&
        !!validUntil &&
        now >= validSince &&
        now <= validUntil);
};
/**
 * Decodes a Firebase auth. token and returns its issued at time if valid, null otherwise.
 *
 * Notes:
 * - May return null if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var issuedAtTime = function (token) {
    var claims = decode(token).claims;
    if (typeof claims === 'object' && claims.hasOwnProperty('iat')) {
        return claims['iat'];
    }
    return null;
};
/**
 * Decodes a Firebase auth. token and checks the validity of its format. Expects a valid issued-at time.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isValidFormat = function (token) {
    var decoded = decode(token), claims = decoded.claims;
    return !!claims && typeof claims === 'object' && claims.hasOwnProperty('iat');
};
/**
 * Attempts to peer into an auth token and determine if it's an admin auth token by looking at the claims portion.
 *
 * Notes:
 * - May return a false negative if there's no native base64 decoding support.
 * - Doesn't check if the token is actually valid.
 */
var isAdmin = function (token) {
    var claims = decode(token).claims;
    return typeof claims === 'object' && claims['admin'] === true;
};

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function contains(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}
function safeGet(obj, key) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return obj[key];
    }
    else {
        return undefined;
    }
}
function isEmpty(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
function map(obj, fn, contextObj) {
    var res = {};
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            res[key] = fn.call(contextObj, obj[key], key, obj);
        }
    }
    return res;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a querystring-formatted string (e.g. &arg=val&arg2=val2) from a
 * params object (e.g. {arg: 'val', arg2: 'val2'})
 * Note: You must prepend it with ? when adding it to a URL.
 */
function querystring(querystringParams) {
    var params = [];
    var _loop_1 = function (key, value) {
        if (Array.isArray(value)) {
            value.forEach(function (arrayVal) {
                params.push(encodeURIComponent(key) + '=' + encodeURIComponent(arrayVal));
            });
        }
        else {
            params.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }
    };
    for (var _i = 0, _a = Object.entries(querystringParams); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        _loop_1(key, value);
    }
    return params.length ? '&' + params.join('&') : '';
}
/**
 * Decodes a querystring (e.g. ?arg=val&arg2=val2) into a params object
 * (e.g. {arg: 'val', arg2: 'val2'})
 */
function querystringDecode(querystring) {
    var obj = {};
    var tokens = querystring.replace(/^\?/, '').split('&');
    tokens.forEach(function (token) {
        if (token) {
            var key = token.split('=');
            obj[key[0]] = key[1];
        }
    });
    return obj;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview SHA-1 cryptographic hash.
 * Variable names follow the notation in FIPS PUB 180-3:
 * http://csrc.nist.gov/publications/fips/fips180-3/fips180-3_final.pdf.
 *
 * Usage:
 *   var sha1 = new sha1();
 *   sha1.update(bytes);
 *   var hash = sha1.digest();
 *
 * Performance:
 *   Chrome 23:   ~400 Mbit/s
 *   Firefox 16:  ~250 Mbit/s
 *
 */
/**
 * SHA-1 cryptographic hash constructor.
 *
 * The properties declared here are discussed in the above algorithm document.
 * @constructor
 * @final
 * @struct
 */
var Sha1 = /** @class */ (function () {
    function Sha1() {
        /**
         * Holds the previous values of accumulated variables a-e in the compress_
         * function.
         * @private
         */
        this.chain_ = [];
        /**
         * A buffer holding the partially computed hash result.
         * @private
         */
        this.buf_ = [];
        /**
         * An array of 80 bytes, each a part of the message to be hashed.  Referred to
         * as the message schedule in the docs.
         * @private
         */
        this.W_ = [];
        /**
         * Contains data needed to pad messages less than 64 bytes.
         * @private
         */
        this.pad_ = [];
        /**
         * @private {number}
         */
        this.inbuf_ = 0;
        /**
         * @private {number}
         */
        this.total_ = 0;
        this.blockSize = 512 / 8;
        this.pad_[0] = 128;
        for (var i = 1; i < this.blockSize; ++i) {
            this.pad_[i] = 0;
        }
        this.reset();
    }
    Sha1.prototype.reset = function () {
        this.chain_[0] = 0x67452301;
        this.chain_[1] = 0xefcdab89;
        this.chain_[2] = 0x98badcfe;
        this.chain_[3] = 0x10325476;
        this.chain_[4] = 0xc3d2e1f0;
        this.inbuf_ = 0;
        this.total_ = 0;
    };
    /**
     * Internal compress helper function.
     * @param buf Block to compress.
     * @param offset Offset of the block in the buffer.
     * @private
     */
    Sha1.prototype.compress_ = function (buf, offset) {
        if (!offset) {
            offset = 0;
        }
        var W = this.W_;
        // get 16 big endian words
        if (typeof buf === 'string') {
            for (var i = 0; i < 16; i++) {
                // TODO(user): [bug 8140122] Recent versions of Safari for Mac OS and iOS
                // have a bug that turns the post-increment ++ operator into pre-increment
                // during JIT compilation.  We have code that depends heavily on SHA-1 for
                // correctness and which is affected by this bug, so I've removed all uses
                // of post-increment ++ in which the result value is used.  We can revert
                // this change once the Safari bug
                // (https://bugs.webkit.org/show_bug.cgi?id=109036) has been fixed and
                // most clients have been updated.
                W[i] =
                    (buf.charCodeAt(offset) << 24) |
                        (buf.charCodeAt(offset + 1) << 16) |
                        (buf.charCodeAt(offset + 2) << 8) |
                        buf.charCodeAt(offset + 3);
                offset += 4;
            }
        }
        else {
            for (var i = 0; i < 16; i++) {
                W[i] =
                    (buf[offset] << 24) |
                        (buf[offset + 1] << 16) |
                        (buf[offset + 2] << 8) |
                        buf[offset + 3];
                offset += 4;
            }
        }
        // expand to 80 words
        for (var i = 16; i < 80; i++) {
            var t = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
            W[i] = ((t << 1) | (t >>> 31)) & 0xffffffff;
        }
        var a = this.chain_[0];
        var b = this.chain_[1];
        var c = this.chain_[2];
        var d = this.chain_[3];
        var e = this.chain_[4];
        var f, k;
        // TODO(user): Try to unroll this loop to speed up the computation.
        for (var i = 0; i < 80; i++) {
            if (i < 40) {
                if (i < 20) {
                    f = d ^ (b & (c ^ d));
                    k = 0x5a827999;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0x6ed9eba1;
                }
            }
            else {
                if (i < 60) {
                    f = (b & c) | (d & (b | c));
                    k = 0x8f1bbcdc;
                }
                else {
                    f = b ^ c ^ d;
                    k = 0xca62c1d6;
                }
            }
            var t = (((a << 5) | (a >>> 27)) + f + e + k + W[i]) & 0xffffffff;
            e = d;
            d = c;
            c = ((b << 30) | (b >>> 2)) & 0xffffffff;
            b = a;
            a = t;
        }
        this.chain_[0] = (this.chain_[0] + a) & 0xffffffff;
        this.chain_[1] = (this.chain_[1] + b) & 0xffffffff;
        this.chain_[2] = (this.chain_[2] + c) & 0xffffffff;
        this.chain_[3] = (this.chain_[3] + d) & 0xffffffff;
        this.chain_[4] = (this.chain_[4] + e) & 0xffffffff;
    };
    Sha1.prototype.update = function (bytes, length) {
        // TODO(johnlenz): tighten the function signature and remove this check
        if (bytes == null) {
            return;
        }
        if (length === undefined) {
            length = bytes.length;
        }
        var lengthMinusBlock = length - this.blockSize;
        var n = 0;
        // Using local instead of member variables gives ~5% speedup on Firefox 16.
        var buf = this.buf_;
        var inbuf = this.inbuf_;
        // The outer while loop should execute at most twice.
        while (n < length) {
            // When we have no data in the block to top up, we can directly process the
            // input buffer (assuming it contains sufficient data). This gives ~25%
            // speedup on Chrome 23 and ~15% speedup on Firefox 16, but requires that
            // the data is provided in large chunks (or in multiples of 64 bytes).
            if (inbuf === 0) {
                while (n <= lengthMinusBlock) {
                    this.compress_(bytes, n);
                    n += this.blockSize;
                }
            }
            if (typeof bytes === 'string') {
                while (n < length) {
                    buf[inbuf] = bytes.charCodeAt(n);
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
            else {
                while (n < length) {
                    buf[inbuf] = bytes[n];
                    ++inbuf;
                    ++n;
                    if (inbuf === this.blockSize) {
                        this.compress_(buf);
                        inbuf = 0;
                        // Jump to the outer loop so we use the full-block optimization.
                        break;
                    }
                }
            }
        }
        this.inbuf_ = inbuf;
        this.total_ += length;
    };
    /** @override */
    Sha1.prototype.digest = function () {
        var digest = [];
        var totalBits = this.total_ * 8;
        // Add pad 0x80 0x00*.
        if (this.inbuf_ < 56) {
            this.update(this.pad_, 56 - this.inbuf_);
        }
        else {
            this.update(this.pad_, this.blockSize - (this.inbuf_ - 56));
        }
        // Add # bits.
        for (var i = this.blockSize - 1; i >= 56; i--) {
            this.buf_[i] = totalBits & 255;
            totalBits /= 256; // Don't use bit-shifting here!
        }
        this.compress_(this.buf_);
        var n = 0;
        for (var i = 0; i < 5; i++) {
            for (var j = 24; j >= 0; j -= 8) {
                digest[n] = (this.chain_[i] >> j) & 255;
                ++n;
            }
        }
        return digest;
    };
    return Sha1;
}());

/**
 * Helper to make a Subscribe function (just like Promise helps make a
 * Thenable).
 *
 * @param executor Function which can make calls to a single Observer
 *     as a proxy.
 * @param onNoObservers Callback when count of Observers goes to zero.
 */
function createSubscribe(executor, onNoObservers) {
    var proxy = new ObserverProxy(executor, onNoObservers);
    return proxy.subscribe.bind(proxy);
}
/**
 * Implement fan-out for any number of Observers attached via a subscribe
 * function.
 */
var ObserverProxy = /** @class */ (function () {
    /**
     * @param executor Function which can make calls to a single Observer
     *     as a proxy.
     * @param onNoObservers Callback when count of Observers goes to zero.
     */
    function ObserverProxy(executor, onNoObservers) {
        var _this = this;
        this.observers = [];
        this.unsubscribes = [];
        this.observerCount = 0;
        // Micro-task scheduling by calling task.then().
        this.task = Promise.resolve();
        this.finalized = false;
        this.onNoObservers = onNoObservers;
        // Call the executor asynchronously so subscribers that are called
        // synchronously after the creation of the subscribe function
        // can still receive the very first value generated in the executor.
        this.task
            .then(function () {
            executor(_this);
        })
            .catch(function (e) {
            _this.error(e);
        });
    }
    ObserverProxy.prototype.next = function (value) {
        this.forEachObserver(function (observer) {
            observer.next(value);
        });
    };
    ObserverProxy.prototype.error = function (error) {
        this.forEachObserver(function (observer) {
            observer.error(error);
        });
        this.close(error);
    };
    ObserverProxy.prototype.complete = function () {
        this.forEachObserver(function (observer) {
            observer.complete();
        });
        this.close();
    };
    /**
     * Subscribe function that can be used to add an Observer to the fan-out list.
     *
     * - We require that no event is sent to a subscriber sychronously to their
     *   call to subscribe().
     */
    ObserverProxy.prototype.subscribe = function (nextOrObserver, error, complete) {
        var _this = this;
        var observer;
        if (nextOrObserver === undefined &&
            error === undefined &&
            complete === undefined) {
            throw new Error('Missing Observer.');
        }
        // Assemble an Observer object when passed as callback functions.
        if (implementsAnyMethods(nextOrObserver, [
            'next',
            'error',
            'complete'
        ])) {
            observer = nextOrObserver;
        }
        else {
            observer = {
                next: nextOrObserver,
                error: error,
                complete: complete
            };
        }
        if (observer.next === undefined) {
            observer.next = noop;
        }
        if (observer.error === undefined) {
            observer.error = noop;
        }
        if (observer.complete === undefined) {
            observer.complete = noop;
        }
        var unsub = this.unsubscribeOne.bind(this, this.observers.length);
        // Attempt to subscribe to a terminated Observable - we
        // just respond to the Observer with the final error or complete
        // event.
        if (this.finalized) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.task.then(function () {
                try {
                    if (_this.finalError) {
                        observer.error(_this.finalError);
                    }
                    else {
                        observer.complete();
                    }
                }
                catch (e) {
                    // nothing
                }
                return;
            });
        }
        this.observers.push(observer);
        return unsub;
    };
    // Unsubscribe is synchronous - we guarantee that no events are sent to
    // any unsubscribed Observer.
    ObserverProxy.prototype.unsubscribeOne = function (i) {
        if (this.observers === undefined || this.observers[i] === undefined) {
            return;
        }
        delete this.observers[i];
        this.observerCount -= 1;
        if (this.observerCount === 0 && this.onNoObservers !== undefined) {
            this.onNoObservers(this);
        }
    };
    ObserverProxy.prototype.forEachObserver = function (fn) {
        if (this.finalized) {
            // Already closed by previous event....just eat the additional values.
            return;
        }
        // Since sendOne calls asynchronously - there is no chance that
        // this.observers will become undefined.
        for (var i = 0; i < this.observers.length; i++) {
            this.sendOne(i, fn);
        }
    };
    // Call the Observer via one of it's callback function. We are careful to
    // confirm that the observe has not been unsubscribed since this asynchronous
    // function had been queued.
    ObserverProxy.prototype.sendOne = function (i, fn) {
        var _this = this;
        // Execute the callback asynchronously
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
            if (_this.observers !== undefined && _this.observers[i] !== undefined) {
                try {
                    fn(_this.observers[i]);
                }
                catch (e) {
                    // Ignore exceptions raised in Observers or missing methods of an
                    // Observer.
                    // Log error to console. b/31404806
                    if (typeof console !== 'undefined' && console.error) {
                        console.error(e);
                    }
                }
            }
        });
    };
    ObserverProxy.prototype.close = function (err) {
        var _this = this;
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        if (err !== undefined) {
            this.finalError = err;
        }
        // Proxy is no longer needed - garbage collect references
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.task.then(function () {
            _this.observers = undefined;
            _this.onNoObservers = undefined;
        });
    };
    return ObserverProxy;
}());
/** Turn synchronous function into one called asynchronously. */
function async(fn, onError) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        Promise.resolve(true)
            .then(function () {
            fn.apply(void 0, args);
        })
            .catch(function (error) {
            if (onError) {
                onError(error);
            }
        });
    };
}
/**
 * Return true if the object passed in implements any of the named methods.
 */
function implementsAnyMethods(obj, methods) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    for (var _i = 0, methods_1 = methods; _i < methods_1.length; _i++) {
        var method = methods_1[_i];
        if (method in obj && typeof obj[method] === 'function') {
            return true;
        }
    }
    return false;
}
function noop() {
    // do nothing
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Check to make sure the appropriate number of arguments are provided for a public function.
 * Throws an error if it fails.
 *
 * @param fnName The function name
 * @param minCount The minimum number of arguments to allow for the function call
 * @param maxCount The maximum number of argument to allow for the function call
 * @param argCount The actual number of arguments provided.
 */
var validateArgCount = function (fnName, minCount, maxCount, argCount) {
    var argError;
    if (argCount < minCount) {
        argError = 'at least ' + minCount;
    }
    else if (argCount > maxCount) {
        argError = maxCount === 0 ? 'none' : 'no more than ' + maxCount;
    }
    if (argError) {
        var error = fnName +
            ' failed: Was called with ' +
            argCount +
            (argCount === 1 ? ' argument.' : ' arguments.') +
            ' Expects ' +
            argError +
            '.';
        throw new Error(error);
    }
};
/**
 * Generates a string to prefix an error message about failed argument validation
 *
 * @param fnName The function name
 * @param argumentNumber The index of the argument
 * @param optional Whether or not the argument is optional
 * @return The prefix to add to the error thrown for validation.
 */
function errorPrefix(fnName, argumentNumber, optional) {
    var argName = '';
    switch (argumentNumber) {
        case 1:
            argName = optional ? 'first' : 'First';
            break;
        case 2:
            argName = optional ? 'second' : 'Second';
            break;
        case 3:
            argName = optional ? 'third' : 'Third';
            break;
        case 4:
            argName = optional ? 'fourth' : 'Fourth';
            break;
        default:
            throw new Error('errorPrefix called with argumentNumber > 4.  Need to update it?');
    }
    var error = fnName + ' failed: ';
    error += argName + ' argument ';
    return error;
}
/**
 * @param fnName
 * @param argumentNumber
 * @param namespace
 * @param optional
 */
function validateNamespace(fnName, argumentNumber, namespace, optional) {
    if (optional && !namespace) {
        return;
    }
    if (typeof namespace !== 'string') {
        //TODO: I should do more validation here. We only allow certain chars in namespaces.
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid firebase namespace.');
    }
}
function validateCallback(fnName, argumentNumber, callback, optional) {
    if (optional && !callback) {
        return;
    }
    if (typeof callback !== 'function') {
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid function.');
    }
}
function validateContextObject(fnName, argumentNumber, context, optional) {
    if (optional && !context) {
        return;
    }
    if (typeof context !== 'object' || context === null) {
        throw new Error(errorPrefix(fnName, argumentNumber, optional) +
            'must be a valid context object.');
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Code originally came from goog.crypt.stringToUtf8ByteArray, but for some reason they
// automatically replaced '\r\n' with '\n', and they didn't handle surrogate pairs,
// so it's been modified.
// Note that not all Unicode characters appear as single characters in JavaScript strings.
// fromCharCode returns the UTF-16 encoding of a character - so some Unicode characters
// use 2 characters in Javascript.  All 4-byte UTF-8 characters begin with a first
// character in the range 0xD800 - 0xDBFF (the first character of a so-called surrogate
// pair).
// See http://www.ecma-international.org/ecma-262/5.1/#sec-15.1.3
/**
 * @param {string} str
 * @return {Array}
 */
var stringToByteArray$1 = function (str) {
    var out = [];
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        // Is this the lead surrogate in a surrogate pair?
        if (c >= 0xd800 && c <= 0xdbff) {
            var high = c - 0xd800; // the high 10 bits.
            i++;
            assert(i < str.length, 'Surrogate pair missing trail surrogate.');
            var low = str.charCodeAt(i) - 0xdc00; // the low 10 bits.
            c = 0x10000 + (high << 10) + low;
        }
        if (c < 128) {
            out[p++] = c;
        }
        else if (c < 2048) {
            out[p++] = (c >> 6) | 192;
            out[p++] = (c & 63) | 128;
        }
        else if (c < 65536) {
            out[p++] = (c >> 12) | 224;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
        else {
            out[p++] = (c >> 18) | 240;
            out[p++] = ((c >> 12) & 63) | 128;
            out[p++] = ((c >> 6) & 63) | 128;
            out[p++] = (c & 63) | 128;
        }
    }
    return out;
};
/**
 * Calculate length without actually converting; useful for doing cheaper validation.
 * @param {string} str
 * @return {number}
 */
var stringLength = function (str) {
    var p = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c < 128) {
            p++;
        }
        else if (c < 2048) {
            p += 2;
        }
        else if (c >= 0xd800 && c <= 0xdbff) {
            // Lead surrogate of a surrogate pair.  The pair together will take 4 bytes to represent.
            p += 4;
            i++; // skip trail surrogate.
        }
        else {
            p += 3;
        }
    }
    return p;
};

exports.CONSTANTS = CONSTANTS;
exports.Deferred = Deferred;
exports.ErrorFactory = ErrorFactory;
exports.FirebaseError = FirebaseError;
exports.Sha1 = Sha1;
exports.assert = assert;
exports.assertionError = assertionError;
exports.async = async;
exports.base64 = base64;
exports.base64Decode = base64Decode;
exports.base64Encode = base64Encode;
exports.contains = contains;
exports.createSubscribe = createSubscribe;
exports.decode = decode;
exports.deepCopy = deepCopy;
exports.deepExtend = deepExtend;
exports.errorPrefix = errorPrefix;
exports.getUA = getUA;
exports.isAdmin = isAdmin;
exports.isBrowser = isBrowser;
exports.isBrowserExtension = isBrowserExtension;
exports.isElectron = isElectron;
exports.isEmpty = isEmpty;
exports.isIE = isIE;
exports.isMobileCordova = isMobileCordova;
exports.isNode = isNode;
exports.isNodeSdk = isNodeSdk;
exports.isReactNative = isReactNative;
exports.isUWP = isUWP;
exports.isValidFormat = isValidFormat;
exports.isValidTimestamp = isValidTimestamp;
exports.issuedAtTime = issuedAtTime;
exports.jsonEval = jsonEval;
exports.map = map;
exports.querystring = querystring;
exports.querystringDecode = querystringDecode;
exports.safeGet = safeGet;
exports.stringLength = stringLength;
exports.stringToByteArray = stringToByteArray$1;
exports.stringify = stringify;
exports.validateArgCount = validateArgCount;
exports.validateCallback = validateCallback;
exports.validateContextObject = validateContextObject;
exports.validateNamespace = validateNamespace;


},{"tslib":"node_modules/tslib/tslib.es6.js"}],"node_modules/@firebase/component/dist/index.cjs.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var util = require('@firebase/util');

/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */
var Component = /** @class */ (function () {
    /**
     *
     * @param name The public service name, e.g. app, auth, firestore, database
     * @param instanceFactory Service factory responsible for creating the public interface
     * @param type whether the service provided by the component is public or private
     */
    function Component(name, instanceFactory, type) {
        this.name = name;
        this.instanceFactory = instanceFactory;
        this.type = type;
        this.multipleInstances = false;
        /**
         * Properties to be added to the service namespace
         */
        this.serviceProps = {};
        this.instantiationMode = "LAZY" /* LAZY */;
    }
    Component.prototype.setInstantiationMode = function (mode) {
        this.instantiationMode = mode;
        return this;
    };
    Component.prototype.setMultipleInstances = function (multipleInstances) {
        this.multipleInstances = multipleInstances;
        return this;
    };
    Component.prototype.setServiceProps = function (props) {
        this.serviceProps = props;
        return this;
    };
    return Component;
}());

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_ENTRY_NAME = '[DEFAULT]';

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */
var Provider = /** @class */ (function () {
    function Provider(name, container) {
        this.name = name;
        this.container = container;
        this.component = null;
        this.instances = new Map();
        this.instancesDeferred = new Map();
    }
    /**
     * @param identifier A provider can provide mulitple instances of a service
     * if this.component.multipleInstances is true.
     */
    Provider.prototype.get = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        if (!this.instancesDeferred.has(normalizedIdentifier)) {
            var deferred = new util.Deferred();
            this.instancesDeferred.set(normalizedIdentifier, deferred);
            // If the service instance is available, resolve the promise with it immediately
            try {
                var instance = this.getOrInitializeService(normalizedIdentifier);
                if (instance) {
                    deferred.resolve(instance);
                }
            }
            catch (e) {
                // when the instance factory throws an exception during get(), it should not cause
                // a fatal error. We just return the unresolved promise in this case.
            }
        }
        return this.instancesDeferred.get(normalizedIdentifier).promise;
    };
    Provider.prototype.getImmediate = function (options) {
        var _a = tslib.__assign({ identifier: DEFAULT_ENTRY_NAME, optional: false }, options), identifier = _a.identifier, optional = _a.optional;
        // if multipleInstances is not supported, use the default name
        var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
        try {
            var instance = this.getOrInitializeService(normalizedIdentifier);
            if (!instance) {
                if (optional) {
                    return null;
                }
                throw Error("Service " + this.name + " is not available");
            }
            return instance;
        }
        catch (e) {
            if (optional) {
                return null;
            }
            else {
                throw e;
            }
        }
    };
    Provider.prototype.getComponent = function () {
        return this.component;
    };
    Provider.prototype.setComponent = function (component) {
        var e_1, _a;
        if (component.name !== this.name) {
            throw Error("Mismatching Component " + component.name + " for Provider " + this.name + ".");
        }
        if (this.component) {
            throw Error("Component for " + this.name + " has already been provided");
        }
        this.component = component;
        // if the service is eager, initialize the default instance
        if (isComponentEager(component)) {
            try {
                this.getOrInitializeService(DEFAULT_ENTRY_NAME);
            }
            catch (e) {
                // when the instance factory for an eager Component throws an exception during the eager
                // initialization, it should not cause a fatal error.
                // TODO: Investigate if we need to make it configurable, because some component may want to cause
                // a fatal error in this case?
            }
        }
        try {
            // Create service instances for the pending promises and resolve them
            // NOTE: if this.multipleInstances is false, only the default instance will be created
            // and all promises with resolve with it regardless of the identifier.
            for (var _b = tslib.__values(this.instancesDeferred.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = tslib.__read(_c.value, 2), instanceIdentifier = _d[0], instanceDeferred = _d[1];
                var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
                try {
                    // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
                    var instance = this.getOrInitializeService(normalizedIdentifier);
                    instanceDeferred.resolve(instance);
                }
                catch (e) {
                    // when the instance factory throws an exception, it should not cause
                    // a fatal error. We just leave the promise unresolved.
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Provider.prototype.clearInstance = function (identifier) {
        if (identifier === void 0) { identifier = DEFAULT_ENTRY_NAME; }
        this.instancesDeferred.delete(identifier);
        this.instances.delete(identifier);
    };
    // app.delete() will call this method on every provider to delete the services
    // TODO: should we mark the provider as deleted?
    Provider.prototype.delete = function () {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var services;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        services = Array.from(this.instances.values());
                        return [4 /*yield*/, Promise.all(services
                                .filter(function (service) { return 'INTERNAL' in service; })
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                .map(function (service) { return service.INTERNAL.delete(); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Provider.prototype.isComponentSet = function () {
        return this.component != null;
    };
    Provider.prototype.getOrInitializeService = function (identifier) {
        var instance = this.instances.get(identifier);
        if (!instance && this.component) {
            instance = this.component.instanceFactory(this.container, normalizeIdentifierForFactory(identifier));
            this.instances.set(identifier, instance);
        }
        return instance || null;
    };
    Provider.prototype.normalizeInstanceIdentifier = function (identifier) {
        if (this.component) {
            return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME;
        }
        else {
            return identifier; // assume multiple instances are supported before the component is provided.
        }
    };
    return Provider;
}());
// undefined should be passed to the service factory for the default instance
function normalizeIdentifierForFactory(identifier) {
    return identifier === DEFAULT_ENTRY_NAME ? undefined : identifier;
}
function isComponentEager(component) {
    return component.instantiationMode === "EAGER" /* EAGER */;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */
var ComponentContainer = /** @class */ (function () {
    function ComponentContainer(name) {
        this.name = name;
        this.providers = new Map();
    }
    /**
     *
     * @param component Component being added
     * @param overwrite When a component with the same name has already been registered,
     * if overwrite is true: overwrite the existing component with the new component and create a new
     * provider with the new component. It can be useful in tests where you want to use different mocks
     * for different tests.
     * if overwrite is false: throw an exception
     */
    ComponentContainer.prototype.addComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            throw new Error("Component " + component.name + " has already been registered with " + this.name);
        }
        provider.setComponent(component);
    };
    ComponentContainer.prototype.addOrOverwriteComponent = function (component) {
        var provider = this.getProvider(component.name);
        if (provider.isComponentSet()) {
            // delete the existing provider from the container, so we can register the new component
            this.providers.delete(component.name);
        }
        this.addComponent(component);
    };
    /**
     * getProvider provides a type safe interface where it can only be called with a field name
     * present in NameServiceMapping interface.
     *
     * Firebase SDKs providing services should extend NameServiceMapping interface to register
     * themselves.
     */
    ComponentContainer.prototype.getProvider = function (name) {
        if (this.providers.has(name)) {
            return this.providers.get(name);
        }
        // create a Provider for a service that hasn't registered with Firebase
        var provider = new Provider(name, this);
        this.providers.set(name, provider);
        return provider;
    };
    ComponentContainer.prototype.getProviders = function () {
        return Array.from(this.providers.values());
    };
    return ComponentContainer;
}());

exports.Component = Component;
exports.ComponentContainer = ComponentContainer;
exports.Provider = Provider;


},{"tslib":"node_modules/tslib/tslib.es6.js","@firebase/util":"node_modules/@firebase/util/dist/index.cjs.js"}],"node_modules/@firebase/logger/dist/index.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogLevel = setLogLevel;
exports.Logger = exports.LogLevel = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * A container for all of the Logger instances
 */


var instances = [];
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */

var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
/**
 * The default log level
 */


var defaultLogLevel = LogLevel.INFO;
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */

var defaultLogHandler = function (instance, logType) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  if (logType < instance.logLevel) {
    return;
  }

  var now = new Date().toISOString();

  switch (logType) {
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    case LogLevel.DEBUG:
      console.log.apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
      break;

    case LogLevel.VERBOSE:
      console.log.apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
      break;

    case LogLevel.INFO:
      console.info.apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
      break;

    case LogLevel.WARN:
      console.warn.apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
      break;

    case LogLevel.ERROR:
      console.error.apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
      break;

    default:
      throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
  }
};

var Logger =
/** @class */
function () {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  function Logger(name) {
    this.name = name;
    /**
     * The log level of the given Logger instance.
     */

    this._logLevel = defaultLogLevel;
    /**
     * The log handler for the Logger instance.
     */

    this._logHandler = defaultLogHandler;
    /**
     * Capture the current instance for later use
     */

    instances.push(this);
  }

  Object.defineProperty(Logger.prototype, "logLevel", {
    get: function () {
      return this._logLevel;
    },
    set: function (val) {
      if (!(val in LogLevel)) {
        throw new TypeError('Invalid value assigned to `logLevel`');
      }

      this._logLevel = val;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Logger.prototype, "logHandler", {
    get: function () {
      return this._logHandler;
    },
    set: function (val) {
      if (typeof val !== 'function') {
        throw new TypeError('Value assigned to `logHandler` must be a function');
      }

      this._logHandler = val;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * The functions below are all based on the `console` interface
   */

  Logger.prototype.debug = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this._logHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
  };

  Logger.prototype.log = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this._logHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
  };

  Logger.prototype.info = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this._logHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
  };

  Logger.prototype.warn = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this._logHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
  };

  Logger.prototype.error = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    this._logHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
  };

  return Logger;
}();
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


exports.Logger = Logger;

function setLogLevel(level) {
  instances.forEach(function (inst) {
    inst.logLevel = level;
  });
}
},{}],"node_modules/@firebase/app/dist/index.cjs.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var util = require('@firebase/util');
var component = require('@firebase/component');
var logger$1 = require('@firebase/logger');

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
var ERRORS = (_a = {},
    _a["no-app" /* NO_APP */] = "No Firebase App '{$appName}' has been created - " +
        'call Firebase App.initializeApp()',
    _a["bad-app-name" /* BAD_APP_NAME */] = "Illegal App name: '{$appName}",
    _a["duplicate-app" /* DUPLICATE_APP */] = "Firebase App named '{$appName}' already exists",
    _a["app-deleted" /* APP_DELETED */] = "Firebase App named '{$appName}' already deleted",
    _a["invalid-app-argument" /* INVALID_APP_ARGUMENT */] = 'firebase.{$appName}() takes either no argument or a ' +
        'Firebase App instance.',
    _a);
var ERROR_FACTORY = new util.ErrorFactory('app', 'Firebase', ERRORS);

var name = "@firebase/app";
var version = "0.5.4";

var name$1 = "@firebase/analytics";

var name$2 = "@firebase/auth";

var name$3 = "@firebase/database";

var name$4 = "@firebase/functions";

var name$5 = "@firebase/installations";

var name$6 = "@firebase/messaging";

var name$7 = "@firebase/performance";

var name$8 = "@firebase/remote-config";

var name$9 = "@firebase/storage";

var name$a = "@firebase/firestore";

var name$b = "firebase-wrapper";

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a$1;
var DEFAULT_ENTRY_NAME = '[DEFAULT]';
var PLATFORM_LOG_STRING = (_a$1 = {},
    _a$1[name] = 'fire-core',
    _a$1[name$1] = 'fire-analytics',
    _a$1[name$2] = 'fire-auth',
    _a$1[name$3] = 'fire-rtdb',
    _a$1[name$4] = 'fire-fn',
    _a$1[name$5] = 'fire-iid',
    _a$1[name$6] = 'fire-fcm',
    _a$1[name$7] = 'fire-perf',
    _a$1[name$8] = 'fire-rc',
    _a$1[name$9] = 'fire-gcs',
    _a$1[name$a] = 'fire-fst',
    _a$1['fire-js'] = 'fire-js',
    _a$1[name$b] = 'fire-js-all',
    _a$1);

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var logger = new logger$1.Logger('@firebase/app');

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Global context object for a collection of services using
 * a shared authentication state.
 */
var FirebaseAppImpl = /** @class */ (function () {
    function FirebaseAppImpl(options, config, firebase_) {
        var e_1, _a;
        var _this = this;
        this.firebase_ = firebase_;
        this.isDeleted_ = false;
        this.name_ = config.name;
        this.automaticDataCollectionEnabled_ =
            config.automaticDataCollectionEnabled || false;
        this.options_ = util.deepCopy(options);
        this.container = new component.ComponentContainer(config.name);
        // add itself to container
        this._addComponent(new component.Component('app', function () { return _this; }, "PUBLIC" /* PUBLIC */));
        try {
            // populate ComponentContainer with existing components
            for (var _b = tslib.__values(this.firebase_.INTERNAL.components.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var component$1 = _c.value;
                this._addComponent(component$1);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    Object.defineProperty(FirebaseAppImpl.prototype, "automaticDataCollectionEnabled", {
        get: function () {
            this.checkDestroyed_();
            return this.automaticDataCollectionEnabled_;
        },
        set: function (val) {
            this.checkDestroyed_();
            this.automaticDataCollectionEnabled_ = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "name", {
        get: function () {
            this.checkDestroyed_();
            return this.name_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirebaseAppImpl.prototype, "options", {
        get: function () {
            this.checkDestroyed_();
            return this.options_;
        },
        enumerable: true,
        configurable: true
    });
    FirebaseAppImpl.prototype.delete = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.checkDestroyed_();
            resolve();
        })
            .then(function () {
            _this.firebase_.INTERNAL.removeApp(_this.name_);
            return Promise.all(_this.container.getProviders().map(function (provider) { return provider.delete(); }));
        })
            .then(function () {
            _this.isDeleted_ = true;
        });
    };
    /**
     * Return a service instance associated with this app (creating it
     * on demand), identified by the passed instanceIdentifier.
     *
     * NOTE: Currently storage and functions are the only ones that are leveraging this
     * functionality. They invoke it by calling:
     *
     * ```javascript
     * firebase.app().storage('STORAGE BUCKET ID')
     * ```
     *
     * The service name is passed to this already
     * @internal
     */
    FirebaseAppImpl.prototype._getService = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME; }
        this.checkDestroyed_();
        // getImmediate will always succeed because _getService is only called for registered components.
        return this.container.getProvider(name).getImmediate({
            identifier: instanceIdentifier
        });
    };
    /**
     * Remove a service instance from the cache, so we will create a new instance for this service
     * when people try to get this service again.
     *
     * NOTE: currently only firestore is using this functionality to support firestore shutdown.
     *
     * @param name The service name
     * @param instanceIdentifier instance identifier in case multiple instances are allowed
     * @internal
     */
    FirebaseAppImpl.prototype._removeServiceInstance = function (name, instanceIdentifier) {
        if (instanceIdentifier === void 0) { instanceIdentifier = DEFAULT_ENTRY_NAME; }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.container.getProvider(name).clearInstance(instanceIdentifier);
    };
    /**
     * @param component the component being added to this app's container
     */
    FirebaseAppImpl.prototype._addComponent = function (component) {
        try {
            this.container.addComponent(component);
        }
        catch (e) {
            logger.debug("Component " + component.name + " failed to register with FirebaseApp " + this.name, e);
        }
    };
    FirebaseAppImpl.prototype._addOrOverwriteComponent = function (component) {
        this.container.addOrOverwriteComponent(component);
    };
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */
    FirebaseAppImpl.prototype.checkDestroyed_ = function () {
        if (this.isDeleted_) {
            throw ERROR_FACTORY.create("app-deleted" /* APP_DELETED */, { appName: this.name_ });
        }
    };
    return FirebaseAppImpl;
}());
// Prevent dead-code elimination of these methods w/o invalid property
// copying.
(FirebaseAppImpl.prototype.name && FirebaseAppImpl.prototype.options) ||
    FirebaseAppImpl.prototype.delete ||
    console.log('dc');

var version$1 = "7.8.1";

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Because auth can't share code with other components, we attach the utility functions
 * in an internal namespace to share code.
 * This function return a firebase namespace object without
 * any utility functions, so it can be shared between the regular firebaseNamespace and
 * the lite version.
 */
function createFirebaseNamespaceCore(firebaseAppImpl) {
    var apps = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var components = new Map();
    // A namespace is a plain JavaScript Object.
    var namespace = {
        // Hack to prevent Babel from modifying the object returned
        // as the firebase namespace.
        // @ts-ignore
        __esModule: true,
        initializeApp: initializeApp,
        // @ts-ignore
        app: app,
        registerVersion: registerVersion,
        // @ts-ignore
        apps: null,
        SDK_VERSION: version$1,
        INTERNAL: {
            registerComponent: registerComponent,
            removeApp: removeApp,
            components: components,
            useAsService: useAsService
        }
    };
    // Inject a circular default export to allow Babel users who were previously
    // using:
    //
    //   import firebase from 'firebase';
    //   which becomes: var firebase = require('firebase').default;
    //
    // instead of
    //
    //   import * as firebase from 'firebase';
    //   which becomes: var firebase = require('firebase');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    namespace['default'] = namespace;
    // firebase.apps is a read-only getter.
    Object.defineProperty(namespace, 'apps', {
        get: getApps
    });
    /**
     * Called by App.delete() - but before any services associated with the App
     * are deleted.
     */
    function removeApp(name) {
        delete apps[name];
    }
    /**
     * Get the App object for a given name (or DEFAULT).
     */
    function app(name) {
        name = name || DEFAULT_ENTRY_NAME;
        if (!util.contains(apps, name)) {
            throw ERROR_FACTORY.create("no-app" /* NO_APP */, { appName: name });
        }
        return apps[name];
    }
    // @ts-ignore
    app['App'] = firebaseAppImpl;
    function initializeApp(options, rawConfig) {
        if (rawConfig === void 0) { rawConfig = {}; }
        if (typeof rawConfig !== 'object' || rawConfig === null) {
            var name_1 = rawConfig;
            rawConfig = { name: name_1 };
        }
        var config = rawConfig;
        if (config.name === undefined) {
            config.name = DEFAULT_ENTRY_NAME;
        }
        var name = config.name;
        if (typeof name !== 'string' || !name) {
            throw ERROR_FACTORY.create("bad-app-name" /* BAD_APP_NAME */, {
                appName: String(name)
            });
        }
        if (util.contains(apps, name)) {
            throw ERROR_FACTORY.create("duplicate-app" /* DUPLICATE_APP */, { appName: name });
        }
        var app = new firebaseAppImpl(options, config, namespace);
        apps[name] = app;
        return app;
    }
    /*
     * Return an array of all the non-deleted FirebaseApps.
     */
    function getApps() {
        // Make a copy so caller cannot mutate the apps list.
        return Object.keys(apps).map(function (name) { return apps[name]; });
    }
    function registerComponent(component) {
        var e_1, _a;
        var componentName = component.name;
        if (components.has(componentName)) {
            logger.debug("There were multiple attempts to register component " + componentName + ".");
            return component.type === "PUBLIC" /* PUBLIC */
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    namespace[componentName]
                : null;
        }
        components.set(componentName, component);
        // create service namespace for public components
        if (component.type === "PUBLIC" /* PUBLIC */) {
            // The Service namespace is an accessor function ...
            var serviceNamespace = function (appArg) {
                if (appArg === void 0) { appArg = app(); }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (typeof appArg[componentName] !== 'function') {
                    // Invalid argument.
                    // This happens in the following case: firebase.storage('gs:/')
                    throw ERROR_FACTORY.create("invalid-app-argument" /* INVALID_APP_ARGUMENT */, {
                        appName: componentName
                    });
                }
                // Forward service instance lookup to the FirebaseApp.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return appArg[componentName]();
            };
            // ... and a container for service-level properties.
            if (component.serviceProps !== undefined) {
                util.deepExtend(serviceNamespace, component.serviceProps);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            namespace[componentName] = serviceNamespace;
            // Patch the FirebaseAppImpl prototype
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            firebaseAppImpl.prototype[componentName] =
                // TODO: The eslint disable can be removed and the 'ignoreRestArgs'
                // option added to the no-explicit-any rule when ESlint releases it.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var serviceFxn = this._getService.bind(this, componentName);
                    return serviceFxn.apply(this, component.multipleInstances ? args : []);
                };
        }
        try {
            // add the component to existing app instances
            for (var _b = tslib.__values(Object.keys(apps)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var appName = _c.value;
                apps[appName]._addComponent(component);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return component.type === "PUBLIC" /* PUBLIC */
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                namespace[componentName]
            : null;
    }
    function registerVersion(libraryKeyOrName, version, variant) {
        var _a;
        // TODO: We can use this check to whitelist strings when/if we set up
        // a good whitelist system.
        var library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName], (_a !== null && _a !== void 0 ? _a : libraryKeyOrName));
        if (variant) {
            library += "-" + variant;
        }
        var libraryMismatch = library.match(/\s|\//);
        var versionMismatch = version.match(/\s|\//);
        if (libraryMismatch || versionMismatch) {
            var warning = [
                "Unable to register library \"" + library + "\" with version \"" + version + "\":"
            ];
            if (libraryMismatch) {
                warning.push("library name \"" + library + "\" contains illegal characters (whitespace or \"/\")");
            }
            if (libraryMismatch && versionMismatch) {
                warning.push('and');
            }
            if (versionMismatch) {
                warning.push("version name \"" + version + "\" contains illegal characters (whitespace or \"/\")");
            }
            logger.warn(warning.join(' '));
            return;
        }
        registerComponent(new component.Component(library + "-version", function () { return ({ library: library, version: version }); }, "VERSION" /* VERSION */));
    }
    // Map the requested service to a registered service name
    // (used to map auth to serverAuth service when needed).
    function useAsService(app, name) {
        if (name === 'serverAuth') {
            return null;
        }
        var useService = name;
        return useService;
    }
    return namespace;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Return a firebase namespace object.
 *
 * In production, this will be called exactly once and the result
 * assigned to the 'firebase' global.  It may be called multiple times
 * in unit tests.
 */
function createFirebaseNamespace() {
    var namespace = createFirebaseNamespaceCore(FirebaseAppImpl);
    namespace.INTERNAL = tslib.__assign(tslib.__assign({}, namespace.INTERNAL), { createFirebaseNamespace: createFirebaseNamespace,
        extendNamespace: extendNamespace,
        createSubscribe: util.createSubscribe,
        ErrorFactory: util.ErrorFactory,
        deepExtend: util.deepExtend });
    /**
     * Patch the top-level firebase namespace with additional properties.
     *
     * firebase.INTERNAL.extendNamespace()
     */
    function extendNamespace(props) {
        util.deepExtend(namespace, props);
    }
    return namespace;
}
var firebase = createFirebaseNamespace();

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PlatformLoggerService = /** @class */ (function () {
    function PlatformLoggerService(container) {
        this.container = container;
    }
    // In initial implementation, this will be called by installations on
    // auth token refresh, and installations will send this string.
    PlatformLoggerService.prototype.getPlatformInfoString = function () {
        var providers = this.container.getProviders();
        // Loop through providers and get library/version pairs from any that are
        // version components.
        return providers
            .map(function (provider) {
            if (isVersionServiceProvider(provider)) {
                var service = provider.getImmediate();
                return service.library + "/" + service.version;
            }
            else {
                return null;
            }
        })
            .filter(function (logString) { return logString; })
            .join(' ');
    };
    return PlatformLoggerService;
}());
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */
function isVersionServiceProvider(provider) {
    var _a;
    var component = provider.getComponent();
    return ((_a = component) === null || _a === void 0 ? void 0 : _a.type) === "VERSION" /* VERSION */;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(firebase, variant) {
    firebase.INTERNAL.registerComponent(new component.Component('platform-logger', function (container) { return new PlatformLoggerService(container); }, "PRIVATE" /* PRIVATE */));
    // Register `app` package.
    firebase.registerVersion(name, version, variant);
    // Register platform SDK identifier (no version).
    firebase.registerVersion('fire-js', '');
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Firebase Lite detection
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (util.isBrowser() && self.firebase !== undefined) {
    logger.warn("\n    Warning: Firebase is already defined in the global scope. Please make sure\n    Firebase library is only loaded once.\n  ");
    // eslint-disable-next-line
    var sdkVersion = self.firebase.SDK_VERSION;
    if (sdkVersion && sdkVersion.indexOf('LITE') >= 0) {
        logger.warn("\n    Warning: You are trying to load Firebase while using Firebase Performance standalone script.\n    You should load Firebase Performance with this instance of Firebase to avoid loading duplicate code.\n    ");
    }
}
var initializeApp = firebase.initializeApp;
// TODO: This disable can be removed and the 'ignoreRestArgs' option added to
// the no-explicit-any rule when ESlint releases it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
firebase.initializeApp = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    // Environment check before initializing app
    // Do the check in initializeApp, so people have a chance to disable it by setting logLevel
    // in @firebase/logger
    if (util.isNode()) {
        logger.warn("\n      Warning: This is a browser-targeted Firebase bundle but it appears it is being\n      run in a Node environment.  If running in a Node environment, make sure you\n      are using the bundle specified by the \"main\" field in package.json.\n      \n      If you are using Webpack, you can specify \"main\" as the first item in\n      \"resolve.mainFields\":\n      https://webpack.js.org/configuration/resolve/#resolvemainfields\n      \n      If using Rollup, use the rollup-plugin-node-resolve plugin and specify \"main\"\n      as the first item in \"mainFields\", e.g. ['main', 'module'].\n      https://github.com/rollup/rollup-plugin-node-resolve\n      ");
    }
    return initializeApp.apply(undefined, args);
};
var firebase$1 = firebase;
registerCoreComponents(firebase$1);

exports.default = firebase$1;
exports.firebase = firebase$1;


},{"tslib":"node_modules/tslib/tslib.es6.js","@firebase/util":"node_modules/@firebase/util/dist/index.cjs.js","@firebase/component":"node_modules/@firebase/component/dist/index.cjs.js","@firebase/logger":"node_modules/@firebase/logger/dist/index.esm.js"}],"node_modules/firebase/app/dist/index.cjs.js":[function(require,module,exports) {
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var firebase = _interopDefault(require('@firebase/app'));

var name = "firebase";
var version = "7.8.2";

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
firebase.registerVersion(name, version, 'app');

module.exports = firebase;


},{"@firebase/app":"node_modules/@firebase/app/dist/index.cjs.js"}],"node_modules/@firebase/auth/dist/auth.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

var _app = _interopRequireDefault(require("@firebase/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var k,
      aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value);
  };

  function ba(a) {
    a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];

    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }

    return globalThis;
  }

  var ca = ba(this);

  function da(a, b) {
    if (b) {
      var c = ca;
      a = a.split(".");

      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }

      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && aa(c, a, {
        configurable: !0,
        writable: !0,
        value: b
      });
    }
  }

  function ea(a) {
    var b = 0;
    return function () {
      return b < a.length ? {
        done: !1,
        value: a[b++]
      } : {
        done: !0
      };
    };
  }

  function fa(a) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : {
      next: ea(a)
    };
  }

  da("Promise", function (a) {
    function b(g) {
      this.b = 0;
      this.c = void 0;
      this.a = [];
      var h = this.f();

      try {
        g(h.resolve, h.reject);
      } catch (m) {
        h.reject(m);
      }
    }

    function c() {
      this.a = null;
    }

    function d(g) {
      return g instanceof b ? g : new b(function (h) {
        h(g);
      });
    }

    if (a) return a;

    c.prototype.b = function (g) {
      if (null == this.a) {
        this.a = [];
        var h = this;
        this.c(function () {
          h.g();
        });
      }

      this.a.push(g);
    };

    var e = ca.setTimeout;

    c.prototype.c = function (g) {
      e(g, 0);
    };

    c.prototype.g = function () {
      for (; this.a && this.a.length;) {
        var g = this.a;
        this.a = [];

        for (var h = 0; h < g.length; ++h) {
          var m = g[h];
          g[h] = null;

          try {
            m();
          } catch (p) {
            this.f(p);
          }
        }
      }

      this.a = null;
    };

    c.prototype.f = function (g) {
      this.c(function () {
        throw g;
      });
    };

    b.prototype.f = function () {
      function g(p) {
        return function (u) {
          m || (m = !0, p.call(h, u));
        };
      }

      var h = this,
          m = !1;
      return {
        resolve: g(this.m),
        reject: g(this.g)
      };
    };

    b.prototype.m = function (g) {
      if (g === this) this.g(new TypeError("A Promise cannot resolve to itself"));else if (g instanceof b) this.o(g);else {
        a: switch (typeof g) {
          case "object":
            var h = null != g;
            break a;

          case "function":
            h = !0;
            break a;

          default:
            h = !1;
        }

        h ? this.u(g) : this.h(g);
      }
    };

    b.prototype.u = function (g) {
      var h = void 0;

      try {
        h = g.then;
      } catch (m) {
        this.g(m);
        return;
      }

      "function" == typeof h ? this.v(h, g) : this.h(g);
    };

    b.prototype.g = function (g) {
      this.i(2, g);
    };

    b.prototype.h = function (g) {
      this.i(1, g);
    };

    b.prototype.i = function (g, h) {
      if (0 != this.b) throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.b);
      this.b = g;
      this.c = h;
      this.l();
    };

    b.prototype.l = function () {
      if (null != this.a) {
        for (var g = 0; g < this.a.length; ++g) f.b(this.a[g]);

        this.a = null;
      }
    };

    var f = new c();

    b.prototype.o = function (g) {
      var h = this.f();
      g.La(h.resolve, h.reject);
    };

    b.prototype.v = function (g, h) {
      var m = this.f();

      try {
        g.call(h, m.resolve, m.reject);
      } catch (p) {
        m.reject(p);
      }
    };

    b.prototype.then = function (g, h) {
      function m(C, N) {
        return "function" == typeof C ? function (wa) {
          try {
            p(C(wa));
          } catch (ld) {
            u(ld);
          }
        } : N;
      }

      var p,
          u,
          A = new b(function (C, N) {
        p = C;
        u = N;
      });
      this.La(m(g, p), m(h, u));
      return A;
    };

    b.prototype.catch = function (g) {
      return this.then(void 0, g);
    };

    b.prototype.La = function (g, h) {
      function m() {
        switch (p.b) {
          case 1:
            g(p.c);
            break;

          case 2:
            h(p.c);
            break;

          default:
            throw Error("Unexpected state: " + p.b);
        }
      }

      var p = this;
      null == this.a ? f.b(m) : this.a.push(m);
    };

    b.resolve = d;

    b.reject = function (g) {
      return new b(function (h, m) {
        m(g);
      });
    };

    b.race = function (g) {
      return new b(function (h, m) {
        for (var p = fa(g), u = p.next(); !u.done; u = p.next()) d(u.value).La(h, m);
      });
    };

    b.all = function (g) {
      var h = fa(g),
          m = h.next();
      return m.done ? d([]) : new b(function (p, u) {
        function A(wa) {
          return function (ld) {
            C[wa] = ld;
            N--;
            0 == N && p(C);
          };
        }

        var C = [],
            N = 0;

        do C.push(void 0), N++, d(m.value).La(A(C.length - 1), u), m = h.next(); while (!m.done);
      });
    };

    return b;
  });
  var ha = ha || {},
      l = this || self;

  function n(a) {
    return "string" == typeof a;
  }

  function ia(a) {
    return "boolean" == typeof a;
  }

  var ja = /^[\w+/_-]+[=]{0,2}$/,
      ka = null;

  function la() {}

  function ma(a) {
    var b = typeof a;
    if ("object" == b) {
      if (a) {
        if (a instanceof Array) return "array";
        if (a instanceof Object) return b;
        var c = Object.prototype.toString.call(a);
        if ("[object Window]" == c) return "object";
        if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
        if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function";
      } else return "null";
    } else if ("function" == b && "undefined" == typeof a.call) return "object";
    return b;
  }

  function na(a) {
    return null === a;
  }

  function oa(a) {
    return "array" == ma(a);
  }

  function pa(a) {
    var b = ma(a);
    return "array" == b || "object" == b && "number" == typeof a.length;
  }

  function q(a) {
    return "function" == ma(a);
  }

  function r(a) {
    var b = typeof a;
    return "object" == b && null != a || "function" == b;
  }

  var qa = "closure_uid_" + (1E9 * Math.random() >>> 0),
      ra = 0;

  function sa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }

  function ta(a, b, c) {
    if (!a) throw Error();

    if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);
      return function () {
        var e = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(e, d);
        return a.apply(b, e);
      };
    }

    return function () {
      return a.apply(b, arguments);
    };
  }

  function t(a, b, c) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? t = sa : t = ta;
    return t.apply(null, arguments);
  }

  function ua(a, b) {
    var c = Array.prototype.slice.call(arguments, 1);
    return function () {
      var d = c.slice();
      d.push.apply(d, arguments);
      return a.apply(this, d);
    };
  }

  var va = Date.now || function () {
    return +new Date();
  };

  function v(a, b) {
    function c() {}

    c.prototype = b.prototype;
    a.qb = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
  }

  ;

  function xa(a) {
    if (!a) return !1;

    try {
      return !!a.$goog_Thenable;
    } catch (b) {
      return !1;
    }
  }

  ;

  function w(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, w);else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  }

  v(w, Error);
  w.prototype.name = "CustomError";

  function ya(a, b) {
    a = a.split("%s");

    for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");

    w.call(this, c + a[d]);
  }

  v(ya, w);
  ya.prototype.name = "AssertionError";

  function za(a, b) {
    throw new ya("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }

  ;

  function Aa(a, b) {
    this.c = a;
    this.f = b;
    this.b = 0;
    this.a = null;
  }

  Aa.prototype.get = function () {
    if (0 < this.b) {
      this.b--;
      var a = this.a;
      this.a = a.next;
      a.next = null;
    } else a = this.c();

    return a;
  };

  function Ba(a, b) {
    a.f(b);
    100 > a.b && (a.b++, b.next = a.a, a.a = b);
  }

  ;

  function Ca() {
    this.b = this.a = null;
  }

  var Ea = new Aa(function () {
    return new Da();
  }, function (a) {
    a.reset();
  });

  Ca.prototype.add = function (a, b) {
    var c = Ea.get();
    c.set(a, b);
    this.b ? this.b.next = c : this.a = c;
    this.b = c;
  };

  function Fa() {
    var a = Ga,
        b = null;
    a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null);
    return b;
  }

  function Da() {
    this.next = this.b = this.a = null;
  }

  Da.prototype.set = function (a, b) {
    this.a = a;
    this.b = b;
    this.next = null;
  };

  Da.prototype.reset = function () {
    this.next = this.b = this.a = null;
  };

  function Ha(a, b) {
    a: {
      try {
        var c = a && a.ownerDocument,
            d = c && (c.defaultView || c.parentWindow);
        d = d || l;

        if (d.Element && d.Location) {
          var e = d;
          break a;
        }
      } catch (g) {}

      e = null;
    }

    if (e && "undefined" != typeof e[b] && (!a || !(a instanceof e[b]) && (a instanceof e.Location || a instanceof e.Element))) {
      if (r(a)) try {
        var f = a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a);
      } catch (g) {
        f = "<object could not be stringified>";
      } else f = void 0 === a ? "undefined" : null === a ? "null" : typeof a;
      za("Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, f);
    }
  }

  ;
  var Ia = Array.prototype.indexOf ? function (a, b) {
    return Array.prototype.indexOf.call(a, b, void 0);
  } : function (a, b) {
    if (n(a)) return n(b) && 1 == b.length ? a.indexOf(b, 0) : -1;

    for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;

    return -1;
  },
      x = Array.prototype.forEach ? function (a, b, c) {
    Array.prototype.forEach.call(a, b, c);
  } : function (a, b, c) {
    for (var d = a.length, e = n(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a);
  };

  function Ja(a, b) {
    for (var c = n(a) ? a.split("") : a, d = a.length - 1; 0 <= d; --d) d in c && b.call(void 0, c[d], d, a);
  }

  var Ka = Array.prototype.map ? function (a, b) {
    return Array.prototype.map.call(a, b, void 0);
  } : function (a, b) {
    for (var c = a.length, d = Array(c), e = n(a) ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));

    return d;
  },
      La = Array.prototype.some ? function (a, b) {
    return Array.prototype.some.call(a, b, void 0);
  } : function (a, b) {
    for (var c = a.length, d = n(a) ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) return !0;

    return !1;
  };

  function Ma(a) {
    a: {
      var b = Na;

      for (var c = a.length, d = n(a) ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) {
        b = e;
        break a;
      }

      b = -1;
    }

    return 0 > b ? null : n(a) ? a.charAt(b) : a[b];
  }

  function Oa(a, b) {
    return 0 <= Ia(a, b);
  }

  function Pa(a, b) {
    b = Ia(a, b);
    var c;
    (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
    return c;
  }

  function Qa(a, b) {
    var c = 0;
    Ja(a, function (d, e) {
      b.call(void 0, d, e, a) && 1 == Array.prototype.splice.call(a, e, 1).length && c++;
    });
  }

  function Ra(a) {
    return Array.prototype.concat.apply([], arguments);
  }

  function Sa(a) {
    var b = a.length;

    if (0 < b) {
      for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];

      return c;
    }

    return [];
  }

  ;

  function Ta(a, b) {
    for (var c in a) b.call(void 0, a[c], c, a);
  }

  function Ua(a) {
    for (var b in a) return !1;

    return !0;
  }

  function Va(a) {
    var b = {},
        c;

    for (c in a) b[c] = a[c];

    return b;
  }

  var Wa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

  function Xa(a, b) {
    for (var c, d, e = 1; e < arguments.length; e++) {
      d = arguments[e];

      for (c in d) a[c] = d[c];

      for (var f = 0; f < Wa.length; f++) c = Wa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }

  ;

  function Ya(a, b) {
    this.a = a === Za && b || "";
    this.b = $a;
  }

  Ya.prototype.qa = !0;

  Ya.prototype.pa = function () {
    return this.a;
  };

  Ya.prototype.toString = function () {
    return "Const{" + this.a + "}";
  };

  function ab(a) {
    if (a instanceof Ya && a.constructor === Ya && a.b === $a) return a.a;
    za("expected object of type Const, got '" + a + "'");
    return "type_error:Const";
  }

  var $a = {},
      Za = {},
      bb = new Ya(Za, "");

  function cb() {
    this.a = "";
    this.b = db;
  }

  cb.prototype.qa = !0;

  cb.prototype.pa = function () {
    return this.a.toString();
  };

  cb.prototype.toString = function () {
    return "TrustedResourceUrl{" + this.a + "}";
  };

  function eb(a) {
    if (a instanceof cb && a.constructor === cb && a.b === db) return a.a;
    za("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ma(a));
    return "type_error:TrustedResourceUrl";
  }

  function fb(a, b) {
    var c = ab(a);
    if (!gb.test(c)) throw Error("Invalid TrustedResourceUrl format: " + c);
    a = c.replace(hb, function (d, e) {
      if (!Object.prototype.hasOwnProperty.call(b, e)) throw Error('Found marker, "' + e + '", in format string, "' + c + '", but no valid label mapping found in args: ' + JSON.stringify(b));
      d = b[e];
      return d instanceof Ya ? ab(d) : encodeURIComponent(String(d));
    });
    return ib(a);
  }

  var hb = /%{(\w+)}/g,
      gb = /^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i,
      db = {};

  function ib(a) {
    var b = new cb();
    b.a = a;
    return b;
  }

  ;
  var jb = String.prototype.trim ? function (a) {
    return a.trim();
  } : function (a) {
    return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
  },
      kb = /&/g,
      lb = /</g,
      mb = />/g,
      nb = /"/g,
      ob = /'/g,
      pb = /\x00/g,
      qb = /[\x00&<>"']/;

  function y(a, b) {
    return -1 != a.indexOf(b);
  }

  function rb(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }

  ;

  function sb() {
    this.a = "";
    this.b = tb;
  }

  sb.prototype.qa = !0;

  sb.prototype.pa = function () {
    return this.a.toString();
  };

  sb.prototype.toString = function () {
    return "SafeUrl{" + this.a + "}";
  };

  function ub(a) {
    if (a instanceof sb && a.constructor === sb && a.b === tb) return a.a;
    za("expected object of type SafeUrl, got '" + a + "' of type " + ma(a));
    return "type_error:SafeUrl";
  }

  var vb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;

  function wb(a) {
    if (a instanceof sb) return a;
    a = "object" == typeof a && a.qa ? a.pa() : String(a);
    vb.test(a) || (a = "about:invalid#zClosurez");
    return xb(a);
  }

  var tb = {};

  function xb(a) {
    var b = new sb();
    b.a = a;
    return b;
  }

  xb("about:blank");
  var yb;

  a: {
    var zb = l.navigator;

    if (zb) {
      var Ab = zb.userAgent;

      if (Ab) {
        yb = Ab;
        break a;
      }
    }

    yb = "";
  }

  function z(a) {
    return y(yb, a);
  }

  ;

  function Bb() {
    this.a = "";
    this.b = Cb;
  }

  Bb.prototype.qa = !0;

  Bb.prototype.pa = function () {
    return this.a.toString();
  };

  Bb.prototype.toString = function () {
    return "SafeHtml{" + this.a + "}";
  };

  function Db(a) {
    if (a instanceof Bb && a.constructor === Bb && a.b === Cb) return a.a;
    za("expected object of type SafeHtml, got '" + a + "' of type " + ma(a));
    return "type_error:SafeHtml";
  }

  var Cb = {};

  function Eb(a) {
    var b = new Bb();
    b.a = a;
    return b;
  }

  Eb("<!DOCTYPE html>");
  var Fb = Eb("");
  Eb("<br>");

  function Gb(a) {
    var b = ib(ab(bb));
    Ha(a, "HTMLIFrameElement");
    a.src = eb(b).toString();
  }

  function Hb(a, b) {
    Ha(a, "HTMLScriptElement");
    a.src = eb(b);
    if (null === ka) b: {
      b = l.document;

      if ((b = b.querySelector && b.querySelector("script[nonce]")) && (b = b.nonce || b.getAttribute("nonce")) && ja.test(b)) {
        ka = b;
        break b;
      }

      ka = "";
    }
    b = ka;
    b && a.setAttribute("nonce", b);
  }

  ;

  function Ib(a, b) {
    for (var c = a.split("%s"), d = "", e = Array.prototype.slice.call(arguments, 1); e.length && 1 < c.length;) d += c.shift() + e.shift();

    return d + c.join("%s");
  }

  function Jb(a) {
    qb.test(a) && (-1 != a.indexOf("&") && (a = a.replace(kb, "&amp;")), -1 != a.indexOf("<") && (a = a.replace(lb, "&lt;")), -1 != a.indexOf(">") && (a = a.replace(mb, "&gt;")), -1 != a.indexOf('"') && (a = a.replace(nb, "&quot;")), -1 != a.indexOf("'") && (a = a.replace(ob, "&#39;")), -1 != a.indexOf("\x00") && (a = a.replace(pb, "&#0;")));
    return a;
  }

  ;

  function Kb(a) {
    l.setTimeout(function () {
      throw a;
    }, 0);
  }

  var Lb;

  function Mb() {
    var a = l.MessageChannel;
    "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !z("Presto") && (a = function () {
      var e = document.createElement("IFRAME");
      e.style.display = "none";
      Gb(e);
      document.documentElement.appendChild(e);
      var f = e.contentWindow;
      e = f.document;
      e.open();
      e.write(Db(Fb));
      e.close();
      var g = "callImmediate" + Math.random(),
          h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
      e = t(function (m) {
        if (("*" == h || m.origin == h) && m.data == g) this.port1.onmessage();
      }, this);
      f.addEventListener("message", e, !1);
      this.port1 = {};
      this.port2 = {
        postMessage: function () {
          f.postMessage(g, h);
        }
      };
    });

    if ("undefined" !== typeof a && !z("Trident") && !z("MSIE")) {
      var b = new a(),
          c = {},
          d = c;

      b.port1.onmessage = function () {
        if (void 0 !== c.next) {
          c = c.next;
          var e = c.yb;
          c.yb = null;
          e();
        }
      };

      return function (e) {
        d.next = {
          yb: e
        };
        d = d.next;
        b.port2.postMessage(0);
      };
    }

    return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (e) {
      var f = document.createElement("SCRIPT");

      f.onreadystatechange = function () {
        f.onreadystatechange = null;
        f.parentNode.removeChild(f);
        f = null;
        e();
        e = null;
      };

      document.documentElement.appendChild(f);
    } : function (e) {
      l.setTimeout(e, 0);
    };
  }

  ;

  function Nb(a, b) {
    Ob || Pb();
    Qb || (Ob(), Qb = !0);
    Ga.add(a, b);
  }

  var Ob;

  function Pb() {
    if (l.Promise && l.Promise.resolve) {
      var a = l.Promise.resolve(void 0);

      Ob = function () {
        a.then(Rb);
      };
    } else Ob = function () {
      var b = Rb;
      !q(l.setImmediate) || l.Window && l.Window.prototype && !z("Edge") && l.Window.prototype.setImmediate == l.setImmediate ? (Lb || (Lb = Mb()), Lb(b)) : l.setImmediate(b);
    };
  }

  var Qb = !1,
      Ga = new Ca();

  function Rb() {
    for (var a; a = Fa();) {
      try {
        a.a.call(a.b);
      } catch (b) {
        Kb(b);
      }

      Ba(Ea, a);
    }

    Qb = !1;
  }

  ;

  function B(a, b) {
    this.a = Sb;
    this.i = void 0;
    this.f = this.b = this.c = null;
    this.g = this.h = !1;
    if (a != la) try {
      var c = this;
      a.call(b, function (d) {
        Tb(c, Ub, d);
      }, function (d) {
        if (!(d instanceof Vb)) try {
          if (d instanceof Error) throw d;
          throw Error("Promise rejected.");
        } catch (e) {}
        Tb(c, Wb, d);
      });
    } catch (d) {
      Tb(this, Wb, d);
    }
  }

  var Sb = 0,
      Ub = 2,
      Wb = 3;

  function Xb() {
    this.next = this.f = this.b = this.g = this.a = null;
    this.c = !1;
  }

  Xb.prototype.reset = function () {
    this.f = this.b = this.g = this.a = null;
    this.c = !1;
  };

  var Yb = new Aa(function () {
    return new Xb();
  }, function (a) {
    a.reset();
  });

  function Zb(a, b, c) {
    var d = Yb.get();
    d.g = a;
    d.b = b;
    d.f = c;
    return d;
  }

  function D(a) {
    if (a instanceof B) return a;
    var b = new B(la);
    Tb(b, Ub, a);
    return b;
  }

  function E(a) {
    return new B(function (b, c) {
      c(a);
    });
  }

  function $b(a, b, c) {
    ac(a, b, c, null) || Nb(ua(b, a));
  }

  function bc(a) {
    return new B(function (b, c) {
      var d = a.length,
          e = [];
      if (d) for (var f = function (p, u) {
        d--;
        e[p] = u;
        0 == d && b(e);
      }, g = function (p) {
        c(p);
      }, h = 0, m; h < a.length; h++) m = a[h], $b(m, ua(f, h), g);else b(e);
    });
  }

  function cc(a) {
    return new B(function (b) {
      var c = a.length,
          d = [];
      if (c) for (var e = function (h, m, p) {
        c--;
        d[h] = m ? {
          Gb: !0,
          value: p
        } : {
          Gb: !1,
          reason: p
        };
        0 == c && b(d);
      }, f = 0, g; f < a.length; f++) g = a[f], $b(g, ua(e, f, !0), ua(e, f, !1));else b(d);
    });
  }

  B.prototype.then = function (a, b, c) {
    return dc(this, q(a) ? a : null, q(b) ? b : null, c);
  };

  B.prototype.$goog_Thenable = !0;
  k = B.prototype;

  k.ka = function (a, b) {
    a = Zb(a, a, b);
    a.c = !0;
    ec(this, a);
    return this;
  };

  k.s = function (a, b) {
    return dc(this, null, a, b);
  };

  k.cancel = function (a) {
    this.a == Sb && Nb(function () {
      var b = new Vb(a);
      fc(this, b);
    }, this);
  };

  function fc(a, b) {
    if (a.a == Sb) if (a.c) {
      var c = a.c;

      if (c.b) {
        for (var d = 0, e = null, f = null, g = c.b; g && (g.c || (d++, g.a == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);

        e && (c.a == Sb && 1 == d ? fc(c, b) : (f ? (d = f, d.next == c.f && (c.f = d), d.next = d.next.next) : gc(c), hc(c, e, Wb, b)));
      }

      a.c = null;
    } else Tb(a, Wb, b);
  }

  function ec(a, b) {
    a.b || a.a != Ub && a.a != Wb || ic(a);
    a.f ? a.f.next = b : a.b = b;
    a.f = b;
  }

  function dc(a, b, c, d) {
    var e = Zb(null, null, null);
    e.a = new B(function (f, g) {
      e.g = b ? function (h) {
        try {
          var m = b.call(d, h);
          f(m);
        } catch (p) {
          g(p);
        }
      } : f;
      e.b = c ? function (h) {
        try {
          var m = c.call(d, h);
          void 0 === m && h instanceof Vb ? g(h) : f(m);
        } catch (p) {
          g(p);
        }
      } : g;
    });
    e.a.c = a;
    ec(a, e);
    return e.a;
  }

  k.Oc = function (a) {
    this.a = Sb;
    Tb(this, Ub, a);
  };

  k.Pc = function (a) {
    this.a = Sb;
    Tb(this, Wb, a);
  };

  function Tb(a, b, c) {
    a.a == Sb && (a === c && (b = Wb, c = new TypeError("Promise cannot resolve to itself")), a.a = 1, ac(c, a.Oc, a.Pc, a) || (a.i = c, a.a = b, a.c = null, ic(a), b != Wb || c instanceof Vb || jc(a, c)));
  }

  function ac(a, b, c, d) {
    if (a instanceof B) return ec(a, Zb(b || la, c || null, d)), !0;
    if (xa(a)) return a.then(b, c, d), !0;
    if (r(a)) try {
      var e = a.then;
      if (q(e)) return kc(a, e, b, c, d), !0;
    } catch (f) {
      return c.call(d, f), !0;
    }
    return !1;
  }

  function kc(a, b, c, d, e) {
    function f(m) {
      h || (h = !0, d.call(e, m));
    }

    function g(m) {
      h || (h = !0, c.call(e, m));
    }

    var h = !1;

    try {
      b.call(a, g, f);
    } catch (m) {
      f(m);
    }
  }

  function ic(a) {
    a.h || (a.h = !0, Nb(a.Zb, a));
  }

  function gc(a) {
    var b = null;
    a.b && (b = a.b, a.b = b.next, b.next = null);
    a.b || (a.f = null);
    return b;
  }

  k.Zb = function () {
    for (var a; a = gc(this);) hc(this, a, this.a, this.i);

    this.h = !1;
  };

  function hc(a, b, c, d) {
    if (c == Wb && b.b && !b.c) for (; a && a.g; a = a.c) a.g = !1;
    if (b.a) b.a.c = null, lc(b, c, d);else try {
      b.c ? b.g.call(b.f) : lc(b, c, d);
    } catch (e) {
      mc.call(null, e);
    }
    Ba(Yb, b);
  }

  function lc(a, b, c) {
    b == Ub ? a.g.call(a.f, c) : a.b && a.b.call(a.f, c);
  }

  function jc(a, b) {
    a.g = !0;
    Nb(function () {
      a.g && mc.call(null, b);
    });
  }

  var mc = Kb;

  function Vb(a) {
    w.call(this, a);
  }

  v(Vb, w);
  Vb.prototype.name = "cancel";

  function nc() {
    0 != oc && (pc[this[qa] || (this[qa] = ++ra)] = this);
    this.va = this.va;
    this.la = this.la;
  }

  var oc = 0,
      pc = {};
  nc.prototype.va = !1;

  function qc(a) {
    if (!a.va && (a.va = !0, a.za(), 0 != oc)) {
      var b = a[qa] || (a[qa] = ++ra);
      if (0 != oc && a.la && 0 < a.la.length) throw Error(a + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
      delete pc[b];
    }
  }

  nc.prototype.za = function () {
    if (this.la) for (; this.la.length;) this.la.shift()();
  };

  function rc(a) {
    rc[" "](a);
    return a;
  }

  rc[" "] = la;

  function sc(a, b) {
    var c = tc;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a);
  }

  ;
  var uc = z("Opera"),
      vc = z("Trident") || z("MSIE"),
      wc = z("Edge"),
      xc = wc || vc,
      yc = z("Gecko") && !(y(yb.toLowerCase(), "webkit") && !z("Edge")) && !(z("Trident") || z("MSIE")) && !z("Edge"),
      zc = y(yb.toLowerCase(), "webkit") && !z("Edge");

  function Ac() {
    var a = l.document;
    return a ? a.documentMode : void 0;
  }

  var Bc;

  a: {
    var Cc = "",
        Dc = function () {
      var a = yb;
      if (yc) return /rv:([^\);]+)(\)|;)/.exec(a);
      if (wc) return /Edge\/([\d\.]+)/.exec(a);
      if (vc) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
      if (zc) return /WebKit\/(\S+)/.exec(a);
      if (uc) return /(?:Version)[ \/]?(\S+)/.exec(a);
    }();

    Dc && (Cc = Dc ? Dc[1] : "");

    if (vc) {
      var Ec = Ac();

      if (null != Ec && Ec > parseFloat(Cc)) {
        Bc = String(Ec);
        break a;
      }
    }

    Bc = Cc;
  }

  var tc = {};

  function Fc(a) {
    return sc(a, function () {
      for (var b = 0, c = jb(String(Bc)).split("."), d = jb(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
        var g = c[f] || "",
            h = d[f] || "";

        do {
          g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
          h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
          if (0 == g[0].length && 0 == h[0].length) break;
          b = rb(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || rb(0 == g[2].length, 0 == h[2].length) || rb(g[2], h[2]);
          g = g[3];
          h = h[3];
        } while (0 == b);
      }

      return 0 <= b;
    });
  }

  var Gc;
  Gc = l.document && vc ? Ac() : void 0;

  var Hc = Object.freeze || function (a) {
    return a;
  };

  var Ic = !vc || 9 <= Number(Gc),
      Jc = vc && !Fc("9"),
      Kc = function () {
    if (!l.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
        b = Object.defineProperty({}, "passive", {
      get: function () {
        a = !0;
      }
    });

    try {
      l.addEventListener("test", la, b), l.removeEventListener("test", la, b);
    } catch (c) {}

    return a;
  }();

  function F(a, b) {
    this.type = a;
    this.b = this.target = b;
    this.Mb = !0;
  }

  F.prototype.preventDefault = function () {
    this.Mb = !1;
  };

  function Lc(a, b) {
    F.call(this, a ? a.type : "");
    this.relatedTarget = this.b = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
    this.key = "";
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.pointerId = 0;
    this.pointerType = "";
    this.a = null;

    if (a) {
      var c = this.type = a.type,
          d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.b = b;

      if (b = a.relatedTarget) {
        if (yc) {
          a: {
            try {
              rc(b.nodeName);
              var e = !0;
              break a;
            } catch (f) {}

            e = !1;
          }

          e || (b = null);
        }
      } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);

      this.relatedTarget = b;
      d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
      this.button = a.button;
      this.key = a.key || "";
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.pointerId = a.pointerId || 0;
      this.pointerType = n(a.pointerType) ? a.pointerType : Mc[a.pointerType] || "";
      this.a = a;
      a.defaultPrevented && this.preventDefault();
    }
  }

  v(Lc, F);
  var Mc = Hc({
    2: "touch",
    3: "pen",
    4: "mouse"
  });

  Lc.prototype.preventDefault = function () {
    Lc.qb.preventDefault.call(this);
    var a = this.a;
    if (a.preventDefault) a.preventDefault();else if (a.returnValue = !1, Jc) try {
      if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1;
    } catch (b) {}
  };

  Lc.prototype.f = function () {
    return this.a;
  };

  var Nc = "closure_listenable_" + (1E6 * Math.random() | 0),
      Oc = 0;

  function Pc(a, b, c, d, e) {
    this.listener = a;
    this.proxy = null;
    this.src = b;
    this.type = c;
    this.capture = !!d;
    this.Pa = e;
    this.key = ++Oc;
    this.ta = this.Ka = !1;
  }

  function Qc(a) {
    a.ta = !0;
    a.listener = null;
    a.proxy = null;
    a.src = null;
    a.Pa = null;
  }

  ;

  function Rc(a) {
    this.src = a;
    this.a = {};
    this.b = 0;
  }

  Rc.prototype.add = function (a, b, c, d, e) {
    var f = a.toString();
    a = this.a[f];
    a || (a = this.a[f] = [], this.b++);
    var g = Sc(a, b, d, e);
    -1 < g ? (b = a[g], c || (b.Ka = !1)) : (b = new Pc(b, this.src, f, !!d, e), b.Ka = c, a.push(b));
    return b;
  };

  function Tc(a, b) {
    var c = b.type;
    c in a.a && Pa(a.a[c], b) && (Qc(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
  }

  function Sc(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.ta && f.listener == b && f.capture == !!c && f.Pa == d) return e;
    }

    return -1;
  }

  ;
  var Uc = "closure_lm_" + (1E6 * Math.random() | 0),
      Vc = {},
      Wc = 0;

  function Xc(a, b, c, d, e) {
    if (d && d.once) Yc(a, b, c, d, e);else if (oa(b)) for (var f = 0; f < b.length; f++) Xc(a, b[f], c, d, e);else c = Zc(c), a && a[Nc] ? $c(a, b, c, r(d) ? !!d.capture : !!d, e) : ad(a, b, c, !1, d, e);
  }

  function ad(a, b, c, d, e, f) {
    if (!b) throw Error("Invalid event type");
    var g = r(e) ? !!e.capture : !!e,
        h = bd(a);
    h || (a[Uc] = h = new Rc(a));
    c = h.add(b, c, d, g, f);

    if (!c.proxy) {
      d = cd();
      c.proxy = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener) Kc || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);else if (a.attachEvent) a.attachEvent(dd(b.toString()), d);else if (a.addListener && a.removeListener) a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");
      Wc++;
    }
  }

  function cd() {
    var a = ed,
        b = Ic ? function (c) {
      return a.call(b.src, b.listener, c);
    } : function (c) {
      c = a.call(b.src, b.listener, c);
      if (!c) return c;
    };
    return b;
  }

  function Yc(a, b, c, d, e) {
    if (oa(b)) for (var f = 0; f < b.length; f++) Yc(a, b[f], c, d, e);else c = Zc(c), a && a[Nc] ? fd(a, b, c, r(d) ? !!d.capture : !!d, e) : ad(a, b, c, !0, d, e);
  }

  function gd(a, b, c, d, e) {
    if (oa(b)) for (var f = 0; f < b.length; f++) gd(a, b[f], c, d, e);else (d = r(d) ? !!d.capture : !!d, c = Zc(c), a && a[Nc]) ? (a = a.u, b = String(b).toString(), b in a.a && (f = a.a[b], c = Sc(f, c, d, e), -1 < c && (Qc(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--)))) : a && (a = bd(a)) && (b = a.a[b.toString()], a = -1, b && (a = Sc(b, c, d, e)), (c = -1 < a ? b[a] : null) && hd(c));
  }

  function hd(a) {
    if ("number" != typeof a && a && !a.ta) {
      var b = a.src;
      if (b && b[Nc]) Tc(b.u, a);else {
        var c = a.type,
            d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(dd(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        Wc--;
        (c = bd(b)) ? (Tc(c, a), 0 == c.b && (c.src = null, b[Uc] = null)) : Qc(a);
      }
    }
  }

  function dd(a) {
    return a in Vc ? Vc[a] : Vc[a] = "on" + a;
  }

  function id(a, b, c, d) {
    var e = !0;
    if (a = bd(a)) if (b = a.a[b.toString()]) for (b = b.concat(), a = 0; a < b.length; a++) {
      var f = b[a];
      f && f.capture == c && !f.ta && (f = jd(f, d), e = e && !1 !== f);
    }
    return e;
  }

  function jd(a, b) {
    var c = a.listener,
        d = a.Pa || a.src;
    a.Ka && hd(a);
    return c.call(d, b);
  }

  function ed(a, b) {
    if (a.ta) return !0;

    if (!Ic) {
      if (!b) a: {
        b = ["window", "event"];

        for (var c = l, d = 0; d < b.length; d++) if (c = c[b[d]], null == c) {
          b = null;
          break a;
        }

        b = c;
      }
      d = b;
      b = new Lc(d, this);
      c = !0;

      if (!(0 > d.keyCode || void 0 != d.returnValue)) {
        a: {
          var e = !1;
          if (0 == d.keyCode) try {
            d.keyCode = -1;
            break a;
          } catch (g) {
            e = !0;
          }
          if (e || void 0 == d.returnValue) d.returnValue = !0;
        }

        d = [];

        for (e = b.b; e; e = e.parentNode) d.push(e);

        a = a.type;

        for (e = d.length - 1; 0 <= e; e--) {
          b.b = d[e];
          var f = id(d[e], a, !0, b);
          c = c && f;
        }

        for (e = 0; e < d.length; e++) b.b = d[e], f = id(d[e], a, !1, b), c = c && f;
      }

      return c;
    }

    return jd(a, new Lc(b, this));
  }

  function bd(a) {
    a = a[Uc];
    return a instanceof Rc ? a : null;
  }

  var kd = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

  function Zc(a) {
    if (q(a)) return a;
    a[kd] || (a[kd] = function (b) {
      return a.handleEvent(b);
    });
    return a[kd];
  }

  ;

  function G() {
    nc.call(this);
    this.u = new Rc(this);
    this.Sb = this;
    this.Xa = null;
  }

  v(G, nc);
  G.prototype[Nc] = !0;

  G.prototype.addEventListener = function (a, b, c, d) {
    Xc(this, a, b, c, d);
  };

  G.prototype.removeEventListener = function (a, b, c, d) {
    gd(this, a, b, c, d);
  };

  G.prototype.dispatchEvent = function (a) {
    var b,
        c = this.Xa;
    if (c) for (b = []; c; c = c.Xa) b.push(c);
    c = this.Sb;
    var d = a.type || a;
    if (n(a)) a = new F(a, c);else if (a instanceof F) a.target = a.target || c;else {
      var e = a;
      a = new F(d, c);
      Xa(a, e);
    }
    e = !0;
    if (b) for (var f = b.length - 1; 0 <= f; f--) {
      var g = a.b = b[f];
      e = md(g, d, !0, a) && e;
    }
    g = a.b = c;
    e = md(g, d, !0, a) && e;
    e = md(g, d, !1, a) && e;
    if (b) for (f = 0; f < b.length; f++) g = a.b = b[f], e = md(g, d, !1, a) && e;
    return e;
  };

  G.prototype.za = function () {
    G.qb.za.call(this);

    if (this.u) {
      var a = this.u,
          b = 0,
          c;

      for (c in a.a) {
        for (var d = a.a[c], e = 0; e < d.length; e++) ++b, Qc(d[e]);

        delete a.a[c];
        a.b--;
      }
    }

    this.Xa = null;
  };

  function $c(a, b, c, d, e) {
    a.u.add(String(b), c, !1, d, e);
  }

  function fd(a, b, c, d, e) {
    a.u.add(String(b), c, !0, d, e);
  }

  function md(a, b, c, d) {
    b = a.u.a[String(b)];
    if (!b) return !0;
    b = b.concat();

    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];

      if (g && !g.ta && g.capture == c) {
        var h = g.listener,
            m = g.Pa || g.src;
        g.Ka && Tc(a.u, g);
        e = !1 !== h.call(m, d) && e;
      }
    }

    return e && 0 != d.Mb;
  }

  ;

  function nd(a, b, c) {
    if (q(a)) c && (a = t(a, c));else if (a && "function" == typeof a.handleEvent) a = t(a.handleEvent, a);else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : l.setTimeout(a, b || 0);
  }

  function od(a) {
    var b = null;
    return new B(function (c, d) {
      b = nd(function () {
        c(void 0);
      }, a);
      -1 == b && d(Error("Failed to schedule timer."));
    }).s(function (c) {
      l.clearTimeout(b);
      throw c;
    });
  }

  ;

  function pd(a) {
    if (a.U && "function" == typeof a.U) return a.U();
    if (n(a)) return a.split("");

    if (pa(a)) {
      for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);

      return b;
    }

    b = [];
    c = 0;

    for (d in a) b[c++] = a[d];

    return b;
  }

  function qd(a) {
    if (a.X && "function" == typeof a.X) return a.X();

    if (!a.U || "function" != typeof a.U) {
      if (pa(a) || n(a)) {
        var b = [];
        a = a.length;

        for (var c = 0; c < a; c++) b.push(c);

        return b;
      }

      b = [];
      c = 0;

      for (var d in a) b[c++] = d;

      return b;
    }
  }

  function rd(a, b) {
    if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);else if (pa(a) || n(a)) x(a, b, void 0);else for (var c = qd(a), d = pd(a), e = d.length, f = 0; f < e; f++) b.call(void 0, d[f], c && c[f], a);
  }

  ;

  function sd(a, b) {
    this.b = {};
    this.a = [];
    this.c = 0;
    var c = arguments.length;

    if (1 < c) {
      if (c % 2) throw Error("Uneven number of arguments");

      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else if (a) if (a instanceof sd) for (c = a.X(), d = 0; d < c.length; d++) this.set(c[d], a.get(c[d]));else for (d in a) this.set(d, a[d]);
  }

  k = sd.prototype;

  k.U = function () {
    td(this);

    for (var a = [], b = 0; b < this.a.length; b++) a.push(this.b[this.a[b]]);

    return a;
  };

  k.X = function () {
    td(this);
    return this.a.concat();
  };

  k.clear = function () {
    this.b = {};
    this.c = this.a.length = 0;
  };

  function td(a) {
    if (a.c != a.a.length) {
      for (var b = 0, c = 0; b < a.a.length;) {
        var d = a.a[b];
        ud(a.b, d) && (a.a[c++] = d);
        b++;
      }

      a.a.length = c;
    }

    if (a.c != a.a.length) {
      var e = {};

      for (c = b = 0; b < a.a.length;) d = a.a[b], ud(e, d) || (a.a[c++] = d, e[d] = 1), b++;

      a.a.length = c;
    }
  }

  k.get = function (a, b) {
    return ud(this.b, a) ? this.b[a] : b;
  };

  k.set = function (a, b) {
    ud(this.b, a) || (this.c++, this.a.push(a));
    this.b[a] = b;
  };

  k.forEach = function (a, b) {
    for (var c = this.X(), d = 0; d < c.length; d++) {
      var e = c[d],
          f = this.get(e);
      a.call(b, f, e, this);
    }
  };

  function ud(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }

  ;
  var vd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

  function wd(a, b) {
    if (a) {
      a = a.split("&");

      for (var c = 0; c < a.length; c++) {
        var d = a[c].indexOf("="),
            e = null;

        if (0 <= d) {
          var f = a[c].substring(0, d);
          e = a[c].substring(d + 1);
        } else f = a[c];

        b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
      }
    }
  }

  ;

  function xd(a, b) {
    this.b = this.i = this.f = "";
    this.l = null;
    this.g = this.c = "";
    this.h = !1;
    var c;
    a instanceof xd ? (this.h = void 0 !== b ? b : a.h, yd(this, a.f), this.i = a.i, this.b = a.b, zd(this, a.l), this.c = a.c, Ad(this, Bd(a.a)), this.g = a.g) : a && (c = String(a).match(vd)) ? (this.h = !!b, yd(this, c[1] || "", !0), this.i = Cd(c[2] || ""), this.b = Cd(c[3] || "", !0), zd(this, c[4]), this.c = Cd(c[5] || "", !0), Ad(this, c[6] || "", !0), this.g = Cd(c[7] || "")) : (this.h = !!b, this.a = new Dd(null, this.h));
  }

  xd.prototype.toString = function () {
    var a = [],
        b = this.f;
    b && a.push(Ed(b, Fd, !0), ":");
    var c = this.b;
    if (c || "file" == b) a.push("//"), (b = this.i) && a.push(Ed(b, Fd, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.l, null != c && a.push(":", String(c));
    if (c = this.c) this.b && "/" != c.charAt(0) && a.push("/"), a.push(Ed(c, "/" == c.charAt(0) ? Gd : Hd, !0));
    (c = this.a.toString()) && a.push("?", c);
    (c = this.g) && a.push("#", Ed(c, Id));
    return a.join("");
  };

  xd.prototype.resolve = function (a) {
    var b = new xd(this),
        c = !!a.f;
    c ? yd(b, a.f) : c = !!a.i;
    c ? b.i = a.i : c = !!a.b;
    c ? b.b = a.b : c = null != a.l;
    var d = a.c;
    if (c) zd(b, a.l);else if (c = !!a.c) {
      if ("/" != d.charAt(0)) if (this.b && !this.c) d = "/" + d;else {
        var e = b.c.lastIndexOf("/");
        -1 != e && (d = b.c.substr(0, e + 1) + d);
      }
      e = d;
      if (".." == e || "." == e) d = "";else if (y(e, "./") || y(e, "/.")) {
        d = 0 == e.lastIndexOf("/", 0);
        e = e.split("/");

        for (var f = [], g = 0; g < e.length;) {
          var h = e[g++];
          "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d && g == e.length && f.push("")) : (f.push(h), d = !0);
        }

        d = f.join("/");
      } else d = e;
    }
    c ? b.c = d : c = "" !== a.a.toString();
    c ? Ad(b, Bd(a.a)) : c = !!a.g;
    c && (b.g = a.g);
    return b;
  };

  function yd(a, b, c) {
    a.f = c ? Cd(b, !0) : b;
    a.f && (a.f = a.f.replace(/:$/, ""));
  }

  function zd(a, b) {
    if (b) {
      b = Number(b);
      if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
      a.l = b;
    } else a.l = null;
  }

  function Ad(a, b, c) {
    b instanceof Dd ? (a.a = b, Jd(a.a, a.h)) : (c || (b = Ed(b, Kd)), a.a = new Dd(b, a.h));
  }

  function H(a, b, c) {
    a.a.set(b, c);
  }

  function Ld(a, b) {
    return a.a.get(b);
  }

  function Md(a) {
    return a instanceof xd ? new xd(a) : new xd(a, void 0);
  }

  function Nd(a, b) {
    var c = new xd(null, void 0);
    yd(c, "https");
    a && (c.b = a);
    b && (c.c = b);
    return c;
  }

  function Cd(a, b) {
    return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
  }

  function Ed(a, b, c) {
    return n(a) ? (a = encodeURI(a).replace(b, Od), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
  }

  function Od(a) {
    a = a.charCodeAt(0);
    return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
  }

  var Fd = /[#\/\?@]/g,
      Hd = /[#\?:]/g,
      Gd = /[#\?]/g,
      Kd = /[#\?@]/g,
      Id = /#/g;

  function Dd(a, b) {
    this.b = this.a = null;
    this.c = a || null;
    this.f = !!b;
  }

  function Pd(a) {
    a.a || (a.a = new sd(), a.b = 0, a.c && wd(a.c, function (b, c) {
      a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
    }));
  }

  function Qd(a) {
    var b = qd(a);
    if ("undefined" == typeof b) throw Error("Keys are undefined");
    var c = new Dd(null, void 0);
    a = pd(a);

    for (var d = 0; d < b.length; d++) {
      var e = b[d],
          f = a[d];
      oa(f) ? Rd(c, e, f) : c.add(e, f);
    }

    return c;
  }

  k = Dd.prototype;

  k.add = function (a, b) {
    Pd(this);
    this.c = null;
    a = Sd(this, a);
    var c = this.a.get(a);
    c || this.a.set(a, c = []);
    c.push(b);
    this.b += 1;
    return this;
  };

  function Td(a, b) {
    Pd(a);
    b = Sd(a, b);
    ud(a.a.b, b) && (a.c = null, a.b -= a.a.get(b).length, a = a.a, ud(a.b, b) && (delete a.b[b], a.c--, a.a.length > 2 * a.c && td(a)));
  }

  k.clear = function () {
    this.a = this.c = null;
    this.b = 0;
  };

  function Ud(a, b) {
    Pd(a);
    b = Sd(a, b);
    return ud(a.a.b, b);
  }

  k.forEach = function (a, b) {
    Pd(this);
    this.a.forEach(function (c, d) {
      x(c, function (e) {
        a.call(b, e, d, this);
      }, this);
    }, this);
  };

  k.X = function () {
    Pd(this);

    for (var a = this.a.U(), b = this.a.X(), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);

    return c;
  };

  k.U = function (a) {
    Pd(this);
    var b = [];
    if (n(a)) Ud(this, a) && (b = Ra(b, this.a.get(Sd(this, a))));else {
      a = this.a.U();

      for (var c = 0; c < a.length; c++) b = Ra(b, a[c]);
    }
    return b;
  };

  k.set = function (a, b) {
    Pd(this);
    this.c = null;
    a = Sd(this, a);
    Ud(this, a) && (this.b -= this.a.get(a).length);
    this.a.set(a, [b]);
    this.b += 1;
    return this;
  };

  k.get = function (a, b) {
    if (!a) return b;
    a = this.U(a);
    return 0 < a.length ? String(a[0]) : b;
  };

  function Rd(a, b, c) {
    Td(a, b);
    0 < c.length && (a.c = null, a.a.set(Sd(a, b), Sa(c)), a.b += c.length);
  }

  k.toString = function () {
    if (this.c) return this.c;
    if (!this.a) return "";

    for (var a = [], b = this.a.X(), c = 0; c < b.length; c++) {
      var d = b[c],
          e = encodeURIComponent(String(d));
      d = this.U(d);

      for (var f = 0; f < d.length; f++) {
        var g = e;
        "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
        a.push(g);
      }
    }

    return this.c = a.join("&");
  };

  function Bd(a) {
    var b = new Dd();
    b.c = a.c;
    a.a && (b.a = new sd(a.a), b.b = a.b);
    return b;
  }

  function Sd(a, b) {
    b = String(b);
    a.f && (b = b.toLowerCase());
    return b;
  }

  function Jd(a, b) {
    b && !a.f && (Pd(a), a.c = null, a.a.forEach(function (c, d) {
      var e = d.toLowerCase();
      d != e && (Td(this, d), Rd(this, e, c));
    }, a));
    a.f = b;
  }

  ;
  var Vd = !vc || 9 <= Number(Gc);

  function Wd(a) {
    var b = document;
    return n(a) ? b.getElementById(a) : a;
  }

  function Xd(a, b) {
    Ta(b, function (c, d) {
      c && "object" == typeof c && c.qa && (c = c.pa());
      "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Yd.hasOwnProperty(d) ? a.setAttribute(Yd[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c;
    });
  }

  var Yd = {
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    colspan: "colSpan",
    frameborder: "frameBorder",
    height: "height",
    maxlength: "maxLength",
    nonce: "nonce",
    role: "role",
    rowspan: "rowSpan",
    type: "type",
    usemap: "useMap",
    valign: "vAlign",
    width: "width"
  };

  function Zd(a, b, c) {
    var d = arguments,
        e = document,
        f = String(d[0]),
        g = d[1];

    if (!Vd && g && (g.name || g.type)) {
      f = ["<", f];
      g.name && f.push(' name="', Jb(g.name), '"');

      if (g.type) {
        f.push(' type="', Jb(g.type), '"');
        var h = {};
        Xa(h, g);
        delete h.type;
        g = h;
      }

      f.push(">");
      f = f.join("");
    }

    f = e.createElement(f);
    g && (n(g) ? f.className = g : oa(g) ? f.className = g.join(" ") : Xd(f, g));
    2 < d.length && $d(e, f, d);
    return f;
  }

  function $d(a, b, c) {
    function d(g) {
      g && b.appendChild(n(g) ? a.createTextNode(g) : g);
    }

    for (var e = 2; e < c.length; e++) {
      var f = c[e];
      !pa(f) || r(f) && 0 < f.nodeType ? d(f) : x(ae(f) ? Sa(f) : f, d);
    }
  }

  function ae(a) {
    if (a && "number" == typeof a.length) {
      if (r(a)) return "function" == typeof a.item || "string" == typeof a.item;
      if (q(a)) return "function" == typeof a.item;
    }

    return !1;
  }

  ;

  function be(a) {
    var b = [];
    ce(new de(), a, b);
    return b.join("");
  }

  function de() {}

  function ce(a, b, c) {
    if (null == b) c.push("null");else {
      if ("object" == typeof b) {
        if (oa(b)) {
          var d = b;
          b = d.length;
          c.push("[");

          for (var e = "", f = 0; f < b; f++) c.push(e), ce(a, d[f], c), e = ",";

          c.push("]");
          return;
        }

        if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();else {
          c.push("{");
          e = "";

          for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), ee(d, c), c.push(":"), ce(a, f, c), e = ","));

          c.push("}");
          return;
        }
      }

      switch (typeof b) {
        case "string":
          ee(b, c);
          break;

        case "number":
          c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
          break;

        case "boolean":
          c.push(String(b));
          break;

        case "function":
          c.push("null");
          break;

        default:
          throw Error("Unknown type: " + typeof b);
      }
    }
  }

  var fe = {
    '"': '\\"',
    "\\": "\\\\",
    "/": "\\/",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\x0B": "\\u000b"
  },
      ge = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;

  function ee(a, b) {
    b.push('"', a.replace(ge, function (c) {
      var d = fe[c];
      d || (d = "\\u" + (c.charCodeAt(0) | 65536).toString(16).substr(1), fe[c] = d);
      return d;
    }), '"');
  }

  ;
  /*
  Copyright 2017 Google Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */

  function he() {
    var a = I();
    return vc && !!Gc && 11 == Gc || /Edge\/\d+/.test(a);
  }

  function ie() {
    return l.window && l.window.location.href || self && self.location && self.location.href || "";
  }

  function je(a, b) {
    b = b || l.window;
    var c = "about:blank";
    a && (c = ub(wb(a)).toString());
    b.location.href = c;
  }

  function ke(a, b) {
    var c = [],
        d;

    for (d in a) d in b ? typeof a[d] != typeof b[d] ? c.push(d) : "object" == typeof a[d] && null != a[d] && null != b[d] ? 0 < ke(a[d], b[d]).length && c.push(d) : a[d] !== b[d] && c.push(d) : c.push(d);

    for (d in b) d in a || c.push(d);

    return c;
  }

  function le() {
    var a = I();
    a = me(a) != ne ? null : (a = a.match(/\sChrome\/(\d+)/i)) && 2 == a.length ? parseInt(a[1], 10) : null;
    return a && 30 > a ? !1 : !vc || !Gc || 9 < Gc;
  }

  function oe(a) {
    a = (a || I()).toLowerCase();
    return a.match(/android/) || a.match(/webos/) || a.match(/iphone|ipad|ipod/) || a.match(/blackberry/) || a.match(/windows phone/) || a.match(/iemobile/) ? !0 : !1;
  }

  function pe(a) {
    a = a || l.window;

    try {
      a.close();
    } catch (b) {}
  }

  function qe(a, b, c) {
    var d = Math.floor(1E9 * Math.random()).toString();
    b = b || 500;
    c = c || 600;
    var e = (window.screen.availHeight - c) / 2,
        f = (window.screen.availWidth - b) / 2;
    b = {
      width: b,
      height: c,
      top: 0 < e ? e : 0,
      left: 0 < f ? f : 0,
      location: !0,
      resizable: !0,
      statusbar: !0,
      toolbar: !1
    };
    c = I().toLowerCase();
    d && (b.target = d, y(c, "crios/") && (b.target = "_blank"));
    me(I()) == re && (a = a || "http://localhost", b.scrollbars = !0);
    c = a || "";
    (a = b) || (a = {});
    d = window;
    b = c instanceof sb ? c : wb("undefined" != typeof c.href ? c.href : String(c));
    c = a.target || c.target;
    e = [];

    for (g in a) switch (g) {
      case "width":
      case "height":
      case "top":
      case "left":
        e.push(g + "=" + a[g]);
        break;

      case "target":
      case "noopener":
      case "noreferrer":
        break;

      default:
        e.push(g + "=" + (a[g] ? 1 : 0));
    }

    var g = e.join(",");
    (z("iPhone") && !z("iPod") && !z("iPad") || z("iPad") || z("iPod")) && d.navigator && d.navigator.standalone && c && "_self" != c ? (g = d.document.createElement("A"), Ha(g, "HTMLAnchorElement"), b instanceof sb || b instanceof sb || (b = "object" == typeof b && b.qa ? b.pa() : String(b), vb.test(b) || (b = "about:invalid#zClosurez"), b = xb(b)), g.href = ub(b), g.setAttribute("target", c), a.noreferrer && g.setAttribute("rel", "noreferrer"), a = document.createEvent("MouseEvent"), a.initMouseEvent("click", !0, !0, d, 1), g.dispatchEvent(a), g = {}) : a.noreferrer ? (g = d.open("", c, g), a = ub(b).toString(), g && (xc && y(a, ";") && (a = "'" + a.replace(/'/g, "%27") + "'"), g.opener = null, a = Eb('<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + Jb(a) + '">'), g.document.write(Db(a)), g.document.close())) : (g = d.open(ub(b).toString(), c, g)) && a.noopener && (g.opener = null);
    if (g) try {
      g.focus();
    } catch (h) {}
    return g;
  }

  function se(a) {
    return new B(function (b) {
      function c() {
        od(2E3).then(function () {
          if (!a || a.closed) b();else return c();
        });
      }

      return c();
    });
  }

  var te = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
      ue = /^[^@]+@[^@]+$/;

  function ve() {
    var a = null;
    return new B(function (b) {
      "complete" == l.document.readyState ? b() : (a = function () {
        b();
      }, Yc(window, "load", a));
    }).s(function (b) {
      gd(window, "load", a);
      throw b;
    });
  }

  function we() {
    return xe(void 0) ? ve().then(function () {
      return new B(function (a, b) {
        var c = l.document,
            d = setTimeout(function () {
          b(Error("Cordova framework is not ready."));
        }, 1E3);
        c.addEventListener("deviceready", function () {
          clearTimeout(d);
          a();
        }, !1);
      });
    }) : E(Error("Cordova must run in an Android or iOS file scheme."));
  }

  function xe(a) {
    a = a || I();
    return !("file:" !== ye() && "ionic:" !== ye() || !a.toLowerCase().match(/iphone|ipad|ipod|android/));
  }

  function ze() {
    var a = l.window;

    try {
      return !(!a || a == a.top);
    } catch (b) {
      return !1;
    }
  }

  function Ae() {
    return "undefined" !== typeof l.WorkerGlobalScope && "function" === typeof l.importScripts;
  }

  function Be() {
    return _app.default.INTERNAL.hasOwnProperty("reactNative") ? "ReactNative" : _app.default.INTERNAL.hasOwnProperty("node") ? "Node" : Ae() ? "Worker" : "Browser";
  }

  function Ce() {
    var a = Be();
    return "ReactNative" === a || "Node" === a;
  }

  function De() {
    for (var a = 50, b = []; 0 < a;) b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), a--;

    return b.join("");
  }

  var re = "Firefox",
      ne = "Chrome";

  function me(a) {
    var b = a.toLowerCase();
    if (y(b, "opera/") || y(b, "opr/") || y(b, "opios/")) return "Opera";
    if (y(b, "iemobile")) return "IEMobile";
    if (y(b, "msie") || y(b, "trident/")) return "IE";
    if (y(b, "edge/")) return "Edge";
    if (y(b, "firefox/")) return re;
    if (y(b, "silk/")) return "Silk";
    if (y(b, "blackberry")) return "Blackberry";
    if (y(b, "webos")) return "Webos";
    if (!y(b, "safari/") || y(b, "chrome/") || y(b, "crios/") || y(b, "android")) {
      if (!y(b, "chrome/") && !y(b, "crios/") || y(b, "edge/")) {
        if (y(b, "android")) return "Android";
        if ((a = a.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/)) && 2 == a.length) return a[1];
      } else return ne;
    } else return "Safari";
    return "Other";
  }

  var Ee = {
    Wc: "FirebaseCore-web",
    Yc: "FirebaseUI-web"
  };

  function Fe(a, b) {
    b = b || [];
    var c = [],
        d = {},
        e;

    for (e in Ee) d[Ee[e]] = !0;

    for (e = 0; e < b.length; e++) "undefined" !== typeof d[b[e]] && (delete d[b[e]], c.push(b[e]));

    c.sort();
    b = c;
    b.length || (b = ["FirebaseCore-web"]);
    c = Be();
    "Browser" === c ? (d = I(), c = me(d)) : "Worker" === c && (d = I(), c = me(d) + "-" + c);
    return c + "/JsCore/" + a + "/" + b.join(",");
  }

  function I() {
    return l.navigator && l.navigator.userAgent || "";
  }

  function J(a, b) {
    a = a.split(".");
    b = b || l;

    for (var c = 0; c < a.length && "object" == typeof b && null != b; c++) b = b[a[c]];

    c != a.length && (b = void 0);
    return b;
  }

  function Ge() {
    try {
      var a = l.localStorage,
          b = He();
      if (a) return a.setItem(b, "1"), a.removeItem(b), he() ? !!l.indexedDB : !0;
    } catch (c) {
      return Ae() && !!l.indexedDB;
    }

    return !1;
  }

  function Ie() {
    return (Je() || "chrome-extension:" === ye() || xe()) && !Ce() && Ge() && !Ae();
  }

  function Je() {
    return "http:" === ye() || "https:" === ye();
  }

  function ye() {
    return l.location && l.location.protocol || null;
  }

  function Ke(a) {
    a = a || I();
    return oe(a) || me(a) == re ? !1 : !0;
  }

  function Le(a) {
    return "undefined" === typeof a ? null : be(a);
  }

  function Me(a) {
    var b = {},
        c;

    for (c in a) a.hasOwnProperty(c) && null !== a[c] && void 0 !== a[c] && (b[c] = a[c]);

    return b;
  }

  function Ne(a) {
    if (null !== a) return JSON.parse(a);
  }

  function He(a) {
    return a ? a : Math.floor(1E9 * Math.random()).toString();
  }

  function Oe(a) {
    a = a || I();
    return "Safari" == me(a) || a.toLowerCase().match(/iphone|ipad|ipod/) ? !1 : !0;
  }

  function Pe() {
    var a = l.___jsl;
    if (a && a.H) for (var b in a.H) if (a.H[b].r = a.H[b].r || [], a.H[b].L = a.H[b].L || [], a.H[b].r = a.H[b].L.concat(), a.CP) for (var c = 0; c < a.CP.length; c++) a.CP[c] = null;
  }

  function Qe(a, b) {
    if (a > b) throw Error("Short delay should be less than long delay!");
    this.a = a;
    this.c = b;
    a = I();
    b = Be();
    this.b = oe(a) || "ReactNative" === b;
  }

  Qe.prototype.get = function () {
    var a = l.navigator;
    return (a && "boolean" === typeof a.onLine && (Je() || "chrome-extension:" === ye() || "undefined" !== typeof a.connection) ? a.onLine : 1) ? this.b ? this.c : this.a : Math.min(5E3, this.a);
  };

  function Re() {
    var a = l.document;
    return a && "undefined" !== typeof a.visibilityState ? "visible" == a.visibilityState : !0;
  }

  function Se() {
    var a = l.document,
        b = null;
    return Re() || !a ? D() : new B(function (c) {
      b = function () {
        Re() && (a.removeEventListener("visibilitychange", b, !1), c());
      };

      a.addEventListener("visibilitychange", b, !1);
    }).s(function (c) {
      a.removeEventListener("visibilitychange", b, !1);
      throw c;
    });
  }

  function Te(a) {
    try {
      var b = new Date(parseInt(a, 10));
      if (!isNaN(b.getTime()) && !/[^0-9]/.test(a)) return b.toUTCString();
    } catch (c) {}

    return null;
  }

  function Ue() {
    return !(!J("fireauth.oauthhelper", l) && !J("fireauth.iframe", l));
  }

  function Ve() {
    var a = l.navigator;
    return a && a.serviceWorker && a.serviceWorker.controller || null;
  }

  function We() {
    var a = l.navigator;
    return a && a.serviceWorker ? D().then(function () {
      return a.serviceWorker.ready;
    }).then(function (b) {
      return b.active || null;
    }).s(function () {
      return null;
    }) : D(null);
  }

  ;
  var Xe = {};

  function Ye(a) {
    Xe[a] || (Xe[a] = !0, "undefined" !== typeof console && "function" === typeof console.warn && console.warn(a));
  }

  ;
  var Ze;

  try {
    var $e = {};
    Object.defineProperty($e, "abcd", {
      configurable: !0,
      enumerable: !0,
      value: 1
    });
    Object.defineProperty($e, "abcd", {
      configurable: !0,
      enumerable: !0,
      value: 2
    });
    Ze = 2 == $e.abcd;
  } catch (a) {
    Ze = !1;
  }

  function K(a, b, c) {
    Ze ? Object.defineProperty(a, b, {
      configurable: !0,
      enumerable: !0,
      value: c
    }) : a[b] = c;
  }

  function L(a, b) {
    if (b) for (var c in b) b.hasOwnProperty(c) && K(a, c, b[c]);
  }

  function af(a) {
    var b = {};
    L(b, a);
    return b;
  }

  function bf(a) {
    var b = {},
        c;

    for (c in a) a.hasOwnProperty(c) && (b[c] = a[c]);

    return b;
  }

  function cf(a, b) {
    if (!b || !b.length) return !0;
    if (!a) return !1;

    for (var c = 0; c < b.length; c++) {
      var d = a[b[c]];
      if (void 0 === d || null === d || "" === d) return !1;
    }

    return !0;
  }

  function df(a) {
    var b = a;

    if ("object" == typeof a && null != a) {
      b = "length" in a ? [] : {};

      for (var c in a) K(b, c, df(a[c]));
    }

    return b;
  }

  ;

  function ef(a) {
    var b = {},
        c = a[ff],
        d = a[gf];
    a = a[hf];
    if (!a || a != jf && !c) throw Error("Invalid provider user info!");
    b[kf] = d || null;
    b[lf] = c || null;
    K(this, mf, a);
    K(this, nf, df(b));
  }

  var jf = "EMAIL_SIGNIN",
      ff = "email",
      gf = "newEmail",
      hf = "requestType",
      lf = "email",
      kf = "fromEmail",
      nf = "data",
      mf = "operation";

  function M(a, b) {
    this.code = of + a;
    this.message = b || pf[a] || "";
  }

  v(M, Error);

  M.prototype.A = function () {
    return {
      code: this.code,
      message: this.message
    };
  };

  M.prototype.toJSON = function () {
    return this.A();
  };

  function qf(a) {
    var b = a && a.code;
    return b ? new M(b.substring(of.length), a.message) : null;
  }

  var of = "auth/",
      pf = {
    "admin-restricted-operation": "This operation is restricted to administrators only.",
    "argument-error": "",
    "app-not-authorized": "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.",
    "app-not-installed": "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.",
    "captcha-check-failed": "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.",
    "code-expired": "The SMS code has expired. Please re-send the verification code to try again.",
    "cordova-not-ready": "Cordova framework is not ready.",
    "cors-unsupported": "This browser is not supported.",
    "credential-already-in-use": "This credential is already associated with a different user account.",
    "custom-token-mismatch": "The custom token corresponds to a different audience.",
    "requires-recent-login": "This operation is sensitive and requires recent authentication. Log in again before retrying this request.",
    "dynamic-link-not-activated": "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.",
    "email-already-in-use": "The email address is already in use by another account.",
    "expired-action-code": "The action code has expired. ",
    "cancelled-popup-request": "This operation has been cancelled due to another conflicting popup being opened.",
    "internal-error": "An internal error has occurred.",
    "invalid-app-credential": "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.",
    "invalid-app-id": "The mobile app identifier is not registed for the current project.",
    "invalid-user-token": "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.",
    "invalid-auth-event": "An internal error has occurred.",
    "invalid-verification-code": "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.",
    "invalid-continue-uri": "The continue URL provided in the request is invalid.",
    "invalid-cordova-configuration": "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
    "invalid-custom-token": "The custom token format is incorrect. Please check the documentation.",
    "invalid-dynamic-link-domain": "The provided dynamic link domain is not configured or authorized for the current project.",
    "invalid-email": "The email address is badly formatted.",
    "invalid-api-key": "Your API key is invalid, please check you have copied it correctly.",
    "invalid-cert-hash": "The SHA-1 certificate hash provided is invalid.",
    "invalid-credential": "The supplied auth credential is malformed or has expired.",
    "invalid-message-payload": "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.",
    "invalid-oauth-provider": "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.",
    "invalid-oauth-client-id": "The OAuth client ID provided is either invalid or does not match the specified API key.",
    "unauthorized-domain": "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.",
    "invalid-action-code": "The action code is invalid. This can happen if the code is malformed, expired, or has already been used.",
    "wrong-password": "The password is invalid or the user does not have a password.",
    "invalid-persistence-type": "The specified persistence type is invalid. It can only be local, session or none.",
    "invalid-phone-number": "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].",
    "invalid-provider-id": "The specified provider ID is invalid.",
    "invalid-recipient-email": "The email corresponding to this action failed to send as the provided recipient email address is invalid.",
    "invalid-sender": "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.",
    "invalid-verification-id": "The verification ID used to create the phone auth credential is invalid.",
    "invalid-tenant-id": "The Auth instance's tenant ID is invalid.",
    "missing-android-pkg-name": "An Android Package Name must be provided if the Android App is required to be installed.",
    "auth-domain-config-required": "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.",
    "missing-app-credential": "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.",
    "missing-verification-code": "The phone auth credential was created with an empty SMS verification code.",
    "missing-continue-uri": "A continue URL must be provided in the request.",
    "missing-iframe-start": "An internal error has occurred.",
    "missing-ios-bundle-id": "An iOS Bundle ID must be provided if an App Store ID is provided.",
    "missing-or-invalid-nonce": "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.",
    "missing-phone-number": "To send verification codes, provide a phone number for the recipient.",
    "missing-verification-id": "The phone auth credential was created with an empty verification ID.",
    "app-deleted": "This instance of FirebaseApp has been deleted.",
    "account-exists-with-different-credential": "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.",
    "network-request-failed": "A network error (such as timeout, interrupted connection or unreachable host) has occurred.",
    "no-auth-event": "An internal error has occurred.",
    "no-such-provider": "User was not linked to an account with the given provider.",
    "null-user": "A null user object was provided as the argument for an operation which requires a non-null user object.",
    "operation-not-allowed": "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.",
    "operation-not-supported-in-this-environment": 'This operation is not supported in the environment this application is running on. "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',
    "popup-blocked": "Unable to establish a connection with the popup. It may have been blocked by the browser.",
    "popup-closed-by-user": "The popup has been closed by the user before finalizing the operation.",
    "provider-already-linked": "User can only be linked to one identity for the given provider.",
    "quota-exceeded": "The project's quota for this operation has been exceeded.",
    "redirect-cancelled-by-user": "The redirect operation has been cancelled by the user before finalizing.",
    "redirect-operation-pending": "A redirect sign-in operation is already pending.",
    "rejected-credential": "The request contains malformed or mismatching credentials.",
    "tenant-id-mismatch": "The provided tenant ID does not match the Auth instance's tenant ID",
    timeout: "The operation has timed out.",
    "user-token-expired": "The user's credential is no longer valid. The user must sign in again.",
    "too-many-requests": "We have blocked all requests from this device due to unusual activity. Try again later.",
    "unauthorized-continue-uri": "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.",
    "unsupported-persistence-type": "The current environment does not support the specified persistence type.",
    "unsupported-tenant-operation": "This operation is not supported in a multi-tenant context.",
    "user-cancelled": "The user did not grant your application the permissions it requested.",
    "user-not-found": "There is no user record corresponding to this identifier. The user may have been deleted.",
    "user-disabled": "The user account has been disabled by an administrator.",
    "user-mismatch": "The supplied credentials do not correspond to the previously signed in user.",
    "user-signed-out": "",
    "weak-password": "The password must be 6 characters long or more.",
    "web-storage-unsupported": "This browser is not supported or 3rd party cookies and data may be disabled."
  };

  function rf(a) {
    a = Md(a);
    var b = Ld(a, sf) || null,
        c = Ld(a, tf) || null,
        d = Ld(a, uf) || null;
    d = d ? vf[d] || null : null;
    if (!b || !c || !d) throw new M("argument-error", sf + ", " + tf + "and " + uf + " are required in a valid action code URL.");
    L(this, {
      apiKey: b,
      operation: d,
      code: c,
      continueUrl: Ld(a, wf) || null,
      languageCode: Ld(a, xf) || null,
      tenantId: Ld(a, yf) || null
    });
  }

  var sf = "apiKey",
      tf = "oobCode",
      wf = "continueUrl",
      xf = "languageCode",
      uf = "mode",
      yf = "tenantId",
      vf = {
    recoverEmail: "RECOVER_EMAIL",
    resetPassword: "PASSWORD_RESET",
    signIn: jf,
    verifyEmail: "VERIFY_EMAIL"
  };

  function zf(a) {
    try {
      return new rf(a);
    } catch (b) {
      return null;
    }
  }

  ;

  function Af(a) {
    var b = a[Bf];
    if ("undefined" === typeof b) throw new M("missing-continue-uri");
    if ("string" !== typeof b || "string" === typeof b && !b.length) throw new M("invalid-continue-uri");
    this.h = b;
    this.b = this.a = null;
    this.g = !1;
    var c = a[Cf];

    if (c && "object" === typeof c) {
      b = c[Df];
      var d = c[Ef];
      c = c[Ff];

      if ("string" === typeof b && b.length) {
        this.a = b;
        if ("undefined" !== typeof d && "boolean" !== typeof d) throw new M("argument-error", Ef + " property must be a boolean when specified.");
        this.g = !!d;
        if ("undefined" !== typeof c && ("string" !== typeof c || "string" === typeof c && !c.length)) throw new M("argument-error", Ff + " property must be a non empty string when specified.");
        this.b = c || null;
      } else {
        if ("undefined" !== typeof b) throw new M("argument-error", Df + " property must be a non empty string when specified.");
        if ("undefined" !== typeof d || "undefined" !== typeof c) throw new M("missing-android-pkg-name");
      }
    } else if ("undefined" !== typeof c) throw new M("argument-error", Cf + " property must be a non null object when specified.");

    this.f = null;
    if ((b = a[Gf]) && "object" === typeof b) {
      if (b = b[Hf], "string" === typeof b && b.length) this.f = b;else {
        if ("undefined" !== typeof b) throw new M("argument-error", Hf + " property must be a non empty string when specified.");
      }
    } else if ("undefined" !== typeof b) throw new M("argument-error", Gf + " property must be a non null object when specified.");
    b = a[If];
    if ("undefined" !== typeof b && "boolean" !== typeof b) throw new M("argument-error", If + " property must be a boolean when specified.");
    this.c = !!b;
    a = a[Jf];
    if ("undefined" !== typeof a && ("string" !== typeof a || "string" === typeof a && !a.length)) throw new M("argument-error", Jf + " property must be a non empty string when specified.");
    this.i = a || null;
  }

  var Cf = "android",
      Jf = "dynamicLinkDomain",
      If = "handleCodeInApp",
      Gf = "iOS",
      Bf = "url",
      Ef = "installApp",
      Ff = "minimumVersion",
      Df = "packageName",
      Hf = "bundleId";

  function Kf(a) {
    var b = {};
    b.continueUrl = a.h;
    b.canHandleCodeInApp = a.c;
    if (b.androidPackageName = a.a) b.androidMinimumVersion = a.b, b.androidInstallApp = a.g;
    b.iOSBundleId = a.f;
    b.dynamicLinkDomain = a.i;

    for (var c in b) null === b[c] && delete b[c];

    return b;
  }

  ;

  function Lf(a) {
    return Ka(a, function (b) {
      b = b.toString(16);
      return 1 < b.length ? b : "0" + b;
    }).join("");
  }

  ;
  var Mf = null,
      Nf = null;

  function Of(a) {
    var b = "";
    Pf(a, function (c) {
      b += String.fromCharCode(c);
    });
    return b;
  }

  function Pf(a, b) {
    function c(m) {
      for (; d < a.length;) {
        var p = a.charAt(d++),
            u = Nf[p];
        if (null != u) return u;
        if (!/^[\s\xa0]*$/.test(p)) throw Error("Unknown base64 encoding at char: " + p);
      }

      return m;
    }

    Qf();

    for (var d = 0;;) {
      var e = c(-1),
          f = c(0),
          g = c(64),
          h = c(64);
      if (64 === h && -1 === e) break;
      b(e << 2 | f >> 4);
      64 != g && (b(f << 4 & 240 | g >> 2), 64 != h && b(g << 6 & 192 | h));
    }
  }

  function Qf() {
    if (!Mf) {
      Mf = {};
      Nf = {};

      for (var a = 0; 65 > a; a++) Mf[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), Nf[Mf[a]] = a, 62 <= a && (Nf["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a);
    }
  }

  ;

  function Rf(a) {
    this.f = a.sub;
    va();
    this.a = a.provider_id || a.firebase && a.firebase.sign_in_provider || null;
    this.c = a.firebase && a.firebase.tenant || null;
    this.b = !!a.is_anonymous || "anonymous" == this.a;
  }

  Rf.prototype.R = function () {
    return this.c;
  };

  Rf.prototype.g = function () {
    return this.b;
  };

  function Sf(a) {
    return (a = Tf(a)) && a.sub && a.iss && a.aud && a.exp ? new Rf(a) : null;
  }

  function Tf(a) {
    if (!a) return null;
    a = a.split(".");
    if (3 != a.length) return null;
    a = a[1];

    for (var b = (4 - a.length % 4) % 4, c = 0; c < b; c++) a += ".";

    try {
      return JSON.parse(Of(a));
    } catch (d) {}

    return null;
  }

  ;
  var Uf = {
    bd: {
      cb: "https://www.googleapis.com/identitytoolkit/v3/relyingparty/",
      ib: "https://securetoken.googleapis.com/v1/token",
      id: "p"
    },
    dd: {
      cb: "https://staging-www.sandbox.googleapis.com/identitytoolkit/v3/relyingparty/",
      ib: "https://staging-securetoken.sandbox.googleapis.com/v1/token",
      id: "s"
    },
    ed: {
      cb: "https://www-googleapis-test.sandbox.google.com/identitytoolkit/v3/relyingparty/",
      ib: "https://test-securetoken.sandbox.googleapis.com/v1/token",
      id: "t"
    }
  };

  function Vf(a) {
    for (var b in Uf) if (Uf[b].id === a) return a = Uf[b], {
      firebaseEndpoint: a.cb,
      secureTokenEndpoint: a.ib
    };

    return null;
  }

  var Wf;
  Wf = Vf("__EID__") ? "__EID__" : void 0;
  var Xf = "oauth_consumer_key oauth_nonce oauth_signature oauth_signature_method oauth_timestamp oauth_token oauth_version".split(" "),
      Yf = ["client_id", "response_type", "scope", "redirect_uri", "state"],
      Zf = {
    Xc: {
      Ea: "locale",
      sa: 700,
      ra: 600,
      Fa: "facebook.com",
      Qa: Yf
    },
    Zc: {
      Ea: null,
      sa: 500,
      ra: 750,
      Fa: "github.com",
      Qa: Yf
    },
    $c: {
      Ea: "hl",
      sa: 515,
      ra: 680,
      Fa: "google.com",
      Qa: Yf
    },
    fd: {
      Ea: "lang",
      sa: 485,
      ra: 705,
      Fa: "twitter.com",
      Qa: Xf
    },
    Vc: {
      Ea: "locale",
      sa: 600,
      ra: 600,
      Fa: "apple.com",
      Qa: []
    }
  };

  function $f(a) {
    for (var b in Zf) if (Zf[b].Fa == a) return Zf[b];

    return null;
  }

  ;

  function ag(a) {
    var b = {};
    b["facebook.com"] = bg;
    b["google.com"] = cg;
    b["github.com"] = dg;
    b["twitter.com"] = eg;
    var c = a && a[fg];

    try {
      if (c) return b[c] ? new b[c](a) : new gg(a);
      if ("undefined" !== typeof a[hg]) return new ig(a);
    } catch (d) {}

    return null;
  }

  var hg = "idToken",
      fg = "providerId";

  function ig(a) {
    var b = a[fg];

    if (!b && a[hg]) {
      var c = Sf(a[hg]);
      c && c.a && (b = c.a);
    }

    if (!b) throw Error("Invalid additional user info!");
    if ("anonymous" == b || "custom" == b) b = null;
    c = !1;
    "undefined" !== typeof a.isNewUser ? c = !!a.isNewUser : "identitytoolkit#SignupNewUserResponse" === a.kind && (c = !0);
    K(this, "providerId", b);
    K(this, "isNewUser", c);
  }

  function gg(a) {
    ig.call(this, a);
    a = Ne(a.rawUserInfo || "{}");
    K(this, "profile", df(a || {}));
  }

  v(gg, ig);

  function bg(a) {
    gg.call(this, a);
    if ("facebook.com" != this.providerId) throw Error("Invalid provider ID!");
  }

  v(bg, gg);

  function dg(a) {
    gg.call(this, a);
    if ("github.com" != this.providerId) throw Error("Invalid provider ID!");
    K(this, "username", this.profile && this.profile.login || null);
  }

  v(dg, gg);

  function cg(a) {
    gg.call(this, a);
    if ("google.com" != this.providerId) throw Error("Invalid provider ID!");
  }

  v(cg, gg);

  function eg(a) {
    gg.call(this, a);
    if ("twitter.com" != this.providerId) throw Error("Invalid provider ID!");
    K(this, "username", a.screenName || null);
  }

  v(eg, gg);

  function jg(a) {
    var b = Md(a),
        c = Ld(b, "link"),
        d = Ld(Md(c), "link");
    b = Ld(b, "deep_link_id");
    return Ld(Md(b), "link") || b || d || c || a;
  }

  ;

  function kg() {}

  function lg(a, b) {
    return a.then(function (c) {
      if (c[mg]) {
        var d = Sf(c[mg]);
        if (!d || b != d.f) throw new M("user-mismatch");
        return c;
      }

      throw new M("user-mismatch");
    }).s(function (c) {
      throw c && c.code && c.code == of + "user-not-found" ? new M("user-mismatch") : c;
    });
  }

  function ng(a, b) {
    if (b) this.a = b;else throw new M("internal-error", "failed to construct a credential");
    K(this, "providerId", a);
    K(this, "signInMethod", a);
  }

  ng.prototype.na = function (a) {
    return og(a, pg(this));
  };

  ng.prototype.b = function (a, b) {
    var c = pg(this);
    c.idToken = b;
    return qg(a, c);
  };

  ng.prototype.f = function (a, b) {
    return lg(rg(a, pg(this)), b);
  };

  function pg(a) {
    return {
      pendingToken: a.a,
      requestUri: "http://localhost"
    };
  }

  ng.prototype.A = function () {
    return {
      providerId: this.providerId,
      signInMethod: this.signInMethod,
      pendingToken: this.a
    };
  };

  function sg(a) {
    if (a && a.providerId && a.signInMethod && 0 == a.providerId.indexOf("saml.") && a.pendingToken) try {
      return new ng(a.providerId, a.pendingToken);
    } catch (b) {}
    return null;
  }

  function tg(a, b, c) {
    this.a = null;
    if (b.idToken || b.accessToken) b.idToken && K(this, "idToken", b.idToken), b.accessToken && K(this, "accessToken", b.accessToken), b.nonce && !b.pendingToken && K(this, "nonce", b.nonce), b.pendingToken && (this.a = b.pendingToken);else if (b.oauthToken && b.oauthTokenSecret) K(this, "accessToken", b.oauthToken), K(this, "secret", b.oauthTokenSecret);else throw new M("internal-error", "failed to construct a credential");
    K(this, "providerId", a);
    K(this, "signInMethod", c);
  }

  tg.prototype.na = function (a) {
    return og(a, ug(this));
  };

  tg.prototype.b = function (a, b) {
    var c = ug(this);
    c.idToken = b;
    return qg(a, c);
  };

  tg.prototype.f = function (a, b) {
    var c = ug(this);
    return lg(rg(a, c), b);
  };

  function ug(a) {
    var b = {};
    a.idToken && (b.id_token = a.idToken);
    a.accessToken && (b.access_token = a.accessToken);
    a.secret && (b.oauth_token_secret = a.secret);
    b.providerId = a.providerId;
    a.nonce && !a.a && (b.nonce = a.nonce);
    b = {
      postBody: Qd(b).toString(),
      requestUri: "http://localhost"
    };
    a.a && (delete b.postBody, b.pendingToken = a.a);
    return b;
  }

  tg.prototype.A = function () {
    var a = {
      providerId: this.providerId,
      signInMethod: this.signInMethod
    };
    this.idToken && (a.oauthIdToken = this.idToken);
    this.accessToken && (a.oauthAccessToken = this.accessToken);
    this.secret && (a.oauthTokenSecret = this.secret);
    this.nonce && (a.nonce = this.nonce);
    this.a && (a.pendingToken = this.a);
    return a;
  };

  function vg(a) {
    if (a && a.providerId && a.signInMethod) {
      var b = {
        idToken: a.oauthIdToken,
        accessToken: a.oauthTokenSecret ? null : a.oauthAccessToken,
        oauthTokenSecret: a.oauthTokenSecret,
        oauthToken: a.oauthTokenSecret && a.oauthAccessToken,
        nonce: a.nonce,
        pendingToken: a.pendingToken
      };

      try {
        return new tg(a.providerId, b, a.signInMethod);
      } catch (c) {}
    }

    return null;
  }

  function wg(a, b) {
    this.Fc = b || [];
    L(this, {
      providerId: a,
      isOAuthProvider: !0
    });
    this.zb = {};
    this.eb = ($f(a) || {}).Ea || null;
    this.bb = null;
  }

  wg.prototype.Ga = function (a) {
    this.zb = Va(a);
    return this;
  };

  function xg(a) {
    if ("string" !== typeof a || 0 != a.indexOf("saml.")) throw new M("argument-error", 'SAML provider IDs must be prefixed with "saml."');
    wg.call(this, a, []);
  }

  v(xg, wg);

  function O(a) {
    wg.call(this, a, Yf);
    this.a = [];
  }

  v(O, wg);

  O.prototype.ya = function (a) {
    Oa(this.a, a) || this.a.push(a);
    return this;
  };

  O.prototype.Hb = function () {
    return Sa(this.a);
  };

  O.prototype.credential = function (a, b) {
    var c;
    r(a) ? c = {
      idToken: a.idToken || null,
      accessToken: a.accessToken || null,
      nonce: a.rawNonce || null
    } : c = {
      idToken: a || null,
      accessToken: b || null
    };
    if (!c.idToken && !c.accessToken) throw new M("argument-error", "credential failed: must provide the ID token and/or the access token.");
    return new tg(this.providerId, c, this.providerId);
  };

  function yg() {
    O.call(this, "facebook.com");
  }

  v(yg, O);
  K(yg, "PROVIDER_ID", "facebook.com");
  K(yg, "FACEBOOK_SIGN_IN_METHOD", "facebook.com");

  function zg(a) {
    if (!a) throw new M("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
    var b = a;
    r(a) && (b = a.accessToken);
    return new yg().credential({
      accessToken: b
    });
  }

  function Ag() {
    O.call(this, "github.com");
  }

  v(Ag, O);
  K(Ag, "PROVIDER_ID", "github.com");
  K(Ag, "GITHUB_SIGN_IN_METHOD", "github.com");

  function Bg(a) {
    if (!a) throw new M("argument-error", "credential failed: expected 1 argument (the OAuth access token).");
    var b = a;
    r(a) && (b = a.accessToken);
    return new Ag().credential({
      accessToken: b
    });
  }

  function Cg() {
    O.call(this, "google.com");
    this.ya("profile");
  }

  v(Cg, O);
  K(Cg, "PROVIDER_ID", "google.com");
  K(Cg, "GOOGLE_SIGN_IN_METHOD", "google.com");

  function Dg(a, b) {
    var c = a;
    r(a) && (c = a.idToken, b = a.accessToken);
    return new Cg().credential({
      idToken: c,
      accessToken: b
    });
  }

  function Eg() {
    wg.call(this, "twitter.com", Xf);
  }

  v(Eg, wg);
  K(Eg, "PROVIDER_ID", "twitter.com");
  K(Eg, "TWITTER_SIGN_IN_METHOD", "twitter.com");

  function Fg(a, b) {
    var c = a;
    r(c) || (c = {
      oauthToken: a,
      oauthTokenSecret: b
    });
    if (!c.oauthToken || !c.oauthTokenSecret) throw new M("argument-error", "credential failed: expected 2 arguments (the OAuth access token and secret).");
    return new tg("twitter.com", c, "twitter.com");
  }

  function Gg(a, b, c) {
    this.a = a;
    this.c = b;
    K(this, "providerId", "password");
    K(this, "signInMethod", c === Hg.EMAIL_LINK_SIGN_IN_METHOD ? Hg.EMAIL_LINK_SIGN_IN_METHOD : Hg.EMAIL_PASSWORD_SIGN_IN_METHOD);
  }

  Gg.prototype.na = function (a) {
    return this.signInMethod == Hg.EMAIL_LINK_SIGN_IN_METHOD ? P(a, Ig, {
      email: this.a,
      oobCode: this.c
    }) : P(a, Jg, {
      email: this.a,
      password: this.c
    });
  };

  Gg.prototype.b = function (a, b) {
    return this.signInMethod == Hg.EMAIL_LINK_SIGN_IN_METHOD ? P(a, Kg, {
      idToken: b,
      email: this.a,
      oobCode: this.c
    }) : P(a, Lg, {
      idToken: b,
      email: this.a,
      password: this.c
    });
  };

  Gg.prototype.f = function (a, b) {
    return lg(this.na(a), b);
  };

  Gg.prototype.A = function () {
    return {
      email: this.a,
      password: this.c,
      signInMethod: this.signInMethod
    };
  };

  function Mg(a) {
    return a && a.email && a.password ? new Gg(a.email, a.password, a.signInMethod) : null;
  }

  function Hg() {
    L(this, {
      providerId: "password",
      isOAuthProvider: !1
    });
  }

  function Ng(a, b) {
    b = Og(b);
    if (!b) throw new M("argument-error", "Invalid email link!");
    return new Gg(a, b.code, Hg.EMAIL_LINK_SIGN_IN_METHOD);
  }

  function Og(a) {
    a = jg(a);
    return (a = zf(a)) && a.operation === jf ? a : null;
  }

  L(Hg, {
    PROVIDER_ID: "password"
  });
  L(Hg, {
    EMAIL_LINK_SIGN_IN_METHOD: "emailLink"
  });
  L(Hg, {
    EMAIL_PASSWORD_SIGN_IN_METHOD: "password"
  });

  function Pg(a) {
    if (!(a.Va && a.Ua || a.Ha && a.ba)) throw new M("internal-error");
    this.a = a;
    K(this, "providerId", "phone");
    K(this, "signInMethod", "phone");
  }

  Pg.prototype.na = function (a) {
    return a.Wa(Qg(this));
  };

  Pg.prototype.b = function (a, b) {
    var c = Qg(this);
    c.idToken = b;
    return P(a, Rg, c);
  };

  Pg.prototype.f = function (a, b) {
    var c = Qg(this);
    c.operation = "REAUTH";
    a = P(a, Sg, c);
    return lg(a, b);
  };

  Pg.prototype.A = function () {
    var a = {
      providerId: "phone"
    };
    this.a.Va && (a.verificationId = this.a.Va);
    this.a.Ua && (a.verificationCode = this.a.Ua);
    this.a.Ha && (a.temporaryProof = this.a.Ha);
    this.a.ba && (a.phoneNumber = this.a.ba);
    return a;
  };

  function Tg(a) {
    if (a && "phone" === a.providerId && (a.verificationId && a.verificationCode || a.temporaryProof && a.phoneNumber)) {
      var b = {};
      x(["verificationId", "verificationCode", "temporaryProof", "phoneNumber"], function (c) {
        a[c] && (b[c] = a[c]);
      });
      return new Pg(b);
    }

    return null;
  }

  function Qg(a) {
    return a.a.Ha && a.a.ba ? {
      temporaryProof: a.a.Ha,
      phoneNumber: a.a.ba
    } : {
      sessionInfo: a.a.Va,
      code: a.a.Ua
    };
  }

  function Ug(a) {
    try {
      this.a = a || _app.default.auth();
    } catch (b) {
      throw new M("argument-error", "Either an instance of firebase.auth.Auth must be passed as an argument to the firebase.auth.PhoneAuthProvider constructor, or the default firebase App instance must be initialized via firebase.initializeApp().");
    }

    L(this, {
      providerId: "phone",
      isOAuthProvider: !1
    });
  }

  Ug.prototype.Wa = function (a, b) {
    var c = this.a.b;
    return D(b.verify()).then(function (d) {
      if (!n(d)) throw new M("argument-error", "An implementation of firebase.auth.ApplicationVerifier.prototype.verify() must return a firebase.Promise that resolves with a string.");

      switch (b.type) {
        case "recaptcha":
          return Vg(c, {
            phoneNumber: a,
            recaptchaToken: d
          }).then(function (e) {
            "function" === typeof b.reset && b.reset();
            return e;
          }, function (e) {
            "function" === typeof b.reset && b.reset();
            throw e;
          });

        default:
          throw new M("argument-error", 'Only firebase.auth.ApplicationVerifiers with type="recaptcha" are currently supported.');
      }
    });
  };

  function Wg(a, b) {
    if (!a) throw new M("missing-verification-id");
    if (!b) throw new M("missing-verification-code");
    return new Pg({
      Va: a,
      Ua: b
    });
  }

  L(Ug, {
    PROVIDER_ID: "phone"
  });
  L(Ug, {
    PHONE_SIGN_IN_METHOD: "phone"
  });

  function Xg(a) {
    if (a.temporaryProof && a.phoneNumber) return new Pg({
      Ha: a.temporaryProof,
      ba: a.phoneNumber
    });
    var b = a && a.providerId;
    if (!b || "password" === b) return null;
    var c = a && a.oauthAccessToken,
        d = a && a.oauthTokenSecret,
        e = a && a.nonce,
        f = a && a.oauthIdToken,
        g = a && a.pendingToken;

    try {
      switch (b) {
        case "google.com":
          return Dg(f, c);

        case "facebook.com":
          return zg(c);

        case "github.com":
          return Bg(c);

        case "twitter.com":
          return Fg(c, d);

        default:
          return c || d || f || g ? g ? 0 == b.indexOf("saml.") ? new ng(b, g) : new tg(b, {
            pendingToken: g,
            idToken: a.oauthIdToken,
            accessToken: a.oauthAccessToken
          }, b) : new O(b).credential({
            idToken: f,
            accessToken: c,
            rawNonce: e
          }) : null;
      }
    } catch (h) {
      return null;
    }
  }

  function Yg(a) {
    if (!a.isOAuthProvider) throw new M("invalid-oauth-provider");
  }

  ;

  function Zg(a, b, c, d, e, f, g) {
    this.c = a;
    this.b = b || null;
    this.g = c || null;
    this.f = d || null;
    this.i = f || null;
    this.h = g || null;
    this.a = e || null;

    if (this.g || this.a) {
      if (this.g && this.a) throw new M("invalid-auth-event");
      if (this.g && !this.f) throw new M("invalid-auth-event");
    } else throw new M("invalid-auth-event");
  }

  Zg.prototype.getUid = function () {
    var a = [];
    a.push(this.c);
    this.b && a.push(this.b);
    this.f && a.push(this.f);
    this.h && a.push(this.h);
    return a.join("-");
  };

  Zg.prototype.R = function () {
    return this.h;
  };

  Zg.prototype.A = function () {
    return {
      type: this.c,
      eventId: this.b,
      urlResponse: this.g,
      sessionId: this.f,
      postBody: this.i,
      tenantId: this.h,
      error: this.a && this.a.A()
    };
  };

  function $g(a) {
    a = a || {};
    return a.type ? new Zg(a.type, a.eventId, a.urlResponse, a.sessionId, a.error && qf(a.error), a.postBody, a.tenantId) : null;
  }

  ;
  /*
  Copyright 2018 Google Inc.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */

  function ah() {
    this.b = null;
    this.a = [];
  }

  var bh = null;

  function ch(a) {
    var b = bh;
    b.a.push(a);
    b.b || (b.b = function (c) {
      for (var d = 0; d < b.a.length; d++) b.a[d](c);
    }, a = J("universalLinks.subscribe", l), "function" === typeof a && a(null, b.b));
  }

  ;

  function dh(a) {
    var b = "unauthorized-domain",
        c = void 0,
        d = Md(a);
    a = d.b;
    d = d.f;
    "chrome-extension" == d ? c = Ib("This chrome extension ID (chrome-extension://%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", a) : "http" == d || "https" == d ? c = Ib("This domain (%s) is not authorized to run this operation. Add it to the OAuth redirect domains list in the Firebase console -> Auth section -> Sign in method tab.", a) : b = "operation-not-supported-in-this-environment";
    M.call(this, b, c);
  }

  v(dh, M);

  function eh(a, b, c) {
    M.call(this, a, c);
    a = b || {};
    a.Ab && K(this, "email", a.Ab);
    a.ba && K(this, "phoneNumber", a.ba);
    a.credential && K(this, "credential", a.credential);
    a.Qb && K(this, "tenantId", a.Qb);
  }

  v(eh, M);

  eh.prototype.A = function () {
    var a = {
      code: this.code,
      message: this.message
    };
    this.email && (a.email = this.email);
    this.phoneNumber && (a.phoneNumber = this.phoneNumber);
    this.tenantId && (a.tenantId = this.tenantId);
    var b = this.credential && this.credential.A();
    b && Xa(a, b);
    return a;
  };

  eh.prototype.toJSON = function () {
    return this.A();
  };

  function fh(a) {
    if (a.code) {
      var b = a.code || "";
      0 == b.indexOf(of) && (b = b.substring(of.length));
      var c = {
        credential: Xg(a),
        Qb: a.tenantId
      };
      if (a.email) c.Ab = a.email;else if (a.phoneNumber) c.ba = a.phoneNumber;else if (!c.credential) return new M(b, a.message || void 0);
      return new eh(b, c, a.message);
    }

    return null;
  }

  ;

  function gh() {}

  gh.prototype.c = null;

  function hh(a) {
    return a.c || (a.c = a.b());
  }

  ;
  var ih;

  function jh() {}

  v(jh, gh);

  jh.prototype.a = function () {
    var a = kh(this);
    return a ? new ActiveXObject(a) : new XMLHttpRequest();
  };

  jh.prototype.b = function () {
    var a = {};
    kh(this) && (a[0] = !0, a[1] = !0);
    return a;
  };

  function kh(a) {
    if (!a.f && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
      for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
        var d = b[c];

        try {
          return new ActiveXObject(d), a.f = d;
        } catch (e) {}
      }

      throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
    }

    return a.f;
  }

  ih = new jh();

  function lh() {}

  v(lh, gh);

  lh.prototype.a = function () {
    var a = new XMLHttpRequest();
    if ("withCredentials" in a) return a;
    if ("undefined" != typeof XDomainRequest) return new mh();
    throw Error("Unsupported browser");
  };

  lh.prototype.b = function () {
    return {};
  };

  function mh() {
    this.a = new XDomainRequest();
    this.readyState = 0;
    this.onreadystatechange = null;
    this.responseType = this.responseText = this.response = "";
    this.status = -1;
    this.statusText = "";
    this.a.onload = t(this.fc, this);
    this.a.onerror = t(this.Ib, this);
    this.a.onprogress = t(this.gc, this);
    this.a.ontimeout = t(this.kc, this);
  }

  k = mh.prototype;

  k.open = function (a, b, c) {
    if (null != c && !c) throw Error("Only async requests are supported.");
    this.a.open(a, b);
  };

  k.send = function (a) {
    if (a) {
      if ("string" == typeof a) this.a.send(a);else throw Error("Only string data is supported");
    } else this.a.send();
  };

  k.abort = function () {
    this.a.abort();
  };

  k.setRequestHeader = function () {};

  k.getResponseHeader = function (a) {
    return "content-type" == a.toLowerCase() ? this.a.contentType : "";
  };

  k.fc = function () {
    this.status = 200;
    this.response = this.responseText = this.a.responseText;
    nh(this, 4);
  };

  k.Ib = function () {
    this.status = 500;
    this.response = this.responseText = "";
    nh(this, 4);
  };

  k.kc = function () {
    this.Ib();
  };

  k.gc = function () {
    this.status = 200;
    nh(this, 1);
  };

  function nh(a, b) {
    a.readyState = b;
    if (a.onreadystatechange) a.onreadystatechange();
  }

  k.getAllResponseHeaders = function () {
    return "content-type: " + this.a.contentType;
  };

  function oh(a, b, c) {
    this.reset(a, b, c, void 0, void 0);
  }

  oh.prototype.a = null;
  var ph = 0;

  oh.prototype.reset = function (a, b, c, d, e) {
    "number" == typeof e || ph++;
    d || va();
    delete this.a;
  };

  function qh(a) {
    this.f = a;
    this.b = this.c = this.a = null;
  }

  function rh(a, b) {
    this.name = a;
    this.value = b;
  }

  rh.prototype.toString = function () {
    return this.name;
  };

  var sh = new rh("SEVERE", 1E3),
      th = new rh("WARNING", 900),
      uh = new rh("CONFIG", 700),
      vh = new rh("FINE", 500);

  function wh(a) {
    if (a.c) return a.c;
    if (a.a) return wh(a.a);
    za("Root logger has no level set.");
    return null;
  }

  qh.prototype.log = function (a, b, c) {
    if (a.value >= wh(this).value) for (q(b) && (b = b()), a = new oh(a, String(b), this.f), c && (a.a = c), c = this; c;) c = c.a;
  };

  var xh = {},
      yh = null;

  function zh(a) {
    yh || (yh = new qh(""), xh[""] = yh, yh.c = uh);
    var b;

    if (!(b = xh[a])) {
      b = new qh(a);
      var c = a.lastIndexOf("."),
          d = a.substr(c + 1);
      c = zh(a.substr(0, c));
      c.b || (c.b = {});
      c.b[d] = b;
      b.a = c;
      xh[a] = b;
    }

    return b;
  }

  ;

  function Ah(a, b) {
    a && a.log(vh, b, void 0);
  }

  ;

  function Bh(a) {
    this.f = a;
  }

  v(Bh, gh);

  Bh.prototype.a = function () {
    return new Ch(this.f);
  };

  Bh.prototype.b = function (a) {
    return function () {
      return a;
    };
  }({});

  function Ch(a) {
    G.call(this);
    this.o = a;
    this.readyState = Dh;
    this.status = 0;
    this.responseType = this.responseText = this.response = this.statusText = "";
    this.onreadystatechange = null;
    this.i = new Headers();
    this.b = null;
    this.m = "GET";
    this.g = "";
    this.a = !1;
    this.h = zh("goog.net.FetchXmlHttp");
    this.l = this.c = this.f = null;
  }

  v(Ch, G);
  var Dh = 0;
  k = Ch.prototype;

  k.open = function (a, b) {
    if (this.readyState != Dh) throw this.abort(), Error("Error reopening a connection");
    this.m = a;
    this.g = b;
    this.readyState = 1;
    Eh(this);
  };

  k.send = function (a) {
    if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
    this.a = !0;
    var b = {
      headers: this.i,
      method: this.m,
      credentials: void 0,
      cache: void 0
    };
    a && (b.body = a);
    this.o.fetch(new Request(this.g, b)).then(this.jc.bind(this), this.Oa.bind(this));
  };

  k.abort = function () {
    this.response = this.responseText = "";
    this.i = new Headers();
    this.status = 0;
    this.c && this.c.cancel("Request was aborted.");
    1 <= this.readyState && this.a && 4 != this.readyState && (this.a = !1, Fh(this, !1));
    this.readyState = Dh;
  };

  k.jc = function (a) {
    this.a && (this.f = a, this.b || (this.b = a.headers, this.readyState = 2, Eh(this)), this.a && (this.readyState = 3, Eh(this), this.a && ("arraybuffer" === this.responseType ? a.arrayBuffer().then(this.hc.bind(this), this.Oa.bind(this)) : "undefined" !== typeof l.ReadableStream && "body" in a ? (this.response = this.responseText = "", this.c = a.body.getReader(), this.l = new TextDecoder(), Gh(this)) : a.text().then(this.ic.bind(this), this.Oa.bind(this)))));
  };

  function Gh(a) {
    a.c.read().then(a.ec.bind(a)).catch(a.Oa.bind(a));
  }

  k.ec = function (a) {
    if (this.a) {
      var b = this.l.decode(a.value ? a.value : new Uint8Array(0), {
        stream: !a.done
      });
      b && (this.response = this.responseText += b);
      a.done ? Fh(this, !0) : Eh(this);
      3 == this.readyState && Gh(this);
    }
  };

  k.ic = function (a) {
    this.a && (this.response = this.responseText = a, Fh(this, !0));
  };

  k.hc = function (a) {
    this.a && (this.response = a, Fh(this, !0));
  };

  k.Oa = function (a) {
    var b = this.h;
    b && b.log(th, "Failed to fetch url " + this.g, a instanceof Error ? a : Error(a));
    this.a && Fh(this, !0);
  };

  function Fh(a, b) {
    b && a.f && (a.status = a.f.status, a.statusText = a.f.statusText);
    a.readyState = 4;
    a.f = null;
    a.c = null;
    a.l = null;
    Eh(a);
  }

  k.setRequestHeader = function (a, b) {
    this.i.append(a, b);
  };

  k.getResponseHeader = function (a) {
    return this.b ? this.b.get(a.toLowerCase()) || "" : ((a = this.h) && a.log(th, "Attempting to get response header but no headers have been received for url: " + this.g, void 0), "");
  };

  k.getAllResponseHeaders = function () {
    if (!this.b) {
      var a = this.h;
      a && a.log(th, "Attempting to get all response headers but no headers have been received for url: " + this.g, void 0);
      return "";
    }

    a = [];

    for (var b = this.b.entries(), c = b.next(); !c.done;) c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();

    return a.join("\r\n");
  };

  function Eh(a) {
    a.onreadystatechange && a.onreadystatechange.call(a);
  }

  ;

  function Hh(a) {
    G.call(this);
    this.headers = new sd();
    this.B = a || null;
    this.c = !1;
    this.w = this.a = null;
    this.h = this.O = this.l = "";
    this.f = this.J = this.i = this.I = !1;
    this.g = 0;
    this.o = null;
    this.m = Ih;
    this.v = this.P = !1;
  }

  v(Hh, G);
  var Ih = "";
  Hh.prototype.b = zh("goog.net.XhrIo");
  var Jh = /^https?$/i,
      Kh = ["POST", "PUT"];

  function Lh(a, b, c, d, e) {
    if (a.a) throw Error("[goog.net.XhrIo] Object is active with another request=" + a.l + "; newUri=" + b);
    c = c ? c.toUpperCase() : "GET";
    a.l = b;
    a.h = "";
    a.O = c;
    a.I = !1;
    a.c = !0;
    a.a = a.B ? a.B.a() : ih.a();
    a.w = a.B ? hh(a.B) : hh(ih);
    a.a.onreadystatechange = t(a.Lb, a);

    try {
      Ah(a.b, Mh(a, "Opening Xhr")), a.J = !0, a.a.open(c, String(b), !0), a.J = !1;
    } catch (g) {
      Ah(a.b, Mh(a, "Error opening Xhr: " + g.message));
      Nh(a, g);
      return;
    }

    b = d || "";
    var f = new sd(a.headers);
    e && rd(e, function (g, h) {
      f.set(h, g);
    });
    e = Ma(f.X());
    d = l.FormData && b instanceof l.FormData;
    !Oa(Kh, c) || e || d || f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    f.forEach(function (g, h) {
      this.a.setRequestHeader(h, g);
    }, a);
    a.m && (a.a.responseType = a.m);
    "withCredentials" in a.a && a.a.withCredentials !== a.P && (a.a.withCredentials = a.P);

    try {
      Oh(a), 0 < a.g && (a.v = Ph(a.a), Ah(a.b, Mh(a, "Will abort after " + a.g + "ms if incomplete, xhr2 " + a.v)), a.v ? (a.a.timeout = a.g, a.a.ontimeout = t(a.Ia, a)) : a.o = nd(a.Ia, a.g, a)), Ah(a.b, Mh(a, "Sending request")), a.i = !0, a.a.send(b), a.i = !1;
    } catch (g) {
      Ah(a.b, Mh(a, "Send error: " + g.message)), Nh(a, g);
    }
  }

  function Ph(a) {
    return vc && Fc(9) && "number" == typeof a.timeout && void 0 !== a.ontimeout;
  }

  function Na(a) {
    return "content-type" == a.toLowerCase();
  }

  k = Hh.prototype;

  k.Ia = function () {
    "undefined" != typeof ha && this.a && (this.h = "Timed out after " + this.g + "ms, aborting", Ah(this.b, Mh(this, this.h)), this.dispatchEvent("timeout"), this.abort(8));
  };

  function Nh(a, b) {
    a.c = !1;
    a.a && (a.f = !0, a.a.abort(), a.f = !1);
    a.h = b;
    Qh(a);
    Rh(a);
  }

  function Qh(a) {
    a.I || (a.I = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"));
  }

  k.abort = function () {
    this.a && this.c && (Ah(this.b, Mh(this, "Aborting")), this.c = !1, this.f = !0, this.a.abort(), this.f = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Rh(this));
  };

  k.za = function () {
    this.a && (this.c && (this.c = !1, this.f = !0, this.a.abort(), this.f = !1), Rh(this, !0));
    Hh.qb.za.call(this);
  };

  k.Lb = function () {
    this.va || (this.J || this.i || this.f ? Sh(this) : this.yc());
  };

  k.yc = function () {
    Sh(this);
  };

  function Sh(a) {
    if (a.c && "undefined" != typeof ha) if (a.w[1] && 4 == Th(a) && 2 == Uh(a)) Ah(a.b, Mh(a, "Local request error detected and ignored"));else if (a.i && 4 == Th(a)) nd(a.Lb, 0, a);else if (a.dispatchEvent("readystatechange"), 4 == Th(a)) {
      Ah(a.b, Mh(a, "Request complete"));
      a.c = !1;

      try {
        var b = Uh(a);

        a: switch (b) {
          case 200:
          case 201:
          case 202:
          case 204:
          case 206:
          case 304:
          case 1223:
            var c = !0;
            break a;

          default:
            c = !1;
        }

        var d;

        if (!(d = c)) {
          var e;

          if (e = 0 === b) {
            var f = String(a.l).match(vd)[1] || null;

            if (!f && l.self && l.self.location) {
              var g = l.self.location.protocol;
              f = g.substr(0, g.length - 1);
            }

            e = !Jh.test(f ? f.toLowerCase() : "");
          }

          d = e;
        }

        if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");else {
          try {
            var h = 2 < Th(a) ? a.a.statusText : "";
          } catch (m) {
            Ah(a.b, "Can not get status: " + m.message), h = "";
          }

          a.h = h + " [" + Uh(a) + "]";
          Qh(a);
        }
      } finally {
        Rh(a);
      }
    }
  }

  function Rh(a, b) {
    if (a.a) {
      Oh(a);
      var c = a.a,
          d = a.w[0] ? la : null;
      a.a = null;
      a.w = null;
      b || a.dispatchEvent("ready");

      try {
        c.onreadystatechange = d;
      } catch (e) {
        (a = a.b) && a.log(sh, "Problem encountered resetting onreadystatechange: " + e.message, void 0);
      }
    }
  }

  function Oh(a) {
    a.a && a.v && (a.a.ontimeout = null);
    a.o && (l.clearTimeout(a.o), a.o = null);
  }

  function Th(a) {
    return a.a ? a.a.readyState : 0;
  }

  function Uh(a) {
    try {
      return 2 < Th(a) ? a.a.status : -1;
    } catch (b) {
      return -1;
    }
  }

  function Vh(a) {
    try {
      return a.a ? a.a.responseText : "";
    } catch (b) {
      return Ah(a.b, "Can not get responseText: " + b.message), "";
    }
  }

  k.getResponse = function () {
    try {
      if (!this.a) return null;
      if ("response" in this.a) return this.a.response;

      switch (this.m) {
        case Ih:
        case "text":
          return this.a.responseText;

        case "arraybuffer":
          if ("mozResponseArrayBuffer" in this.a) return this.a.mozResponseArrayBuffer;
      }

      var a = this.b;
      a && a.log(sh, "Response type " + this.m + " is not supported on this browser", void 0);
      return null;
    } catch (b) {
      return Ah(this.b, "Can not get response: " + b.message), null;
    }
  };

  function Mh(a, b) {
    return b + " [" + a.O + " " + a.l + " " + Uh(a) + "]";
  }

  ;
  /*
  Portions of this code are from MochiKit, received by
  The Closure Authors under the MIT license. All other code is Copyright
  2005-2009 The Closure Authors. All Rights Reserved.
  */

  function Wh(a) {
    var b = Xh;
    this.g = [];
    this.v = b;
    this.o = a || null;
    this.f = this.a = !1;
    this.c = void 0;
    this.u = this.w = this.i = !1;
    this.h = 0;
    this.b = null;
    this.l = 0;
  }

  Wh.prototype.cancel = function (a) {
    if (this.a) this.c instanceof Wh && this.c.cancel();else {
      if (this.b) {
        var b = this.b;
        delete this.b;
        a ? b.cancel(a) : (b.l--, 0 >= b.l && b.cancel());
      }

      this.v ? this.v.call(this.o, this) : this.u = !0;
      this.a || (a = new Yh(this), Zh(this), $h(this, !1, a));
    }
  };

  Wh.prototype.m = function (a, b) {
    this.i = !1;
    $h(this, a, b);
  };

  function $h(a, b, c) {
    a.a = !0;
    a.c = c;
    a.f = !b;
    ai(a);
  }

  function Zh(a) {
    if (a.a) {
      if (!a.u) throw new bi(a);
      a.u = !1;
    }
  }

  function ci(a, b) {
    di(a, null, b, void 0);
  }

  function di(a, b, c, d) {
    a.g.push([b, c, d]);
    a.a && ai(a);
  }

  Wh.prototype.then = function (a, b, c) {
    var d,
        e,
        f = new B(function (g, h) {
      d = g;
      e = h;
    });
    di(this, d, function (g) {
      g instanceof Yh ? f.cancel() : e(g);
    });
    return f.then(a, b, c);
  };

  Wh.prototype.$goog_Thenable = !0;

  function ei(a) {
    return La(a.g, function (b) {
      return q(b[1]);
    });
  }

  function ai(a) {
    if (a.h && a.a && ei(a)) {
      var b = a.h,
          c = fi[b];
      c && (l.clearTimeout(c.a), delete fi[b]);
      a.h = 0;
    }

    a.b && (a.b.l--, delete a.b);
    b = a.c;

    for (var d = c = !1; a.g.length && !a.i;) {
      var e = a.g.shift(),
          f = e[0],
          g = e[1];
      e = e[2];
      if (f = a.f ? g : f) try {
        var h = f.call(e || a.o, b);
        void 0 !== h && (a.f = a.f && (h == b || h instanceof Error), a.c = b = h);
        if (xa(b) || "function" === typeof l.Promise && b instanceof l.Promise) d = !0, a.i = !0;
      } catch (m) {
        b = m, a.f = !0, ei(a) || (c = !0);
      }
    }

    a.c = b;
    d && (h = t(a.m, a, !0), d = t(a.m, a, !1), b instanceof Wh ? (di(b, h, d), b.w = !0) : b.then(h, d));
    c && (b = new gi(b), fi[b.a] = b, a.h = b.a);
  }

  function bi() {
    w.call(this);
  }

  v(bi, w);
  bi.prototype.message = "Deferred has already fired";
  bi.prototype.name = "AlreadyCalledError";

  function Yh() {
    w.call(this);
  }

  v(Yh, w);
  Yh.prototype.message = "Deferred was canceled";
  Yh.prototype.name = "CanceledError";

  function gi(a) {
    this.a = l.setTimeout(t(this.c, this), 0);
    this.b = a;
  }

  gi.prototype.c = function () {
    delete fi[this.a];
    throw this.b;
  };

  var fi = {};

  function hi(a) {
    var b = {},
        c = b.document || document,
        d = eb(a).toString(),
        e = document.createElement("SCRIPT"),
        f = {
      Nb: e,
      Ia: void 0
    },
        g = new Wh(f),
        h = null,
        m = null != b.timeout ? b.timeout : 5E3;
    0 < m && (h = window.setTimeout(function () {
      ii(e, !0);
      var p = new ji(ki, "Timeout reached for loading script " + d);
      Zh(g);
      $h(g, !1, p);
    }, m), f.Ia = h);

    e.onload = e.onreadystatechange = function () {
      e.readyState && "loaded" != e.readyState && "complete" != e.readyState || (ii(e, b.gd || !1, h), Zh(g), $h(g, !0, null));
    };

    e.onerror = function () {
      ii(e, !0, h);
      var p = new ji(li, "Error while loading script " + d);
      Zh(g);
      $h(g, !1, p);
    };

    f = b.attributes || {};
    Xa(f, {
      type: "text/javascript",
      charset: "UTF-8"
    });
    Xd(e, f);
    Hb(e, a);
    mi(c).appendChild(e);
    return g;
  }

  function mi(a) {
    var b;
    return (b = (a || document).getElementsByTagName("HEAD")) && 0 != b.length ? b[0] : a.documentElement;
  }

  function Xh() {
    if (this && this.Nb) {
      var a = this.Nb;
      a && "SCRIPT" == a.tagName && ii(a, !0, this.Ia);
    }
  }

  function ii(a, b, c) {
    null != c && l.clearTimeout(c);
    a.onload = la;
    a.onerror = la;
    a.onreadystatechange = la;
    b && window.setTimeout(function () {
      a && a.parentNode && a.parentNode.removeChild(a);
    }, 0);
  }

  var li = 0,
      ki = 1;

  function ji(a, b) {
    var c = "Jsloader error (code #" + a + ")";
    b && (c += ": " + b);
    w.call(this, c);
    this.code = a;
  }

  v(ji, w);

  function ni(a) {
    this.f = a;
  }

  v(ni, gh);

  ni.prototype.a = function () {
    return new this.f();
  };

  ni.prototype.b = function () {
    return {};
  };

  function oi(a, b, c) {
    this.c = a;
    a = b || {};
    this.l = a.secureTokenEndpoint || "https://securetoken.googleapis.com/v1/token";
    this.u = a.secureTokenTimeout || pi;
    this.g = Va(a.secureTokenHeaders || qi);
    this.h = a.firebaseEndpoint || "https://www.googleapis.com/identitytoolkit/v3/relyingparty/";
    this.i = a.firebaseTimeout || ri;
    this.a = Va(a.firebaseHeaders || si);
    c && (this.a["X-Client-Version"] = c, this.g["X-Client-Version"] = c);
    c = "Node" == Be();
    c = l.XMLHttpRequest || c && _app.default.INTERNAL.node && _app.default.INTERNAL.node.XMLHttpRequest;
    if (!c && !Ae()) throw new M("internal-error", "The XMLHttpRequest compatibility library was not found.");
    this.f = void 0;
    Ae() ? this.f = new Bh(self) : Ce() ? this.f = new ni(c) : this.f = new lh();
    this.b = null;
  }

  var ti,
      mg = "idToken",
      pi = new Qe(3E4, 6E4),
      qi = {
    "Content-Type": "application/x-www-form-urlencoded"
  },
      ri = new Qe(3E4, 6E4),
      si = {
    "Content-Type": "application/json"
  };

  function ui(a, b) {
    b ? a.a["X-Firebase-Locale"] = b : delete a.a["X-Firebase-Locale"];
  }

  function vi(a, b) {
    b ? (a.a["X-Client-Version"] = b, a.g["X-Client-Version"] = b) : (delete a.a["X-Client-Version"], delete a.g["X-Client-Version"]);
  }

  oi.prototype.R = function () {
    return this.b;
  };

  function wi(a, b, c, d, e, f, g) {
    le() || Ae() ? a = t(a.o, a) : (ti || (ti = new B(function (h, m) {
      xi(h, m);
    })), a = t(a.m, a));
    a(b, c, d, e, f, g);
  }

  oi.prototype.o = function (a, b, c, d, e, f) {
    if (Ae() && ("undefined" === typeof l.fetch || "undefined" === typeof l.Headers || "undefined" === typeof l.Request)) throw new M("operation-not-supported-in-this-environment", "fetch, Headers and Request native APIs or equivalent Polyfills must be available to support HTTP requests from a Worker environment.");
    var g = new Hh(this.f);

    if (f) {
      g.g = Math.max(0, f);
      var h = setTimeout(function () {
        g.dispatchEvent("timeout");
      }, f);
    }

    $c(g, "complete", function () {
      h && clearTimeout(h);
      var m = null;

      try {
        m = JSON.parse(Vh(this)) || null;
      } catch (p) {
        m = null;
      }

      b && b(m);
    });
    fd(g, "ready", function () {
      h && clearTimeout(h);
      qc(this);
    });
    fd(g, "timeout", function () {
      h && clearTimeout(h);
      qc(this);
      b && b(null);
    });
    Lh(g, a, c, d, e);
  };

  var yi = new Ya(Za, "https://apis.google.com/js/client.js?onload=%{onload}"),
      zi = "__fcb" + Math.floor(1E6 * Math.random()).toString();

  function xi(a, b) {
    if (((window.gapi || {}).client || {}).request) a();else {
      l[zi] = function () {
        ((window.gapi || {}).client || {}).request ? a() : b(Error("CORS_UNSUPPORTED"));
      };

      var c = fb(yi, {
        onload: zi
      });
      ci(hi(c), function () {
        b(Error("CORS_UNSUPPORTED"));
      });
    }
  }

  oi.prototype.m = function (a, b, c, d, e) {
    var f = this;
    ti.then(function () {
      window.gapi.client.setApiKey(f.c);
      var g = window.gapi.auth.getToken();
      window.gapi.auth.setToken(null);
      window.gapi.client.request({
        path: a,
        method: c,
        body: d,
        headers: e,
        authType: "none",
        callback: function (h) {
          window.gapi.auth.setToken(g);
          b && b(h);
        }
      });
    }).s(function (g) {
      b && b({
        error: {
          message: g && g.message || "CORS_UNSUPPORTED"
        }
      });
    });
  };

  function Ai(a, b) {
    return new B(function (c, d) {
      "refresh_token" == b.grant_type && b.refresh_token || "authorization_code" == b.grant_type && b.code ? wi(a, a.l + "?key=" + encodeURIComponent(a.c), function (e) {
        e ? e.error ? d(Bi(e)) : e.access_token && e.refresh_token ? c(e) : d(new M("internal-error")) : d(new M("network-request-failed"));
      }, "POST", Qd(b).toString(), a.g, a.u.get()) : d(new M("internal-error"));
    });
  }

  function Ci(a, b, c, d, e, f) {
    var g = Md(a.h + b);
    H(g, "key", a.c);
    f && H(g, "cb", va().toString());
    var h = "GET" == c;
    if (h) for (var m in d) d.hasOwnProperty(m) && H(g, m, d[m]);
    return new B(function (p, u) {
      wi(a, g.toString(), function (A) {
        A ? A.error ? u(Bi(A, e || {})) : p(A) : u(new M("network-request-failed"));
      }, c, h ? void 0 : be(Me(d)), a.a, a.i.get());
    });
  }

  function Di(a) {
    a = a.email;
    if (!n(a) || !ue.test(a)) throw new M("invalid-email");
  }

  function Ei(a) {
    "email" in a && Di(a);
  }

  function Fi(a, b) {
    return P(a, Gi, {
      identifier: b,
      continueUri: Je() ? ie() : "http://localhost"
    }).then(function (c) {
      return c.signinMethods || [];
    });
  }

  function Hi(a) {
    return P(a, Ii, {}).then(function (b) {
      return b.authorizedDomains || [];
    });
  }

  function Ji(a) {
    if (!a[mg]) throw new M("internal-error");
  }

  function Ki(a) {
    if (a.phoneNumber || a.temporaryProof) {
      if (!a.phoneNumber || !a.temporaryProof) throw new M("internal-error");
    } else {
      if (!a.sessionInfo) throw new M("missing-verification-id");
      if (!a.code) throw new M("missing-verification-code");
    }
  }

  oi.prototype.ob = function () {
    return P(this, Li, {});
  };

  oi.prototype.rb = function (a, b) {
    return P(this, Mi, {
      idToken: a,
      email: b
    });
  };

  oi.prototype.sb = function (a, b) {
    return P(this, Lg, {
      idToken: a,
      password: b
    });
  };

  var Ni = {
    displayName: "DISPLAY_NAME",
    photoUrl: "PHOTO_URL"
  };
  k = oi.prototype;

  k.tb = function (a, b) {
    var c = {
      idToken: a
    },
        d = [];
    Ta(Ni, function (e, f) {
      var g = b[f];
      null === g ? d.push(e) : f in b && (c[f] = g);
    });
    d.length && (c.deleteAttribute = d);
    return P(this, Mi, c);
  };

  k.kb = function (a, b) {
    a = {
      requestType: "PASSWORD_RESET",
      email: a
    };
    Xa(a, b);
    return P(this, Oi, a);
  };

  k.lb = function (a, b) {
    a = {
      requestType: "EMAIL_SIGNIN",
      email: a
    };
    Xa(a, b);
    return P(this, Pi, a);
  };

  k.jb = function (a, b) {
    a = {
      requestType: "VERIFY_EMAIL",
      idToken: a
    };
    Xa(a, b);
    return P(this, Qi, a);
  };

  function Vg(a, b) {
    return P(a, Ri, b);
  }

  k.Wa = function (a) {
    return P(this, Si, a);
  };

  function Ti(a, b, c) {
    return P(a, Ui, {
      idToken: b,
      deleteProvider: c
    });
  }

  function Vi(a) {
    if (!a.requestUri || !a.sessionId && !a.postBody && !a.pendingToken) throw new M("internal-error");
  }

  function Wi(a, b) {
    b.oauthIdToken && b.providerId && 0 == b.providerId.indexOf("oidc.") && !b.pendingToken && (a.sessionId ? b.nonce = a.sessionId : a.postBody && (a = new Dd(a.postBody), Ud(a, "nonce") && (b.nonce = a.get("nonce"))));
    return b;
  }

  function Xi(a) {
    var b = null;
    a.needConfirmation ? (a.code = "account-exists-with-different-credential", b = fh(a)) : "FEDERATED_USER_ID_ALREADY_LINKED" == a.errorMessage ? (a.code = "credential-already-in-use", b = fh(a)) : "EMAIL_EXISTS" == a.errorMessage ? (a.code = "email-already-in-use", b = fh(a)) : a.errorMessage && (b = Yi(a.errorMessage));
    if (b) throw b;
    if (!a[mg]) throw new M("internal-error");
  }

  function og(a, b) {
    b.returnIdpCredential = !0;
    return P(a, Zi, b);
  }

  function qg(a, b) {
    b.returnIdpCredential = !0;
    return P(a, $i, b);
  }

  function rg(a, b) {
    b.returnIdpCredential = !0;
    b.autoCreate = !1;
    return P(a, aj, b);
  }

  function bj(a) {
    if (!a.oobCode) throw new M("invalid-action-code");
  }

  k.ab = function (a, b) {
    return P(this, cj, {
      oobCode: a,
      newPassword: b
    });
  };

  k.Ma = function (a) {
    return P(this, dj, {
      oobCode: a
    });
  };

  k.Ya = function (a) {
    return P(this, ej, {
      oobCode: a
    });
  };

  var ej = {
    endpoint: "setAccountInfo",
    D: bj,
    fa: "email",
    F: !0
  },
      dj = {
    endpoint: "resetPassword",
    D: bj,
    K: function (a) {
      var b = a.requestType;
      if (!b || !a.email && "EMAIL_SIGNIN" != b) throw new M("internal-error");
    },
    F: !0
  },
      fj = {
    endpoint: "signupNewUser",
    D: function (a) {
      Di(a);
      if (!a.password) throw new M("weak-password");
    },
    K: Ji,
    T: !0,
    F: !0
  },
      Gi = {
    endpoint: "createAuthUri",
    F: !0
  },
      gj = {
    endpoint: "deleteAccount",
    V: ["idToken"]
  },
      Ui = {
    endpoint: "setAccountInfo",
    V: ["idToken", "deleteProvider"],
    D: function (a) {
      if (!oa(a.deleteProvider)) throw new M("internal-error");
    }
  },
      Ig = {
    endpoint: "emailLinkSignin",
    V: ["email", "oobCode"],
    D: Di,
    K: Ji,
    T: !0,
    F: !0
  },
      Kg = {
    endpoint: "emailLinkSignin",
    V: ["idToken", "email", "oobCode"],
    D: Di,
    K: Ji,
    T: !0
  },
      hj = {
    endpoint: "getAccountInfo"
  },
      Pi = {
    endpoint: "getOobConfirmationCode",
    V: ["requestType"],
    D: function (a) {
      if ("EMAIL_SIGNIN" != a.requestType) throw new M("internal-error");
      Di(a);
    },
    fa: "email",
    F: !0
  },
      Qi = {
    endpoint: "getOobConfirmationCode",
    V: ["idToken", "requestType"],
    D: function (a) {
      if ("VERIFY_EMAIL" != a.requestType) throw new M("internal-error");
    },
    fa: "email",
    F: !0
  },
      Oi = {
    endpoint: "getOobConfirmationCode",
    V: ["requestType"],
    D: function (a) {
      if ("PASSWORD_RESET" != a.requestType) throw new M("internal-error");
      Di(a);
    },
    fa: "email",
    F: !0
  },
      Ii = {
    wb: !0,
    endpoint: "getProjectConfig",
    Kb: "GET"
  },
      ij = {
    wb: !0,
    endpoint: "getRecaptchaParam",
    Kb: "GET",
    K: function (a) {
      if (!a.recaptchaSiteKey) throw new M("internal-error");
    }
  },
      cj = {
    endpoint: "resetPassword",
    D: bj,
    fa: "email",
    F: !0
  },
      Ri = {
    endpoint: "sendVerificationCode",
    V: ["phoneNumber", "recaptchaToken"],
    fa: "sessionInfo",
    F: !0
  },
      Mi = {
    endpoint: "setAccountInfo",
    V: ["idToken"],
    D: Ei,
    T: !0
  },
      Lg = {
    endpoint: "setAccountInfo",
    V: ["idToken"],
    D: function (a) {
      Ei(a);
      if (!a.password) throw new M("weak-password");
    },
    K: Ji,
    T: !0
  },
      Li = {
    endpoint: "signupNewUser",
    K: Ji,
    T: !0,
    F: !0
  },
      Zi = {
    endpoint: "verifyAssertion",
    D: Vi,
    Ra: Wi,
    K: Xi,
    T: !0,
    F: !0
  },
      aj = {
    endpoint: "verifyAssertion",
    D: Vi,
    Ra: Wi,
    K: function (a) {
      if (a.errorMessage && "USER_NOT_FOUND" == a.errorMessage) throw new M("user-not-found");
      if (a.errorMessage) throw Yi(a.errorMessage);
      if (!a[mg]) throw new M("internal-error");
    },
    T: !0,
    F: !0
  },
      $i = {
    endpoint: "verifyAssertion",
    D: function (a) {
      Vi(a);
      if (!a.idToken) throw new M("internal-error");
    },
    Ra: Wi,
    K: Xi,
    T: !0
  },
      jj = {
    endpoint: "verifyCustomToken",
    D: function (a) {
      if (!a.token) throw new M("invalid-custom-token");
    },
    K: Ji,
    T: !0,
    F: !0
  },
      Jg = {
    endpoint: "verifyPassword",
    D: function (a) {
      Di(a);
      if (!a.password) throw new M("wrong-password");
    },
    K: Ji,
    T: !0,
    F: !0
  },
      Si = {
    endpoint: "verifyPhoneNumber",
    D: Ki,
    K: Ji,
    F: !0
  },
      Rg = {
    endpoint: "verifyPhoneNumber",
    D: function (a) {
      if (!a.idToken) throw new M("internal-error");
      Ki(a);
    },
    K: function (a) {
      if (a.temporaryProof) throw a.code = "credential-already-in-use", fh(a);
      Ji(a);
    }
  },
      Sg = {
    Yb: {
      USER_NOT_FOUND: "user-not-found"
    },
    endpoint: "verifyPhoneNumber",
    D: Ki,
    K: Ji,
    F: !0
  };

  function P(a, b, c) {
    if (!cf(c, b.V)) return E(new M("internal-error"));
    var d = b.Kb || "POST",
        e;
    return D(c).then(b.D).then(function () {
      b.T && (c.returnSecureToken = !0);
      b.F && a.b && "undefined" === typeof c.tenantId && (c.tenantId = a.b);
      return Ci(a, b.endpoint, d, c, b.Yb, b.wb || !1);
    }).then(function (f) {
      e = f;
      return b.Ra ? b.Ra(c, e) : e;
    }).then(b.K).then(function () {
      if (!b.fa) return e;
      if (!(b.fa in e)) throw new M("internal-error");
      return e[b.fa];
    });
  }

  function Yi(a) {
    return Bi({
      error: {
        errors: [{
          message: a
        }],
        code: 400,
        message: a
      }
    });
  }

  function Bi(a, b) {
    var c = (a.error && a.error.errors && a.error.errors[0] || {}).reason || "";
    var d = {
      keyInvalid: "invalid-api-key",
      ipRefererBlocked: "app-not-authorized"
    };
    if (c = d[c] ? new M(d[c]) : null) return c;
    c = a.error && a.error.message || "";
    d = {
      INVALID_CUSTOM_TOKEN: "invalid-custom-token",
      CREDENTIAL_MISMATCH: "custom-token-mismatch",
      MISSING_CUSTOM_TOKEN: "internal-error",
      INVALID_IDENTIFIER: "invalid-email",
      MISSING_CONTINUE_URI: "internal-error",
      INVALID_EMAIL: "invalid-email",
      INVALID_PASSWORD: "wrong-password",
      USER_DISABLED: "user-disabled",
      MISSING_PASSWORD: "internal-error",
      EMAIL_EXISTS: "email-already-in-use",
      PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
      INVALID_IDP_RESPONSE: "invalid-credential",
      INVALID_PENDING_TOKEN: "invalid-credential",
      FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
      MISSING_OR_INVALID_NONCE: "missing-or-invalid-nonce",
      INVALID_MESSAGE_PAYLOAD: "invalid-message-payload",
      INVALID_RECIPIENT_EMAIL: "invalid-recipient-email",
      INVALID_SENDER: "invalid-sender",
      EMAIL_NOT_FOUND: "user-not-found",
      RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
      EXPIRED_OOB_CODE: "expired-action-code",
      INVALID_OOB_CODE: "invalid-action-code",
      MISSING_OOB_CODE: "internal-error",
      INVALID_PROVIDER_ID: "invalid-provider-id",
      CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
      INVALID_ID_TOKEN: "invalid-user-token",
      TOKEN_EXPIRED: "user-token-expired",
      USER_NOT_FOUND: "user-token-expired",
      CORS_UNSUPPORTED: "cors-unsupported",
      DYNAMIC_LINK_NOT_ACTIVATED: "dynamic-link-not-activated",
      INVALID_APP_ID: "invalid-app-id",
      TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
      WEAK_PASSWORD: "weak-password",
      OPERATION_NOT_ALLOWED: "operation-not-allowed",
      USER_CANCELLED: "user-cancelled",
      CAPTCHA_CHECK_FAILED: "captcha-check-failed",
      INVALID_APP_CREDENTIAL: "invalid-app-credential",
      INVALID_CODE: "invalid-verification-code",
      INVALID_PHONE_NUMBER: "invalid-phone-number",
      INVALID_SESSION_INFO: "invalid-verification-id",
      INVALID_TEMPORARY_PROOF: "invalid-credential",
      MISSING_APP_CREDENTIAL: "missing-app-credential",
      MISSING_CODE: "missing-verification-code",
      MISSING_PHONE_NUMBER: "missing-phone-number",
      MISSING_SESSION_INFO: "missing-verification-id",
      QUOTA_EXCEEDED: "quota-exceeded",
      SESSION_EXPIRED: "code-expired",
      REJECTED_CREDENTIAL: "rejected-credential",
      INVALID_CONTINUE_URI: "invalid-continue-uri",
      MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
      MISSING_IOS_BUNDLE_ID: "missing-ios-bundle-id",
      UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
      INVALID_DYNAMIC_LINK_DOMAIN: "invalid-dynamic-link-domain",
      INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
      INVALID_CERT_HASH: "invalid-cert-hash",
      UNSUPPORTED_TENANT_OPERATION: "unsupported-tenant-operation",
      INVALID_TENANT_ID: "invalid-tenant-id",
      TENANT_ID_MISMATCH: "tenant-id-mismatch",
      ADMIN_ONLY_OPERATION: "admin-restricted-operation"
    };
    Xa(d, b || {});
    b = (b = c.match(/^[^\s]+\s*:\s*([\s\S]*)$/)) && 1 < b.length ? b[1] : void 0;

    for (var e in d) if (0 === c.indexOf(e)) return new M(d[e], b);

    !b && a && (b = Le(a));
    return new M("internal-error", b);
  }

  ;

  function kj(a) {
    this.b = a;
    this.a = null;
    this.gb = lj(this);
  }

  function lj(a) {
    return mj().then(function () {
      return new B(function (b, c) {
        J("gapi.iframes.getContext")().open({
          where: document.body,
          url: a.b,
          messageHandlersFilter: J("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"),
          attributes: {
            style: {
              position: "absolute",
              top: "-100px",
              width: "1px",
              height: "1px"
            }
          },
          dontclear: !0
        }, function (d) {
          function e() {
            clearTimeout(f);
            b();
          }

          a.a = d;
          a.a.restyle({
            setHideOnLeave: !1
          });
          var f = setTimeout(function () {
            c(Error("Network Error"));
          }, nj.get());
          d.ping(e).then(e, function () {
            c(Error("Network Error"));
          });
        });
      });
    });
  }

  function oj(a, b) {
    return a.gb.then(function () {
      return new B(function (c) {
        a.a.send(b.type, b, c, J("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"));
      });
    });
  }

  function pj(a, b) {
    a.gb.then(function () {
      a.a.register("authEvent", b, J("gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER"));
    });
  }

  var qj = new Ya(Za, "https://apis.google.com/js/api.js?onload=%{onload}"),
      rj = new Qe(3E4, 6E4),
      nj = new Qe(5E3, 15E3),
      sj = null;

  function mj() {
    return sj ? sj : sj = new B(function (a, b) {
      function c() {
        Pe();
        J("gapi.load")("gapi.iframes", {
          callback: a,
          ontimeout: function () {
            Pe();
            b(Error("Network Error"));
          },
          timeout: rj.get()
        });
      }

      if (J("gapi.iframes.Iframe")) a();else if (J("gapi.load")) c();else {
        var d = "__iframefcb" + Math.floor(1E6 * Math.random()).toString();

        l[d] = function () {
          J("gapi.load") ? c() : b(Error("Network Error"));
        };

        d = fb(qj, {
          onload: d
        });
        D(hi(d)).s(function () {
          b(Error("Network Error"));
        });
      }
    }).s(function (a) {
      sj = null;
      throw a;
    });
  }

  ;

  function tj(a, b, c) {
    this.i = a;
    this.g = b;
    this.h = c;
    this.f = null;
    this.a = Nd(this.i, "/__/auth/iframe");
    H(this.a, "apiKey", this.g);
    H(this.a, "appName", this.h);
    this.b = null;
    this.c = [];
  }

  tj.prototype.toString = function () {
    this.f ? H(this.a, "v", this.f) : Td(this.a.a, "v");
    this.b ? H(this.a, "eid", this.b) : Td(this.a.a, "eid");
    this.c.length ? H(this.a, "fw", this.c.join(",")) : Td(this.a.a, "fw");
    return this.a.toString();
  };

  function uj(a, b, c, d, e) {
    this.o = a;
    this.m = b;
    this.c = c;
    this.u = d;
    this.i = this.g = this.l = null;
    this.a = e;
    this.h = this.f = null;
  }

  uj.prototype.nb = function (a) {
    this.h = a;
    return this;
  };

  uj.prototype.toString = function () {
    var a = Nd(this.o, "/__/auth/handler");
    H(a, "apiKey", this.m);
    H(a, "appName", this.c);
    H(a, "authType", this.u);

    if (this.a.isOAuthProvider) {
      var b = this.a;

      try {
        var c = _app.default.app(this.c).auth().ha();
      } catch (h) {
        c = null;
      }

      b.bb = c;
      H(a, "providerId", this.a.providerId);
      b = this.a;
      c = Me(b.zb);

      for (var d in c) c[d] = c[d].toString();

      d = b.Fc;
      c = Va(c);

      for (var e = 0; e < d.length; e++) {
        var f = d[e];
        f in c && delete c[f];
      }

      b.eb && b.bb && !c[b.eb] && (c[b.eb] = b.bb);
      Ua(c) || H(a, "customParameters", Le(c));
    }

    "function" === typeof this.a.Hb && (b = this.a.Hb(), b.length && H(a, "scopes", b.join(",")));
    this.l ? H(a, "redirectUrl", this.l) : Td(a.a, "redirectUrl");
    this.g ? H(a, "eventId", this.g) : Td(a.a, "eventId");
    this.i ? H(a, "v", this.i) : Td(a.a, "v");
    if (this.b) for (var g in this.b) this.b.hasOwnProperty(g) && !Ld(a, g) && H(a, g, this.b[g]);
    this.h ? H(a, "tid", this.h) : Td(a.a, "tid");
    this.f ? H(a, "eid", this.f) : Td(a.a, "eid");
    g = vj(this.c);
    g.length && H(a, "fw", g.join(","));
    return a.toString();
  };

  function vj(a) {
    try {
      return _app.default.app(a).auth().Ca();
    } catch (b) {
      return [];
    }
  }

  function wj(a, b, c, d, e) {
    this.u = a;
    this.f = b;
    this.b = c;
    this.c = d || null;
    this.h = e || null;
    this.m = this.o = this.v = null;
    this.g = [];
    this.l = this.a = null;
  }

  function xj(a) {
    var b = ie();
    return Hi(a).then(function (c) {
      a: {
        var d = Md(b),
            e = d.f;
        d = d.b;

        for (var f = 0; f < c.length; f++) {
          var g = c[f];
          var h = d;
          var m = e;
          0 == g.indexOf("chrome-extension://") ? h = Md(g).b == h && "chrome-extension" == m : "http" != m && "https" != m ? h = !1 : te.test(g) ? h = h == g : (g = g.split(".").join("\\."), h = new RegExp("^(.+\\." + g + "|" + g + ")$", "i").test(h));

          if (h) {
            c = !0;
            break a;
          }
        }

        c = !1;
      }

      if (!c) throw new dh(ie());
    });
  }

  function yj(a) {
    if (a.l) return a.l;
    a.l = ve().then(function () {
      if (!a.o) {
        var b = a.c,
            c = a.h,
            d = vj(a.b),
            e = new tj(a.u, a.f, a.b);
        e.f = b;
        e.b = c;
        e.c = Sa(d || []);
        a.o = e.toString();
      }

      a.i = new kj(a.o);
      zj(a);
    });
    return a.l;
  }

  k = wj.prototype;

  k.Fb = function (a, b, c) {
    var d = new M("popup-closed-by-user"),
        e = new M("web-storage-unsupported"),
        f = this,
        g = !1;
    return this.ia().then(function () {
      Aj(f).then(function (h) {
        h || (a && pe(a), b(e), g = !0);
      });
    }).s(function () {}).then(function () {
      if (!g) return se(a);
    }).then(function () {
      if (!g) return od(c).then(function () {
        b(d);
      });
    });
  };

  k.Ob = function () {
    var a = I();
    return !Ke(a) && !Oe(a);
  };

  k.Jb = function () {
    return !1;
  };

  k.Db = function (a, b, c, d, e, f, g, h) {
    if (!a) return E(new M("popup-blocked"));
    if (g && !Ke()) return this.ia().s(function (p) {
      pe(a);
      e(p);
    }), d(), D();
    this.a || (this.a = xj(Bj(this)));
    var m = this;
    return this.a.then(function () {
      var p = m.ia().s(function (u) {
        pe(a);
        e(u);
        throw u;
      });
      d();
      return p;
    }).then(function () {
      Yg(c);

      if (!g) {
        var p = Cj(m.u, m.f, m.b, b, c, null, f, m.c, void 0, m.h, h);
        je(p, a);
      }
    }).s(function (p) {
      "auth/network-request-failed" == p.code && (m.a = null);
      throw p;
    });
  };

  function Bj(a) {
    a.m || (a.v = a.c ? Fe(a.c, vj(a.b)) : null, a.m = new oi(a.f, Vf(a.h), a.v));
    return a.m;
  }

  k.Eb = function (a, b, c, d) {
    this.a || (this.a = xj(Bj(this)));
    var e = this;
    return this.a.then(function () {
      Yg(b);
      var f = Cj(e.u, e.f, e.b, a, b, ie(), c, e.c, void 0, e.h, d);
      je(f);
    }).s(function (f) {
      "auth/network-request-failed" == f.code && (e.a = null);
      throw f;
    });
  };

  k.ia = function () {
    var a = this;
    return yj(this).then(function () {
      return a.i.gb;
    }).s(function () {
      a.a = null;
      throw new M("network-request-failed");
    });
  };

  k.Rb = function () {
    return !0;
  };

  function Cj(a, b, c, d, e, f, g, h, m, p, u) {
    a = new uj(a, b, c, d, e);
    a.l = f;
    a.g = g;
    a.i = h;
    a.b = Va(m || null);
    a.f = p;
    return a.nb(u).toString();
  }

  function zj(a) {
    if (!a.i) throw Error("IfcHandler must be initialized!");
    pj(a.i, function (b) {
      var c = {};

      if (b && b.authEvent) {
        var d = !1;
        b = $g(b.authEvent);

        for (c = 0; c < a.g.length; c++) d = a.g[c](b) || d;

        c = {};
        c.status = d ? "ACK" : "ERROR";
        return D(c);
      }

      c.status = "ERROR";
      return D(c);
    });
  }

  function Aj(a) {
    var b = {
      type: "webStorageSupport"
    };
    return yj(a).then(function () {
      return oj(a.i, b);
    }).then(function (c) {
      if (c && c.length && "undefined" !== typeof c[0].webStorageSupport) return c[0].webStorageSupport;
      throw Error();
    });
  }

  k.Aa = function (a) {
    this.g.push(a);
  };

  k.Na = function (a) {
    Qa(this.g, function (b) {
      return b == a;
    });
  };

  function Dj(a) {
    this.a = a || _app.default.INTERNAL.reactNative && _app.default.INTERNAL.reactNative.AsyncStorage;
    if (!this.a) throw new M("internal-error", "The React Native compatibility library was not found.");
    this.type = "asyncStorage";
  }

  k = Dj.prototype;

  k.get = function (a) {
    return D(this.a.getItem(a)).then(function (b) {
      return b && Ne(b);
    });
  };

  k.set = function (a, b) {
    return D(this.a.setItem(a, Le(b)));
  };

  k.S = function (a) {
    return D(this.a.removeItem(a));
  };

  k.$ = function () {};

  k.ea = function () {};

  function Ej(a) {
    this.b = a;
    this.a = {};
    this.f = t(this.c, this);
  }

  var Fj = [];

  function Gj() {
    var a = Ae() ? self : null;
    x(Fj, function (c) {
      c.b == a && (b = c);
    });

    if (!b) {
      var b = new Ej(a);
      Fj.push(b);
    }

    return b;
  }

  Ej.prototype.c = function (a) {
    var b = a.data.eventType,
        c = a.data.eventId,
        d = this.a[b];

    if (d && 0 < d.length) {
      a.ports[0].postMessage({
        status: "ack",
        eventId: c,
        eventType: b,
        response: null
      });
      var e = [];
      x(d, function (f) {
        e.push(D().then(function () {
          return f(a.origin, a.data.data);
        }));
      });
      cc(e).then(function (f) {
        var g = [];
        x(f, function (h) {
          g.push({
            fulfilled: h.Gb,
            value: h.value,
            reason: h.reason ? h.reason.message : void 0
          });
        });
        x(g, function (h) {
          for (var m in h) "undefined" === typeof h[m] && delete h[m];
        });
        a.ports[0].postMessage({
          status: "done",
          eventId: c,
          eventType: b,
          response: g
        });
      });
    }
  };

  function Hj(a, b, c) {
    Ua(a.a) && a.b.addEventListener("message", a.f);
    "undefined" === typeof a.a[b] && (a.a[b] = []);
    a.a[b].push(c);
  }

  ;

  function Ij(a) {
    this.a = a;
  }

  Ij.prototype.postMessage = function (a, b) {
    this.a.postMessage(a, b);
  };

  function Jj(a) {
    this.c = a;
    this.b = !1;
    this.a = [];
  }

  function Kj(a, b, c, d) {
    var e,
        f = c || {},
        g,
        h,
        m,
        p = null;
    if (a.b) return E(Error("connection_unavailable"));
    var u = d ? 800 : 50,
        A = "undefined" !== typeof MessageChannel ? new MessageChannel() : null;
    return new B(function (C, N) {
      A ? (e = Math.floor(Math.random() * Math.pow(10, 20)).toString(), A.port1.start(), h = setTimeout(function () {
        N(Error("unsupported_event"));
      }, u), g = function (wa) {
        wa.data.eventId === e && ("ack" === wa.data.status ? (clearTimeout(h), m = setTimeout(function () {
          N(Error("timeout"));
        }, 3E3)) : "done" === wa.data.status ? (clearTimeout(m), "undefined" !== typeof wa.data.response ? C(wa.data.response) : N(Error("unknown_error"))) : (clearTimeout(h), clearTimeout(m), N(Error("invalid_response"))));
      }, p = {
        messageChannel: A,
        onMessage: g
      }, a.a.push(p), A.port1.addEventListener("message", g), a.c.postMessage({
        eventType: b,
        eventId: e,
        data: f
      }, [A.port2])) : N(Error("connection_unavailable"));
    }).then(function (C) {
      Lj(a, p);
      return C;
    }).s(function (C) {
      Lj(a, p);
      throw C;
    });
  }

  function Lj(a, b) {
    if (b) {
      var c = b.messageChannel,
          d = b.onMessage;
      c && (c.port1.removeEventListener("message", d), c.port1.close());
      Qa(a.a, function (e) {
        return e == b;
      });
    }
  }

  Jj.prototype.close = function () {
    for (; 0 < this.a.length;) Lj(this, this.a[0]);

    this.b = !0;
  };

  function Mj() {
    if (!Nj()) throw new M("web-storage-unsupported");
    this.c = {};
    this.a = [];
    this.b = 0;
    this.u = l.indexedDB;
    this.type = "indexedDB";
    this.g = this.l = this.f = this.i = null;
    this.o = !1;
    this.h = null;
    var a = this;
    Ae() && self ? (this.l = Gj(), Hj(this.l, "keyChanged", function (b, c) {
      return Oj(a).then(function (d) {
        0 < d.length && x(a.a, function (e) {
          e(d);
        });
        return {
          keyProcessed: Oa(d, c.key)
        };
      });
    }), Hj(this.l, "ping", function () {
      return D(["keyChanged"]);
    })) : We().then(function (b) {
      if (a.h = b) a.g = new Jj(new Ij(b)), Kj(a.g, "ping", null, !0).then(function (c) {
        c[0].fulfilled && Oa(c[0].value, "keyChanged") && (a.o = !0);
      }).s(function () {});
    });
  }

  var Pj;

  function Qj(a) {
    return new B(function (b, c) {
      var d = a.u.deleteDatabase("firebaseLocalStorageDb");

      d.onsuccess = function () {
        b();
      };

      d.onerror = function (e) {
        c(Error(e.target.error));
      };
    });
  }

  function Rj(a) {
    return new B(function (b, c) {
      var d = a.u.open("firebaseLocalStorageDb", 1);

      d.onerror = function (e) {
        try {
          e.preventDefault();
        } catch (f) {}

        c(Error(e.target.error));
      };

      d.onupgradeneeded = function (e) {
        e = e.target.result;

        try {
          e.createObjectStore("firebaseLocalStorage", {
            keyPath: "fbase_key"
          });
        } catch (f) {
          c(f);
        }
      };

      d.onsuccess = function (e) {
        e = e.target.result;
        e.objectStoreNames.contains("firebaseLocalStorage") ? b(e) : Qj(a).then(function () {
          return Rj(a);
        }).then(function (f) {
          b(f);
        }).s(function (f) {
          c(f);
        });
      };
    });
  }

  function Sj(a) {
    a.m || (a.m = Rj(a));
    return a.m;
  }

  function Nj() {
    try {
      return !!l.indexedDB;
    } catch (a) {
      return !1;
    }
  }

  function Tj(a) {
    return a.objectStore("firebaseLocalStorage");
  }

  function Uj(a, b) {
    return a.transaction(["firebaseLocalStorage"], b ? "readwrite" : "readonly");
  }

  function Vj(a) {
    return new B(function (b, c) {
      a.onsuccess = function (d) {
        d && d.target ? b(d.target.result) : b();
      };

      a.onerror = function (d) {
        c(d.target.error);
      };
    });
  }

  k = Mj.prototype;

  k.set = function (a, b) {
    var c = !1,
        d,
        e = this;
    return Sj(this).then(function (f) {
      d = f;
      f = Tj(Uj(d, !0));
      return Vj(f.get(a));
    }).then(function (f) {
      var g = Tj(Uj(d, !0));
      if (f) return f.value = b, Vj(g.put(f));
      e.b++;
      c = !0;
      f = {};
      f.fbase_key = a;
      f.value = b;
      return Vj(g.add(f));
    }).then(function () {
      e.c[a] = b;
      return Wj(e, a);
    }).ka(function () {
      c && e.b--;
    });
  };

  function Wj(a, b) {
    return a.g && a.h && Ve() === a.h ? Kj(a.g, "keyChanged", {
      key: b
    }, a.o).then(function () {}).s(function () {}) : D();
  }

  k.get = function (a) {
    return Sj(this).then(function (b) {
      return Vj(Tj(Uj(b, !1)).get(a));
    }).then(function (b) {
      return b && b.value;
    });
  };

  k.S = function (a) {
    var b = !1,
        c = this;
    return Sj(this).then(function (d) {
      b = !0;
      c.b++;
      return Vj(Tj(Uj(d, !0))["delete"](a));
    }).then(function () {
      delete c.c[a];
      return Wj(c, a);
    }).ka(function () {
      b && c.b--;
    });
  };

  function Oj(a) {
    return Sj(a).then(function (b) {
      var c = Tj(Uj(b, !1));
      return c.getAll ? Vj(c.getAll()) : new B(function (d, e) {
        var f = [],
            g = c.openCursor();

        g.onsuccess = function (h) {
          (h = h.target.result) ? (f.push(h.value), h["continue"]()) : d(f);
        };

        g.onerror = function (h) {
          e(h.target.error);
        };
      });
    }).then(function (b) {
      var c = {},
          d = [];

      if (0 == a.b) {
        for (d = 0; d < b.length; d++) c[b[d].fbase_key] = b[d].value;

        d = ke(a.c, c);
        a.c = c;
      }

      return d;
    });
  }

  k.$ = function (a) {
    0 == this.a.length && Xj(this);
    this.a.push(a);
  };

  k.ea = function (a) {
    Qa(this.a, function (b) {
      return b == a;
    });
    0 == this.a.length && Yj(this);
  };

  function Xj(a) {
    function b() {
      a.f = setTimeout(function () {
        a.i = Oj(a).then(function (c) {
          0 < c.length && x(a.a, function (d) {
            d(c);
          });
        }).then(function () {
          b();
        }).s(function (c) {
          "STOP_EVENT" != c.message && b();
        });
      }, 800);
    }

    Yj(a);
    b();
  }

  function Yj(a) {
    a.i && a.i.cancel("STOP_EVENT");
    a.f && (clearTimeout(a.f), a.f = null);
  }

  ;

  function Zj(a) {
    var b = this,
        c = null;
    this.a = [];
    this.type = "indexedDB";
    this.c = a;
    this.b = D().then(function () {
      if (Nj()) {
        var d = He(),
            e = "__sak" + d;
        Pj || (Pj = new Mj());
        c = Pj;
        return c.set(e, d).then(function () {
          return c.get(e);
        }).then(function (f) {
          if (f !== d) throw Error("indexedDB not supported!");
          return c.S(e);
        }).then(function () {
          return c;
        }).s(function () {
          return b.c;
        });
      }

      return b.c;
    }).then(function (d) {
      b.type = d.type;
      d.$(function (e) {
        x(b.a, function (f) {
          f(e);
        });
      });
      return d;
    });
  }

  k = Zj.prototype;

  k.get = function (a) {
    return this.b.then(function (b) {
      return b.get(a);
    });
  };

  k.set = function (a, b) {
    return this.b.then(function (c) {
      return c.set(a, b);
    });
  };

  k.S = function (a) {
    return this.b.then(function (b) {
      return b.S(a);
    });
  };

  k.$ = function (a) {
    this.a.push(a);
  };

  k.ea = function (a) {
    Qa(this.a, function (b) {
      return b == a;
    });
  };

  function ak() {
    this.a = {};
    this.type = "inMemory";
  }

  k = ak.prototype;

  k.get = function (a) {
    return D(this.a[a]);
  };

  k.set = function (a, b) {
    this.a[a] = b;
    return D();
  };

  k.S = function (a) {
    delete this.a[a];
    return D();
  };

  k.$ = function () {};

  k.ea = function () {};

  function bk() {
    if (!ck()) {
      if ("Node" == Be()) throw new M("internal-error", "The LocalStorage compatibility library was not found.");
      throw new M("web-storage-unsupported");
    }

    this.a = dk() || _app.default.INTERNAL.node.localStorage;
    this.type = "localStorage";
  }

  function dk() {
    try {
      var a = l.localStorage,
          b = He();
      a && (a.setItem(b, "1"), a.removeItem(b));
      return a;
    } catch (c) {
      return null;
    }
  }

  function ck() {
    var a = "Node" == Be();
    a = dk() || a && _app.default.INTERNAL.node && _app.default.INTERNAL.node.localStorage;
    if (!a) return !1;

    try {
      return a.setItem("__sak", "1"), a.removeItem("__sak"), !0;
    } catch (b) {
      return !1;
    }
  }

  k = bk.prototype;

  k.get = function (a) {
    var b = this;
    return D().then(function () {
      var c = b.a.getItem(a);
      return Ne(c);
    });
  };

  k.set = function (a, b) {
    var c = this;
    return D().then(function () {
      var d = Le(b);
      null === d ? c.S(a) : c.a.setItem(a, d);
    });
  };

  k.S = function (a) {
    var b = this;
    return D().then(function () {
      b.a.removeItem(a);
    });
  };

  k.$ = function (a) {
    l.window && Xc(l.window, "storage", a);
  };

  k.ea = function (a) {
    l.window && gd(l.window, "storage", a);
  };

  function ek() {
    this.type = "nullStorage";
  }

  k = ek.prototype;

  k.get = function () {
    return D(null);
  };

  k.set = function () {
    return D();
  };

  k.S = function () {
    return D();
  };

  k.$ = function () {};

  k.ea = function () {};

  function fk() {
    if (!gk()) {
      if ("Node" == Be()) throw new M("internal-error", "The SessionStorage compatibility library was not found.");
      throw new M("web-storage-unsupported");
    }

    this.a = hk() || _app.default.INTERNAL.node.sessionStorage;
    this.type = "sessionStorage";
  }

  function hk() {
    try {
      var a = l.sessionStorage,
          b = He();
      a && (a.setItem(b, "1"), a.removeItem(b));
      return a;
    } catch (c) {
      return null;
    }
  }

  function gk() {
    var a = "Node" == Be();
    a = hk() || a && _app.default.INTERNAL.node && _app.default.INTERNAL.node.sessionStorage;
    if (!a) return !1;

    try {
      return a.setItem("__sak", "1"), a.removeItem("__sak"), !0;
    } catch (b) {
      return !1;
    }
  }

  k = fk.prototype;

  k.get = function (a) {
    var b = this;
    return D().then(function () {
      var c = b.a.getItem(a);
      return Ne(c);
    });
  };

  k.set = function (a, b) {
    var c = this;
    return D().then(function () {
      var d = Le(b);
      null === d ? c.S(a) : c.a.setItem(a, d);
    });
  };

  k.S = function (a) {
    var b = this;
    return D().then(function () {
      b.a.removeItem(a);
    });
  };

  k.$ = function () {};

  k.ea = function () {};

  function ik() {
    var a = {};
    a.Browser = jk;
    a.Node = kk;
    a.ReactNative = lk;
    a.Worker = mk;
    this.a = a[Be()];
  }

  var nk,
      jk = {
    C: bk,
    Ta: fk
  },
      kk = {
    C: bk,
    Ta: fk
  },
      lk = {
    C: Dj,
    Ta: ek
  },
      mk = {
    C: bk,
    Ta: ek
  };
  var ok = {
    ad: "local",
    NONE: "none",
    cd: "session"
  };

  function pk(a) {
    var b = new M("invalid-persistence-type"),
        c = new M("unsupported-persistence-type");

    a: {
      for (d in ok) if (ok[d] == a) {
        var d = !0;
        break a;
      }

      d = !1;
    }

    if (!d || "string" !== typeof a) throw b;

    switch (Be()) {
      case "ReactNative":
        if ("session" === a) throw c;
        break;

      case "Node":
        if ("none" !== a) throw c;
        break;

      default:
        if (!Ge() && "none" !== a) throw c;
    }
  }

  function qk() {
    var a = !Oe(I()) && ze() ? !0 : !1,
        b = Ke(),
        c = Ge();
    this.m = a;
    this.h = b;
    this.l = c;
    this.a = {};
    nk || (nk = new ik());
    a = nk;

    try {
      this.g = !he() && Ue() || !l.indexedDB ? new a.a.C() : new Zj(Ae() ? new ak() : new a.a.C());
    } catch (d) {
      this.g = new ak(), this.h = !0;
    }

    try {
      this.i = new a.a.Ta();
    } catch (d) {
      this.i = new ak();
    }

    this.u = new ak();
    this.f = t(this.Pb, this);
    this.b = {};
  }

  var rk;

  function sk() {
    rk || (rk = new qk());
    return rk;
  }

  function tk(a, b) {
    switch (b) {
      case "session":
        return a.i;

      case "none":
        return a.u;

      default:
        return a.g;
    }
  }

  function uk(a, b) {
    return "firebase:" + a.name + (b ? ":" + b : "");
  }

  function vk(a, b, c) {
    var d = uk(b, c),
        e = tk(a, b.C);
    return a.get(b, c).then(function (f) {
      var g = null;

      try {
        g = Ne(l.localStorage.getItem(d));
      } catch (h) {}

      if (g && !f) return l.localStorage.removeItem(d), a.set(b, g, c);
      g && f && "localStorage" != e.type && l.localStorage.removeItem(d);
    });
  }

  k = qk.prototype;

  k.get = function (a, b) {
    return tk(this, a.C).get(uk(a, b));
  };

  function wk(a, b, c) {
    c = uk(b, c);
    "local" == b.C && (a.b[c] = null);
    return tk(a, b.C).S(c);
  }

  k.set = function (a, b, c) {
    var d = uk(a, c),
        e = this,
        f = tk(this, a.C);
    return f.set(d, b).then(function () {
      return f.get(d);
    }).then(function (g) {
      "local" == a.C && (e.b[d] = g);
    });
  };

  k.addListener = function (a, b, c) {
    a = uk(a, b);
    this.l && (this.b[a] = l.localStorage.getItem(a));
    Ua(this.a) && (tk(this, "local").$(this.f), this.h || (he() || !Ue()) && l.indexedDB || !this.l || xk(this));
    this.a[a] || (this.a[a] = []);
    this.a[a].push(c);
  };

  k.removeListener = function (a, b, c) {
    a = uk(a, b);
    this.a[a] && (Qa(this.a[a], function (d) {
      return d == c;
    }), 0 == this.a[a].length && delete this.a[a]);
    Ua(this.a) && (tk(this, "local").ea(this.f), yk(this));
  };

  function xk(a) {
    yk(a);
    a.c = setInterval(function () {
      for (var b in a.a) {
        var c = l.localStorage.getItem(b),
            d = a.b[b];
        c != d && (a.b[b] = c, c = new Lc({
          type: "storage",
          key: b,
          target: window,
          oldValue: d,
          newValue: c,
          a: !0
        }), a.Pb(c));
      }
    }, 1E3);
  }

  function yk(a) {
    a.c && (clearInterval(a.c), a.c = null);
  }

  k.Pb = function (a) {
    if (a && a.f) {
      var b = a.a.key;
      if (null == b) for (var c in this.a) {
        var d = this.b[c];
        "undefined" === typeof d && (d = null);
        var e = l.localStorage.getItem(c);
        e !== d && (this.b[c] = e, this.$a(c));
      } else if (0 == b.indexOf("firebase:") && this.a[b]) {
        "undefined" !== typeof a.a.a ? tk(this, "local").ea(this.f) : yk(this);
        if (this.m) if (c = l.localStorage.getItem(b), d = a.a.newValue, d !== c) null !== d ? l.localStorage.setItem(b, d) : l.localStorage.removeItem(b);else if (this.b[b] === d && "undefined" === typeof a.a.a) return;
        var f = this;

        c = function () {
          if ("undefined" !== typeof a.a.a || f.b[b] !== l.localStorage.getItem(b)) f.b[b] = l.localStorage.getItem(b), f.$a(b);
        };

        vc && Gc && 10 == Gc && l.localStorage.getItem(b) !== a.a.newValue && a.a.newValue !== a.a.oldValue ? setTimeout(c, 10) : c();
      }
    } else x(a, t(this.$a, this));
  };

  k.$a = function (a) {
    this.a[a] && x(this.a[a], function (b) {
      b();
    });
  };

  function zk(a) {
    this.a = a;
    this.b = sk();
  }

  var Ak = {
    name: "authEvent",
    C: "local"
  };

  function Bk(a) {
    return a.b.get(Ak, a.a).then(function (b) {
      return $g(b);
    });
  }

  ;

  function Ck() {
    this.a = sk();
  }

  ;

  function Dk() {
    this.b = -1;
  }

  ;

  function Ek(a, b) {
    this.b = Fk;
    this.f = l.Uint8Array ? new Uint8Array(this.b) : Array(this.b);
    this.g = this.c = 0;
    this.a = [];
    this.i = a;
    this.h = b;
    this.l = l.Int32Array ? new Int32Array(64) : Array(64);
    void 0 !== Gk || (l.Int32Array ? Gk = new Int32Array(Hk) : Gk = Hk);
    this.reset();
  }

  var Gk;
  v(Ek, Dk);

  for (var Fk = 64, Ik = Fk - 1, Jk = [], Kk = 0; Kk < Ik; Kk++) Jk[Kk] = 0;

  var Lk = Ra(128, Jk);

  Ek.prototype.reset = function () {
    this.g = this.c = 0;
    this.a = l.Int32Array ? new Int32Array(this.h) : Sa(this.h);
  };

  function Mk(a) {
    for (var b = a.f, c = a.l, d = 0, e = 0; e < b.length;) c[d++] = b[e] << 24 | b[e + 1] << 16 | b[e + 2] << 8 | b[e + 3], e = 4 * d;

    for (b = 16; 64 > b; b++) {
      e = c[b - 15] | 0;
      d = c[b - 2] | 0;
      var f = (c[b - 16] | 0) + ((e >>> 7 | e << 25) ^ (e >>> 18 | e << 14) ^ e >>> 3) | 0,
          g = (c[b - 7] | 0) + ((d >>> 17 | d << 15) ^ (d >>> 19 | d << 13) ^ d >>> 10) | 0;
      c[b] = f + g | 0;
    }

    d = a.a[0] | 0;
    e = a.a[1] | 0;
    var h = a.a[2] | 0,
        m = a.a[3] | 0,
        p = a.a[4] | 0,
        u = a.a[5] | 0,
        A = a.a[6] | 0;
    f = a.a[7] | 0;

    for (b = 0; 64 > b; b++) {
      var C = ((d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10)) + (d & e ^ d & h ^ e & h) | 0;
      g = p & u ^ ~p & A;
      f = f + ((p >>> 6 | p << 26) ^ (p >>> 11 | p << 21) ^ (p >>> 25 | p << 7)) | 0;
      g = g + (Gk[b] | 0) | 0;
      g = f + (g + (c[b] | 0) | 0) | 0;
      f = A;
      A = u;
      u = p;
      p = m + g | 0;
      m = h;
      h = e;
      e = d;
      d = g + C | 0;
    }

    a.a[0] = a.a[0] + d | 0;
    a.a[1] = a.a[1] + e | 0;
    a.a[2] = a.a[2] + h | 0;
    a.a[3] = a.a[3] + m | 0;
    a.a[4] = a.a[4] + p | 0;
    a.a[5] = a.a[5] + u | 0;
    a.a[6] = a.a[6] + A | 0;
    a.a[7] = a.a[7] + f | 0;
  }

  function Nk(a, b, c) {
    void 0 === c && (c = b.length);
    var d = 0,
        e = a.c;
    if (n(b)) for (; d < c;) a.f[e++] = b.charCodeAt(d++), e == a.b && (Mk(a), e = 0);else if (pa(b)) for (; d < c;) {
      var f = b[d++];
      if (!("number" == typeof f && 0 <= f && 255 >= f && f == (f | 0))) throw Error("message must be a byte array");
      a.f[e++] = f;
      e == a.b && (Mk(a), e = 0);
    } else throw Error("message must be string or array");
    a.c = e;
    a.g += c;
  }

  var Hk = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];

  function Ok() {
    Ek.call(this, 8, Pk);
  }

  v(Ok, Ek);
  var Pk = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225];

  function Qk(a, b, c, d, e) {
    this.u = a;
    this.i = b;
    this.l = c;
    this.m = d || null;
    this.o = e || null;
    this.h = b + ":" + c;
    this.v = new Ck();
    this.g = new zk(this.h);
    this.f = null;
    this.b = [];
    this.a = this.c = null;
  }

  function Rk(a) {
    return new M("invalid-cordova-configuration", a);
  }

  k = Qk.prototype;

  k.ia = function () {
    return this.Da ? this.Da : this.Da = we().then(function () {
      if ("function" !== typeof J("universalLinks.subscribe", l)) throw Rk("cordova-universal-links-plugin-fix is not installed");
      if ("undefined" === typeof J("BuildInfo.packageName", l)) throw Rk("cordova-plugin-buildinfo is not installed");
      if ("function" !== typeof J("cordova.plugins.browsertab.openUrl", l)) throw Rk("cordova-plugin-browsertab is not installed");
      if ("function" !== typeof J("cordova.InAppBrowser.open", l)) throw Rk("cordova-plugin-inappbrowser is not installed");
    }, function () {
      throw new M("cordova-not-ready");
    });
  };

  function Sk() {
    for (var a = 20, b = []; 0 < a;) b.push("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(62 * Math.random()))), a--;

    return b.join("");
  }

  function Tk(a) {
    var b = new Ok();
    Nk(b, a);
    a = [];
    var c = 8 * b.g;
    56 > b.c ? Nk(b, Lk, 56 - b.c) : Nk(b, Lk, b.b - (b.c - 56));

    for (var d = 63; 56 <= d; d--) b.f[d] = c & 255, c /= 256;

    Mk(b);

    for (d = c = 0; d < b.i; d++) for (var e = 24; 0 <= e; e -= 8) a[c++] = b.a[d] >> e & 255;

    return Lf(a);
  }

  k.Fb = function (a, b) {
    b(new M("operation-not-supported-in-this-environment"));
    return D();
  };

  k.Db = function () {
    return E(new M("operation-not-supported-in-this-environment"));
  };

  k.Rb = function () {
    return !1;
  };

  k.Ob = function () {
    return !0;
  };

  k.Jb = function () {
    return !0;
  };

  k.Eb = function (a, b, c, d) {
    if (this.c) return E(new M("redirect-operation-pending"));
    var e = this,
        f = l.document,
        g = null,
        h = null,
        m = null,
        p = null;
    return this.c = D().then(function () {
      Yg(b);
      return Uk(e);
    }).then(function () {
      return Vk(e, a, b, c, d);
    }).then(function () {
      return new B(function (u, A) {
        h = function () {
          var C = J("cordova.plugins.browsertab.close", l);
          u();
          "function" === typeof C && C();
          e.a && "function" === typeof e.a.close && (e.a.close(), e.a = null);
          return !1;
        };

        e.Aa(h);

        m = function () {
          g || (g = od(2E3).then(function () {
            A(new M("redirect-cancelled-by-user"));
          }));
        };

        p = function () {
          Re() && m();
        };

        f.addEventListener("resume", m, !1);
        I().toLowerCase().match(/android/) || f.addEventListener("visibilitychange", p, !1);
      }).s(function (u) {
        return Wk(e).then(function () {
          throw u;
        });
      });
    }).ka(function () {
      m && f.removeEventListener("resume", m, !1);
      p && f.removeEventListener("visibilitychange", p, !1);
      g && g.cancel();
      h && e.Na(h);
      e.c = null;
    });
  };

  function Vk(a, b, c, d, e) {
    var f = Sk(),
        g = new Zg(b, d, null, f, new M("no-auth-event"), null, e),
        h = J("BuildInfo.packageName", l);
    if ("string" !== typeof h) throw new M("invalid-cordova-configuration");
    var m = J("BuildInfo.displayName", l),
        p = {};
    if (I().toLowerCase().match(/iphone|ipad|ipod/)) p.ibi = h;else if (I().toLowerCase().match(/android/)) p.apn = h;else return E(new M("operation-not-supported-in-this-environment"));
    m && (p.appDisplayName = m);
    f = Tk(f);
    p.sessionId = f;
    var u = Cj(a.u, a.i, a.l, b, c, null, d, a.m, p, a.o, e);
    return a.ia().then(function () {
      var A = a.h;
      return a.v.a.set(Ak, g.A(), A);
    }).then(function () {
      var A = J("cordova.plugins.browsertab.isAvailable", l);
      if ("function" !== typeof A) throw new M("invalid-cordova-configuration");
      var C = null;
      A(function (N) {
        if (N) {
          C = J("cordova.plugins.browsertab.openUrl", l);
          if ("function" !== typeof C) throw new M("invalid-cordova-configuration");
          C(u);
        } else {
          C = J("cordova.InAppBrowser.open", l);
          if ("function" !== typeof C) throw new M("invalid-cordova-configuration");
          N = I();
          a.a = C(u, N.match(/(iPad|iPhone|iPod).*OS 7_\d/i) || N.match(/(iPad|iPhone|iPod).*OS 8_\d/i) ? "_blank" : "_system", "location=yes");
        }
      });
    });
  }

  function Xk(a, b) {
    for (var c = 0; c < a.b.length; c++) try {
      a.b[c](b);
    } catch (d) {}
  }

  function Uk(a) {
    a.f || (a.f = a.ia().then(function () {
      return new B(function (b) {
        function c(d) {
          b(d);
          a.Na(c);
          return !1;
        }

        a.Aa(c);
        Yk(a);
      });
    }));
    return a.f;
  }

  function Wk(a) {
    var b = null;
    return Bk(a.g).then(function (c) {
      b = c;
      c = a.g;
      return wk(c.b, Ak, c.a);
    }).then(function () {
      return b;
    });
  }

  function Yk(a) {
    function b(g) {
      d = !0;
      e && e.cancel();
      Wk(a).then(function (h) {
        var m = c;

        if (h && g && g.url) {
          var p = null;
          m = jg(g.url);
          -1 != m.indexOf("/__/auth/callback") && (p = Md(m), p = Ne(Ld(p, "firebaseError") || null), p = (p = "object" === typeof p ? qf(p) : null) ? new Zg(h.c, h.b, null, null, p, null, h.R()) : new Zg(h.c, h.b, m, h.f, null, null, h.R()));
          m = p || c;
        }

        Xk(a, m);
      });
    }

    var c = new Zg("unknown", null, null, null, new M("no-auth-event")),
        d = !1,
        e = od(500).then(function () {
      return Wk(a).then(function () {
        d || Xk(a, c);
      });
    }),
        f = l.handleOpenURL;

    l.handleOpenURL = function (g) {
      0 == g.toLowerCase().indexOf(J("BuildInfo.packageName", l).toLowerCase() + "://") && b({
        url: g
      });
      if ("function" === typeof f) try {
        f(g);
      } catch (h) {
        console.error(h);
      }
    };

    bh || (bh = new ah());
    ch(b);
  }

  k.Aa = function (a) {
    this.b.push(a);
    Uk(this).s(function (b) {
      "auth/invalid-cordova-configuration" === b.code && (b = new Zg("unknown", null, null, null, new M("no-auth-event")), a(b));
    });
  };

  k.Na = function (a) {
    Qa(this.b, function (b) {
      return b == a;
    });
  };

  function Zk(a) {
    this.a = a;
    this.b = sk();
  }

  var $k = {
    name: "pendingRedirect",
    C: "session"
  };

  function al(a) {
    return a.b.set($k, "pending", a.a);
  }

  function bl(a) {
    return wk(a.b, $k, a.a);
  }

  function cl(a) {
    return a.b.get($k, a.a).then(function (b) {
      return "pending" == b;
    });
  }

  ;

  function dl(a, b, c) {
    this.i = {};
    this.v = 0;
    this.B = a;
    this.u = b;
    this.m = c;
    this.h = [];
    this.f = !1;
    this.l = t(this.o, this);
    this.b = new el();
    this.w = new fl();
    this.g = new Zk(this.u + ":" + this.m);
    this.c = {};
    this.c.unknown = this.b;
    this.c.signInViaRedirect = this.b;
    this.c.linkViaRedirect = this.b;
    this.c.reauthViaRedirect = this.b;
    this.c.signInViaPopup = this.w;
    this.c.linkViaPopup = this.w;
    this.c.reauthViaPopup = this.w;
    this.a = gl(this.B, this.u, this.m, Wf);
  }

  function gl(a, b, c, d) {
    var e = _app.default.SDK_VERSION || null;
    return xe() ? new Qk(a, b, c, e, d) : new wj(a, b, c, e, d);
  }

  dl.prototype.reset = function () {
    this.f = !1;
    this.a.Na(this.l);
    this.a = gl(this.B, this.u, this.m);
    this.i = {};
  };

  function hl(a) {
    a.f || (a.f = !0, a.a.Aa(a.l));
    var b = a.a;
    return a.a.ia().s(function (c) {
      a.a == b && a.reset();
      throw c;
    });
  }

  function il(a) {
    a.a.Ob() && hl(a).s(function (b) {
      var c = new Zg("unknown", null, null, null, new M("operation-not-supported-in-this-environment"));
      jl(b) && a.o(c);
    });
    a.a.Jb() || kl(a.b);
  }

  function ll(a, b) {
    Oa(a.h, b) || a.h.push(b);
    a.f || cl(a.g).then(function (c) {
      c ? bl(a.g).then(function () {
        hl(a).s(function (d) {
          var e = new Zg("unknown", null, null, null, new M("operation-not-supported-in-this-environment"));
          jl(d) && a.o(e);
        });
      }) : il(a);
    }).s(function () {
      il(a);
    });
  }

  function ml(a, b) {
    Qa(a.h, function (c) {
      return c == b;
    });
  }

  dl.prototype.o = function (a) {
    if (!a) throw new M("invalid-auth-event");
    6E5 <= va() - this.v && (this.i = {}, this.v = 0);
    if (a && a.getUid() && this.i.hasOwnProperty(a.getUid())) return !1;

    for (var b = !1, c = 0; c < this.h.length; c++) {
      var d = this.h[c];

      if (d.xb(a.c, a.b)) {
        if (b = this.c[a.c]) b.h(a, d), a && (a.f || a.b) && (this.i[a.getUid()] = !0, this.v = va());
        b = !0;
        break;
      }
    }

    kl(this.b);
    return b;
  };

  var nl = new Qe(2E3, 1E4),
      ol = new Qe(3E4, 6E4);

  dl.prototype.oa = function () {
    return this.b.oa();
  };

  function pl(a, b, c, d, e, f, g) {
    return a.a.Db(b, c, d, function () {
      a.f || (a.f = !0, a.a.Aa(a.l));
    }, function () {
      a.reset();
    }, e, f, g);
  }

  function jl(a) {
    return a && "auth/cordova-not-ready" == a.code ? !0 : !1;
  }

  function ql(a, b, c, d, e) {
    var f;
    return al(a.g).then(function () {
      return a.a.Eb(b, c, d, e).s(function (g) {
        if (jl(g)) throw new M("operation-not-supported-in-this-environment");
        f = g;
        return bl(a.g).then(function () {
          throw f;
        });
      }).then(function () {
        return a.a.Rb() ? new B(function () {}) : bl(a.g).then(function () {
          return a.oa();
        }).then(function () {}).s(function () {});
      });
    });
  }

  function rl(a, b, c, d, e) {
    return a.a.Fb(d, function (f) {
      b.ja(c, null, f, e);
    }, nl.get());
  }

  var sl = {};

  function tl(a, b, c) {
    var d = b + ":" + c;
    sl[d] || (sl[d] = new dl(a, b, c));
    return sl[d];
  }

  function el() {
    this.b = null;
    this.f = [];
    this.c = [];
    this.a = null;
    this.i = this.g = !1;
  }

  el.prototype.reset = function () {
    this.b = null;
    this.a && (this.a.cancel(), this.a = null);
  };

  el.prototype.h = function (a, b) {
    if (a) {
      this.reset();
      this.g = !0;
      var c = a.c,
          d = a.b,
          e = a.a && "auth/web-storage-unsupported" == a.a.code,
          f = a.a && "auth/operation-not-supported-in-this-environment" == a.a.code;
      this.i = !(!e && !f);
      "unknown" != c || e || f ? a.a ? (ul(this, !0, null, a.a), D()) : b.Ba(c, d) ? vl(this, a, b) : E(new M("invalid-auth-event")) : (ul(this, !1, null, null), D());
    } else E(new M("invalid-auth-event"));
  };

  function kl(a) {
    a.g || (a.g = !0, ul(a, !1, null, null));
  }

  function wl(a) {
    a.g && !a.i && ul(a, !1, null, null);
  }

  function vl(a, b, c) {
    c = c.Ba(b.c, b.b);
    var d = b.g,
        e = b.f,
        f = b.i,
        g = b.R(),
        h = !!b.c.match(/Redirect$/);
    c(d, e, g, f).then(function (m) {
      ul(a, h, m, null);
    }).s(function (m) {
      ul(a, h, null, m);
    });
  }

  function xl(a, b) {
    a.b = function () {
      return E(b);
    };

    if (a.c.length) for (var c = 0; c < a.c.length; c++) a.c[c](b);
  }

  function yl(a, b) {
    a.b = function () {
      return D(b);
    };

    if (a.f.length) for (var c = 0; c < a.f.length; c++) a.f[c](b);
  }

  function ul(a, b, c, d) {
    b ? d ? xl(a, d) : yl(a, c) : yl(a, {
      user: null
    });
    a.f = [];
    a.c = [];
  }

  el.prototype.oa = function () {
    var a = this;
    return new B(function (b, c) {
      a.b ? a.b().then(b, c) : (a.f.push(b), a.c.push(c), zl(a));
    });
  };

  function zl(a) {
    var b = new M("timeout");
    a.a && a.a.cancel();
    a.a = od(ol.get()).then(function () {
      a.b || (a.g = !0, ul(a, !0, null, b));
    });
  }

  function fl() {}

  fl.prototype.h = function (a, b) {
    if (a) {
      var c = a.c,
          d = a.b;
      a.a ? (b.ja(a.c, null, a.a, a.b), D()) : b.Ba(c, d) ? Al(a, b) : E(new M("invalid-auth-event"));
    } else E(new M("invalid-auth-event"));
  };

  function Al(a, b) {
    var c = a.b,
        d = a.c;
    b.Ba(d, c)(a.g, a.f, a.R(), a.i).then(function (e) {
      b.ja(d, e, null, c);
    }).s(function (e) {
      b.ja(d, null, e, c);
    });
  }

  ;

  function Bl() {
    this.vb = !1;
    Object.defineProperty(this, "appVerificationDisabled", {
      get: function () {
        return this.vb;
      },
      set: function (a) {
        this.vb = a;
      },
      enumerable: !1
    });
  }

  ;

  function Cl(a, b) {
    this.a = b;
    K(this, "verificationId", a);
  }

  Cl.prototype.confirm = function (a) {
    a = Wg(this.verificationId, a);
    return this.a(a);
  };

  function Dl(a, b, c, d) {
    return new Ug(a).Wa(b, c).then(function (e) {
      return new Cl(e, d);
    });
  }

  ;

  function El(a) {
    var b = Tf(a);
    if (!(b && b.exp && b.auth_time && b.iat)) throw new M("internal-error", "An internal error occurred. The token obtained by Firebase appears to be malformed. Please retry the operation.");
    L(this, {
      token: a,
      expirationTime: Te(1E3 * b.exp),
      authTime: Te(1E3 * b.auth_time),
      issuedAtTime: Te(1E3 * b.iat),
      signInProvider: b.firebase && b.firebase.sign_in_provider ? b.firebase.sign_in_provider : null,
      claims: b
    });
  }

  ;

  function Fl(a, b, c) {
    this.h = a;
    this.i = b;
    this.g = c;
    this.c = 3E4;
    this.f = 96E4;
    this.b = null;
    this.a = this.c;
    if (this.f < this.c) throw Error("Proactive refresh lower bound greater than upper bound!");
  }

  Fl.prototype.start = function () {
    this.a = this.c;
    Gl(this, !0);
  };

  function Hl(a, b) {
    if (b) return a.a = a.c, a.g();
    b = a.a;
    a.a *= 2;
    a.a > a.f && (a.a = a.f);
    return b;
  }

  function Gl(a, b) {
    a.stop();
    a.b = od(Hl(a, b)).then(function () {
      return Se();
    }).then(function () {
      return a.h();
    }).then(function () {
      Gl(a, !0);
    }).s(function (c) {
      a.i(c) && Gl(a, !1);
    });
  }

  Fl.prototype.stop = function () {
    this.b && (this.b.cancel(), this.b = null);
  };

  function Il(a) {
    this.f = a;
    this.b = this.a = null;
    this.c = 0;
  }

  Il.prototype.A = function () {
    return {
      apiKey: this.f.c,
      refreshToken: this.a,
      accessToken: this.b,
      expirationTime: this.c
    };
  };

  function Jl(a, b) {
    var c = b[mg],
        d = b.refreshToken;
    b = Kl(b.expiresIn);
    a.b = c;
    a.c = b;
    a.a = d;
  }

  function Ll(a, b) {
    a.b = b.b;
    a.a = b.a;
    a.c = b.c;
  }

  function Kl(a) {
    return va() + 1E3 * parseInt(a, 10);
  }

  function Ml(a, b) {
    return Ai(a.f, b).then(function (c) {
      a.b = c.access_token;
      a.c = Kl(c.expires_in);
      a.a = c.refresh_token;
      return {
        accessToken: a.b,
        expirationTime: a.c,
        refreshToken: a.a
      };
    }).s(function (c) {
      "auth/user-token-expired" == c.code && (a.a = null);
      throw c;
    });
  }

  Il.prototype.getToken = function (a) {
    a = !!a;
    return this.b && !this.a ? E(new M("user-token-expired")) : a || !this.b || va() > this.c - 3E4 ? this.a ? Ml(this, {
      grant_type: "refresh_token",
      refresh_token: this.a
    }) : D(null) : D({
      accessToken: this.b,
      expirationTime: this.c,
      refreshToken: this.a
    });
  };

  function Nl(a, b) {
    this.a = a || null;
    this.b = b || null;
    L(this, {
      lastSignInTime: Te(b || null),
      creationTime: Te(a || null)
    });
  }

  function Ol(a) {
    return new Nl(a.a, a.b);
  }

  Nl.prototype.A = function () {
    return {
      lastLoginAt: this.b,
      createdAt: this.a
    };
  };

  function Pl(a, b, c, d, e, f) {
    L(this, {
      uid: a,
      displayName: d || null,
      photoURL: e || null,
      email: c || null,
      phoneNumber: f || null,
      providerId: b
    });
  }

  function Ql(a, b) {
    F.call(this, a);

    for (var c in b) this[c] = b[c];
  }

  v(Ql, F);

  function Q(a, b, c) {
    this.I = [];
    this.l = a.apiKey;
    this.m = a.appName;
    this.o = a.authDomain || null;
    a = _app.default.SDK_VERSION ? Fe(_app.default.SDK_VERSION) : null;
    this.a = new oi(this.l, Vf(Wf), a);
    this.b = new Il(this.a);
    Rl(this, b[mg]);
    Jl(this.b, b);
    K(this, "refreshToken", this.b.a);
    Sl(this, c || {});
    G.call(this);
    this.J = !1;
    this.o && Ie() && (this.i = tl(this.o, this.l, this.m));
    this.O = [];
    this.h = null;
    this.w = Tl(this);
    this.W = t(this.Ja, this);
    var d = this;
    this.ga = null;

    this.xa = function (e) {
      d.ua(e.g);
    };

    this.Z = null;
    this.P = [];

    this.wa = function (e) {
      Ul(d, e.c);
    };

    this.Y = null;
  }

  v(Q, G);

  Q.prototype.ua = function (a) {
    this.ga = a;
    ui(this.a, a);
  };

  Q.prototype.ha = function () {
    return this.ga;
  };

  function Vl(a, b) {
    a.Z && gd(a.Z, "languageCodeChanged", a.xa);
    (a.Z = b) && Xc(b, "languageCodeChanged", a.xa);
  }

  function Ul(a, b) {
    a.P = b;
    vi(a.a, _app.default.SDK_VERSION ? Fe(_app.default.SDK_VERSION, a.P) : null);
  }

  Q.prototype.Ca = function () {
    return Sa(this.P);
  };

  function Wl(a, b) {
    a.Y && gd(a.Y, "frameworkChanged", a.wa);
    (a.Y = b) && Xc(b, "frameworkChanged", a.wa);
  }

  Q.prototype.Ja = function () {
    this.w.b && (this.w.stop(), this.w.start());
  };

  function Xl(a) {
    try {
      return _app.default.app(a.m).auth();
    } catch (b) {
      throw new M("internal-error", "No firebase.auth.Auth instance is available for the Firebase App '" + a.m + "'!");
    }
  }

  function Tl(a) {
    return new Fl(function () {
      return a.G(!0);
    }, function (b) {
      return b && "auth/network-request-failed" == b.code ? !0 : !1;
    }, function () {
      var b = a.b.c - va() - 3E5;
      return 0 < b ? b : 0;
    });
  }

  function Yl(a) {
    a.B || a.w.b || (a.w.start(), gd(a, "tokenChanged", a.W), Xc(a, "tokenChanged", a.W));
  }

  function Zl(a) {
    gd(a, "tokenChanged", a.W);
    a.w.stop();
  }

  function Rl(a, b) {
    a.ma = b;
    K(a, "_lat", b);
  }

  function $l(a, b) {
    Qa(a.O, function (c) {
      return c == b;
    });
  }

  function am(a) {
    for (var b = [], c = 0; c < a.O.length; c++) b.push(a.O[c](a));

    return cc(b).then(function () {
      return a;
    });
  }

  function bm(a) {
    a.i && !a.J && (a.J = !0, ll(a.i, a));
  }

  function Sl(a, b) {
    L(a, {
      uid: b.uid,
      displayName: b.displayName || null,
      photoURL: b.photoURL || null,
      email: b.email || null,
      emailVerified: b.emailVerified || !1,
      phoneNumber: b.phoneNumber || null,
      isAnonymous: b.isAnonymous || !1,
      tenantId: b.tenantId || null,
      metadata: new Nl(b.createdAt, b.lastLoginAt),
      providerData: []
    });
    a.a.b = a.tenantId;
  }

  K(Q.prototype, "providerId", "firebase");

  function cm() {}

  function dm(a) {
    return D().then(function () {
      if (a.B) throw new M("app-deleted");
    });
  }

  function em(a) {
    return Ka(a.providerData, function (b) {
      return b.providerId;
    });
  }

  function fm(a, b) {
    b && (gm(a, b.providerId), a.providerData.push(b));
  }

  function gm(a, b) {
    Qa(a.providerData, function (c) {
      return c.providerId == b;
    });
  }

  function hm(a, b, c) {
    ("uid" != b || c) && a.hasOwnProperty(b) && K(a, b, c);
  }

  function im(a, b) {
    a != b && (L(a, {
      uid: b.uid,
      displayName: b.displayName,
      photoURL: b.photoURL,
      email: b.email,
      emailVerified: b.emailVerified,
      phoneNumber: b.phoneNumber,
      isAnonymous: b.isAnonymous,
      tenantId: b.tenantId,
      providerData: []
    }), b.metadata ? K(a, "metadata", Ol(b.metadata)) : K(a, "metadata", new Nl()), x(b.providerData, function (c) {
      fm(a, c);
    }), Ll(a.b, b.b), K(a, "refreshToken", a.b.a));
  }

  k = Q.prototype;

  k.reload = function () {
    var a = this;
    return R(this, dm(this).then(function () {
      return jm(a).then(function () {
        return am(a);
      }).then(cm);
    }));
  };

  function jm(a) {
    return a.G().then(function (b) {
      var c = a.isAnonymous;
      return km(a, b).then(function () {
        c || hm(a, "isAnonymous", !1);
        return b;
      });
    });
  }

  k.dc = function (a) {
    return this.G(a).then(function (b) {
      return new El(b);
    });
  };

  k.G = function (a) {
    var b = this;
    return R(this, dm(this).then(function () {
      return b.b.getToken(a);
    }).then(function (c) {
      if (!c) throw new M("internal-error");
      c.accessToken != b.ma && (Rl(b, c.accessToken), b.dispatchEvent(new Ql("tokenChanged")));
      hm(b, "refreshToken", c.refreshToken);
      return c.accessToken;
    }));
  };

  function lm(a, b) {
    b[mg] && a.ma != b[mg] && (Jl(a.b, b), a.dispatchEvent(new Ql("tokenChanged")), Rl(a, b[mg]), hm(a, "refreshToken", a.b.a));
  }

  function km(a, b) {
    return P(a.a, hj, {
      idToken: b
    }).then(t(a.zc, a));
  }

  k.zc = function (a) {
    a = a.users;
    if (!a || !a.length) throw new M("internal-error");
    a = a[0];
    Sl(this, {
      uid: a.localId,
      displayName: a.displayName,
      photoURL: a.photoUrl,
      email: a.email,
      emailVerified: !!a.emailVerified,
      phoneNumber: a.phoneNumber,
      lastLoginAt: a.lastLoginAt,
      createdAt: a.createdAt,
      tenantId: a.tenantId
    });

    for (var b = mm(a), c = 0; c < b.length; c++) fm(this, b[c]);

    hm(this, "isAnonymous", !(this.email && a.passwordHash) && !(this.providerData && this.providerData.length));
  };

  function mm(a) {
    return (a = a.providerUserInfo) && a.length ? Ka(a, function (b) {
      return new Pl(b.rawId, b.providerId, b.email, b.displayName, b.photoUrl, b.phoneNumber);
    }) : [];
  }

  k.Ac = function (a) {
    Ye("firebase.User.prototype.reauthenticateAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.reauthenticateWithCredential instead.");
    return this.hb(a);
  };

  k.hb = function (a) {
    var b = this,
        c = null;
    return R(this, a.f(this.a, this.uid).then(function (d) {
      lm(b, d);
      c = nm(b, d, "reauthenticate");
      b.h = null;
      return b.reload();
    }).then(function () {
      return c;
    }), !0);
  };

  function om(a, b) {
    return jm(a).then(function () {
      if (Oa(em(a), b)) return am(a).then(function () {
        throw new M("provider-already-linked");
      });
    });
  }

  k.rc = function (a) {
    Ye("firebase.User.prototype.linkAndRetrieveDataWithCredential is deprecated. Please use firebase.User.prototype.linkWithCredential instead.");
    return this.fb(a);
  };

  k.fb = function (a) {
    var b = this,
        c = null;
    return R(this, om(this, a.providerId).then(function () {
      return b.G();
    }).then(function (d) {
      return a.b(b.a, d);
    }).then(function (d) {
      c = nm(b, d, "link");
      return pm(b, d);
    }).then(function () {
      return c;
    }));
  };

  k.sc = function (a, b) {
    var c = this;
    return R(this, om(this, "phone").then(function () {
      return Dl(Xl(c), a, b, t(c.fb, c));
    }));
  };

  k.Bc = function (a, b) {
    var c = this;
    return R(this, D().then(function () {
      return Dl(Xl(c), a, b, t(c.hb, c));
    }), !0);
  };

  function nm(a, b, c) {
    var d = Xg(b);
    b = ag(b);
    return af({
      user: a,
      credential: d,
      additionalUserInfo: b,
      operationType: c
    });
  }

  function pm(a, b) {
    lm(a, b);
    return a.reload().then(function () {
      return a;
    });
  }

  k.rb = function (a) {
    var b = this;
    return R(this, this.G().then(function (c) {
      return b.a.rb(c, a);
    }).then(function (c) {
      lm(b, c);
      return b.reload();
    }));
  };

  k.Sc = function (a) {
    var b = this;
    return R(this, this.G().then(function (c) {
      return a.b(b.a, c);
    }).then(function (c) {
      lm(b, c);
      return b.reload();
    }));
  };

  k.sb = function (a) {
    var b = this;
    return R(this, this.G().then(function (c) {
      return b.a.sb(c, a);
    }).then(function (c) {
      lm(b, c);
      return b.reload();
    }));
  };

  k.tb = function (a) {
    if (void 0 === a.displayName && void 0 === a.photoURL) return dm(this);
    var b = this;
    return R(this, this.G().then(function (c) {
      return b.a.tb(c, {
        displayName: a.displayName,
        photoUrl: a.photoURL
      });
    }).then(function (c) {
      lm(b, c);
      hm(b, "displayName", c.displayName || null);
      hm(b, "photoURL", c.photoUrl || null);
      x(b.providerData, function (d) {
        "password" === d.providerId && (K(d, "displayName", b.displayName), K(d, "photoURL", b.photoURL));
      });
      return am(b);
    }).then(cm));
  };

  k.Qc = function (a) {
    var b = this;
    return R(this, jm(this).then(function (c) {
      return Oa(em(b), a) ? Ti(b.a, c, [a]).then(function (d) {
        var e = {};
        x(d.providerUserInfo || [], function (f) {
          e[f.providerId] = !0;
        });
        x(em(b), function (f) {
          e[f] || gm(b, f);
        });
        e[Ug.PROVIDER_ID] || K(b, "phoneNumber", null);
        return am(b);
      }) : am(b).then(function () {
        throw new M("no-such-provider");
      });
    }));
  };

  k.delete = function () {
    var a = this;
    return R(this, this.G().then(function (b) {
      return P(a.a, gj, {
        idToken: b
      });
    }).then(function () {
      a.dispatchEvent(new Ql("userDeleted"));
    })).then(function () {
      for (var b = 0; b < a.I.length; b++) a.I[b].cancel("app-deleted");

      Vl(a, null);
      Wl(a, null);
      a.I = [];
      a.B = !0;
      Zl(a);
      K(a, "refreshToken", null);
      a.i && ml(a.i, a);
    });
  };

  k.xb = function (a, b) {
    return "linkViaPopup" == a && (this.g || null) == b && this.f || "reauthViaPopup" == a && (this.g || null) == b && this.f || "linkViaRedirect" == a && (this.ca || null) == b || "reauthViaRedirect" == a && (this.ca || null) == b ? !0 : !1;
  };

  k.ja = function (a, b, c, d) {
    "linkViaPopup" != a && "reauthViaPopup" != a || d != (this.g || null) || (c && this.v ? this.v(c) : b && !c && this.f && this.f(b), this.c && (this.c.cancel(), this.c = null), delete this.f, delete this.v);
  };

  k.Ba = function (a, b) {
    return "linkViaPopup" == a && b == (this.g || null) ? t(this.Bb, this) : "reauthViaPopup" == a && b == (this.g || null) ? t(this.Cb, this) : "linkViaRedirect" == a && (this.ca || null) == b ? t(this.Bb, this) : "reauthViaRedirect" == a && (this.ca || null) == b ? t(this.Cb, this) : null;
  };

  k.tc = function (a) {
    var b = this;
    return qm(this, "linkViaPopup", a, function () {
      return om(b, a.providerId).then(function () {
        return am(b);
      });
    }, !1);
  };

  k.Cc = function (a) {
    return qm(this, "reauthViaPopup", a, function () {
      return D();
    }, !0);
  };

  function qm(a, b, c, d, e) {
    if (!Ie()) return E(new M("operation-not-supported-in-this-environment"));
    if (a.h && !e) return E(a.h);
    var f = $f(c.providerId),
        g = He(a.uid + ":::"),
        h = null;
    (!Ke() || ze()) && a.o && c.isOAuthProvider && (h = Cj(a.o, a.l, a.m, b, c, null, g, _app.default.SDK_VERSION || null, null, null, a.tenantId));
    var m = qe(h, f && f.sa, f && f.ra);
    d = d().then(function () {
      rm(a);
      if (!e) return a.G().then(function () {});
    }).then(function () {
      return pl(a.i, m, b, c, g, !!h, a.tenantId);
    }).then(function () {
      return new B(function (p, u) {
        a.ja(b, null, new M("cancelled-popup-request"), a.g || null);
        a.f = p;
        a.v = u;
        a.g = g;
        a.c = rl(a.i, a, b, m, g);
      });
    }).then(function (p) {
      m && pe(m);
      return p ? af(p) : null;
    }).s(function (p) {
      m && pe(m);
      throw p;
    });
    return R(a, d, e);
  }

  k.uc = function (a) {
    var b = this;
    return sm(this, "linkViaRedirect", a, function () {
      return om(b, a.providerId);
    }, !1);
  };

  k.Dc = function (a) {
    return sm(this, "reauthViaRedirect", a, function () {
      return D();
    }, !0);
  };

  function sm(a, b, c, d, e) {
    if (!Ie()) return E(new M("operation-not-supported-in-this-environment"));
    if (a.h && !e) return E(a.h);
    var f = null,
        g = He(a.uid + ":::");
    d = d().then(function () {
      rm(a);
      if (!e) return a.G().then(function () {});
    }).then(function () {
      a.ca = g;
      return am(a);
    }).then(function (h) {
      a.da && (h = a.da, h = h.b.set(tm, a.A(), h.a));
      return h;
    }).then(function () {
      return ql(a.i, b, c, g, a.tenantId);
    }).s(function (h) {
      f = h;
      if (a.da) return um(a.da);
      throw f;
    }).then(function () {
      if (f) throw f;
    });
    return R(a, d, e);
  }

  function rm(a) {
    if (!a.i || !a.J) {
      if (a.i && !a.J) throw new M("internal-error");
      throw new M("auth-domain-config-required");
    }
  }

  k.Bb = function (a, b, c, d) {
    var e = this;
    this.c && (this.c.cancel(), this.c = null);
    var f = null;
    c = this.G().then(function (g) {
      return qg(e.a, {
        requestUri: a,
        postBody: d,
        sessionId: b,
        idToken: g
      });
    }).then(function (g) {
      f = nm(e, g, "link");
      return pm(e, g);
    }).then(function () {
      return f;
    });
    return R(this, c);
  };

  k.Cb = function (a, b, c, d) {
    var e = this;
    this.c && (this.c.cancel(), this.c = null);
    var f = null,
        g = D().then(function () {
      return lg(rg(e.a, {
        requestUri: a,
        sessionId: b,
        postBody: d,
        tenantId: c
      }), e.uid);
    }).then(function (h) {
      f = nm(e, h, "reauthenticate");
      lm(e, h);
      e.h = null;
      return e.reload();
    }).then(function () {
      return f;
    });
    return R(this, g, !0);
  };

  k.jb = function (a) {
    var b = this,
        c = null;
    return R(this, this.G().then(function (d) {
      c = d;
      return "undefined" === typeof a || Ua(a) ? {} : Kf(new Af(a));
    }).then(function (d) {
      return b.a.jb(c, d);
    }).then(function (d) {
      if (b.email != d) return b.reload();
    }).then(function () {}));
  };

  function R(a, b, c) {
    var d = vm(a, b, c);
    a.I.push(d);
    d.ka(function () {
      Pa(a.I, d);
    });
    return d;
  }

  function vm(a, b, c) {
    return a.h && !c ? (b.cancel(), E(a.h)) : b.s(function (d) {
      !d || "auth/user-disabled" != d.code && "auth/user-token-expired" != d.code || (a.h || a.dispatchEvent(new Ql("userInvalidated")), a.h = d);
      throw d;
    });
  }

  k.toJSON = function () {
    return this.A();
  };

  k.A = function () {
    var a = {
      uid: this.uid,
      displayName: this.displayName,
      photoURL: this.photoURL,
      email: this.email,
      emailVerified: this.emailVerified,
      phoneNumber: this.phoneNumber,
      isAnonymous: this.isAnonymous,
      tenantId: this.tenantId,
      providerData: [],
      apiKey: this.l,
      appName: this.m,
      authDomain: this.o,
      stsTokenManager: this.b.A(),
      redirectEventId: this.ca || null
    };
    this.metadata && Xa(a, this.metadata.A());
    x(this.providerData, function (b) {
      a.providerData.push(bf(b));
    });
    return a;
  };

  function wm(a) {
    if (!a.apiKey) return null;
    var b = {
      apiKey: a.apiKey,
      authDomain: a.authDomain,
      appName: a.appName
    },
        c = {};
    if (a.stsTokenManager && a.stsTokenManager.accessToken && a.stsTokenManager.expirationTime) c[mg] = a.stsTokenManager.accessToken, c.refreshToken = a.stsTokenManager.refreshToken || null, c.expiresIn = (a.stsTokenManager.expirationTime - va()) / 1E3;else return null;
    var d = new Q(b, c, a);
    a.providerData && x(a.providerData, function (e) {
      e && fm(d, af(e));
    });
    a.redirectEventId && (d.ca = a.redirectEventId);
    return d;
  }

  function xm(a, b, c, d) {
    var e = new Q(a, b);
    c && (e.da = c);
    d && Ul(e, d);
    return e.reload().then(function () {
      return e;
    });
  }

  function ym(a, b, c, d) {
    b = b || {
      apiKey: a.l,
      authDomain: a.o,
      appName: a.m
    };
    var e = a.b,
        f = {};
    f[mg] = e.b;
    f.refreshToken = e.a;
    f.expiresIn = (e.c - va()) / 1E3;
    b = new Q(b, f);
    c && (b.da = c);
    d && Ul(b, d);
    im(b, a);
    return b;
  }

  ;

  function zm(a) {
    this.a = a;
    this.b = sk();
  }

  var tm = {
    name: "redirectUser",
    C: "session"
  };

  function um(a) {
    return wk(a.b, tm, a.a);
  }

  function Am(a, b) {
    return a.b.get(tm, a.a).then(function (c) {
      c && b && (c.authDomain = b);
      return wm(c || {});
    });
  }

  ;

  function Bm(a) {
    this.a = a;
    this.b = sk();
    this.c = null;
    this.f = Cm(this);
    this.b.addListener(Dm("local"), this.a, t(this.g, this));
  }

  Bm.prototype.g = function () {
    var a = this,
        b = Dm("local");
    Em(this, function () {
      return D().then(function () {
        return a.c && "local" != a.c.C ? a.b.get(b, a.a) : null;
      }).then(function (c) {
        if (c) return Fm(a, "local").then(function () {
          a.c = b;
        });
      });
    });
  };

  function Fm(a, b) {
    var c = [],
        d;

    for (d in ok) ok[d] !== b && c.push(wk(a.b, Dm(ok[d]), a.a));

    c.push(wk(a.b, Gm, a.a));
    return bc(c);
  }

  function Cm(a) {
    var b = Dm("local"),
        c = Dm("session"),
        d = Dm("none");
    return vk(a.b, b, a.a).then(function () {
      return a.b.get(c, a.a);
    }).then(function (e) {
      return e ? c : a.b.get(d, a.a).then(function (f) {
        return f ? d : a.b.get(b, a.a).then(function (g) {
          return g ? b : a.b.get(Gm, a.a).then(function (h) {
            return h ? Dm(h) : b;
          });
        });
      });
    }).then(function (e) {
      a.c = e;
      return Fm(a, e.C);
    }).s(function () {
      a.c || (a.c = b);
    });
  }

  var Gm = {
    name: "persistence",
    C: "session"
  };

  function Dm(a) {
    return {
      name: "authUser",
      C: a
    };
  }

  Bm.prototype.mb = function (a) {
    var b = null,
        c = this;
    pk(a);
    return Em(this, function () {
      return a != c.c.C ? c.b.get(c.c, c.a).then(function (d) {
        b = d;
        return Fm(c, a);
      }).then(function () {
        c.c = Dm(a);
        if (b) return c.b.set(c.c, b, c.a);
      }) : D();
    });
  };

  function Hm(a) {
    return Em(a, function () {
      return a.b.set(Gm, a.c.C, a.a);
    });
  }

  function Im(a, b) {
    return Em(a, function () {
      return a.b.set(a.c, b.A(), a.a);
    });
  }

  function Jm(a) {
    return Em(a, function () {
      return wk(a.b, a.c, a.a);
    });
  }

  function Km(a, b) {
    return Em(a, function () {
      return a.b.get(a.c, a.a).then(function (c) {
        c && b && (c.authDomain = b);
        return wm(c || {});
      });
    });
  }

  function Em(a, b) {
    a.f = a.f.then(b, b);
    return a.f;
  }

  ;

  function Lm(a) {
    this.l = !1;
    K(this, "settings", new Bl());
    K(this, "app", a);
    if (S(this).options && S(this).options.apiKey) a = _app.default.SDK_VERSION ? Fe(_app.default.SDK_VERSION) : null, this.b = new oi(S(this).options && S(this).options.apiKey, Vf(Wf), a);else throw new M("invalid-api-key");
    this.O = [];
    this.m = [];
    this.J = [];
    this.Ub = _app.default.INTERNAL.createSubscribe(t(this.oc, this));
    this.W = void 0;
    this.Vb = _app.default.INTERNAL.createSubscribe(t(this.pc, this));
    Mm(this, null);
    this.h = new Bm(S(this).options.apiKey + ":" + S(this).name);
    this.w = new zm(S(this).options.apiKey + ":" + S(this).name);
    this.Y = T(this, Nm(this));
    this.i = T(this, Om(this));
    this.ga = !1;
    this.ma = t(this.Nc, this);
    this.ub = t(this.aa, this);
    this.wa = t(this.bc, this);
    this.xa = t(this.mc, this);
    this.Ja = t(this.nc, this);
    this.a = null;
    Pm(this);
    this.INTERNAL = {};
    this.INTERNAL["delete"] = t(this.delete, this);
    this.INTERNAL.logFramework = t(this.vc, this);
    this.o = 0;
    G.call(this);
    Qm(this);
    this.I = [];
  }

  v(Lm, G);

  function Rm(a) {
    F.call(this, "languageCodeChanged");
    this.g = a;
  }

  v(Rm, F);

  function Sm(a) {
    F.call(this, "frameworkChanged");
    this.c = a;
  }

  v(Sm, F);
  k = Lm.prototype;

  k.mb = function (a) {
    a = this.h.mb(a);
    return T(this, a);
  };

  k.ua = function (a) {
    this.Z === a || this.l || (this.Z = a, ui(this.b, this.Z), this.dispatchEvent(new Rm(this.ha())));
  };

  k.ha = function () {
    return this.Z;
  };

  k.Tc = function () {
    var a = l.navigator;
    this.ua(a ? a.languages && a.languages[0] || a.language || a.userLanguage || null : null);
  };

  k.vc = function (a) {
    this.I.push(a);
    vi(this.b, _app.default.SDK_VERSION ? Fe(_app.default.SDK_VERSION, this.I) : null);
    this.dispatchEvent(new Sm(this.I));
  };

  k.Ca = function () {
    return Sa(this.I);
  };

  k.nb = function (a) {
    this.P === a || this.l || (this.P = a, this.b.b = this.P);
  };

  k.R = function () {
    return this.P;
  };

  function Qm(a) {
    Object.defineProperty(a, "lc", {
      get: function () {
        return this.ha();
      },
      set: function (b) {
        this.ua(b);
      },
      enumerable: !1
    });
    a.Z = null;
    Object.defineProperty(a, "ti", {
      get: function () {
        return this.R();
      },
      set: function (b) {
        this.nb(b);
      },
      enumerable: !1
    });
    a.P = null;
  }

  k.toJSON = function () {
    return {
      apiKey: S(this).options.apiKey,
      authDomain: S(this).options.authDomain,
      appName: S(this).name,
      currentUser: U(this) && U(this).A()
    };
  };

  function Tm(a) {
    return a.Tb || E(new M("auth-domain-config-required"));
  }

  function Pm(a) {
    var b = S(a).options.authDomain,
        c = S(a).options.apiKey;
    b && Ie() && (a.Tb = a.Y.then(function () {
      if (!a.l) {
        a.a = tl(b, c, S(a).name);
        ll(a.a, a);
        U(a) && bm(U(a));

        if (a.B) {
          bm(a.B);
          var d = a.B;
          d.ua(a.ha());
          Vl(d, a);
          d = a.B;
          Ul(d, a.I);
          Wl(d, a);
          a.B = null;
        }

        return a.a;
      }
    }));
  }

  k.xb = function (a, b) {
    switch (a) {
      case "unknown":
      case "signInViaRedirect":
        return !0;

      case "signInViaPopup":
        return this.g == b && !!this.f;

      default:
        return !1;
    }
  };

  k.ja = function (a, b, c, d) {
    "signInViaPopup" == a && this.g == d && (c && this.v ? this.v(c) : b && !c && this.f && this.f(b), this.c && (this.c.cancel(), this.c = null), delete this.f, delete this.v);
  };

  k.Ba = function (a, b) {
    return "signInViaRedirect" == a || "signInViaPopup" == a && this.g == b && this.f ? t(this.ac, this) : null;
  };

  k.ac = function (a, b, c, d) {
    var e = this;
    a = {
      requestUri: a,
      postBody: d,
      sessionId: b,
      tenantId: c
    };
    this.c && (this.c.cancel(), this.c = null);
    var f = null,
        g = null,
        h = og(e.b, a).then(function (m) {
      f = Xg(m);
      g = ag(m);
      return m;
    });
    a = e.Y.then(function () {
      return h;
    }).then(function (m) {
      return Um(e, m);
    }).then(function () {
      return af({
        user: U(e),
        credential: f,
        additionalUserInfo: g,
        operationType: "signIn"
      });
    });
    return T(this, a);
  };

  k.Lc = function (a) {
    if (!Ie()) return E(new M("operation-not-supported-in-this-environment"));
    var b = this,
        c = $f(a.providerId),
        d = He(),
        e = null;
    (!Ke() || ze()) && S(this).options.authDomain && a.isOAuthProvider && (e = Cj(S(this).options.authDomain, S(this).options.apiKey, S(this).name, "signInViaPopup", a, null, d, _app.default.SDK_VERSION || null, null, null, this.R()));
    var f = qe(e, c && c.sa, c && c.ra);
    c = Tm(this).then(function (g) {
      return pl(g, f, "signInViaPopup", a, d, !!e, b.R());
    }).then(function () {
      return new B(function (g, h) {
        b.ja("signInViaPopup", null, new M("cancelled-popup-request"), b.g);
        b.f = g;
        b.v = h;
        b.g = d;
        b.c = rl(b.a, b, "signInViaPopup", f, d);
      });
    }).then(function (g) {
      f && pe(f);
      return g ? af(g) : null;
    }).s(function (g) {
      f && pe(f);
      throw g;
    });
    return T(this, c);
  };

  k.Mc = function (a) {
    if (!Ie()) return E(new M("operation-not-supported-in-this-environment"));
    var b = this,
        c = Tm(this).then(function () {
      return Hm(b.h);
    }).then(function () {
      return ql(b.a, "signInViaRedirect", a, void 0, b.R());
    });
    return T(this, c);
  };

  function Vm(a) {
    if (!Ie()) return E(new M("operation-not-supported-in-this-environment"));
    var b = Tm(a).then(function () {
      return a.a.oa();
    }).then(function (c) {
      return c ? af(c) : null;
    });
    return T(a, b);
  }

  k.oa = function () {
    var a = this;
    return Vm(this).then(function (b) {
      a.a && wl(a.a.b);
      return b;
    }).s(function (b) {
      a.a && wl(a.a.b);
      throw b;
    });
  };

  k.Rc = function (a) {
    if (!a) return E(new M("null-user"));
    if (this.P != a.tenantId) return E(new M("tenant-id-mismatch"));
    var b = this,
        c = {};
    c.apiKey = S(this).options.apiKey;
    c.authDomain = S(this).options.authDomain;
    c.appName = S(this).name;
    var d = ym(a, c, b.w, b.Ca());
    return T(this, this.i.then(function () {
      if (S(b).options.apiKey != a.l) return d.reload();
    }).then(function () {
      if (U(b) && a.uid == U(b).uid) return im(U(b), a), b.aa(a);
      Mm(b, d);
      bm(d);
      return b.aa(d);
    }).then(function () {
      Wm(b);
    }));
  };

  function Um(a, b) {
    var c = {};
    c.apiKey = S(a).options.apiKey;
    c.authDomain = S(a).options.authDomain;
    c.appName = S(a).name;
    return a.Y.then(function () {
      return xm(c, b, a.w, a.Ca());
    }).then(function (d) {
      if (U(a) && d.uid == U(a).uid) return im(U(a), d), a.aa(d);
      Mm(a, d);
      bm(d);
      return a.aa(d);
    }).then(function () {
      Wm(a);
    });
  }

  function Mm(a, b) {
    U(a) && ($l(U(a), a.ub), gd(U(a), "tokenChanged", a.wa), gd(U(a), "userDeleted", a.xa), gd(U(a), "userInvalidated", a.Ja), Zl(U(a)));
    b && (b.O.push(a.ub), Xc(b, "tokenChanged", a.wa), Xc(b, "userDeleted", a.xa), Xc(b, "userInvalidated", a.Ja), 0 < a.o && Yl(b));
    K(a, "currentUser", b);
    b && (b.ua(a.ha()), Vl(b, a), Ul(b, a.I), Wl(b, a));
  }

  k.pb = function () {
    var a = this,
        b = this.i.then(function () {
      a.a && wl(a.a.b);
      if (!U(a)) return D();
      Mm(a, null);
      return Jm(a.h).then(function () {
        Wm(a);
      });
    });
    return T(this, b);
  };

  function Xm(a) {
    var b = Am(a.w, S(a).options.authDomain).then(function (c) {
      if (a.B = c) c.da = a.w;
      return um(a.w);
    });
    return T(a, b);
  }

  function Nm(a) {
    var b = S(a).options.authDomain,
        c = Xm(a).then(function () {
      return Km(a.h, b);
    }).then(function (d) {
      return d ? (d.da = a.w, a.B && (a.B.ca || null) == (d.ca || null) ? d : d.reload().then(function () {
        return Im(a.h, d).then(function () {
          return d;
        });
      }).s(function (e) {
        return "auth/network-request-failed" == e.code ? d : Jm(a.h);
      })) : null;
    }).then(function (d) {
      Mm(a, d || null);
    });
    return T(a, c);
  }

  function Om(a) {
    return a.Y.then(function () {
      return Vm(a);
    }).s(function () {}).then(function () {
      if (!a.l) return a.ma();
    }).s(function () {}).then(function () {
      if (!a.l) {
        a.ga = !0;
        var b = a.h;
        b.b.addListener(Dm("local"), b.a, a.ma);
      }
    });
  }

  k.Nc = function () {
    var a = this;
    return Km(this.h, S(this).options.authDomain).then(function (b) {
      if (!a.l) {
        var c;

        if (c = U(a) && b) {
          c = U(a).uid;
          var d = b.uid;
          c = void 0 === c || null === c || "" === c || void 0 === d || null === d || "" === d ? !1 : c == d;
        }

        if (c) return im(U(a), b), U(a).G();
        if (U(a) || b) Mm(a, b), b && (bm(b), b.da = a.w), a.a && ll(a.a, a), Wm(a);
      }
    });
  };

  k.aa = function (a) {
    return Im(this.h, a);
  };

  k.bc = function () {
    Wm(this);
    this.aa(U(this));
  };

  k.mc = function () {
    this.pb();
  };

  k.nc = function () {
    this.pb();
  };

  function Ym(a, b) {
    var c = null,
        d = null;
    return T(a, b.then(function (e) {
      c = Xg(e);
      d = ag(e);
      return Um(a, e);
    }).then(function () {
      return af({
        user: U(a),
        credential: c,
        additionalUserInfo: d,
        operationType: "signIn"
      });
    }));
  }

  k.oc = function (a) {
    var b = this;
    this.addAuthTokenListener(function () {
      a.next(U(b));
    });
  };

  k.pc = function (a) {
    var b = this;
    Zm(this, function () {
      a.next(U(b));
    });
  };

  k.xc = function (a, b, c) {
    var d = this;
    this.ga && Promise.resolve().then(function () {
      q(a) ? a(U(d)) : q(a.next) && a.next(U(d));
    });
    return this.Ub(a, b, c);
  };

  k.wc = function (a, b, c) {
    var d = this;
    this.ga && Promise.resolve().then(function () {
      d.W = d.getUid();
      q(a) ? a(U(d)) : q(a.next) && a.next(U(d));
    });
    return this.Vb(a, b, c);
  };

  k.cc = function (a) {
    var b = this,
        c = this.i.then(function () {
      return U(b) ? U(b).G(a).then(function (d) {
        return {
          accessToken: d
        };
      }) : null;
    });
    return T(this, c);
  };

  k.Hc = function (a) {
    var b = this;
    return this.i.then(function () {
      return Ym(b, P(b.b, jj, {
        token: a
      }));
    }).then(function (c) {
      var d = c.user;
      hm(d, "isAnonymous", !1);
      b.aa(d);
      return c;
    });
  };

  k.Ic = function (a, b) {
    var c = this;
    return this.i.then(function () {
      return Ym(c, P(c.b, Jg, {
        email: a,
        password: b
      }));
    });
  };

  k.Xb = function (a, b) {
    var c = this;
    return this.i.then(function () {
      return Ym(c, P(c.b, fj, {
        email: a,
        password: b
      }));
    });
  };

  k.Sa = function (a) {
    var b = this;
    return this.i.then(function () {
      return Ym(b, a.na(b.b));
    });
  };

  k.Gc = function (a) {
    Ye("firebase.auth.Auth.prototype.signInAndRetrieveDataWithCredential is deprecated. Please use firebase.auth.Auth.prototype.signInWithCredential instead.");
    return this.Sa(a);
  };

  k.ob = function () {
    var a = this;
    return this.i.then(function () {
      var b = U(a);

      if (b && b.isAnonymous) {
        var c = af({
          providerId: null,
          isNewUser: !1
        });
        return af({
          user: b,
          credential: null,
          additionalUserInfo: c,
          operationType: "signIn"
        });
      }

      return Ym(a, a.b.ob()).then(function (d) {
        var e = d.user;
        hm(e, "isAnonymous", !0);
        a.aa(e);
        return d;
      });
    });
  };

  function S(a) {
    return a.app;
  }

  function U(a) {
    return a.currentUser;
  }

  k.getUid = function () {
    return U(this) && U(this).uid || null;
  };

  function $m(a) {
    return U(a) && U(a)._lat || null;
  }

  function Wm(a) {
    if (a.ga) {
      for (var b = 0; b < a.m.length; b++) if (a.m[b]) a.m[b]($m(a));

      if (a.W !== a.getUid() && a.J.length) for (a.W = a.getUid(), b = 0; b < a.J.length; b++) if (a.J[b]) a.J[b]($m(a));
    }
  }

  k.Wb = function (a) {
    this.addAuthTokenListener(a);
    this.o++;
    0 < this.o && U(this) && Yl(U(this));
  };

  k.Ec = function (a) {
    var b = this;
    x(this.m, function (c) {
      c == a && b.o--;
    });
    0 > this.o && (this.o = 0);
    0 == this.o && U(this) && Zl(U(this));
    this.removeAuthTokenListener(a);
  };

  k.addAuthTokenListener = function (a) {
    var b = this;
    this.m.push(a);
    T(this, this.i.then(function () {
      b.l || Oa(b.m, a) && a($m(b));
    }));
  };

  k.removeAuthTokenListener = function (a) {
    Qa(this.m, function (b) {
      return b == a;
    });
  };

  function Zm(a, b) {
    a.J.push(b);
    T(a, a.i.then(function () {
      !a.l && Oa(a.J, b) && a.W !== a.getUid() && (a.W = a.getUid(), b($m(a)));
    }));
  }

  k.delete = function () {
    this.l = !0;

    for (var a = 0; a < this.O.length; a++) this.O[a].cancel("app-deleted");

    this.O = [];
    this.h && (a = this.h, a.b.removeListener(Dm("local"), a.a, this.ma));
    this.a && (ml(this.a, this), wl(this.a.b));
    return Promise.resolve();
  };

  function T(a, b) {
    a.O.push(b);
    b.ka(function () {
      Pa(a.O, b);
    });
    return b;
  }

  k.$b = function (a) {
    return T(this, Fi(this.b, a));
  };

  k.qc = function (a) {
    return !!Og(a);
  };

  k.lb = function (a, b) {
    var c = this;
    return T(this, D().then(function () {
      var d = new Af(b);
      if (!d.c) throw new M("argument-error", If + " must be true when sending sign in link to email");
      return Kf(d);
    }).then(function (d) {
      return c.b.lb(a, d);
    }).then(function () {}));
  };

  k.Uc = function (a) {
    return this.Ma(a).then(function (b) {
      return b.data.email;
    });
  };

  k.ab = function (a, b) {
    return T(this, this.b.ab(a, b).then(function () {}));
  };

  k.Ma = function (a) {
    return T(this, this.b.Ma(a).then(function (b) {
      return new ef(b);
    }));
  };

  k.Ya = function (a) {
    return T(this, this.b.Ya(a).then(function () {}));
  };

  k.kb = function (a, b) {
    var c = this;
    return T(this, D().then(function () {
      return "undefined" === typeof b || Ua(b) ? {} : Kf(new Af(b));
    }).then(function (d) {
      return c.b.kb(a, d);
    }).then(function () {}));
  };

  k.Kc = function (a, b) {
    return T(this, Dl(this, a, b, t(this.Sa, this)));
  };

  k.Jc = function (a, b) {
    var c = this;
    return T(this, D().then(function () {
      var d = b || ie(),
          e = Ng(a, d);
      d = Og(d);
      if (!d) throw new M("argument-error", "Invalid email link!");
      if (d.tenantId !== c.R()) throw new M("tenant-id-mismatch");
      return c.Sa(e);
    }));
  };

  function an() {}

  an.prototype.render = function () {};

  an.prototype.reset = function () {};

  an.prototype.getResponse = function () {};

  an.prototype.execute = function () {};

  function bn() {
    this.a = {};
    this.b = 1E12;
  }

  var cn = null;

  bn.prototype.render = function (a, b) {
    this.a[this.b.toString()] = new dn(a, b);
    return this.b++;
  };

  bn.prototype.reset = function (a) {
    var b = en(this, a);
    a = fn(a);
    b && a && (b.delete(), delete this.a[a]);
  };

  bn.prototype.getResponse = function (a) {
    return (a = en(this, a)) ? a.getResponse() : null;
  };

  bn.prototype.execute = function (a) {
    (a = en(this, a)) && a.execute();
  };

  function en(a, b) {
    return (b = fn(b)) ? a.a[b] || null : null;
  }

  function fn(a) {
    return (a = "undefined" === typeof a ? 1E12 : a) ? a.toString() : null;
  }

  function dn(a, b) {
    this.g = !1;
    this.c = b;
    this.a = this.b = null;
    this.h = "invisible" !== this.c.size;
    this.f = Wd(a);
    var c = this;

    this.i = function () {
      c.execute();
    };

    this.h ? this.execute() : Xc(this.f, "click", this.i);
  }

  dn.prototype.getResponse = function () {
    gn(this);
    return this.b;
  };

  dn.prototype.execute = function () {
    gn(this);
    var a = this;
    this.a || (this.a = setTimeout(function () {
      a.b = De();
      var b = a.c.callback,
          c = a.c["expired-callback"];
      if (b) try {
        b(a.b);
      } catch (d) {}
      a.a = setTimeout(function () {
        a.a = null;
        a.b = null;
        if (c) try {
          c();
        } catch (d) {}
        a.h && a.execute();
      }, 6E4);
    }, 500));
  };

  dn.prototype.delete = function () {
    gn(this);
    this.g = !0;
    clearTimeout(this.a);
    this.a = null;
    gd(this.f, "click", this.i);
  };

  function gn(a) {
    if (a.g) throw Error("reCAPTCHA mock was already deleted!");
  }

  ;

  function hn() {}

  hn.prototype.g = function () {
    cn || (cn = new bn());
    return D(cn);
  };

  hn.prototype.c = function () {};

  var jn = null;

  function kn() {
    this.b = l.grecaptcha ? Infinity : 0;
    this.f = null;
    this.a = "__rcb" + Math.floor(1E6 * Math.random()).toString();
  }

  var ln = new Ya(Za, "https://www.google.com/recaptcha/api.js?onload=%{onload}&render=explicit&hl=%{hl}"),
      mn = new Qe(3E4, 6E4);

  kn.prototype.g = function (a) {
    var b = this;
    return new B(function (c, d) {
      var e = setTimeout(function () {
        d(new M("network-request-failed"));
      }, mn.get());

      if (!l.grecaptcha || a !== b.f && !b.b) {
        l[b.a] = function () {
          if (l.grecaptcha) {
            b.f = a;
            var g = l.grecaptcha.render;

            l.grecaptcha.render = function (h, m) {
              h = g(h, m);
              b.b++;
              return h;
            };

            clearTimeout(e);
            c(l.grecaptcha);
          } else clearTimeout(e), d(new M("internal-error"));

          delete l[b.a];
        };

        var f = fb(ln, {
          onload: b.a,
          hl: a || ""
        });
        D(hi(f)).s(function () {
          clearTimeout(e);
          d(new M("internal-error", "Unable to load external reCAPTCHA dependencies!"));
        });
      } else clearTimeout(e), c(l.grecaptcha);
    });
  };

  kn.prototype.c = function () {
    this.b--;
  };

  var nn = null;

  function on(a, b, c, d, e, f, g) {
    K(this, "type", "recaptcha");
    this.c = this.f = null;
    this.B = !1;
    this.u = b;
    this.g = null;
    g ? (jn || (jn = new hn()), g = jn) : (nn || (nn = new kn()), g = nn);
    this.m = g;
    this.a = c || {
      theme: "light",
      type: "image"
    };
    this.h = [];
    if (this.a[pn]) throw new M("argument-error", "sitekey should not be provided for reCAPTCHA as one is automatically provisioned for the current project.");
    this.i = "invisible" === this.a[qn];
    if (!l.document) throw new M("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment with DOM support.");
    if (!Wd(b) || !this.i && Wd(b).hasChildNodes()) throw new M("argument-error", "reCAPTCHA container is either not found or already contains inner elements!");
    this.o = new oi(a, f || null, e || null);

    this.v = d || function () {
      return null;
    };

    var h = this;
    this.l = [];
    var m = this.a[rn];

    this.a[rn] = function (u) {
      sn(h, u);
      if ("function" === typeof m) m(u);else if ("string" === typeof m) {
        var A = J(m, l);
        "function" === typeof A && A(u);
      }
    };

    var p = this.a[tn];

    this.a[tn] = function () {
      sn(h, null);
      if ("function" === typeof p) p();else if ("string" === typeof p) {
        var u = J(p, l);
        "function" === typeof u && u();
      }
    };
  }

  var rn = "callback",
      tn = "expired-callback",
      pn = "sitekey",
      qn = "size";

  function sn(a, b) {
    for (var c = 0; c < a.l.length; c++) try {
      a.l[c](b);
    } catch (d) {}
  }

  function un(a, b) {
    Qa(a.l, function (c) {
      return c == b;
    });
  }

  function vn(a, b) {
    a.h.push(b);
    b.ka(function () {
      Pa(a.h, b);
    });
    return b;
  }

  k = on.prototype;

  k.Da = function () {
    var a = this;
    return this.f ? this.f : this.f = vn(this, D().then(function () {
      if (Je() && !Ae()) return ve();
      throw new M("operation-not-supported-in-this-environment", "RecaptchaVerifier is only supported in a browser HTTP/HTTPS environment.");
    }).then(function () {
      return a.m.g(a.v());
    }).then(function (b) {
      a.g = b;
      return P(a.o, ij, {});
    }).then(function (b) {
      a.a[pn] = b.recaptchaSiteKey;
    }).s(function (b) {
      a.f = null;
      throw b;
    }));
  };

  k.render = function () {
    wn(this);
    var a = this;
    return vn(this, this.Da().then(function () {
      if (null === a.c) {
        var b = a.u;

        if (!a.i) {
          var c = Wd(b);
          b = Zd("DIV");
          c.appendChild(b);
        }

        a.c = a.g.render(b, a.a);
      }

      return a.c;
    }));
  };

  k.verify = function () {
    wn(this);
    var a = this;
    return vn(this, this.render().then(function (b) {
      return new B(function (c) {
        var d = a.g.getResponse(b);
        if (d) c(d);else {
          var e = function (f) {
            f && (un(a, e), c(f));
          };

          a.l.push(e);
          a.i && a.g.execute(a.c);
        }
      });
    }));
  };

  k.reset = function () {
    wn(this);
    null !== this.c && this.g.reset(this.c);
  };

  function wn(a) {
    if (a.B) throw new M("internal-error", "RecaptchaVerifier instance has been destroyed.");
  }

  k.clear = function () {
    wn(this);
    this.B = !0;
    this.m.c();

    for (var a = 0; a < this.h.length; a++) this.h[a].cancel("RecaptchaVerifier instance has been destroyed.");

    if (!this.i) {
      a = Wd(this.u);

      for (var b; b = a.firstChild;) a.removeChild(b);
    }
  };

  function xn(a, b, c) {
    var d = !1;

    try {
      this.b = c || _app.default.app();
    } catch (g) {
      throw new M("argument-error", "No firebase.app.App instance is currently initialized.");
    }

    if (this.b.options && this.b.options.apiKey) c = this.b.options.apiKey;else throw new M("invalid-api-key");
    var e = this,
        f = null;

    try {
      f = this.b.auth().Ca();
    } catch (g) {}

    try {
      d = this.b.auth().settings.appVerificationDisabledForTesting;
    } catch (g) {}

    f = _app.default.SDK_VERSION ? Fe(_app.default.SDK_VERSION, f) : null;
    on.call(this, c, a, b, function () {
      try {
        var g = e.b.auth().ha();
      } catch (h) {
        g = null;
      }

      return g;
    }, f, Vf(Wf), d);
  }

  v(xn, on);

  function yn(a, b, c, d) {
    a: {
      c = Array.prototype.slice.call(c);
      var e = 0;

      for (var f = !1, g = 0; g < b.length; g++) if (b[g].optional) f = !0;else {
        if (f) throw new M("internal-error", "Argument validator encountered a required argument after an optional argument.");
        e++;
      }

      f = b.length;
      if (c.length < e || f < c.length) d = "Expected " + (e == f ? 1 == e ? "1 argument" : e + " arguments" : e + "-" + f + " arguments") + " but got " + c.length + ".";else {
        for (e = 0; e < c.length; e++) if (f = b[e].optional && void 0 === c[e], !b[e].N(c[e]) && !f) {
          b = b[e];
          if (0 > e || e >= zn.length) throw new M("internal-error", "Argument validator received an unsupported number of arguments.");
          c = zn[e];
          d = (d ? "" : c + " argument ") + (b.name ? '"' + b.name + '" ' : "") + "must be " + b.M + ".";
          break a;
        }

        d = null;
      }
    }

    if (d) throw new M("argument-error", a + " failed: " + d);
  }

  var zn = "First Second Third Fourth Fifth Sixth Seventh Eighth Ninth".split(" ");

  function V(a, b) {
    return {
      name: a || "",
      M: "a valid string",
      optional: !!b,
      N: n
    };
  }

  function An(a, b) {
    return {
      name: a || "",
      M: "a boolean",
      optional: !!b,
      N: ia
    };
  }

  function W(a, b) {
    return {
      name: a || "",
      M: "a valid object",
      optional: !!b,
      N: r
    };
  }

  function Bn(a, b) {
    return {
      name: a || "",
      M: "a function",
      optional: !!b,
      N: q
    };
  }

  function Cn(a, b) {
    return {
      name: a || "",
      M: "null",
      optional: !!b,
      N: na
    };
  }

  function Dn() {
    return {
      name: "",
      M: "an HTML element",
      optional: !1,
      N: function (a) {
        return !!(a && a instanceof Element);
      }
    };
  }

  function En() {
    return {
      name: "auth",
      M: "an instance of Firebase Auth",
      optional: !0,
      N: function (a) {
        return !!(a && a instanceof Lm);
      }
    };
  }

  function Fn() {
    return {
      name: "app",
      M: "an instance of Firebase App",
      optional: !0,
      N: function (a) {
        return !!(a && a instanceof _app.default.app.App);
      }
    };
  }

  function Gn(a) {
    return {
      name: a ? a + "Credential" : "credential",
      M: a ? "a valid " + a + " credential" : "a valid credential",
      optional: !1,
      N: function (b) {
        if (!b) return !1;
        var c = !a || b.providerId === a;
        return !(!b.na || !c);
      }
    };
  }

  function Hn() {
    return {
      name: "authProvider",
      M: "a valid Auth provider",
      optional: !1,
      N: function (a) {
        return !!(a && a.providerId && a.hasOwnProperty && a.hasOwnProperty("isOAuthProvider"));
      }
    };
  }

  function In() {
    return {
      name: "applicationVerifier",
      M: "an implementation of firebase.auth.ApplicationVerifier",
      optional: !1,
      N: function (a) {
        return !!(a && n(a.type) && q(a.verify));
      }
    };
  }

  function X(a, b, c, d) {
    return {
      name: c || "",
      M: a.M + " or " + b.M,
      optional: !!d,
      N: function (e) {
        return a.N(e) || b.N(e);
      }
    };
  }

  ;

  function Y(a, b) {
    for (var c in b) {
      var d = b[c].name;
      a[d] = Jn(d, a[c], b[c].j);
    }
  }

  function Kn(a, b) {
    for (var c in b) {
      var d = b[c].name;
      d !== c && Object.defineProperty(a, d, {
        get: ua(function (e) {
          return this[e];
        }, c),
        set: ua(function (e, f, g, h) {
          yn(e, [g], [h], !0);
          this[f] = h;
        }, d, c, b[c].Za),
        enumerable: !0
      });
    }
  }

  function Z(a, b, c, d) {
    a[b] = Jn(b, c, d);
  }

  function Jn(a, b, c) {
    function d() {
      var g = Array.prototype.slice.call(arguments);
      yn(e, c, g);
      return b.apply(this, g);
    }

    if (!c) return b;
    var e = Ln(a),
        f;

    for (f in b) d[f] = b[f];

    for (f in b.prototype) d.prototype[f] = b.prototype[f];

    return d;
  }

  function Ln(a) {
    a = a.split(".");
    return a[a.length - 1];
  }

  ;
  Y(Lm.prototype, {
    Ya: {
      name: "applyActionCode",
      j: [V("code")]
    },
    Ma: {
      name: "checkActionCode",
      j: [V("code")]
    },
    ab: {
      name: "confirmPasswordReset",
      j: [V("code"), V("newPassword")]
    },
    Xb: {
      name: "createUserWithEmailAndPassword",
      j: [V("email"), V("password")]
    },
    $b: {
      name: "fetchSignInMethodsForEmail",
      j: [V("email")]
    },
    oa: {
      name: "getRedirectResult",
      j: []
    },
    qc: {
      name: "isSignInWithEmailLink",
      j: [V("emailLink")]
    },
    wc: {
      name: "onAuthStateChanged",
      j: [X(W(), Bn(), "nextOrObserver"), Bn("opt_error", !0), Bn("opt_completed", !0)]
    },
    xc: {
      name: "onIdTokenChanged",
      j: [X(W(), Bn(), "nextOrObserver"), Bn("opt_error", !0), Bn("opt_completed", !0)]
    },
    kb: {
      name: "sendPasswordResetEmail",
      j: [V("email"), X(W("opt_actionCodeSettings", !0), Cn(null, !0), "opt_actionCodeSettings", !0)]
    },
    lb: {
      name: "sendSignInLinkToEmail",
      j: [V("email"), W("actionCodeSettings")]
    },
    mb: {
      name: "setPersistence",
      j: [V("persistence")]
    },
    Gc: {
      name: "signInAndRetrieveDataWithCredential",
      j: [Gn()]
    },
    ob: {
      name: "signInAnonymously",
      j: []
    },
    Sa: {
      name: "signInWithCredential",
      j: [Gn()]
    },
    Hc: {
      name: "signInWithCustomToken",
      j: [V("token")]
    },
    Ic: {
      name: "signInWithEmailAndPassword",
      j: [V("email"), V("password")]
    },
    Jc: {
      name: "signInWithEmailLink",
      j: [V("email"), V("emailLink", !0)]
    },
    Kc: {
      name: "signInWithPhoneNumber",
      j: [V("phoneNumber"), In()]
    },
    Lc: {
      name: "signInWithPopup",
      j: [Hn()]
    },
    Mc: {
      name: "signInWithRedirect",
      j: [Hn()]
    },
    Rc: {
      name: "updateCurrentUser",
      j: [X(function (a) {
        return {
          name: "user",
          M: "an instance of Firebase User",
          optional: !!a,
          N: function (b) {
            return !!(b && b instanceof Q);
          }
        };
      }(), Cn(), "user")]
    },
    pb: {
      name: "signOut",
      j: []
    },
    toJSON: {
      name: "toJSON",
      j: [V(null, !0)]
    },
    Tc: {
      name: "useDeviceLanguage",
      j: []
    },
    Uc: {
      name: "verifyPasswordResetCode",
      j: [V("code")]
    }
  });
  Kn(Lm.prototype, {
    lc: {
      name: "languageCode",
      Za: X(V(), Cn(), "languageCode")
    },
    ti: {
      name: "tenantId",
      Za: X(V(), Cn(), "tenantId")
    }
  });
  Lm.Persistence = ok;
  Lm.Persistence.LOCAL = "local";
  Lm.Persistence.SESSION = "session";
  Lm.Persistence.NONE = "none";
  Y(Q.prototype, {
    "delete": {
      name: "delete",
      j: []
    },
    dc: {
      name: "getIdTokenResult",
      j: [An("opt_forceRefresh", !0)]
    },
    G: {
      name: "getIdToken",
      j: [An("opt_forceRefresh", !0)]
    },
    rc: {
      name: "linkAndRetrieveDataWithCredential",
      j: [Gn()]
    },
    fb: {
      name: "linkWithCredential",
      j: [Gn()]
    },
    sc: {
      name: "linkWithPhoneNumber",
      j: [V("phoneNumber"), In()]
    },
    tc: {
      name: "linkWithPopup",
      j: [Hn()]
    },
    uc: {
      name: "linkWithRedirect",
      j: [Hn()]
    },
    Ac: {
      name: "reauthenticateAndRetrieveDataWithCredential",
      j: [Gn()]
    },
    hb: {
      name: "reauthenticateWithCredential",
      j: [Gn()]
    },
    Bc: {
      name: "reauthenticateWithPhoneNumber",
      j: [V("phoneNumber"), In()]
    },
    Cc: {
      name: "reauthenticateWithPopup",
      j: [Hn()]
    },
    Dc: {
      name: "reauthenticateWithRedirect",
      j: [Hn()]
    },
    reload: {
      name: "reload",
      j: []
    },
    jb: {
      name: "sendEmailVerification",
      j: [X(W("opt_actionCodeSettings", !0), Cn(null, !0), "opt_actionCodeSettings", !0)]
    },
    toJSON: {
      name: "toJSON",
      j: [V(null, !0)]
    },
    Qc: {
      name: "unlink",
      j: [V("provider")]
    },
    rb: {
      name: "updateEmail",
      j: [V("email")]
    },
    sb: {
      name: "updatePassword",
      j: [V("password")]
    },
    Sc: {
      name: "updatePhoneNumber",
      j: [Gn("phone")]
    },
    tb: {
      name: "updateProfile",
      j: [W("profile")]
    }
  });
  Y(bn.prototype, {
    execute: {
      name: "execute"
    },
    render: {
      name: "render"
    },
    reset: {
      name: "reset"
    },
    getResponse: {
      name: "getResponse"
    }
  });
  Y(an.prototype, {
    execute: {
      name: "execute"
    },
    render: {
      name: "render"
    },
    reset: {
      name: "reset"
    },
    getResponse: {
      name: "getResponse"
    }
  });
  Y(B.prototype, {
    ka: {
      name: "finally"
    },
    s: {
      name: "catch"
    },
    then: {
      name: "then"
    }
  });
  Kn(Bl.prototype, {
    appVerificationDisabled: {
      name: "appVerificationDisabledForTesting",
      Za: An("appVerificationDisabledForTesting")
    }
  });
  Y(Cl.prototype, {
    confirm: {
      name: "confirm",
      j: [V("verificationCode")]
    }
  });
  Z(kg, "fromJSON", function (a) {
    a = n(a) ? JSON.parse(a) : a;

    for (var b, c = [vg, Mg, Tg, sg], d = 0; d < c.length; d++) if (b = c[d](a)) return b;

    return null;
  }, [X(V(), W(), "json")]);
  Z(Hg, "credential", function (a, b) {
    return new Gg(a, b);
  }, [V("email"), V("password")]);
  Y(Gg.prototype, {
    A: {
      name: "toJSON",
      j: [V(null, !0)]
    }
  });
  Y(yg.prototype, {
    ya: {
      name: "addScope",
      j: [V("scope")]
    },
    Ga: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(yg, "credential", zg, [X(V(), W(), "token")]);
  Z(Hg, "credentialWithLink", Ng, [V("email"), V("emailLink")]);
  Y(Ag.prototype, {
    ya: {
      name: "addScope",
      j: [V("scope")]
    },
    Ga: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(Ag, "credential", Bg, [X(V(), W(), "token")]);
  Y(Cg.prototype, {
    ya: {
      name: "addScope",
      j: [V("scope")]
    },
    Ga: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(Cg, "credential", Dg, [X(V(), X(W(), Cn()), "idToken"), X(V(), Cn(), "accessToken", !0)]);
  Y(Eg.prototype, {
    Ga: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Z(Eg, "credential", Fg, [X(V(), W(), "token"), V("secret", !0)]);
  Y(O.prototype, {
    ya: {
      name: "addScope",
      j: [V("scope")]
    },
    credential: {
      name: "credential",
      j: [X(V(), X(W(), Cn()), "optionsOrIdToken"), X(V(), Cn(), "accessToken", !0)]
    },
    Ga: {
      name: "setCustomParameters",
      j: [W("customOAuthParameters")]
    }
  });
  Y(tg.prototype, {
    A: {
      name: "toJSON",
      j: [V(null, !0)]
    }
  });
  Y(ng.prototype, {
    A: {
      name: "toJSON",
      j: [V(null, !0)]
    }
  });
  Z(Ug, "credential", Wg, [V("verificationId"), V("verificationCode")]);
  Y(Ug.prototype, {
    Wa: {
      name: "verifyPhoneNumber",
      j: [V("phoneNumber"), In()]
    }
  });
  Y(Pg.prototype, {
    A: {
      name: "toJSON",
      j: [V(null, !0)]
    }
  });
  Y(M.prototype, {
    toJSON: {
      name: "toJSON",
      j: [V(null, !0)]
    }
  });
  Y(eh.prototype, {
    toJSON: {
      name: "toJSON",
      j: [V(null, !0)]
    }
  });
  Y(dh.prototype, {
    toJSON: {
      name: "toJSON",
      j: [V(null, !0)]
    }
  });
  Y(xn.prototype, {
    clear: {
      name: "clear",
      j: []
    },
    render: {
      name: "render",
      j: []
    },
    verify: {
      name: "verify",
      j: []
    }
  });
  Z(rf, "parseLink", zf, [V("link")]);

  (function () {
    if ("undefined" !== typeof _app.default && _app.default.INTERNAL && _app.default.INTERNAL.registerComponent) {
      var a = {
        ActionCodeInfo: {
          Operation: {
            EMAIL_SIGNIN: jf,
            PASSWORD_RESET: "PASSWORD_RESET",
            RECOVER_EMAIL: "RECOVER_EMAIL",
            VERIFY_EMAIL: "VERIFY_EMAIL"
          }
        },
        Auth: Lm,
        AuthCredential: kg,
        Error: M
      };
      Z(a, "EmailAuthProvider", Hg, []);
      Z(a, "FacebookAuthProvider", yg, []);
      Z(a, "GithubAuthProvider", Ag, []);
      Z(a, "GoogleAuthProvider", Cg, []);
      Z(a, "TwitterAuthProvider", Eg, []);
      Z(a, "OAuthProvider", O, [V("providerId")]);
      Z(a, "SAMLAuthProvider", xg, [V("providerId")]);
      Z(a, "PhoneAuthProvider", Ug, [En()]);
      Z(a, "RecaptchaVerifier", xn, [X(V(), Dn(), "recaptchaContainer"), W("recaptchaParameters", !0), Fn()]);
      Z(a, "ActionCodeURL", rf, []);

      _app.default.INTERNAL.registerComponent({
        name: "auth",
        instanceFactory: function (b) {
          b = b.getProvider("app").getImmediate();
          return new Lm(b);
        },
        multipleInstances: !1,
        serviceProps: a,
        instantiationMode: "LAZY",
        type: "PUBLIC"
      });

      _app.default.INTERNAL.registerComponent({
        name: "auth-internal",
        instanceFactory: function (b) {
          b = b.getProvider("auth").getImmediate();
          return {
            getUid: t(b.getUid, b),
            getToken: t(b.cc, b),
            addAuthTokenListener: t(b.Wb, b),
            removeAuthTokenListener: t(b.Ec, b)
          };
        },
        multipleInstances: !1,
        instantiationMode: "LAZY",
        type: "PRIVATE"
      });

      _app.default.registerVersion("@firebase/auth", "0.13.5");

      _app.default.INTERNAL.extendNamespace({
        User: Q
      });
    } else throw Error("Cannot find the firebase namespace; be sure to include firebase-app.js before this library.");
  })();
}).apply(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});
},{"@firebase/app":"node_modules/@firebase/app/dist/index.cjs.js"}],"node_modules/firebase/auth/dist/index.esm.js":[function(require,module,exports) {
"use strict";

require("@firebase/auth");
},{"@firebase/auth":"node_modules/@firebase/auth/dist/auth.esm.js"}],"App.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _loginpage = _interopRequireDefault(require("./components/loginpage"));

var _registerpage = _interopRequireDefault(require("./components/registerpage"));

var _displaypage = _interopRequireDefault(require("./components/displaypage"));

var _axios = _interopRequireDefault(require("axios"));

var firebase = _interopRequireWildcard(require("firebase/app"));

require("firebase/auth");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
var firebaseConfig = {
  apiKey: "AIzaSyD2V9UPOeL5B7y-qARH6GK-nA9vy-UnzB8",
  authDomain: "my-kanban-1581660954944.firebaseapp.com",
  databaseURL: "https://my-kanban-1581660954944.firebaseio.com",
  projectId: "my-kanban-1581660954944",
  storageBucket: "my-kanban-1581660954944.appspot.com",
  messagingSenderId: "207178438135",
  appId: "1:207178438135:web:d267ece9cd6cce09c1caf2"
};
firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();
var _default = {
  components: {
    LoginPage: _loginpage.default,
    RegisterPage: _registerpage.default,
    DisplayPage: _displaypage.default
  },
  data: function data() {
    return {
      showloginpage: true,
      showprintpage: false,
      showregisterpage: false
    };
  },
  methods: {
    showregister: function showregister() {
      this.showregisterpage = true;
      this.showloginpage = false;
    },
    register: function register(form) {
      var _this = this;

      (0, _axios.default)({
        method: "POST",
        url: "http://localhost:3000/user/register",
        data: {
          email: form.email,
          password: form.password,
          name: form.name
        }
      }).then(function (data) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("UserId", data.data.UserId);

        _this.showpage();
      }).catch(function (err) {
        Swal.fire(err.response.data);
      });
    },
    login: function login(form) {
      var _this2 = this;

      (0, _axios.default)({
        method: "POST",
        url: "http://localhost:3000/user/login",
        data: {
          email: form.email,
          password: form.password
        }
      }).then(function (data) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("UserId", data.data.UserId);

        _this2.showpage();
      }).catch(function (err) {
        Swal.fire(err.response.data);
      });
    },
    showpage: function showpage() {
      if (localStorage.token) {
        this.showprintpage = true;
        this.showloginpage = false;
        this.showregisterpage = false;
      } else {
        this.showprintpage = false;
        this.showloginpage = true;
        this.showregisterpage = false;
      }
    },
    signGoogle: function signGoogle() {
      var _this3 = this;

      firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken; // The signed-in user info.

        var user = {
          email: result.user.email,
          name: result.user.displayName
        };
        return (0, _axios.default)({
          method: "POST",
          url: "http://localhost:3000/user/signgoogle",
          data: {
            user: user
          }
        });
      }).then(function (data) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("UserId", data.data.UserId);

        _this3.showpage();
      }).catch(function (error) {
        Swal.fire(err.response.data); // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message; // The email of the user's account used.

        var email = error.email; // The firebase.auth.AuthCredential type that was used.

        var credential = error.credential; // ...
      });
    }
  },
  created: function created() {
    if (localStorage.token) {
      this.showprintpage = true;
      this.showloginpage = false;
      this.showregisterpage = false;
    } else {
      this.showprintpage = false;
      this.showloginpage = true;
      this.showregisterpage = false;
    }
  }
};
exports.default = _default;
        var $053745 = exports.default || module.exports;
      
      if (typeof $053745 === 'function') {
        $053745 = $053745.options;
      }
    
        /* template */
        Object.assign($053745, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("LoginPage", {
        attrs: { loginshow: _vm.showloginpage },
        on: { login: _vm.login }
      }),
      _vm._v(" "),
      _c("RegisterPage", {
        attrs: { registershow: _vm.showregisterpage },
        on: { register: _vm.register }
      }),
      _vm._v(" "),
      _c("DisplayPage", { attrs: { showpage: _vm.showprintpage } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
    /* hot reload */
    (function () {
      if (module.hot) {
        var api = require('vue-hot-reload-api');
        api.install(require('vue'));
        if (api.compatible) {
          module.hot.accept();
          if (!module.hot.data) {
            api.createRecord('$053745', $053745);
          } else {
            api.reload('$053745', $053745);
          }
        }

        
        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
      }
    })();
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./components/loginpage":"components/loginpage.vue","./components/registerpage":"components/registerpage.vue","./components/displaypage":"components/displaypage.vue","axios":"node_modules/axios/index.js","firebase/app":"node_modules/firebase/app/dist/index.cjs.js","firebase/auth":"node_modules/firebase/auth/dist/index.esm.js","_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js","vue-hot-reload-api":"node_modules/vue-hot-reload-api/dist/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue.default({
  el: "#app",
  render: function render(createElement) {
    return createElement(_App.default);
  }
});
},{"vue":"node_modules/vue/dist/vue.runtime.esm.js","./App.vue":"App.vue"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50708" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/client.e31bb0bc.js.map