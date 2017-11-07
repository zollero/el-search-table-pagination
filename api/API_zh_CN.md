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
| data-handler | 数组数据的 map 处理函数 | function | - | - |
| columns | table 列配置对象。<br/>包含的属性有： <br/>prop: 展示字段的字段值。string。<br/>label: 列名。string。<br/>width: 列宽，默认 140。number。<br/>minWidth: 最小列宽。number。<br/>filter: 过滤器名（只有配置在全局的filter才有效）。string。<br/>render: 处理数据的函数，接收行数据作为参数。function。<br/>slotName：使用 slot 标记的代码块的 slot 属性值。string。| array | - | - |
| show-pagination | 是否显示分页组件，如设为false，查询时不传分页参数 | boolean | true, false | true |
| page-sizes | 每页显示个数的控件选项 | array | - | [20, 50, 100] |
| pagination-layout | 分页控件的结构，每个类型用逗号分隔 | string | sizes, prev, pager, next, jumper, ->, total, slot | total, prev, pager, next, jumper, sizes |
| page-index-key | 参数：页码数 的 key 值 | string | - | pageIndex |
| page-size-key | 参数：每页展示个数 的 key 值 | string | - | pageSize |

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
