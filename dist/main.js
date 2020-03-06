/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");

var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");

var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");

var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");

var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout; // Listen for ready state

    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      } // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request


      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      } // Prepare the response


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
      settle(resolve, reject, response); // Clean up request

      request = null;
    }; // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED', request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js"); // Add xsrf header


      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


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
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


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
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


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
        reject(cancel); // Clean up request

        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");

var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context);
  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Factory for creating new instances

axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
}; // Expose Cancel & CancelToken


axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js"); // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports.default = axios;

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
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

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");

var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");

var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
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

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  } // Hook up interceptors middleware


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
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
module.exports = Axios;

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

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

/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");

var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");
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

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");
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

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");

var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
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
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData(config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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

  error.toJSON = function () {
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

/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
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
  var defaultToConfig2Keys = ['baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer', 'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken', 'socketPath'];
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
  var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys);
  var otherKeys = Object.keys(config2).filter(function filterAxiosKeys(key) {
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

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");
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
    reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
  }
};

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
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

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");

var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

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
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }

  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
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
      } catch (e) {
        /* Ignore */
      }
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
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
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

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
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
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
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

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
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
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js"); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
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

  if (!headers) {
    return parsed;
  }

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

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
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
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
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
  return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */


function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && val.buffer instanceof ArrayBuffer;
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
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
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
  } // Force an array if not already something iterable


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


function merge()
/* obj1, obj2, obj3, ... */
{
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


function deepMerge()
/* obj1, obj2, obj3, ... */
{
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

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
process.browser = true;
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/map */ "./src/scripts/map.js");
/* harmony import */ var _scripts_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/dropdown */ "./src/scripts/dropdown.js");
/* harmony import */ var _scripts_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/util */ "./src/scripts/util.js");




window.addEventListener("DOMContentLoaded", function () {
  Object(_scripts_map__WEBPACK_IMPORTED_MODULE_1__["initMap"])();
  d3.select(".boro-selector").append("svg").attr("id", "dropdownSVG").attr("height", 500).attr("width", 200);
  var zips = _scripts_util__WEBPACK_IMPORTED_MODULE_3__["locations"].Manhattan["Chelsea and Clinton"];
  Object(_scripts_dropdown__WEBPACK_IMPORTED_MODULE_2__["svgDropdown"])(zips);
});

/***/ }),

/***/ "./src/scripts/api.js":
/*!****************************!*\
  !*** ./src/scripts/api.js ***!
  \****************************/
/*! exports provided: fetchData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var fetchData = function fetchData(zip) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/NYODQ/".concat(zip)).then(function (response) {
    console.log(response.data);
    return response.data;
  });
};

/***/ }),

/***/ "./src/scripts/dropdown.js":
/*!*********************************!*\
  !*** ./src/scripts/dropdown.js ***!
  \*********************************/
/*! exports provided: svgDropdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgDropdown", function() { return svgDropdown; });
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/scripts/api.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/scripts/util.js");
/* harmony import */ var _pie__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pie */ "./src/scripts/pie.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./map */ "./src/scripts/map.js");




var svgDropdown = function svgDropdown(locality) {
  var svgDD = d3.select("#dropdownSVG");
  var options = {};
  options.locality = locality;
  options.container = svgDD;
  options.fontSize = 20;
  options.color = "#333";
  options.fontFamily = "calibri";
  options.x = 0;
  options.y = 0;
  options.optionHeight = 40;
  options.height = 40;
  options.width = 200;
  options.hoverColor = "#0c56f5";
  options.hoverTextColor = "#fff";
  options.backgroundColor = "#fff";
  options.padding = 5;

  options.changeHandler = function (selection) {
    console.log(_util__WEBPACK_IMPORTED_MODULE_1__["zipLatLong"][selection]);
    var lat = _util__WEBPACK_IMPORTED_MODULE_1__["zipLatLong"][selection][0];
    var long = _util__WEBPACK_IMPORTED_MODULE_1__["zipLatLong"][selection][1];
    Object(_map__WEBPACK_IMPORTED_MODULE_3__["moveToLocation"])(lat, long);
    Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchData"])(selection).then(function (data) {
      d3.select("#pieSVG").remove();
      var parsed = Object(_util__WEBPACK_IMPORTED_MODULE_1__["dataParse"])(data);
      Object(_pie__WEBPACK_IMPORTED_MODULE_2__["chart"])(parsed);
    });
  };

  var g = svgDD.append("svg").attr("x", 0).attr("y", 9).attr("shape-rendering", "optimizeSpeed").append("g") // .attr("transform", "translate(1,1)")
  .attr("font-family", options.fontFamily);
  var selectedOption = options.locality[0];
  var selectField = g.append("g");
  selectField.append("rect").attr("width", options.width).attr("height", options.height).attr("class", "option select-field").attr("fill", options.backgroundColor).style("stroke", "#a0a0a0").style("stroke-width", "1");
  var activeText = selectField.append("text").text(selectedOption).attr("x", options.padding).attr("y", options.height / 2 + options.fontSize / 3).attr("font-size", options.fontSize).attr("fill", options.color); // arrow symbol at the end of the select box

  selectField.append("text").text("▼").attr("x", options.width - options.fontSize - options.padding).attr("y", options.height / 2 + (options.fontSize - 2) / 3).attr("font-size", options.fontSize - 2).attr("fill", options.color); // transparent surface to capture actions

  selectField.append("rect").attr("width", options.width).attr("height", options.height).style("fill", "transparent").on("click", handleSelectClick); // rendering options

  var optionGroup = g.append("g").attr("transform", "translate(0, ".concat(options.height, ")")).attr("opacity", 0); //.attr("display", "none"); Issue in IE/Firefox: Unable to calculate textLength when display is none.
  // Rendering options group

  var optionEnter = optionGroup.selectAll("g").data(options.locality).enter().append("g").on("click", handleOptionClick); // Rendering background

  optionEnter.append("rect").attr("width", options.width).attr("height", options.optionHeight).attr("y", function (d, i) {
    return i * options.optionHeight;
  }).attr("class", "option").style("stroke", options.hoverColor).style("stroke-dasharray", function (d, i) {
    var stroke = [0, options.width, options.optionHeight, options.width, options.optionHeight];

    if (i === 0) {
      stroke = [options.width + options.optionHeight, options.width, options.optionHeight];
    } else if (i === options.locality.length - 1) {
      stroke = [0, options.width, options.optionHeight * 2 + options.width];
    }

    return stroke.join(" ");
  }).style("stroke-width", 1).style("fill", options.backgroundColor);
  optionEnter.append("text").attr("x", options.padding).attr("y", function (d, i) {
    return i * options.optionHeight + options.optionHeight / 2 + options.fontSize / 3;
  }).text(function (d) {
    return d;
  }).attr("font-size", options.fontSize).attr("fill", options.color);
  optionEnter.append("rect").attr("width", options.width).attr("height", options.optionHeight).attr("y", function (d, i) {
    return i * options.optionHeight;
  }).style("fill", "transparent").on("mouseover", handleMouseOver).on("mouseout", handleMouseOut);
  optionGroup.attr("display", "none").attr("opacity", 1);
  d3.select("body").on("click", function () {
    optionGroup.attr("display", "none");
  });

  function handleMouseOver() {
    d3.select(d3.event.target.parentNode).select(".option").style("fill", options.hoverColor);
    d3.select(d3.event.target.parentNode).select("text").style("fill", options.hoverTextColor);
  }

  function handleMouseOut() {
    d3.select(d3.event.target.parentNode).select(".option").style("fill", options.backgroundColor);
    d3.select(d3.event.target.parentNode).select("text").style("fill", options.color);
  }

  function handleOptionClick(d) {
    d3.event.stopPropagation();
    selectedOption = d;
    activeText.text(selectedOption);
    options.changeHandler.call(this, d);
    optionGroup.attr("display", "none");
  }

  function handleSelectClick() {
    d3.event.stopPropagation();
    var visibility = optionGroup.attr("display") === "block" ? "none" : "block";
    optionGroup.attr("display", visibility);
  }
};

/***/ }),

/***/ "./src/scripts/map.js":
/*!****************************!*\
  !*** ./src/scripts/map.js ***!
  \****************************/
/*! exports provided: initMap, moveToLocation, ctaLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initMap", function() { return initMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "moveToLocation", function() { return moveToLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ctaLayer", function() { return ctaLayer; });
var initMap = function initMap() {
  var options = {
    zoom: 11,
    center: {
      lat: 40.7118186,
      lng: -74.050329
    },
    disableDefaultUI: true
  };
  window.map = new google.maps.Map(document.getElementById("map"), options);
};
var moveToLocation = function moveToLocation(lat, lng) {
  var center = new google.maps.LatLng(lat, lng);
  window.map.panTo(center);
  window.map.setZoom(15);
};
var ctaLayer = new google.maps.KmlLayer({
  url: "",
  map: window.map
});

/***/ }),

/***/ "./src/scripts/pie.js":
/*!****************************!*\
  !*** ./src/scripts/pie.js ***!
  \****************************/
/*! exports provided: chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chart", function() { return chart; });
var chart = function chart(data) {
  d3.select(".pie-container").append("svg").attr("id", "pieSVG").attr("height", window.innerHeight).attr("width", 400);

  var partition = function partition(data) {
    var root = d3.hierarchy(data).sum(function (d) {
      return d.size;
    }).sort(function (a, b) {
      return b.value - a.value;
    });
    return d3.partition().size([2 * Math.PI, root.height + 1])(root);
  };

  var color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length + 1));
  var format = d3.format(",d"); // width refers to the width of the g element that contains the pie

  var width = 290;
  var radius = width / 6;
  var arc = d3.arc().startAngle(function (d) {
    return d.x0;
  }).endAngle(function (d) {
    return d.x1;
  }).padAngle(function (d) {
    return Math.min((d.x1 - d.x0) / 2, 0.005);
  }).padRadius(radius * 1.5).innerRadius(function (d) {
    return d.y0 * radius * 1.6;
  }).outerRadius(function (d) {
    return Math.max(d.y0 * radius * 1.7, d.y1 * radius * 1.7 - 1);
  });
  var root = partition(data);
  root.each(function (d) {
    d.current = d;
  });
  var svgPie = d3.select("#pieSVG");
  var g = svgPie.append("g").attr("height", 300).attr("width", 300) // .attr("transform", `translate(${window.innerWidth / 3},${width / 2})`)
  .on("mouseleave", mouseleave);
  var background = g.append("circle").attr("r", "195").attr("fill", "white").attr("transform", "translate(200, 200)");
  var path = g.append("g").attr("transform", "translate(200, 200)").selectAll("path").data(root.descendants().slice(1)).enter().append("path").attr("fill", function (d) {
    while (d.depth > 1) {
      d = d.parent;
    }

    return color(d.data.name);
  }).attr("fill-opacity", function (d) {
    return arcVisible(d.current) ? d.children ? 0.6 : 0.4 : 0;
  }).attr("d", function (d) {
    return arc(d.current);
  }).on("mouseover", mouseover);
  path.filter(function (d) {
    return d.children;
  }).style("cursor", "pointer").on("click", clicked);
  path.append("title").text(function (d) {
    return "".concat(d.value);
  });
  var label = g.append("g").attr("pointer-events", "none").attr("text-anchor", "middle").attr("transform", "translate(200, 200)").style("user-select", "none").selectAll("text").data(root.descendants().slice(1)).enter().append("text").attr("dy", "0.35em").attr("fill-opacity", function (d) {
    return +labelVisible(d.current);
  }).attr("transform", function (d) {
    return labelTransform(d.current);
  }).text(function (d) {
    return d.data.name;
  }); //percentage text

  var percentage_text = svgPie.append("text").attr("id", "title").attr("x", width / 1.1).attr("y", width / 2).attr("text-anchor", "middle").attr("transform", "translate(-62, 65)").style("font-size", "2em");
  var parent = g.append("circle").datum(root).attr("r", radius).attr("fill", "none").attr("pointer-events", "all").attr("transform", "translate(200, 200)").on("click", clicked);

  function clicked(p) {
    parent.datum(p.parent || root);
    root.each(function (d) {
      return d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      };
    });
    var t = g.transition().duration(750); // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.

    path.transition(t).tween("data", function (d) {
      var i = d3.interpolate(d.current, d.target);
      return function (t) {
        return d.current = i(t);
      };
    }).filter(function (d) {
      return +this.getAttribute("fill-opacity") || arcVisible(d.target);
    }).attr("fill-opacity", function (d) {
      return arcVisible(d.target) ? d.children ? 0.6 : 0.4 : 0;
    }).attrTween("d", function (d) {
      return function () {
        return arc(d.current);
      };
    });
    label.filter(function (d) {
      return +this.getAttribute("fill-opacity") || labelVisible(d.target);
    }).transition(t).attr("fill-opacity", function (d) {
      return +labelVisible(d.target);
    }).attrTween("transform", function (d) {
      return function () {
        return labelTransform(d.current);
      };
    });
  } //mouse over


  var totalSize = root.descendants()[0].value;

  function mouseover(d) {
    var percentage = (100 * d.value / totalSize).toPrecision(3);
    var percentageString = percentage + "%";

    if (percentage < 0.1) {
      percentageString = "< 0.1%";
    }

    percentage_text.text(percentageString + " ");
    var sequenceArray = d.ancestors().reverse();
    sequenceArray.shift(); // remove root node from the array
    // Fade all the segments.

    d3.selectAll("path").style("opacity", 0.3); // Then highlight only those that are an ancestor of the current segment.

    g.selectAll("path").filter(function (node) {
      return sequenceArray.indexOf(node) >= 0;
    }).style("opacity", 1);
  } //mouse leave
  // Restore everything to full opacity when moving off the visualization.


  function mouseleave(d) {
    // Deactivate all segments during transition.
    d3.selectAll("path").on("mouseover", null); // Transition each segment to full opacity and then reactivate it.

    d3.selectAll("path").transition().duration(200).style("opacity", 1).on("end", function () {
      d3.select(this).on("mouseover", mouseover);
    });
    percentage_text.text("");
    ;
  }

  function arcVisible(d) {
    return d.y1 <= 2 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 2 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
    var x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    var y = (d.y0 + d.y1) / 1.2 * radius;
    return "rotate(".concat(x - 90, ") translate(").concat(y, ",0) rotate(").concat(x < 180 ? 0 : 180, ")");
  }

  return svgPie.node();
};

/***/ }),

/***/ "./src/scripts/util.js":
/*!*****************************!*\
  !*** ./src/scripts/util.js ***!
  \*****************************/
/*! exports provided: locations, zipLatLong, dataParse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "locations", function() { return locations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zipLatLong", function() { return zipLatLong; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataParse", function() { return dataParse; });
var locations = {
  "Manhattan": {
    "Central Harlem": ["10026", "10027", "10030", "10037", "10039"],
    "Chelsea and Clinton": ["10001", "10011", "10018", "10019", "10020", "10036"],
    "East Harlem": ["10029", "10035"],
    "Gramercy Park and Murray Hill": ["10010", "10016", "10017", "10022"],
    "Greenwich Village and Soho": ["10012", "10013", "10014"],
    "Lower Manhattan": ["10004", "10005", "10006", "10007", "10038", "10280"],
    "Lower East Side": ["10002", "10003", "10009"],
    "Upper East Side": ["10021", "10028", "10044", "10065", "10075", "10128"],
    "Upper West Side": ["10023", "10024", "10025"],
    "Inwood and Washington Heights": ["10031", "10032", "10033", "10034", "10040"]
  },
  "Bronx": {
    "Central Bronx": ["10453", "10457", "10460"],
    "Bronx Park": ["10458", "10467", "10468"],
    "High Bridge and Fordham": ["10451", "10452", "10456"],
    "Hunts Point and Mott Haven": ["10454", "10455", "10459", "10474"],
    "Kingsbridge and Riverdale": ["10463", "10471"],
    "Northeast Bronx": ["10466", "10469", "10470", "10475"],
    "Southeast Bronx": ["10461", "10462", "10464", "10465", "10472", "10473"]
  },
  "Brooklyn": {
    "Central Brooklyn": ["11212", "11213", "11216", "11233", "11238"],
    "Southwest Brooklyn": ["11209", "11214", "11228"],
    "Borough Park": ["11204", "11218", "11219", "11230"],
    "Canarsie and Flatlands": ["11234", "11236", "11239"],
    "Southern Brooklyn": ["11223", "11224", "11229", "11235"],
    "Northwest Brooklyn": ["11201", "11205", "11215", "11217", "11231"],
    "Flatbush": ["11203", "11210", "11225", "11226"],
    "East New York and New Lots": ["11207", "11208"],
    "Greenpoint": ["11211", "11222"],
    "Sunset Park": ["11220", "11232"],
    "Bushwick and Williamsburg": ["11206", "11221", "11237"]
  },
  "Queens": {
    "Northeast Queens": ["11361", "11362", "11363", "11364"],
    "North Queens": ["11354", "11355", "11356", "11357", "11358", "11359", "11360"],
    "Central Queens": ["11365", "11366", "11367"],
    "Jamaica": ["11412", "11423", "11432", "11433", "11434", "11435", "11436"],
    "Northwest Queens": ["11101", "11102", "11103", "11104", "11105", "11106"],
    "West Central Queens": ["11374", "11375", "11379", "11385"],
    "Rockaways": ["11691", "11692", "11693", "11694", "11695", "11697"],
    "Southeast Queens": ["11004", "11005", "11411", "11413", "11422", "11426", "11427", "11428", "11429"],
    "Southwest Queens": ["11414", "11415", "11416", "11417", "11418", "11419", "11420", "11421"],
    "West Queens": ["11368", "11369", "11370", "11372", "11373", "11377", "11378"]
  },
  "Staten Island": {
    "Port Richmond": ["10302", "10303", "10310"],
    "South Shore": ["10306", "10307", "10308", "10309", "10312"],
    "Stapleton and St. George": ["10301", "10304", "10305"],
    "Mid-Island": ["10314"]
  }
};
var zipLatLong = {
  "10001": [40.7537, -73.9992],
  "10011": [40.7465, -74.0094],
  "10018": [40.7553, -73.9933],
  "10019": [40.7687, -73.9918],
  "10020": [40.7606, -73.9823],
  "10036": [40.7603, -73.9933]
};
var dataParse = function dataParse(data) {
  var pieTreeData = {
    name: "zipcode",
    children: [{
      name: "$10m <",
      children: []
    }, {
      name: "$1m < $10m",
      children: []
    }, {
      name: "$500k < $1m",
      children: []
    }, {
      name: "$200k to $500k",
      children: []
    }, {
      name: "< $200k",
      children: []
    }]
  }; // total avg calc for that zip code
  // COMMENT IN WHEN CREATING TOTAL AVERAGES DISPLAY *********************
  // let totalCount = 0;
  // let totalVal = 0;
  // split into 5 price brackets
  // 1: 10mil +, 2: 1mil - 10mil, 3: 500k-9.999k, 4: 200-499k, 5: < 200k
  // EACH BRACKET ASSESSED VALUES AND COUNTS FOR AVERAGE *****************
  // let bracket1Val = 0;
  // let bracket2Val = 0;
  // let bracket3Val = 0;
  // let bracket4Val = 0;
  // let bracket5Val = 0;
  // let bracket1Ct = 0;
  // let bracket2Ct = 0;
  // let bracket3Ct = 0;
  // let bracket4Ct = 0;
  // let bracket5Ct = 0;

  var bracketBldgClass = [{}, {}, {}, {}, {}];
  data.forEach(function (propertyObj) {
    var propVal = parseInt(propertyObj.fullval);
    var bldgClass = propertyObj.bldgcl; // total avg
    // COMMENT IN WHEN CREATING TOTAL AVERAGES DISPLAY *********************
    // totalVal = totalVal + propVal;
    // totalCount++;
    // price brackets

    if (propVal >= 10000000) {
      // bracket1Val += propVal;
      // bracket1Ct += 1
      bldgClassParse(bldgClass, 0, bracketBldgClass);
    } else if (propVal < 10000000 && propVal >= 1000000) {
      // bracket2Val += propVal;
      // bracket2Ct += 1;
      bldgClassParse(bldgClass, 1, bracketBldgClass);
    } else if (propVal < 1000000 && propVal >= 500000) {
      // bracket3Val += propVal;
      // bracket3Ct += 1;
      bldgClassParse(bldgClass, 2, bracketBldgClass);
    } else if (propVal < 500000 && propVal >= 200000) {
      // bracket4Val += propVal;
      // bracket4Ct += 1;
      bldgClassParse(bldgClass, 3, bracketBldgClass);
    } else if (propVal < 200000) {
      // bracket5Val += propVal;
      // bracket5Ct += 1;
      bldgClassParse(bldgClass, 4, bracketBldgClass);
    }
  });
  bracketBldgClass.forEach(function (bracket, i) {
    for (var key in bracket) {
      var v = [];
      var classCodesObj = bracket[key];

      for (var classCodes in classCodesObj) {
        v.push({
          name: classCodes,
          size: classCodesObj[classCodes]
        });
      }

      pieTreeData.children[i].children.push({
        name: key,
        children: v
      });
    }
  });
  return pieTreeData; // return (totalVal / totalCount);
};

var bldgClassParse = function bldgClassParse(bldgClass, i, bldgParseObj) {
  var classType = bldgClass.split("")[0];

  if (bldgParseObj[i][classType] === undefined) {
    var classObj = {};
    classObj[bldgClass] = 1;
    bldgParseObj[i][classType] = classObj;
  } else if (bldgParseObj[i][classType] && bldgParseObj[i][classType][bldgClass]) {
    bldgParseObj[i][classType][bldgClass] += 1;
  } else {
    bldgParseObj[i][classType][bldgClass] = 1;
  }
};

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9waWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRNYXAiLCJkMyIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJ6aXBzIiwibG9jYXRpb25zIiwiTWFuaGF0dGFuIiwic3ZnRHJvcGRvd24iLCJmZXRjaERhdGEiLCJ6aXAiLCJheGlvcyIsImdldCIsInRoZW4iLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJkYXRhIiwibG9jYWxpdHkiLCJzdmdERCIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJmb250U2l6ZSIsImNvbG9yIiwiZm9udEZhbWlseSIsIngiLCJ5Iiwib3B0aW9uSGVpZ2h0IiwiaGVpZ2h0Iiwid2lkdGgiLCJob3ZlckNvbG9yIiwiaG92ZXJUZXh0Q29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwiY2hhbmdlSGFuZGxlciIsInNlbGVjdGlvbiIsInppcExhdExvbmciLCJsYXQiLCJsb25nIiwibW92ZVRvTG9jYXRpb24iLCJyZW1vdmUiLCJwYXJzZWQiLCJkYXRhUGFyc2UiLCJjaGFydCIsImciLCJzZWxlY3RlZE9wdGlvbiIsInNlbGVjdEZpZWxkIiwic3R5bGUiLCJhY3RpdmVUZXh0IiwidGV4dCIsIm9uIiwiaGFuZGxlU2VsZWN0Q2xpY2siLCJvcHRpb25Hcm91cCIsIm9wdGlvbkVudGVyIiwic2VsZWN0QWxsIiwiZW50ZXIiLCJoYW5kbGVPcHRpb25DbGljayIsImQiLCJpIiwic3Ryb2tlIiwibGVuZ3RoIiwiam9pbiIsImhhbmRsZU1vdXNlT3ZlciIsImhhbmRsZU1vdXNlT3V0IiwiZXZlbnQiLCJ0YXJnZXQiLCJwYXJlbnROb2RlIiwic3RvcFByb3BhZ2F0aW9uIiwiY2FsbCIsInZpc2liaWxpdHkiLCJ6b29tIiwiY2VudGVyIiwibG5nIiwiZGlzYWJsZURlZmF1bHRVSSIsIm1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiTGF0TG5nIiwicGFuVG8iLCJzZXRab29tIiwiY3RhTGF5ZXIiLCJLbWxMYXllciIsInVybCIsImlubmVySGVpZ2h0IiwicGFydGl0aW9uIiwicm9vdCIsImhpZXJhcmNoeSIsInN1bSIsInNpemUiLCJzb3J0IiwiYSIsImIiLCJ2YWx1ZSIsIk1hdGgiLCJQSSIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJjaGlsZHJlbiIsImZvcm1hdCIsInJhZGl1cyIsImFyYyIsInN0YXJ0QW5nbGUiLCJ4MCIsImVuZEFuZ2xlIiwieDEiLCJwYWRBbmdsZSIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwiZWFjaCIsImN1cnJlbnQiLCJzdmdQaWUiLCJtb3VzZWxlYXZlIiwiYmFja2dyb3VuZCIsInBhdGgiLCJkZXNjZW5kYW50cyIsInNsaWNlIiwiZGVwdGgiLCJwYXJlbnQiLCJuYW1lIiwiYXJjVmlzaWJsZSIsIm1vdXNlb3ZlciIsImZpbHRlciIsImNsaWNrZWQiLCJsYWJlbCIsImxhYmVsVmlzaWJsZSIsImxhYmVsVHJhbnNmb3JtIiwicGVyY2VudGFnZV90ZXh0IiwiZGF0dW0iLCJwIiwidCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInR3ZWVuIiwiaW50ZXJwb2xhdGUiLCJnZXRBdHRyaWJ1dGUiLCJhdHRyVHdlZW4iLCJ0b3RhbFNpemUiLCJwZXJjZW50YWdlIiwidG9QcmVjaXNpb24iLCJwZXJjZW50YWdlU3RyaW5nIiwic2VxdWVuY2VBcnJheSIsImFuY2VzdG9ycyIsInJldmVyc2UiLCJzaGlmdCIsIm5vZGUiLCJpbmRleE9mIiwicGllVHJlZURhdGEiLCJicmFja2V0QmxkZ0NsYXNzIiwiZm9yRWFjaCIsInByb3BlcnR5T2JqIiwicHJvcFZhbCIsInBhcnNlSW50IiwiZnVsbHZhbCIsImJsZGdDbGFzcyIsImJsZGdjbCIsImJsZGdDbGFzc1BhcnNlIiwiYnJhY2tldCIsImtleSIsInYiLCJjbGFzc0NvZGVzT2JqIiwiY2xhc3NDb2RlcyIsInB1c2giLCJibGRnUGFyc2VPYmoiLCJjbGFzc1R5cGUiLCJzcGxpdCIsInVuZGVmaW5lZCIsImNsYXNzT2JqIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEMsYUFBYSxtQkFBTyxDQUFDLGlFQUFrQjs7QUFFdkMsZUFBZSxtQkFBTyxDQUFDLDJFQUF1Qjs7QUFFOUMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQXVCOztBQUVuRCxtQkFBbUIsbUJBQU8sQ0FBQyxtRkFBMkI7O0FBRXRELHNCQUFzQixtQkFBTyxDQUFDLHlGQUE4Qjs7QUFFNUQsa0JBQWtCLG1CQUFPLENBQUMseUVBQXFCOztBQUUvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRDQUE0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QU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsU0FBUztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOzs7QUFHSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsZ0NBQWdDO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWSxPQUFPO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQy9XQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUFNUyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNGLFNBQUQsRUFBWXpHLENBQVosRUFBZWtILFlBQWYsRUFBZ0M7QUFDckQsTUFBSUMsU0FBUyxHQUFHVixTQUFTLENBQUNXLEtBQVYsQ0FBZ0IsRUFBaEIsRUFBb0IsQ0FBcEIsQ0FBaEI7O0FBRUEsTUFBSUYsWUFBWSxDQUFDbEgsQ0FBRCxDQUFaLENBQWdCbUgsU0FBaEIsTUFBK0JFLFNBQW5DLEVBQThDO0FBQzVDLFFBQUlDLFFBQVEsR0FBRyxFQUFmO0FBQ0FBLFlBQVEsQ0FBQ2IsU0FBRCxDQUFSLEdBQXNCLENBQXRCO0FBRUFTLGdCQUFZLENBQUNsSCxDQUFELENBQVosQ0FBZ0JtSCxTQUFoQixJQUE2QkcsUUFBN0I7QUFDRCxHQUxELE1BS08sSUFBSUosWUFBWSxDQUFDbEgsQ0FBRCxDQUFaLENBQWdCbUgsU0FBaEIsS0FBOEJELFlBQVksQ0FBQ2xILENBQUQsQ0FBWixDQUFnQm1ILFNBQWhCLEVBQTJCVixTQUEzQixDQUFsQyxFQUF5RTtBQUM5RVMsZ0JBQVksQ0FBQ2xILENBQUQsQ0FBWixDQUFnQm1ILFNBQWhCLEVBQTJCVixTQUEzQixLQUF5QyxDQUF6QztBQUNELEdBRk0sTUFFQTtBQUNMUyxnQkFBWSxDQUFDbEgsQ0FBRCxDQUFaLENBQWdCbUgsU0FBaEIsRUFBMkJWLFNBQTNCLElBQXdDLENBQXhDO0FBQ0Q7QUFDRixDQWJELEM7Ozs7Ozs7Ozs7O0FDaExBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG5cbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG5cbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTsgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcblxuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0OyAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG5cbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcblxuXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuXG5cbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcblxuXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG5cblxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSB0aW1lb3V0XG5cblxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcblxuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpOyAvLyBBZGQgeHNyZiBoZWFkZXJcblxuXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID8gY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9IC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG5cblxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcblxuXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfSAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG5cblxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfSAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuXG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfSAvLyBTZW5kIHRoZSByZXF1ZXN0XG5cblxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcblxudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7IC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpOyAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcblxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuICByZXR1cm4gaW5zdGFuY2U7XG59IC8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuXG5cbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTsgLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5cbmF4aW9zLkF4aW9zID0gQXhpb3M7IC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcblxuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07IC8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuXG5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpOyAvLyBFeHBvc2UgYWxsL3NwcmVhZFxuXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7IC8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxuXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuXG5cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xuXG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuXG5cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cblxuXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7IC8vIFNldCBjb25maWcubWV0aG9kXG5cbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9IC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcblxuXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59OyAvLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcblxuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG5cbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcblxudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuXG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307IC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcblxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoY29uZmlnLmRhdGEsIGNvbmZpZy5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVxdWVzdCk7IC8vIEZsYXR0ZW4gaGVhZGVyc1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LCBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSwgY29uZmlnLmhlYWRlcnMpO1xuICB1dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLCBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgfSk7XG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZXNwb25zZS5kYXRhLCByZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEocmVhc29uLnJlc3BvbnNlLmRhdGEsIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcblxuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gZXJyb3I7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gWydiYXNlVVJMJywgJ3VybCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLCAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLCAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnbWF4Q29udGVudExlbmd0aCcsICd2YWxpZGF0ZVN0YXR1cycsICdtYXhSZWRpcmVjdHMnLCAnaHR0cEFnZW50JywgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCddO1xuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5cy5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cyk7XG4gIHZhciBvdGhlcktleXMgPSBPYmplY3Qua2V5cyhjb25maWcyKS5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgfSk7XG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBmdW5jdGlvbiBvdGhlcktleXNEZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb25maWc7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuXG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5jb25maWcsIG51bGwsIHJlc3BvbnNlLnJlcXVlc3QsIHJlc3BvbnNlKSk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcblxuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fCB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fCB1dGlscy5pc1N0cmVhbShkYXRhKSB8fCB1dGlscy5pc0ZpbGUoZGF0YSkgfHwgdXRpbHMuaXNCbG9iKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIElnbm9yZSAqL1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkucmVwbGFjZSgvJTQwL2dpLCAnQCcpLnJlcGxhY2UoLyUzQS9naSwgJzonKS5yZXBsYWNlKC8lMjQvZywgJyQnKS5yZXBsYWNlKC8lMkMvZ2ksICcsJykucmVwbGFjZSgvJTIwL2csICcrJykucmVwbGFjZSgvJTVCL2dpLCAnWycpLnJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpIDogYmFzZVVSTDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4ge1xuICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG5mdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB2YXIgb3JpZ2luVVJMO1xuICAvKipcbiAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICBpZiAobXNpZSkge1xuICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICB9XG5cbiAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTsgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgcGF0aG5hbWU6IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOiAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgIH07XG4gIH1cblxuICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgLyoqXG4gICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgKi9cblxuICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICB2YXIgcGFyc2VkID0gdXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICByZXR1cm4gcGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiYgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0O1xuICB9O1xufSgpIDogLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7IC8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5cblxudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gWydhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJywgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLCAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J107XG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcGFyc2VkO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKSAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHZhbCAmJiB2YWwuYnVmZmVyICYmIHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cblxuXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fCBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cblxuXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG5cblxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1lcmdlKClcbi8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqL1xue1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEZ1bmN0aW9uIGVxdWFsIHRvIG1lcmdlIHdpdGggdGhlIGRpZmZlcmVuY2UgYmVpbmcgdGhhdCBubyByZWZlcmVuY2VcbiAqIHRvIG9yaWdpbmFsIG9iamVjdHMgaXMga2VwdC5cbiAqXG4gKiBAc2VlIG1lcmdlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5cblxuZnVuY3Rpb24gZGVlcE1lcmdlKClcbi8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqL1xue1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cblxuXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTsgLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gIH1cblxuICB0cnkge1xuICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgfVxufSkoKTtcblxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9IC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgfVxuICB9XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkcmFpbmluZyA9IGZhbHNlO1xuXG4gIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gIH1cblxuICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgZHJhaW5RdWV1ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gIGlmIChkcmFpbmluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICBkcmFpbmluZyA9IHRydWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbikge1xuICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG5cbiAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICB9XG5cbiAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICB9XG59OyAvLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5cblxuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gIHRoaXMuZnVuID0gZnVuO1xuICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIFtdO1xufTtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnLyc7XG59O1xuXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIDA7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCB7aW5pdE1hcCwgY3RhTGF5ZXJ9IGZyb20gXCIuL3NjcmlwdHMvbWFwXCI7XG5pbXBvcnQge3N2Z0Ryb3Bkb3dufSBmcm9tIFwiLi9zY3JpcHRzL2Ryb3Bkb3duXCI7XG5pbXBvcnQge2xvY2F0aW9uc30gZnJvbSAnLi9zY3JpcHRzL3V0aWwnXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGluaXRNYXAoKTtcbiAgXG4gIGQzLnNlbGVjdChcIi5ib3JvLXNlbGVjdG9yXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJkcm9wZG93blNWR1wiKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDUwMClcbiAgICAuYXR0cihcIndpZHRoXCIsIDIwMClcbiAgY29uc3QgemlwcyA9IGxvY2F0aW9ucy5NYW5oYXR0YW5bXCJDaGVsc2VhIGFuZCBDbGludG9uXCJdO1xuICBzdmdEcm9wZG93bih6aXBzKTtcblxuXG59KTsiLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhID0gemlwID0+IHtcbiAgcmV0dXJuIGF4aW9zLmdldChgL05ZT0RRLyR7emlwfWApLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGFcbiAgfSlcbn07IiwiaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQge2RhdGFQYXJzZSwgemlwTGF0TG9uZ30gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHtjaGFydH0gZnJvbSBcIi4vcGllXCI7XG5pbXBvcnQge21vdmVUb0xvY2F0aW9ufSBmcm9tIFwiLi9tYXBcIjtcblxuZXhwb3J0IGNvbnN0IHN2Z0Ryb3Bkb3duID0gKGxvY2FsaXR5KSA9PiB7XG4gIHZhciBzdmdERCA9IGQzLnNlbGVjdChcIiNkcm9wZG93blNWR1wiKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICBvcHRpb25zLmxvY2FsaXR5ID0gbG9jYWxpdHk7XG4gIG9wdGlvbnMuY29udGFpbmVyID0gc3ZnREQ7XG4gIG9wdGlvbnMuZm9udFNpemUgPSAyMDtcbiAgb3B0aW9ucy5jb2xvciA9IFwiIzMzM1wiO1xuICBvcHRpb25zLmZvbnRGYW1pbHkgPSBcImNhbGlicmlcIjtcbiAgb3B0aW9ucy54ID0gMDtcbiAgb3B0aW9ucy55PSAwO1xuICBvcHRpb25zLm9wdGlvbkhlaWdodD0gNDA7XG4gIG9wdGlvbnMuaGVpZ2h0PSA0MDtcbiAgb3B0aW9ucy53aWR0aD0gMjAwO1xuICBvcHRpb25zLmhvdmVyQ29sb3I9IFwiIzBjNTZmNVwiO1xuICBvcHRpb25zLmhvdmVyVGV4dENvbG9yPSBcIiNmZmZcIjtcbiAgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I9IFwiI2ZmZlwiO1xuICBvcHRpb25zLnBhZGRpbmcgPSA1O1xuICBvcHRpb25zLmNoYW5nZUhhbmRsZXIgPSBzZWxlY3Rpb24gPT4ge1xuICAgIGNvbnNvbGUubG9nKHppcExhdExvbmdbc2VsZWN0aW9uXSk7XG4gICAgbGV0IGxhdCA9IHppcExhdExvbmdbc2VsZWN0aW9uXVswXTtcbiAgICBsZXQgbG9uZyA9IHppcExhdExvbmdbc2VsZWN0aW9uXVsxXTtcbiAgICBtb3ZlVG9Mb2NhdGlvbihsYXQsIGxvbmcpO1xuICAgIFxuICAgIGZldGNoRGF0YShzZWxlY3Rpb24pLnRoZW4oZGF0YSA9PiB7XG4gICAgICBkMy5zZWxlY3QoXCIjcGllU1ZHXCIpLnJlbW92ZSgpO1xuXG4gICAgICBsZXQgcGFyc2VkID0gZGF0YVBhcnNlKGRhdGEpO1xuICAgICAgY2hhcnQocGFyc2VkKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBnID0gc3ZnRERcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ4XCIsIDApXG4gICAgLmF0dHIoXCJ5XCIsIDkpXG4gICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVNwZWVkXCIpXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAvLyAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZSgxLDEpXCIpXG4gICAgLmF0dHIoXCJmb250LWZhbWlseVwiLCBvcHRpb25zLmZvbnRGYW1pbHkpO1xuXG4gIGxldCBzZWxlY3RlZE9wdGlvbiA9IG9wdGlvbnMubG9jYWxpdHlbMF07XG5cbiAgY29uc3Qgc2VsZWN0RmllbGQgPSBnLmFwcGVuZChcImdcIik7XG5cbiAgc2VsZWN0RmllbGRcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLmhlaWdodClcbiAgICAuYXR0cihcImNsYXNzXCIsIFwib3B0aW9uIHNlbGVjdC1maWVsZFwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcilcbiAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjYTBhMGEwXCIpXG4gICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIFwiMVwiKTtcblxuICBjb25zdCBhY3RpdmVUZXh0ID0gc2VsZWN0RmllbGRcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC50ZXh0KHNlbGVjdGVkT3B0aW9uKVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLnBhZGRpbmcpXG4gICAgLmF0dHIoXCJ5XCIsIG9wdGlvbnMuaGVpZ2h0IC8gMiArIG9wdGlvbnMuZm9udFNpemUgLyAzKVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIG9wdGlvbnMuZm9udFNpemUpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpO1xuXG4gIC8vIGFycm93IHN5bWJvbCBhdCB0aGUgZW5kIG9mIHRoZSBzZWxlY3QgYm94XG4gIHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAudGV4dChcIuKWvFwiKVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLndpZHRoIC0gb3B0aW9ucy5mb250U2l6ZSAtIG9wdGlvbnMucGFkZGluZylcbiAgICAuYXR0cihcInlcIiwgb3B0aW9ucy5oZWlnaHQgLyAyICsgKG9wdGlvbnMuZm9udFNpemUgLSAyKSAvIDMpXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgb3B0aW9ucy5mb250U2l6ZSAtIDIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpO1xuXG4gIC8vIHRyYW5zcGFyZW50IHN1cmZhY2UgdG8gY2FwdHVyZSBhY3Rpb25zXG4gIHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMud2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5oZWlnaHQpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgLm9uKFwiY2xpY2tcIiwgaGFuZGxlU2VsZWN0Q2xpY2spO1xuXG4gIC8vIHJlbmRlcmluZyBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbkdyb3VwID0gZ1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCAke29wdGlvbnMuaGVpZ2h0fSlgKVxuICAgIC5hdHRyKFwib3BhY2l0eVwiLCAwKTsgLy8uYXR0cihcImRpc3BsYXlcIiwgXCJub25lXCIpOyBJc3N1ZSBpbiBJRS9GaXJlZm94OiBVbmFibGUgdG8gY2FsY3VsYXRlIHRleHRMZW5ndGggd2hlbiBkaXNwbGF5IGlzIG5vbmUuXG5cbiAgLy8gUmVuZGVyaW5nIG9wdGlvbnMgZ3JvdXBcbiAgY29uc3Qgb3B0aW9uRW50ZXIgPSBvcHRpb25Hcm91cFxuICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgLmRhdGEob3B0aW9ucy5sb2NhbGl0eSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLm9uKFwiY2xpY2tcIiwgaGFuZGxlT3B0aW9uQ2xpY2spO1xuXG4gIC8vIFJlbmRlcmluZyBiYWNrZ3JvdW5kXG4gIG9wdGlvbkVudGVyXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMud2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5vcHRpb25IZWlnaHQpXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqIG9wdGlvbnMub3B0aW9uSGVpZ2h0O1xuICAgIH0pXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcIm9wdGlvblwiKVxuICAgIC5zdHlsZShcInN0cm9rZVwiLCBvcHRpb25zLmhvdmVyQ29sb3IpXG4gICAgLnN0eWxlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCAoZCwgaSkgPT4ge1xuICAgICAgbGV0IHN0cm9rZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgb3B0aW9ucy5vcHRpb25IZWlnaHQsXG4gICAgICAgIG9wdGlvbnMud2lkdGgsXG4gICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0XG4gICAgICBdO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgc3Ryb2tlID0gW1xuICAgICAgICAgIG9wdGlvbnMud2lkdGggKyBvcHRpb25zLm9wdGlvbkhlaWdodCxcbiAgICAgICAgICBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0XG4gICAgICAgIF07XG4gICAgICB9IGVsc2UgaWYgKGkgPT09IG9wdGlvbnMubG9jYWxpdHkubGVuZ3RoIC0gMSkge1xuICAgICAgICBzdHJva2UgPSBbMCwgb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5vcHRpb25IZWlnaHQgKiAyICsgb3B0aW9ucy53aWR0aF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3Ryb2tlLmpvaW4oXCIgXCIpO1xuICAgIH0pXG4gICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcik7XG5cbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLnBhZGRpbmcpXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpICogb3B0aW9ucy5vcHRpb25IZWlnaHQgK1xuICAgICAgICBvcHRpb25zLm9wdGlvbkhlaWdodCAvIDIgK1xuICAgICAgICBvcHRpb25zLmZvbnRTaXplIC8gM1xuICAgICAgKTtcbiAgICB9KVxuICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9KVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIG9wdGlvbnMuZm9udFNpemUpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpXG5cbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLm9wdGlvbkhlaWdodClcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogb3B0aW9ucy5vcHRpb25IZWlnaHQ7XG4gICAgfSlcbiAgICAuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAub24oXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VPdmVyKVxuICAgIC5vbihcIm1vdXNlb3V0XCIsIGhhbmRsZU1vdXNlT3V0KTtcblxuICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIikuYXR0cihcIm9wYWNpdHlcIiwgMSk7XG5cbiAgZDMuc2VsZWN0KFwiYm9keVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlT3ZlcigpIHtcbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwiLm9wdGlvblwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmhvdmVyQ29sb3IpO1xuXG4gICAgZDMuc2VsZWN0KGQzLmV2ZW50LnRhcmdldC5wYXJlbnROb2RlKVxuICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0aW9ucy5ob3ZlclRleHRDb2xvcik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU91dCgpIHtcbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwiLm9wdGlvblwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcik7XG5cbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU9wdGlvbkNsaWNrKGQpIHtcbiAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZWxlY3RlZE9wdGlvbiA9IGQ7XG4gICAgYWN0aXZlVGV4dC50ZXh0KHNlbGVjdGVkT3B0aW9uKVxuICAgIG9wdGlvbnMuY2hhbmdlSGFuZGxlci5jYWxsKHRoaXMsIGQpO1xuICAgIG9wdGlvbkdyb3VwLmF0dHIoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdENsaWNrKCkge1xuICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IHZpc2liaWxpdHkgPSBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiKSA9PT0gXCJibG9ja1wiID8gXCJub25lXCIgOiBcImJsb2NrXCI7XG4gICAgb3B0aW9uR3JvdXAuYXR0cihcImRpc3BsYXlcIiwgdmlzaWJpbGl0eSk7XG4gIH1cblxufVxuIiwiZXhwb3J0IGNvbnN0IGluaXRNYXAgPSAoKSA9PiB7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB6b29tOiAxMSxcbiAgICBjZW50ZXI6IHsgXG4gICAgICBsYXQ6IDQwLjcxMTgxODYsXG4gICAgICBsbmc6IC03NC4wNTAzMjlcbiAgICAgfSwgXG4gICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxuICB9O1xuXG4gIHdpbmRvdy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGNvbnN0IG1vdmVUb0xvY2F0aW9uID0gKGxhdCwgbG5nKSA9PiB7XG4gIGNvbnN0IGNlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICB3aW5kb3cubWFwLnBhblRvKGNlbnRlcik7XG4gIHdpbmRvdy5tYXAuc2V0Wm9vbSgxNSlcbn1cblxuZXhwb3J0IGNvbnN0IGN0YUxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkttbExheWVyKHtcbiAgdXJsOiBcIlwiLFxuICBtYXA6IHdpbmRvdy5tYXBcbn0pIiwiZXhwb3J0IGNvbnN0IGNoYXJ0ID0gZGF0YSA9PiB7XG4gIGQzLnNlbGVjdChcIi5waWUtY29udGFpbmVyXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJwaWVTVkdcIilcbiAgICAuYXR0cihcImhlaWdodFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCA0MDApXG5cbiAgY29uc3QgcGFydGl0aW9uID0gZGF0YSA9PiB7XG4gICAgY29uc3Qgcm9vdCA9IGQzLmhpZXJhcmNoeShkYXRhKVxuICAgICAgLnN1bShkID0+IGQuc2l6ZSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi52YWx1ZSAtIGEudmFsdWUpO1xuXG4gICAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgICAuc2l6ZShbMiAqIE1hdGguUEksIHJvb3QuaGVpZ2h0ICsgMV0pXG4gICAgICAocm9vdCk7XG4gIH07XG5cbiAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csIGRhdGEuY2hpbGRyZW4ubGVuZ3RoICsgMSkpO1xuICBjb25zdCBmb3JtYXQgPSBkMy5mb3JtYXQoXCIsZFwiKTtcbiAgLy8gd2lkdGggcmVmZXJzIHRvIHRoZSB3aWR0aCBvZiB0aGUgZyBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIHBpZVxuICBjb25zdCB3aWR0aCA9IDI5MDtcbiAgY29uc3QgcmFkaXVzID0gd2lkdGggLyA2O1xuICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgIC5zdGFydEFuZ2xlKGQgPT4gZC54MClcbiAgICAuZW5kQW5nbGUoZCA9PiBkLngxKVxuICAgIC5wYWRBbmdsZShkID0+IE1hdGgubWluKChkLngxIC0gZC54MCkgLyAyLCAwLjAwNSkpXG4gICAgLnBhZFJhZGl1cyhyYWRpdXMgKiAxLjUpXG4gICAgLmlubmVyUmFkaXVzKGQgPT4gZC55MCAqIHJhZGl1cyAqIDEuNilcbiAgICAub3V0ZXJSYWRpdXMoZCA9PiBNYXRoLm1heChkLnkwICogcmFkaXVzICogMS43LCBkLnkxICogcmFkaXVzICogMS43IC0gMSkpXG5cbiAgY29uc3Qgcm9vdCA9IHBhcnRpdGlvbihkYXRhKTtcblxuICByb290LmVhY2goZCA9PiB7ZC5jdXJyZW50ID0gZH0pO1xuICBjb25zdCBzdmdQaWUgPSBkMy5zZWxlY3QoXCIjcGllU1ZHXCIpXG5cbiAgY29uc3QgZyA9IHN2Z1BpZS5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgMzAwKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgMzAwKVxuICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt3aW5kb3cuaW5uZXJXaWR0aCAvIDN9LCR7d2lkdGggLyAyfSlgKVxuICAgIC5vbihcIm1vdXNlbGVhdmVcIiwgbW91c2VsZWF2ZSk7XG5cbiAgY29uc3QgYmFja2dyb3VuZCA9IGcuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgLmF0dHIoXCJyXCIsIFwiMTk1XCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDIwMCwgMjAwKWApXG5cbiAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMjAwLCAyMDApYClcbiAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKS5zbGljZSgxKSlcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4geyB3aGlsZSAoZC5kZXB0aCA+IDEpIGQgPSBkLnBhcmVudDsgcmV0dXJuIGNvbG9yKGQuZGF0YS5uYW1lKTsgfSlcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBkID0+IGFyY1Zpc2libGUoZC5jdXJyZW50KSA/IChkLmNoaWxkcmVuID8gMC42IDogMC40KSA6IDApXG4gICAgLmF0dHIoXCJkXCIsIGQgPT4gYXJjKGQuY3VycmVudCkpXG4gICAgLm9uKFwibW91c2VvdmVyXCIsIG1vdXNlb3Zlcik7XG5cbiAgICBcbiAgcGF0aC5maWx0ZXIoZCA9PiBkLmNoaWxkcmVuKVxuICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAub24oXCJjbGlja1wiLCBjbGlja2VkKTtcblxuICBwYXRoLmFwcGVuZChcInRpdGxlXCIpXG4gICAgLnRleHQoZCA9PiBgJHtkLnZhbHVlfWApO1xuXG4gIGNvbnN0IGxhYmVsID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcIm5vbmVcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgyMDAsIDIwMClgKVxuICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgIC5zZWxlY3RBbGwoXCJ0ZXh0XCIpXG4gICAgLmRhdGEocm9vdC5kZXNjZW5kYW50cygpLnNsaWNlKDEpKVxuICAgIC5lbnRlcigpLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImR5XCIsIFwiMC4zNWVtXCIpXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZCA9PiArbGFiZWxWaXNpYmxlKGQuY3VycmVudCkpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZCA9PiBsYWJlbFRyYW5zZm9ybShkLmN1cnJlbnQpKVxuICAgIC50ZXh0KGQgPT4gZC5kYXRhLm5hbWUpO1xuXG4gIC8vcGVyY2VudGFnZSB0ZXh0XG4gIGNvbnN0IHBlcmNlbnRhZ2VfdGV4dCA9IHN2Z1BpZS5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJpZFwiLCBcInRpdGxlXCIpXG4gICAgLmF0dHIoXCJ4XCIsICh3aWR0aCAvIDEuMSkpXG4gICAgLmF0dHIoXCJ5XCIsICh3aWR0aCAvIDIpKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKC02MiwgNjUpYClcbiAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyZW1cIik7XG5cbiAgY29uc3QgcGFyZW50ID0gZy5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAuZGF0dW0ocm9vdClcbiAgICAuYXR0cihcInJcIiwgcmFkaXVzKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwiYWxsXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgyMDAsIDIwMClgKVxuICAgIC5vbihcImNsaWNrXCIsIGNsaWNrZWQpO1xuXG4gIGZ1bmN0aW9uIGNsaWNrZWQocCkge1xuICAgIHBhcmVudC5kYXR1bShwLnBhcmVudCB8fCByb290KTtcblxuICAgIHJvb3QuZWFjaChkID0+IGQudGFyZ2V0ID0ge1xuICAgICAgeDA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChkLngwIC0gcC54MCkgLyAocC54MSAtIHAueDApKSkgKiAyICogTWF0aC5QSSxcbiAgICAgIHgxOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoZC54MSAtIHAueDApIC8gKHAueDEgLSBwLngwKSkpICogMiAqIE1hdGguUEksXG4gICAgICB5MDogTWF0aC5tYXgoMCwgZC55MCAtIHAuZGVwdGgpLFxuICAgICAgeTE6IE1hdGgubWF4KDAsIGQueTEgLSBwLmRlcHRoKVxuICAgIH0pO1xuICAgIGNvbnN0IHQgPSBnLnRyYW5zaXRpb24oKS5kdXJhdGlvbig3NTApO1xuXG4gICAgLy8gVHJhbnNpdGlvbiB0aGUgZGF0YSBvbiBhbGwgYXJjcywgZXZlbiB0aGUgb25lcyB0aGF0IGFyZW7igJl0IHZpc2libGUsXG4gICAgLy8gc28gdGhhdCBpZiB0aGlzIHRyYW5zaXRpb24gaXMgaW50ZXJydXB0ZWQsIGVudGVyaW5nIGFyY3Mgd2lsbCBzdGFydFxuICAgIC8vIHRoZSBuZXh0IHRyYW5zaXRpb24gZnJvbSB0aGUgZGVzaXJlZCBwb3NpdGlvbi5cbiAgICBwYXRoLnRyYW5zaXRpb24odClcbiAgICAgIC50d2VlbihcImRhdGFcIiwgZCA9PiB7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZShkLmN1cnJlbnQsIGQudGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHQgPT4gZC5jdXJyZW50ID0gaSh0KTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiArdGhpcy5nZXRBdHRyaWJ1dGUoXCJmaWxsLW9wYWNpdHlcIikgfHwgYXJjVmlzaWJsZShkLnRhcmdldCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZCA9PiBhcmNWaXNpYmxlKGQudGFyZ2V0KSA/IChkLmNoaWxkcmVuID8gMC42IDogMC40KSA6IDApXG4gICAgICAuYXR0clR3ZWVuKFwiZFwiLCBkID0+ICgpID0+IGFyYyhkLmN1cnJlbnQpKTtcblxuICAgIGxhYmVsLmZpbHRlcihmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuICt0aGlzLmdldEF0dHJpYnV0ZShcImZpbGwtb3BhY2l0eVwiKSB8fCBsYWJlbFZpc2libGUoZC50YXJnZXQpO1xuICAgIH0pLnRyYW5zaXRpb24odClcbiAgICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGQgPT4gK2xhYmVsVmlzaWJsZShkLnRhcmdldCkpXG4gICAgICAuYXR0clR3ZWVuKFwidHJhbnNmb3JtXCIsIGQgPT4gKCkgPT4gbGFiZWxUcmFuc2Zvcm0oZC5jdXJyZW50KSk7XG4gIH1cblxuICAvL21vdXNlIG92ZXJcbiAgY29uc3QgdG90YWxTaXplID0gcm9vdC5kZXNjZW5kYW50cygpWzBdLnZhbHVlO1xuICBmdW5jdGlvbiBtb3VzZW92ZXIoZCkge1xuICAgIHZhciBwZXJjZW50YWdlID0gKDEwMCAqIGQudmFsdWUgLyB0b3RhbFNpemUpLnRvUHJlY2lzaW9uKDMpO1xuICAgIHZhciBwZXJjZW50YWdlU3RyaW5nID0gcGVyY2VudGFnZSArIFwiJVwiO1xuICAgIGlmIChwZXJjZW50YWdlIDwgMC4xKSB7XG4gICAgICBwZXJjZW50YWdlU3RyaW5nID0gXCI8IDAuMSVcIjtcbiAgICB9XG4gICAgcGVyY2VudGFnZV90ZXh0LnRleHQocGVyY2VudGFnZVN0cmluZyArIFwiIFwiKTtcbiAgICBcblxuXG4gICAgdmFyIHNlcXVlbmNlQXJyYXkgPSBkLmFuY2VzdG9ycygpLnJldmVyc2UoKTtcbiAgICBzZXF1ZW5jZUFycmF5LnNoaWZ0KCk7IC8vIHJlbW92ZSByb290IG5vZGUgZnJvbSB0aGUgYXJyYXlcbiAgICAvLyBGYWRlIGFsbCB0aGUgc2VnbWVudHMuXG4gICAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwLjMpO1xuXG4gICAgLy8gVGhlbiBoaWdobGlnaHQgb25seSB0aG9zZSB0aGF0IGFyZSBhbiBhbmNlc3RvciBvZiB0aGUgY3VycmVudCBzZWdtZW50LlxuICAgIGcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gKHNlcXVlbmNlQXJyYXkuaW5kZXhPZihub2RlKSA+PSAwKTtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICB9XG4gIC8vbW91c2UgbGVhdmVcbiAgLy8gUmVzdG9yZSBldmVyeXRoaW5nIHRvIGZ1bGwgb3BhY2l0eSB3aGVuIG1vdmluZyBvZmYgdGhlIHZpc3VhbGl6YXRpb24uXG4gIGZ1bmN0aW9uIG1vdXNlbGVhdmUoZCkge1xuXG4gICAgLy8gRGVhY3RpdmF0ZSBhbGwgc2VnbWVudHMgZHVyaW5nIHRyYW5zaXRpb24uXG4gICAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKS5vbihcIm1vdXNlb3ZlclwiLCBudWxsKTtcblxuICAgIC8vIFRyYW5zaXRpb24gZWFjaCBzZWdtZW50IHRvIGZ1bGwgb3BhY2l0eSBhbmQgdGhlbiByZWFjdGl2YXRlIGl0LlxuICAgIGQzLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpXG4gICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykub24oXCJtb3VzZW92ZXJcIiwgbW91c2VvdmVyKTtcbiAgICAgIH0pO1xuXG4gICAgcGVyY2VudGFnZV90ZXh0LnRleHQoXCJcIik7O1xuICB9XG4gIGZ1bmN0aW9uIGFyY1Zpc2libGUoZCkge1xuICAgIHJldHVybiBkLnkxIDw9IDIgJiYgZC55MCA+PSAxICYmIGQueDEgPiBkLngwO1xuICB9XG5cbiAgZnVuY3Rpb24gbGFiZWxWaXNpYmxlKGQpIHtcbiAgICByZXR1cm4gZC55MSA8PSAyICYmIGQueTAgPj0gMSAmJiAoZC55MSAtIGQueTApICogKGQueDEgLSBkLngwKSA+IDAuMDM7XG4gIH1cblxuICBmdW5jdGlvbiBsYWJlbFRyYW5zZm9ybShkKSB7XG4gICAgY29uc3QgeCA9IChkLngwICsgZC54MSkgLyAyICogMTgwIC8gTWF0aC5QSTtcbiAgICBjb25zdCB5ID0gKGQueTAgKyBkLnkxKSAvIDEuMiAqIHJhZGl1cztcbiAgICByZXR1cm4gYHJvdGF0ZSgke3ggLSA5MH0pIHRyYW5zbGF0ZSgke3l9LDApIHJvdGF0ZSgke3ggPCAxODAgPyAwIDogMTgwfSlgO1xuICB9XG5cbiAgcmV0dXJuIHN2Z1BpZS5ub2RlKCk7XG59IiwiZXhwb3J0IGNvbnN0IGxvY2F0aW9ucyA9IHtcbiAgXCJNYW5oYXR0YW5cIjoge1xuICAgIFwiQ2VudHJhbCBIYXJsZW1cIjogW1wiMTAwMjZcIiwgXCIxMDAyN1wiLCBcIjEwMDMwXCIsIFwiMTAwMzdcIiwgXCIxMDAzOVwiXSxcbiAgICBcIkNoZWxzZWEgYW5kIENsaW50b25cIjogW1wiMTAwMDFcIiwgXCIxMDAxMVwiLCBcIjEwMDE4XCIsIFwiMTAwMTlcIiwgXCIxMDAyMFwiLCBcIjEwMDM2XCJdLFxuICAgIFwiRWFzdCBIYXJsZW1cIjogW1wiMTAwMjlcIiwgXCIxMDAzNVwiXSxcbiAgICBcIkdyYW1lcmN5IFBhcmsgYW5kIE11cnJheSBIaWxsXCI6IFtcIjEwMDEwXCIsIFwiMTAwMTZcIiwgXCIxMDAxN1wiLCBcIjEwMDIyXCJdLFxuICAgIFwiR3JlZW53aWNoIFZpbGxhZ2UgYW5kIFNvaG9cIjogW1wiMTAwMTJcIiwgXCIxMDAxM1wiLCBcIjEwMDE0XCJdLCBcbiAgICBcIkxvd2VyIE1hbmhhdHRhblwiOiBbXCIxMDAwNFwiLCBcIjEwMDA1XCIsIFwiMTAwMDZcIiwgXCIxMDAwN1wiLCBcIjEwMDM4XCIsIFwiMTAyODBcIl0sXG4gICAgXCJMb3dlciBFYXN0IFNpZGVcIjogW1wiMTAwMDJcIiwgXCIxMDAwM1wiLCBcIjEwMDA5XCJdLFxuICAgIFwiVXBwZXIgRWFzdCBTaWRlXCI6IFtcIjEwMDIxXCIsIFwiMTAwMjhcIiwgXCIxMDA0NFwiLCBcIjEwMDY1XCIsIFwiMTAwNzVcIiwgXCIxMDEyOFwiXSxcbiAgICBcIlVwcGVyIFdlc3QgU2lkZVwiOiBbXCIxMDAyM1wiLCBcIjEwMDI0XCIsIFwiMTAwMjVcIl0sXG4gICAgXCJJbndvb2QgYW5kIFdhc2hpbmd0b24gSGVpZ2h0c1wiOiBbXCIxMDAzMVwiLCBcIjEwMDMyXCIsIFwiMTAwMzNcIiwgXCIxMDAzNFwiLCBcIjEwMDQwXCJdXG4gIH0sIFxuICBcIkJyb254XCI6IHtcbiAgICBcIkNlbnRyYWwgQnJvbnhcIjogW1wiMTA0NTNcIiwgXCIxMDQ1N1wiLCBcIjEwNDYwXCJdLFxuICAgIFwiQnJvbnggUGFya1wiOiBbXCIxMDQ1OFwiLCBcIjEwNDY3XCIsIFwiMTA0NjhcIl0sXG4gICAgXCJIaWdoIEJyaWRnZSBhbmQgRm9yZGhhbVwiOiBbXCIxMDQ1MVwiLCBcIjEwNDUyXCIsIFwiMTA0NTZcIl0sXG4gICAgXCJIdW50cyBQb2ludCBhbmQgTW90dCBIYXZlblwiOiBbXCIxMDQ1NFwiLCBcIjEwNDU1XCIsIFwiMTA0NTlcIiwgXCIxMDQ3NFwiXSxcbiAgICBcIktpbmdzYnJpZGdlIGFuZCBSaXZlcmRhbGVcIjogW1wiMTA0NjNcIiwgXCIxMDQ3MVwiXSxcbiAgICBcIk5vcnRoZWFzdCBCcm9ueFwiOiBbXCIxMDQ2NlwiLCBcIjEwNDY5XCIsIFwiMTA0NzBcIiwgXCIxMDQ3NVwiXSxcbiAgICBcIlNvdXRoZWFzdCBCcm9ueFwiOiBbXCIxMDQ2MVwiLCBcIjEwNDYyXCIsIFwiMTA0NjRcIiwgXCIxMDQ2NVwiLCBcIjEwNDcyXCIsIFwiMTA0NzNcIl1cbiAgfSxcbiAgXCJCcm9va2x5blwiOiB7XG4gICAgXCJDZW50cmFsIEJyb29rbHluXCI6IFtcIjExMjEyXCIsIFwiMTEyMTNcIiwgXCIxMTIxNlwiLCBcIjExMjMzXCIsIFwiMTEyMzhcIl0sXG4gICAgXCJTb3V0aHdlc3QgQnJvb2tseW5cIjogW1wiMTEyMDlcIiwgXCIxMTIxNFwiLCBcIjExMjI4XCJdLFxuICAgIFwiQm9yb3VnaCBQYXJrXCI6IFtcIjExMjA0XCIsIFwiMTEyMThcIiwgXCIxMTIxOVwiLCBcIjExMjMwXCJdLFxuICAgIFwiQ2FuYXJzaWUgYW5kIEZsYXRsYW5kc1wiOiBbXCIxMTIzNFwiLCBcIjExMjM2XCIsIFwiMTEyMzlcIl0sXG4gICAgXCJTb3V0aGVybiBCcm9va2x5blwiOiBbXCIxMTIyM1wiLCBcIjExMjI0XCIsIFwiMTEyMjlcIiwgXCIxMTIzNVwiXSxcbiAgICBcIk5vcnRod2VzdCBCcm9va2x5blwiOiBbXCIxMTIwMVwiLCBcIjExMjA1XCIsIFwiMTEyMTVcIiwgXCIxMTIxN1wiLCBcIjExMjMxXCJdLFxuICAgIFwiRmxhdGJ1c2hcIjogW1wiMTEyMDNcIiwgXCIxMTIxMFwiLCBcIjExMjI1XCIsIFwiMTEyMjZcIl0sXG4gICAgXCJFYXN0IE5ldyBZb3JrIGFuZCBOZXcgTG90c1wiOiBbXCIxMTIwN1wiLCBcIjExMjA4XCJdLFxuICAgIFwiR3JlZW5wb2ludFwiOiBbXCIxMTIxMVwiLCBcIjExMjIyXCJdLFxuICAgIFwiU3Vuc2V0IFBhcmtcIjogW1wiMTEyMjBcIiwgXCIxMTIzMlwiXSxcbiAgICBcIkJ1c2h3aWNrIGFuZCBXaWxsaWFtc2J1cmdcIjogW1wiMTEyMDZcIiwgXCIxMTIyMVwiLCBcIjExMjM3XCJdXG4gIH0sXG4gIFwiUXVlZW5zXCI6IHtcbiAgICBcIk5vcnRoZWFzdCBRdWVlbnNcIjogW1wiMTEzNjFcIiwgXCIxMTM2MlwiLCBcIjExMzYzXCIsIFwiMTEzNjRcIl0sXG4gICAgXCJOb3J0aCBRdWVlbnNcIjogW1wiMTEzNTRcIiwgXCIxMTM1NVwiLCBcIjExMzU2XCIsIFwiMTEzNTdcIiwgXCIxMTM1OFwiLCBcIjExMzU5XCIsIFwiMTEzNjBcIl0sXG4gICAgXCJDZW50cmFsIFF1ZWVuc1wiOiBbXCIxMTM2NVwiLCBcIjExMzY2XCIsIFwiMTEzNjdcIl0sXG4gICAgXCJKYW1haWNhXCI6IFtcIjExNDEyXCIsIFwiMTE0MjNcIiwgXCIxMTQzMlwiLCBcIjExNDMzXCIsIFwiMTE0MzRcIiwgXCIxMTQzNVwiLCBcIjExNDM2XCJdLFxuICAgIFwiTm9ydGh3ZXN0IFF1ZWVuc1wiOiBbXCIxMTEwMVwiLCBcIjExMTAyXCIsIFwiMTExMDNcIiwgXCIxMTEwNFwiLCBcIjExMTA1XCIsIFwiMTExMDZcIl0sXG4gICAgXCJXZXN0IENlbnRyYWwgUXVlZW5zXCI6IFtcIjExMzc0XCIsIFwiMTEzNzVcIiwgXCIxMTM3OVwiLCBcIjExMzg1XCJdLFxuICAgIFwiUm9ja2F3YXlzXCI6IFtcIjExNjkxXCIsIFwiMTE2OTJcIiwgXCIxMTY5M1wiLCBcIjExNjk0XCIsIFwiMTE2OTVcIiwgXCIxMTY5N1wiXSxcbiAgICBcIlNvdXRoZWFzdCBRdWVlbnNcIjogW1wiMTEwMDRcIiwgXCIxMTAwNVwiLCBcIjExNDExXCIsIFwiMTE0MTNcIiwgXCIxMTQyMlwiLCBcIjExNDI2XCIsIFwiMTE0MjdcIiwgXCIxMTQyOFwiLCBcIjExNDI5XCJdLFxuICAgIFwiU291dGh3ZXN0IFF1ZWVuc1wiOiBbXCIxMTQxNFwiLCBcIjExNDE1XCIsIFwiMTE0MTZcIiwgXCIxMTQxN1wiLCBcIjExNDE4XCIsIFwiMTE0MTlcIiwgXCIxMTQyMFwiLCBcIjExNDIxXCJdLFxuICAgIFwiV2VzdCBRdWVlbnNcIjogW1wiMTEzNjhcIiwgXCIxMTM2OVwiLCBcIjExMzcwXCIsIFwiMTEzNzJcIiwgXCIxMTM3M1wiLCBcIjExMzc3XCIsIFwiMTEzNzhcIl1cbiAgfSxcbiAgXCJTdGF0ZW4gSXNsYW5kXCI6IHtcbiAgICBcIlBvcnQgUmljaG1vbmRcIjogW1wiMTAzMDJcIiwgXCIxMDMwM1wiLCBcIjEwMzEwXCJdLFxuICAgIFwiU291dGggU2hvcmVcIjogW1wiMTAzMDZcIiwgXCIxMDMwN1wiLCBcIjEwMzA4XCIsIFwiMTAzMDlcIiwgXCIxMDMxMlwiXSxcbiAgICBcIlN0YXBsZXRvbiBhbmQgU3QuIEdlb3JnZVwiOiBbXCIxMDMwMVwiLCBcIjEwMzA0XCIsIFwiMTAzMDVcIl0sXG4gICAgXCJNaWQtSXNsYW5kXCI6IFtcIjEwMzE0XCJdXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHppcExhdExvbmcgPSB7XG4gIFwiMTAwMDFcIjogWzQwLjc1MzcsIC03My45OTkyXSxcbiAgXCIxMDAxMVwiOiBbNDAuNzQ2NSwgLTc0LjAwOTRdLFxuICBcIjEwMDE4XCI6IFs0MC43NTUzLCAtNzMuOTkzM10sXG4gIFwiMTAwMTlcIjogWzQwLjc2ODcsIC03My45OTE4XSxcbiAgXCIxMDAyMFwiOiBbNDAuNzYwNiwgLTczLjk4MjNdLFxuICBcIjEwMDM2XCI6IFs0MC43NjAzLCAtNzMuOTkzM11cbn1cblxuZXhwb3J0IGNvbnN0IGRhdGFQYXJzZSA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IHBpZVRyZWVEYXRhID0ge1xuICAgIG5hbWU6IFwiemlwY29kZVwiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiJDEwbSA8XCIsIFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCIkMW0gPCAkMTBtXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIiQ1MDBrIDwgJDFtXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIiQyMDBrIHRvICQ1MDBrXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIjwgJDIwMGtcIixcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9XG4gICAgXVxuICB9O1xuICAvLyB0b3RhbCBhdmcgY2FsYyBmb3IgdGhhdCB6aXAgY29kZVxuXG4gIC8vIENPTU1FTlQgSU4gV0hFTiBDUkVBVElORyBUT1RBTCBBVkVSQUdFUyBESVNQTEFZICoqKioqKioqKioqKioqKioqKioqKlxuICAvLyBsZXQgdG90YWxDb3VudCA9IDA7XG4gIC8vIGxldCB0b3RhbFZhbCA9IDA7XG5cbiAgLy8gc3BsaXQgaW50byA1IHByaWNlIGJyYWNrZXRzXG4gIC8vIDE6IDEwbWlsICssIDI6IDFtaWwgLSAxMG1pbCwgMzogNTAway05Ljk5OWssIDQ6IDIwMC00OTlrLCA1OiA8IDIwMGtcblxuICAvLyBFQUNIIEJSQUNLRVQgQVNTRVNTRUQgVkFMVUVTIEFORCBDT1VOVFMgRk9SIEFWRVJBR0UgKioqKioqKioqKioqKioqKipcbiAgLy8gbGV0IGJyYWNrZXQxVmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQyVmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQzVmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQ0VmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQ1VmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQxQ3QgPSAwO1xuICAvLyBsZXQgYnJhY2tldDJDdCA9IDA7XG4gIC8vIGxldCBicmFja2V0M0N0ID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQ0Q3QgPSAwO1xuICAvLyBsZXQgYnJhY2tldDVDdCA9IDA7XG5cbiAgbGV0IGJyYWNrZXRCbGRnQ2xhc3MgPSBbe30se30se30se30se31dO1xuXG5cbiAgZGF0YS5mb3JFYWNoKHByb3BlcnR5T2JqID0+IHtcbiAgICBsZXQgcHJvcFZhbCA9IHBhcnNlSW50KHByb3BlcnR5T2JqLmZ1bGx2YWwpO1xuICAgIGxldCBibGRnQ2xhc3MgPSBwcm9wZXJ0eU9iai5ibGRnY2w7XG4gICAgXG4gICAgLy8gdG90YWwgYXZnXG5cbiAgICAvLyBDT01NRU5UIElOIFdIRU4gQ1JFQVRJTkcgVE9UQUwgQVZFUkFHRVMgRElTUExBWSAqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyB0b3RhbFZhbCA9IHRvdGFsVmFsICsgcHJvcFZhbDtcbiAgICAvLyB0b3RhbENvdW50Kys7XG5cbiAgICAvLyBwcmljZSBicmFja2V0c1xuICAgIGlmIChwcm9wVmFsID49IDEwMDAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0MVZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDFDdCArPSAxXG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMCwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCAxMDAwMDAwMCAmJiBwcm9wVmFsID49IDEwMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQyVmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0MkN0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMSwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCAxMDAwMDAwICYmIHByb3BWYWwgPj0gNTAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0M1ZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDNDdCArPSAxO1xuXG4gICAgICBibGRnQ2xhc3NQYXJzZShibGRnQ2xhc3MsIDIsIGJyYWNrZXRCbGRnQ2xhc3MpXG4gICAgfSBlbHNlIGlmIChwcm9wVmFsIDwgNTAwMDAwICYmIHByb3BWYWwgPj0gMjAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0NFZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDRDdCArPSAxO1xuXG4gICAgICBibGRnQ2xhc3NQYXJzZShibGRnQ2xhc3MsIDMsIGJyYWNrZXRCbGRnQ2xhc3MpXG4gICAgfSBlbHNlIGlmIChwcm9wVmFsIDwgMjAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0NVZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDVDdCArPSAxO1xuXG4gICAgICBibGRnQ2xhc3NQYXJzZShibGRnQ2xhc3MsIDQsIGJyYWNrZXRCbGRnQ2xhc3MpXG4gICAgfVxuICB9KTtcblxuICBicmFja2V0QmxkZ0NsYXNzLmZvckVhY2goKGJyYWNrZXQsIGkpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gYnJhY2tldCkge1xuICAgICAgXG4gICAgICBsZXQgdiA9IFtdXG4gICAgICBsZXQgY2xhc3NDb2Rlc09iaiA9IGJyYWNrZXRba2V5XTtcblxuICAgICAgZm9yIChsZXQgY2xhc3NDb2RlcyBpbiBjbGFzc0NvZGVzT2JqKSB7XG4gICAgICAgIHYucHVzaCh7XG4gICAgICAgICAgbmFtZTogY2xhc3NDb2RlcyxcbiAgICAgICAgICBzaXplOiBjbGFzc0NvZGVzT2JqW2NsYXNzQ29kZXNdXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgXG4gICAgICBwaWVUcmVlRGF0YS5jaGlsZHJlbltpXS5jaGlsZHJlbi5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIGNoaWxkcmVuOiB2XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIHBpZVRyZWVEYXRhO1xuICAvLyByZXR1cm4gKHRvdGFsVmFsIC8gdG90YWxDb3VudCk7XG59XG5cbmNvbnN0IGJsZGdDbGFzc1BhcnNlID0gKGJsZGdDbGFzcywgaSwgYmxkZ1BhcnNlT2JqKSA9PiB7XG4gIGxldCBjbGFzc1R5cGUgPSBibGRnQ2xhc3Muc3BsaXQoXCJcIilbMF07XG5cbiAgaWYgKGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgY2xhc3NPYmogPSB7fTtcbiAgICBjbGFzc09ialtibGRnQ2xhc3NdID0gMTtcblxuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdID0gY2xhc3NPYmo7XG4gIH0gZWxzZSBpZiAoYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV0gJiYgYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV1bYmxkZ0NsYXNzXSkge1xuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdW2JsZGdDbGFzc10gKz0gMTtcbiAgfSBlbHNlIHtcbiAgICBibGRnUGFyc2VPYmpbaV1bY2xhc3NUeXBlXVtibGRnQ2xhc3NdID0gMTtcbiAgfVxufVxuXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9