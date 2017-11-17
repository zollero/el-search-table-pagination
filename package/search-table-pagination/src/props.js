
import { formProps } from '../../search/src/props'

let props = {
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
}

Object.keys(formProps).forEach(v => {
  props.formOptions[v] = formProps[v]
})

export default props
