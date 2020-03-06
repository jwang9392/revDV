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
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/postcss-loader/src/index.js):\nSyntaxError\n\n(1:1) Unknown word\n\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 1 | \u001b[39m// \u001b[36m@import\u001b[39m \u001b[32m\"./reset.scss\"\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m   | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 2 | \u001b[39m// \u001b[36m@import\u001b[39m \u001b[32m\"./header.scss\"\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 3 | \u001b[39m// \u001b[36m@import\u001b[39m \u001b[32m\"./dropdown.scss\"\u001b[39m\u001b[33m;\u001b[39m\n\n    at /Users/jasonwang/Desktop/Javascript-Project-RE/node_modules/webpack/lib/NormalModule.js:316:20\n    at /Users/jasonwang/Desktop/Javascript-Project-RE/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /Users/jasonwang/Desktop/Javascript-Project-RE/node_modules/loader-runner/lib/LoaderRunner.js:233:18\n    at context.callback (/Users/jasonwang/Desktop/Javascript-Project-RE/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at /Users/jasonwang/Desktop/Javascript-Project-RE/node_modules/postcss-loader/src/index.js:207:9");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9waWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdE1hcCIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsInppcHMiLCJsb2NhdGlvbnMiLCJNYW5oYXR0YW4iLCJzdmdEcm9wZG93biIsImZldGNoRGF0YSIsInppcCIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJsb2NhbGl0eSIsInN2Z0REIiwib3B0aW9ucyIsImNvbnRhaW5lciIsImZvbnRTaXplIiwiY29sb3IiLCJmb250RmFtaWx5IiwieCIsInkiLCJvcHRpb25IZWlnaHQiLCJoZWlnaHQiLCJ3aWR0aCIsImhvdmVyQ29sb3IiLCJob3ZlclRleHRDb2xvciIsImJhY2tncm91bmRDb2xvciIsInBhZGRpbmciLCJjaGFuZ2VIYW5kbGVyIiwic2VsZWN0aW9uIiwiemlwTGF0TG9uZyIsImxhdCIsImxvbmciLCJtb3ZlVG9Mb2NhdGlvbiIsInJlbW92ZSIsInBhcnNlZCIsImRhdGFQYXJzZSIsImNoYXJ0IiwiZyIsInNlbGVjdGVkT3B0aW9uIiwic2VsZWN0RmllbGQiLCJzdHlsZSIsImFjdGl2ZVRleHQiLCJ0ZXh0Iiwib24iLCJoYW5kbGVTZWxlY3RDbGljayIsIm9wdGlvbkdyb3VwIiwib3B0aW9uRW50ZXIiLCJzZWxlY3RBbGwiLCJlbnRlciIsImhhbmRsZU9wdGlvbkNsaWNrIiwiZCIsImkiLCJzdHJva2UiLCJsZW5ndGgiLCJqb2luIiwiaGFuZGxlTW91c2VPdmVyIiwiaGFuZGxlTW91c2VPdXQiLCJldmVudCIsInRhcmdldCIsInBhcmVudE5vZGUiLCJzdG9wUHJvcGFnYXRpb24iLCJjYWxsIiwidmlzaWJpbGl0eSIsInpvb20iLCJjZW50ZXIiLCJsbmciLCJkaXNhYmxlRGVmYXVsdFVJIiwibWFwIiwiZ29vZ2xlIiwibWFwcyIsIk1hcCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJMYXRMbmciLCJwYW5UbyIsInNldFpvb20iLCJjdGFMYXllciIsIkttbExheWVyIiwidXJsIiwiaW5uZXJIZWlnaHQiLCJwYXJ0aXRpb24iLCJyb290IiwiaGllcmFyY2h5Iiwic3VtIiwic2l6ZSIsInNvcnQiLCJhIiwiYiIsInZhbHVlIiwiTWF0aCIsIlBJIiwic2NhbGVPcmRpbmFsIiwicmFuZ2UiLCJxdWFudGl6ZSIsImludGVycG9sYXRlUmFpbmJvdyIsImNoaWxkcmVuIiwiZm9ybWF0IiwicmFkaXVzIiwiYXJjIiwic3RhcnRBbmdsZSIsIngwIiwiZW5kQW5nbGUiLCJ4MSIsInBhZEFuZ2xlIiwibWluIiwicGFkUmFkaXVzIiwiaW5uZXJSYWRpdXMiLCJ5MCIsIm91dGVyUmFkaXVzIiwibWF4IiwieTEiLCJlYWNoIiwiY3VycmVudCIsInN2Z1BpZSIsIm1vdXNlbGVhdmUiLCJiYWNrZ3JvdW5kIiwicGF0aCIsImRlc2NlbmRhbnRzIiwic2xpY2UiLCJkZXB0aCIsInBhcmVudCIsIm5hbWUiLCJhcmNWaXNpYmxlIiwibW91c2VvdmVyIiwiZmlsdGVyIiwiY2xpY2tlZCIsImxhYmVsIiwibGFiZWxWaXNpYmxlIiwibGFiZWxUcmFuc2Zvcm0iLCJwZXJjZW50YWdlX3RleHQiLCJkYXR1bSIsInAiLCJ0IiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwidHdlZW4iLCJpbnRlcnBvbGF0ZSIsImdldEF0dHJpYnV0ZSIsImF0dHJUd2VlbiIsInRvdGFsU2l6ZSIsInBlcmNlbnRhZ2UiLCJ0b1ByZWNpc2lvbiIsInBlcmNlbnRhZ2VTdHJpbmciLCJzZXF1ZW5jZUFycmF5IiwiYW5jZXN0b3JzIiwicmV2ZXJzZSIsInNoaWZ0Iiwibm9kZSIsImluZGV4T2YiLCJwaWVUcmVlRGF0YSIsImJyYWNrZXRCbGRnQ2xhc3MiLCJmb3JFYWNoIiwicHJvcGVydHlPYmoiLCJwcm9wVmFsIiwicGFyc2VJbnQiLCJmdWxsdmFsIiwiYmxkZ0NsYXNzIiwiYmxkZ2NsIiwiYmxkZ0NsYXNzUGFyc2UiLCJicmFja2V0Iiwia2V5IiwidiIsImNsYXNzQ29kZXNPYmoiLCJjbGFzc0NvZGVzIiwicHVzaCIsImJsZGdQYXJzZU9iaiIsImNsYXNzVHlwZSIsInNwbGl0IiwidW5kZWZpbmVkIiwiY2xhc3NPYmoiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxpQkFBaUIsbUJBQU8sQ0FBQyxzREFBYSxFOzs7Ozs7Ozs7Ozs7QUNBekI7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCOztBQUV2QyxlQUFlLG1CQUFPLENBQUMsMkVBQXVCOztBQUU5QyxvQkFBb0IsbUJBQU8sQ0FBQyw2RUFBdUI7O0FBRW5ELG1CQUFtQixtQkFBTyxDQUFDLG1GQUEyQjs7QUFFdEQsc0JBQXNCLG1CQUFPLENBQUMseUZBQThCOztBQUU1RCxrQkFBa0IsbUJBQU8sQ0FBQyx5RUFBcUI7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBLHVDQUF1Qzs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdIQUFnSDs7QUFFaEgscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsT0FBTzs7O0FBR1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7O0FBRXhDO0FBQ0EsTUFBTTs7O0FBR047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEVBQThFOztBQUU5RTtBQUNBLE1BQU07OztBQUdOO0FBQ0E7QUFDQTtBQUNBLGtFQUFrRTs7QUFFbEU7QUFDQSxNQUFNOzs7QUFHTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnRkFBZ0Y7O0FBRWhGO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7OztBQUdBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMseUVBQXNCLEVBQUU7OztBQUdwRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXVCOztBQUV2QjtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQSxHQUFHO0FBQ0gsRTs7Ozs7Ozs7Ozs7O0FDaExhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxrREFBUzs7QUFFN0IsV0FBVyxtQkFBTyxDQUFDLGdFQUFnQjs7QUFFbkMsWUFBWSxtQkFBTyxDQUFDLDREQUFjOztBQUVsQyxrQkFBa0IsbUJBQU8sQ0FBQyx3RUFBb0I7O0FBRTlDLGVBQWUsbUJBQU8sQ0FBQyx3REFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCOzs7QUFHQTtBQUNBO0FBQ0Esd0RBQXdEOztBQUV4RCxtREFBbUQ7O0FBRW5EO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCxxQ0FBcUM7O0FBRXJDLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBLEVBQUU7OztBQUdGLGVBQWUsbUJBQU8sQ0FBQyxrRUFBaUI7QUFDeEMsb0JBQW9CLG1CQUFPLENBQUMsNEVBQXNCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLHNFQUFtQixFQUFFOztBQUU5QztBQUNBO0FBQ0E7O0FBRUEsZUFBZSxtQkFBTyxDQUFDLG9FQUFrQjtBQUN6Qyx1QkFBdUI7O0FBRXZCLCtCOzs7Ozs7Ozs7Ozs7QUNsRGE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0I7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsMkRBQVU7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCOzs7Ozs7Ozs7Ozs7QUMxRGE7O0FBRWI7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQ0phOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEMsZUFBZSxtQkFBTyxDQUFDLHlFQUFxQjs7QUFFNUMseUJBQXlCLG1CQUFPLENBQUMsaUZBQXNCOztBQUV2RCxzQkFBc0IsbUJBQU8sQ0FBQywyRUFBbUI7O0FBRWpELGtCQUFrQixtQkFBTyxDQUFDLG1FQUFlO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBLDhDQUE4Qzs7QUFFOUM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7OztBQUdGO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0QsdUI7Ozs7Ozs7Ozs7OztBQzlGYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxZQUFZLE9BQU87QUFDbkI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsb0M7Ozs7Ozs7Ozs7OztBQ3REYTs7QUFFYixvQkFBb0IsbUJBQU8sQ0FBQyxtRkFBMEI7O0FBRXRELGtCQUFrQixtQkFBTyxDQUFDLCtFQUF3QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDdEJhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLHFFQUFnQjtBQUMzQztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsTUFBTTtBQUNuQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDbEJhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTs7QUFFaEMsb0JBQW9CLG1CQUFPLENBQUMsdUVBQWlCOztBQUU3QyxlQUFlLG1CQUFPLENBQUMsdUVBQW9COztBQUUzQyxlQUFlLG1CQUFPLENBQUMseURBQWE7QUFDcEM7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjs7O0FBR0E7QUFDQSx1Q0FBdUM7O0FBRXZDLHdDQUF3Qzs7QUFFeEMsb0ZBQW9GOztBQUVwRiwwREFBMEQscUNBQXFDO0FBQy9GO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLDJDQUEyQzs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsRTs7Ozs7Ozs7Ozs7O0FDdkRhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7OztBQzNDYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsbURBQVU7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUN2RGE7O0FBRWIsa0JBQWtCLG1CQUFPLENBQUMsbUVBQWU7QUFDekM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQixXQUFXLE9BQU87QUFDbEI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDcEJhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsZUFBZTtBQUMxQixhQUFhLEVBQUU7QUFDZjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNuQkEsK0NBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLGtEQUFTOztBQUU3QiwwQkFBMEIsbUJBQU8sQ0FBQyw4RkFBK0I7O0FBRWpFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdEMsR0FBRztBQUNIO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGlFQUFpQjtBQUN2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBOztBQUVBO0FBQ0EsdURBQXVEO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsMEI7Ozs7Ozs7Ozs7Ozs7QUM1RmE7O0FBRWI7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDWmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNqRWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDWGE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHFEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNDQUFzQztBQUN0QyxLQUFLO0FBQ0w7QUFDQSx3REFBd0Qsd0JBQXdCO0FBQ2hGO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQyxHOzs7Ozs7Ozs7Ozs7QUM5Q1k7QUFDYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNiYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVk7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjO0FBQ2Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE4Qzs7QUFFOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixjQUFjLFFBQVE7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEc7Ozs7Ozs7Ozs7OztBQ3pEWTs7QUFFYixZQUFZLG1CQUFPLENBQUMsbURBQVU7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFOzs7Ozs7Ozs7Ozs7QUNYYTs7QUFFYixZQUFZLG1CQUFPLENBQUMscURBQVksRUFBRTtBQUNsQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxFOzs7Ozs7Ozs7Ozs7QUNqRGE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7O0FDMUJhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDbkM7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7OztBQUdIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTLEdBQUcsU0FBUztBQUM1QywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxnQ0FBZ0M7QUFDaEMsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDL1dBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQixzQkFBc0I7QUFDekM7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RCxFQUFZekcsQ0FBWixFQUFla0gsWUFBZixFQUFnQztBQUNyRCxNQUFJQyxTQUFTLEdBQUdWLFNBQVMsQ0FBQ1csS0FBVixDQUFnQixFQUFoQixFQUFvQixDQUFwQixDQUFoQjs7QUFFQSxNQUFJRixZQUFZLENBQUNsSCxDQUFELENBQVosQ0FBZ0JtSCxTQUFoQixNQUErQkUsU0FBbkMsRUFBOEM7QUFDNUMsUUFBSUMsUUFBUSxHQUFHLEVBQWY7QUFDQUEsWUFBUSxDQUFDYixTQUFELENBQVIsR0FBc0IsQ0FBdEI7QUFFQVMsZ0JBQVksQ0FBQ2xILENBQUQsQ0FBWixDQUFnQm1ILFNBQWhCLElBQTZCRyxRQUE3QjtBQUNELEdBTEQsTUFLTyxJQUFJSixZQUFZLENBQUNsSCxDQUFELENBQVosQ0FBZ0JtSCxTQUFoQixLQUE4QkQsWUFBWSxDQUFDbEgsQ0FBRCxDQUFaLENBQWdCbUgsU0FBaEIsRUFBMkJWLFNBQTNCLENBQWxDLEVBQXlFO0FBQzlFUyxnQkFBWSxDQUFDbEgsQ0FBRCxDQUFaLENBQWdCbUgsU0FBaEIsRUFBMkJWLFNBQTNCLEtBQXlDLENBQXpDO0FBQ0QsR0FGTSxNQUVBO0FBQ0xTLGdCQUFZLENBQUNsSCxDQUFELENBQVosQ0FBZ0JtSCxTQUFoQixFQUEyQlYsU0FBM0IsSUFBd0MsQ0FBeEM7QUFDRDtBQUNGLENBYkQsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG5cbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xuXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xuXG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgdmFyIGZ1bGxQYXRoID0gYnVpbGRGdWxsUGF0aChjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7IC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG5cbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDsgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuXG4gICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG5cblxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcblxuXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG5cblxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuXG5cbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgdGltZW91dFxuXG5cbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICB2YXIgdGltZW91dEVycm9yTWVzc2FnZSA9ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCc7XG5cbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG5cbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcih0aW1lb3V0RXJyb3JNZXNzYWdlLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXF1ZXN0KSk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTsgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cblxuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTsgLy8gQWRkIHhzcmYgaGVhZGVyXG5cblxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihmdWxsUGF0aCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/IGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfSAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuXG5cbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG5cblxuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnLndpdGhDcmVkZW50aWFscykpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gISFjb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH0gLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuXG5cbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG5cblxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH0gLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH0gLy8gU2VuZCB0aGUgcmVxdWVzdFxuXG5cbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcblxudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpOyAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTsgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufSAvLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcblxuXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7IC8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuXG5heGlvcy5BeGlvcyA9IEF4aW9zOyAvLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5cbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoYXhpb3MuZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59OyAvLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cblxuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTsgLy8gRXhwb3NlIGFsbC9zcHJlYWRcblxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuXG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zOyAvLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcblxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cblxuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5cblxuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5cblxuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjsiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9idWlsZFVSTCcpO1xuXG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcblxudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vbWVyZ2VDb25maWcnKTtcbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cblxuXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5cblxuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpOyAvLyBTZXQgY29uZmlnLm1ldGhvZFxuXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfSAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG5cblxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuQXhpb3MucHJvdG90eXBlLmdldFVyaSA9IGZ1bmN0aW9uIGdldFVyaShjb25maWcpIHtcbiAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpO1xufTsgLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG5cblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24gKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xuXG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIGZ1bGwgcGF0aFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZEZ1bGxQYXRoKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCkge1xuICBpZiAoYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChyZXF1ZXN0ZWRVUkwpKSB7XG4gICAgcmV0dXJuIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlcXVlc3RlZFVSTCk7XG4gIH1cblxuICByZXR1cm4gcmVxdWVzdGVkVVJMO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG5cbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5cblxuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcblxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9OyAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG5cbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKGNvbmZpZy5kYXRhLCBjb25maWcuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3QpOyAvLyBGbGF0dGVuIGhlYWRlcnNcblxuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSwgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sIGNvbmZpZy5oZWFkZXJzKTtcbiAgdXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSwgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gIH0pO1xuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEocmVzcG9uc2UuZGF0YSwgcmVzcG9uc2UuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTsgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcblxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKHJlYXNvbi5yZXNwb25zZS5kYXRhLCByZWFzb24ucmVzcG9uc2UuaGVhZGVycywgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG5cbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuXG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICBlcnJvci5pc0F4aW9zRXJyb3IgPSB0cnVlO1xuXG4gIGVycm9yLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG5cbiAgcmV0dXJuIGVycm9yO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWVyZ2VDb25maWcoY29uZmlnMSwgY29uZmlnMikge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY29uZmlnMiA9IGNvbmZpZzIgfHwge307XG4gIHZhciBjb25maWcgPSB7fTtcbiAgdmFyIHZhbHVlRnJvbUNvbmZpZzJLZXlzID0gWyd1cmwnLCAnbWV0aG9kJywgJ3BhcmFtcycsICdkYXRhJ107XG4gIHZhciBtZXJnZURlZXBQcm9wZXJ0aWVzS2V5cyA9IFsnaGVhZGVycycsICdhdXRoJywgJ3Byb3h5J107XG4gIHZhciBkZWZhdWx0VG9Db25maWcyS2V5cyA9IFsnYmFzZVVSTCcsICd1cmwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJywgJ3RpbWVvdXQnLCAnd2l0aENyZWRlbnRpYWxzJywgJ2FkYXB0ZXInLCAncmVzcG9uc2VUeXBlJywgJ3hzcmZDb29raWVOYW1lJywgJ3hzcmZIZWFkZXJOYW1lJywgJ29uVXBsb2FkUHJvZ3Jlc3MnLCAnb25Eb3dubG9hZFByb2dyZXNzJywgJ21heENvbnRlbnRMZW5ndGgnLCAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJywgJ3NvY2tldFBhdGgnXTtcbiAgdXRpbHMuZm9yRWFjaCh2YWx1ZUZyb21Db25maWcyS2V5cywgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzLCBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKHByb3ApIHtcbiAgICBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzFbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMVtwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzFbcHJvcF07XG4gICAgfVxuICB9KTtcbiAgdXRpbHMuZm9yRWFjaChkZWZhdWx0VG9Db25maWcyS2V5cywgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB2YXIgYXhpb3NLZXlzID0gdmFsdWVGcm9tQ29uZmlnMktleXMuY29uY2F0KG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzKS5jb25jYXQoZGVmYXVsdFRvQ29uZmlnMktleXMpO1xuICB2YXIgb3RoZXJLZXlzID0gT2JqZWN0LmtleXMoY29uZmlnMikuZmlsdGVyKGZ1bmN0aW9uIGZpbHRlckF4aW9zS2V5cyhrZXkpIHtcbiAgICByZXR1cm4gYXhpb3NLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKG90aGVyS2V5cywgZnVuY3Rpb24gb3RoZXJLZXlzRGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gY29uZmlnO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcblxuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2UuY29uZmlnLCBudWxsLCByZXNwb25zZS5yZXF1ZXN0LCByZXNwb25zZSkpO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG5cbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuXG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdBY2NlcHQnKTtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8IHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHwgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHwgdXRpbHMuaXNGaWxlKGRhdGEpIHx8IHV0aWxzLmlzQmxvYihkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvKiBJZ25vcmUgKi9cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLnJlcGxhY2UoLyU0MC9naSwgJ0AnKS5yZXBsYWNlKC8lM0EvZ2ksICc6JykucmVwbGFjZSgvJTI0L2csICckJykucmVwbGFjZSgvJTJDL2dpLCAnLCcpLnJlcGxhY2UoLyUyMC9nLCAnKycpLnJlcGxhY2UoLyU1Qi9naSwgJ1snKS5yZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTCA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKSA6IGJhc2VVUkw7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbmZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICB2YXIgY29va2llID0gW107XG4gICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICB9LFxuICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgIHJldHVybiBtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICB9XG4gIH07XG59KCkgOiAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiB7XG4gICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICB9O1xufSgpOyIsIid1c2Ugc3RyaWN0Jztcbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgPyAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3Rcbi8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgdmFyIG9yaWdpblVSTDtcbiAgLyoqXG4gICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICogQHJldHVybnMge09iamVjdH1cbiAgKi9cblxuICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgaWYgKG1zaWUpIHtcbiAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgfVxuXG4gICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7IC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcblxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgIHBhdGhuYW1lOiB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJyA/IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDogJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICB9O1xuICB9XG5cbiAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gIC8qKlxuICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICpcbiAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICovXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgdmFyIHBhcnNlZCA9IHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgcmV0dXJuIHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdDtcbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG5mdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpOyAvLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuXG5cbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFsnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLCAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJywgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCddO1xuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHBhcnNlZDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0J1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsKSAmJiB2YWwuY29uc3RydWN0b3IgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbC5jb25zdHJ1Y3RvcikgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgRm9ybURhdGE7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBBcnJheUJ1ZmZlci5pc1ZpZXcpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB2YWwgJiYgdmFsLmJ1ZmZlciAmJiB2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5cblxuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5cblxuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAobmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8IG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5cblxuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuXG5cbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIGRlZXBNZXJnZSgpXG4vKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi9cbntcbiAgdmFyIHJlc3VsdCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5cblxuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBkZWVwTWVyZ2U6IGRlZXBNZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307IC8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0KCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICB9XG5cbiAgdHJ5IHtcbiAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gIH1cbn0pKCk7XG5cbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0cnkge1xuICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gIH0gLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuXG5cbiAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZHJhaW5pbmcgPSBmYWxzZTtcblxuICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcXVldWVJbmRleCA9IC0xO1xuICB9XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgIGRyYWluUXVldWUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICBpZiAoZHJhaW5pbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgZHJhaW5pbmcgPSB0cnVlO1xuICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW4pIHtcbiAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICBxdWV1ZSA9IFtdO1xuXG4gICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcXVldWVJbmRleCA9IC0xO1xuICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgfVxuXG4gIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gIGRyYWluaW5nID0gZmFsc2U7XG4gIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gIH1cblxuICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuXG4gIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgfVxufTsgLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuXG5cbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICB0aGlzLmZ1biA9IGZ1bjtcbiAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuXG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcblxucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiBbXTtcbn07XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJy8nO1xufTtcblxucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAwO1xufTsiLCJpbXBvcnQgXCIuL3N0eWxlcy9pbmRleC5zY3NzXCI7XG5pbXBvcnQge2luaXRNYXAsIGN0YUxheWVyfSBmcm9tIFwiLi9zY3JpcHRzL21hcFwiO1xuaW1wb3J0IHtzdmdEcm9wZG93bn0gZnJvbSBcIi4vc2NyaXB0cy9kcm9wZG93blwiO1xuaW1wb3J0IHtsb2NhdGlvbnN9IGZyb20gJy4vc2NyaXB0cy91dGlsJ1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBpbml0TWFwKCk7XG4gIFxuICBkMy5zZWxlY3QoXCIuYm9yby1zZWxlY3RvclwiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcImlkXCIsIFwiZHJvcGRvd25TVkdcIilcbiAgICAuYXR0cihcImhlaWdodFwiLCA1MDApXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCAyMDApXG4gIGNvbnN0IHppcHMgPSBsb2NhdGlvbnMuTWFuaGF0dGFuW1wiQ2hlbHNlYSBhbmQgQ2xpbnRvblwiXTtcbiAgc3ZnRHJvcGRvd24oemlwcyk7XG5cblxufSk7IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IHppcCA9PiB7XG4gIHJldHVybiBheGlvcy5nZXQoYC9OWU9EUS8ke3ppcH1gKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZS5kYXRhKVxuICAgIHJldHVybiByZXNwb25zZS5kYXRhXG4gIH0pXG59OyIsImltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHtkYXRhUGFyc2UsIHppcExhdExvbmd9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7Y2hhcnR9IGZyb20gXCIuL3BpZVwiO1xuaW1wb3J0IHttb3ZlVG9Mb2NhdGlvbn0gZnJvbSBcIi4vbWFwXCI7XG5cbmV4cG9ydCBjb25zdCBzdmdEcm9wZG93biA9IChsb2NhbGl0eSkgPT4ge1xuICB2YXIgc3ZnREQgPSBkMy5zZWxlY3QoXCIjZHJvcGRvd25TVkdcIik7XG4gIGNvbnN0IG9wdGlvbnMgPSB7fTtcbiAgb3B0aW9ucy5sb2NhbGl0eSA9IGxvY2FsaXR5O1xuICBvcHRpb25zLmNvbnRhaW5lciA9IHN2Z0REO1xuICBvcHRpb25zLmZvbnRTaXplID0gMjA7XG4gIG9wdGlvbnMuY29sb3IgPSBcIiMzMzNcIjtcbiAgb3B0aW9ucy5mb250RmFtaWx5ID0gXCJjYWxpYnJpXCI7XG4gIG9wdGlvbnMueCA9IDA7XG4gIG9wdGlvbnMueT0gMDtcbiAgb3B0aW9ucy5vcHRpb25IZWlnaHQ9IDQwO1xuICBvcHRpb25zLmhlaWdodD0gNDA7XG4gIG9wdGlvbnMud2lkdGg9IDIwMDtcbiAgb3B0aW9ucy5ob3ZlckNvbG9yPSBcIiMwYzU2ZjVcIjtcbiAgb3B0aW9ucy5ob3ZlclRleHRDb2xvcj0gXCIjZmZmXCI7XG4gIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yPSBcIiNmZmZcIjtcbiAgb3B0aW9ucy5wYWRkaW5nID0gNTtcbiAgb3B0aW9ucy5jaGFuZ2VIYW5kbGVyID0gc2VsZWN0aW9uID0+IHtcbiAgICBjb25zb2xlLmxvZyh6aXBMYXRMb25nW3NlbGVjdGlvbl0pO1xuICAgIGxldCBsYXQgPSB6aXBMYXRMb25nW3NlbGVjdGlvbl1bMF07XG4gICAgbGV0IGxvbmcgPSB6aXBMYXRMb25nW3NlbGVjdGlvbl1bMV07XG4gICAgbW92ZVRvTG9jYXRpb24obGF0LCBsb25nKTtcbiAgICBcbiAgICBmZXRjaERhdGEoc2VsZWN0aW9uKS50aGVuKGRhdGEgPT4ge1xuICAgICAgZDMuc2VsZWN0KFwiI3BpZVNWR1wiKS5yZW1vdmUoKTtcblxuICAgICAgbGV0IHBhcnNlZCA9IGRhdGFQYXJzZShkYXRhKTtcbiAgICAgIGNoYXJ0KHBhcnNlZCk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZyA9IHN2Z0REXG4gICAgLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwieFwiLCAwKVxuICAgIC5hdHRyKFwieVwiLCA5KVxuICAgIC5hdHRyKFwic2hhcGUtcmVuZGVyaW5nXCIsIFwib3B0aW1pemVTcGVlZFwiKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMSwxKVwiKVxuICAgIC5hdHRyKFwiZm9udC1mYW1pbHlcIiwgb3B0aW9ucy5mb250RmFtaWx5KTtcblxuICBsZXQgc2VsZWN0ZWRPcHRpb24gPSBvcHRpb25zLmxvY2FsaXR5WzBdO1xuXG4gIGNvbnN0IHNlbGVjdEZpZWxkID0gZy5hcHBlbmQoXCJnXCIpO1xuXG4gIHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMud2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5oZWlnaHQpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcIm9wdGlvbiBzZWxlY3QtZmllbGRcIilcbiAgICAuYXR0cihcImZpbGxcIiwgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2EwYTBhMFwiKVxuICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCBcIjFcIik7XG5cbiAgY29uc3QgYWN0aXZlVGV4dCA9IHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAudGV4dChzZWxlY3RlZE9wdGlvbilcbiAgICAuYXR0cihcInhcIiwgb3B0aW9ucy5wYWRkaW5nKVxuICAgIC5hdHRyKFwieVwiLCBvcHRpb25zLmhlaWdodCAvIDIgKyBvcHRpb25zLmZvbnRTaXplIC8gMylcbiAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBvcHRpb25zLmZvbnRTaXplKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKTtcblxuICAvLyBhcnJvdyBzeW1ib2wgYXQgdGhlIGVuZCBvZiB0aGUgc2VsZWN0IGJveFxuICBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLnRleHQoXCLilrxcIilcbiAgICAuYXR0cihcInhcIiwgb3B0aW9ucy53aWR0aCAtIG9wdGlvbnMuZm9udFNpemUgLSBvcHRpb25zLnBhZGRpbmcpXG4gICAgLmF0dHIoXCJ5XCIsIG9wdGlvbnMuaGVpZ2h0IC8gMiArIChvcHRpb25zLmZvbnRTaXplIC0gMikgLyAzKVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIG9wdGlvbnMuZm9udFNpemUgLSAyKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKTtcblxuICAvLyB0cmFuc3BhcmVudCBzdXJmYWNlIHRvIGNhcHR1cmUgYWN0aW9uc1xuICBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBvcHRpb25zLndpZHRoKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG9wdGlvbnMuaGVpZ2h0KVxuICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgIC5vbihcImNsaWNrXCIsIGhhbmRsZVNlbGVjdENsaWNrKTtcblxuICAvLyByZW5kZXJpbmcgb3B0aW9uc1xuICBjb25zdCBvcHRpb25Hcm91cCA9IGdcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMCwgJHtvcHRpb25zLmhlaWdodH0pYClcbiAgICAuYXR0cihcIm9wYWNpdHlcIiwgMCk7IC8vLmF0dHIoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTsgSXNzdWUgaW4gSUUvRmlyZWZveDogVW5hYmxlIHRvIGNhbGN1bGF0ZSB0ZXh0TGVuZ3RoIHdoZW4gZGlzcGxheSBpcyBub25lLlxuXG4gIC8vIFJlbmRlcmluZyBvcHRpb25zIGdyb3VwXG4gIGNvbnN0IG9wdGlvbkVudGVyID0gb3B0aW9uR3JvdXBcbiAgICAuc2VsZWN0QWxsKFwiZ1wiKVxuICAgIC5kYXRhKG9wdGlvbnMubG9jYWxpdHkpXG4gICAgLmVudGVyKClcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5vbihcImNsaWNrXCIsIGhhbmRsZU9wdGlvbkNsaWNrKTtcblxuICAvLyBSZW5kZXJpbmcgYmFja2dyb3VuZFxuICBvcHRpb25FbnRlclxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBvcHRpb25zLndpZHRoKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG9wdGlvbnMub3B0aW9uSGVpZ2h0KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiBvcHRpb25zLm9wdGlvbkhlaWdodDtcbiAgICB9KVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJvcHRpb25cIilcbiAgICAuc3R5bGUoXCJzdHJva2VcIiwgb3B0aW9ucy5ob3ZlckNvbG9yKVxuICAgIC5zdHlsZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgKGQsIGkpID0+IHtcbiAgICAgIGxldCBzdHJva2UgPSBbXG4gICAgICAgIDAsXG4gICAgICAgIG9wdGlvbnMud2lkdGgsXG4gICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0LFxuICAgICAgICBvcHRpb25zLndpZHRoLFxuICAgICAgICBvcHRpb25zLm9wdGlvbkhlaWdodFxuICAgICAgXTtcbiAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgIHN0cm9rZSA9IFtcbiAgICAgICAgICBvcHRpb25zLndpZHRoICsgb3B0aW9ucy5vcHRpb25IZWlnaHQsXG4gICAgICAgICAgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgICBvcHRpb25zLm9wdGlvbkhlaWdodFxuICAgICAgICBdO1xuICAgICAgfSBlbHNlIGlmIChpID09PSBvcHRpb25zLmxvY2FsaXR5Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc3Ryb2tlID0gWzAsIG9wdGlvbnMud2lkdGgsIG9wdGlvbnMub3B0aW9uSGVpZ2h0ICogMiArIG9wdGlvbnMud2lkdGhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cm9rZS5qb2luKFwiIFwiKTtcbiAgICB9KVxuICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCAxKVxuICAgIC5zdHlsZShcImZpbGxcIiwgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IpO1xuXG4gIG9wdGlvbkVudGVyXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcInhcIiwgb3B0aW9ucy5wYWRkaW5nKVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgaSAqIG9wdGlvbnMub3B0aW9uSGVpZ2h0ICtcbiAgICAgICAgb3B0aW9ucy5vcHRpb25IZWlnaHQgLyAyICtcbiAgICAgICAgb3B0aW9ucy5mb250U2l6ZSAvIDNcbiAgICAgICk7XG4gICAgfSlcbiAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgcmV0dXJuIGQ7XG4gICAgfSlcbiAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBvcHRpb25zLmZvbnRTaXplKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKVxuXG4gIG9wdGlvbkVudGVyXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMud2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5vcHRpb25IZWlnaHQpXG4gICAgLmF0dHIoXCJ5XCIsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICByZXR1cm4gaSAqIG9wdGlvbnMub3B0aW9uSGVpZ2h0O1xuICAgIH0pXG4gICAgLnN0eWxlKFwiZmlsbFwiLCBcInRyYW5zcGFyZW50XCIpXG4gICAgLm9uKFwibW91c2VvdmVyXCIsIGhhbmRsZU1vdXNlT3ZlcilcbiAgICAub24oXCJtb3VzZW91dFwiLCBoYW5kbGVNb3VzZU91dCk7XG5cbiAgb3B0aW9uR3JvdXAuYXR0cihcImRpc3BsYXlcIiwgXCJub25lXCIpLmF0dHIoXCJvcGFjaXR5XCIsIDEpO1xuXG4gIGQzLnNlbGVjdChcImJvZHlcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgb3B0aW9uR3JvdXAuYXR0cihcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICB9KTtcblxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZU92ZXIoKSB7XG4gICAgZDMuc2VsZWN0KGQzLmV2ZW50LnRhcmdldC5wYXJlbnROb2RlKVxuICAgICAgLnNlbGVjdChcIi5vcHRpb25cIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0aW9ucy5ob3ZlckNvbG9yKTtcblxuICAgIGQzLnNlbGVjdChkMy5ldmVudC50YXJnZXQucGFyZW50Tm9kZSlcbiAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdGlvbnMuaG92ZXJUZXh0Q29sb3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VPdXQoKSB7XG4gICAgZDMuc2VsZWN0KGQzLmV2ZW50LnRhcmdldC5wYXJlbnROb2RlKVxuICAgICAgLnNlbGVjdChcIi5vcHRpb25cIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IpO1xuXG4gICAgZDMuc2VsZWN0KGQzLmV2ZW50LnRhcmdldC5wYXJlbnROb2RlKVxuICAgICAgLnNlbGVjdChcInRleHRcIilcbiAgICAgIC5zdHlsZShcImZpbGxcIiwgb3B0aW9ucy5jb2xvcik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVPcHRpb25DbGljayhkKSB7XG4gICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgc2VsZWN0ZWRPcHRpb24gPSBkO1xuICAgIGFjdGl2ZVRleHQudGV4dChzZWxlY3RlZE9wdGlvbilcbiAgICBvcHRpb25zLmNoYW5nZUhhbmRsZXIuY2FsbCh0aGlzLCBkKTtcbiAgICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVTZWxlY3RDbGljaygpIHtcbiAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCB2aXNpYmlsaXR5ID0gb3B0aW9uR3JvdXAuYXR0cihcImRpc3BsYXlcIikgPT09IFwiYmxvY2tcIiA/IFwibm9uZVwiIDogXCJibG9ja1wiO1xuICAgIG9wdGlvbkdyb3VwLmF0dHIoXCJkaXNwbGF5XCIsIHZpc2liaWxpdHkpO1xuICB9XG5cbn1cbiIsImV4cG9ydCBjb25zdCBpbml0TWFwID0gKCkgPT4ge1xuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgem9vbTogMTEsXG4gICAgY2VudGVyOiB7IFxuICAgICAgbGF0OiA0MC43MTE4MTg2LFxuICAgICAgbG5nOiAtNzQuMDUwMzI5XG4gICAgIH0sIFxuICAgIGRpc2FibGVEZWZhdWx0VUk6IHRydWVcbiAgfTtcblxuICB3aW5kb3cubWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1hcFwiKSwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBjb25zdCBtb3ZlVG9Mb2NhdGlvbiA9IChsYXQsIGxuZykgPT4ge1xuICBjb25zdCBjZW50ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxhdCwgbG5nKTtcbiAgd2luZG93Lm1hcC5wYW5UbyhjZW50ZXIpO1xuICB3aW5kb3cubWFwLnNldFpvb20oMTUpXG59XG5cbmV4cG9ydCBjb25zdCBjdGFMYXllciA9IG5ldyBnb29nbGUubWFwcy5LbWxMYXllcih7XG4gIHVybDogXCJcIixcbiAgbWFwOiB3aW5kb3cubWFwXG59KSIsImV4cG9ydCBjb25zdCBjaGFydCA9IGRhdGEgPT4ge1xuICBkMy5zZWxlY3QoXCIucGllLWNvbnRhaW5lclwiKVxuICAgIC5hcHBlbmQoXCJzdmdcIilcbiAgICAuYXR0cihcImlkXCIsIFwicGllU1ZHXCIpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgd2luZG93LmlubmVySGVpZ2h0KVxuICAgIC5hdHRyKFwid2lkdGhcIiwgNDAwKVxuXG4gIGNvbnN0IHBhcnRpdGlvbiA9IGRhdGEgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkMy5oaWVyYXJjaHkoZGF0YSlcbiAgICAgIC5zdW0oZCA9PiBkLnNpemUpXG4gICAgLnNvcnQoKGEsIGIpID0+IGIudmFsdWUgLSBhLnZhbHVlKTtcblxuICAgIHJldHVybiBkMy5wYXJ0aXRpb24oKVxuICAgICAgLnNpemUoWzIgKiBNYXRoLlBJLCByb290LmhlaWdodCArIDFdKVxuICAgICAgKHJvb3QpO1xuICB9O1xuXG4gIGNvbnN0IGNvbG9yID0gZDMuc2NhbGVPcmRpbmFsKCkucmFuZ2UoZDMucXVhbnRpemUoZDMuaW50ZXJwb2xhdGVSYWluYm93LCBkYXRhLmNoaWxkcmVuLmxlbmd0aCArIDEpKTtcbiAgY29uc3QgZm9ybWF0ID0gZDMuZm9ybWF0KFwiLGRcIik7XG4gIC8vIHdpZHRoIHJlZmVycyB0byB0aGUgd2lkdGggb2YgdGhlIGcgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBwaWVcbiAgY29uc3Qgd2lkdGggPSAyOTA7XG4gIGNvbnN0IHJhZGl1cyA9IHdpZHRoIC8gNjtcbiAgY29uc3QgYXJjID0gZDMuYXJjKClcbiAgICAuc3RhcnRBbmdsZShkID0+IGQueDApXG4gICAgLmVuZEFuZ2xlKGQgPT4gZC54MSlcbiAgICAucGFkQW5nbGUoZCA9PiBNYXRoLm1pbigoZC54MSAtIGQueDApIC8gMiwgMC4wMDUpKVxuICAgIC5wYWRSYWRpdXMocmFkaXVzICogMS41KVxuICAgIC5pbm5lclJhZGl1cyhkID0+IGQueTAgKiByYWRpdXMgKiAxLjQpXG4gICAgLm91dGVyUmFkaXVzKGQgPT4gTWF0aC5tYXgoZC55MCAqIHJhZGl1cyAqIDEuOSwgZC55MSAqIHJhZGl1cyAqIDEuOSAtIDEpKVxuXG4gIGNvbnN0IHJvb3QgPSBwYXJ0aXRpb24oZGF0YSk7XG5cbiAgcm9vdC5lYWNoKGQgPT4ge2QuY3VycmVudCA9IGR9KTtcbiAgY29uc3Qgc3ZnUGllID0gZDMuc2VsZWN0KFwiI3BpZVNWR1wiKVxuXG4gIGNvbnN0IGcgPSBzdmdQaWUuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDMwMClcbiAgICAuYXR0cihcIndpZHRoXCIsIDMwMClcbiAgICAvLyAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7d2luZG93LmlubmVyV2lkdGggLyAzfSwke3dpZHRoIC8gMn0pYClcbiAgICAub24oXCJtb3VzZWxlYXZlXCIsIG1vdXNlbGVhdmUpO1xuXG4gIGNvbnN0IGJhY2tncm91bmQgPSBnLmFwcGVuZChcImNpcmNsZVwiKVxuICAgIC5hdHRyKFwiclwiLCBcIjE5NVwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBcIndoaXRlXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgyMDAsIDIwMClgKVxuXG4gIGNvbnN0IHBhdGggPSBnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDIwMCwgMjAwKWApXG4gICAgLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAuZGF0YShyb290LmRlc2NlbmRhbnRzKCkuc2xpY2UoMSkpXG4gICAgLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBkID0+IHsgd2hpbGUgKGQuZGVwdGggPiAxKSBkID0gZC5wYXJlbnQ7IHJldHVybiBjb2xvcihkLmRhdGEubmFtZSk7IH0pXG4gICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZCA9PiBhcmNWaXNpYmxlKGQuY3VycmVudCkgPyAoZC5jaGlsZHJlbiA/IDAuNiA6IDAuNCkgOiAwKVxuICAgIC5hdHRyKFwiZFwiLCBkID0+IGFyYyhkLmN1cnJlbnQpKVxuICAgIC5vbihcIm1vdXNlb3ZlclwiLCBtb3VzZW92ZXIpO1xuXG4gICAgXG4gIHBhdGguZmlsdGVyKGQgPT4gZC5jaGlsZHJlbilcbiAgICAuc3R5bGUoXCJjdXJzb3JcIiwgXCJwb2ludGVyXCIpXG4gICAgLm9uKFwiY2xpY2tcIiwgY2xpY2tlZCk7XG5cbiAgcGF0aC5hcHBlbmQoXCJ0aXRsZVwiKVxuICAgIC50ZXh0KGQgPT4gYCR7ZC52YWx1ZX1gKTtcblxuICBjb25zdCBsYWJlbCA9IGcuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJub25lXCIpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMjAwLCAyMDApYClcbiAgICAuc3R5bGUoXCJ1c2VyLXNlbGVjdFwiLCBcIm5vbmVcIilcbiAgICAuc2VsZWN0QWxsKFwidGV4dFwiKVxuICAgIC5kYXRhKHJvb3QuZGVzY2VuZGFudHMoKS5zbGljZSgxKSlcbiAgICAuZW50ZXIoKS5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJkeVwiLCBcIjAuMzVlbVwiKVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGQgPT4gK2xhYmVsVmlzaWJsZShkLmN1cnJlbnQpKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGQgPT4gbGFiZWxUcmFuc2Zvcm0oZC5jdXJyZW50KSlcbiAgICAudGV4dChkID0+IGQuZGF0YS5uYW1lKTtcblxuICAvL3BlcmNlbnRhZ2UgdGV4dFxuICBjb25zdCBwZXJjZW50YWdlX3RleHQgPSBzdmdQaWUuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJ0aXRsZVwiKVxuICAgIC5hdHRyKFwieFwiLCAod2lkdGggLyAxLjEpKVxuICAgIC5hdHRyKFwieVwiLCAod2lkdGggLyAyKSlcbiAgICAuYXR0cihcInRleHQtYW5jaG9yXCIsIFwibWlkZGxlXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgtNjIsIDY1KWApXG4gICAgLnN0eWxlKFwiZm9udC1zaXplXCIsIFwiMmVtXCIpO1xuXG4gIGNvbnN0IHBhcmVudCA9IGcuYXBwZW5kKFwiY2lyY2xlXCIpXG4gICAgLmRhdHVtKHJvb3QpXG4gICAgLmF0dHIoXCJyXCIsIHJhZGl1cylcbiAgICAuYXR0cihcImZpbGxcIiwgXCJub25lXCIpXG4gICAgLmF0dHIoXCJwb2ludGVyLWV2ZW50c1wiLCBcImFsbFwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMjAwLCAyMDApYClcbiAgICAub24oXCJjbGlja1wiLCBjbGlja2VkKTtcblxuICBmdW5jdGlvbiBjbGlja2VkKHApIHtcbiAgICBwYXJlbnQuZGF0dW0ocC5wYXJlbnQgfHwgcm9vdCk7XG5cbiAgICByb290LmVhY2goZCA9PiBkLnRhcmdldCA9IHtcbiAgICAgIHgwOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoZC54MCAtIHAueDApIC8gKHAueDEgLSBwLngwKSkpICogMiAqIE1hdGguUEksXG4gICAgICB4MTogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKGQueDEgLSBwLngwKSAvIChwLngxIC0gcC54MCkpKSAqIDIgKiBNYXRoLlBJLFxuICAgICAgeTA6IE1hdGgubWF4KDAsIGQueTAgLSBwLmRlcHRoKSxcbiAgICAgIHkxOiBNYXRoLm1heCgwLCBkLnkxIC0gcC5kZXB0aClcbiAgICB9KTtcbiAgICBjb25zdCB0ID0gZy50cmFuc2l0aW9uKCkuZHVyYXRpb24oNzUwKTtcblxuICAgIC8vIFRyYW5zaXRpb24gdGhlIGRhdGEgb24gYWxsIGFyY3MsIGV2ZW4gdGhlIG9uZXMgdGhhdCBhcmVu4oCZdCB2aXNpYmxlLFxuICAgIC8vIHNvIHRoYXQgaWYgdGhpcyB0cmFuc2l0aW9uIGlzIGludGVycnVwdGVkLCBlbnRlcmluZyBhcmNzIHdpbGwgc3RhcnRcbiAgICAvLyB0aGUgbmV4dCB0cmFuc2l0aW9uIGZyb20gdGhlIGRlc2lyZWQgcG9zaXRpb24uXG4gICAgcGF0aC50cmFuc2l0aW9uKHQpXG4gICAgICAudHdlZW4oXCJkYXRhXCIsIGQgPT4ge1xuICAgICAgICBjb25zdCBpID0gZDMuaW50ZXJwb2xhdGUoZC5jdXJyZW50LCBkLnRhcmdldCk7XG4gICAgICAgIHJldHVybiB0ID0+IGQuY3VycmVudCA9IGkodCk7XG4gICAgICB9KVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZCkge1xuICAgICAgICByZXR1cm4gK3RoaXMuZ2V0QXR0cmlidXRlKFwiZmlsbC1vcGFjaXR5XCIpIHx8IGFyY1Zpc2libGUoZC50YXJnZXQpO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGQgPT4gYXJjVmlzaWJsZShkLnRhcmdldCkgPyAoZC5jaGlsZHJlbiA/IDAuNiA6IDAuNCkgOiAwKVxuICAgICAgLmF0dHJUd2VlbihcImRcIiwgZCA9PiAoKSA9PiBhcmMoZC5jdXJyZW50KSk7XG5cbiAgICBsYWJlbC5maWx0ZXIoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiArdGhpcy5nZXRBdHRyaWJ1dGUoXCJmaWxsLW9wYWNpdHlcIikgfHwgbGFiZWxWaXNpYmxlKGQudGFyZ2V0KTtcbiAgICB9KS50cmFuc2l0aW9uKHQpXG4gICAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBkID0+ICtsYWJlbFZpc2libGUoZC50YXJnZXQpKVxuICAgICAgLmF0dHJUd2VlbihcInRyYW5zZm9ybVwiLCBkID0+ICgpID0+IGxhYmVsVHJhbnNmb3JtKGQuY3VycmVudCkpO1xuICB9XG5cbiAgLy9tb3VzZSBvdmVyXG4gIGNvbnN0IHRvdGFsU2l6ZSA9IHJvb3QuZGVzY2VuZGFudHMoKVswXS52YWx1ZTtcbiAgZnVuY3Rpb24gbW91c2VvdmVyKGQpIHtcbiAgICB2YXIgcGVyY2VudGFnZSA9ICgxMDAgKiBkLnZhbHVlIC8gdG90YWxTaXplKS50b1ByZWNpc2lvbigzKTtcbiAgICB2YXIgcGVyY2VudGFnZVN0cmluZyA9IHBlcmNlbnRhZ2UgKyBcIiVcIjtcbiAgICBpZiAocGVyY2VudGFnZSA8IDAuMSkge1xuICAgICAgcGVyY2VudGFnZVN0cmluZyA9IFwiPCAwLjElXCI7XG4gICAgfVxuICAgIHBlcmNlbnRhZ2VfdGV4dC50ZXh0KHBlcmNlbnRhZ2VTdHJpbmcgKyBcIiBcIik7XG4gICAgXG5cblxuICAgIHZhciBzZXF1ZW5jZUFycmF5ID0gZC5hbmNlc3RvcnMoKS5yZXZlcnNlKCk7XG4gICAgc2VxdWVuY2VBcnJheS5zaGlmdCgpOyAvLyByZW1vdmUgcm9vdCBub2RlIGZyb20gdGhlIGFycmF5XG4gICAgLy8gRmFkZSBhbGwgdGhlIHNlZ21lbnRzLlxuICAgIGQzLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMC4zKTtcblxuICAgIC8vIFRoZW4gaGlnaGxpZ2h0IG9ubHkgdGhvc2UgdGhhdCBhcmUgYW4gYW5jZXN0b3Igb2YgdGhlIGN1cnJlbnQgc2VnbWVudC5cbiAgICBnLnNlbGVjdEFsbChcInBhdGhcIilcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIChzZXF1ZW5jZUFycmF5LmluZGV4T2Yobm9kZSkgPj0gMCk7XG4gICAgICB9KVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcbiAgfVxuICAvL21vdXNlIGxlYXZlXG4gIC8vIFJlc3RvcmUgZXZlcnl0aGluZyB0byBmdWxsIG9wYWNpdHkgd2hlbiBtb3Zpbmcgb2ZmIHRoZSB2aXN1YWxpemF0aW9uLlxuICBmdW5jdGlvbiBtb3VzZWxlYXZlKGQpIHtcblxuICAgIC8vIERlYWN0aXZhdGUgYWxsIHNlZ21lbnRzIGR1cmluZyB0cmFuc2l0aW9uLlxuICAgIGQzLnNlbGVjdEFsbChcInBhdGhcIikub24oXCJtb3VzZW92ZXJcIiwgbnVsbCk7XG5cbiAgICAvLyBUcmFuc2l0aW9uIGVhY2ggc2VnbWVudCB0byBmdWxsIG9wYWNpdHkgYW5kIHRoZW4gcmVhY3RpdmF0ZSBpdC5cbiAgICBkMy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKVxuICAgICAgLm9uKFwiZW5kXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLm9uKFwibW91c2VvdmVyXCIsIG1vdXNlb3Zlcik7XG4gICAgICB9KTtcblxuICAgIHBlcmNlbnRhZ2VfdGV4dC50ZXh0KFwiXCIpOztcbiAgfVxuICBmdW5jdGlvbiBhcmNWaXNpYmxlKGQpIHtcbiAgICByZXR1cm4gZC55MSA8PSAyICYmIGQueTAgPj0gMSAmJiBkLngxID4gZC54MDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxhYmVsVmlzaWJsZShkKSB7XG4gICAgcmV0dXJuIGQueTEgPD0gMiAmJiBkLnkwID49IDEgJiYgKGQueTEgLSBkLnkwKSAqIChkLngxIC0gZC54MCkgPiAwLjAzO1xuICB9XG5cbiAgZnVuY3Rpb24gbGFiZWxUcmFuc2Zvcm0oZCkge1xuICAgIGNvbnN0IHggPSAoZC54MCArIGQueDEpIC8gMiAqIDE4MCAvIE1hdGguUEk7XG4gICAgY29uc3QgeSA9IChkLnkwICsgZC55MSkgLyAxLjE1ICogcmFkaXVzO1xuICAgIHJldHVybiBgcm90YXRlKCR7eCAtIDkwfSkgdHJhbnNsYXRlKCR7eX0sMCkgcm90YXRlKCR7eCA8IDE4MCA/IDAgOiAxODB9KWA7XG4gIH1cblxuICByZXR1cm4gc3ZnUGllLm5vZGUoKTtcbn0iLCJleHBvcnQgY29uc3QgbG9jYXRpb25zID0ge1xuICBcIk1hbmhhdHRhblwiOiB7XG4gICAgXCJDZW50cmFsIEhhcmxlbVwiOiBbXCIxMDAyNlwiLCBcIjEwMDI3XCIsIFwiMTAwMzBcIiwgXCIxMDAzN1wiLCBcIjEwMDM5XCJdLFxuICAgIFwiQ2hlbHNlYSBhbmQgQ2xpbnRvblwiOiBbXCIxMDAwMVwiLCBcIjEwMDExXCIsIFwiMTAwMThcIiwgXCIxMDAxOVwiLCBcIjEwMDIwXCIsIFwiMTAwMzZcIl0sXG4gICAgXCJFYXN0IEhhcmxlbVwiOiBbXCIxMDAyOVwiLCBcIjEwMDM1XCJdLFxuICAgIFwiR3JhbWVyY3kgUGFyayBhbmQgTXVycmF5IEhpbGxcIjogW1wiMTAwMTBcIiwgXCIxMDAxNlwiLCBcIjEwMDE3XCIsIFwiMTAwMjJcIl0sXG4gICAgXCJHcmVlbndpY2ggVmlsbGFnZSBhbmQgU29ob1wiOiBbXCIxMDAxMlwiLCBcIjEwMDEzXCIsIFwiMTAwMTRcIl0sIFxuICAgIFwiTG93ZXIgTWFuaGF0dGFuXCI6IFtcIjEwMDA0XCIsIFwiMTAwMDVcIiwgXCIxMDAwNlwiLCBcIjEwMDA3XCIsIFwiMTAwMzhcIiwgXCIxMDI4MFwiXSxcbiAgICBcIkxvd2VyIEVhc3QgU2lkZVwiOiBbXCIxMDAwMlwiLCBcIjEwMDAzXCIsIFwiMTAwMDlcIl0sXG4gICAgXCJVcHBlciBFYXN0IFNpZGVcIjogW1wiMTAwMjFcIiwgXCIxMDAyOFwiLCBcIjEwMDQ0XCIsIFwiMTAwNjVcIiwgXCIxMDA3NVwiLCBcIjEwMTI4XCJdLFxuICAgIFwiVXBwZXIgV2VzdCBTaWRlXCI6IFtcIjEwMDIzXCIsIFwiMTAwMjRcIiwgXCIxMDAyNVwiXSxcbiAgICBcIklud29vZCBhbmQgV2FzaGluZ3RvbiBIZWlnaHRzXCI6IFtcIjEwMDMxXCIsIFwiMTAwMzJcIiwgXCIxMDAzM1wiLCBcIjEwMDM0XCIsIFwiMTAwNDBcIl1cbiAgfSwgXG4gIFwiQnJvbnhcIjoge1xuICAgIFwiQ2VudHJhbCBCcm9ueFwiOiBbXCIxMDQ1M1wiLCBcIjEwNDU3XCIsIFwiMTA0NjBcIl0sXG4gICAgXCJCcm9ueCBQYXJrXCI6IFtcIjEwNDU4XCIsIFwiMTA0NjdcIiwgXCIxMDQ2OFwiXSxcbiAgICBcIkhpZ2ggQnJpZGdlIGFuZCBGb3JkaGFtXCI6IFtcIjEwNDUxXCIsIFwiMTA0NTJcIiwgXCIxMDQ1NlwiXSxcbiAgICBcIkh1bnRzIFBvaW50IGFuZCBNb3R0IEhhdmVuXCI6IFtcIjEwNDU0XCIsIFwiMTA0NTVcIiwgXCIxMDQ1OVwiLCBcIjEwNDc0XCJdLFxuICAgIFwiS2luZ3NicmlkZ2UgYW5kIFJpdmVyZGFsZVwiOiBbXCIxMDQ2M1wiLCBcIjEwNDcxXCJdLFxuICAgIFwiTm9ydGhlYXN0IEJyb254XCI6IFtcIjEwNDY2XCIsIFwiMTA0NjlcIiwgXCIxMDQ3MFwiLCBcIjEwNDc1XCJdLFxuICAgIFwiU291dGhlYXN0IEJyb254XCI6IFtcIjEwNDYxXCIsIFwiMTA0NjJcIiwgXCIxMDQ2NFwiLCBcIjEwNDY1XCIsIFwiMTA0NzJcIiwgXCIxMDQ3M1wiXVxuICB9LFxuICBcIkJyb29rbHluXCI6IHtcbiAgICBcIkNlbnRyYWwgQnJvb2tseW5cIjogW1wiMTEyMTJcIiwgXCIxMTIxM1wiLCBcIjExMjE2XCIsIFwiMTEyMzNcIiwgXCIxMTIzOFwiXSxcbiAgICBcIlNvdXRod2VzdCBCcm9va2x5blwiOiBbXCIxMTIwOVwiLCBcIjExMjE0XCIsIFwiMTEyMjhcIl0sXG4gICAgXCJCb3JvdWdoIFBhcmtcIjogW1wiMTEyMDRcIiwgXCIxMTIxOFwiLCBcIjExMjE5XCIsIFwiMTEyMzBcIl0sXG4gICAgXCJDYW5hcnNpZSBhbmQgRmxhdGxhbmRzXCI6IFtcIjExMjM0XCIsIFwiMTEyMzZcIiwgXCIxMTIzOVwiXSxcbiAgICBcIlNvdXRoZXJuIEJyb29rbHluXCI6IFtcIjExMjIzXCIsIFwiMTEyMjRcIiwgXCIxMTIyOVwiLCBcIjExMjM1XCJdLFxuICAgIFwiTm9ydGh3ZXN0IEJyb29rbHluXCI6IFtcIjExMjAxXCIsIFwiMTEyMDVcIiwgXCIxMTIxNVwiLCBcIjExMjE3XCIsIFwiMTEyMzFcIl0sXG4gICAgXCJGbGF0YnVzaFwiOiBbXCIxMTIwM1wiLCBcIjExMjEwXCIsIFwiMTEyMjVcIiwgXCIxMTIyNlwiXSxcbiAgICBcIkVhc3QgTmV3IFlvcmsgYW5kIE5ldyBMb3RzXCI6IFtcIjExMjA3XCIsIFwiMTEyMDhcIl0sXG4gICAgXCJHcmVlbnBvaW50XCI6IFtcIjExMjExXCIsIFwiMTEyMjJcIl0sXG4gICAgXCJTdW5zZXQgUGFya1wiOiBbXCIxMTIyMFwiLCBcIjExMjMyXCJdLFxuICAgIFwiQnVzaHdpY2sgYW5kIFdpbGxpYW1zYnVyZ1wiOiBbXCIxMTIwNlwiLCBcIjExMjIxXCIsIFwiMTEyMzdcIl1cbiAgfSxcbiAgXCJRdWVlbnNcIjoge1xuICAgIFwiTm9ydGhlYXN0IFF1ZWVuc1wiOiBbXCIxMTM2MVwiLCBcIjExMzYyXCIsIFwiMTEzNjNcIiwgXCIxMTM2NFwiXSxcbiAgICBcIk5vcnRoIFF1ZWVuc1wiOiBbXCIxMTM1NFwiLCBcIjExMzU1XCIsIFwiMTEzNTZcIiwgXCIxMTM1N1wiLCBcIjExMzU4XCIsIFwiMTEzNTlcIiwgXCIxMTM2MFwiXSxcbiAgICBcIkNlbnRyYWwgUXVlZW5zXCI6IFtcIjExMzY1XCIsIFwiMTEzNjZcIiwgXCIxMTM2N1wiXSxcbiAgICBcIkphbWFpY2FcIjogW1wiMTE0MTJcIiwgXCIxMTQyM1wiLCBcIjExNDMyXCIsIFwiMTE0MzNcIiwgXCIxMTQzNFwiLCBcIjExNDM1XCIsIFwiMTE0MzZcIl0sXG4gICAgXCJOb3J0aHdlc3QgUXVlZW5zXCI6IFtcIjExMTAxXCIsIFwiMTExMDJcIiwgXCIxMTEwM1wiLCBcIjExMTA0XCIsIFwiMTExMDVcIiwgXCIxMTEwNlwiXSxcbiAgICBcIldlc3QgQ2VudHJhbCBRdWVlbnNcIjogW1wiMTEzNzRcIiwgXCIxMTM3NVwiLCBcIjExMzc5XCIsIFwiMTEzODVcIl0sXG4gICAgXCJSb2NrYXdheXNcIjogW1wiMTE2OTFcIiwgXCIxMTY5MlwiLCBcIjExNjkzXCIsIFwiMTE2OTRcIiwgXCIxMTY5NVwiLCBcIjExNjk3XCJdLFxuICAgIFwiU291dGhlYXN0IFF1ZWVuc1wiOiBbXCIxMTAwNFwiLCBcIjExMDA1XCIsIFwiMTE0MTFcIiwgXCIxMTQxM1wiLCBcIjExNDIyXCIsIFwiMTE0MjZcIiwgXCIxMTQyN1wiLCBcIjExNDI4XCIsIFwiMTE0MjlcIl0sXG4gICAgXCJTb3V0aHdlc3QgUXVlZW5zXCI6IFtcIjExNDE0XCIsIFwiMTE0MTVcIiwgXCIxMTQxNlwiLCBcIjExNDE3XCIsIFwiMTE0MThcIiwgXCIxMTQxOVwiLCBcIjExNDIwXCIsIFwiMTE0MjFcIl0sXG4gICAgXCJXZXN0IFF1ZWVuc1wiOiBbXCIxMTM2OFwiLCBcIjExMzY5XCIsIFwiMTEzNzBcIiwgXCIxMTM3MlwiLCBcIjExMzczXCIsIFwiMTEzNzdcIiwgXCIxMTM3OFwiXVxuICB9LFxuICBcIlN0YXRlbiBJc2xhbmRcIjoge1xuICAgIFwiUG9ydCBSaWNobW9uZFwiOiBbXCIxMDMwMlwiLCBcIjEwMzAzXCIsIFwiMTAzMTBcIl0sXG4gICAgXCJTb3V0aCBTaG9yZVwiOiBbXCIxMDMwNlwiLCBcIjEwMzA3XCIsIFwiMTAzMDhcIiwgXCIxMDMwOVwiLCBcIjEwMzEyXCJdLFxuICAgIFwiU3RhcGxldG9uIGFuZCBTdC4gR2VvcmdlXCI6IFtcIjEwMzAxXCIsIFwiMTAzMDRcIiwgXCIxMDMwNVwiXSxcbiAgICBcIk1pZC1Jc2xhbmRcIjogW1wiMTAzMTRcIl1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgemlwTGF0TG9uZyA9IHtcbiAgXCIxMDAwMVwiOiBbNDAuNzUzNywgLTczLjk5OTJdLFxuICBcIjEwMDExXCI6IFs0MC43NDY1LCAtNzQuMDA5NF0sXG4gIFwiMTAwMThcIjogWzQwLjc1NTMsIC03My45OTMzXSxcbiAgXCIxMDAxOVwiOiBbNDAuNzY4NywgLTczLjk5MThdLFxuICBcIjEwMDIwXCI6IFs0MC43NjA2LCAtNzMuOTgyM10sXG4gIFwiMTAwMzZcIjogWzQwLjc2MDMsIC03My45OTMzXVxufVxuXG5leHBvcnQgY29uc3QgZGF0YVBhcnNlID0gKGRhdGEpID0+IHtcbiAgY29uc3QgcGllVHJlZURhdGEgPSB7XG4gICAgbmFtZTogXCJ6aXBjb2RlXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCIkMTBtIDxcIiwgXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIiQxbSA8ICQxMG1cIixcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiJDUwMGsgPCAkMW1cIixcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiJDIwMGsgdG8gJDUwMGtcIixcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9LCB7XG4gICAgICAgIG5hbWU6IFwiPCAkMjAwa1wiLFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH1cbiAgICBdXG4gIH07XG4gIC8vIHRvdGFsIGF2ZyBjYWxjIGZvciB0aGF0IHppcCBjb2RlXG5cbiAgLy8gQ09NTUVOVCBJTiBXSEVOIENSRUFUSU5HIFRPVEFMIEFWRVJBR0VTIERJU1BMQVkgKioqKioqKioqKioqKioqKioqKioqXG4gIC8vIGxldCB0b3RhbENvdW50ID0gMDtcbiAgLy8gbGV0IHRvdGFsVmFsID0gMDtcblxuICAvLyBzcGxpdCBpbnRvIDUgcHJpY2UgYnJhY2tldHNcbiAgLy8gMTogMTBtaWwgKywgMjogMW1pbCAtIDEwbWlsLCAzOiA1MDBrLTkuOTk5aywgNDogMjAwLTQ5OWssIDU6IDwgMjAwa1xuXG4gIC8vIEVBQ0ggQlJBQ0tFVCBBU1NFU1NFRCBWQUxVRVMgQU5EIENPVU5UUyBGT1IgQVZFUkFHRSAqKioqKioqKioqKioqKioqKlxuICAvLyBsZXQgYnJhY2tldDFWYWwgPSAwO1xuICAvLyBsZXQgYnJhY2tldDJWYWwgPSAwO1xuICAvLyBsZXQgYnJhY2tldDNWYWwgPSAwO1xuICAvLyBsZXQgYnJhY2tldDRWYWwgPSAwO1xuICAvLyBsZXQgYnJhY2tldDVWYWwgPSAwO1xuICAvLyBsZXQgYnJhY2tldDFDdCA9IDA7XG4gIC8vIGxldCBicmFja2V0MkN0ID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQzQ3QgPSAwO1xuICAvLyBsZXQgYnJhY2tldDRDdCA9IDA7XG4gIC8vIGxldCBicmFja2V0NUN0ID0gMDtcblxuICBsZXQgYnJhY2tldEJsZGdDbGFzcyA9IFt7fSx7fSx7fSx7fSx7fV07XG5cblxuICBkYXRhLmZvckVhY2gocHJvcGVydHlPYmogPT4ge1xuICAgIGxldCBwcm9wVmFsID0gcGFyc2VJbnQocHJvcGVydHlPYmouZnVsbHZhbCk7XG4gICAgbGV0IGJsZGdDbGFzcyA9IHByb3BlcnR5T2JqLmJsZGdjbDtcbiAgICBcbiAgICAvLyB0b3RhbCBhdmdcblxuICAgIC8vIENPTU1FTlQgSU4gV0hFTiBDUkVBVElORyBUT1RBTCBBVkVSQUdFUyBESVNQTEFZICoqKioqKioqKioqKioqKioqKioqKlxuICAgIC8vIHRvdGFsVmFsID0gdG90YWxWYWwgKyBwcm9wVmFsO1xuICAgIC8vIHRvdGFsQ291bnQrKztcblxuICAgIC8vIHByaWNlIGJyYWNrZXRzXG4gICAgaWYgKHByb3BWYWwgPj0gMTAwMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQxVmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0MUN0ICs9IDFcblxuICAgICAgYmxkZ0NsYXNzUGFyc2UoYmxkZ0NsYXNzLCAwLCBicmFja2V0QmxkZ0NsYXNzKVxuICAgIH0gZWxzZSBpZiAocHJvcFZhbCA8IDEwMDAwMDAwICYmIHByb3BWYWwgPj0gMTAwMDAwMCkge1xuICAgICAgLy8gYnJhY2tldDJWYWwgKz0gcHJvcFZhbDtcbiAgICAgIC8vIGJyYWNrZXQyQ3QgKz0gMTtcblxuICAgICAgYmxkZ0NsYXNzUGFyc2UoYmxkZ0NsYXNzLCAxLCBicmFja2V0QmxkZ0NsYXNzKVxuICAgIH0gZWxzZSBpZiAocHJvcFZhbCA8IDEwMDAwMDAgJiYgcHJvcFZhbCA+PSA1MDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQzVmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0M0N0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMiwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCA1MDAwMDAgJiYgcHJvcFZhbCA+PSAyMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQ0VmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0NEN0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMywgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCAyMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQ1VmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0NUN0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgNCwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9XG4gIH0pO1xuXG4gIGJyYWNrZXRCbGRnQ2xhc3MuZm9yRWFjaCgoYnJhY2tldCwgaSkgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBicmFja2V0KSB7XG4gICAgICBcbiAgICAgIGxldCB2ID0gW11cbiAgICAgIGxldCBjbGFzc0NvZGVzT2JqID0gYnJhY2tldFtrZXldO1xuXG4gICAgICBmb3IgKGxldCBjbGFzc0NvZGVzIGluIGNsYXNzQ29kZXNPYmopIHtcbiAgICAgICAgdi5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBjbGFzc0NvZGVzLFxuICAgICAgICAgIHNpemU6IGNsYXNzQ29kZXNPYmpbY2xhc3NDb2Rlc11cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICBcbiAgICAgIHBpZVRyZWVEYXRhLmNoaWxkcmVuW2ldLmNoaWxkcmVuLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgY2hpbGRyZW46IHZcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gcGllVHJlZURhdGE7XG4gIC8vIHJldHVybiAodG90YWxWYWwgLyB0b3RhbENvdW50KTtcbn1cblxuY29uc3QgYmxkZ0NsYXNzUGFyc2UgPSAoYmxkZ0NsYXNzLCBpLCBibGRnUGFyc2VPYmopID0+IHtcbiAgbGV0IGNsYXNzVHlwZSA9IGJsZGdDbGFzcy5zcGxpdChcIlwiKVswXTtcblxuICBpZiAoYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIGxldCBjbGFzc09iaiA9IHt9O1xuICAgIGNsYXNzT2JqW2JsZGdDbGFzc10gPSAxO1xuXG4gICAgYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV0gPSBjbGFzc09iajtcbiAgfSBlbHNlIGlmIChibGRnUGFyc2VPYmpbaV1bY2xhc3NUeXBlXSAmJiBibGRnUGFyc2VPYmpbaV1bY2xhc3NUeXBlXVtibGRnQ2xhc3NdKSB7XG4gICAgYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV1bYmxkZ0NsYXNzXSArPSAxO1xuICB9IGVsc2Uge1xuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdW2JsZGdDbGFzc10gPSAxO1xuICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=