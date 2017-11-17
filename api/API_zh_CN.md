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
| form-options | form表单设置(见下方**Form Option 属性**) | object | - | - |
| data-handler | 数组数据的 map 处理函数 | function | - | - |
| columns | table 列配置对象数组。<br/>包含的属性有： <br/>**prop**: 展示字段的字段值。string。<br/>**label**: 列名。string。<br/>**width**: 列宽，默认 140。number。<br/>**minWidth**: 最小列宽。number。<br/>**filter**: 过滤器名（只有配置在全局的filter才有效）。string。<br/>**render**: 处理数据的函数，接收行数据作为参数。function。<br/>**slotName**：使用 slot 标记的代码块的 slot 属性值。string。<br/>**className**：列的 className | array | - | - |
| show-pagination | 是否显示分页组件，如设为false，查询时不传分页参数 | boolean | true, false | true |
| page-sizes | 每页显示个数的控件选项 | array | - | [20, 50, 100] |
| pagination-layout | 分页控件的结构，每个类型用逗号分隔 | string | sizes, prev, pager, next, jumper, ->, total, slot | total, prev, pager, next, jumper, sizes |
| page-index-key | 参数：页码数 的 key 值 | string | - | pageIndex |
| page-size-key | 参数：每页展示个数 的 key 值 | string | - | pageSize |

## Form Option 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- |------|:----:|-----|:-----:|
| forms | form表单配置对象数组。<br/>**label**: form表单标签。<br/>**prop**: form表单属性key值。string。<br/>**itemType**: 表单类型，目前支持input/select/date/daterange四种表单。string。<br/>**size**: 表单尺寸，可选值：large/small/mini。string。<br/>**placeholder**: 表单占位文本。string。<br/>**editable**: 是否可输入，对date/daterange有效。boolean。<br/>**disabled**: 禁用。boolean。<br/>**readonly**: 只读，对input/date/daterange有效。boolean。<br/>**options**: 填充select下拉option的数组数据，数组元素可以是string或object。array。<br/>**selectFetch**: 获取远程数据填充select下拉option数据的函数，函数需返回一个promise，如果设置了selectUrl，则该属性无效。function。<br/>**selectResultField**: select远程数据接口返回值的数据对应key值，默认为'result'，对应的数组中的元素可以是string或object。string。<br/>**selectResultHandler**: select远程数据接口array数据的map处理函数。function。<br/>**selectUrl**: select远程数据接口地址，设置该属性后，selectFetch属性则无效。string。<br/>**selectMethod**: select远程接口调用方法，该属性配合selectUrl使用。string。<br/>**selectParams**: 调用select远程接口的参数。object。<br/>**valueKey**: 当option是对象时有效。select option的value的key值，默认为 'value'。string。<br/>**labelKey**: 当option是对象时有效。select option的label的key值，默认为 'label'。string。<br/>**rules**: 表单验证规则。object。<br/>**format**: 提供一个函数对form表单的结果进行处理，这个函数接收两个参数：form 表单的值 和 表单的 key（即 prop），函数需要将处理后的结果return出来。function。<br/>**pickerOptions**: 当前时间日期选择器特有的选项，对 date/daterange 有效。object。 | array[object] | - | - |
| size | 全局的表单尺寸 | string | large/small/mini | - |
| showResetBtn | 是否显示'重置'按钮 | boolean | - | false
| inline | 行内表单模式 | boolean | - | false |
| labelWidth | 表单域标签的宽度，作为 Form 直接子元素的 form-item 会继承该值 | number | - | - |
| itemWidth | 表单域宽度 | number | - | - |
submitHandler | 查询按钮的click处理函数，接收form表单对象数据作为第一个参数 | function | - | - |
| submitLoading | 查询按钮的加载中状态 | boolean | - | - |
| submitBtnText | 查询按钮的文本 | string | - | 查询 |
| resetBtnText | 重置按钮的文本 | string | - | 重置 |

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
| row-click | 当某一行被点击时会触发该事件 | row, event, column |
