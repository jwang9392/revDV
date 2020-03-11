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
  var dropdown = d3.select(".boro-selector");
  dropdown.append("svg").attr("id", "dropdownSVG").attr("height", 500).attr("width", 320);
  var boroughs = Object.keys(_scripts_util__WEBPACK_IMPORTED_MODULE_3__["locations"]);
  var zips = _scripts_util__WEBPACK_IMPORTED_MODULE_3__["locations"].Manhattan["Chelsea and Clinton"]; // const zipData = fetchZipData();

  debugger;
  Object(_scripts_dropdown__WEBPACK_IMPORTED_MODULE_2__["svgDropdown"])(boroughs);
  debugger;
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
  options.width = 270;
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
        svgDropdown(selectionLocales, options.parents); // options.parents.pop();
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
  var selectedOption = options.locality[0];
  var selectField = g.append("g");
  selectField.append("rect").attr("width", options.width).attr("height", options.height).attr("class", "option select-field").attr("fill", options.backgroundColor).style("stroke", "#a0a0a0").style("stroke-width", "1");
  var activeText = selectField.append("text").text(selectedOption).attr("x", options.padding).attr("y", options.height / 2 + options.fontSize / 3).attr("font-size", options.fontSize).attr("fill", options.color); // arrow symbol at the end of the select box

  selectField.append("text").text("▼").attr("x", options.width - options.fontSize - options.padding).attr("y", options.height / 2 + (options.fontSize - 2) / 3).attr("font-size", options.fontSize - 2).attr("fill", options.color); // transparent surface to capture actions

  selectField.append("rect").attr("width", options.width).attr("height", options.height).style("fill", "transparent").on("click", handleSelectClick); // back button

  selectField.append("rect").attr("id", "select-back-button").attr("fill", options.color).attr("width", options.height).attr("height", options.height).attr("x", options.width + 10).on("click", handleBackClick); // rendering options

  var optionGroup = g.append("g").attr("id", "option-selectors").attr("transform", "translate(0, ".concat(options.height, ")")).attr("opacity", 0); //.attr("display", "none"); Issue in IE/Firefox: Unable to calculate textLength when display is none.
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

  var bracketBldgClass = [{}, {}, {}, {}, {}]; // data = JSON.parse(data);

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
  return pieTreeData;
  debugger; // return (totalVal / totalCount);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9waWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRNYXAiLCJkcm9wZG93biIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImJvcm91Z2hzIiwiT2JqZWN0Iiwia2V5cyIsImxvY2F0aW9ucyIsInppcHMiLCJNYW5oYXR0YW4iLCJzdmdEcm9wZG93biIsImZldGNoRGF0YSIsInppcCIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJmZXRjaFppcERhdGEiLCJyZXMiLCJuZXdPYmoiLCJmb3JFYWNoIiwiZWxlbWVudCIsImZpZWxkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibG9jYWxpdHkiLCJwYXJlbnRzIiwic3ZnREQiLCJvcHRpb25zIiwiY29udGFpbmVyIiwiZm9udFNpemUiLCJjb2xvciIsImZvbnRGYW1pbHkiLCJ4IiwieSIsIm9wdGlvbkhlaWdodCIsImhlaWdodCIsIndpZHRoIiwiaG92ZXJDb2xvciIsImhvdmVyVGV4dENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImNoYW5nZUhhbmRsZXIiLCJzZWxlY3Rpb24iLCJsZW5ndGgiLCJ6aXBMYXRMb25nIiwibGF0IiwibG9uZyIsIm1vdmVUb0xvY2F0aW9uIiwicmVtb3ZlIiwicGFyc2VkIiwiZGF0YVBhcnNlIiwiY2hhcnQiLCJzZWxlY3Rpb25Mb2NhbGVzIiwiYm9ybyIsInB1c2giLCJuZWlnaGJvcmhvb2QiLCJzdmdJZCIsInBhcmVudFNpemUiLCJnIiwic2VsZWN0ZWRPcHRpb24iLCJzZWxlY3RGaWVsZCIsInN0eWxlIiwiYWN0aXZlVGV4dCIsInRleHQiLCJvbiIsImhhbmRsZVNlbGVjdENsaWNrIiwiaGFuZGxlQmFja0NsaWNrIiwib3B0aW9uR3JvdXAiLCJvcHRpb25FbnRlciIsInNlbGVjdEFsbCIsImVudGVyIiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJkIiwiaSIsInN0cm9rZSIsImpvaW4iLCJoYW5kbGVNb3VzZU92ZXIiLCJoYW5kbGVNb3VzZU91dCIsImV2ZW50IiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsInN0b3BQcm9wYWdhdGlvbiIsImNhbGwiLCJ2aXNpYmlsaXR5IiwibGV2ZWwiLCJwb3AiLCJ6b29tIiwiY2VudGVyIiwibG5nIiwiZGlzYWJsZURlZmF1bHRVSSIsIm1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiTGF0TG5nIiwicGFuVG8iLCJzZXRab29tIiwiY3RhTGF5ZXIiLCJLbWxMYXllciIsInVybCIsImlubmVySGVpZ2h0IiwicGFydGl0aW9uIiwicm9vdCIsImhpZXJhcmNoeSIsInN1bSIsInNpemUiLCJzb3J0IiwiYSIsImIiLCJ2YWx1ZSIsIk1hdGgiLCJQSSIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJjaGlsZHJlbiIsImZvcm1hdCIsInJhZGl1cyIsImFyYyIsInN0YXJ0QW5nbGUiLCJ4MCIsImVuZEFuZ2xlIiwieDEiLCJwYWRBbmdsZSIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwiZWFjaCIsImN1cnJlbnQiLCJzdmdQaWUiLCJtb3VzZWxlYXZlIiwiYmFja2dyb3VuZCIsInBhdGgiLCJkZXNjZW5kYW50cyIsInNsaWNlIiwiZGVwdGgiLCJwYXJlbnQiLCJuYW1lIiwiYXJjVmlzaWJsZSIsIm1vdXNlb3ZlciIsImZpbHRlciIsImNsaWNrZWQiLCJsYWJlbCIsImxhYmVsVmlzaWJsZSIsImxhYmVsVHJhbnNmb3JtIiwicGVyY2VudGFnZV90ZXh0IiwiZGF0dW0iLCJwIiwidCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInR3ZWVuIiwiaW50ZXJwb2xhdGUiLCJnZXRBdHRyaWJ1dGUiLCJhdHRyVHdlZW4iLCJ0b3RhbFNpemUiLCJwZXJjZW50YWdlIiwidG9QcmVjaXNpb24iLCJwZXJjZW50YWdlU3RyaW5nIiwic2VxdWVuY2VBcnJheSIsImFuY2VzdG9ycyIsInJldmVyc2UiLCJzaGlmdCIsIm5vZGUiLCJpbmRleE9mIiwiemlwRGF0YSIsInJlc3AiLCJwaWVUcmVlRGF0YSIsImJyYWNrZXRCbGRnQ2xhc3MiLCJwcm9wZXJ0eU9iaiIsInByb3BWYWwiLCJwYXJzZUludCIsImZ1bGx2YWwiLCJibGRnQ2xhc3MiLCJibGRnY2wiLCJibGRnQ2xhc3NQYXJzZSIsImJyYWNrZXQiLCJrZXkiLCJ2IiwiY2xhc3NDb2Rlc09iaiIsImNsYXNzQ29kZXMiLCJibGRnUGFyc2VPYmoiLCJjbGFzc1R5cGUiLCJzcGxpdCIsInVuZGVmaW5lZCIsImNsYXNzT2JqIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxx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Qm9ILFNBQWhCLE1BQStCRSxTQUFuQyxFQUE4QztBQUM1QyxRQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBQSxZQUFRLENBQUNaLFNBQUQsQ0FBUixHQUFzQixDQUF0QjtBQUVBUSxnQkFBWSxDQUFDbkgsQ0FBRCxDQUFaLENBQWdCb0gsU0FBaEIsSUFBNkJHLFFBQTdCO0FBQ0QsR0FMRCxNQUtPLElBQUlKLFlBQVksQ0FBQ25ILENBQUQsQ0FBWixDQUFnQm9ILFNBQWhCLEtBQThCRCxZQUFZLENBQUNuSCxDQUFELENBQVosQ0FBZ0JvSCxTQUFoQixFQUEyQlQsU0FBM0IsQ0FBbEMsRUFBeUU7QUFDOUVRLGdCQUFZLENBQUNuSCxDQUFELENBQVosQ0FBZ0JvSCxTQUFoQixFQUEyQlQsU0FBM0IsS0FBeUMsQ0FBekM7QUFDRCxHQUZNLE1BRUE7QUFDTFEsZ0JBQVksQ0FBQ25ILENBQUQsQ0FBWixDQUFnQm9ILFNBQWhCLEVBQTJCVCxTQUEzQixJQUF3QyxDQUF4QztBQUNEO0FBQ0YsQ0FiRCxDOzs7Ozs7Ozs7OztBQy9LQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG5cbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xuXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7IC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG5cbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDsgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG5cblxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcblxuXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG5cblxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuXG5cbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgdGltZW91dFxuXG5cbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG5cbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTsgLy8gQWRkIHhzcmYgaGVhZGVyXG5cblxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/IGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfSAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuXG5cbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG5cblxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH0gLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH0gLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH0gLy8gU2VuZCB0aGUgcmVxdWVzdFxuXG5cbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpOyAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTsgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufSAvLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcblxuXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7IC8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuXG5heGlvcy5BeGlvcyA9IEF4aW9zOyAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5cbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59OyAvLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cblxuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTsgLy8gRXhwb3NlIGFsbC9zcHJlYWRcblxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zOyAvLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcblxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cblxuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5cblxuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcblxudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cblxuXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5cblxuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpOyAvLyBTZXQgY29uZmlnLm1ldGhvZFxuXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfSAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG5cblxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTsgLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG5cblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xuXG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG5cbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5cblxuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcblxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9OyAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG5cbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKGNvbmZpZy5kYXRhLCBjb25maWcuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3QpOyAvLyBGbGF0dGVuIGhlYWRlcnNcblxuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSwgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sIGNvbmZpZy5oZWFkZXJzKTtcbiAgdXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSwgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gIH0pO1xuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEocmVzcG9uc2UuZGF0YSwgcmVzcG9uc2UuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcblxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKHJlYXNvbi5yZXNwb25zZS5kYXRhLCByZWFzb24ucmVzcG9uc2UuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG5cbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIGVycm9yO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5J107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFsnYmFzZVVSTCcsICd1cmwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJywgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJywgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ21heENvbnRlbnRMZW5ndGgnLCAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnXTtcbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXMuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKS5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpO1xuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0LmtleXMoY29uZmlnMikuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgZnVuY3Rpb24gb3RoZXJLZXlzRGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29uZmlnO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcblxuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuY29uZmlnLCBudWxsLCByZXNwb25zZS5yZXF1ZXN0LCByZXNwb25zZSkpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG5cbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuXG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHwgdXRpbHMuaXNGaWxlKGRhdGEpIHx8IHV0aWxzLmlzQmxvYihkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBJZ25vcmUgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLnJlcGxhY2UoLyU0MC9naSwgJ0AnKS5yZXBsYWNlKC8lM0EvZ2ksICc6JykucmVwbGFjZSgvJTI0L2csICckJykucmVwbGFjZSgvJTJDL2dpLCAnLCcpLnJlcGxhY2UoLyUyMC9nLCAnKycpLnJlcGxhY2UoLyU1Qi9naSwgJ1snKS5yZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTCA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKSA6IGJhc2VVUkw7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbmZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICB2YXIgY29va2llID0gW107XG4gICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiBtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH07XG59KCkgOiAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiB7XG4gICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICB9O1xufSgpOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgdmFyIG9yaWdpblVSTDtcbiAgLyoqXG4gICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICogQHJldHVybnMge09iamVjdH1cbiAgKi9cblxuICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgaWYgKG1zaWUpIHtcbiAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgfVxuXG4gICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7IC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcblxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgIHBhdGhuYW1lOiB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDogJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICB9O1xuICB9XG5cbiAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIC8qKlxuICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICovXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgdmFyIHBhcnNlZCA9IHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgcmV0dXJuIHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdDtcbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpOyAvLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuXG5cbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFsnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLCAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJywgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCddO1xuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHBhcnNlZDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcikgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgRm9ybURhdGE7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB2YWwgJiYgdmFsLmJ1ZmZlciAmJiB2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5cblxuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5cblxuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5cblxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuXG5cbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIGRlZXBNZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5cblxuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307IC8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZHJhaW5pbmcgPSBmYWxzZTtcblxuICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICB9XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgIGRyYWluUXVldWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICBpZiAoZHJhaW5pbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW4pIHtcbiAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICBxdWV1ZSA9IFtdO1xuXG4gICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcXVldWVJbmRleCA9IC0xO1xuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuXG4gIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gIH1cblxuICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuXG4gIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgfVxufTsgLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuXG5cbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICB0aGlzLmZ1biA9IGZ1bjtcbiAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuXG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcblxucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBbXTtcbn07XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJy8nO1xufTtcblxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAwO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQge2luaXRNYXAsIGN0YUxheWVyfSBmcm9tIFwiLi9zY3JpcHRzL21hcFwiO1xuaW1wb3J0IHtzdmdEcm9wZG93biwgdGVzdEREfSBmcm9tIFwiLi9zY3JpcHRzL2Ryb3Bkb3duXCI7XG5pbXBvcnQge2xvY2F0aW9uc30gZnJvbSAnLi9zY3JpcHRzL3V0aWwnO1xuaW1wb3J0IHtmZXRjaFppcERhdGF9IGZyb20gJy4vc2NyaXB0cy9hcGknO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBpbml0TWFwKCk7XG4gIGNvbnN0IGRyb3Bkb3duID0gZDMuc2VsZWN0KFwiLmJvcm8tc2VsZWN0b3JcIilcbiAgICBkcm9wZG93bi5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcImlkXCIsIFwiZHJvcGRvd25TVkdcIilcbiAgICAuYXR0cihcImhlaWdodFwiLCA1MDApXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCAzMjApXG4gIFxuICBjb25zdCBib3JvdWdocyA9IE9iamVjdC5rZXlzKGxvY2F0aW9ucyk7XG4gIGNvbnN0IHppcHMgPSBsb2NhdGlvbnMuTWFuaGF0dGFuW1wiQ2hlbHNlYSBhbmQgQ2xpbnRvblwiXTtcbiAgLy8gY29uc3QgemlwRGF0YSA9IGZldGNoWmlwRGF0YSgpO1xuICBkZWJ1Z2dlclxuICBzdmdEcm9wZG93bihib3JvdWdocyk7XG4gIGRlYnVnZ2VyXG59KTsiLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhID0gemlwID0+IHtcbiAgcmV0dXJuIGF4aW9zLmdldChgL05ZT0RRLyR7emlwfWApLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEpXG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGFcbiAgfSlcbn07XG5cbmV4cG9ydCBjb25zdCBmZXRjaFppcERhdGEgPSAoKSA9PiB7XG4gIHJldHVybiBheGlvcy5nZXQoXCIuLi8uLi9OWV96aXBfbGF0X2xvbmcuanNvblwiKS50aGVuKHJlcyA9PiB7XG4gICAgbGV0IG5ld09iaiA9IHt9O1xuXG4gICAgcmVzLmRhdGEuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIG5ld09ialtlbGVtZW50LmZpZWxkcy56aXBdID0gW2VsZW1lbnQuZmllbGRzLmxhdGl0dWRlLCBlbGVtZW50LmZpZWxkcy5sb25naXR1ZGVdO1xuICAgIH0pO1xuZGVidWdnZXJcbiAgICByZXR1cm4gbmV3T2JqO1xuICB9KVxufTsiLCJpbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tIFwiLi9hcGlcIjtcbmltcG9ydCB7bG9jYXRpb25zLCBkYXRhUGFyc2UsIHppcExhdExvbmd9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7Y2hhcnR9IGZyb20gXCIuL3BpZVwiO1xuaW1wb3J0IHttb3ZlVG9Mb2NhdGlvbn0gZnJvbSBcIi4vbWFwXCI7XG5cbmV4cG9ydCBjb25zdCBzdmdEcm9wZG93biA9IChsb2NhbGl0eSwgcGFyZW50cyA9IFtdKSA9PiB7XG4gIGRlYnVnZ2VyXG4gIHZhciBzdmdERCA9IGQzLnNlbGVjdChcIiNkcm9wZG93blNWR1wiKTtcbiAgY29uc3Qgb3B0aW9ucyA9IHt9O1xuICBvcHRpb25zLmxvY2F0aW9ucyA9IGxvY2F0aW9ucztcbiAgb3B0aW9ucy5sb2NhbGl0eSA9IGxvY2FsaXR5O1xuICBvcHRpb25zLnBhcmVudHMgPSBwYXJlbnRzO1xuICBvcHRpb25zLmNvbnRhaW5lciA9IHN2Z0REO1xuICBvcHRpb25zLmZvbnRTaXplID0gMjA7XG4gIG9wdGlvbnMuY29sb3IgPSBcIiMzMzNcIjtcbiAgb3B0aW9ucy5mb250RmFtaWx5ID0gXCJjYWxpYnJpXCI7XG4gIG9wdGlvbnMueCA9IDA7XG4gIG9wdGlvbnMueT0gMDtcbiAgb3B0aW9ucy5vcHRpb25IZWlnaHQ9IDQwO1xuICBvcHRpb25zLmhlaWdodD0gNDA7XG4gIG9wdGlvbnMud2lkdGg9IDI3MDtcbiAgb3B0aW9ucy5ob3ZlckNvbG9yPSBcIiMwYzU2ZjVcIjtcbiAgb3B0aW9ucy5ob3ZlclRleHRDb2xvcj0gXCIjZmZmXCI7XG4gIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yPSBcIiNmZmZcIjtcbiAgb3B0aW9ucy5wYWRkaW5nID0gNTtcbiAgb3B0aW9ucy5jaGFuZ2VIYW5kbGVyID0gc2VsZWN0aW9uID0+IHtcbiAgICBpZiAob3B0aW9ucy5wYXJlbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgZGVidWdnZXJcbiAgICAgIGNvbnNvbGUubG9nKHppcExhdExvbmdbc2VsZWN0aW9uXSk7XG4gICAgICBsZXQgbGF0ID0gemlwTGF0TG9uZ1tzZWxlY3Rpb25dWzBdO1xuICAgICAgbGV0IGxvbmcgPSB6aXBMYXRMb25nW3NlbGVjdGlvbl1bMV07XG4gICAgICBtb3ZlVG9Mb2NhdGlvbihsYXQsIGxvbmcpO1xuICAgICAgZmV0Y2hEYXRhKHNlbGVjdGlvbikudGhlbihkYXRhID0+IHtcbiAgICAgICAgZDMuc2VsZWN0KFwiI3BpZVNWR1wiKS5yZW1vdmUoKTtcbiAgICAgICAgbGV0IHBhcnNlZCA9IGRhdGFQYXJzZShkYXRhKTtcbiAgICAgICAgY2hhcnQocGFyc2VkKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcImhlcmVcIilcbiAgICAgIGxldCBzZWxlY3Rpb25Mb2NhbGVzO1xuICAgICAgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbGV0IGJvcm8gPSBzZWxlY3Rpb247XG4gICAgICAgIG9wdGlvbnMucGFyZW50cy5wdXNoKHNlbGVjdGlvbilcbiAgICAgICAgc2VsZWN0aW9uTG9jYWxlcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMubG9jYXRpb25zW2Jvcm9dKTtcbiAgICAgICAgc3ZnRHJvcGRvd24oc2VsZWN0aW9uTG9jYWxlcywgb3B0aW9ucy5wYXJlbnRzKVxuICAgICAgICAvLyBvcHRpb25zLnBhcmVudHMucG9wKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgbGV0IG5laWdoYm9yaG9vZCA9IHNlbGVjdGlvbjtcbiAgICAgICAgb3B0aW9ucy5wYXJlbnRzLnB1c2goc2VsZWN0aW9uKVxuICAgICAgICBsZXQgYm9ybyA9IG9wdGlvbnMucGFyZW50c1swXTtcbiAgICAgICAgc2VsZWN0aW9uTG9jYWxlcyA9IG9wdGlvbnMubG9jYXRpb25zW2Jvcm9dW25laWdoYm9yaG9vZF07XG4gICAgICAgIHN2Z0Ryb3Bkb3duKHNlbGVjdGlvbkxvY2FsZXMsIG9wdGlvbnMucGFyZW50cylcbiAgICAgIH1cbiAgICAgIFxuICAgIH1cbiAgfTtcblxuICBjb25zdCBzdmdJZCA9IHBhcmVudFNpemUgPT4ge1xuICAgIGlmICghcGFyZW50U2l6ZSkge1xuICAgICAgcmV0dXJuIFwic3ZnQm9yb0REXCI7XG4gICAgfSBlbHNlIGlmIChwYXJlbnRTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gXCJzdmdOZWlnaGJvcmhvb2RERFwiO1xuICAgIH0gZWxzZSBpZiAocGFyZW50U2l6ZSA9PT0gMikge1xuICAgICAgcmV0dXJuIFwic3ZnWmlwRERcIjtcbiAgICB9XG4gIH1cbiAgY29uc3QgZyA9IHN2Z0REXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwieFwiLCAwKVxuICAgIC5hdHRyKFwieVwiLCA5KVxuICAgIC5hdHRyKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwib3B0aW1pemVTcGVlZFwiKVxuICAgIC5hdHRyKFwiaWRcIiwgc3ZnSWQob3B0aW9ucy5wYXJlbnRzLmxlbmd0aCkpXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImZvbnQtZmFtaWx5XCIsIG9wdGlvbnMuZm9udEZhbWlseSk7XG5cbiAgbGV0IHNlbGVjdGVkT3B0aW9uID0gb3B0aW9ucy5sb2NhbGl0eVswXTtcblxuICBjb25zdCBzZWxlY3RGaWVsZCA9IGcuYXBwZW5kKFwiZ1wiKTtcblxuICBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBvcHRpb25zLndpZHRoKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG9wdGlvbnMuaGVpZ2h0KVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJvcHRpb24gc2VsZWN0LWZpZWxkXCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yKVxuICAgIC5zdHlsZShcInN0cm9rZVwiLCBcIiNhMGEwYTBcIilcbiAgICAuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgXCIxXCIpO1xuXG4gIGNvbnN0IGFjdGl2ZVRleHQgPSBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLnRleHQoc2VsZWN0ZWRPcHRpb24pXG4gICAgLmF0dHIoXCJ4XCIsIG9wdGlvbnMucGFkZGluZylcbiAgICAuYXR0cihcInlcIiwgb3B0aW9ucy5oZWlnaHQgLyAyICsgb3B0aW9ucy5mb250U2l6ZSAvIDMpXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgb3B0aW9ucy5mb250U2l6ZSlcbiAgICAuYXR0cihcImZpbGxcIiwgb3B0aW9ucy5jb2xvcik7XG5cbiAgLy8gYXJyb3cgc3ltYm9sIGF0IHRoZSBlbmQgb2YgdGhlIHNlbGVjdCBib3hcbiAgc2VsZWN0RmllbGRcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC50ZXh0KFwi4pa8XCIpXG4gICAgLmF0dHIoXCJ4XCIsIG9wdGlvbnMud2lkdGggLSBvcHRpb25zLmZvbnRTaXplIC0gb3B0aW9ucy5wYWRkaW5nKVxuICAgIC5hdHRyKFwieVwiLCBvcHRpb25zLmhlaWdodCAvIDIgKyAob3B0aW9ucy5mb250U2l6ZSAtIDIpIC8gMylcbiAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBvcHRpb25zLmZvbnRTaXplIC0gMilcbiAgICAuYXR0cihcImZpbGxcIiwgb3B0aW9ucy5jb2xvcik7XG5cbiAgLy8gdHJhbnNwYXJlbnQgc3VyZmFjZSB0byBjYXB0dXJlIGFjdGlvbnNcbiAgc2VsZWN0RmllbGRcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLmhlaWdodClcbiAgICAuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAub24oXCJjbGlja1wiLCBoYW5kbGVTZWxlY3RDbGljayk7XG5cbiAgLy8gYmFjayBidXR0b25cbiAgc2VsZWN0RmllbGRcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJzZWxlY3QtYmFjay1idXR0b25cIilcbiAgICAuYXR0cihcImZpbGxcIiwgb3B0aW9ucy5jb2xvcilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMuaGVpZ2h0KVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG9wdGlvbnMuaGVpZ2h0KVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLndpZHRoICsgMTApXG4gICAgLm9uKFwiY2xpY2tcIiwgaGFuZGxlQmFja0NsaWNrKTtcblxuICAvLyByZW5kZXJpbmcgb3B0aW9uc1xuICBjb25zdCBvcHRpb25Hcm91cCA9IGdcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJvcHRpb24tc2VsZWN0b3JzXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgwLCAke29wdGlvbnMuaGVpZ2h0fSlgKVxuICAgIC5hdHRyKFwib3BhY2l0eVwiLCAwKTsgLy8uYXR0cihcImRpc3BsYXlcIiwgXCJub25lXCIpOyBJc3N1ZSBpbiBJRS9GaXJlZm94OiBVbmFibGUgdG8gY2FsY3VsYXRlIHRleHRMZW5ndGggd2hlbiBkaXNwbGF5IGlzIG5vbmUuXG5cbiAgLy8gUmVuZGVyaW5nIG9wdGlvbnMgZ3JvdXBcbiAgY29uc3Qgb3B0aW9uRW50ZXIgPSBvcHRpb25Hcm91cFxuICAgIC5zZWxlY3RBbGwoXCJnXCIpXG4gICAgLmRhdGEob3B0aW9ucy5sb2NhbGl0eSlcbiAgICAuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLm9uKFwiY2xpY2tcIiwgaGFuZGxlT3B0aW9uQ2xpY2spO1xuXG4gIC8vIFJlbmRlcmluZyBiYWNrZ3JvdW5kXG4gIG9wdGlvbkVudGVyXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMud2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5vcHRpb25IZWlnaHQpXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqIG9wdGlvbnMub3B0aW9uSGVpZ2h0O1xuICAgIH0pXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcIm9wdGlvblwiKVxuICAgIC5zdHlsZShcInN0cm9rZVwiLCBvcHRpb25zLmhvdmVyQ29sb3IpXG4gICAgLnN0eWxlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCAoZCwgaSkgPT4ge1xuICAgICAgbGV0IHN0cm9rZSA9IFtcbiAgICAgICAgMCxcbiAgICAgICAgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgb3B0aW9ucy5vcHRpb25IZWlnaHQsXG4gICAgICAgIG9wdGlvbnMud2lkdGgsXG4gICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0XG4gICAgICBdO1xuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgc3Ryb2tlID0gW1xuICAgICAgICAgIG9wdGlvbnMud2lkdGggKyBvcHRpb25zLm9wdGlvbkhlaWdodCxcbiAgICAgICAgICBvcHRpb25zLndpZHRoLFxuICAgICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0XG4gICAgICAgIF07XG4gICAgICB9IGVsc2UgaWYgKGkgPT09IG9wdGlvbnMubG9jYWxpdHkubGVuZ3RoIC0gMSkge1xuICAgICAgICBzdHJva2UgPSBbMCwgb3B0aW9ucy53aWR0aCwgb3B0aW9ucy5vcHRpb25IZWlnaHQgKiAyICsgb3B0aW9ucy53aWR0aF07XG4gICAgICB9XG4gICAgICByZXR1cm4gc3Ryb2tlLmpvaW4oXCIgXCIpO1xuICAgIH0pXG4gICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcik7XG5cbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwieFwiLCBvcHRpb25zLnBhZGRpbmcpXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICBpICogb3B0aW9ucy5vcHRpb25IZWlnaHQgK1xuICAgICAgICBvcHRpb25zLm9wdGlvbkhlaWdodCAvIDIgK1xuICAgICAgICBvcHRpb25zLmZvbnRTaXplIC8gM1xuICAgICAgKTtcbiAgICB9KVxuICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gZDtcbiAgICB9KVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIG9wdGlvbnMuZm9udFNpemUpXG4gICAgLmF0dHIoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpXG5cbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLm9wdGlvbkhlaWdodClcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogb3B0aW9ucy5vcHRpb25IZWlnaHQ7XG4gICAgfSlcbiAgICAuc3R5bGUoXCJmaWxsXCIsIFwidHJhbnNwYXJlbnRcIilcbiAgICAub24oXCJtb3VzZW92ZXJcIiwgaGFuZGxlTW91c2VPdmVyKVxuICAgIC5vbihcIm1vdXNlb3V0XCIsIGhhbmRsZU1vdXNlT3V0KTtcblxuICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIikuYXR0cihcIm9wYWNpdHlcIiwgMSk7XG5cbiAgZDMuc2VsZWN0KFwiYm9keVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlT3ZlcigpIHtcbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwiLm9wdGlvblwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmhvdmVyQ29sb3IpO1xuXG4gICAgZDMuc2VsZWN0KGQzLmV2ZW50LnRhcmdldC5wYXJlbnROb2RlKVxuICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0aW9ucy5ob3ZlclRleHRDb2xvcik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU91dCgpIHtcbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwiLm9wdGlvblwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmJhY2tncm91bmRDb2xvcik7XG5cbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU9wdGlvbkNsaWNrKGQpIHtcbiAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBzZWxlY3RlZE9wdGlvbiA9IGQ7XG4gICAgYWN0aXZlVGV4dC50ZXh0KHNlbGVjdGVkT3B0aW9uKVxuICAgIG9wdGlvbnMuY2hhbmdlSGFuZGxlci5jYWxsKHRoaXMsIGQpO1xuICAgIG9wdGlvbkdyb3VwLmF0dHIoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZVNlbGVjdENsaWNrKCkge1xuICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IHZpc2liaWxpdHkgPSBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiKSA9PT0gXCJibG9ja1wiID8gXCJub25lXCIgOiBcImJsb2NrXCI7XG4gICAgb3B0aW9uR3JvdXAuYXR0cihcImRpc3BsYXlcIiwgdmlzaWJpbGl0eSk7XG4gIH1cbiAgXG4gIGZ1bmN0aW9uIGhhbmRsZUJhY2tDbGljaygpIHtcbiAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBsZXQgbGV2ZWwgPSBcIlwiO1xuICAgIGlmIChvcHRpb25zLnBhcmVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBsZXZlbCA9IFwiI3N2Z05laWdoYm9yaG9vZEREXCI7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnBhcmVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICBsZXZlbCA9IFwiI3N2Z1ppcEREXCI7XG4gICAgfVxuICAgIGQzLnNlbGVjdChsZXZlbCkucmVtb3ZlKCk7XG4gICAgb3B0aW9ucy5wYXJlbnRzLnBvcCgpO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IGluaXRNYXAgPSAoKSA9PiB7XG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB6b29tOiAxMSxcbiAgICBjZW50ZXI6IHsgXG4gICAgICBsYXQ6IDQwLjcxMTgxODYsXG4gICAgICBsbmc6IC03NC4wNTAzMjlcbiAgICAgfSwgXG4gICAgZGlzYWJsZURlZmF1bHRVSTogdHJ1ZVxuICB9O1xuXG4gIHdpbmRvdy5tYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFwXCIpLCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGNvbnN0IG1vdmVUb0xvY2F0aW9uID0gKGxhdCwgbG5nKSA9PiB7XG4gIGNvbnN0IGNlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobGF0LCBsbmcpO1xuICB3aW5kb3cubWFwLnBhblRvKGNlbnRlcik7XG4gIHdpbmRvdy5tYXAuc2V0Wm9vbSgxNSlcbn1cblxuZXhwb3J0IGNvbnN0IGN0YUxheWVyID0gbmV3IGdvb2dsZS5tYXBzLkttbExheWVyKHtcbiAgdXJsOiBcIlwiLFxuICBtYXA6IHdpbmRvdy5tYXBcbn0pIiwiZXhwb3J0IGNvbnN0IGNoYXJ0ID0gZGF0YSA9PiB7XG4gIGQzLnNlbGVjdChcIi5waWUtY29udGFpbmVyXCIpXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJwaWVTVkdcIilcbiAgICAuYXR0cihcImhlaWdodFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCA0MDApXG5cbiAgY29uc3QgcGFydGl0aW9uID0gZGF0YSA9PiB7XG4gICAgY29uc3Qgcm9vdCA9IGQzLmhpZXJhcmNoeShkYXRhKVxuICAgICAgLnN1bShkID0+IGQuc2l6ZSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi52YWx1ZSAtIGEudmFsdWUpO1xuXG4gICAgcmV0dXJuIGQzLnBhcnRpdGlvbigpXG4gICAgICAuc2l6ZShbMiAqIE1hdGguUEksIHJvb3QuaGVpZ2h0ICsgMV0pXG4gICAgICAocm9vdCk7XG4gIH07XG5cbiAgY29uc3QgY29sb3IgPSBkMy5zY2FsZU9yZGluYWwoKS5yYW5nZShkMy5xdWFudGl6ZShkMy5pbnRlcnBvbGF0ZVJhaW5ib3csIGRhdGEuY2hpbGRyZW4ubGVuZ3RoICsgMSkpO1xuICBjb25zdCBmb3JtYXQgPSBkMy5mb3JtYXQoXCIsZFwiKTtcbiAgLy8gd2lkdGggcmVmZXJzIHRvIHRoZSB3aWR0aCBvZiB0aGUgZyBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIHBpZVxuICBjb25zdCB3aWR0aCA9IDI5MDtcbiAgY29uc3QgcmFkaXVzID0gd2lkdGggLyA2O1xuICBjb25zdCBhcmMgPSBkMy5hcmMoKVxuICAgIC5zdGFydEFuZ2xlKGQgPT4gZC54MClcbiAgICAuZW5kQW5nbGUoZCA9PiBkLngxKVxuICAgIC5wYWRBbmdsZShkID0+IE1hdGgubWluKChkLngxIC0gZC54MCkgLyAyLCAwLjAwNSkpXG4gICAgLnBhZFJhZGl1cyhyYWRpdXMgKiAxLjUpXG4gICAgLmlubmVyUmFkaXVzKGQgPT4gZC55MCAqIHJhZGl1cyAqIDEuNClcbiAgICAub3V0ZXJSYWRpdXMoZCA9PiBNYXRoLm1heChkLnkwICogcmFkaXVzICogMS45LCBkLnkxICogcmFkaXVzICogMS45IC0gMSkpXG5cbiAgY29uc3Qgcm9vdCA9IHBhcnRpdGlvbihkYXRhKTtcblxuICByb290LmVhY2goZCA9PiB7ZC5jdXJyZW50ID0gZH0pO1xuICBjb25zdCBzdmdQaWUgPSBkMy5zZWxlY3QoXCIjcGllU1ZHXCIpXG5cbiAgY29uc3QgZyA9IHN2Z1BpZS5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgMzAwKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgMzAwKVxuICAgIC8vIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoJHt3aW5kb3cuaW5uZXJXaWR0aCAvIDN9LCR7d2lkdGggLyAyfSlgKVxuICAgIC5vbihcIm1vdXNlbGVhdmVcIiwgbW91c2VsZWF2ZSk7XG5cbiAgY29uc3QgYmFja2dyb3VuZCA9IGcuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgLmF0dHIoXCJyXCIsIFwiMTk1XCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwid2hpdGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDIwMCwgMjAwKWApXG5cbiAgY29uc3QgcGF0aCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMjAwLCAyMDApYClcbiAgICAuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKS5zbGljZSgxKSlcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJmaWxsXCIsIGQgPT4geyB3aGlsZSAoZC5kZXB0aCA+IDEpIGQgPSBkLnBhcmVudDsgcmV0dXJuIGNvbG9yKGQuZGF0YS5uYW1lKTsgfSlcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBkID0+IGFyY1Zpc2libGUoZC5jdXJyZW50KSA/IChkLmNoaWxkcmVuID8gMC42IDogMC40KSA6IDApXG4gICAgLmF0dHIoXCJkXCIsIGQgPT4gYXJjKGQuY3VycmVudCkpXG4gICAgLm9uKFwibW91c2VvdmVyXCIsIG1vdXNlb3Zlcik7XG5cbiAgICBcbiAgcGF0aC5maWx0ZXIoZCA9PiBkLmNoaWxkcmVuKVxuICAgIC5zdHlsZShcImN1cnNvclwiLCBcInBvaW50ZXJcIilcbiAgICAub24oXCJjbGlja1wiLCBjbGlja2VkKTtcblxuICBwYXRoLmFwcGVuZChcInRpdGxlXCIpXG4gICAgLnRleHQoZCA9PiBgJHtkLnZhbHVlfWApO1xuXG4gIGNvbnN0IGxhYmVsID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcIm5vbmVcIilcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgyMDAsIDIwMClgKVxuICAgIC5zdHlsZShcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKVxuICAgIC5zZWxlY3RBbGwoXCJ0ZXh0XCIpXG4gICAgLmRhdGEocm9vdC5kZXNjZW5kYW50cygpLnNsaWNlKDEpKVxuICAgIC5lbnRlcigpLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImR5XCIsIFwiMC4zNWVtXCIpXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZCA9PiArbGFiZWxWaXNpYmxlKGQuY3VycmVudCkpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgZCA9PiBsYWJlbFRyYW5zZm9ybShkLmN1cnJlbnQpKVxuICAgIC50ZXh0KGQgPT4gZC5kYXRhLm5hbWUpO1xuXG4gIC8vcGVyY2VudGFnZSB0ZXh0XG4gIGNvbnN0IHBlcmNlbnRhZ2VfdGV4dCA9IHN2Z1BpZS5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJpZFwiLCBcInRpdGxlXCIpXG4gICAgLmF0dHIoXCJ4XCIsICh3aWR0aCAvIDEuMSkpXG4gICAgLmF0dHIoXCJ5XCIsICh3aWR0aCAvIDIpKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKC02MiwgNjUpYClcbiAgICAuc3R5bGUoXCJmb250LXNpemVcIiwgXCIyZW1cIik7XG5cbiAgY29uc3QgcGFyZW50ID0gZy5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAuZGF0dW0ocm9vdClcbiAgICAuYXR0cihcInJcIiwgcmFkaXVzKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcIm5vbmVcIilcbiAgICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwiYWxsXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgyMDAsIDIwMClgKVxuICAgIC5vbihcImNsaWNrXCIsIGNsaWNrZWQpO1xuXG4gIGZ1bmN0aW9uIGNsaWNrZWQocCkge1xuICAgIHBhcmVudC5kYXR1bShwLnBhcmVudCB8fCByb290KTtcblxuICAgIHJvb3QuZWFjaChkID0+IGQudGFyZ2V0ID0ge1xuICAgICAgeDA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChkLngwIC0gcC54MCkgLyAocC54MSAtIHAueDApKSkgKiAyICogTWF0aC5QSSxcbiAgICAgIHgxOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoZC54MSAtIHAueDApIC8gKHAueDEgLSBwLngwKSkpICogMiAqIE1hdGguUEksXG4gICAgICB5MDogTWF0aC5tYXgoMCwgZC55MCAtIHAuZGVwdGgpLFxuICAgICAgeTE6IE1hdGgubWF4KDAsIGQueTEgLSBwLmRlcHRoKVxuICAgIH0pO1xuICAgIGNvbnN0IHQgPSBnLnRyYW5zaXRpb24oKS5kdXJhdGlvbig3NTApO1xuXG4gICAgLy8gVHJhbnNpdGlvbiB0aGUgZGF0YSBvbiBhbGwgYXJjcywgZXZlbiB0aGUgb25lcyB0aGF0IGFyZW7igJl0IHZpc2libGUsXG4gICAgLy8gc28gdGhhdCBpZiB0aGlzIHRyYW5zaXRpb24gaXMgaW50ZXJydXB0ZWQsIGVudGVyaW5nIGFyY3Mgd2lsbCBzdGFydFxuICAgIC8vIHRoZSBuZXh0IHRyYW5zaXRpb24gZnJvbSB0aGUgZGVzaXJlZCBwb3NpdGlvbi5cbiAgICBwYXRoLnRyYW5zaXRpb24odClcbiAgICAgIC50d2VlbihcImRhdGFcIiwgZCA9PiB7XG4gICAgICAgIGNvbnN0IGkgPSBkMy5pbnRlcnBvbGF0ZShkLmN1cnJlbnQsIGQudGFyZ2V0KTtcbiAgICAgICAgcmV0dXJuIHQgPT4gZC5jdXJyZW50ID0gaSh0KTtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIHJldHVybiArdGhpcy5nZXRBdHRyaWJ1dGUoXCJmaWxsLW9wYWNpdHlcIikgfHwgYXJjVmlzaWJsZShkLnRhcmdldCk7XG4gICAgICB9KVxuICAgICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZCA9PiBhcmNWaXNpYmxlKGQudGFyZ2V0KSA/IChkLmNoaWxkcmVuID8gMC42IDogMC40KSA6IDApXG4gICAgICAuYXR0clR3ZWVuKFwiZFwiLCBkID0+ICgpID0+IGFyYyhkLmN1cnJlbnQpKTtcblxuICAgIGxhYmVsLmZpbHRlcihmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuICt0aGlzLmdldEF0dHJpYnV0ZShcImZpbGwtb3BhY2l0eVwiKSB8fCBsYWJlbFZpc2libGUoZC50YXJnZXQpO1xuICAgIH0pLnRyYW5zaXRpb24odClcbiAgICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGQgPT4gK2xhYmVsVmlzaWJsZShkLnRhcmdldCkpXG4gICAgICAuYXR0clR3ZWVuKFwidHJhbnNmb3JtXCIsIGQgPT4gKCkgPT4gbGFiZWxUcmFuc2Zvcm0oZC5jdXJyZW50KSk7XG4gIH1cblxuICAvL21vdXNlIG92ZXJcbiAgY29uc3QgdG90YWxTaXplID0gcm9vdC5kZXNjZW5kYW50cygpWzBdLnZhbHVlO1xuICBmdW5jdGlvbiBtb3VzZW92ZXIoZCkge1xuICAgIHZhciBwZXJjZW50YWdlID0gKDEwMCAqIGQudmFsdWUgLyB0b3RhbFNpemUpLnRvUHJlY2lzaW9uKDMpO1xuICAgIHZhciBwZXJjZW50YWdlU3RyaW5nID0gcGVyY2VudGFnZSArIFwiJVwiO1xuICAgIGlmIChwZXJjZW50YWdlIDwgMC4xKSB7XG4gICAgICBwZXJjZW50YWdlU3RyaW5nID0gXCI8IDAuMSVcIjtcbiAgICB9XG4gICAgcGVyY2VudGFnZV90ZXh0LnRleHQocGVyY2VudGFnZVN0cmluZyArIFwiIFwiKTtcbiAgICBcblxuXG4gICAgdmFyIHNlcXVlbmNlQXJyYXkgPSBkLmFuY2VzdG9ycygpLnJldmVyc2UoKTtcbiAgICBzZXF1ZW5jZUFycmF5LnNoaWZ0KCk7IC8vIHJlbW92ZSByb290IG5vZGUgZnJvbSB0aGUgYXJyYXlcbiAgICAvLyBGYWRlIGFsbCB0aGUgc2VnbWVudHMuXG4gICAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwLjMpO1xuXG4gICAgLy8gVGhlbiBoaWdobGlnaHQgb25seSB0aG9zZSB0aGF0IGFyZSBhbiBhbmNlc3RvciBvZiB0aGUgY3VycmVudCBzZWdtZW50LlxuICAgIGcuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICByZXR1cm4gKHNlcXVlbmNlQXJyYXkuaW5kZXhPZihub2RlKSA+PSAwKTtcbiAgICAgIH0pXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuICB9XG4gIC8vbW91c2UgbGVhdmVcbiAgLy8gUmVzdG9yZSBldmVyeXRoaW5nIHRvIGZ1bGwgb3BhY2l0eSB3aGVuIG1vdmluZyBvZmYgdGhlIHZpc3VhbGl6YXRpb24uXG4gIGZ1bmN0aW9uIG1vdXNlbGVhdmUoZCkge1xuXG4gICAgLy8gRGVhY3RpdmF0ZSBhbGwgc2VnbWVudHMgZHVyaW5nIHRyYW5zaXRpb24uXG4gICAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKS5vbihcIm1vdXNlb3ZlclwiLCBudWxsKTtcblxuICAgIC8vIFRyYW5zaXRpb24gZWFjaCBzZWdtZW50IHRvIGZ1bGwgb3BhY2l0eSBhbmQgdGhlbiByZWFjdGl2YXRlIGl0LlxuICAgIGQzLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpXG4gICAgICAub24oXCJlbmRcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3QodGhpcykub24oXCJtb3VzZW92ZXJcIiwgbW91c2VvdmVyKTtcbiAgICAgIH0pO1xuXG4gICAgcGVyY2VudGFnZV90ZXh0LnRleHQoXCJcIik7O1xuICB9XG4gIGZ1bmN0aW9uIGFyY1Zpc2libGUoZCkge1xuICAgIHJldHVybiBkLnkxIDw9IDIgJiYgZC55MCA+PSAxICYmIGQueDEgPiBkLngwO1xuICB9XG5cbiAgZnVuY3Rpb24gbGFiZWxWaXNpYmxlKGQpIHtcbiAgICByZXR1cm4gZC55MSA8PSAyICYmIGQueTAgPj0gMSAmJiAoZC55MSAtIGQueTApICogKGQueDEgLSBkLngwKSA+IDAuMDM7XG4gIH1cblxuICBmdW5jdGlvbiBsYWJlbFRyYW5zZm9ybShkKSB7XG4gICAgY29uc3QgeCA9IChkLngwICsgZC54MSkgLyAyICogMTgwIC8gTWF0aC5QSTtcbiAgICBjb25zdCB5ID0gKGQueTAgKyBkLnkxKSAvIDEuMTUgKiByYWRpdXM7XG4gICAgcmV0dXJuIGByb3RhdGUoJHt4IC0gOTB9KSB0cmFuc2xhdGUoJHt5fSwwKSByb3RhdGUoJHt4IDwgMTgwID8gMCA6IDE4MH0pYDtcbiAgfVxuXG4gIHJldHVybiBzdmdQaWUubm9kZSgpO1xufSIsImltcG9ydCB7ZmV0Y2haaXBEYXRhfSBmcm9tICcuL2FwaSc7XG5cbmV4cG9ydCBjb25zdCBsb2NhdGlvbnMgPSB7XG4gIFwiTWFuaGF0dGFuXCI6IHtcbiAgICBcIkNlbnRyYWwgSGFybGVtXCI6IFtcIjEwMDI2XCIsIFwiMTAwMjdcIiwgXCIxMDAzMFwiLCBcIjEwMDM3XCIsIFwiMTAwMzlcIl0sXG4gICAgXCJDaGVsc2VhIGFuZCBDbGludG9uXCI6IFtcIjEwMDAxXCIsIFwiMTAwMTFcIiwgXCIxMDAxOFwiLCBcIjEwMDE5XCIsIFwiMTAwMjBcIiwgXCIxMDAzNlwiXSxcbiAgICBcIkVhc3QgSGFybGVtXCI6IFtcIjEwMDI5XCIsIFwiMTAwMzVcIl0sXG4gICAgXCJHcmFtZXJjeSBQYXJrIGFuZCBNdXJyYXkgSGlsbFwiOiBbXCIxMDAxMFwiLCBcIjEwMDE2XCIsIFwiMTAwMTdcIiwgXCIxMDAyMlwiXSxcbiAgICBcIkdyZWVud2ljaCBWaWxsYWdlIGFuZCBTb2hvXCI6IFtcIjEwMDEyXCIsIFwiMTAwMTNcIiwgXCIxMDAxNFwiXSwgXG4gICAgXCJMb3dlciBNYW5oYXR0YW5cIjogW1wiMTAwMDRcIiwgXCIxMDAwNVwiLCBcIjEwMDA2XCIsIFwiMTAwMDdcIiwgXCIxMDAzOFwiLCBcIjEwMjgwXCJdLFxuICAgIFwiTG93ZXIgRWFzdCBTaWRlXCI6IFtcIjEwMDAyXCIsIFwiMTAwMDNcIiwgXCIxMDAwOVwiXSxcbiAgICBcIlVwcGVyIEVhc3QgU2lkZVwiOiBbXCIxMDAyMVwiLCBcIjEwMDI4XCIsIFwiMTAwNDRcIiwgXCIxMDA2NVwiLCBcIjEwMDc1XCIsIFwiMTAxMjhcIl0sXG4gICAgXCJVcHBlciBXZXN0IFNpZGVcIjogW1wiMTAwMjNcIiwgXCIxMDAyNFwiLCBcIjEwMDI1XCJdLFxuICAgIFwiSW53b29kIGFuZCBXYXNoaW5ndG9uIEhlaWdodHNcIjogW1wiMTAwMzFcIiwgXCIxMDAzMlwiLCBcIjEwMDMzXCIsIFwiMTAwMzRcIiwgXCIxMDA0MFwiXVxuICB9LCBcbiAgXCJCcm9ueFwiOiB7XG4gICAgXCJDZW50cmFsIEJyb254XCI6IFtcIjEwNDUzXCIsIFwiMTA0NTdcIiwgXCIxMDQ2MFwiXSxcbiAgICBcIkJyb254IFBhcmtcIjogW1wiMTA0NThcIiwgXCIxMDQ2N1wiLCBcIjEwNDY4XCJdLFxuICAgIFwiSGlnaCBCcmlkZ2UgYW5kIEZvcmRoYW1cIjogW1wiMTA0NTFcIiwgXCIxMDQ1MlwiLCBcIjEwNDU2XCJdLFxuICAgIFwiSHVudHMgUG9pbnQgYW5kIE1vdHQgSGF2ZW5cIjogW1wiMTA0NTRcIiwgXCIxMDQ1NVwiLCBcIjEwNDU5XCIsIFwiMTA0NzRcIl0sXG4gICAgXCJLaW5nc2JyaWRnZSBhbmQgUml2ZXJkYWxlXCI6IFtcIjEwNDYzXCIsIFwiMTA0NzFcIl0sXG4gICAgXCJOb3J0aGVhc3QgQnJvbnhcIjogW1wiMTA0NjZcIiwgXCIxMDQ2OVwiLCBcIjEwNDcwXCIsIFwiMTA0NzVcIl0sXG4gICAgXCJTb3V0aGVhc3QgQnJvbnhcIjogW1wiMTA0NjFcIiwgXCIxMDQ2MlwiLCBcIjEwNDY0XCIsIFwiMTA0NjVcIiwgXCIxMDQ3MlwiLCBcIjEwNDczXCJdXG4gIH0sXG4gIFwiQnJvb2tseW5cIjoge1xuICAgIFwiQ2VudHJhbCBCcm9va2x5blwiOiBbXCIxMTIxMlwiLCBcIjExMjEzXCIsIFwiMTEyMTZcIiwgXCIxMTIzM1wiLCBcIjExMjM4XCJdLFxuICAgIFwiU291dGh3ZXN0IEJyb29rbHluXCI6IFtcIjExMjA5XCIsIFwiMTEyMTRcIiwgXCIxMTIyOFwiXSxcbiAgICBcIkJvcm91Z2ggUGFya1wiOiBbXCIxMTIwNFwiLCBcIjExMjE4XCIsIFwiMTEyMTlcIiwgXCIxMTIzMFwiXSxcbiAgICBcIkNhbmFyc2llIGFuZCBGbGF0bGFuZHNcIjogW1wiMTEyMzRcIiwgXCIxMTIzNlwiLCBcIjExMjM5XCJdLFxuICAgIFwiU291dGhlcm4gQnJvb2tseW5cIjogW1wiMTEyMjNcIiwgXCIxMTIyNFwiLCBcIjExMjI5XCIsIFwiMTEyMzVcIl0sXG4gICAgXCJOb3J0aHdlc3QgQnJvb2tseW5cIjogW1wiMTEyMDFcIiwgXCIxMTIwNVwiLCBcIjExMjE1XCIsIFwiMTEyMTdcIiwgXCIxMTIzMVwiXSxcbiAgICBcIkZsYXRidXNoXCI6IFtcIjExMjAzXCIsIFwiMTEyMTBcIiwgXCIxMTIyNVwiLCBcIjExMjI2XCJdLFxuICAgIFwiRWFzdCBOZXcgWW9yayBhbmQgTmV3IExvdHNcIjogW1wiMTEyMDdcIiwgXCIxMTIwOFwiXSxcbiAgICBcIkdyZWVucG9pbnRcIjogW1wiMTEyMTFcIiwgXCIxMTIyMlwiXSxcbiAgICBcIlN1bnNldCBQYXJrXCI6IFtcIjExMjIwXCIsIFwiMTEyMzJcIl0sXG4gICAgXCJCdXNod2ljayBhbmQgV2lsbGlhbXNidXJnXCI6IFtcIjExMjA2XCIsIFwiMTEyMjFcIiwgXCIxMTIzN1wiXVxuICB9LFxuICBcIlF1ZWVuc1wiOiB7XG4gICAgXCJOb3J0aGVhc3QgUXVlZW5zXCI6IFtcIjExMzYxXCIsIFwiMTEzNjJcIiwgXCIxMTM2M1wiLCBcIjExMzY0XCJdLFxuICAgIFwiTm9ydGggUXVlZW5zXCI6IFtcIjExMzU0XCIsIFwiMTEzNTVcIiwgXCIxMTM1NlwiLCBcIjExMzU3XCIsIFwiMTEzNThcIiwgXCIxMTM1OVwiLCBcIjExMzYwXCJdLFxuICAgIFwiQ2VudHJhbCBRdWVlbnNcIjogW1wiMTEzNjVcIiwgXCIxMTM2NlwiLCBcIjExMzY3XCJdLFxuICAgIFwiSmFtYWljYVwiOiBbXCIxMTQxMlwiLCBcIjExNDIzXCIsIFwiMTE0MzJcIiwgXCIxMTQzM1wiLCBcIjExNDM0XCIsIFwiMTE0MzVcIiwgXCIxMTQzNlwiXSxcbiAgICBcIk5vcnRod2VzdCBRdWVlbnNcIjogW1wiMTExMDFcIiwgXCIxMTEwMlwiLCBcIjExMTAzXCIsIFwiMTExMDRcIiwgXCIxMTEwNVwiLCBcIjExMTA2XCJdLFxuICAgIFwiV2VzdCBDZW50cmFsIFF1ZWVuc1wiOiBbXCIxMTM3NFwiLCBcIjExMzc1XCIsIFwiMTEzNzlcIiwgXCIxMTM4NVwiXSxcbiAgICBcIlJvY2thd2F5c1wiOiBbXCIxMTY5MVwiLCBcIjExNjkyXCIsIFwiMTE2OTNcIiwgXCIxMTY5NFwiLCBcIjExNjk1XCIsIFwiMTE2OTdcIl0sXG4gICAgXCJTb3V0aGVhc3QgUXVlZW5zXCI6IFtcIjExMDA0XCIsIFwiMTEwMDVcIiwgXCIxMTQxMVwiLCBcIjExNDEzXCIsIFwiMTE0MjJcIiwgXCIxMTQyNlwiLCBcIjExNDI3XCIsIFwiMTE0MjhcIiwgXCIxMTQyOVwiXSxcbiAgICBcIlNvdXRod2VzdCBRdWVlbnNcIjogW1wiMTE0MTRcIiwgXCIxMTQxNVwiLCBcIjExNDE2XCIsIFwiMTE0MTdcIiwgXCIxMTQxOFwiLCBcIjExNDE5XCIsIFwiMTE0MjBcIiwgXCIxMTQyMVwiXSxcbiAgICBcIldlc3QgUXVlZW5zXCI6IFtcIjExMzY4XCIsIFwiMTEzNjlcIiwgXCIxMTM3MFwiLCBcIjExMzcyXCIsIFwiMTEzNzNcIiwgXCIxMTM3N1wiLCBcIjExMzc4XCJdXG4gIH0sXG4gIFwiU3RhdGVuIElzbGFuZFwiOiB7XG4gICAgXCJQb3J0IFJpY2htb25kXCI6IFtcIjEwMzAyXCIsIFwiMTAzMDNcIiwgXCIxMDMxMFwiXSxcbiAgICBcIlNvdXRoIFNob3JlXCI6IFtcIjEwMzA2XCIsIFwiMTAzMDdcIiwgXCIxMDMwOFwiLCBcIjEwMzA5XCIsIFwiMTAzMTJcIl0sXG4gICAgXCJTdGFwbGV0b24gYW5kIFN0LiBHZW9yZ2VcIjogW1wiMTAzMDFcIiwgXCIxMDMwNFwiLCBcIjEwMzA1XCJdLFxuICAgIFwiTWlkLUlzbGFuZFwiOiBbXCIxMDMxNFwiXVxuICB9XG59XG5cbmV4cG9ydCBsZXQgemlwTGF0TG9uZyA9IG51bGw7XG5jb25zdCB6aXBEYXRhID0gZmV0Y2haaXBEYXRhKCk7XG56aXBEYXRhLnRoZW4ocmVzcCA9PiB6aXBMYXRMb25nID0gcmVzcCk7XG5cbmV4cG9ydCBjb25zdCBkYXRhUGFyc2UgPSAoZGF0YSkgPT4ge1xuICBkZWJ1Z2dlclxuICBjb25zdCBwaWVUcmVlRGF0YSA9IHtcbiAgICBuYW1lOiBcInppcGNvZGVcIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBuYW1lOiBcIiQxMG0gPFwiLCBcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiJDFtIDwgJDEwbVwiLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCIkNTAwayA8ICQxbVwiLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCIkMjAwayB0byAkNTAwa1wiLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCI8ICQyMDBrXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfVxuICAgIF1cbiAgfTtcbiAgLy8gdG90YWwgYXZnIGNhbGMgZm9yIHRoYXQgemlwIGNvZGVcblxuICAvLyBDT01NRU5UIElOIFdIRU4gQ1JFQVRJTkcgVE9UQUwgQVZFUkFHRVMgRElTUExBWSAqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gbGV0IHRvdGFsQ291bnQgPSAwO1xuICAvLyBsZXQgdG90YWxWYWwgPSAwO1xuXG4gIC8vIHNwbGl0IGludG8gNSBwcmljZSBicmFja2V0c1xuICAvLyAxOiAxMG1pbCArLCAyOiAxbWlsIC0gMTBtaWwsIDM6IDUwMGstOS45OTlrLCA0OiAyMDAtNDk5aywgNTogPCAyMDBrXG5cbiAgLy8gRUFDSCBCUkFDS0VUIEFTU0VTU0VEIFZBTFVFUyBBTkQgQ09VTlRTIEZPUiBBVkVSQUdFICoqKioqKioqKioqKioqKioqXG4gIC8vIGxldCBicmFja2V0MVZhbCA9IDA7XG4gIC8vIGxldCBicmFja2V0MlZhbCA9IDA7XG4gIC8vIGxldCBicmFja2V0M1ZhbCA9IDA7XG4gIC8vIGxldCBicmFja2V0NFZhbCA9IDA7XG4gIC8vIGxldCBicmFja2V0NVZhbCA9IDA7XG4gIC8vIGxldCBicmFja2V0MUN0ID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQyQ3QgPSAwO1xuICAvLyBsZXQgYnJhY2tldDNDdCA9IDA7XG4gIC8vIGxldCBicmFja2V0NEN0ID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQ1Q3QgPSAwO1xuXG4gIGxldCBicmFja2V0QmxkZ0NsYXNzID0gW3t9LHt9LHt9LHt9LHt9XTtcblxuICAvLyBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgZGF0YS5mb3JFYWNoKHByb3BlcnR5T2JqID0+IHtcbiAgICBsZXQgcHJvcFZhbCA9IHBhcnNlSW50KHByb3BlcnR5T2JqLmZ1bGx2YWwpO1xuICAgIGxldCBibGRnQ2xhc3MgPSBwcm9wZXJ0eU9iai5ibGRnY2w7XG4gICAgXG4gICAgLy8gdG90YWwgYXZnXG5cbiAgICAvLyBDT01NRU5UIElOIFdIRU4gQ1JFQVRJTkcgVE9UQUwgQVZFUkFHRVMgRElTUExBWSAqKioqKioqKioqKioqKioqKioqKipcbiAgICAvLyB0b3RhbFZhbCA9IHRvdGFsVmFsICsgcHJvcFZhbDtcbiAgICAvLyB0b3RhbENvdW50Kys7XG5cbiAgICAvLyBwcmljZSBicmFja2V0c1xuICAgIGlmIChwcm9wVmFsID49IDEwMDAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0MVZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDFDdCArPSAxXG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMCwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCAxMDAwMDAwMCAmJiBwcm9wVmFsID49IDEwMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQyVmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0MkN0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMSwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCAxMDAwMDAwICYmIHByb3BWYWwgPj0gNTAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0M1ZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDNDdCArPSAxO1xuXG4gICAgICBibGRnQ2xhc3NQYXJzZShibGRnQ2xhc3MsIDIsIGJyYWNrZXRCbGRnQ2xhc3MpXG4gICAgfSBlbHNlIGlmIChwcm9wVmFsIDwgNTAwMDAwICYmIHByb3BWYWwgPj0gMjAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0NFZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDRDdCArPSAxO1xuXG4gICAgICBibGRnQ2xhc3NQYXJzZShibGRnQ2xhc3MsIDMsIGJyYWNrZXRCbGRnQ2xhc3MpXG4gICAgfSBlbHNlIGlmIChwcm9wVmFsIDwgMjAwMDAwKSB7XG4gICAgICAvLyBicmFja2V0NVZhbCArPSBwcm9wVmFsO1xuICAgICAgLy8gYnJhY2tldDVDdCArPSAxO1xuXG4gICAgICBibGRnQ2xhc3NQYXJzZShibGRnQ2xhc3MsIDQsIGJyYWNrZXRCbGRnQ2xhc3MpXG4gICAgfVxuICB9KTtcblxuICBicmFja2V0QmxkZ0NsYXNzLmZvckVhY2goKGJyYWNrZXQsIGkpID0+IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gYnJhY2tldCkge1xuICAgICAgXG4gICAgICBsZXQgdiA9IFtdXG4gICAgICBsZXQgY2xhc3NDb2Rlc09iaiA9IGJyYWNrZXRba2V5XTtcblxuICAgICAgZm9yIChsZXQgY2xhc3NDb2RlcyBpbiBjbGFzc0NvZGVzT2JqKSB7XG4gICAgICAgIHYucHVzaCh7XG4gICAgICAgICAgbmFtZTogY2xhc3NDb2RlcyxcbiAgICAgICAgICBzaXplOiBjbGFzc0NvZGVzT2JqW2NsYXNzQ29kZXNdXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgXG4gICAgICBwaWVUcmVlRGF0YS5jaGlsZHJlbltpXS5jaGlsZHJlbi5wdXNoKFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgIGNoaWxkcmVuOiB2XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIHBpZVRyZWVEYXRhO1xuICBkZWJ1Z2dlclxuICAvLyByZXR1cm4gKHRvdGFsVmFsIC8gdG90YWxDb3VudCk7XG59XG5cbmNvbnN0IGJsZGdDbGFzc1BhcnNlID0gKGJsZGdDbGFzcywgaSwgYmxkZ1BhcnNlT2JqKSA9PiB7XG4gIGxldCBjbGFzc1R5cGUgPSBibGRnQ2xhc3Muc3BsaXQoXCJcIilbMF07XG5cbiAgaWYgKGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICBsZXQgY2xhc3NPYmogPSB7fTtcbiAgICBjbGFzc09ialtibGRnQ2xhc3NdID0gMTtcblxuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdID0gY2xhc3NPYmo7XG4gIH0gZWxzZSBpZiAoYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV0gJiYgYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV1bYmxkZ0NsYXNzXSkge1xuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdW2JsZGdDbGFzc10gKz0gMTtcbiAgfSBlbHNlIHtcbiAgICBibGRnUGFyc2VPYmpbaV1bY2xhc3NUeXBlXVtibGRnQ2xhc3NdID0gMTtcbiAgfVxufSIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=