
<template>
  <div>

    <slot name="search-form" :loading="loading" :search="searchHandler" />

    <el-table v-loading.lock="loading"
      :data="tableData"
      border stripe
      style="width: 100%;margin-top:20px;">

      <slot name="prepend" />

      <el-table-column v-for="(column, columnIndex) in columns" :key="columnIndex"
        :prop="column.prop" :label="column.label" :width="column.minWidth ? '-' : (column.width || 140)"
        :minWidth="column.minWidth || column.width || 140" >
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

  const _this = this

  export default {
    name: 'ElSearchTablePagination',
    props: {
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
      return {
        Vue,
        pagination: {
          pageIndex: 1,
          pageSize: (() => {
            const { pageSizes } = _this.default.props;
            if (pageSizes.length > 0) {
              return pageSizes[0]
            }
            return 20
          })()
        },
        total: 0,
        loading: false,
        tableData: []
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
        this.fetchHandler()
      },
      handleCurrentChange(pageIndex) {
        this.pagination.pageIndex = pageIndex
        this.fetchHandler()
      },
      searchHandler() {
        this.pagination.pageIndex = 1
        this.fetchHandler()
      },
      fetchHandler() {
        this.loading = true
        let { method, url, $axios, headers, listField, pageIndexKey, pageSizeKey,
              totalField, params, showPagination, pagination } = this

        params = JSON.parse(JSON.stringify(params))

        if (showPagination) {
          params = Object.assign(params, {
            [pageIndexKey]: pagination.pageIndex,
            [pageSizeKey]: pagination.pageSize
          })
        }

        let requestObject = null

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
      }
    },
    created() {
      this.fetchHandler()
    }
  }
</script>
