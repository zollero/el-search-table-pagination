
<template>
  <div>

    <slot name="form" :loading="loading" :search="searchHandler" />

    <el-table v-loading.lock="loading"
      :data="tableData" border stripe
      :row-class-name="rowClassName"
      style="width: 100%;margin-top:20px;"
      @select="selectHandler" @select-all="selectAllHandler"
      @selection-change="selectionChangeHandler">

      <slot name="prepend" />

      <el-table-column v-for="(column, columnIndex) in columns" :key="columnIndex"
        :prop="column.prop" :label="column.label" :width="column.minWidth ? '-' : (column.width || 140)"
        :minWidth="column.minWidth || column.width || 140"
        :align="column.align" :class-name="column.className">
        <template slot-scope="scope" :scope="newSlotScope ? 'scope' : false ">
          <span v-if="column.filter">
            {{ Vue.filter(column['filter'])(scope.row[column.prop]) }}
          </span>
          <span v-else-if="column.slotName">
            <slot :name="column.slotName" :row="scope.row" />
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

  export default {
    name: 'ElSearchTablePagination',
    props: {
      fetch: {
        type: Function
      },
      url: {
        type: String
      },
      method: {
        type: String,
        default: 'get',
        validator: value => {
          const methodTypes = ['get', 'post', 'put', 'delete'];
          return methodTypes.indexOf(value.toLowerCase()) !== -1;
        }
      },
      headers: {
        type: Object,
        default: () => {
          return {}
        }
      },
      rowClassName: {
        type: String,
        default: ''
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
        default: () => {
          return {}
        }
      },
      autoLoad: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'remote',
        validator(value) {
          const types = ['remote', 'local']
          const validType = types.indexOf(value) !== -1
          if (!validType) {
            throw new Error(`Invalid type of '${value}', please set one type of 'remote' or 'local'.`)
          }
          return validType
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
        prop: {
          type: String,
          required: true
        },
        label: {
          type: String,
          required: true
        },
        width: {
          type: Number
        },
        minWidth: {
          type: Number
        },
        align: {
          type: String,
          default: 'left',
          validator(value) {
            const alignTypes = ['left', 'center', 'right']
            const isValid = alignTypes.indexOf(value) === -1
            if (isValid) {
              throw new Error(`The value for 'align' is invalid, you can choose on in ['left', 'center', 'right']`)
            }
            return isValid
          }
        },
        filter: {
          type: String
        },
        render: {
          type: Function
        },
        slotName: {
          type: String
        },
        className: {
          type: String,
          default: ''
        }
      },
      showPagination: {
        type: Boolean,
        default: true
      },
      pageSizes: {
        type: Array,
        default: () => {
          return [20, 50, 100]
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
    },
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
        return Number(Vue.version.replace('.', '')) > 250
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
        this.dataChangeHandler()
      },
      dataChangeHandler() {
        const { type } = this
        if (type === 'local') {
          this.dataFilterHandler()
        } else if (type === 'remote') {
          this.fetchHandler()
        }
      },
      dataFilter(data) {
        const { pageIndex, pageSize } = this.pagination
        return data.filter((v, i) => {
          return i >= (pageIndex - 1) * pageSize && i < pageIndex * pageSize
        })
      },
      dataFilterHandler() {
        const { cacheLocalData, params, pagination } = this
        const { pageIndex, pageSize } = pagination
        const validParamKeys = Object.keys(params).filter(v => {
          return params[v] !== undefined && params[v].trim() !== ''
        })
        if (validParamKeys.length > 0) {
          const validData = cacheLocalData.filter(v => {
            let valids = []
            validParamKeys.forEach(vv => {
              if (typeof v[vv] === 'number') {
                valids.push(String(v[vv]) === params[vv])
              } else {
                valids.push(v[vv] === params[vv])
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
      fetchHandler() {
        this.loading = true
        let { fetch, method, url, $axios, headers,
              listField, pageIndexKey, pageSizeKey,
              totalField, params, showPagination,
              pagination } = this

        params = JSON.parse(JSON.stringify(params))

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
          if (listField.indexOf('.') !== -1) {
            listField.split('.').forEach(vv => {
              result = result[vv]
            })
          } else {
            result = response[listField]
          }

          if (!result || !(result instanceof Array)) {
            throw new Error(`The result of key:${listField} is not Array. 接口返回的字段:${listField} 不是一个数组`)
            this.loading = false
            return false
          }

          if (this.dataHandler) {
            this.tableData = result.map(this.dataHandler)
          } else {
            this.tableData = result
          }

          let totalValue = response
          if (totalField.indexOf('.') !== -1) {
            totalField.split('.').forEach(vv => {
              totalValue = totalValue[vv]
            })
          } else {
            totalValue = response[totalField]
          }

          this.total = totalValue

          this.loading = false
        }).catch(error => {
          console.error('Get remote data failed. ', error)
          this.loading = false
        })
      },
      selectHandler() {
        this.$emit('select', arguments)
      },
      selectAllHandler() {
        this.$emit('select-all', arguments)
      },
      selectionChangeHandler() {
        this.$emit('selection-change', arguments)
      }
    },
    created() {
      const { type, autoLoad, data } = this
      if (type === 'remote' && autoLoad) {
        this.fetchHandler()
      } else if (type === 'local') {
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
    }
  }
</script>
