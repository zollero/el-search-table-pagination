# API 文档

## 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| fetch | 封装好的获取数据的函数，返回一个promise，会获得搜索条件对象作为参数。若提供该属性，则不会再调用 url属性获取数据 | function | - | - |
| type | 数据来源类型，包含远程和本地两种| string | remote, local | remote |
| data | 数据集合，仅在 type='local' 时有效 | array | - | - |
| url | 后端数据接口 | string | - | - |
| method| 接口请求方式 | string | get, post, delete, put | get |
| auto-load | 是否默认加载数据 | boolean | true, false | true |
| headers | 请求头信息 | object | - | - |
| list-field | 接口返回值对应数据的字段值 | string | - | data.list |
| total-field | 接口返回值对应数据总数的字段值 | string | - | data.total |
| params | 搜索参数 | object | - | - |
| form-options | form表单设置(见下方[**Form Option 属性**](#form-option-属性)) | object | - | - |
| data-handler | 数组数据的 map 处理函数 | function | - | - |
| columns | table column配置对象的数组。具体配置见下面[**Table column 属性**](#table-column-属性) | array | - | - |
| show-pagination | 是否显示分页组件，如设为false，查询时不传分页参数 | boolean | true, false | true |
| page-sizes | 每页显示个数的控件选项 | array | - | [20, 50, 100] |
| pagination-layout | 分页控件的结构，每个类型用逗号分隔 | string | sizes, prev, pager, next, jumper, ->, total, slot | total, prev, pager, next, jumper, sizes |
| page-index-key | 参数：页码数 的 key 值 | string | - | pageIndex |
| page-size-key | 参数：每页展示个数 的 key 值 | string | - | pageSize |

注：更多属性，请参考 Element UI [Table 组件的文档](https://github.com/ElemeFE/element/blob/dev/examples/docs/zh-CN/table.md#table-attributes)。

支持的`Element UI Table`属性有：stripe / border / height / max-height / fit / show-header / highlight-current-row / current-row-key / row-class-name / row-style / row-key / empty-text / default-expand-all / expand-row-keys / default-sort / tooltip-effect / show-summary / sum-text / summary-method。

### Table column 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| prop | 展示字段的字段值 | string | - | - |
| label | 列名 | string | - | - |
| width| 列宽 | number | - | 140 |
| minWidth | 最小列宽 | number | - | - |
| filter | 过滤器名（只有配置在全局的filter才有效） | string | - | - |
| render | 处理数据的函数，接收行数据作为参数 | function | - | - |
| slotName | 使用 slot 标记的代码块的 slot 属性值 | string | - | - |

注：更多属性，请参考 Element UI [Table column 的文档](https://github.com/ElemeFE/element/blob/dev/examples/docs/zh-CN/table.md#table-column-attributes)。

支持的`Element UI Table column`属性有：column-key / fixed / render-header / sortable / sort-method / resizable / formatter / show-overflow-tooltip / align / header-align / class-name / label-class-name / selectable / reserve-selection / filters / filter-placement / filter-multiple / filter-method / filtered-value 。

### Form Option 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| forms | form表单配置对象数组。详情见[**Form Item 属性**](#form-item-属性) | array[object] | - | - |
| size | 全局的表单尺寸 | string | large/small/mini | - |
| showResetBtn | 是否显示'重置'按钮 | boolean | - | false
| inline | 行内表单模式 | boolean | - | false |
| fuzzy | 搜索条件是否支持模糊搜索，全局设置，仅支持 local 数据展示 | boolean | - | false |
| labelWidth | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | number | - | - |
| itemWidth | 表单域宽度 | number | - | - |
submitHandler | 查询按钮的click处理函数，接收form表单对象数据作为第一个参数 | function | - | - |
| submitLoading | 查询按钮的加载中状态 | boolean | - | - |
| submitBtnText | 查询按钮的文本 | string | - | 查询 |
| resetBtnText | 重置按钮的文本 | string | - | 重置 |

### Form Item 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| label | form表单标签 | string | - | - |
| prop | form表单属性key值 | string | - | - |
| fuzzy | 该 form item 是否支持模糊搜索，仅支持 local 数据展示 | boolean | - | false |
| itemType | 表单类型，目前支持input/select/date/daterange四种表单 | string | input/select/date/daterange | - |
| size | 表单尺寸 | string | large/small/mini | - |
| labelWidth | 表单域标签的宽度 | number | - | - |
| itemWidth | 表单域宽度 | number | - | - |
| placeholder | 表单占位文本 | string | - | - |
| editable | 是否可输入，对date/daterange有效 | boolean | true/false | true |
| disabled | 禁用 | boolean | true/false | false |
| readonly | 只读，对input/date/daterange有效 | boolean | true/false | false |
| options | 填充select下拉option的数组数据 | [string]/[object] | - | - |
| selectFetch | 获取远程数据填充select下拉option数据的函数，函数需返回一个promise，如果设置了selectUrl，则该属性无效 | function | - | - |
| selectResultField | select远程数据接口返回值的数据对应key值，对应的数组中的元素可以是string或object | string | | - | result |
| selectResultHandler | select远程数据接口array数据的map处理函数 | function | - | - |
| selectUrl | select远程数据接口地址，设置该属性后，selectFetch属性则无效 | string - | - |
| selectMethod | select远程接口调用方法，该属性配合selectUrl使用 | string | get/post | - |
| selectParams | 调用select远程接口的参数 | object | - | - |
| valueKey | 当option是对象时有效。select option的value的key值 | string | - | value |
| labelKey | 当option是对象时有效。select option的label的key值 | string | - | label |
| rules | 表单验证规则 | object | - | - |
| format | 提供一个函数对form表单的结果进行处理，这个函数接收两个参数：form 表单的值 和 表单的 key（即 prop），函数需要将处理后的结果return出来 | function | - | - |
| pickerOptions | 当前时间日期选择器特有的选项，对 date/daterange 有效 | object | - | - |

## 函数

| 方法名 | 说明 | 参数 |
| ----- |-----|-----|
| searchHandler | 重置分页页码参数为1，重新搜索数据 | - |

## Slots

| slot名称 | 说明 |
| ---- |-----|
| form | table 上部展示一个搜索区域，该`slot`下通过`scope`可以访问到两个属性：loading（查询中的loading状态值），search（搜索方法）|
| prepend | table中，在最左边添加的列 |
| append | table中，在最右边添加的列，一般可放置`操作列` |

## Events

| 事件名 | 说明 | 参数 |
| ---- |-----| ----- |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, event, column |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件| row, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, event |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| expand (v1.x) | 当用户对某一行展开或者关闭的上会触发该事件 | row, expanded |
| expand-change (v2.x) | 当用户对某一行展开或者关闭的上会触发该事件 | row, expanded |
