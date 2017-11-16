
<template>
  <el-form :model="params" :inline="inline" ref="form"
    :label-width="labelWidth ? (labelWidth + 'px') : ''">
    <el-form-item v-for="(form, index) in forms" :key="index"
      :prop="form.itemType != 'daterange' ? form.prop : (datePrefix + index)"
      :label="form.label" :rules="form.rules || []">
      <el-input v-if="form.itemType === 'input' || form.itemType === undefined"
        v-model="params[form.modelValue]"
        :size="form.size ? form.size : size"
        :readonly="form.readonly"
        :disabled="form.disabled"
        :placeholder="form.placeholder"
        :style="itemStyle" />
      <el-select v-else-if="form.itemType === 'select'"
        v-model="params[form.modelValue]"
        :size="form.size ? form.size : size"
        :disabled="form.disabled"
        :placeholder="form.placeholder"
        :style="itemStyle">
        <el-option v-for="(option, optionIndex) in form.options" :key="optionIndex"
          :value="(typeof option === 'object') ? option[form.valueKey || 'value'] : option"
          :label="(typeof option === 'object') ? option[form.labelKey || 'label'] : option" />
        <el-option v-for="(op, opIndex) in selectOptions[selectOptionPrefix + index]" :key="opIndex"
          :value="(typeof op === 'object') ? op[form.valueKey || 'value'] : op"
          :label="(typeof op === 'object') ? op[form.labelKey || 'label'] : op" />
      </el-select>
      <el-date-picker v-else-if="form.itemType === 'date'"
        v-model="params[form.modelValue]"
        type="date" :placeholder="form.placeholder"
        :size="form.size ? form.size : size"
        :disabled="form.disabled"
        :readonly="form.readonly"
        :editable="form.editable"
        :style="itemStyle"
        :picker-options="form.pickerOptions || {}" />
      <el-date-picker v-else-if="form.itemType === 'daterange'"
        v-model="params[form.modelValue]"
        :size="form.size ? form.size : size"
        type="daterange" @change="date => changeDate(date, form.prop[0], form.prop[1])"
        :disabled="form.disabled"
        :readonly="form.readonly"
        :editable="form.editable"
        :placeholder="form.placeholder"
        :style="itemStyle"
        :picker-options="form.pickerOptions || {}" />
    </el-form-item>
    <el-form-item label="">
      <el-button
        type="primary"
        :size="size"
        @click="searchHandler"
        :loading="submitLoading">
        {{ submitBtnText }}
      </el-button>
      <el-button type="primary" :plain="true"
        :size="size" v-if="showResetBtn"
        @click="resetForm"
        :loading="submitLoading">
        {{ resetBtnText }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { formProps } from './props'

  export default {
    name: 'ElSearchForm',
    props: formProps,
    data() {
      const { forms } = this.$props
      const datePrefix = 'daterange-prefix'
      const selectOptionPrefix = 'select-option-prefix'
      let dataObj = {
        selectOptions: {}
      }

      let params = {}
      let format = {}

      forms.forEach((v, i) => {
        const propType = typeof v.prop
        if (propType === 'string') {
          v.modelValue = v.prop
          params[v.prop] = ''
          if (v.format) {
            format[v.prop] = v.format
          }
        } else if (propType === 'object' && Object.prototype.toString.call(v.prop) === '[object Array]') {
          v.prop.forEach(vv => {
            params[vv] = ''
            if (v.format) {
              format[vv] = v.format
            }
          })
        }
        if (v.itemType === 'daterange') {
          params[datePrefix + i] = ''
          v.modelValue = datePrefix + i
        }
        if (v.itemType === 'select' && (v.selectFetch || v.selectUrl)) {
          const dataKey = selectOptionPrefix + i
          dataObj.selectOptions[dataKey] = []
          const { $axios } = this
          if (!v.selectMethod) {
            v.selectMethod = 'get'
          }
          this.getRemoteData({
            fetch: v.selectFetch ? v.selectFetch : () => {
              return $axios[v.selectMethod](v.selectUrl, v.selectMethod.toLowerCase() === 'get' ?
                     { params: v.selectParams } : v.selectParams)
            },
            dataKey,
            resultField: v.selectResultField || 'result',
            resultHandler: v.selectResultHandler
          })
        }
      })

      return {
        params,
        datePrefix,
        selectOptionPrefix,
        ...dataObj,
        format
      }
    },
    computed: {
      itemStyle() {
        const { itemWidth } = this
        if (itemWidth) {
          return `width: ${itemWidth}px;`
        }
        return ''
      }
    },
    methods: {
      isArray(value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]'
      },
      searchHandler() {
        this.getParams((error, params) => {
          if(!error) {
            const { submitHandler } = this
            if (submitHandler) {
              submitHandler(params)
            } else {
              throw new Error('Need to set attribute: submitHandler !')
            }
          }
        })
      },
      getParams(callback) {
        this.$refs['form'].validate(valid => {
          if (valid) {
            const { params, datePrefix, format } = this
            let formattedForm = {}
            Object.keys(params).forEach(v => {
              if (v.indexOf(datePrefix) === -1) {
                formattedForm[v] = format[v] ? format[v](params[v], v) : params[v]
              }
            })
            if (callback) callback(null, formattedForm)
          } else {
            if (callback) callback(new Error())
          }
        })
      },
      resetForm() {
        this.$refs['form'].resetFields()
      },
      changeDate(date, startDate, endDate) {
        const dates = date.split(' - ')
        this.params[startDate] = dates[0]
        this.params[endDate] = dates[1]
      },
      getRemoteData({ fetch, dataKey, resultField, resultHandler }) {
        fetch().then(response => {
          let result = response
          if (typeof response === 'object' && !this.isArray(response)) {
            if (resultField.indexOf('.') !== -1) {
              resultField.split('.').forEach(vv => {
                result = result[vv]
              })
            } else {
              result = response[resultField]
            }
          }

          if (!result || !(result instanceof Array)) {
            throw new Error(`The result of key:${resultField} is not Array. 接口返回的字段:${resultField} 不是一个数组`)
          }

          if (this.resultHandler) {
            this.selectOptions[dataKey] = result.map(this.resultHandler)
          } else {
            this.selectOptions[dataKey] = result
          }
        })
      }
    }
  }
</script>
