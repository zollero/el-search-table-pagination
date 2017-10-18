
<el-table v-loading.lock="loading"
  :data="tableData"
  border stripe
  style="width: 100%;margin-top:20px;">

  <!-- <slot name="prepend" /> -->
  <slot name="pre-column" />

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

  <!-- <slot name="append" /> -->
  <slot name="operate-column" />

</el-table>

<script>
  export default {
    props: {
      tableData: {
        type: Array,
        required: true
      },
      columns: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>
