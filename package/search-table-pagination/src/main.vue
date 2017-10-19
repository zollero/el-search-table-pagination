

<!--
  这是一个包含 搜索条件，table数据展示 和 分页空间 的组件

  属性API:
  fetch: 函数(如：api.getList)，获取数据的接口函数，必填
  params: form表达的参数对象，非必填
  dataHandler: 对列表数据进行处理的array.map回调函数，接收的参数是列表的每个元素，是需要在函数内将处理的结构返回出来
  columns: {  table列属性，必填
    prop: 映射数据的属性名
    label: 列名
    width: 宽度
    minWidth: 最小宽度
    filter: 使用的过滤器
    render: 函数，如果需要处理数据不需要复杂标签，在该函数中返回需要展示的数据。如：render: row => row.a + 2
    slotName: 使用一个template来渲染代码片段，代码段的slot值（该slot需要在本组件内部设置）
  }

  showPagination: 是否显示分页控件，默认true

  slot属性：
  search-form: 搜索框区域（该slot必须使用template包裹，且可通过属性调用search方法来启动搜索）
  pre-column: 最左边的列（比如：复选框列，索引页）
  operate-column: table操作列

 -->

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
        <template scope="scope">
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
