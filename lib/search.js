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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
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
  fuzzy: {
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
    required: true
    // label: String,
    // prop: {
    //   type: [String, Array],
    //   required: true
    // },
    // itemType: {
    //   type: String,
    //   default: 'input',
    //   validator: itemTypeValidator
    // },
    // size: {
    //   type: String,
    //   default: '',
    //   validator: sizeValidator
    // },
    // placeholder: {
    //   type: String,
    //   default: ''
    // },
    // editable: {
    //   type: Boolean,
    //   default: true
    // },
    // disabled: {
    //   type: Boolean,
    //   default: false
    // },
    // readonly: {
    //   type: Boolean,
    //   default: false
    // },
    // fuzzy: {
    //   type: Boolean,
    //   default: false
    // },
    // options: Array,
    // selectFetch: Function,
    // selectResultField: String,
    // selectResultHandler: Function,
    // selectUrl: String,
    // selectMethod: String,
    // valueKey: String,
    // labelKey: String,
    // format: Function,
    // selectParams: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   }
    // },
    // rules: Array,
    // pickerOptions: Object
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

// function itemTypeValidator(value) {
//   const methodTypes = ['input', 'select', 'date', 'daterange'];
//   const valid = methodTypes.indexOf(value.toLowerCase()) !== -1
//   if (!valid) {
//     throw new Error(`ItemType must be one of ['input', 'select', 'date', 'daterange']`)
//   }
//   return valid
// }

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b9d566d_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__ = __webpack_require__(4);
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b9d566d_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 3 */
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

    var _$props = this.$props,
        forms = _$props.forms,
        fuzzy = _$props.fuzzy;

    var datePrefix = 'daterange-prefix';
    var selectOptionPrefix = 'select-option-prefix';
    var dataObj = {
      selectOptions: {}
    };

    var params = {};
    var format = {};
    var fuzzyOps = {};

    forms.forEach(function (v, i) {
      var propType = _typeof(v.prop);
      if (propType === 'string') {
        v.modelValue = v.prop;
        params[v.prop] = '';

        fuzzyOps[v.prop] = v.fuzzy ? v.fuzzy : fuzzy;
        if (v.format) {
          format[v.prop] = v.format;
        }
      } else if (propType === 'object' && Object.prototype.toString.call(v.prop) === '[object Array]') {
        v.prop.forEach(function (vv) {
          params[vv] = '';
          if (v.format) {
            format[vv] = v.format;
          }

          fuzzyOps[vv] = v.fuzzy ? v.fuzzy : fuzzy;
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
      format: format,
      fuzzyOps: fuzzyOps
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
    getParamFuzzy: function getParamFuzzy() {
      return this.fuzzyOps;
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
      if (date === null) {
        this.params[startDate] = '';
        this.params[endDate] = '';
        return;
      }
      if (typeof date === 'string') {
        dates = date.split(' - ');
      } else if (date && date.hasOwnProperty('length')) {
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
          console.warn('The result of key:' + resultField + ' is not Array. \u63A5\u53E3\u8FD4\u56DE\u7684\u5B57\u6BB5:' + resultField + ' \u4E0D\u662F\u4E00\u4E2A\u6570\u7EC4');
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-form',{ref:"form",attrs:{"model":_vm.params,"inline":_vm.inline,"label-width":_vm.labelWidth ? (_vm.labelWidth + 'px') : ''},nativeOn:{"submit":function($event){$event.preventDefault();_vm.searchHandler()}}},[_vm._l((_vm.forms),function(form,index){return _c('el-form-item',{key:index,attrs:{"prop":form.itemType != 'daterange' ? form.prop : (_vm.datePrefix + index),"label":form.label,"rules":form.rules || [],"label-width":form.labelWidth ? (form.labelWidth + 'px') : ''}},[(form.itemType === 'input' || form.itemType === undefined)?_c('el-input',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"size":form.size ? form.size : _vm.size,"readonly":form.readonly,"disabled":form.disabled,"placeholder":form.placeholder},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}}):(form.itemType === 'select')?_c('el-select',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"size":form.size ? form.size : _vm.size,"disabled":form.disabled,"placeholder":form.placeholder},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}},[_vm._l((form.options),function(option,optionIndex){return _c('el-option',{key:optionIndex + '_local',attrs:{"value":(typeof option === 'object') ? option[form.valueKey || 'value'] : option,"label":(typeof option === 'object') ? option[form.labelKey || 'label'] : option}})}),_vm._l((_vm.selectOptions[_vm.selectOptionPrefix + index]),function(op,opIndex){return _c('el-option',{key:opIndex + '_remote',attrs:{"value":(typeof op === 'object') ? op[form.valueKey || 'value'] : op,"label":(typeof op === 'object') ? op[form.labelKey || 'label'] : op}})})],2):(form.itemType === 'date')?_c('el-date-picker',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"type":"date","placeholder":form.placeholder,"size":form.size ? form.size : _vm.size,"disabled":form.disabled,"readonly":form.readonly,"editable":form.editable,"picker-options":form.pickerOptions || {}},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}}):(form.itemType === 'daterange')?_c('el-date-picker',{style:(_vm.itemStyle + (form.itemWidth ? ("width: " + (form.itemWidth) + "px;") : '')),attrs:{"size":form.size ? form.size : _vm.size,"type":"daterange","disabled":form.disabled,"readonly":form.readonly,"editable":form.editable,"placeholder":form.placeholder,"picker-options":form.pickerOptions || {}},on:{"change":function (date) { return _vm.changeDate(date, form.prop[0], form.prop[1]); }},model:{value:(_vm.params[form.modelValue]),callback:function ($$v) {_vm.$set(_vm.params, form.modelValue, $$v)},expression:"params[form.modelValue]"}}):_vm._e()],1)}),_c('el-form-item',{attrs:{"label":""}},[_c('el-button',{attrs:{"type":"primary","size":_vm.size,"loading":_vm.submitLoading},on:{"click":_vm.searchHandler}},[_vm._v("\n      "+_vm._s(_vm.submitBtnText)+"\n    ")]),(_vm.showResetBtn)?_c('el-button',{attrs:{"type":"primary","plain":true,"size":_vm.size,"loading":_vm.submitLoading},on:{"click":_vm.resetForm}},[_vm._v("\n      "+_vm._s(_vm.resetBtnText)+"\n    ")]):_vm._e()],1)],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
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

/***/ })
/******/ ]);