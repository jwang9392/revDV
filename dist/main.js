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
/* harmony import */ var _scripts_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/api */ "./src/scripts/api.js");





window.addEventListener("DOMContentLoaded", function () {
  Object(_scripts_map__WEBPACK_IMPORTED_MODULE_1__["initMap"])();
  var dropdown = d3.select(".dropdown-selector");
  dropdown.append("svg").attr("id", "dropdownSVG").attr("height", 500).attr("width", 400);
  var boroughs = Object.keys(_scripts_util__WEBPACK_IMPORTED_MODULE_3__["locations"]);
  Object(_scripts_dropdown__WEBPACK_IMPORTED_MODULE_2__["svgDropdown"])(boroughs);
});

/***/ }),

/***/ "./src/scripts/api.js":
/*!****************************!*\
  !*** ./src/scripts/api.js ***!
  \****************************/
/*! exports provided: fetchData, fetchZipData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchData", function() { return fetchData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchZipData", function() { return fetchZipData; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var fetchData = function fetchData(zip) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/NYODQ/".concat(zip)).then(function (response) {
    console.log(response.data);
    return response.data;
  });
};
var fetchZipData = function fetchZipData() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("../../NY_zip_lat_long.json").then(function (res) {
    var newObj = {};
    res.data.forEach(function (element) {
      newObj[element.fields.zip] = [element.fields.latitude, element.fields.longitude];
    });
    debugger;
    return newObj;
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
  var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  debugger;
  var svgDD = d3.select("#dropdownSVG");
  var options = {};
  options.locations = _util__WEBPACK_IMPORTED_MODULE_1__["locations"];
  options.locality = locality;
  options.parents = parents;
  options.container = svgDD;
  options.fontSize = 20;
  options.color = "#333";
  options.fontFamily = "calibri";
  options.x = 0;
  options.y = 0;
  options.optionHeight = 40;
  options.height = 40;
  options.width = 280;
  options.hoverColor = "#0c56f5";
  options.hoverTextColor = "#fff";
  options.backgroundColor = "#fff";
  options.padding = 5;

  options.changeHandler = function (selection) {
    if (options.parents.length === 2) {
      debugger;
      console.log(_util__WEBPACK_IMPORTED_MODULE_1__["zipLatLong"][selection]);
      var lat = _util__WEBPACK_IMPORTED_MODULE_1__["zipLatLong"][selection][0];
      var long = _util__WEBPACK_IMPORTED_MODULE_1__["zipLatLong"][selection][1];
      Object(_map__WEBPACK_IMPORTED_MODULE_3__["moveToLocation"])(lat, long);
      Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchData"])(selection).then(function (data) {
        d3.select("#pieSVG").remove();
        var parsed = Object(_util__WEBPACK_IMPORTED_MODULE_1__["dataParse"])(data);
        Object(_pie__WEBPACK_IMPORTED_MODULE_2__["chart"])(parsed);
      });
    } else {
      console.log("here");
      var selectionLocales;

      if (options.parents.length === 0) {
        var boro = selection;
        options.parents.push(selection);
        selectionLocales = Object.keys(options.locations[boro]);
        svgDropdown(selectionLocales, options.parents);
      } else if (options.parents.length === 1) {
        var neighborhood = selection;
        options.parents.push(selection);
        var _boro = options.parents[0];
        selectionLocales = options.locations[_boro][neighborhood];
        svgDropdown(selectionLocales, options.parents);
      }
    }
  };

  var svgId = function svgId(parentSize) {
    if (!parentSize) {
      return "svgBoroDD";
    } else if (parentSize === 1) {
      return "svgNeighborhoodDD";
    } else if (parentSize === 2) {
      return "svgZipDD";
    }
  };

  var g = svgDD.append("svg").attr("x", 0).attr("y", 9).attr("shape-rendering", "optimizeSpeed").attr("id", svgId(options.parents.length)).append("g").attr("font-family", options.fontFamily);

  var selectedOption = function selectedOption(parentSize) {
    if (!parentSize) {
      return "Select a Borough";
    } else if (parentSize === 1) {
      return "Select a Neighborhood";
    } else if (parentSize === 2) {
      return "Select a Zip Code";
    }
  };

  var selectField = g.append("g");
  selectField.append("rect").attr("x", "1").attr("width", options.width).attr("height", options.height).attr("class", "option select-field").attr("fill", options.backgroundColor).style("stroke", "#a0a0a0").style("stroke-width", "1");
  var activeText = selectField.append("text").text(selectedOption(options.parents.length)).attr("x", options.padding).attr("y", options.height / 2 + options.fontSize / 3).attr("font-size", options.fontSize).attr("fill", options.color); // arrow symbol at the end of the select box

  selectField.append("text").text("▼").attr("x", options.width - options.fontSize - options.padding).attr("y", options.height / 2 + (options.fontSize - 2) / 3).attr("font-size", options.fontSize - 2).attr("fill", options.color); // transparent surface to capture actions

  selectField.append("rect").attr("width", options.width).attr("height", options.height).style("fill", "transparent").on("click", handleSelectClick); // back button

  var backMessage = function backMessage() {
    if (options.parents.length === 1) {
      return "Boroughs";
    } else if (options.parents.length === 2) {
      return "Neighborhoods";
    }
  };

  if (options.parents.length > 0) {
    var backField = selectField.append("g").attr("id", "select-back-button");
    backField.append("rect").attr("width", "110").attr("height", options.height).attr("x", options.width + 6).attr("fill", options.backgroundColor).style("stroke", "#a0a0a0").style("stroke-width", "1");
    backField.append("text").text("Back to").attr("width", "110").attr("height", options.height).attr("x", options.width + 10).attr("y", options.height / 2 + options.fontSize / 3 - 8).attr("font-size", options.fontSize / 1.2).attr("fill", options.color);
    backField.append("text").text(backMessage()).attr("width", "110").attr("height", options.height).attr("x", options.width + 10).attr("y", options.height / 2 + options.fontSize / 3 + 7).attr("font-size", options.fontSize / 1.2).attr("fill", options.color);
    backField.append("rect").attr("width", "110").attr("height", options.height).attr("x", options.width + 10).style("fill", "transparent").on("click", handleBackClick);
  } // rendering options


  var optionGroup = g.append("g").attr("id", "option-selectors").attr("transform", "translate(0, ".concat(options.height, ")")).attr("opacity", 0); //.attr("display", "none"); Issue in IE/Firefox: Unable to calculate textLength when display is none.
  // Rendering options group

  var optionEnter = optionGroup.selectAll("g").data(options.locality).enter().append("g").on("click", handleOptionClick); // Rendering background

  optionEnter.append("rect").attr("width", options.width).attr("height", options.optionHeight) // .attr("x", "1")            <----------- THE ALIGNMENT OF DROPDOWN AND ITS OPTIONS IS OFF BY 1 PX WHEN ZOOMING
  .attr("y", function (d, i) {
    return i * options.optionHeight;
  }).attr("class", "option").style("stroke", "#a0a0a0").style("stroke-dasharray", function (d, i) {
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
    d3.event.stopPropagation(); // selectedOption = d;
    // activeText.text(selectedOption)

    options.changeHandler.call(this, d);
    optionGroup.attr("display", "none");
  }

  function handleSelectClick() {
    d3.event.stopPropagation();
    var visibility = optionGroup.attr("display") === "block" ? "none" : "block";
    optionGroup.attr("display", visibility);
  }

  function handleBackClick() {
    d3.event.stopPropagation();
    var level = "";

    if (options.parents.length === 1) {
      level = "#svgNeighborhoodDD";
    } else if (options.parents.length === 2) {
      level = "#svgZipDD";
    }

    d3.select(level).remove();
    options.parents.pop();
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
    return d.y0 * radius * 1.4;
  }).outerRadius(function (d) {
    return Math.max(d.y0 * radius * 1.9, d.y1 * radius * 1.9 - 1);
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
    var y = (d.y0 + d.y1) / 1.15 * radius;
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
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/scripts/api.js");

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
var zipLatLong = null;
var zipData = Object(_api__WEBPACK_IMPORTED_MODULE_0__["fetchZipData"])();
zipData.then(function (resp) {
  return zipLatLong = resp;
});
var dataParse = function dataParse(data) {
  debugger;
  var pieTreeData = {
    name: "zipcode",
    // val: 0,
    // count: 0,
    children: [{
      name: "$10m <",
      // val: 0,
      // count: 0,
      children: []
    }, {
      name: "$1m < $10m",
      // val: 0,
      // count: 0,
      children: []
    }, {
      name: "$500k < $1m",
      // val: 0,
      // count: 0,
      children: []
    }, {
      name: "$200k to $500k",
      // val: 0,
      // count: 0,
      children: []
    }, {
      name: "< $200k",
      // val: 0,
      // count: 0,
      children: []
    }]
  }; // total avg calc for that zip code
  // split into 5 price brackets
  // 1: 10mil +, 2: 1mil - 10mil, 3: 500k-9.999k, 4: 200-499k, 5: < 200k
  // EACH BRACKET ASSESSED VALUES AND COUNTS FOR AVERAGE *****************

  var bracketBldgClass = [{}, {}, {}, {}, {}];
  data.forEach(function (propertyObj) {
    var propVal = parseInt(propertyObj.fullval);
    var bldgClass = propertyObj.bldgcl; // total avg
    // pieTreeData.val = pieTreeData.val + propVal;
    // pieTreeData.count++;
    // price brackets

    if (propVal >= 10000000) {
      // pieTreeData.children[0].val += propVal;
      // pieTreeData.children[0].count += 1
      bldgClassParse(bldgClass, 0, bracketBldgClass);
    } else if (propVal < 10000000 && propVal >= 1000000) {
      // pieTreeData.children[1].val += propVal;
      // pieTreeData.children[1].count += 1;
      bldgClassParse(bldgClass, 1, bracketBldgClass);
    } else if (propVal < 1000000 && propVal >= 500000) {
      // pieTreeData.children[2].val += propVal;
      // pieTreeData.children[2].count += 1;
      bldgClassParse(bldgClass, 2, bracketBldgClass);
    } else if (propVal < 500000 && propVal >= 200000) {
      // pieTreeData.children[3].val += propVal;
      // pieTreeData.children[3].count += 1;
      bldgClassParse(bldgClass, 3, bracketBldgClass);
    } else if (propVal < 200000) {
      // pieTreeData.children[4].val += propVal;
      // pieTreeData.children[4].count += 1;
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
  debugger;
  return pieTreeData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9waWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRNYXAiLCJkcm9wZG93biIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImJvcm91Z2hzIiwiT2JqZWN0Iiwia2V5cyIsImxvY2F0aW9ucyIsInN2Z0Ryb3Bkb3duIiwiZmV0Y2hEYXRhIiwiemlwIiwiYXhpb3MiLCJnZXQiLCJ0aGVuIiwicmVzcG9uc2UiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsImZldGNoWmlwRGF0YSIsInJlcyIsIm5ld09iaiIsImZvckVhY2giLCJlbGVtZW50IiwiZmllbGRzIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJsb2NhbGl0eSIsInBhcmVudHMiLCJzdmdERCIsIm9wdGlvbnMiLCJjb250YWluZXIiLCJmb250U2l6ZSIsImNvbG9yIiwiZm9udEZhbWlseSIsIngiLCJ5Iiwib3B0aW9uSGVpZ2h0IiwiaGVpZ2h0Iiwid2lkdGgiLCJob3ZlckNvbG9yIiwiaG92ZXJUZXh0Q29sb3IiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwiY2hhbmdlSGFuZGxlciIsInNlbGVjdGlvbiIsImxlbmd0aCIsInppcExhdExvbmciLCJsYXQiLCJsb25nIiwibW92ZVRvTG9jYXRpb24iLCJyZW1vdmUiLCJwYXJzZWQiLCJkYXRhUGFyc2UiLCJjaGFydCIsInNlbGVjdGlvbkxvY2FsZXMiLCJib3JvIiwicHVzaCIsIm5laWdoYm9yaG9vZCIsInN2Z0lkIiwicGFyZW50U2l6ZSIsImciLCJzZWxlY3RlZE9wdGlvbiIsInNlbGVjdEZpZWxkIiwic3R5bGUiLCJhY3RpdmVUZXh0IiwidGV4dCIsIm9uIiwiaGFuZGxlU2VsZWN0Q2xpY2siLCJiYWNrTWVzc2FnZSIsImJhY2tGaWVsZCIsImhhbmRsZUJhY2tDbGljayIsIm9wdGlvbkdyb3VwIiwib3B0aW9uRW50ZXIiLCJzZWxlY3RBbGwiLCJlbnRlciIsImhhbmRsZU9wdGlvbkNsaWNrIiwiZCIsImkiLCJzdHJva2UiLCJqb2luIiwiaGFuZGxlTW91c2VPdmVyIiwiaGFuZGxlTW91c2VPdXQiLCJldmVudCIsInRhcmdldCIsInBhcmVudE5vZGUiLCJzdG9wUHJvcGFnYXRpb24iLCJjYWxsIiwidmlzaWJpbGl0eSIsImxldmVsIiwicG9wIiwiem9vbSIsImNlbnRlciIsImxuZyIsImRpc2FibGVEZWZhdWx0VUkiLCJtYXAiLCJnb29nbGUiLCJtYXBzIiwiTWFwIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkxhdExuZyIsInBhblRvIiwic2V0Wm9vbSIsImN0YUxheWVyIiwiS21sTGF5ZXIiLCJ1cmwiLCJpbm5lckhlaWdodCIsInBhcnRpdGlvbiIsInJvb3QiLCJoaWVyYXJjaHkiLCJzdW0iLCJzaXplIiwic29ydCIsImEiLCJiIiwidmFsdWUiLCJNYXRoIiwiUEkiLCJzY2FsZU9yZGluYWwiLCJyYW5nZSIsInF1YW50aXplIiwiaW50ZXJwb2xhdGVSYWluYm93IiwiY2hpbGRyZW4iLCJmb3JtYXQiLCJyYWRpdXMiLCJhcmMiLCJzdGFydEFuZ2xlIiwieDAiLCJlbmRBbmdsZSIsIngxIiwicGFkQW5nbGUiLCJtaW4iLCJwYWRSYWRpdXMiLCJpbm5lclJhZGl1cyIsInkwIiwib3V0ZXJSYWRpdXMiLCJtYXgiLCJ5MSIsImVhY2giLCJjdXJyZW50Iiwic3ZnUGllIiwibW91c2VsZWF2ZSIsImJhY2tncm91bmQiLCJwYXRoIiwiZGVzY2VuZGFudHMiLCJzbGljZSIsImRlcHRoIiwicGFyZW50IiwibmFtZSIsImFyY1Zpc2libGUiLCJtb3VzZW92ZXIiLCJmaWx0ZXIiLCJjbGlja2VkIiwibGFiZWwiLCJsYWJlbFZpc2libGUiLCJsYWJlbFRyYW5zZm9ybSIsInBlcmNlbnRhZ2VfdGV4dCIsImRhdHVtIiwicCIsInQiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJ0d2VlbiIsImludGVycG9sYXRlIiwiZ2V0QXR0cmlidXRlIiwiYXR0clR3ZWVuIiwidG90YWxTaXplIiwicGVyY2VudGFnZSIsInRvUHJlY2lzaW9uIiwicGVyY2VudGFnZVN0cmluZyIsInNlcXVlbmNlQXJyYXkiLCJhbmNlc3RvcnMiLCJyZXZlcnNlIiwic2hpZnQiLCJub2RlIiwiaW5kZXhPZiIsInppcERhdGEiLCJyZXNwIiwicGllVHJlZURhdGEiLCJicmFja2V0QmxkZ0NsYXNzIiwicHJvcGVydHlPYmoiLCJwcm9wVmFsIiwicGFyc2VJbnQiLCJmdWxsdmFsIiwiYmxkZ0NsYXNzIiwiYmxkZ2NsIiwiYmxkZ0NsYXNzUGFyc2UiLCJicmFja2V0Iiwia2V5IiwidiIsImNsYXNzQ29kZXNPYmoiLCJjbGFzc0NvZGVzIiwiYmxkZ1BhcnNlT2JqIiwiY2xhc3NUeXBlIiwic3BsaXQiLCJ1bmRlZmluZWQiLCJjbGFzc09iaiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFhLEU7Ozs7Ozs7Ozs7OztBQ0F6Qjs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDLGFBQWEsbUJBQU8sQ0FBQyxpRUFBa0I7O0FBRXZDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7O0FBRTlDLG9CQUFvQixtQkFBTyxDQUFDLDZFQUF1Qjs7QUFFbkQsbUJBQW1CLG1CQUFPLENBQUMsbUZBQTJCOztBQUV0RCxzQkFBc0IsbUJBQU8sQ0FBQyx5RkFBOEI7O0FBRTVELGtCQUFrQixtQkFBTyxDQUFDLHlFQUFxQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEM7QUFDNUM7O0FBRUEsdUNBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0hBQWdIOztBQUVoSCxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxPQUFPOzs7QUFHUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3Qzs7QUFFeEM7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4RUFBOEU7O0FBRTlFO0FBQ0EsTUFBTTs7O0FBR047QUFDQTtBQUNBO0FBQ0Esa0VBQWtFOztBQUVsRTtBQUNBLE1BQU07OztBQUdOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdGQUFnRjs7QUFFaEY7QUFDQSxNQUFNO0FBQ047QUFDQTs7O0FBR0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyx5RUFBc0IsRUFBRTs7O0FBR3BEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7OztBQUdMO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7O0FBRXZCO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBLEdBQUc7QUFDSCxFOzs7Ozs7Ozs7Ozs7QUNoTGE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLGtEQUFTOztBQUU3QixXQUFXLG1CQUFPLENBQUMsZ0VBQWdCOztBQUVuQyxZQUFZLG1CQUFPLENBQUMsNERBQWM7O0FBRWxDLGtCQUFrQixtQkFBTyxDQUFDLHdFQUFvQjs7QUFFOUMsZUFBZSxtQkFBTyxDQUFDLHdEQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLE1BQU07QUFDbEI7OztBQUdBO0FBQ0E7QUFDQSx3REFBd0Q7O0FBRXhELG1EQUFtRDs7QUFFbkQ7QUFDQTtBQUNBLENBQUM7OztBQUdELHFDQUFxQzs7QUFFckMsb0JBQW9COztBQUVwQjtBQUNBO0FBQ0EsRUFBRTs7O0FBR0YsZUFBZSxtQkFBTyxDQUFDLGtFQUFpQjtBQUN4QyxvQkFBb0IsbUJBQU8sQ0FBQyw0RUFBc0I7QUFDbEQsaUJBQWlCLG1CQUFPLENBQUMsc0VBQW1CLEVBQUU7O0FBRTlDO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLG1CQUFPLENBQUMsb0VBQWtCO0FBQ3pDLHVCQUF1Qjs7QUFFdkIsK0I7Ozs7Ozs7Ozs7OztBQ2xEYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25COztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Qjs7Ozs7Ozs7Ozs7O0FDakJhOztBQUViLGFBQWEsbUJBQU8sQ0FBQywyREFBVTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkI7Ozs7Ozs7Ozs7OztBQzFEYTs7QUFFYjtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDSmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQyxlQUFlLG1CQUFPLENBQUMseUVBQXFCOztBQUU1Qyx5QkFBeUIsbUJBQU8sQ0FBQyxpRkFBc0I7O0FBRXZELHNCQUFzQixtQkFBTyxDQUFDLDJFQUFtQjs7QUFFakQsa0JBQWtCLG1CQUFPLENBQUMsbUVBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUEsOENBQThDOztBQUU5QztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7O0FBR0Y7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRCx1Qjs7Ozs7Ozs7Ozs7O0FDOUZhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQjtBQUNBLFlBQVksT0FBTztBQUNuQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxvQzs7Ozs7Ozs7Ozs7O0FDdERhOztBQUViLG9CQUFvQixtQkFBTyxDQUFDLG1GQUEwQjs7QUFFdEQsa0JBQWtCLG1CQUFPLENBQUMsK0VBQXdCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUN0QmE7O0FBRWIsbUJBQW1CLG1CQUFPLENBQUMscUVBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxNQUFNO0FBQ25COzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNsQmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQyxvQkFBb0IsbUJBQU8sQ0FBQyx1RUFBaUI7O0FBRTdDLGVBQWUsbUJBQU8sQ0FBQyx1RUFBb0I7O0FBRTNDLGVBQWUsbUJBQU8sQ0FBQyx5REFBYTtBQUNwQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBLHVDQUF1Qzs7QUFFdkMsd0NBQXdDOztBQUV4QyxvRkFBb0Y7O0FBRXBGLDBEQUEwRCxxQ0FBcUM7QUFDL0Y7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EseUNBQXlDOztBQUV6QztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsMkNBQTJDOztBQUUzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSCxFOzs7Ozs7Ozs7Ozs7QUN2RGE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDM0NhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxtREFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ3ZEYTs7QUFFYixrQkFBa0IsbUJBQU8sQ0FBQyxtRUFBZTtBQUN6QztBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNwQmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLE1BQU07QUFDakIsV0FBVyxlQUFlO0FBQzFCLGFBQWEsRUFBRTtBQUNmOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ25CQSwrQ0FBYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsa0RBQVM7O0FBRTdCLDBCQUEwQixtQkFBTyxDQUFDLDhGQUErQjs7QUFFakU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGdFQUFnQjtBQUN0QyxHQUFHO0FBQ0g7QUFDQSxjQUFjLG1CQUFPLENBQUMsaUVBQWlCO0FBQ3ZDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXdFO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRCwwQjs7Ozs7Ozs7Ozs7OztBQzVGYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNaYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2pFYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDLEtBQUs7QUFDTDtBQUNBLHdEQUF3RCx3QkFBd0I7QUFDaEY7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDLEc7Ozs7Ozs7Ozs7OztBQzlDWTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2JhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWM7QUFDZDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQThDOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLGNBQWMsUUFBUTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsRzs7Ozs7Ozs7Ozs7O0FDekRZOztBQUViLFlBQVksbUJBQU8sQ0FBQyxtREFBVTs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEU7Ozs7Ozs7Ozs7OztBQ1hhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWSxFQUFFO0FBQ2xDOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ2pEYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUMxQmE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLGdFQUFnQjtBQUNuQztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztB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LENBQWdCb0gsU0FBaEIsRUFBMkJULFNBQTNCLEtBQXlDLENBQXpDO0FBQ0QsR0FGTSxNQUVBO0FBQ0xRLGdCQUFZLENBQUNuSCxDQUFELENBQVosQ0FBZ0JvSCxTQUFoQixFQUEyQlQsU0FBM0IsSUFBd0MsQ0FBeEM7QUFDRDtBQUNGLENBYkQsQzs7Ozs7Ozs7Ozs7QUNsS0EsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xuXG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcblxudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuLi9jb3JlL2J1aWxkRnVsbFBhdGgnKTtcblxudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcblxudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG5cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpOyAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7IC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcblxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuXG5cbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG5cblxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuXG5cbiAgICByZXF1ZXN0Lm9uYWJvcnQgPSBmdW5jdGlvbiBoYW5kbGVBYm9ydCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBhYm9ydGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcblxuXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIHRpbWVvdXRcblxuXG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSAndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnO1xuXG4gICAgICBpZiAoY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2UpIHtcbiAgICAgICAgdGltZW91dEVycm9yTWVzc2FnZSA9IGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IodGltZW91dEVycm9yTWVzc2FnZSwgY29uZmlnLCAnRUNPTk5BQk9SVEVEJywgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG5cblxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7IC8vIEFkZCB4c3JmIGhlYWRlclxuXG5cbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgPyBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH0gLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcblxuXG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9IC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcblxuXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuXG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9IC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9IC8vIFNlbmQgdGhlIHJlcXVlc3RcblxuXG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG5cbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xuXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL2NvcmUvbWVyZ2VDb25maWcnKTtcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cblxuXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTsgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcblxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7IC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG4gIHJldHVybiBpbnN0YW5jZTtcbn0gLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG5cblxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpOyAvLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcblxuYXhpb3MuQXhpb3MgPSBBeGlvczsgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGF4aW9zLmRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTsgLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5cblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7IC8vIEV4cG9zZSBhbGwvc3ByZWFkXG5cbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcblxuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBheGlvczsgLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvczsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuXG5cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuXG5cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcblxudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG5cbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5cblxuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuXG5cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gYXJndW1lbnRzWzFdIHx8IHt9O1xuICAgIGNvbmZpZy51cmwgPSBhcmd1bWVudHNbMF07XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnIHx8IHt9O1xuICB9XG5cbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTsgLy8gU2V0IGNvbmZpZy5tZXRob2RcblxuICBpZiAoY29uZmlnLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAodGhpcy5kZWZhdWx0cy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gdGhpcy5kZWZhdWx0cy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcubWV0aG9kID0gJ2dldCc7XG4gIH0gLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuXG5cbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbkF4aW9zLnByb3RvdHlwZS5nZXRVcmkgPSBmdW5jdGlvbiBnZXRVcmkoY29uZmlnKSB7XG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIHJldHVybiBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcikucmVwbGFjZSgvXlxcPy8sICcnKTtcbn07IC8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xuXG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uICh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBBeGlvczsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcblxudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIGJhc2VVUkwgd2l0aCB0aGUgcmVxdWVzdGVkVVJMLFxuICogb25seSB3aGVuIHRoZSByZXF1ZXN0ZWRVUkwgaXMgbm90IGFscmVhZHkgYW4gYWJzb2x1dGUgVVJMLlxuICogSWYgdGhlIHJlcXVlc3RVUkwgaXMgYWJzb2x1dGUsIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgcmVxdWVzdGVkVVJMIHVudG91Y2hlZC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZXF1ZXN0ZWRVUkwgQWJzb2x1dGUgb3IgcmVsYXRpdmUgVVJMIHRvIGNvbWJpbmVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG5cbiAgcmV0dXJuIHJlcXVlc3RlZFVSTDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xuXG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG5cbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTsgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShjb25maWcuZGF0YSwgY29uZmlnLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0KTsgLy8gRmxhdHRlbiBoZWFkZXJzXG5cbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LCBjb25maWcuaGVhZGVycyk7XG4gIHV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICB9KTtcbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcblxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKHJlc3BvbnNlLmRhdGEsIHJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZWFzb24ucmVzcG9uc2UuZGF0YSwgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuXG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC8vIFN0YW5kYXJkXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAvLyBNaWNyb3NvZnRcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmRlc2NyaXB0aW9uLFxuICAgICAgbnVtYmVyOiB0aGlzLm51bWJlcixcbiAgICAgIC8vIE1vemlsbGFcbiAgICAgIGZpbGVOYW1lOiB0aGlzLmZpbGVOYW1lLFxuICAgICAgbGluZU51bWJlcjogdGhpcy5saW5lTnVtYmVyLFxuICAgICAgY29sdW1uTnVtYmVyOiB0aGlzLmNvbHVtbk51bWJlcixcbiAgICAgIHN0YWNrOiB0aGlzLnN0YWNrLFxuICAgICAgLy8gQXhpb3NcbiAgICAgIGNvbmZpZzogdGhpcy5jb25maWcsXG4gICAgICBjb2RlOiB0aGlzLmNvZGVcbiAgICB9O1xuICB9O1xuXG4gIHJldHVybiBlcnJvcjtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuLyoqXG4gKiBDb25maWctc3BlY2lmaWMgbWVyZ2UtZnVuY3Rpb24gd2hpY2ggY3JlYXRlcyBhIG5ldyBjb25maWctb2JqZWN0XG4gKiBieSBtZXJnaW5nIHR3byBjb25maWd1cmF0aW9uIG9iamVjdHMgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzFcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG4gIHZhciB2YWx1ZUZyb21Db25maWcyS2V5cyA9IFsndXJsJywgJ21ldGhvZCcsICdwYXJhbXMnLCAnZGF0YSddO1xuICB2YXIgbWVyZ2VEZWVwUHJvcGVydGllc0tleXMgPSBbJ2hlYWRlcnMnLCAnYXV0aCcsICdwcm94eSddO1xuICB2YXIgZGVmYXVsdFRvQ29uZmlnMktleXMgPSBbJ2Jhc2VVUkwnLCAndXJsJywgJ3RyYW5zZm9ybVJlcXVlc3QnLCAndHJhbnNmb3JtUmVzcG9uc2UnLCAncGFyYW1zU2VyaWFsaXplcicsICd0aW1lb3V0JywgJ3dpdGhDcmVkZW50aWFscycsICdhZGFwdGVyJywgJ3Jlc3BvbnNlVHlwZScsICd4c3JmQ29va2llTmFtZScsICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJywgJ3ZhbGlkYXRlU3RhdHVzJywgJ21heFJlZGlyZWN0cycsICdodHRwQWdlbnQnLCAnaHR0cHNBZ2VudCcsICdjYW5jZWxUb2tlbicsICdzb2NrZXRQYXRoJ107XG4gIHV0aWxzLmZvckVhY2godmFsdWVGcm9tQ29uZmlnMktleXMsIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cywgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmZvckVhY2goZGVmYXVsdFRvQ29uZmlnMktleXMsIGZ1bmN0aW9uIGRlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdmFyIGF4aW9zS2V5cyA9IHZhbHVlRnJvbUNvbmZpZzJLZXlzLmNvbmNhdChtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cykuY29uY2F0KGRlZmF1bHRUb0NvbmZpZzJLZXlzKTtcbiAgdmFyIG90aGVyS2V5cyA9IE9iamVjdC5rZXlzKGNvbmZpZzIpLmZpbHRlcihmdW5jdGlvbiBmaWx0ZXJBeGlvc0tleXMoa2V5KSB7XG4gICAgcmV0dXJuIGF4aW9zS2V5cy5pbmRleE9mKGtleSkgPT09IC0xO1xuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChvdGhlcktleXMsIGZ1bmN0aW9uIG90aGVyS2V5c0RlZmF1bHRUb0NvbmZpZzIocHJvcCkge1xuICAgIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbmZpZztcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG5cbiAgaWYgKCF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLmNvbmZpZywgbnVsbCwgcmVzcG9uc2UucmVxdWVzdCwgcmVzcG9uc2UpKTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuXG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cblxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fCB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8IHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8IHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8IHV0aWxzLmlzRmlsZShkYXRhKSB8fCB1dGlscy5pc0Jsb2IoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLyogSWdub3JlICovXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0czsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5yZXBsYWNlKC8lNDAvZ2ksICdAJykucmVwbGFjZSgvJTNBL2dpLCAnOicpLnJlcGxhY2UoLyUyNC9nLCAnJCcpLnJlcGxhY2UoLyUyQy9naSwgJywnKS5yZXBsYWNlKC8lMjAvZywgJysnKS5yZXBsYWNlKC8lNUIvZ2ksICdbJykucmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG5cbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB2YXIgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKCcjJyk7XG5cbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkwgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJykgOiBiYXNlVVJMO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID8gLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG5mdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiB7XG4gICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgIH1cblxuICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgfSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICByZXR1cm4gbWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgfVxuICB9O1xufSgpIDogLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4ge1xuICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID8gLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4vLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbmZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIHZhciBvcmlnaW5VUkw7XG4gIC8qKlxuICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICovXG5cbiAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgIGlmIChtc2llKSB7XG4gICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgIH1cblxuICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpOyAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG5cbiAgICByZXR1cm4ge1xuICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICBwYXRobmFtZTogdXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycgPyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6ICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgfTtcbiAgfVxuXG4gIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAvKipcbiAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAqL1xuXG4gIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgIHZhciBwYXJzZWQgPSB1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgIHJldHVybiBwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJiBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3Q7XG4gIH07XG59KCkgOiAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xufSgpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTsgLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcblxuXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJywgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLCAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXTtcbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykge1xuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBwYXJzZWQ7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpICYmIHR5cGVvZiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKHZhbCk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgQXJyYXlCdWZmZXIuaXNWaWV3KSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdmFsICYmIHZhbC5idWZmZXIgJiYgdmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuXG5cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fCBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05TJykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuXG5cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfSAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcblxuXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5cblxuZnVuY3Rpb24gbWVyZ2UoKVxuLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovXG57XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRnVuY3Rpb24gZXF1YWwgdG8gbWVyZ2Ugd2l0aCB0aGUgZGlmZmVyZW5jZSBiZWluZyB0aGF0IG5vIHJlZmVyZW5jZVxuICogdG8gb3JpZ2luYWwgb2JqZWN0cyBpcyBrZXB0LlxuICpcbiAqIEBzZWUgbWVyZ2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBkZWVwTWVyZ2UoKVxuLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovXG57XG4gIHZhciByZXN1bHQgPSB7fTtcblxuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGRlZXBNZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuXG5cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZGVlcE1lcmdlOiBkZWVwTWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59OyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9OyAvLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgfVxuXG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICB9XG59KSgpO1xuXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcblxuXG4gIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH1cblxuICB0cnkge1xuICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGRyYWluaW5nID0gZmFsc2U7XG5cbiAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgfVxuXG4gIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICBkcmFpblF1ZXVlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgaWYgKGRyYWluaW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gIGRyYWluaW5nID0gdHJ1ZTtcbiAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcblxuICB3aGlsZSAobGVuKSB7XG4gICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgcXVldWUgPSBbXTtcblxuICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gIH1cblxuICBjdXJyZW50UXVldWUgPSBudWxsO1xuICBkcmFpbmluZyA9IGZhbHNlO1xuICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICB9XG5cbiAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcblxuICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gIH1cbn07IC8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcblxuXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgdGhpcy5mdW4gPSBmdW47XG4gIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cblxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5cbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gW107XG59O1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICcvJztcbn07XG5cbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gMDtcbn07IiwiaW1wb3J0IFwiLi9zdHlsZXMvaW5kZXguc2Nzc1wiO1xuaW1wb3J0IHtpbml0TWFwLCBjdGFMYXllcn0gZnJvbSBcIi4vc2NyaXB0cy9tYXBcIjtcbmltcG9ydCB7c3ZnRHJvcGRvd24sIHRlc3RERH0gZnJvbSBcIi4vc2NyaXB0cy9kcm9wZG93blwiO1xuaW1wb3J0IHtsb2NhdGlvbnN9IGZyb20gJy4vc2NyaXB0cy91dGlsJztcbmltcG9ydCB7ZmV0Y2haaXBEYXRhfSBmcm9tICcuL3NjcmlwdHMvYXBpJztcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgaW5pdE1hcCgpO1xuICBjb25zdCBkcm9wZG93biA9IGQzLnNlbGVjdChcIi5kcm9wZG93bi1zZWxlY3RvclwiKVxuICAgIGRyb3Bkb3duLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJkcm9wZG93blNWR1wiKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDUwMClcbiAgICAuYXR0cihcIndpZHRoXCIsIDQwMClcbiAgXG4gIGNvbnN0IGJvcm91Z2hzID0gT2JqZWN0LmtleXMobG9jYXRpb25zKTtcbiAgc3ZnRHJvcGRvd24oYm9yb3VnaHMpO1xufSk7IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IHppcCA9PiB7XG4gIHJldHVybiBheGlvcy5nZXQoYC9OWU9EUS8ke3ppcH1gKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKVxuICAgIHJldHVybiByZXNwb25zZS5kYXRhXG4gIH0pXG59O1xuXG5leHBvcnQgY29uc3QgZmV0Y2haaXBEYXRhID0gKCkgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KFwiLi4vLi4vTllfemlwX2xhdF9sb25nLmpzb25cIikudGhlbihyZXMgPT4ge1xuICAgIGxldCBuZXdPYmogPSB7fTtcblxuICAgIHJlcy5kYXRhLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBuZXdPYmpbZWxlbWVudC5maWVsZHMuemlwXSA9IFtlbGVtZW50LmZpZWxkcy5sYXRpdHVkZSwgZWxlbWVudC5maWVsZHMubG9uZ2l0dWRlXTtcbiAgICB9KTtcbmRlYnVnZ2VyXG4gICAgcmV0dXJuIG5ld09iajtcbiAgfSlcbn07IiwiaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSBcIi4vYXBpXCI7XG5pbXBvcnQge2xvY2F0aW9ucywgZGF0YVBhcnNlLCB6aXBMYXRMb25nfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQge2NoYXJ0fSBmcm9tIFwiLi9waWVcIjtcbmltcG9ydCB7bW92ZVRvTG9jYXRpb259IGZyb20gXCIuL21hcFwiO1xuXG5leHBvcnQgY29uc3Qgc3ZnRHJvcGRvd24gPSAobG9jYWxpdHksIHBhcmVudHMgPSBbXSkgPT4ge1xuICBkZWJ1Z2dlclxuICB2YXIgc3ZnREQgPSBkMy5zZWxlY3QoXCIjZHJvcGRvd25TVkdcIik7XG4gIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgb3B0aW9ucy5sb2NhdGlvbnMgPSBsb2NhdGlvbnM7XG4gIG9wdGlvbnMubG9jYWxpdHkgPSBsb2NhbGl0eTtcbiAgb3B0aW9ucy5wYXJlbnRzID0gcGFyZW50cztcbiAgb3B0aW9ucy5jb250YWluZXIgPSBzdmdERDtcbiAgb3B0aW9ucy5mb250U2l6ZSA9IDIwO1xuICBvcHRpb25zLmNvbG9yID0gXCIjMzMzXCI7XG4gIG9wdGlvbnMuZm9udEZhbWlseSA9IFwiY2FsaWJyaVwiO1xuICBvcHRpb25zLnggPSAwO1xuICBvcHRpb25zLnk9IDA7XG4gIG9wdGlvbnMub3B0aW9uSGVpZ2h0PSA0MDtcbiAgb3B0aW9ucy5oZWlnaHQ9IDQwO1xuICBvcHRpb25zLndpZHRoPSAyODA7XG4gIG9wdGlvbnMuaG92ZXJDb2xvcj0gXCIjMGM1NmY1XCI7XG4gIG9wdGlvbnMuaG92ZXJUZXh0Q29sb3I9IFwiI2ZmZlwiO1xuICBvcHRpb25zLmJhY2tncm91bmRDb2xvcj0gXCIjZmZmXCI7XG4gIG9wdGlvbnMucGFkZGluZyA9IDU7XG4gIG9wdGlvbnMuY2hhbmdlSGFuZGxlciA9IHNlbGVjdGlvbiA9PiB7XG4gICAgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGRlYnVnZ2VyXG4gICAgICBjb25zb2xlLmxvZyh6aXBMYXRMb25nW3NlbGVjdGlvbl0pO1xuICAgICAgbGV0IGxhdCA9IHppcExhdExvbmdbc2VsZWN0aW9uXVswXTtcbiAgICAgIGxldCBsb25nID0gemlwTGF0TG9uZ1tzZWxlY3Rpb25dWzFdO1xuICAgICAgbW92ZVRvTG9jYXRpb24obGF0LCBsb25nKTtcbiAgICAgIGZldGNoRGF0YShzZWxlY3Rpb24pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGQzLnNlbGVjdChcIiNwaWVTVkdcIikucmVtb3ZlKCk7XG4gICAgICAgIGxldCBwYXJzZWQgPSBkYXRhUGFyc2UoZGF0YSk7XG4gICAgICAgIGNoYXJ0KHBhcnNlZCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJoZXJlXCIpXG4gICAgICBsZXQgc2VsZWN0aW9uTG9jYWxlcztcbiAgICAgIGlmIChvcHRpb25zLnBhcmVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGxldCBib3JvID0gc2VsZWN0aW9uO1xuICAgICAgICBvcHRpb25zLnBhcmVudHMucHVzaChzZWxlY3Rpb24pXG4gICAgICAgIHNlbGVjdGlvbkxvY2FsZXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLmxvY2F0aW9uc1tib3JvXSk7XG4gICAgICAgIHN2Z0Ryb3Bkb3duKHNlbGVjdGlvbkxvY2FsZXMsIG9wdGlvbnMucGFyZW50cylcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJlbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsZXQgbmVpZ2hib3Job29kID0gc2VsZWN0aW9uO1xuICAgICAgICBvcHRpb25zLnBhcmVudHMucHVzaChzZWxlY3Rpb24pXG4gICAgICAgIGxldCBib3JvID0gb3B0aW9ucy5wYXJlbnRzWzBdO1xuICAgICAgICBzZWxlY3Rpb25Mb2NhbGVzID0gb3B0aW9ucy5sb2NhdGlvbnNbYm9yb11bbmVpZ2hib3Job29kXTtcbiAgICAgICAgc3ZnRHJvcGRvd24oc2VsZWN0aW9uTG9jYWxlcywgb3B0aW9ucy5wYXJlbnRzKVxuICAgICAgfVxuICAgICAgXG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN2Z0lkID0gcGFyZW50U2l6ZSA9PiB7XG4gICAgaWYgKCFwYXJlbnRTaXplKSB7XG4gICAgICByZXR1cm4gXCJzdmdCb3JvRERcIjtcbiAgICB9IGVsc2UgaWYgKHBhcmVudFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBcInN2Z05laWdoYm9yaG9vZEREXCI7XG4gICAgfSBlbHNlIGlmIChwYXJlbnRTaXplID09PSAyKSB7XG4gICAgICByZXR1cm4gXCJzdmdaaXBERFwiO1xuICAgIH1cbiAgfVxuICBjb25zdCBnID0gc3ZnRERcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ4XCIsIDApXG4gICAgLmF0dHIoXCJ5XCIsIDkpXG4gICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVNwZWVkXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBzdmdJZChvcHRpb25zLnBhcmVudHMubGVuZ3RoKSlcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiZm9udC1mYW1pbHlcIiwgb3B0aW9ucy5mb250RmFtaWx5KTtcblxuICBsZXQgc2VsZWN0ZWRPcHRpb24gPSBwYXJlbnRTaXplID0+IHtcbiAgICBpZiAoIXBhcmVudFNpemUpIHtcbiAgICAgIHJldHVybiBcIlNlbGVjdCBhIEJvcm91Z2hcIjtcbiAgICB9IGVsc2UgaWYgKHBhcmVudFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBcIlNlbGVjdCBhIE5laWdoYm9yaG9vZFwiO1xuICAgIH0gZWxzZSBpZiAocGFyZW50U2l6ZSA9PT0gMikge1xuICAgICAgcmV0dXJuIFwiU2VsZWN0IGEgWmlwIENvZGVcIjtcbiAgICB9XG4gIH1cblxuICBjb25zdCBzZWxlY3RGaWVsZCA9IGcuYXBwZW5kKFwiZ1wiKTtcblxuICBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJ4XCIsIFwiMVwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLmhlaWdodClcbiAgICAuYXR0cihcImNsYXNzXCIsIFwib3B0aW9uIHNlbGVjdC1maWVsZFwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcilcbiAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjYTBhMGEwXCIpXG4gICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIFwiMVwiKTtcblxuICBjb25zdCBhY3RpdmVUZXh0ID0gc2VsZWN0RmllbGRcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC50ZXh0KHNlbGVjdGVkT3B0aW9uKG9wdGlvbnMucGFyZW50cy5sZW5ndGgpKVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLnBhZGRpbmcpXG4gICAgLmF0dHIoXCJ5XCIsIG9wdGlvbnMuaGVpZ2h0IC8gMiArIG9wdGlvbnMuZm9udFNpemUgLyAzKVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIG9wdGlvbnMuZm9udFNpemUpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpO1xuXG4gIC8vIGFycm93IHN5bWJvbCBhdCB0aGUgZW5kIG9mIHRoZSBzZWxlY3QgYm94XG4gIHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAudGV4dChcIuKWvFwiKVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLndpZHRoIC0gb3B0aW9ucy5mb250U2l6ZSAtIG9wdGlvbnMucGFkZGluZylcbiAgICAuYXR0cihcInlcIiwgb3B0aW9ucy5oZWlnaHQgLyAyICsgKG9wdGlvbnMuZm9udFNpemUgLSAyKSAvIDMpXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgb3B0aW9ucy5mb250U2l6ZSAtIDIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpO1xuXG4gIC8vIHRyYW5zcGFyZW50IHN1cmZhY2UgdG8gY2FwdHVyZSBhY3Rpb25zXG4gIHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMud2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5oZWlnaHQpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgLm9uKFwiY2xpY2tcIiwgaGFuZGxlU2VsZWN0Q2xpY2spO1xuXG4gIC8vIGJhY2sgYnV0dG9uXG5cbiAgY29uc3QgYmFja01lc3NhZ2UgPSAoKSA9PiB7XG4gICAgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBcIkJvcm91Z2hzXCJcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybiBcIk5laWdoYm9yaG9vZHNcIlxuICAgIH1cbiAgfVxuICBcbiAgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgYmFja0ZpZWxkID0gc2VsZWN0RmllbGQuYXBwZW5kKFwiZ1wiKVxuICAgICAgLmF0dHIoXCJpZFwiLCBcInNlbGVjdC1iYWNrLWJ1dHRvblwiKTtcblxuICAgIGJhY2tGaWVsZC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIFwiMTEwXCIpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLmhlaWdodClcbiAgICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLndpZHRoICsgNilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcilcbiAgICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNhMGEwYTBcIilcbiAgICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCBcIjFcIik7XG5cbiAgICBiYWNrRmllbGQuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgLnRleHQoXCJCYWNrIHRvXCIpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIFwiMTEwXCIpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLmhlaWdodClcbiAgICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLndpZHRoICsgMTApXG4gICAgICAuYXR0cihcInlcIiwgb3B0aW9ucy5oZWlnaHQgLyAyICsgb3B0aW9ucy5mb250U2l6ZSAvIDMgLSA4KVxuICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgb3B0aW9ucy5mb250U2l6ZSAvIDEuMilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKVxuXG4gICAgYmFja0ZpZWxkLmFwcGVuZChcInRleHRcIilcbiAgICAgIC50ZXh0KGJhY2tNZXNzYWdlKCkpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIFwiMTEwXCIpXG4gICAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLmhlaWdodClcbiAgICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLndpZHRoICsgMTApXG4gICAgICAuYXR0cihcInlcIiwgb3B0aW9ucy5oZWlnaHQgLyAyICsgb3B0aW9ucy5mb250U2l6ZSAvIDMgKyA3KVxuICAgICAgLmF0dHIoXCJmb250LXNpemVcIiwgb3B0aW9ucy5mb250U2l6ZSAvIDEuMilcbiAgICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKVxuXG4gICAgYmFja0ZpZWxkXG4gICAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBcIjExMFwiKVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5oZWlnaHQpXG4gICAgICAuYXR0cihcInhcIiwgb3B0aW9ucy53aWR0aCArIDEwKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgICAub24oXCJjbGlja1wiLCBoYW5kbGVCYWNrQ2xpY2spOyAgICBcbiAgfVxuXG4gIC8vIHJlbmRlcmluZyBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbkdyb3VwID0gZ1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBcIm9wdGlvbi1zZWxlY3RvcnNcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsICR7b3B0aW9ucy5oZWlnaHR9KWApXG4gICAgLmF0dHIoXCJvcGFjaXR5XCIsIDApOyAvLy5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7IElzc3VlIGluIElFL0ZpcmVmb3g6IFVuYWJsZSB0byBjYWxjdWxhdGUgdGV4dExlbmd0aCB3aGVuIGRpc3BsYXkgaXMgbm9uZS5cblxuICAvLyBSZW5kZXJpbmcgb3B0aW9ucyBncm91cFxuICBjb25zdCBvcHRpb25FbnRlciA9IG9wdGlvbkdyb3VwXG4gICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAuZGF0YShvcHRpb25zLmxvY2FsaXR5KVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAub24oXCJjbGlja1wiLCBoYW5kbGVPcHRpb25DbGljayk7XG5cbiAgLy8gUmVuZGVyaW5nIGJhY2tncm91bmRcbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLm9wdGlvbkhlaWdodClcbiAgICAvLyAuYXR0cihcInhcIiwgXCIxXCIpICAgICAgICAgICAgPC0tLS0tLS0tLS0tIFRIRSBBTElHTk1FTlQgT0YgRFJPUERPV04gQU5EIElUUyBPUFRJT05TIElTIE9GRiBCWSAxIFBYIFdIRU4gWk9PTUlOR1xuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiBvcHRpb25zLm9wdGlvbkhlaWdodDtcbiAgICB9KVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJvcHRpb25cIilcbiAgICAuc3R5bGUoXCJzdHJva2VcIiwgXCIjYTBhMGEwXCIpXG4gICAgLnN0eWxlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCAoZCwgaSkgPT4ge1xuICAgICAgbGV0IHN0cm9rZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgb3B0aW9ucy5vcHRpb25IZWlnaHQsXG4gICAgICAgIG9wdGlvbnMud2lkdGgsXG4gICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0XG4gICAgICBdO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgc3Ryb2tlID0gW1xuICAgICAgICAgIG9wdGlvbnMud2lkdGggKyBvcHRpb25zLm9wdGlvbkhlaWdodCxcbiAgICAgICAgICBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0XG4gICAgICAgIF07XG4gICAgICB9IGVsc2UgaWYgKGkgPT09IG9wdGlvbnMubG9jYWxpdHkubGVuZ3RoIC0gMSkge1xuICAgICAgICBzdHJva2UgPSBbMCwgb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5vcHRpb25IZWlnaHQgKiAyICsgb3B0aW9ucy53aWR0aF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3Ryb2tlLmpvaW4oXCIgXCIpO1xuICAgIH0pXG4gICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcik7XG5cbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLnBhZGRpbmcpXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpICogb3B0aW9ucy5vcHRpb25IZWlnaHQgK1xuICAgICAgICBvcHRpb25zLm9wdGlvbkhlaWdodCAvIDIgK1xuICAgICAgICBvcHRpb25zLmZvbnRTaXplIC8gM1xuICAgICAgKTtcbiAgICB9KVxuICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9KVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIG9wdGlvbnMuZm9udFNpemUpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpXG5cbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLm9wdGlvbkhlaWdodClcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogb3B0aW9ucy5vcHRpb25IZWlnaHQ7XG4gICAgfSlcbiAgICAuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAub24oXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VPdmVyKVxuICAgIC5vbihcIm1vdXNlb3V0XCIsIGhhbmRsZU1vdXNlT3V0KTtcblxuICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIikuYXR0cihcIm9wYWNpdHlcIiwgMSk7XG5cbiAgZDMuc2VsZWN0KFwiYm9keVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlT3ZlcigpIHtcbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwiLm9wdGlvblwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmhvdmVyQ29sb3IpO1xuXG4gICAgZDMuc2VsZWN0KGQzLmV2ZW50LnRhcmdldC5wYXJlbnROb2RlKVxuICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0aW9ucy5ob3ZlclRleHRDb2xvcik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU91dCgpIHtcbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwiLm9wdGlvblwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcik7XG5cbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU9wdGlvbkNsaWNrKGQpIHtcbiAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyBzZWxlY3RlZE9wdGlvbiA9IGQ7XG4gICAgLy8gYWN0aXZlVGV4dC50ZXh0KHNlbGVjdGVkT3B0aW9uKVxuICAgIG9wdGlvbnMuY2hhbmdlSGFuZGxlci5jYWxsKHRoaXMsIGQpO1xuICAgIG9wdGlvbkdyb3VwLmF0dHIoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdENsaWNrKCkge1xuICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IHZpc2liaWxpdHkgPSBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiKSA9PT0gXCJibG9ja1wiID8gXCJub25lXCIgOiBcImJsb2NrXCI7XG4gICAgb3B0aW9uR3JvdXAuYXR0cihcImRpc3BsYXlcIiwgdmlzaWJpbGl0eSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGhhbmRsZUJhY2tDbGljaygpIHtcbiAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBsZXQgbGV2ZWwgPSBcIlwiO1xuXG4gICAgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxldmVsID0gXCIjc3ZnTmVpZ2hib3Job29kRERcIjtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGxldmVsID0gXCIjc3ZnWmlwRERcIjtcbiAgICB9XG4gICAgZDMuc2VsZWN0KGxldmVsKS5yZW1vdmUoKTtcbiAgICBvcHRpb25zLnBhcmVudHMucG9wKCk7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgaW5pdE1hcCA9ICgpID0+IHtcblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHpvb206IDExLFxuICAgIGNlbnRlcjogeyBcbiAgICAgIGxhdDogNDAuNzExODE4NixcbiAgICAgIGxuZzogLTc0LjA1MDMyOVxuICAgICB9LCBcbiAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlXG4gIH07XG5cbiAgd2luZG93Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIiksIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgY29uc3QgbW92ZVRvTG9jYXRpb24gPSAobGF0LCBsbmcpID0+IHtcbiAgY29uc3QgY2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gIHdpbmRvdy5tYXAucGFuVG8oY2VudGVyKTtcbiAgd2luZG93Lm1hcC5zZXRab29tKDE1KVxufVxuXG5leHBvcnQgY29uc3QgY3RhTGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuS21sTGF5ZXIoe1xuICB1cmw6IFwiXCIsXG4gIG1hcDogd2luZG93Lm1hcFxufSkiLCJleHBvcnQgY29uc3QgY2hhcnQgPSBkYXRhID0+IHtcbiAgZDMuc2VsZWN0KFwiLnBpZS1jb250YWluZXJcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBcInBpZVNWR1wiKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICAuYXR0cihcIndpZHRoXCIsIDQwMClcblxuICBjb25zdCBwYXJ0aXRpb24gPSBkYXRhID0+IHtcbiAgICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgICAuc3VtKGQgPT4gZC5zaXplKVxuICAgIC5zb3J0KChhLCBiKSA9PiBiLnZhbHVlIC0gYS52YWx1ZSk7XG5cbiAgICByZXR1cm4gZDMucGFydGl0aW9uKClcbiAgICAgIC5zaXplKFsyICogTWF0aC5QSSwgcm9vdC5oZWlnaHQgKyAxXSlcbiAgICAgIChyb290KTtcbiAgfTtcblxuICBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdywgZGF0YS5jaGlsZHJlbi5sZW5ndGggKyAxKSk7XG4gIGNvbnN0IGZvcm1hdCA9IGQzLmZvcm1hdChcIixkXCIpO1xuICAvLyB3aWR0aCByZWZlcnMgdG8gdGhlIHdpZHRoIG9mIHRoZSBnIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgcGllXG4gIGNvbnN0IHdpZHRoID0gMjkwO1xuICBjb25zdCByYWRpdXMgPSB3aWR0aCAvIDY7XG4gIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgLnN0YXJ0QW5nbGUoZCA9PiBkLngwKVxuICAgIC5lbmRBbmdsZShkID0+IGQueDEpXG4gICAgLnBhZEFuZ2xlKGQgPT4gTWF0aC5taW4oKGQueDEgLSBkLngwKSAvIDIsIDAuMDA1KSlcbiAgICAucGFkUmFkaXVzKHJhZGl1cyAqIDEuNSlcbiAgICAuaW5uZXJSYWRpdXMoZCA9PiBkLnkwICogcmFkaXVzICogMS40KVxuICAgIC5vdXRlclJhZGl1cyhkID0+IE1hdGgubWF4KGQueTAgKiByYWRpdXMgKiAxLjksIGQueTEgKiByYWRpdXMgKiAxLjkgLSAxKSlcblxuICBjb25zdCByb290ID0gcGFydGl0aW9uKGRhdGEpO1xuXG4gIHJvb3QuZWFjaChkID0+IHtkLmN1cnJlbnQgPSBkfSk7XG4gIGNvbnN0IHN2Z1BpZSA9IGQzLnNlbGVjdChcIiNwaWVTVkdcIilcblxuICBjb25zdCBnID0gc3ZnUGllLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImhlaWdodFwiLCAzMDApXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCAzMDApXG4gICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3dpbmRvdy5pbm5lcldpZHRoIC8gM30sJHt3aWR0aCAvIDJ9KWApXG4gICAgLm9uKFwibW91c2VsZWF2ZVwiLCBtb3VzZWxlYXZlKTtcblxuICBjb25zdCBiYWNrZ3JvdW5kID0gZy5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAuYXR0cihcInJcIiwgXCIxOTVcIilcbiAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMjAwLCAyMDApYClcblxuICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgyMDAsIDIwMClgKVxuICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgLmRhdGEocm9vdC5kZXNjZW5kYW50cygpLnNsaWNlKDEpKVxuICAgIC5lbnRlcigpLmFwcGVuZChcInBhdGhcIilcbiAgICAuYXR0cihcImZpbGxcIiwgZCA9PiB7IHdoaWxlIChkLmRlcHRoID4gMSkgZCA9IGQucGFyZW50OyByZXR1cm4gY29sb3IoZC5kYXRhLm5hbWUpOyB9KVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGQgPT4gYXJjVmlzaWJsZShkLmN1cnJlbnQpID8gKGQuY2hpbGRyZW4gPyAwLjYgOiAwLjQpIDogMClcbiAgICAuYXR0cihcImRcIiwgZCA9PiBhcmMoZC5jdXJyZW50KSlcbiAgICAub24oXCJtb3VzZW92ZXJcIiwgbW91c2VvdmVyKTtcblxuICAgIFxuICBwYXRoLmZpbHRlcihkID0+IGQuY2hpbGRyZW4pXG4gICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgIC5vbihcImNsaWNrXCIsIGNsaWNrZWQpO1xuXG4gIHBhdGguYXBwZW5kKFwidGl0bGVcIilcbiAgICAudGV4dChkID0+IGAke2QudmFsdWV9YCk7XG5cbiAgY29uc3QgbGFiZWwgPSBnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDIwMCwgMjAwKWApXG4gICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAuZGF0YShyb290LmRlc2NlbmRhbnRzKCkuc2xpY2UoMSkpXG4gICAgLmVudGVyKCkuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwiZHlcIiwgXCIwLjM1ZW1cIilcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBkID0+ICtsYWJlbFZpc2libGUoZC5jdXJyZW50KSlcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IGxhYmVsVHJhbnNmb3JtKGQuY3VycmVudCkpXG4gICAgLnRleHQoZCA9PiBkLmRhdGEubmFtZSk7XG5cbiAgLy9wZXJjZW50YWdlIHRleHRcbiAgY29uc3QgcGVyY2VudGFnZV90ZXh0ID0gc3ZnUGllLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImlkXCIsIFwidGl0bGVcIilcbiAgICAuYXR0cihcInhcIiwgKHdpZHRoIC8gMS4xKSlcbiAgICAuYXR0cihcInlcIiwgKHdpZHRoIC8gMikpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoLTYyLCA2NSlgKVxuICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjJlbVwiKTtcblxuICBjb25zdCBwYXJlbnQgPSBnLmFwcGVuZChcImNpcmNsZVwiKVxuICAgIC5kYXR1bShyb290KVxuICAgIC5hdHRyKFwiclwiLCByYWRpdXMpXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxuICAgIC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJhbGxcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDIwMCwgMjAwKWApXG4gICAgLm9uKFwiY2xpY2tcIiwgY2xpY2tlZCk7XG5cbiAgZnVuY3Rpb24gY2xpY2tlZChwKSB7XG4gICAgcGFyZW50LmRhdHVtKHAucGFyZW50IHx8IHJvb3QpO1xuXG4gICAgcm9vdC5lYWNoKGQgPT4gZC50YXJnZXQgPSB7XG4gICAgICB4MDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKGQueDAgLSBwLngwKSAvIChwLngxIC0gcC54MCkpKSAqIDIgKiBNYXRoLlBJLFxuICAgICAgeDE6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChkLngxIC0gcC54MCkgLyAocC54MSAtIHAueDApKSkgKiAyICogTWF0aC5QSSxcbiAgICAgIHkwOiBNYXRoLm1heCgwLCBkLnkwIC0gcC5kZXB0aCksXG4gICAgICB5MTogTWF0aC5tYXgoMCwgZC55MSAtIHAuZGVwdGgpXG4gICAgfSk7XG4gICAgY29uc3QgdCA9IGcudHJhbnNpdGlvbigpLmR1cmF0aW9uKDc1MCk7XG5cbiAgICAvLyBUcmFuc2l0aW9uIHRoZSBkYXRhIG9uIGFsbCBhcmNzLCBldmVuIHRoZSBvbmVzIHRoYXQgYXJlbuKAmXQgdmlzaWJsZSxcbiAgICAvLyBzbyB0aGF0IGlmIHRoaXMgdHJhbnNpdGlvbiBpcyBpbnRlcnJ1cHRlZCwgZW50ZXJpbmcgYXJjcyB3aWxsIHN0YXJ0XG4gICAgLy8gdGhlIG5leHQgdHJhbnNpdGlvbiBmcm9tIHRoZSBkZXNpcmVkIHBvc2l0aW9uLlxuICAgIHBhdGgudHJhbnNpdGlvbih0KVxuICAgICAgLnR3ZWVuKFwiZGF0YVwiLCBkID0+IHtcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKGQuY3VycmVudCwgZC50YXJnZXQpO1xuICAgICAgICByZXR1cm4gdCA9PiBkLmN1cnJlbnQgPSBpKHQpO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLmdldEF0dHJpYnV0ZShcImZpbGwtb3BhY2l0eVwiKSB8fCBhcmNWaXNpYmxlKGQudGFyZ2V0KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBkID0+IGFyY1Zpc2libGUoZC50YXJnZXQpID8gKGQuY2hpbGRyZW4gPyAwLjYgOiAwLjQpIDogMClcbiAgICAgIC5hdHRyVHdlZW4oXCJkXCIsIGQgPT4gKCkgPT4gYXJjKGQuY3VycmVudCkpO1xuXG4gICAgbGFiZWwuZmlsdGVyKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gK3RoaXMuZ2V0QXR0cmlidXRlKFwiZmlsbC1vcGFjaXR5XCIpIHx8IGxhYmVsVmlzaWJsZShkLnRhcmdldCk7XG4gICAgfSkudHJhbnNpdGlvbih0KVxuICAgICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZCA9PiArbGFiZWxWaXNpYmxlKGQudGFyZ2V0KSlcbiAgICAgIC5hdHRyVHdlZW4oXCJ0cmFuc2Zvcm1cIiwgZCA9PiAoKSA9PiBsYWJlbFRyYW5zZm9ybShkLmN1cnJlbnQpKTtcbiAgfVxuXG4gIC8vbW91c2Ugb3ZlclxuICBjb25zdCB0b3RhbFNpemUgPSByb290LmRlc2NlbmRhbnRzKClbMF0udmFsdWU7XG4gIGZ1bmN0aW9uIG1vdXNlb3ZlcihkKSB7XG4gICAgdmFyIHBlcmNlbnRhZ2UgPSAoMTAwICogZC52YWx1ZSAvIHRvdGFsU2l6ZSkudG9QcmVjaXNpb24oMyk7XG4gICAgdmFyIHBlcmNlbnRhZ2VTdHJpbmcgPSBwZXJjZW50YWdlICsgXCIlXCI7XG4gICAgaWYgKHBlcmNlbnRhZ2UgPCAwLjEpIHtcbiAgICAgIHBlcmNlbnRhZ2VTdHJpbmcgPSBcIjwgMC4xJVwiO1xuICAgIH1cbiAgICBwZXJjZW50YWdlX3RleHQudGV4dChwZXJjZW50YWdlU3RyaW5nICsgXCIgXCIpO1xuICAgIFxuXG5cbiAgICB2YXIgc2VxdWVuY2VBcnJheSA9IGQuYW5jZXN0b3JzKCkucmV2ZXJzZSgpO1xuICAgIHNlcXVlbmNlQXJyYXkuc2hpZnQoKTsgLy8gcmVtb3ZlIHJvb3Qgbm9kZSBmcm9tIHRoZSBhcnJheVxuICAgIC8vIEZhZGUgYWxsIHRoZSBzZWdtZW50cy5cbiAgICBkMy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDAuMyk7XG5cbiAgICAvLyBUaGVuIGhpZ2hsaWdodCBvbmx5IHRob3NlIHRoYXQgYXJlIGFuIGFuY2VzdG9yIG9mIHRoZSBjdXJyZW50IHNlZ21lbnQuXG4gICAgZy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiAoc2VxdWVuY2VBcnJheS5pbmRleE9mKG5vZGUpID49IDApO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gIH1cbiAgLy9tb3VzZSBsZWF2ZVxuICAvLyBSZXN0b3JlIGV2ZXJ5dGhpbmcgdG8gZnVsbCBvcGFjaXR5IHdoZW4gbW92aW5nIG9mZiB0aGUgdmlzdWFsaXphdGlvbi5cbiAgZnVuY3Rpb24gbW91c2VsZWF2ZShkKSB7XG5cbiAgICAvLyBEZWFjdGl2YXRlIGFsbCBzZWdtZW50cyBkdXJpbmcgdHJhbnNpdGlvbi5cbiAgICBkMy5zZWxlY3RBbGwoXCJwYXRoXCIpLm9uKFwibW91c2VvdmVyXCIsIG51bGwpO1xuXG4gICAgLy8gVHJhbnNpdGlvbiBlYWNoIHNlZ21lbnQgdG8gZnVsbCBvcGFjaXR5IGFuZCB0aGVuIHJlYWN0aXZhdGUgaXQuXG4gICAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSlcbiAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5vbihcIm1vdXNlb3ZlclwiLCBtb3VzZW92ZXIpO1xuICAgICAgfSk7XG5cbiAgICBwZXJjZW50YWdlX3RleHQudGV4dChcIlwiKTs7XG4gIH1cbiAgZnVuY3Rpb24gYXJjVmlzaWJsZShkKSB7XG4gICAgcmV0dXJuIGQueTEgPD0gMiAmJiBkLnkwID49IDEgJiYgZC54MSA+IGQueDA7XG4gIH1cblxuICBmdW5jdGlvbiBsYWJlbFZpc2libGUoZCkge1xuICAgIHJldHVybiBkLnkxIDw9IDIgJiYgZC55MCA+PSAxICYmIChkLnkxIC0gZC55MCkgKiAoZC54MSAtIGQueDApID4gMC4wMztcbiAgfVxuXG4gIGZ1bmN0aW9uIGxhYmVsVHJhbnNmb3JtKGQpIHtcbiAgICBjb25zdCB4ID0gKGQueDAgKyBkLngxKSAvIDIgKiAxODAgLyBNYXRoLlBJO1xuICAgIGNvbnN0IHkgPSAoZC55MCArIGQueTEpIC8gMS4xNSAqIHJhZGl1cztcbiAgICByZXR1cm4gYHJvdGF0ZSgke3ggLSA5MH0pIHRyYW5zbGF0ZSgke3l9LDApIHJvdGF0ZSgke3ggPCAxODAgPyAwIDogMTgwfSlgO1xuICB9XG5cbiAgcmV0dXJuIHN2Z1BpZS5ub2RlKCk7XG59IiwiaW1wb3J0IHtmZXRjaFppcERhdGF9IGZyb20gJy4vYXBpJztcblxuZXhwb3J0IGNvbnN0IGxvY2F0aW9ucyA9IHtcbiAgXCJNYW5oYXR0YW5cIjoge1xuICAgIFwiQ2VudHJhbCBIYXJsZW1cIjogW1wiMTAwMjZcIiwgXCIxMDAyN1wiLCBcIjEwMDMwXCIsIFwiMTAwMzdcIiwgXCIxMDAzOVwiXSxcbiAgICBcIkNoZWxzZWEgYW5kIENsaW50b25cIjogW1wiMTAwMDFcIiwgXCIxMDAxMVwiLCBcIjEwMDE4XCIsIFwiMTAwMTlcIiwgXCIxMDAyMFwiLCBcIjEwMDM2XCJdLFxuICAgIFwiRWFzdCBIYXJsZW1cIjogW1wiMTAwMjlcIiwgXCIxMDAzNVwiXSxcbiAgICBcIkdyYW1lcmN5IFBhcmsgYW5kIE11cnJheSBIaWxsXCI6IFtcIjEwMDEwXCIsIFwiMTAwMTZcIiwgXCIxMDAxN1wiLCBcIjEwMDIyXCJdLFxuICAgIFwiR3JlZW53aWNoIFZpbGxhZ2UgYW5kIFNvaG9cIjogW1wiMTAwMTJcIiwgXCIxMDAxM1wiLCBcIjEwMDE0XCJdLCBcbiAgICBcIkxvd2VyIE1hbmhhdHRhblwiOiBbXCIxMDAwNFwiLCBcIjEwMDA1XCIsIFwiMTAwMDZcIiwgXCIxMDAwN1wiLCBcIjEwMDM4XCIsIFwiMTAyODBcIl0sXG4gICAgXCJMb3dlciBFYXN0IFNpZGVcIjogW1wiMTAwMDJcIiwgXCIxMDAwM1wiLCBcIjEwMDA5XCJdLFxuICAgIFwiVXBwZXIgRWFzdCBTaWRlXCI6IFtcIjEwMDIxXCIsIFwiMTAwMjhcIiwgXCIxMDA0NFwiLCBcIjEwMDY1XCIsIFwiMTAwNzVcIiwgXCIxMDEyOFwiXSxcbiAgICBcIlVwcGVyIFdlc3QgU2lkZVwiOiBbXCIxMDAyM1wiLCBcIjEwMDI0XCIsIFwiMTAwMjVcIl0sXG4gICAgXCJJbndvb2QgYW5kIFdhc2hpbmd0b24gSGVpZ2h0c1wiOiBbXCIxMDAzMVwiLCBcIjEwMDMyXCIsIFwiMTAwMzNcIiwgXCIxMDAzNFwiLCBcIjEwMDQwXCJdXG4gIH0sIFxuICBcIkJyb254XCI6IHtcbiAgICBcIkNlbnRyYWwgQnJvbnhcIjogW1wiMTA0NTNcIiwgXCIxMDQ1N1wiLCBcIjEwNDYwXCJdLFxuICAgIFwiQnJvbnggUGFya1wiOiBbXCIxMDQ1OFwiLCBcIjEwNDY3XCIsIFwiMTA0NjhcIl0sXG4gICAgXCJIaWdoIEJyaWRnZSBhbmQgRm9yZGhhbVwiOiBbXCIxMDQ1MVwiLCBcIjEwNDUyXCIsIFwiMTA0NTZcIl0sXG4gICAgXCJIdW50cyBQb2ludCBhbmQgTW90dCBIYXZlblwiOiBbXCIxMDQ1NFwiLCBcIjEwNDU1XCIsIFwiMTA0NTlcIiwgXCIxMDQ3NFwiXSxcbiAgICBcIktpbmdzYnJpZGdlIGFuZCBSaXZlcmRhbGVcIjogW1wiMTA0NjNcIiwgXCIxMDQ3MVwiXSxcbiAgICBcIk5vcnRoZWFzdCBCcm9ueFwiOiBbXCIxMDQ2NlwiLCBcIjEwNDY5XCIsIFwiMTA0NzBcIiwgXCIxMDQ3NVwiXSxcbiAgICBcIlNvdXRoZWFzdCBCcm9ueFwiOiBbXCIxMDQ2MVwiLCBcIjEwNDYyXCIsIFwiMTA0NjRcIiwgXCIxMDQ2NVwiLCBcIjEwNDcyXCIsIFwiMTA0NzNcIl1cbiAgfSxcbiAgXCJCcm9va2x5blwiOiB7XG4gICAgXCJDZW50cmFsIEJyb29rbHluXCI6IFtcIjExMjEyXCIsIFwiMTEyMTNcIiwgXCIxMTIxNlwiLCBcIjExMjMzXCIsIFwiMTEyMzhcIl0sXG4gICAgXCJTb3V0aHdlc3QgQnJvb2tseW5cIjogW1wiMTEyMDlcIiwgXCIxMTIxNFwiLCBcIjExMjI4XCJdLFxuICAgIFwiQm9yb3VnaCBQYXJrXCI6IFtcIjExMjA0XCIsIFwiMTEyMThcIiwgXCIxMTIxOVwiLCBcIjExMjMwXCJdLFxuICAgIFwiQ2FuYXJzaWUgYW5kIEZsYXRsYW5kc1wiOiBbXCIxMTIzNFwiLCBcIjExMjM2XCIsIFwiMTEyMzlcIl0sXG4gICAgXCJTb3V0aGVybiBCcm9va2x5blwiOiBbXCIxMTIyM1wiLCBcIjExMjI0XCIsIFwiMTEyMjlcIiwgXCIxMTIzNVwiXSxcbiAgICBcIk5vcnRod2VzdCBCcm9va2x5blwiOiBbXCIxMTIwMVwiLCBcIjExMjA1XCIsIFwiMTEyMTVcIiwgXCIxMTIxN1wiLCBcIjExMjMxXCJdLFxuICAgIFwiRmxhdGJ1c2hcIjogW1wiMTEyMDNcIiwgXCIxMTIxMFwiLCBcIjExMjI1XCIsIFwiMTEyMjZcIl0sXG4gICAgXCJFYXN0IE5ldyBZb3JrIGFuZCBOZXcgTG90c1wiOiBbXCIxMTIwN1wiLCBcIjExMjA4XCJdLFxuICAgIFwiR3JlZW5wb2ludFwiOiBbXCIxMTIxMVwiLCBcIjExMjIyXCJdLFxuICAgIFwiU3Vuc2V0IFBhcmtcIjogW1wiMTEyMjBcIiwgXCIxMTIzMlwiXSxcbiAgICBcIkJ1c2h3aWNrIGFuZCBXaWxsaWFtc2J1cmdcIjogW1wiMTEyMDZcIiwgXCIxMTIyMVwiLCBcIjExMjM3XCJdXG4gIH0sXG4gIFwiUXVlZW5zXCI6IHtcbiAgICBcIk5vcnRoZWFzdCBRdWVlbnNcIjogW1wiMTEzNjFcIiwgXCIxMTM2MlwiLCBcIjExMzYzXCIsIFwiMTEzNjRcIl0sXG4gICAgXCJOb3J0aCBRdWVlbnNcIjogW1wiMTEzNTRcIiwgXCIxMTM1NVwiLCBcIjExMzU2XCIsIFwiMTEzNTdcIiwgXCIxMTM1OFwiLCBcIjExMzU5XCIsIFwiMTEzNjBcIl0sXG4gICAgXCJDZW50cmFsIFF1ZWVuc1wiOiBbXCIxMTM2NVwiLCBcIjExMzY2XCIsIFwiMTEzNjdcIl0sXG4gICAgXCJKYW1haWNhXCI6IFtcIjExNDEyXCIsIFwiMTE0MjNcIiwgXCIxMTQzMlwiLCBcIjExNDMzXCIsIFwiMTE0MzRcIiwgXCIxMTQzNVwiLCBcIjExNDM2XCJdLFxuICAgIFwiTm9ydGh3ZXN0IFF1ZWVuc1wiOiBbXCIxMTEwMVwiLCBcIjExMTAyXCIsIFwiMTExMDNcIiwgXCIxMTEwNFwiLCBcIjExMTA1XCIsIFwiMTExMDZcIl0sXG4gICAgXCJXZXN0IENlbnRyYWwgUXVlZW5zXCI6IFtcIjExMzc0XCIsIFwiMTEzNzVcIiwgXCIxMTM3OVwiLCBcIjExMzg1XCJdLFxuICAgIFwiUm9ja2F3YXlzXCI6IFtcIjExNjkxXCIsIFwiMTE2OTJcIiwgXCIxMTY5M1wiLCBcIjExNjk0XCIsIFwiMTE2OTVcIiwgXCIxMTY5N1wiXSxcbiAgICBcIlNvdXRoZWFzdCBRdWVlbnNcIjogW1wiMTEwMDRcIiwgXCIxMTAwNVwiLCBcIjExNDExXCIsIFwiMTE0MTNcIiwgXCIxMTQyMlwiLCBcIjExNDI2XCIsIFwiMTE0MjdcIiwgXCIxMTQyOFwiLCBcIjExNDI5XCJdLFxuICAgIFwiU291dGh3ZXN0IFF1ZWVuc1wiOiBbXCIxMTQxNFwiLCBcIjExNDE1XCIsIFwiMTE0MTZcIiwgXCIxMTQxN1wiLCBcIjExNDE4XCIsIFwiMTE0MTlcIiwgXCIxMTQyMFwiLCBcIjExNDIxXCJdLFxuICAgIFwiV2VzdCBRdWVlbnNcIjogW1wiMTEzNjhcIiwgXCIxMTM2OVwiLCBcIjExMzcwXCIsIFwiMTEzNzJcIiwgXCIxMTM3M1wiLCBcIjExMzc3XCIsIFwiMTEzNzhcIl1cbiAgfSxcbiAgXCJTdGF0ZW4gSXNsYW5kXCI6IHtcbiAgICBcIlBvcnQgUmljaG1vbmRcIjogW1wiMTAzMDJcIiwgXCIxMDMwM1wiLCBcIjEwMzEwXCJdLFxuICAgIFwiU291dGggU2hvcmVcIjogW1wiMTAzMDZcIiwgXCIxMDMwN1wiLCBcIjEwMzA4XCIsIFwiMTAzMDlcIiwgXCIxMDMxMlwiXSxcbiAgICBcIlN0YXBsZXRvbiBhbmQgU3QuIEdlb3JnZVwiOiBbXCIxMDMwMVwiLCBcIjEwMzA0XCIsIFwiMTAzMDVcIl0sXG4gICAgXCJNaWQtSXNsYW5kXCI6IFtcIjEwMzE0XCJdXG4gIH1cbn1cblxuZXhwb3J0IGxldCB6aXBMYXRMb25nID0gbnVsbDtcbmNvbnN0IHppcERhdGEgPSBmZXRjaFppcERhdGEoKTtcbnppcERhdGEudGhlbihyZXNwID0+IHppcExhdExvbmcgPSByZXNwKTtcblxuZXhwb3J0IGNvbnN0IGRhdGFQYXJzZSA9IChkYXRhKSA9PiB7XG4gIGRlYnVnZ2VyXG4gIGNvbnN0IHBpZVRyZWVEYXRhID0ge1xuICAgIG5hbWU6IFwiemlwY29kZVwiLFxuICAgIC8vIHZhbDogMCxcbiAgICAvLyBjb3VudDogMCxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIiQxMG0gPFwiLCBcbiAgICAgICAgLy8gdmFsOiAwLFxuICAgICAgICAvLyBjb3VudDogMCxcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiJDFtIDwgJDEwbVwiLFxuICAgICAgICAvLyB2YWw6IDAsXG4gICAgICAgIC8vIGNvdW50OiAwLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCIkNTAwayA8ICQxbVwiLFxuICAgICAgICAvLyB2YWw6IDAsXG4gICAgICAgIC8vIGNvdW50OiAwLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCIkMjAwayB0byAkNTAwa1wiLFxuICAgICAgICAvLyB2YWw6IDAsXG4gICAgICAgIC8vIGNvdW50OiAwLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCI8ICQyMDBrXCIsXG4gICAgICAgIC8vIHZhbDogMCxcbiAgICAgICAgLy8gY291bnQ6IDAsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfVxuICAgIF1cbiAgfTtcbiAgLy8gdG90YWwgYXZnIGNhbGMgZm9yIHRoYXQgemlwIGNvZGVcbiAgLy8gc3BsaXQgaW50byA1IHByaWNlIGJyYWNrZXRzXG4gIC8vIDE6IDEwbWlsICssIDI6IDFtaWwgLSAxMG1pbCwgMzogNTAway05Ljk5OWssIDQ6IDIwMC00OTlrLCA1OiA8IDIwMGtcbiAgLy8gRUFDSCBCUkFDS0VUIEFTU0VTU0VEIFZBTFVFUyBBTkQgQ09VTlRTIEZPUiBBVkVSQUdFICoqKioqKioqKioqKioqKioqXG5cbiAgbGV0IGJyYWNrZXRCbGRnQ2xhc3MgPSBbe30se30se30se30se31dO1xuXG4gIGRhdGEuZm9yRWFjaChwcm9wZXJ0eU9iaiA9PiB7XG4gICAgbGV0IHByb3BWYWwgPSBwYXJzZUludChwcm9wZXJ0eU9iai5mdWxsdmFsKTtcbiAgICBsZXQgYmxkZ0NsYXNzID0gcHJvcGVydHlPYmouYmxkZ2NsO1xuICAgIFxuICAgIC8vIHRvdGFsIGF2Z1xuICAgIC8vIHBpZVRyZWVEYXRhLnZhbCA9IHBpZVRyZWVEYXRhLnZhbCArIHByb3BWYWw7XG4gICAgLy8gcGllVHJlZURhdGEuY291bnQrKztcblxuICAgIC8vIHByaWNlIGJyYWNrZXRzXG4gICAgaWYgKHByb3BWYWwgPj0gMTAwMDAwMDApIHtcbiAgICAgIC8vIHBpZVRyZWVEYXRhLmNoaWxkcmVuWzBdLnZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gcGllVHJlZURhdGEuY2hpbGRyZW5bMF0uY291bnQgKz0gMVxuICAgICAgYmxkZ0NsYXNzUGFyc2UoYmxkZ0NsYXNzLCAwLCBicmFja2V0QmxkZ0NsYXNzKVxuICAgIH0gZWxzZSBpZiAocHJvcFZhbCA8IDEwMDAwMDAwICYmIHByb3BWYWwgPj0gMTAwMDAwMCkge1xuICAgICAgLy8gcGllVHJlZURhdGEuY2hpbGRyZW5bMV0udmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBwaWVUcmVlRGF0YS5jaGlsZHJlblsxXS5jb3VudCArPSAxO1xuICAgICAgYmxkZ0NsYXNzUGFyc2UoYmxkZ0NsYXNzLCAxLCBicmFja2V0QmxkZ0NsYXNzKVxuICAgIH0gZWxzZSBpZiAocHJvcFZhbCA8IDEwMDAwMDAgJiYgcHJvcFZhbCA+PSA1MDAwMDApIHtcbiAgICAgIC8vIHBpZVRyZWVEYXRhLmNoaWxkcmVuWzJdLnZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gcGllVHJlZURhdGEuY2hpbGRyZW5bMl0uY291bnQgKz0gMTtcbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMiwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCA1MDAwMDAgJiYgcHJvcFZhbCA+PSAyMDAwMDApIHtcbiAgICAgIC8vIHBpZVRyZWVEYXRhLmNoaWxkcmVuWzNdLnZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gcGllVHJlZURhdGEuY2hpbGRyZW5bM10uY291bnQgKz0gMTtcbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMywgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCAyMDAwMDApIHtcbiAgICAgIC8vIHBpZVRyZWVEYXRhLmNoaWxkcmVuWzRdLnZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gcGllVHJlZURhdGEuY2hpbGRyZW5bNF0uY291bnQgKz0gMTtcbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgNCwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9XG4gIH0pO1xuXG4gIGJyYWNrZXRCbGRnQ2xhc3MuZm9yRWFjaCgoYnJhY2tldCwgaSkgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBicmFja2V0KSB7XG4gICAgICBcbiAgICAgIGxldCB2ID0gW11cbiAgICAgIGxldCBjbGFzc0NvZGVzT2JqID0gYnJhY2tldFtrZXldO1xuXG4gICAgICBmb3IgKGxldCBjbGFzc0NvZGVzIGluIGNsYXNzQ29kZXNPYmopIHtcbiAgICAgICAgdi5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBjbGFzc0NvZGVzLFxuICAgICAgICAgIHNpemU6IGNsYXNzQ29kZXNPYmpbY2xhc3NDb2Rlc11cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICBcbiAgICAgIHBpZVRyZWVEYXRhLmNoaWxkcmVuW2ldLmNoaWxkcmVuLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgY2hpbGRyZW46IHZcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfSk7XG4gIFxuICBkZWJ1Z2dlclxuICByZXR1cm4gcGllVHJlZURhdGE7XG59XG5cbmNvbnN0IGJsZGdDbGFzc1BhcnNlID0gKGJsZGdDbGFzcywgaSwgYmxkZ1BhcnNlT2JqKSA9PiB7XG4gIGxldCBjbGFzc1R5cGUgPSBibGRnQ2xhc3Muc3BsaXQoXCJcIilbMF07XG5cbiAgaWYgKGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgY2xhc3NPYmogPSB7fTtcbiAgICBjbGFzc09ialtibGRnQ2xhc3NdID0gMTtcblxuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdID0gY2xhc3NPYmo7XG4gIH0gZWxzZSBpZiAoYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV0gJiYgYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV1bYmxkZ0NsYXNzXSkge1xuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdW2JsZGdDbGFzc10gKz0gMTtcbiAgfSBlbHNlIHtcbiAgICBibGRnUGFyc2VPYmpbaV1bY2xhc3NUeXBlXVtibGRnQ2xhc3NdID0gMTtcbiAgfVxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=