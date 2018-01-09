
<template>
  <div>

    <search-form
      v-if="formOptions"
      ref="searchForm"
      :forms="formOptions.forms"
      :size="formOptions.size"
      :fuzzy="formOptions.fuzzy"
      :inline="formOptions.inline"
      :label-width="formOptions.labelWidth"
      :item-width="formOptions.itemWidth"
      :submit-handler="searchHandler"
      :submit-loading="loading"
      :showResetBtn="formOptions.showResetBtn"
      :submitBtnText="formOptions.submitBtnText"
      :resetBtnText="formOptions.resetBtnText" />

    <slot name="form" :loading="loading" :search="searchHandler" />

    <slot />

    <el-table v-loading.lock="loading"
      ref="table"
      :data="tableData"
      :border="border"
      :stripe="stripe"
      :height="height"
      :max-height="maxHeight"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :row-style="rowStyle"
      :row-ket="rowKey"
      :empty-text="emptyText"
      :default-expand-all="defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :default-sort="defaultSort"
      :tooltip-effect="tooltipEffect"
      :show-summary="showSummary"
      :sum-text="sumText"
      :summary-method="summaryMethod"
      style="width: 100%;margin-top:20px;"
      @select="(selection, row) => emitEventHandler('select', selection, row)"
      @select-all="selection => emitEventHandler('select-all', selection)"
      @selection-change="selection => emitEventHandler('selection-change', selection)"
      @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
      @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
      @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
      @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
      @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
      @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
      @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
      @header-click="(column, event) => emitEventHandler('header-click', column, event)"
      @sort-change="args => emitEventHandler('sort-change', args)"
      @filter-change="filters => emitEventHandler('filter-change', filters)"
      @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
      @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
      @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)" >

      <slot name="prepend" />

      <el-table-column
        v-for="(column, columnIndex) in columns" :key="columnIndex"
        :column-key="column.columnKey"
        :prop="column.prop"
        :label="column.label"
        :width="column.minWidth ? '-' : (column.width || 140)"
        :minWidth="column.minWidth || column.width || 140"
        :fixed="column.fixed"
        :render-header="column.renderHeader"
        :sortable="column.sortable"
        :sort-method="column.method"
        :resizable="column.resizable"
        :formatter="column.formatter"
        :show-overflow-tooltip="column.showOverflowTooltip"
        :align="column.align"
        :header-align="column.headerAlign || column.align"
        :class-name="column.className"
        :label-class-name="column.labelClassName"
        :selectable="column.selectable"
        :reserve-selection="column.reserveSelection"
        :filters="column.filters"
        :filter-placement="column.filterPlacement"
        :filter-multiple="column.filterMultiple"
        :filter-method="column.filterMethod"
        :filtered-value="column.filteredValue">
        <template slot-scope="scope" :scope="newSlotScope ? 'scope' : false ">
          <span v-if="column.filter">
            {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
          </span>
          <span v-else-if="column.slotName">
            <slot :name="column.slotName" :row="scope.row" :$index="scope.$index" />
          </span>
          <span v-else>
            {{ column.render ? column.render(scope.row) : scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>

      <slot name="append" />

    </el-table>

    <div v-if="showPagination"
      style="margin-top: 10px;text-align: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageIndex"
        :page-sizes="pageSizes"
        :page-size="pagination.pageSize"
        :layout="paginationLayout"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import props from './props'
  import searchForm from '../../search/src/main.vue'

  export default {
    name: 'ElSearchTablePagination',
    components: {
      searchForm
    },
    props,
    data() {
      const _this = this
      return {
        Vue,
        pagination: {
          pageIndex: 1,
          pageSize: (() => {
            const { pageSizes } = _this
            if (pageSizes.length > 0) {
              return pageSizes[0]
            }
            return 20
          })()
        },
        total: 0,
        loading: false,
        tableData: [],
        cacheLocalData: []
      }
    },
    computed: {
      newSlotScope() {
        return Number(Vue.version.replace(/\./g, '')) >= 250
      }
    },
    methods: {
      handleSizeChange(size) {
        this.pagination.pageSize = size
        this.dataChangeHandler()
      },
      handleCurrentChange(pageIndex) {
        this.pagination.pageIndex = pageIndex
        this.dataChangeHandler()
      },
      searchHandler() {
        this.pagination.pageIndex = 1
        this.dataChangeHandler(arguments[0])
      },
      dataChangeHandler() {
        const { type } = this
        if (type === 'local') {
          this.dataFilterHandler(arguments[0])
        } else if (type === 'remote') {
          this.fetchHandler(arguments[0])
        }
      },
      dataFilter(data) {
        const { pageIndex, pageSize } = this.pagination
        return data.filter((v, i) => {
          return i >= (pageIndex - 1) * pageSize && i < pageIndex * pageSize
        })
      },
      dataFilterHandler(formParams) {
        const { cacheLocalData, params, pagination } = this
        const { pageIndex, pageSize } = pagination
        const mergeParams = Object.assign(params, formParams)
        const validParamKeys = Object.keys(mergeParams).filter(v => {
          return mergeParams[v] !== undefined && mergeParams[v] !== ''
        })
        const searchForm = this.$refs['searchForm']
        let paramFuzzy
        if (searchForm) {
          paramFuzzy = searchForm.getParamFuzzy()
        }

        if (validParamKeys.length > 0) {
          const validData = cacheLocalData.filter(v => {
            let valids = []
            validParamKeys.forEach(vv => {
              if (typeof v[vv] === 'number') {
                valids.push(
                  paramFuzzy && paramFuzzy[vv] ? (String(v[vv]).indexOf(String(mergeParams[vv])) !== -1)
                    : (String(v[vv]) === String(mergeParams[vv]))
                )
              } else {
                valids.push(
                  paramFuzzy && paramFuzzy[vv] ? (v[vv].indexOf(mergeParams[vv]) !== -1) : (v[vv] === mergeParams[vv])
                )
              }
            })
            return valids.every(vvv => {
              return vvv
            })
          })

          this.tableData = this.dataFilter(validData)
          this.total = validData.length
        } else {
          this.total = cacheLocalData.length
          this.tableData = this.dataFilter(cacheLocalData)
        }
      },
      fetchHandler(formParams = {}) {
        this.loading = true
        let { fetch, method, url, $axios, headers,
              listField, pageIndexKey, pageSizeKey,
              totalField, params, showPagination,
              pagination } = this

        params = JSON.parse(JSON.stringify(Object.assign(params, formParams)))

        if (showPagination) {
          params = Object.assign(params, {
            [pageIndexKey]: pagination.pageIndex,
            [pageSizeKey]: pagination.pageSize
          })
        }

        let requestObject = null

        if (fetch) {
          requestObject = fetch(params)
        } else {
          $axios.interceptors.request.use(
            config => {
              Object.keys(headers).forEach(v => {
                config.headers[v] = headers[v]
              })
              return config;
            },
            error => {
              return Promise.reject(error);
            }
          )

          method = method.toLowerCase();

          if (method === 'get') {
            requestObject = $axios[method](url, { params })
          } else {
            requestObject = $axios[method](url, params)
          }
        }

        requestObject.then(response => {
          let result = response

          if (response && !(response instanceof Array)) {
            if (listField && listField.indexOf('.') !== -1) {
              listField.split('.').forEach(vv => {
                result = result[vv]
              })
            } else {
              result = response[listField]
            }
          }

          if (!result || !(result instanceof Array)) {
            throw new Error(`The result of key:${listField} is not Array.`)
            this.loading = false
            return false
          }

          if (this.dataHandler) {
            this.tableData = result.map(this.dataHandler)
          } else {
            this.tableData = result
          }

          let totalValue = response
          if (Object.prototype.toString.call(response) === '[object Array]') {
            totalValue = response.length
          } else if (typeof response === 'object') {
            if (totalField && totalField.indexOf('.') !== -1) {
              totalField.split('.').forEach(vv => {
                totalValue = totalValue[vv]
              })
            } else {
              totalValue = response[totalField]
            }
          } else {
            totalValue = 0
          }
          this.total = totalValue

          this.loading = false
        }).catch(error => {
          // console.error('Get remote data failed. ', error)
          this.loading = false
        })
      },
      emitEventHandler(event) {
        this.$emit(event, ...Array.from(arguments).slice(1))
      },
      loadLocalData(data) {
        if (!data) {
          throw new Error(`When the type is 'local', you must set attribute 'data' and 'data' must be a array.`)
          this.showPagination = false
          return false
        }
        const cacheData = JSON.parse(JSON.stringify(data))
        this.tableData = this.dataFilter(cacheData)
        this.cacheLocalData = cacheData
        this.total = cacheData.length
      }
    },
    mounted() {
      // event: expand changed to `expand-change` in Element v2.x
      this.$refs['table'].$on('expand', (row, expanded) => this.emitEventHandler('expand', row, expanded))
      const { type, autoLoad, data, formOptions, params } = this
      if (type === 'remote' && autoLoad) {
        if (formOptions) {
          this.$refs['searchForm'].getParams((error, formParams) => {
            if (!error) {
              this.fetchHandler(Object.assign(formParams, params))
            }
          })
        } else {
          this.fetchHandler(params)
        }
      } else if (type === 'local') {
        this.loadLocalData(data)
      }
    },
    watch: {
      data: function(value) {
        this.loadLocalData(value)
      }
    }
  }
</script>
