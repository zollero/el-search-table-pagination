
<template>
  <div v-if="showPagination && total > pageSize"
    style="margin-top: 10px;text-align: right;">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="paginationLayout"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  const _this = this;

  export default {
    props: {
      showPagination: {
        type: Boolean,
        default: false
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
      pageIndex: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: () => {
          const { pageSizes } = _this;
          if (pagesizes.length > 0) {
            return _this.pageSizes[0]
          }
          return 20
        }
      },
      total: {
        type:
      }
    },
    methods: {
      handleSizeChange(value) {
        this.$emit('size-change', value)
      },
      handleCurrentChange(value) {
        this.$emit('page-change', value)
      }
    }
  }
</script>
