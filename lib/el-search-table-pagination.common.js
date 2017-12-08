/*!
 * el-search-table-pagination
 * Copyright(c) 2017 zollero
 * MIT Licensed
 */
module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var formProps = exports.formProps = {
  size: {
    type: String,
    default: '',
    validator: sizeValidator
  },
  showResetBtn: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  },
  labelWidth: Number,
  itemWidth: Number,
  submitHandler: Function,
  submitLoading: {
    type: Boolean,
    default: false
  },
  submitBtnText: {
    type: String,
    default: '查询'
  },
  resetBtnText: {
    type: String,
    default: '重置'
  },
  forms: {
    type: Array,
    required: true,
    label: String,
    prop: {
      type: [String, Array],
      required: true
    },
    itemType: {
      type: String,
      default: 'input',
      validator: itemTypeValidator
    },
    size: {
      type: String,
      default: '',
      validator: sizeValidator
    },
    placeholder: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    options: Array,
    selectFetch: Function,
    selectResultField: String,
    selectResultHandler: Function,
    selectUrl: String,
    selectMethod: String,
    valueKey: String,
    labelKey: String,
    format: Function,
    selectParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    rules: Array,
    pickerOptions: Object
  }
};

function sizeValidator(value) {
  var methodTypes = ['large', 'small', 'mini'];
  var valid = methodTypes.indexOf(value.toLowerCase()) !== -1 || value === '';
  if (!valid) {
    throw new Error('Size must be one of [\'large\', \'small\', \'mini\']');
  }
  return valid;
}

function itemTypeValidator(value) {
  var methodTypes = ['input', 'select', 'date', 'daterange'];
  var valid = methodTypes.indexOf(value.toLowerCase()) !== -1;
  if (!valid) {
    throw new Error('ItemType must be one of [\'input\', \'select\', \'date\', \'daterange\']');
  }
  return valid;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_683a1f2a_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(11);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_683a1f2a_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _index = __webpack_require__(5);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(13);

var _index4 = _interopRequireDefault(_index3);

var _package = __webpack_require__(14);

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var components = [_index2.default, _index4.default];

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  components.map(function (component) {
    Vue.component(component.name, component);
  });
  if (!opts.axios) {
    opts.axios = __webpack_require__(15);
    opts.axios.interceptors.response.use(function (response) {
      return JSON.parse(JSON.stringify(response.data));
    }, function (error) {
      return Promise.reject(error.response);
    });
  }
  Vue.prototype.$axios = opts.axios;
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

exports.default = {
  version: _package2.default.version,
  install: install,
  SearchTablePagination: _index2.default,
  SearchForm: _index4.default
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(6);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f5404f34_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(12);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f5404f34_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _vue = __webpack_require__(8);

var _vue2 = _interopRequireDefault(_vue);

var _props = __webpack_require__(9);

var _props2 = _interopRequireDefault(_props);

var _main = __webpack_require__(2);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElSearchTablePagination',
  components: {
    searchForm: _main2.default
  },
  props: _props2.default,
  data: function data() {
    var _this = this;
    return {
      Vue: _vue2.default,
      pagination: {
        pageIndex: 1,
        pageSize: function () {
          var pageSizes = _this.pageSizes;

          if (pageSizes.length > 0) {
            return pageSizes[0];
          }
          return 20;
        }()
      },
      total: 0,
      loading: false,
      tableData: [],
      cacheLocalData: []
    };
  },

  computed: {
    newSlotScope: function newSlotScope() {
      return Number(_vue2.default.version.replace(/\./g, '')) >= 250;
    }
  },
  methods: {
    handleSizeChange: function handleSizeChange(size) {
      this.pagination.pageSize = size;
      this.dataChangeHandler();
    },
    handleCurrentChange: function handleCurrentChange(pageIndex) {
      this.pagination.pageIndex = pageIndex;
      this.dataChangeHandler();
    },
    searchHandler: function searchHandler() {
      this.pagination.pageIndex = 1;
      this.dataChangeHandler(arguments[0]);
    },
    dataChangeHandler: function dataChangeHandler() {
      var type = this.type;

      if (type === 'local') {
        this.dataFilterHandler(arguments[0]);
      } else if (type === 'remote') {
        this.fetchHandler(arguments[0]);
      }
    },
    dataFilter: function dataFilter(data) {
      var _pagination = this.pagination,
          pageIndex = _pagination.pageIndex,
          pageSize = _pagination.pageSize;

      return data.filter(function (v, i) {
        return i >= (pageIndex - 1) * pageSize && i < pageIndex * pageSize;
      });
    },
    dataFilterHandler: function dataFilterHandler(formParams) {
      var cacheLocalData = this.cacheLocalData,
          params = this.params,
          pagination = this.pagination;
      var pageIndex = pagination.pageIndex,
          pageSize = pagination.pageSize;

      var mergeParams = Object.assign(params, formParams);
      var validParamKeys = Object.keys(mergeParams).filter(function (v) {
        return mergeParams[v] !== undefined && mergeParams[v] !== '';
      });
      if (validParamKeys.length > 0) {
        var validData = cacheLocalData.filter(function (v) {
          var valids = [];
          validParamKeys.forEach(function (vv) {
            if (typeof v[vv] === 'number') {
              valids.push(String(v[vv]) === String(mergeParams[vv]));
            } else {
              valids.push(v[vv] === mergeParams[vv]);
            }
          });
          return valids.every(function (vvv) {
            return vvv;
          });
        });

        this.tableData = this.dataFilter(validData);
        this.total = validData.length;
      } else {
        this.total = cacheLocalData.length;
        this.tableData = this.dataFilter(cacheLocalData);
      }
    },
    fetchHandler: function fetchHandler() {
      var _this2 = this;

      var formParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.loading = true;
      var fetch = this.fetch,
          method = this.method,
          url = this.url,
          $axios = this.$axios,
          headers = this.headers,
          listField = this.listField,
          pageIndexKey = this.pageIndexKey,
          pageSizeKey = this.pageSizeKey,
          totalField = this.totalField,
          params = this.params,
          showPagination = this.showPagination,
          pagination = this.pagination;


      params = JSON.parse(JSON.stringify(Object.assign(params, formParams)));

      if (showPagination) {
        var _Object$assign;

        params = Object.assign(params, (_Object$assign = {}, _Object$assign[pageIndexKey] = pagination.pageIndex, _Object$assign[pageSizeKey] = pagination.pageSize, _Object$assign));
      }

      var requestObject = null;

      if (fetch) {
        requestObject = fetch(params);
      } else {
        $axios.interceptors.request.use(function (config) {
          Object.keys(headers).forEach(function (v) {
            config.headers[v] = headers[v];
          });
          return config;
        }, function (error) {
          return Promise.reject(error);
        });

        method = method.toLowerCase();

        if (method === 'get') {
          requestObject = $axios[method](url, { params: params });
        } else {
          requestObject = $axios[method](url, params);
        }
      }

      requestObject.then(function (response) {
        var result = response;

        if (response && !(response instanceof Array)) {
          if (listField && listField.indexOf('.') !== -1) {
            listField.split('.').forEach(function (vv) {
              result = result[vv];
            });
          } else {
            result = response[listField];
          }
        }

        if (!result || !(result instanceof Array)) {
          throw new Error('The result of key:' + listField + ' is not Array.');
          _this2.loading = false;
          return false;
        }

        if (_this2.dataHandler) {
          _this2.tableData = result.map(_this2.dataHandler);
        } else {
          _this2.tableData = result;
        }

        var totalValue = response;
        if (response[totalField] && totalField && totalField.indexOf('.') !== -1) {
          totalField.split('.').forEach(function (vv) {
            totalValue = totalValue[vv];
          });
        } else {
          totalValue = response[totalField] || result.length;
        }

        _this2.total = totalValue;

        _this2.loading = false;
      }).catch(function (error) {
        console.error('Get remote data failed. ', error);
        _this2.loading = false;
      });
    },
    emitEventHandler: function emitEventHandler(event) {
      this.$emit.apply(this, [event].concat(Array.from(arguments).slice(1)));
    },
    loadLocalData: function loadLocalData(data) {
      if (!data) {
        throw new Error('When the type is \'local\', you must set attribute \'data\' and \'data\' must be a array.');
        this.showPagination = false;
        return false;
      }
      var cacheData = JSON.parse(JSON.stringify(data));
      this.tableData = this.dataFilter(cacheData);
      this.cacheLocalData = cacheData;
      this.total = cacheData.length;
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    // event: expand changed to `expand-change` in Element v2.x
    this.$refs['table'].$on('expand', function (row, expanded) {
      return _this3.emitEventHandler('expand', row, expanded);
    });
    var type = this.type,
        autoLoad = this.autoLoad,
        data = this.data,
        formOptions = this.formOptions,
        params = this.params;

    if (type === 'remote' && autoLoad) {
      if (formOptions) {
        this.$refs['searchForm'].getParams(function (error, formParams) {
          if (!error) {
            _this3.fetchHandler(Object.assign(formParams, params));
          }
        });
      } else {
        this.fetchHandler(params);
      }
    } else if (type === 'local') {
      this.loadLocalData(data);
    }
  },

  watch: {
    data: function data(value) {
      this.loadLocalData(value);
    }
  }
}; //
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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _props = __webpack_require__(1);

var props = {
  // Element UI Table attributes
  height: [String, Number],
  maxHeight: [String, Number],
  stripe: Boolean,
  border: Boolean,
  fit: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  rowClassName: [String, Function],
  rowStyle: [String, Function],
  rowKey: [String, Function],
  emptyText: String,
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  // custom attributes
  fetch: {
    type: Function
  },
  url: {
    type: String
  },
  method: {
    type: String,
    default: 'get',
    validator: function validator(value) {
      var methodTypes = ['get', 'post', 'put', 'delete'];
      return methodTypes.indexOf(value.toLowerCase()) !== -1;
    }
  },
  headers: {
    type: Object,
    default: function _default() {
      return {};
    }
  },
  listField: {
    type: String,
    default: 'data.list'
  },
  totalField: {
    type: String,
    default: 'data.total'
  },
  params: {
    type: Object,
    default: function _default() {
      return {};
    }
  },
  formOptions: {
    type: Object
  },
  autoLoad: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'remote',
    validator: function validator(value) {
      var types = ['remote', 'local'];
      var validType = types.indexOf(value) !== -1;
      if (!validType) {
        throw new Error('Invalid type of \'' + value + '\', please set one type of \'remote\' or \'local\'.');
      }
      return validType;
    }
  },
  data: {
    type: Array
  },
  dataHandler: {
    type: Function
  },
  columns: {
    type: Array,
    required: true,
    // Element UI table-column attribute
    columnKey: String,
    label: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      required: true
    },
    width: Number,
    minWidth: Number,
    fixed: [Boolean, String],
    renderHeader: Function,
    sortable: [Boolean, String],
    sortMethod: Function,
    resizable: {
      type: Boolean,
      default: true
    },
    formatter: Function,
    showOverflowTooltip: Boolean,
    align: {
      type: String,
      default: 'left'
    },
    headerAlign: String,
    className: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },
    selectable: Function,
    reserveSelection: Boolean,
    filters: Array,
    filterPlacement: String,
    filterMultiple: {
      type: Boolean,
      default: true
    },
    filterMethod: Function,
    filteredValue: Array,
    // custom table-column attribute
    filter: {
      type: String
    },
    render: {
      type: Function
    },
    slotName: {
      type: String
    }
  },
  showPagination: {
    type: Boolean,
    default: true
  },
  pageSizes: {
    type: Array,
    default: function _default() {
      return [20, 50, 100];
    }
  },
  paginationLayout: {
    type: String,
    default: 'total, prev, pager, next, jumper, sizes'
  },
  pageIndexKey: {
    type: String,
    default: 'pageIndex'
  },
  pageSizeKey: {
    type: String,
    default: 'pageSize'
  }
};

Object.keys(_props.formProps).forEach(function (v) {
  props.formOptions[v] = _props.formProps[v];
});

exports.default = props;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
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

var _props = __webpack_require__(1);

exports.default = {
  name: 'ElSearchForm',
  props: _props.formProps,
  data: function data() {
    var _this = this;

    var forms = this.$props.forms;

    var datePrefix = 'daterange-prefix';
    var selectOptionPrefix = 'select-option-prefix';
    var dataObj = {
      selectOptions: {}
    };

    var params = {};
    var format = {};

    forms.forEach(function (v, i) {
      var propType = _typeof(v.prop);
      if (propType === 'string') {
        v.modelValue = v.prop;
        params[v.prop] = '';
        if (v.format) {
          format[v.prop] = v.format;
        }
      } else if (propType === 'object' && Object.prototype.toString.call(v.prop) === '[object Array]') {
        v.prop.forEach(function (vv) {
          params[vv] = '';
          if (v.format) {
            format[vv] = v.format;
          }
        });
      }
      if (v.itemType === 'daterange') {
        params[datePrefix + i] = '';
        v.modelValue = datePrefix + i;
      }
      if (v.itemType === 'select' && (v.selectFetch || v.selectUrl)) {
        var dataKey = selectOptionPrefix + i;
        dataObj.selectOptions[dataKey] = [];
        var $axios = _this.$axios;

        if (!v.selectMethod) {
          v.selectMethod = 'get';
        }
        _this.getRemoteData({
          fetch: v.selectFetch ? v.selectFetch : function () {
            return $axios[v.selectMethod](v.selectUrl, v.selectMethod.toLowerCase() === 'get' ? { params: v.selectParams } : v.selectParams);
          },
          dataKey: dataKey,
          resultField: v.selectResultField || 'result',
          resultHandler: v.selectResultHandler
        });
      }
    });

    return _extends({
      params: params,
      datePrefix: datePrefix,
      selectOptionPrefix: selectOptionPrefix
    }, dataObj, {
      format: format
    });
  },

  computed: {
    itemStyle: function itemStyle() {
      var itemWidth = this.itemWidth;

      if (itemWidth) {
        return 'width: ' + itemWidth + 'px;';
      }
      return '';
    }
  },
  methods: {
    isArray: function isArray(value) {
      return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    },
    searchHandler: function searchHandler() {
      var _this2 = this;

      this.getParams(function (error, params) {
        if (!error) {
          var submitHandler = _this2.submitHandler;

          if (submitHandler) {
            submitHandler(params);
          } else {
            throw new Error('Need to set attribute: submitHandler !');
          }
        }
      });
    },
    getParams: function getParams(callback) {
      var _this3 = this;

      this.$refs['form'].validate(function (valid) {
        if (valid) {
          var params = _this3.params,
              datePrefix = _this3.datePrefix,
              format = _this3.format;

          var formattedForm = {};
          Object.keys(params).forEach(function (v) {
            if (v.indexOf(datePrefix) === -1) {
              formattedForm[v] = format[v] ? format[v](params[v], v) : params[v];
            }
          });
          if (callback) callback(null, formattedForm);
        } else {
          if (callback) callback(new Error());
        }
      });
    },
    resetForm: function resetForm() {
      this.$refs['form'].resetFields();
    },
    changeDate: function changeDate(date, startDate, endDate) {
      var dates = void 0;
      if (typeof date === 'string') {
        dates = date.split(' - ');
      } else {
        var firstDate = date[0];
        var secondDate = date[1];
        dates = [firstDate.getFullYear() + '-' + ('0' + (firstDate.getMonth() + 1)).substr(-2) + '-' + ('0' + firstDate.getDate()).substr(-2), secondDate.getFullYear() + '-' + ('0' + (secondDate.getMonth() + 1)).substr(-2) + '-' + ('0' + secondDate.getDate()).substr(-2)];
      }

      this.params[startDate] = dates[0];
      this.params[endDate] = dates[1];
    },
    getRemoteData: function getRemoteData(_ref) {
      var _this4 = this;

      var fetch = _ref.fetch,
          dataKey = _ref.dataKey,
          resultField = _ref.resultField,
          resultHandler = _ref.resultHandler;

      fetch().then(function (response) {
        var result = response;
        if ((typeof response === 'undefined' ? 'undefined' : _typeof(response)) === 'object' && !_this4.isArray(response)) {
          if (resultField.indexOf('.') !== -1) {
            resultField.split('.').forEach(function (vv) {
              result = result[vv];
            });
          } else {
            result = response[resultField];
          }
        }

        if (!result || !(result instanceof Array)) {
          throw new Error('The result of key:' + resultField + ' is not Array. \u63A5\u53E3\u8FD4\u56DE\u7684\u5B57\u6BB5:' + resultField + ' \u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4');
        }

        if (_this4.resultHandler) {
          _this4.selectOptions[dataKey] = result.map(_this4.resultHandler);
        } else {
          _this4.selectOptions[dataKey] = result;
        }
      });
    }
  }
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form',{ref:"form",attrs:{"model":_vm.params,"inline":_vm.inline,"label-width":_vm.labelWidth ? (_vm.labelWidth + 'px') : ''}},[_vm._l((_vm.forms),function(form,index){return _c('el-form-item',{key:index,attrs:{"prop":form.itemType != 'daterange' ? form.prop : (_vm.datePrefix + index),"label":form.label,"rules":form.rules || [],"label-width":form.labelWidth ? (form.labelWidth + 'px') : ''}},[(form.itemType === 'input' || form.itemType === undefined)?_c('el-input',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"size":form.size ? form.size : _vm.size,"readonly":form.readonly,"disabled":form.disabled,"placeholder":form.placeholder},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}}):(form.itemType === 'select')?_c('el-select',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"size":form.size ? form.size : _vm.size,"disabled":form.disabled,"placeholder":form.placeholder},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}},[_vm._l((form.options),function(option,optionIndex){return _c('el-option',{key:optionIndex,attrs:{"value":(typeof option === 'object') ? option[form.valueKey || 'value'] : option,"label":(typeof option === 'object') ? option[form.labelKey || 'label'] : option}})}),_vm._l((_vm.selectOptions[_vm.selectOptionPrefix + index]),function(op,opIndex){return _c('el-option',{key:opIndex,attrs:{"value":(typeof op === 'object') ? op[form.valueKey || 'value'] : op,"label":(typeof op === 'object') ? op[form.labelKey || 'label'] : op}})})],2):(form.itemType === 'date')?_c('el-date-picker',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"type":"date","placeholder":form.placeholder,"size":form.size ? form.size : _vm.size,"disabled":form.disabled,"readonly":form.readonly,"editable":form.editable,"picker-options":form.pickerOptions || {}},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}}):(form.itemType === 'daterange')?_c('el-date-picker',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"size":form.size ? form.size : _vm.size,"type":"daterange","disabled":form.disabled,"readonly":form.readonly,"editable":form.editable,"placeholder":form.placeholder,"picker-options":form.pickerOptions || {}},on:{"change":function (date) { return _vm.changeDate(date, form.prop[0], form.prop[1]); }},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}}):_vm._e()],1)}),_c('el-form-item',{attrs:{"label":""}},[_c('el-button',{attrs:{"type":"primary","size":_vm.size,"loading":_vm.submitLoading},on:{"click":_vm.searchHandler}},[_vm._v("\n      "+_vm._s(_vm.submitBtnText)+"\n    ")]),(_vm.showResetBtn)?_c('el-button',{attrs:{"type":"primary","plain":true,"size":_vm.size,"loading":_vm.submitLoading},on:{"click":_vm.resetForm}},[_vm._v("\n      "+_vm._s(_vm.resetBtnText)+"\n    ")]):_vm._e()],1)],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.formOptions)?_c('search-form',{ref:"searchForm",attrs:{"forms":_vm.formOptions.forms,"size":_vm.formOptions.size,"inline":_vm.formOptions.inline,"label-width":_vm.formOptions.labelWidth,"item-width":_vm.formOptions.itemWidth,"submit-handler":_vm.searchHandler,"submit-loading":_vm.loading,"showResetBtn":_vm.formOptions.showResetBtn,"submitBtnText":_vm.formOptions.submitBtnText,"resetBtnText":_vm.formOptions.resetBtnText}}):_vm._e(),_vm._t("form",null,{loading:_vm.loading,search:_vm.searchHandler}),_vm._t("default"),_c('el-table',{directives:[{name:"loading",rawName:"v-loading.lock",value:(_vm.loading),expression:"loading",modifiers:{"lock":true}}],ref:"table",staticStyle:{"width":"100%","margin-top":"20px"},attrs:{"data":_vm.tableData,"border":_vm.border,"stripe":_vm.stripe,"height":_vm.height,"max-height":_vm.maxHeight,"fit":_vm.fit,"show-header":_vm.showHeader,"highlight-current-row":_vm.highlightCurrentRow,"current-row-key":_vm.currentRowKey,"row-class-name":_vm.rowClassName,"row-style":_vm.rowStyle,"row-ket":_vm.rowKey,"empty-text":_vm.emptyText,"default-expand-all":_vm.defaultExpandAll,"expand-row-keys":_vm.expandRowKeys,"default-sort":_vm.defaultSort,"tooltip-effect":_vm.tooltipEffect,"show-summary":_vm.showSummary,"sum-text":_vm.sumText,"summary-method":_vm.summaryMethod},on:{"select":function (selection, row) { return _vm.emitEventHandler('select', selection, row); },"select-all":function (selection) { return _vm.emitEventHandler('select-all', selection); },"selection-change":function (selection) { return _vm.emitEventHandler('selection-change', selection); },"cell-mouse-enter":function (row, column, cell, event) { return _vm.emitEventHandler('cell-mouse-enter', row, column, cell, event); },"cell-mouse-leave":function (row, column, cell, event) { return _vm.emitEventHandler('cell-mouse-leave', row, column, cell, event); },"cell-click":function (row, column, cell, event) { return _vm.emitEventHandler('cell-click', row, column, cell, event); },"cell-dblclick":function (row, column, cell, event) { return _vm.emitEventHandler('cell-dblclick', row, column, cell, event); },"row-click":function (row, event, column) { return _vm.emitEventHandler('row-click', row, event, column); },"row-dblclick":function (row, event) { return _vm.emitEventHandler('row-dblclick', row, event); },"row-contextmenu":function (row, event) { return _vm.emitEventHandler('row-contextmenu', row, event); },"header-click":function (column, event) { return _vm.emitEventHandler('header-click', column, event); },"sort-change":function (args) { return _vm.emitEventHandler('sort-change', args); },"filter-change":function (filters) { return _vm.emitEventHandler('filter-change', filters); },"current-change":function (currentRow, oldCurrentRow) { return _vm.emitEventHandler('current-change', currentRow, oldCurrentRow); },"header-dragend":function (newWidth, oldWidth, column, event) { return _vm.emitEventHandler('header-dragend', newWidth, oldWidth, column, event); },"expand-change":function (row, expanded) { return _vm.emitEventHandler('expand-change', row, expanded); }}},[_vm._t("prepend"),_vm._l((_vm.columns),function(column,columnIndex){return _c('el-table-column',{key:columnIndex,attrs:{"column-key":column.columnKey,"prop":column.prop,"label":column.label,"width":column.minWidth ? '-' : (column.width || 140),"minWidth":column.minWidth || column.width || 140,"fixed":column.fixed,"render-header":column.renderHeader,"sortable":column.sortable,"sort-method":column.method,"resizable":column.resizable,"formatter":column.formatter,"show-overflow-tooltip":column.showOverflowTooltip,"align":column.align,"header-align":column.headerAlign || column.align,"class-name":column.className,"label-class-name":column.labelClassName,"selectable":column.selectable,"reserve-selection":column.reserveSelection,"filters":column.filters,"filter-placement":column.filterPlacement,"filter-multiple":column.filterMultiple,"filter-method":column.filterMethod,"filtered-value":column.filteredValue},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(column.filter)?_c('span',[_vm._v("\n          "+_vm._s(_vm.Vue.filter(column['filter'])(scope.row[column.prop]))+"\n        ")]):(column.slotName)?_c('span',[_vm._t(column.slotName,null,{row:scope.row})],2):_c('span',[_vm._v("\n          "+_vm._s(column.render ? column.render(scope.row) : scope.row[column.prop])+"\n        ")])]}}])})}),_vm._t("append")],2),(_vm.showPagination)?_c('div',{staticStyle:{"margin-top":"10px","text-align":"right"}},[_c('el-pagination',{attrs:{"current-page":_vm.pagination.pageIndex,"page-sizes":_vm.pageSizes,"page-size":_vm.pagination.pageSize,"layout":_vm.paginationLayout,"total":_vm.total},on:{"size-change":_vm.handleSizeChange,"current-change":_vm.handleCurrentChange}})],1):_vm._e()],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _main = __webpack_require__(2);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_main2.default.install = function (Vue) {
  Vue.component(_main2.default.name, _main2.default);
};

exports.default = _main2.default;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {"name":"el-search-table-pagination","version":"0.4.15","description":"A component which combines form、table with pagination components in Element UI. ","main":"./lib/index.js","files":["lib","src","packages"],"scripts":{"test":"echo \"Error: no test specified\" && exit 1","build":"cooking build -c build/cooking.conf.js,build/cooking.common.js,build/cooking.component.js"},"repository":{"type":"git","url":"git+https://github.com/zollero/el-search-table-pagination.git"},"keywords":["Element UI","UI","Vue","form","table","pagination"],"author":"zollero <corona7@163.com>","license":"MIT","bugs":{"url":"https://github.com/zollero/el-search-table-pagination/issues"},"homepage":"https://github.com/zollero/el-search-table-pagination#readme","peerDependencies":{"element-ui":"^2.0.7","vue":"^2.5.2"},"dependencies":{"axios":"^0.16.2"},"devDependencies":{"babel-core":"^6.26.0","babel-loader":"^7.1.2","babel-plugin-module-resolver":"^3.0.0","babel-plugin-syntax-jsx":"^6.18.0","babel-plugin-transform-vue-jsx":"^3.5.0","babel-preset-es2015":"^6.24.1","babel-preset-stage-3":"^6.24.1","cooking":"^1.5.4","cooking-vue2":"^0.3.3","extract-text-webpack-plugin":"^3.0.2","html-webpack-plugin":"^2.30.1","vue-template-compiler":"^2.5.9","webpack":"^3.8.1","webpack-node-externals":"^1.6.0"}}

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })
/******/ ]);