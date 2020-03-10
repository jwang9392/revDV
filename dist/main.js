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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9idWlsZEZ1bGxQYXRoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvYXBpLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Ryb3Bkb3duLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9waWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluaXRNYXAiLCJkcm9wZG93biIsImQzIiwic2VsZWN0IiwiYXBwZW5kIiwiYXR0ciIsImJvcm91Z2hzIiwiT2JqZWN0Iiwia2V5cyIsImxvY2F0aW9ucyIsInppcHMiLCJNYW5oYXR0YW4iLCJzdmdEcm9wZG93biIsImZldGNoRGF0YSIsInppcCIsImF4aW9zIiwiZ2V0IiwidGhlbiIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsImRhdGEiLCJmZXRjaFppcERhdGEiLCJyZXMiLCJuZXdPYmoiLCJmb3JFYWNoIiwiZWxlbWVudCIsImZpZWxkcyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwibG9jYWxpdHkiLCJwYXJlbnRzIiwic3ZnREQiLCJvcHRpb25zIiwiY29udGFpbmVyIiwiZm9udFNpemUiLCJjb2xvciIsImZvbnRGYW1pbHkiLCJ4IiwieSIsIm9wdGlvbkhlaWdodCIsImhlaWdodCIsIndpZHRoIiwiaG92ZXJDb2xvciIsImhvdmVyVGV4dENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImNoYW5nZUhhbmRsZXIiLCJzZWxlY3Rpb24iLCJsZW5ndGgiLCJ6aXBMYXRMb25nIiwibGF0IiwibG9uZyIsIm1vdmVUb0xvY2F0aW9uIiwicmVtb3ZlIiwicGFyc2VkIiwiZGF0YVBhcnNlIiwiY2hhcnQiLCJzZWxlY3Rpb25Mb2NhbGVzIiwiYm9ybyIsInB1c2giLCJuZWlnaGJvcmhvb2QiLCJzdmdJZCIsInBhcmVudFNpemUiLCJnIiwic2VsZWN0ZWRPcHRpb24iLCJzZWxlY3RGaWVsZCIsInN0eWxlIiwiYWN0aXZlVGV4dCIsInRleHQiLCJvbiIsImhhbmRsZVNlbGVjdENsaWNrIiwiaGFuZGxlQmFja0NsaWNrIiwib3B0aW9uR3JvdXAiLCJvcHRpb25FbnRlciIsInNlbGVjdEFsbCIsImVudGVyIiwiaGFuZGxlT3B0aW9uQ2xpY2siLCJkIiwiaSIsInN0cm9rZSIsImpvaW4iLCJoYW5kbGVNb3VzZU92ZXIiLCJoYW5kbGVNb3VzZU91dCIsImV2ZW50IiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsInN0b3BQcm9wYWdhdGlvbiIsImNhbGwiLCJ2aXNpYmlsaXR5IiwibGV2ZWwiLCJwb3AiLCJ6b29tIiwiY2VudGVyIiwibG5nIiwiZGlzYWJsZURlZmF1bHRVSSIsIm1hcCIsImdvb2dsZSIsIm1hcHMiLCJNYXAiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiTGF0TG5nIiwicGFuVG8iLCJzZXRab29tIiwiY3RhTGF5ZXIiLCJLbWxMYXllciIsInVybCIsImlubmVySGVpZ2h0IiwicGFydGl0aW9uIiwicm9vdCIsImhpZXJhcmNoeSIsInN1bSIsInNpemUiLCJzb3J0IiwiYSIsImIiLCJ2YWx1ZSIsIk1hdGgiLCJQSSIsInNjYWxlT3JkaW5hbCIsInJhbmdlIiwicXVhbnRpemUiLCJpbnRlcnBvbGF0ZVJhaW5ib3ciLCJjaGlsZHJlbiIsImZvcm1hdCIsInJhZGl1cyIsImFyYyIsInN0YXJ0QW5nbGUiLCJ4MCIsImVuZEFuZ2xlIiwieDEiLCJwYWRBbmdsZSIsIm1pbiIsInBhZFJhZGl1cyIsImlubmVyUmFkaXVzIiwieTAiLCJvdXRlclJhZGl1cyIsIm1heCIsInkxIiwiZWFjaCIsImN1cnJlbnQiLCJzdmdQaWUiLCJtb3VzZWxlYXZlIiwiYmFja2dyb3VuZCIsInBhdGgiLCJkZXNjZW5kYW50cyIsInNsaWNlIiwiZGVwdGgiLCJwYXJlbnQiLCJuYW1lIiwiYXJjVmlzaWJsZSIsIm1vdXNlb3ZlciIsImZpbHRlciIsImNsaWNrZWQiLCJsYWJlbCIsImxhYmVsVmlzaWJsZSIsImxhYmVsVHJhbnNmb3JtIiwicGVyY2VudGFnZV90ZXh0IiwiZGF0dW0iLCJwIiwidCIsInRyYW5zaXRpb24iLCJkdXJhdGlvbiIsInR3ZWVuIiwiaW50ZXJwb2xhdGUiLCJnZXRBdHRyaWJ1dGUiLCJhdHRyVHdlZW4iLCJ0b3RhbFNpemUiLCJwZXJjZW50YWdlIiwidG9QcmVjaXNpb24iLCJwZXJjZW50YWdlU3RyaW5nIiwic2VxdWVuY2VBcnJheSIsImFuY2VzdG9ycyIsInJldmVyc2UiLCJzaGlmdCIsIm5vZGUiLCJpbmRleE9mIiwiemlwRGF0YSIsInJlc3AiLCJwaWVUcmVlRGF0YSIsImJyYWNrZXRCbGRnQ2xhc3MiLCJwcm9wZXJ0eU9iaiIsInByb3BWYWwiLCJwYXJzZUludCIsImZ1bGx2YWwiLCJibGRnQ2xhc3MiLCJibGRnY2wiLCJibGRnQ2xhc3NQYXJzZSIsImJyYWNrZXQiLCJrZXkiLCJ2IiwiY2xhc3NDb2Rlc09iaiIsImNsYXNzQ29kZXMiLCJibGRnUGFyc2VPYmoiLCJjbGFzc1R5cGUiLCJzcGxpdCIsInVuZGVmaW5lZCIsImNsYXNzT2JqIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxx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TUFBK0JFLFNBQW5DLEVBQThDO0FBQzVDLFFBQUlDLFFBQVEsR0FBRyxFQUFmO0FBQ0FBLFlBQVEsQ0FBQ1osU0FBRCxDQUFSLEdBQXNCLENBQXRCO0FBRUFRLGdCQUFZLENBQUNuSCxDQUFELENBQVosQ0FBZ0JvSCxTQUFoQixJQUE2QkcsUUFBN0I7QUFDRCxHQUxELE1BS08sSUFBSUosWUFBWSxDQUFDbkgsQ0FBRCxDQUFaLENBQWdCb0gsU0FBaEIsS0FBOEJELFlBQVksQ0FBQ25ILENBQUQsQ0FBWixDQUFnQm9ILFNBQWhCLEVBQTJCVCxTQUEzQixDQUFsQyxFQUF5RTtBQUM5RVEsZ0JBQVksQ0FBQ25ILENBQUQsQ0FBWixDQUFnQm9ILFNBQWhCLEVBQTJCVCxTQUEzQixLQUF5QyxDQUF6QztBQUNELEdBRk0sTUFFQTtBQUNMUSxnQkFBWSxDQUFDbkgsQ0FBRCxDQUFaLENBQWdCb0gsU0FBaEIsRUFBMkJULFNBQTNCLElBQXdDLENBQXhDO0FBQ0Q7QUFDRixDQWJELEM7Ozs7Ozs7Ozs7O0FDN0tBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcblxudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBidWlsZEZ1bGxQYXRoID0gcmVxdWlyZSgnLi4vY29yZS9idWlsZEZ1bGxQYXRoJyk7XG5cbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG5cbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTsgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcblxuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0OyAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG5cbiAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgcmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcblxuXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuXG5cbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSBicm93c2VyIHJlcXVlc3QgY2FuY2VsbGF0aW9uIChhcyBvcHBvc2VkIHRvIGEgbWFudWFsIGNhbmNlbGxhdGlvbilcblxuXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG5cblxuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpOyAvLyBDbGVhbiB1cCByZXF1ZXN0XG5cbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07IC8vIEhhbmRsZSB0aW1lb3V0XG5cblxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHZhciB0aW1lb3V0RXJyb3JNZXNzYWdlID0gJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJztcblxuICAgICAgaWYgKGNvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlKSB7XG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dEVycm9yTWVzc2FnZTtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKHRpbWVvdXRFcnJvck1lc3NhZ2UsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTsgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuXG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9OyAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpOyAvLyBBZGQgeHNyZiBoZWFkZXJcblxuXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGZ1bGxQYXRoKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID8gY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9IC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG5cblxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcblxuXG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIWNvbmZpZy53aXRoQ3JlZGVudGlhbHM7XG4gICAgfSAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG5cblxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcblxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfSAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuXG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7IC8vIENsZWFuIHVwIHJlcXVlc3RcblxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfSAvLyBTZW5kIHRoZSByZXF1ZXN0XG5cblxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcblxudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7IC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG5cbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpOyAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcblxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuICByZXR1cm4gaW5zdGFuY2U7XG59IC8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxuXG5cbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTsgLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5cbmF4aW9zLkF4aW9zID0gQXhpb3M7IC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcblxuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07IC8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuXG5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpOyAvLyBFeHBvc2UgYWxsL3NwcmVhZFxuXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7IC8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxuXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cblxuXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuXG5cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cblxuXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG5cbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xuXG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuXG5cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cblxuXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGFyZ3VtZW50c1sxXSB8fCB7fTtcbiAgICBjb25maWcudXJsID0gYXJndW1lbnRzWzBdO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgfVxuXG4gIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7IC8vIFNldCBjb25maWcubWV0aG9kXG5cbiAgaWYgKGNvbmZpZy5tZXRob2QpIHtcbiAgICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2UgaWYgKHRoaXMuZGVmYXVsdHMubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IHRoaXMuZGVmYXVsdHMubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnLm1ldGhvZCA9ICdnZXQnO1xuICB9IC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcblxuXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59OyAvLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcblxuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAodXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cblxuXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5cblxuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuXG5cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG5cbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnVsbFBhdGgoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKSB7XG4gIGlmIChiYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKHJlcXVlc3RlZFVSTCkpIHtcbiAgICByZXR1cm4gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVxdWVzdGVkVVJMKTtcbiAgfVxuXG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcblxudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cblxuXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuXG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307IC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcblxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoY29uZmlnLmRhdGEsIGNvbmZpZy5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVxdWVzdCk7IC8vIEZsYXR0ZW4gaGVhZGVyc1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LCBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSwgY29uZmlnLmhlYWRlcnMpO1xuICB1dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLCBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgfSk7XG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7IC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG5cbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShyZXNwb25zZS5kYXRhLCByZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpOyAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEocmVhc29uLnJlc3BvbnNlLmRhdGEsIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLCBjb25maWcudHJhbnNmb3JtUmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcblxuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG5cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIGVycm9yLmlzQXhpb3NFcnJvciA9IHRydWU7XG5cbiAgZXJyb3IudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAvLyBTdGFuZGFyZFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgLy8gTWljcm9zb2Z0XG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbixcbiAgICAgIG51bWJlcjogdGhpcy5udW1iZXIsXG4gICAgICAvLyBNb3ppbGxhXG4gICAgICBmaWxlTmFtZTogdGhpcy5maWxlTmFtZSxcbiAgICAgIGxpbmVOdW1iZXI6IHRoaXMubGluZU51bWJlcixcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXG4gICAgICBzdGFjazogdGhpcy5zdGFjayxcbiAgICAgIC8vIEF4aW9zXG4gICAgICBjb25maWc6IHRoaXMuY29uZmlnLFxuICAgICAgY29kZTogdGhpcy5jb2RlXG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gZXJyb3I7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuICB2YXIgdmFsdWVGcm9tQ29uZmlnMktleXMgPSBbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXTtcbiAgdmFyIG1lcmdlRGVlcFByb3BlcnRpZXNLZXlzID0gWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXTtcbiAgdmFyIGRlZmF1bHRUb0NvbmZpZzJLZXlzID0gWydiYXNlVVJMJywgJ3VybCcsICd0cmFuc2Zvcm1SZXF1ZXN0JywgJ3RyYW5zZm9ybVJlc3BvbnNlJywgJ3BhcmFtc1NlcmlhbGl6ZXInLCAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLCAneHNyZkhlYWRlck5hbWUnLCAnb25VcGxvYWRQcm9ncmVzcycsICdvbkRvd25sb2FkUHJvZ3Jlc3MnLCAnbWF4Q29udGVudExlbmd0aCcsICd2YWxpZGF0ZVN0YXR1cycsICdtYXhSZWRpcmVjdHMnLCAnaHR0cEFnZW50JywgJ2h0dHBzQWdlbnQnLCAnY2FuY2VsVG9rZW4nLCAnc29ja2V0UGF0aCddO1xuICB1dGlscy5mb3JFYWNoKHZhbHVlRnJvbUNvbmZpZzJLZXlzLCBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHV0aWxzLmZvckVhY2gobWVyZ2VEZWVwUHJvcGVydGllc0tleXMsIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICh1dGlscy5pc09iamVjdChjb25maWcyW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QoY29uZmlnMVtwcm9wXSkpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IHV0aWxzLmRlZXBNZXJnZShjb25maWcxW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuICB1dGlscy5mb3JFYWNoKGRlZmF1bHRUb0NvbmZpZzJLZXlzLCBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHZhciBheGlvc0tleXMgPSB2YWx1ZUZyb21Db25maWcyS2V5cy5jb25jYXQobWVyZ2VEZWVwUHJvcGVydGllc0tleXMpLmNvbmNhdChkZWZhdWx0VG9Db25maWcyS2V5cyk7XG4gIHZhciBvdGhlcktleXMgPSBPYmplY3Qua2V5cyhjb25maWcyKS5maWx0ZXIoZnVuY3Rpb24gZmlsdGVyQXhpb3NLZXlzKGtleSkge1xuICAgIHJldHVybiBheGlvc0tleXMuaW5kZXhPZihrZXkpID09PSAtMTtcbiAgfSk7XG4gIHV0aWxzLmZvckVhY2gob3RoZXJLZXlzLCBmdW5jdGlvbiBvdGhlcktleXNEZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAodHlwZW9mIGNvbmZpZzJbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcyW3Byb3BdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBjb25maWc7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuXG4gIGlmICghdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcignUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5jb25maWcsIG51bGwsIHJlc3BvbnNlLnJlcXVlc3QsIHJlc3BvbnNlKSk7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcbiAgcmV0dXJuIGRhdGE7XG59OyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcblxuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHByb2Nlc3MpID09PSAnW29iamVjdCBwcm9jZXNzXScpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG5cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHwgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fCB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fCB1dGlscy5pc1N0cmVhbShkYXRhKSB8fCB1dGlscy5pc0ZpbGUoZGF0YSkgfHwgdXRpbHMuaXNCbG9iKGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8qIElnbm9yZSAqL1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkucmVwbGFjZSgvJTQwL2dpLCAnQCcpLnJlcGxhY2UoLyUzQS9naSwgJzonKS5yZXBsYWNlKC8lMjQvZywgJyQnKS5yZXBsYWNlKC8lMkMvZ2ksICcsJykucmVwbGFjZSgvJTIwL2csICcrJykucmVwbGFjZSgvJTVCL2dpLCAnWycpLnJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuXG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuXG4gICAgaWYgKGhhc2htYXJrSW5kZXggIT09IC0xKSB7XG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMCwgaGFzaG1hcmtJbmRleCk7XG4gICAgfVxuXG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpIDogYmFzZVVSTDtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICByZXR1cm4ge1xuICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgIH0sXG4gICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgIH1cbiAgfTtcbn0oKSA6IC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIHtcbiAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gIH07XG59KCk7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/IC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG5mdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICB2YXIgb3JpZ2luVVJMO1xuICAvKipcbiAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAqL1xuXG4gIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICBpZiAobXNpZSkge1xuICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICB9XG5cbiAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTsgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgcGF0aG5hbWU6IHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nID8gdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOiAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgIH07XG4gIH1cblxuICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgLyoqXG4gICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgKi9cblxuICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICB2YXIgcGFyc2VkID0gdXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICByZXR1cm4gcGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiYgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0O1xuICB9O1xufSgpIDogLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbmZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn0oKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7IC8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG5cblxudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gWydhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJywgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLCAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J107XG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcGFyc2VkO1xufTsiLCIndXNlIHN0cmljdCc7XG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKSAmJiB0eXBlb2YgdmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlcih2YWwpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YTtcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIEFycmF5QnVmZmVyLmlzVmlldykge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHZhbCAmJiB2YWwuYnVmZmVyICYmIHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cblxuXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5cblxuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cblxuXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cblxuXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fCBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ05hdGl2ZVNjcmlwdCcgfHwgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cblxuXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG5cblxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuXG5cbmZ1bmN0aW9uIG1lcmdlKClcbi8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqL1xue1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIEZ1bmN0aW9uIGVxdWFsIHRvIG1lcmdlIHdpdGggdGhlIGRpZmZlcmVuY2UgYmVpbmcgdGhhdCBubyByZWZlcmVuY2VcbiAqIHRvIG9yaWdpbmFsIG9iamVjdHMgaXMga2VwdC5cbiAqXG4gKiBAc2VlIG1lcmdlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5cblxuZnVuY3Rpb24gZGVlcE1lcmdlKClcbi8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqL1xue1xuICB2YXIgcmVzdWx0ID0ge307XG5cbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBkZWVwTWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cblxuXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTsgLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQoKSB7XG4gIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRyeSB7XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gIH1cblxuICB0cnkge1xuICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgfVxufSkoKTtcblxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9IC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRyeSB7XG4gICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgfSAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG5cblxuICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgfVxuICB9XG59XG5cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkcmFpbmluZyA9IGZhbHNlO1xuXG4gIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgfSBlbHNlIHtcbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gIH1cblxuICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgZHJhaW5RdWV1ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gIGlmIChkcmFpbmluZykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICBkcmFpbmluZyA9IHRydWU7XG4gIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbikge1xuICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgIHF1ZXVlID0gW107XG5cbiAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICB9XG5cbiAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgfVxuXG4gIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG5cbiAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICB9XG59OyAvLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5cblxuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gIHRoaXMuZnVuID0gZnVuO1xuICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xuXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIFtdO1xufTtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAnLyc7XG59O1xuXG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIDA7XG59OyIsImltcG9ydCBcIi4vc3R5bGVzL2luZGV4LnNjc3NcIjtcbmltcG9ydCB7aW5pdE1hcCwgY3RhTGF5ZXJ9IGZyb20gXCIuL3NjcmlwdHMvbWFwXCI7XG5pbXBvcnQge3N2Z0Ryb3Bkb3duLCB0ZXN0RER9IGZyb20gXCIuL3NjcmlwdHMvZHJvcGRvd25cIjtcbmltcG9ydCB7bG9jYXRpb25zfSBmcm9tICcuL3NjcmlwdHMvdXRpbCc7XG5pbXBvcnQge2ZldGNoWmlwRGF0YX0gZnJvbSAnLi9zY3JpcHRzL2FwaSc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGluaXRNYXAoKTtcbiAgY29uc3QgZHJvcGRvd24gPSBkMy5zZWxlY3QoXCIuYm9yby1zZWxlY3RvclwiKVxuICAgIGRyb3Bkb3duLmFwcGVuZChcInN2Z1wiKVxuICAgIC5hdHRyKFwiaWRcIiwgXCJkcm9wZG93blNWR1wiKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIDUwMClcbiAgICAuYXR0cihcIndpZHRoXCIsIDMyMClcbiAgXG4gIGNvbnN0IGJvcm91Z2hzID0gT2JqZWN0LmtleXMobG9jYXRpb25zKTtcbiAgY29uc3QgemlwcyA9IGxvY2F0aW9ucy5NYW5oYXR0YW5bXCJDaGVsc2VhIGFuZCBDbGludG9uXCJdO1xuICAvLyBjb25zdCB6aXBEYXRhID0gZmV0Y2haaXBEYXRhKCk7XG4gIGRlYnVnZ2VyXG4gIHN2Z0Ryb3Bkb3duKGJvcm91Z2hzKTtcbiAgZGVidWdnZXJcbn0pOyIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmV4cG9ydCBjb25zdCBmZXRjaERhdGEgPSB6aXAgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KGAvTllPRFEvJHt6aXB9YCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UuZGF0YSlcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YVxuICB9KVxufTtcblxuZXhwb3J0IGNvbnN0IGZldGNoWmlwRGF0YSA9ICgpID0+IHtcbiAgcmV0dXJuIGF4aW9zLmdldChcIi4uLy4uL05ZX3ppcF9sYXRfbG9uZy5qc29uXCIpLnRoZW4ocmVzID0+IHtcbiAgICBsZXQgbmV3T2JqID0ge307XG5cbiAgICByZXMuZGF0YS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgbmV3T2JqW2VsZW1lbnQuZmllbGRzLnppcF0gPSBbZWxlbWVudC5maWVsZHMubGF0aXR1ZGUsIGVsZW1lbnQuZmllbGRzLmxvbmdpdHVkZV07XG4gICAgfSk7XG5kZWJ1Z2dlclxuICAgIHJldHVybiBuZXdPYmo7XG4gIH0pXG59OyIsImltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gXCIuL2FwaVwiO1xuaW1wb3J0IHtsb2NhdGlvbnMsIGRhdGFQYXJzZSwgemlwTGF0TG9uZ30gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHtjaGFydH0gZnJvbSBcIi4vcGllXCI7XG5pbXBvcnQge21vdmVUb0xvY2F0aW9ufSBmcm9tIFwiLi9tYXBcIjtcblxuZXhwb3J0IGNvbnN0IHN2Z0Ryb3Bkb3duID0gKGxvY2FsaXR5LCBwYXJlbnRzID0gW10pID0+IHtcbiAgZGVidWdnZXJcbiAgdmFyIHN2Z0REID0gZDMuc2VsZWN0KFwiI2Ryb3Bkb3duU1ZHXCIpO1xuICBjb25zdCBvcHRpb25zID0ge307XG4gIG9wdGlvbnMubG9jYXRpb25zID0gbG9jYXRpb25zO1xuICBvcHRpb25zLmxvY2FsaXR5ID0gbG9jYWxpdHk7XG4gIG9wdGlvbnMucGFyZW50cyA9IHBhcmVudHM7XG4gIG9wdGlvbnMuY29udGFpbmVyID0gc3ZnREQ7XG4gIG9wdGlvbnMuZm9udFNpemUgPSAyMDtcbiAgb3B0aW9ucy5jb2xvciA9IFwiIzMzM1wiO1xuICBvcHRpb25zLmZvbnRGYW1pbHkgPSBcImNhbGlicmlcIjtcbiAgb3B0aW9ucy54ID0gMDtcbiAgb3B0aW9ucy55PSAwO1xuICBvcHRpb25zLm9wdGlvbkhlaWdodD0gNDA7XG4gIG9wdGlvbnMuaGVpZ2h0PSA0MDtcbiAgb3B0aW9ucy53aWR0aD0gMjcwO1xuICBvcHRpb25zLmhvdmVyQ29sb3I9IFwiIzBjNTZmNVwiO1xuICBvcHRpb25zLmhvdmVyVGV4dENvbG9yPSBcIiNmZmZcIjtcbiAgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I9IFwiI2ZmZlwiO1xuICBvcHRpb25zLnBhZGRpbmcgPSA1O1xuICBvcHRpb25zLmNoYW5nZUhhbmRsZXIgPSBzZWxlY3Rpb24gPT4ge1xuICAgIGlmIChvcHRpb25zLnBhcmVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICBkZWJ1Z2dlclxuICAgICAgY29uc29sZS5sb2coemlwTGF0TG9uZ1tzZWxlY3Rpb25dKTtcbiAgICAgIGxldCBsYXQgPSB6aXBMYXRMb25nW3NlbGVjdGlvbl1bMF07XG4gICAgICBsZXQgbG9uZyA9IHppcExhdExvbmdbc2VsZWN0aW9uXVsxXTtcbiAgICAgIG1vdmVUb0xvY2F0aW9uKGxhdCwgbG9uZyk7XG4gICAgICBmZXRjaERhdGEoc2VsZWN0aW9uKS50aGVuKGRhdGEgPT4ge1xuICAgICAgICBkMy5zZWxlY3QoXCIjcGllU1ZHXCIpLnJlbW92ZSgpO1xuICAgICAgICBsZXQgcGFyc2VkID0gZGF0YVBhcnNlKGRhdGEpO1xuICAgICAgICBjaGFydChwYXJzZWQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiaGVyZVwiKVxuICAgICAgbGV0IHNlbGVjdGlvbkxvY2FsZXM7XG4gICAgICBpZiAob3B0aW9ucy5wYXJlbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsZXQgYm9ybyA9IHNlbGVjdGlvbjtcbiAgICAgICAgb3B0aW9ucy5wYXJlbnRzLnB1c2goc2VsZWN0aW9uKVxuICAgICAgICBzZWxlY3Rpb25Mb2NhbGVzID0gT2JqZWN0LmtleXMob3B0aW9ucy5sb2NhdGlvbnNbYm9yb10pO1xuICAgICAgICBzdmdEcm9wZG93bihzZWxlY3Rpb25Mb2NhbGVzLCBvcHRpb25zLnBhcmVudHMpXG4gICAgICAgIC8vIG9wdGlvbnMucGFyZW50cy5wb3AoKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJlbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBsZXQgbmVpZ2hib3Job29kID0gc2VsZWN0aW9uO1xuICAgICAgICBvcHRpb25zLnBhcmVudHMucHVzaChzZWxlY3Rpb24pXG4gICAgICAgIGxldCBib3JvID0gb3B0aW9ucy5wYXJlbnRzWzBdO1xuICAgICAgICBzZWxlY3Rpb25Mb2NhbGVzID0gb3B0aW9ucy5sb2NhdGlvbnNbYm9yb11bbmVpZ2hib3Job29kXTtcbiAgICAgICAgc3ZnRHJvcGRvd24oc2VsZWN0aW9uTG9jYWxlcywgb3B0aW9ucy5wYXJlbnRzKVxuICAgICAgfVxuICAgICAgXG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHN2Z0lkID0gcGFyZW50U2l6ZSA9PiB7XG4gICAgaWYgKCFwYXJlbnRTaXplKSB7XG4gICAgICByZXR1cm4gXCJzdmdCb3JvRERcIjtcbiAgICB9IGVsc2UgaWYgKHBhcmVudFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBcInN2Z05laWdoYm9yaG9vZEREXCI7XG4gICAgfSBlbHNlIGlmIChwYXJlbnRTaXplID09PSAyKSB7XG4gICAgICByZXR1cm4gXCJzdmdaaXBERFwiO1xuICAgIH1cbiAgfVxuICBjb25zdCBnID0gc3ZnRERcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJ4XCIsIDApXG4gICAgLmF0dHIoXCJ5XCIsIDkpXG4gICAgLmF0dHIoXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJvcHRpbWl6ZVNwZWVkXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBzdmdJZChvcHRpb25zLnBhcmVudHMubGVuZ3RoKSlcbiAgICAuYXBwZW5kKFwiZ1wiKVxuICAgIC5hdHRyKFwiZm9udC1mYW1pbHlcIiwgb3B0aW9ucy5mb250RmFtaWx5KTtcblxuICBsZXQgc2VsZWN0ZWRPcHRpb24gPSBvcHRpb25zLmxvY2FsaXR5WzBdO1xuXG4gIGNvbnN0IHNlbGVjdEZpZWxkID0gZy5hcHBlbmQoXCJnXCIpO1xuXG4gIHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInJlY3RcIilcbiAgICAuYXR0cihcIndpZHRoXCIsIG9wdGlvbnMud2lkdGgpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5oZWlnaHQpXG4gICAgLmF0dHIoXCJjbGFzc1wiLCBcIm9wdGlvbiBzZWxlY3QtZmllbGRcIilcbiAgICAuYXR0cihcImZpbGxcIiwgb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IpXG4gICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwiI2EwYTBhMFwiKVxuICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCBcIjFcIik7XG5cbiAgY29uc3QgYWN0aXZlVGV4dCA9IHNlbGVjdEZpZWxkXG4gICAgLmFwcGVuZChcInRleHRcIilcbiAgICAudGV4dChzZWxlY3RlZE9wdGlvbilcbiAgICAuYXR0cihcInhcIiwgb3B0aW9ucy5wYWRkaW5nKVxuICAgIC5hdHRyKFwieVwiLCBvcHRpb25zLmhlaWdodCAvIDIgKyBvcHRpb25zLmZvbnRTaXplIC8gMylcbiAgICAuYXR0cihcImZvbnQtc2l6ZVwiLCBvcHRpb25zLmZvbnRTaXplKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKTtcblxuICAvLyBhcnJvdyBzeW1ib2wgYXQgdGhlIGVuZCBvZiB0aGUgc2VsZWN0IGJveFxuICBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLnRleHQoXCLilrxcIilcbiAgICAuYXR0cihcInhcIiwgb3B0aW9ucy53aWR0aCAtIG9wdGlvbnMuZm9udFNpemUgLSBvcHRpb25zLnBhZGRpbmcpXG4gICAgLmF0dHIoXCJ5XCIsIG9wdGlvbnMuaGVpZ2h0IC8gMiArIChvcHRpb25zLmZvbnRTaXplIC0gMikgLyAzKVxuICAgIC5hdHRyKFwiZm9udC1zaXplXCIsIG9wdGlvbnMuZm9udFNpemUgLSAyKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKTtcblxuICAvLyB0cmFuc3BhcmVudCBzdXJmYWNlIHRvIGNhcHR1cmUgYWN0aW9uc1xuICBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBvcHRpb25zLndpZHRoKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG9wdGlvbnMuaGVpZ2h0KVxuICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgIC5vbihcImNsaWNrXCIsIGhhbmRsZVNlbGVjdENsaWNrKTtcblxuICAvLyBiYWNrIGJ1dHRvblxuICBzZWxlY3RGaWVsZFxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJpZFwiLCBcInNlbGVjdC1iYWNrLWJ1dHRvblwiKVxuICAgIC5hdHRyKFwiZmlsbFwiLCBvcHRpb25zLmNvbG9yKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy5oZWlnaHQpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgb3B0aW9ucy5oZWlnaHQpXG4gICAgLmF0dHIoXCJ4XCIsIG9wdGlvbnMud2lkdGggKyAxMClcbiAgICAub24oXCJjbGlja1wiLCBoYW5kbGVCYWNrQ2xpY2spO1xuXG4gIC8vIHJlbmRlcmluZyBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbkdyb3VwID0gZ1xuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBcIm9wdGlvbi1zZWxlY3RvcnNcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsICR7b3B0aW9ucy5oZWlnaHR9KWApXG4gICAgLmF0dHIoXCJvcGFjaXR5XCIsIDApOyAvLy5hdHRyKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7IElzc3VlIGluIElFL0ZpcmVmb3g6IFVuYWJsZSB0byBjYWxjdWxhdGUgdGV4dExlbmd0aCB3aGVuIGRpc3BsYXkgaXMgbm9uZS5cblxuICAvLyBSZW5kZXJpbmcgb3B0aW9ucyBncm91cFxuICBjb25zdCBvcHRpb25FbnRlciA9IG9wdGlvbkdyb3VwXG4gICAgLnNlbGVjdEFsbChcImdcIilcbiAgICAuZGF0YShvcHRpb25zLmxvY2FsaXR5KVxuICAgIC5lbnRlcigpXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAub24oXCJjbGlja1wiLCBoYW5kbGVPcHRpb25DbGljayk7XG5cbiAgLy8gUmVuZGVyaW5nIGJhY2tncm91bmRcbiAgb3B0aW9uRW50ZXJcbiAgICAuYXBwZW5kKFwicmVjdFwiKVxuICAgIC5hdHRyKFwid2lkdGhcIiwgb3B0aW9ucy53aWR0aClcbiAgICAuYXR0cihcImhlaWdodFwiLCBvcHRpb25zLm9wdGlvbkhlaWdodClcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHJldHVybiBpICogb3B0aW9ucy5vcHRpb25IZWlnaHQ7XG4gICAgfSlcbiAgICAuYXR0cihcImNsYXNzXCIsIFwib3B0aW9uXCIpXG4gICAgLnN0eWxlKFwic3Ryb2tlXCIsIG9wdGlvbnMuaG92ZXJDb2xvcilcbiAgICAuc3R5bGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIChkLCBpKSA9PiB7XG4gICAgICBsZXQgc3Ryb2tlID0gW1xuICAgICAgICAwLFxuICAgICAgICBvcHRpb25zLndpZHRoLFxuICAgICAgICBvcHRpb25zLm9wdGlvbkhlaWdodCxcbiAgICAgICAgb3B0aW9ucy53aWR0aCxcbiAgICAgICAgb3B0aW9ucy5vcHRpb25IZWlnaHRcbiAgICAgIF07XG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBzdHJva2UgPSBbXG4gICAgICAgICAgb3B0aW9ucy53aWR0aCArIG9wdGlvbnMub3B0aW9uSGVpZ2h0LFxuICAgICAgICAgIG9wdGlvbnMud2lkdGgsXG4gICAgICAgICAgb3B0aW9ucy5vcHRpb25IZWlnaHRcbiAgICAgICAgXTtcbiAgICAgIH0gZWxzZSBpZiAoaSA9PT0gb3B0aW9ucy5sb2NhbGl0eS5sZW5ndGggLSAxKSB7XG4gICAgICAgIHN0cm9rZSA9IFswLCBvcHRpb25zLndpZHRoLCBvcHRpb25zLm9wdGlvbkhlaWdodCAqIDIgKyBvcHRpb25zLndpZHRoXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJva2Uuam9pbihcIiBcIik7XG4gICAgfSlcbiAgICAuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgMSlcbiAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yKTtcblxuICBvcHRpb25FbnRlclxuICAgIC5hcHBlbmQoXCJ0ZXh0XCIpXG4gICAgLmF0dHIoXCJ4XCIsIG9wdGlvbnMucGFkZGluZylcbiAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGkgKiBvcHRpb25zLm9wdGlvbkhlaWdodCArXG4gICAgICAgIG9wdGlvbnMub3B0aW9uSGVpZ2h0IC8gMiArXG4gICAgICAgIG9wdGlvbnMuZm9udFNpemUgLyAzXG4gICAgICApO1xuICAgIH0pXG4gICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgIHJldHVybiBkO1xuICAgIH0pXG4gICAgLmF0dHIoXCJmb250LXNpemVcIiwgb3B0aW9ucy5mb250U2l6ZSlcbiAgICAuYXR0cihcImZpbGxcIiwgb3B0aW9ucy5jb2xvcilcblxuICBvcHRpb25FbnRlclxuICAgIC5hcHBlbmQoXCJyZWN0XCIpXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCBvcHRpb25zLndpZHRoKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIG9wdGlvbnMub3B0aW9uSGVpZ2h0KVxuICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgcmV0dXJuIGkgKiBvcHRpb25zLm9wdGlvbkhlaWdodDtcbiAgICB9KVxuICAgIC5zdHlsZShcImZpbGxcIiwgXCJ0cmFuc3BhcmVudFwiKVxuICAgIC5vbihcIm1vdXNlb3ZlclwiLCBoYW5kbGVNb3VzZU92ZXIpXG4gICAgLm9uKFwibW91c2VvdXRcIiwgaGFuZGxlTW91c2VPdXQpO1xuXG4gIG9wdGlvbkdyb3VwLmF0dHIoXCJkaXNwbGF5XCIsIFwibm9uZVwiKS5hdHRyKFwib3BhY2l0eVwiLCAxKTtcblxuICBkMy5zZWxlY3QoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgIG9wdGlvbkdyb3VwLmF0dHIoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gaGFuZGxlTW91c2VPdmVyKCkge1xuICAgIGQzLnNlbGVjdChkMy5ldmVudC50YXJnZXQucGFyZW50Tm9kZSlcbiAgICAgIC5zZWxlY3QoXCIub3B0aW9uXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdGlvbnMuaG92ZXJDb2xvcik7XG5cbiAgICBkMy5zZWxlY3QoZDMuZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUpXG4gICAgICAuc2VsZWN0KFwidGV4dFwiKVxuICAgICAgLnN0eWxlKFwiZmlsbFwiLCBvcHRpb25zLmhvdmVyVGV4dENvbG9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZU1vdXNlT3V0KCkge1xuICAgIGQzLnNlbGVjdChkMy5ldmVudC50YXJnZXQucGFyZW50Tm9kZSlcbiAgICAgIC5zZWxlY3QoXCIub3B0aW9uXCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdGlvbnMuYmFja2dyb3VuZENvbG9yKTtcblxuICAgIGQzLnNlbGVjdChkMy5ldmVudC50YXJnZXQucGFyZW50Tm9kZSlcbiAgICAgIC5zZWxlY3QoXCJ0ZXh0XCIpXG4gICAgICAuc3R5bGUoXCJmaWxsXCIsIG9wdGlvbnMuY29sb3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlT3B0aW9uQ2xpY2soZCkge1xuICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHNlbGVjdGVkT3B0aW9uID0gZDtcbiAgICBhY3RpdmVUZXh0LnRleHQoc2VsZWN0ZWRPcHRpb24pXG4gICAgb3B0aW9ucy5jaGFuZ2VIYW5kbGVyLmNhbGwodGhpcywgZCk7XG4gICAgb3B0aW9uR3JvdXAuYXR0cihcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlU2VsZWN0Q2xpY2soKSB7XG4gICAgZDMuZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgdmlzaWJpbGl0eSA9IG9wdGlvbkdyb3VwLmF0dHIoXCJkaXNwbGF5XCIpID09PSBcImJsb2NrXCIgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcbiAgICBvcHRpb25Hcm91cC5hdHRyKFwiZGlzcGxheVwiLCB2aXNpYmlsaXR5KTtcbiAgfVxuICBcbiAgZnVuY3Rpb24gaGFuZGxlQmFja0NsaWNrKCkge1xuICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBsZXZlbCA9IFwiXCI7XG4gICAgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxldmVsID0gXCIjc3ZnTmVpZ2hib3Job29kRERcIjtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgIGxldmVsID0gXCIjc3ZnWmlwRERcIjtcbiAgICB9XG4gICAgZDMuc2VsZWN0KGxldmVsKS5yZW1vdmUoKTtcbiAgICBvcHRpb25zLnBhcmVudHMucG9wKCk7XG4gIH1cbn0iLCJleHBvcnQgY29uc3QgaW5pdE1hcCA9ICgpID0+IHtcblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHpvb206IDExLFxuICAgIGNlbnRlcjogeyBcbiAgICAgIGxhdDogNDAuNzExODE4NixcbiAgICAgIGxuZzogLTc0LjA1MDMyOVxuICAgICB9LCBcbiAgICBkaXNhYmxlRGVmYXVsdFVJOiB0cnVlXG4gIH07XG5cbiAgd2luZG93Lm1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXBcIiksIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgY29uc3QgbW92ZVRvTG9jYXRpb24gPSAobGF0LCBsbmcpID0+IHtcbiAgY29uc3QgY2VudGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyhsYXQsIGxuZyk7XG4gIHdpbmRvdy5tYXAucGFuVG8oY2VudGVyKTtcbiAgd2luZG93Lm1hcC5zZXRab29tKDE1KVxufVxuXG5leHBvcnQgY29uc3QgY3RhTGF5ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuS21sTGF5ZXIoe1xuICB1cmw6IFwiXCIsXG4gIG1hcDogd2luZG93Lm1hcFxufSkiLCJleHBvcnQgY29uc3QgY2hhcnQgPSBkYXRhID0+IHtcbiAgZDMuc2VsZWN0KFwiLnBpZS1jb250YWluZXJcIilcbiAgICAuYXBwZW5kKFwic3ZnXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBcInBpZVNWR1wiKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIHdpbmRvdy5pbm5lckhlaWdodClcbiAgICAuYXR0cihcIndpZHRoXCIsIDQwMClcblxuICBjb25zdCBwYXJ0aXRpb24gPSBkYXRhID0+IHtcbiAgICBjb25zdCByb290ID0gZDMuaGllcmFyY2h5KGRhdGEpXG4gICAgICAuc3VtKGQgPT4gZC5zaXplKVxuICAgIC5zb3J0KChhLCBiKSA9PiBiLnZhbHVlIC0gYS52YWx1ZSk7XG5cbiAgICByZXR1cm4gZDMucGFydGl0aW9uKClcbiAgICAgIC5zaXplKFsyICogTWF0aC5QSSwgcm9vdC5oZWlnaHQgKyAxXSlcbiAgICAgIChyb290KTtcbiAgfTtcblxuICBjb25zdCBjb2xvciA9IGQzLnNjYWxlT3JkaW5hbCgpLnJhbmdlKGQzLnF1YW50aXplKGQzLmludGVycG9sYXRlUmFpbmJvdywgZGF0YS5jaGlsZHJlbi5sZW5ndGggKyAxKSk7XG4gIGNvbnN0IGZvcm1hdCA9IGQzLmZvcm1hdChcIixkXCIpO1xuICAvLyB3aWR0aCByZWZlcnMgdG8gdGhlIHdpZHRoIG9mIHRoZSBnIGVsZW1lbnQgdGhhdCBjb250YWlucyB0aGUgcGllXG4gIGNvbnN0IHdpZHRoID0gMjkwO1xuICBjb25zdCByYWRpdXMgPSB3aWR0aCAvIDY7XG4gIGNvbnN0IGFyYyA9IGQzLmFyYygpXG4gICAgLnN0YXJ0QW5nbGUoZCA9PiBkLngwKVxuICAgIC5lbmRBbmdsZShkID0+IGQueDEpXG4gICAgLnBhZEFuZ2xlKGQgPT4gTWF0aC5taW4oKGQueDEgLSBkLngwKSAvIDIsIDAuMDA1KSlcbiAgICAucGFkUmFkaXVzKHJhZGl1cyAqIDEuNSlcbiAgICAuaW5uZXJSYWRpdXMoZCA9PiBkLnkwICogcmFkaXVzICogMS40KVxuICAgIC5vdXRlclJhZGl1cyhkID0+IE1hdGgubWF4KGQueTAgKiByYWRpdXMgKiAxLjksIGQueTEgKiByYWRpdXMgKiAxLjkgLSAxKSlcblxuICBjb25zdCByb290ID0gcGFydGl0aW9uKGRhdGEpO1xuXG4gIHJvb3QuZWFjaChkID0+IHtkLmN1cnJlbnQgPSBkfSk7XG4gIGNvbnN0IHN2Z1BpZSA9IGQzLnNlbGVjdChcIiNwaWVTVkdcIilcblxuICBjb25zdCBnID0gc3ZnUGllLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcImhlaWdodFwiLCAzMDApXG4gICAgLmF0dHIoXCJ3aWR0aFwiLCAzMDApXG4gICAgLy8gLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke3dpbmRvdy5pbm5lcldpZHRoIC8gM30sJHt3aWR0aCAvIDJ9KWApXG4gICAgLm9uKFwibW91c2VsZWF2ZVwiLCBtb3VzZWxlYXZlKTtcblxuICBjb25zdCBiYWNrZ3JvdW5kID0gZy5hcHBlbmQoXCJjaXJjbGVcIilcbiAgICAuYXR0cihcInJcIiwgXCIxOTVcIilcbiAgICAuYXR0cihcImZpbGxcIiwgXCJ3aGl0ZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoMjAwLCAyMDApYClcblxuICBjb25zdCBwYXRoID0gZy5hcHBlbmQoXCJnXCIpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgyMDAsIDIwMClgKVxuICAgIC5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgLmRhdGEocm9vdC5kZXNjZW5kYW50cygpLnNsaWNlKDEpKVxuICAgIC5lbnRlcigpLmFwcGVuZChcInBhdGhcIilcbiAgICAuYXR0cihcImZpbGxcIiwgZCA9PiB7IHdoaWxlIChkLmRlcHRoID4gMSkgZCA9IGQucGFyZW50OyByZXR1cm4gY29sb3IoZC5kYXRhLm5hbWUpOyB9KVxuICAgIC5hdHRyKFwiZmlsbC1vcGFjaXR5XCIsIGQgPT4gYXJjVmlzaWJsZShkLmN1cnJlbnQpID8gKGQuY2hpbGRyZW4gPyAwLjYgOiAwLjQpIDogMClcbiAgICAuYXR0cihcImRcIiwgZCA9PiBhcmMoZC5jdXJyZW50KSlcbiAgICAub24oXCJtb3VzZW92ZXJcIiwgbW91c2VvdmVyKTtcblxuICAgIFxuICBwYXRoLmZpbHRlcihkID0+IGQuY2hpbGRyZW4pXG4gICAgLnN0eWxlKFwiY3Vyc29yXCIsIFwicG9pbnRlclwiKVxuICAgIC5vbihcImNsaWNrXCIsIGNsaWNrZWQpO1xuXG4gIHBhdGguYXBwZW5kKFwidGl0bGVcIilcbiAgICAudGV4dChkID0+IGAke2QudmFsdWV9YCk7XG5cbiAgY29uc3QgbGFiZWwgPSBnLmFwcGVuZChcImdcIilcbiAgICAuYXR0cihcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKVxuICAgIC5hdHRyKFwidGV4dC1hbmNob3JcIiwgXCJtaWRkbGVcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDIwMCwgMjAwKWApXG4gICAgLnN0eWxlKFwidXNlci1zZWxlY3RcIiwgXCJub25lXCIpXG4gICAgLnNlbGVjdEFsbChcInRleHRcIilcbiAgICAuZGF0YShyb290LmRlc2NlbmRhbnRzKCkuc2xpY2UoMSkpXG4gICAgLmVudGVyKCkuYXBwZW5kKFwidGV4dFwiKVxuICAgIC5hdHRyKFwiZHlcIiwgXCIwLjM1ZW1cIilcbiAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBkID0+ICtsYWJlbFZpc2libGUoZC5jdXJyZW50KSlcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBkID0+IGxhYmVsVHJhbnNmb3JtKGQuY3VycmVudCkpXG4gICAgLnRleHQoZCA9PiBkLmRhdGEubmFtZSk7XG5cbiAgLy9wZXJjZW50YWdlIHRleHRcbiAgY29uc3QgcGVyY2VudGFnZV90ZXh0ID0gc3ZnUGllLmFwcGVuZChcInRleHRcIilcbiAgICAuYXR0cihcImlkXCIsIFwidGl0bGVcIilcbiAgICAuYXR0cihcInhcIiwgKHdpZHRoIC8gMS4xKSlcbiAgICAuYXR0cihcInlcIiwgKHdpZHRoIC8gMikpXG4gICAgLmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuICAgIC5hdHRyKFwidHJhbnNmb3JtXCIsIGB0cmFuc2xhdGUoLTYyLCA2NSlgKVxuICAgIC5zdHlsZShcImZvbnQtc2l6ZVwiLCBcIjJlbVwiKTtcblxuICBjb25zdCBwYXJlbnQgPSBnLmFwcGVuZChcImNpcmNsZVwiKVxuICAgIC5kYXR1bShyb290KVxuICAgIC5hdHRyKFwiclwiLCByYWRpdXMpXG4gICAgLmF0dHIoXCJmaWxsXCIsIFwibm9uZVwiKVxuICAgIC5hdHRyKFwicG9pbnRlci1ldmVudHNcIiwgXCJhbGxcIilcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDIwMCwgMjAwKWApXG4gICAgLm9uKFwiY2xpY2tcIiwgY2xpY2tlZCk7XG5cbiAgZnVuY3Rpb24gY2xpY2tlZChwKSB7XG4gICAgcGFyZW50LmRhdHVtKHAucGFyZW50IHx8IHJvb3QpO1xuXG4gICAgcm9vdC5lYWNoKGQgPT4gZC50YXJnZXQgPSB7XG4gICAgICB4MDogTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKGQueDAgLSBwLngwKSAvIChwLngxIC0gcC54MCkpKSAqIDIgKiBNYXRoLlBJLFxuICAgICAgeDE6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChkLngxIC0gcC54MCkgLyAocC54MSAtIHAueDApKSkgKiAyICogTWF0aC5QSSxcbiAgICAgIHkwOiBNYXRoLm1heCgwLCBkLnkwIC0gcC5kZXB0aCksXG4gICAgICB5MTogTWF0aC5tYXgoMCwgZC55MSAtIHAuZGVwdGgpXG4gICAgfSk7XG4gICAgY29uc3QgdCA9IGcudHJhbnNpdGlvbigpLmR1cmF0aW9uKDc1MCk7XG5cbiAgICAvLyBUcmFuc2l0aW9uIHRoZSBkYXRhIG9uIGFsbCBhcmNzLCBldmVuIHRoZSBvbmVzIHRoYXQgYXJlbuKAmXQgdmlzaWJsZSxcbiAgICAvLyBzbyB0aGF0IGlmIHRoaXMgdHJhbnNpdGlvbiBpcyBpbnRlcnJ1cHRlZCwgZW50ZXJpbmcgYXJjcyB3aWxsIHN0YXJ0XG4gICAgLy8gdGhlIG5leHQgdHJhbnNpdGlvbiBmcm9tIHRoZSBkZXNpcmVkIHBvc2l0aW9uLlxuICAgIHBhdGgudHJhbnNpdGlvbih0KVxuICAgICAgLnR3ZWVuKFwiZGF0YVwiLCBkID0+IHtcbiAgICAgICAgY29uc3QgaSA9IGQzLmludGVycG9sYXRlKGQuY3VycmVudCwgZC50YXJnZXQpO1xuICAgICAgICByZXR1cm4gdCA9PiBkLmN1cnJlbnQgPSBpKHQpO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLmdldEF0dHJpYnV0ZShcImZpbGwtb3BhY2l0eVwiKSB8fCBhcmNWaXNpYmxlKGQudGFyZ2V0KTtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcImZpbGwtb3BhY2l0eVwiLCBkID0+IGFyY1Zpc2libGUoZC50YXJnZXQpID8gKGQuY2hpbGRyZW4gPyAwLjYgOiAwLjQpIDogMClcbiAgICAgIC5hdHRyVHdlZW4oXCJkXCIsIGQgPT4gKCkgPT4gYXJjKGQuY3VycmVudCkpO1xuXG4gICAgbGFiZWwuZmlsdGVyKGZ1bmN0aW9uIChkKSB7XG4gICAgICByZXR1cm4gK3RoaXMuZ2V0QXR0cmlidXRlKFwiZmlsbC1vcGFjaXR5XCIpIHx8IGxhYmVsVmlzaWJsZShkLnRhcmdldCk7XG4gICAgfSkudHJhbnNpdGlvbih0KVxuICAgICAgLmF0dHIoXCJmaWxsLW9wYWNpdHlcIiwgZCA9PiArbGFiZWxWaXNpYmxlKGQudGFyZ2V0KSlcbiAgICAgIC5hdHRyVHdlZW4oXCJ0cmFuc2Zvcm1cIiwgZCA9PiAoKSA9PiBsYWJlbFRyYW5zZm9ybShkLmN1cnJlbnQpKTtcbiAgfVxuXG4gIC8vbW91c2Ugb3ZlclxuICBjb25zdCB0b3RhbFNpemUgPSByb290LmRlc2NlbmRhbnRzKClbMF0udmFsdWU7XG4gIGZ1bmN0aW9uIG1vdXNlb3ZlcihkKSB7XG4gICAgdmFyIHBlcmNlbnRhZ2UgPSAoMTAwICogZC52YWx1ZSAvIHRvdGFsU2l6ZSkudG9QcmVjaXNpb24oMyk7XG4gICAgdmFyIHBlcmNlbnRhZ2VTdHJpbmcgPSBwZXJjZW50YWdlICsgXCIlXCI7XG4gICAgaWYgKHBlcmNlbnRhZ2UgPCAwLjEpIHtcbiAgICAgIHBlcmNlbnRhZ2VTdHJpbmcgPSBcIjwgMC4xJVwiO1xuICAgIH1cbiAgICBwZXJjZW50YWdlX3RleHQudGV4dChwZXJjZW50YWdlU3RyaW5nICsgXCIgXCIpO1xuICAgIFxuXG5cbiAgICB2YXIgc2VxdWVuY2VBcnJheSA9IGQuYW5jZXN0b3JzKCkucmV2ZXJzZSgpO1xuICAgIHNlcXVlbmNlQXJyYXkuc2hpZnQoKTsgLy8gcmVtb3ZlIHJvb3Qgbm9kZSBmcm9tIHRoZSBhcnJheVxuICAgIC8vIEZhZGUgYWxsIHRoZSBzZWdtZW50cy5cbiAgICBkMy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDAuMyk7XG5cbiAgICAvLyBUaGVuIGhpZ2hsaWdodCBvbmx5IHRob3NlIHRoYXQgYXJlIGFuIGFuY2VzdG9yIG9mIHRoZSBjdXJyZW50IHNlZ21lbnQuXG4gICAgZy5zZWxlY3RBbGwoXCJwYXRoXCIpXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHJldHVybiAoc2VxdWVuY2VBcnJheS5pbmRleE9mKG5vZGUpID49IDApO1xuICAgICAgfSlcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSk7XG4gIH1cbiAgLy9tb3VzZSBsZWF2ZVxuICAvLyBSZXN0b3JlIGV2ZXJ5dGhpbmcgdG8gZnVsbCBvcGFjaXR5IHdoZW4gbW92aW5nIG9mZiB0aGUgdmlzdWFsaXphdGlvbi5cbiAgZnVuY3Rpb24gbW91c2VsZWF2ZShkKSB7XG5cbiAgICAvLyBEZWFjdGl2YXRlIGFsbCBzZWdtZW50cyBkdXJpbmcgdHJhbnNpdGlvbi5cbiAgICBkMy5zZWxlY3RBbGwoXCJwYXRoXCIpLm9uKFwibW91c2VvdmVyXCIsIG51bGwpO1xuXG4gICAgLy8gVHJhbnNpdGlvbiBlYWNoIHNlZ21lbnQgdG8gZnVsbCBvcGFjaXR5IGFuZCB0aGVuIHJlYWN0aXZhdGUgaXQuXG4gICAgZDMuc2VsZWN0QWxsKFwicGF0aFwiKVxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSlcbiAgICAgIC5vbihcImVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5vbihcIm1vdXNlb3ZlclwiLCBtb3VzZW92ZXIpO1xuICAgICAgfSk7XG5cbiAgICBwZXJjZW50YWdlX3RleHQudGV4dChcIlwiKTs7XG4gIH1cbiAgZnVuY3Rpb24gYXJjVmlzaWJsZShkKSB7XG4gICAgcmV0dXJuIGQueTEgPD0gMiAmJiBkLnkwID49IDEgJiYgZC54MSA+IGQueDA7XG4gIH1cblxuICBmdW5jdGlvbiBsYWJlbFZpc2libGUoZCkge1xuICAgIHJldHVybiBkLnkxIDw9IDIgJiYgZC55MCA+PSAxICYmIChkLnkxIC0gZC55MCkgKiAoZC54MSAtIGQueDApID4gMC4wMztcbiAgfVxuXG4gIGZ1bmN0aW9uIGxhYmVsVHJhbnNmb3JtKGQpIHtcbiAgICBjb25zdCB4ID0gKGQueDAgKyBkLngxKSAvIDIgKiAxODAgLyBNYXRoLlBJO1xuICAgIGNvbnN0IHkgPSAoZC55MCArIGQueTEpIC8gMS4xNSAqIHJhZGl1cztcbiAgICByZXR1cm4gYHJvdGF0ZSgke3ggLSA5MH0pIHRyYW5zbGF0ZSgke3l9LDApIHJvdGF0ZSgke3ggPCAxODAgPyAwIDogMTgwfSlgO1xuICB9XG5cbiAgcmV0dXJuIHN2Z1BpZS5ub2RlKCk7XG59IiwiaW1wb3J0IHtmZXRjaFppcERhdGF9IGZyb20gJy4vYXBpJztcblxuZXhwb3J0IGNvbnN0IGxvY2F0aW9ucyA9IHtcbiAgXCJNYW5oYXR0YW5cIjoge1xuICAgIFwiQ2VudHJhbCBIYXJsZW1cIjogW1wiMTAwMjZcIiwgXCIxMDAyN1wiLCBcIjEwMDMwXCIsIFwiMTAwMzdcIiwgXCIxMDAzOVwiXSxcbiAgICBcIkNoZWxzZWEgYW5kIENsaW50b25cIjogW1wiMTAwMDFcIiwgXCIxMDAxMVwiLCBcIjEwMDE4XCIsIFwiMTAwMTlcIiwgXCIxMDAyMFwiLCBcIjEwMDM2XCJdLFxuICAgIFwiRWFzdCBIYXJsZW1cIjogW1wiMTAwMjlcIiwgXCIxMDAzNVwiXSxcbiAgICBcIkdyYW1lcmN5IFBhcmsgYW5kIE11cnJheSBIaWxsXCI6IFtcIjEwMDEwXCIsIFwiMTAwMTZcIiwgXCIxMDAxN1wiLCBcIjEwMDIyXCJdLFxuICAgIFwiR3JlZW53aWNoIFZpbGxhZ2UgYW5kIFNvaG9cIjogW1wiMTAwMTJcIiwgXCIxMDAxM1wiLCBcIjEwMDE0XCJdLCBcbiAgICBcIkxvd2VyIE1hbmhhdHRhblwiOiBbXCIxMDAwNFwiLCBcIjEwMDA1XCIsIFwiMTAwMDZcIiwgXCIxMDAwN1wiLCBcIjEwMDM4XCIsIFwiMTAyODBcIl0sXG4gICAgXCJMb3dlciBFYXN0IFNpZGVcIjogW1wiMTAwMDJcIiwgXCIxMDAwM1wiLCBcIjEwMDA5XCJdLFxuICAgIFwiVXBwZXIgRWFzdCBTaWRlXCI6IFtcIjEwMDIxXCIsIFwiMTAwMjhcIiwgXCIxMDA0NFwiLCBcIjEwMDY1XCIsIFwiMTAwNzVcIiwgXCIxMDEyOFwiXSxcbiAgICBcIlVwcGVyIFdlc3QgU2lkZVwiOiBbXCIxMDAyM1wiLCBcIjEwMDI0XCIsIFwiMTAwMjVcIl0sXG4gICAgXCJJbndvb2QgYW5kIFdhc2hpbmd0b24gSGVpZ2h0c1wiOiBbXCIxMDAzMVwiLCBcIjEwMDMyXCIsIFwiMTAwMzNcIiwgXCIxMDAzNFwiLCBcIjEwMDQwXCJdXG4gIH0sIFxuICBcIkJyb254XCI6IHtcbiAgICBcIkNlbnRyYWwgQnJvbnhcIjogW1wiMTA0NTNcIiwgXCIxMDQ1N1wiLCBcIjEwNDYwXCJdLFxuICAgIFwiQnJvbnggUGFya1wiOiBbXCIxMDQ1OFwiLCBcIjEwNDY3XCIsIFwiMTA0NjhcIl0sXG4gICAgXCJIaWdoIEJyaWRnZSBhbmQgRm9yZGhhbVwiOiBbXCIxMDQ1MVwiLCBcIjEwNDUyXCIsIFwiMTA0NTZcIl0sXG4gICAgXCJIdW50cyBQb2ludCBhbmQgTW90dCBIYXZlblwiOiBbXCIxMDQ1NFwiLCBcIjEwNDU1XCIsIFwiMTA0NTlcIiwgXCIxMDQ3NFwiXSxcbiAgICBcIktpbmdzYnJpZGdlIGFuZCBSaXZlcmRhbGVcIjogW1wiMTA0NjNcIiwgXCIxMDQ3MVwiXSxcbiAgICBcIk5vcnRoZWFzdCBCcm9ueFwiOiBbXCIxMDQ2NlwiLCBcIjEwNDY5XCIsIFwiMTA0NzBcIiwgXCIxMDQ3NVwiXSxcbiAgICBcIlNvdXRoZWFzdCBCcm9ueFwiOiBbXCIxMDQ2MVwiLCBcIjEwNDYyXCIsIFwiMTA0NjRcIiwgXCIxMDQ2NVwiLCBcIjEwNDcyXCIsIFwiMTA0NzNcIl1cbiAgfSxcbiAgXCJCcm9va2x5blwiOiB7XG4gICAgXCJDZW50cmFsIEJyb29rbHluXCI6IFtcIjExMjEyXCIsIFwiMTEyMTNcIiwgXCIxMTIxNlwiLCBcIjExMjMzXCIsIFwiMTEyMzhcIl0sXG4gICAgXCJTb3V0aHdlc3QgQnJvb2tseW5cIjogW1wiMTEyMDlcIiwgXCIxMTIxNFwiLCBcIjExMjI4XCJdLFxuICAgIFwiQm9yb3VnaCBQYXJrXCI6IFtcIjExMjA0XCIsIFwiMTEyMThcIiwgXCIxMTIxOVwiLCBcIjExMjMwXCJdLFxuICAgIFwiQ2FuYXJzaWUgYW5kIEZsYXRsYW5kc1wiOiBbXCIxMTIzNFwiLCBcIjExMjM2XCIsIFwiMTEyMzlcIl0sXG4gICAgXCJTb3V0aGVybiBCcm9va2x5blwiOiBbXCIxMTIyM1wiLCBcIjExMjI0XCIsIFwiMTEyMjlcIiwgXCIxMTIzNVwiXSxcbiAgICBcIk5vcnRod2VzdCBCcm9va2x5blwiOiBbXCIxMTIwMVwiLCBcIjExMjA1XCIsIFwiMTEyMTVcIiwgXCIxMTIxN1wiLCBcIjExMjMxXCJdLFxuICAgIFwiRmxhdGJ1c2hcIjogW1wiMTEyMDNcIiwgXCIxMTIxMFwiLCBcIjExMjI1XCIsIFwiMTEyMjZcIl0sXG4gICAgXCJFYXN0IE5ldyBZb3JrIGFuZCBOZXcgTG90c1wiOiBbXCIxMTIwN1wiLCBcIjExMjA4XCJdLFxuICAgIFwiR3JlZW5wb2ludFwiOiBbXCIxMTIxMVwiLCBcIjExMjIyXCJdLFxuICAgIFwiU3Vuc2V0IFBhcmtcIjogW1wiMTEyMjBcIiwgXCIxMTIzMlwiXSxcbiAgICBcIkJ1c2h3aWNrIGFuZCBXaWxsaWFtc2J1cmdcIjogW1wiMTEyMDZcIiwgXCIxMTIyMVwiLCBcIjExMjM3XCJdXG4gIH0sXG4gIFwiUXVlZW5zXCI6IHtcbiAgICBcIk5vcnRoZWFzdCBRdWVlbnNcIjogW1wiMTEzNjFcIiwgXCIxMTM2MlwiLCBcIjExMzYzXCIsIFwiMTEzNjRcIl0sXG4gICAgXCJOb3J0aCBRdWVlbnNcIjogW1wiMTEzNTRcIiwgXCIxMTM1NVwiLCBcIjExMzU2XCIsIFwiMTEzNTdcIiwgXCIxMTM1OFwiLCBcIjExMzU5XCIsIFwiMTEzNjBcIl0sXG4gICAgXCJDZW50cmFsIFF1ZWVuc1wiOiBbXCIxMTM2NVwiLCBcIjExMzY2XCIsIFwiMTEzNjdcIl0sXG4gICAgXCJKYW1haWNhXCI6IFtcIjExNDEyXCIsIFwiMTE0MjNcIiwgXCIxMTQzMlwiLCBcIjExNDMzXCIsIFwiMTE0MzRcIiwgXCIxMTQzNVwiLCBcIjExNDM2XCJdLFxuICAgIFwiTm9ydGh3ZXN0IFF1ZWVuc1wiOiBbXCIxMTEwMVwiLCBcIjExMTAyXCIsIFwiMTExMDNcIiwgXCIxMTEwNFwiLCBcIjExMTA1XCIsIFwiMTExMDZcIl0sXG4gICAgXCJXZXN0IENlbnRyYWwgUXVlZW5zXCI6IFtcIjExMzc0XCIsIFwiMTEzNzVcIiwgXCIxMTM3OVwiLCBcIjExMzg1XCJdLFxuICAgIFwiUm9ja2F3YXlzXCI6IFtcIjExNjkxXCIsIFwiMTE2OTJcIiwgXCIxMTY5M1wiLCBcIjExNjk0XCIsIFwiMTE2OTVcIiwgXCIxMTY5N1wiXSxcbiAgICBcIlNvdXRoZWFzdCBRdWVlbnNcIjogW1wiMTEwMDRcIiwgXCIxMTAwNVwiLCBcIjExNDExXCIsIFwiMTE0MTNcIiwgXCIxMTQyMlwiLCBcIjExNDI2XCIsIFwiMTE0MjdcIiwgXCIxMTQyOFwiLCBcIjExNDI5XCJdLFxuICAgIFwiU291dGh3ZXN0IFF1ZWVuc1wiOiBbXCIxMTQxNFwiLCBcIjExNDE1XCIsIFwiMTE0MTZcIiwgXCIxMTQxN1wiLCBcIjExNDE4XCIsIFwiMTE0MTlcIiwgXCIxMTQyMFwiLCBcIjExNDIxXCJdLFxuICAgIFwiV2VzdCBRdWVlbnNcIjogW1wiMTEzNjhcIiwgXCIxMTM2OVwiLCBcIjExMzcwXCIsIFwiMTEzNzJcIiwgXCIxMTM3M1wiLCBcIjExMzc3XCIsIFwiMTEzNzhcIl1cbiAgfSxcbiAgXCJTdGF0ZW4gSXNsYW5kXCI6IHtcbiAgICBcIlBvcnQgUmljaG1vbmRcIjogW1wiMTAzMDJcIiwgXCIxMDMwM1wiLCBcIjEwMzEwXCJdLFxuICAgIFwiU291dGggU2hvcmVcIjogW1wiMTAzMDZcIiwgXCIxMDMwN1wiLCBcIjEwMzA4XCIsIFwiMTAzMDlcIiwgXCIxMDMxMlwiXSxcbiAgICBcIlN0YXBsZXRvbiBhbmQgU3QuIEdlb3JnZVwiOiBbXCIxMDMwMVwiLCBcIjEwMzA0XCIsIFwiMTAzMDVcIl0sXG4gICAgXCJNaWQtSXNsYW5kXCI6IFtcIjEwMzE0XCJdXG4gIH1cbn1cblxuZXhwb3J0IGxldCB6aXBMYXRMb25nID0gbnVsbDtcbmNvbnN0IHppcERhdGEgPSBmZXRjaFppcERhdGEoKTtcbnppcERhdGEudGhlbihyZXNwID0+IHppcExhdExvbmcgPSByZXNwKTtcblxuZXhwb3J0IGNvbnN0IGRhdGFQYXJzZSA9IChkYXRhKSA9PiB7XG4gIGNvbnN0IHBpZVRyZWVEYXRhID0ge1xuICAgIG5hbWU6IFwiemlwY29kZVwiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiJDEwbSA8XCIsIFxuICAgICAgICBjaGlsZHJlbjogW11cbiAgICAgIH0sIHtcbiAgICAgICAgbmFtZTogXCIkMW0gPCAkMTBtXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIiQ1MDBrIDwgJDFtXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIiQyMDBrIHRvICQ1MDBrXCIsXG4gICAgICAgIGNoaWxkcmVuOiBbXVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBcIjwgJDIwMGtcIixcbiAgICAgICAgY2hpbGRyZW46IFtdXG4gICAgICB9XG4gICAgXVxuICB9O1xuICAvLyB0b3RhbCBhdmcgY2FsYyBmb3IgdGhhdCB6aXAgY29kZVxuXG4gIC8vIENPTU1FTlQgSU4gV0hFTiBDUkVBVElORyBUT1RBTCBBVkVSQUdFUyBESVNQTEFZICoqKioqKioqKioqKioqKioqKioqKlxuICAvLyBsZXQgdG90YWxDb3VudCA9IDA7XG4gIC8vIGxldCB0b3RhbFZhbCA9IDA7XG5cbiAgLy8gc3BsaXQgaW50byA1IHByaWNlIGJyYWNrZXRzXG4gIC8vIDE6IDEwbWlsICssIDI6IDFtaWwgLSAxMG1pbCwgMzogNTAway05Ljk5OWssIDQ6IDIwMC00OTlrLCA1OiA8IDIwMGtcblxuICAvLyBFQUNIIEJSQUNLRVQgQVNTRVNTRUQgVkFMVUVTIEFORCBDT1VOVFMgRk9SIEFWRVJBR0UgKioqKioqKioqKioqKioqKipcbiAgLy8gbGV0IGJyYWNrZXQxVmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQyVmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQzVmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQ0VmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQ1VmFsID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQxQ3QgPSAwO1xuICAvLyBsZXQgYnJhY2tldDJDdCA9IDA7XG4gIC8vIGxldCBicmFja2V0M0N0ID0gMDtcbiAgLy8gbGV0IGJyYWNrZXQ0Q3QgPSAwO1xuICAvLyBsZXQgYnJhY2tldDVDdCA9IDA7XG5cbiAgbGV0IGJyYWNrZXRCbGRnQ2xhc3MgPSBbe30se30se30se30se31dO1xuXG4gIC8vIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICBkYXRhLmZvckVhY2gocHJvcGVydHlPYmogPT4ge1xuICAgIGxldCBwcm9wVmFsID0gcGFyc2VJbnQocHJvcGVydHlPYmouZnVsbHZhbCk7XG4gICAgbGV0IGJsZGdDbGFzcyA9IHByb3BlcnR5T2JqLmJsZGdjbDtcbiAgICBcbiAgICAvLyB0b3RhbCBhdmdcblxuICAgIC8vIENPTU1FTlQgSU4gV0hFTiBDUkVBVElORyBUT1RBTCBBVkVSQUdFUyBESVNQTEFZICoqKioqKioqKioqKioqKioqKioqKlxuICAgIC8vIHRvdGFsVmFsID0gdG90YWxWYWwgKyBwcm9wVmFsO1xuICAgIC8vIHRvdGFsQ291bnQrKztcblxuICAgIC8vIHByaWNlIGJyYWNrZXRzXG4gICAgaWYgKHByb3BWYWwgPj0gMTAwMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQxVmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0MUN0ICs9IDFcblxuICAgICAgYmxkZ0NsYXNzUGFyc2UoYmxkZ0NsYXNzLCAwLCBicmFja2V0QmxkZ0NsYXNzKVxuICAgIH0gZWxzZSBpZiAocHJvcFZhbCA8IDEwMDAwMDAwICYmIHByb3BWYWwgPj0gMTAwMDAwMCkge1xuICAgICAgLy8gYnJhY2tldDJWYWwgKz0gcHJvcFZhbDtcbiAgICAgIC8vIGJyYWNrZXQyQ3QgKz0gMTtcblxuICAgICAgYmxkZ0NsYXNzUGFyc2UoYmxkZ0NsYXNzLCAxLCBicmFja2V0QmxkZ0NsYXNzKVxuICAgIH0gZWxzZSBpZiAocHJvcFZhbCA8IDEwMDAwMDAgJiYgcHJvcFZhbCA+PSA1MDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQzVmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0M0N0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMiwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCA1MDAwMDAgJiYgcHJvcFZhbCA+PSAyMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQ0VmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0NEN0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgMywgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9IGVsc2UgaWYgKHByb3BWYWwgPCAyMDAwMDApIHtcbiAgICAgIC8vIGJyYWNrZXQ1VmFsICs9IHByb3BWYWw7XG4gICAgICAvLyBicmFja2V0NUN0ICs9IDE7XG5cbiAgICAgIGJsZGdDbGFzc1BhcnNlKGJsZGdDbGFzcywgNCwgYnJhY2tldEJsZGdDbGFzcylcbiAgICB9XG4gIH0pO1xuXG4gIGJyYWNrZXRCbGRnQ2xhc3MuZm9yRWFjaCgoYnJhY2tldCwgaSkgPT4ge1xuICAgIGZvciAobGV0IGtleSBpbiBicmFja2V0KSB7XG4gICAgICBcbiAgICAgIGxldCB2ID0gW11cbiAgICAgIGxldCBjbGFzc0NvZGVzT2JqID0gYnJhY2tldFtrZXldO1xuXG4gICAgICBmb3IgKGxldCBjbGFzc0NvZGVzIGluIGNsYXNzQ29kZXNPYmopIHtcbiAgICAgICAgdi5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBjbGFzc0NvZGVzLFxuICAgICAgICAgIHNpemU6IGNsYXNzQ29kZXNPYmpbY2xhc3NDb2Rlc11cbiAgICAgICAgfSlcbiAgICAgIH1cblxuICBcbiAgICAgIHBpZVRyZWVEYXRhLmNoaWxkcmVuW2ldLmNoaWxkcmVuLnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgY2hpbGRyZW46IHZcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gcGllVHJlZURhdGE7XG4gIC8vIHJldHVybiAodG90YWxWYWwgLyB0b3RhbENvdW50KTtcbn1cblxuY29uc3QgYmxkZ0NsYXNzUGFyc2UgPSAoYmxkZ0NsYXNzLCBpLCBibGRnUGFyc2VPYmopID0+IHtcbiAgbGV0IGNsYXNzVHlwZSA9IGJsZGdDbGFzcy5zcGxpdChcIlwiKVswXTtcblxuICBpZiAoYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV0gPT09IHVuZGVmaW5lZCkge1xuICAgIGxldCBjbGFzc09iaiA9IHt9O1xuICAgIGNsYXNzT2JqW2JsZGdDbGFzc10gPSAxO1xuXG4gICAgYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV0gPSBjbGFzc09iajtcbiAgfSBlbHNlIGlmIChibGRnUGFyc2VPYmpbaV1bY2xhc3NUeXBlXSAmJiBibGRnUGFyc2VPYmpbaV1bY2xhc3NUeXBlXVtibGRnQ2xhc3NdKSB7XG4gICAgYmxkZ1BhcnNlT2JqW2ldW2NsYXNzVHlwZV1bYmxkZ0NsYXNzXSArPSAxO1xuICB9IGVsc2Uge1xuICAgIGJsZGdQYXJzZU9ialtpXVtjbGFzc1R5cGVdW2JsZGdDbGFzc10gPSAxO1xuICB9XG59XG5cbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=