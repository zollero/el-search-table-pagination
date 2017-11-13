# API

### Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- |------|:----:|-----|:-----:|
| fetch | A function to get remote data, it will get a object of search params as arguments, and return a promise. If it `fetch` is provided, will not get remote data from `url`. | function | - | - |
| type | Data source type. It has two types of 'remote' and 'local'. | string | remote, local | remote |
| data | Data list, only avaliable when type is 'local' | array | - | - |
| url | Request URL | string | - | - |
| method| Request method | string | get, post, delete, put | get |
| auto-load | Whether request remote data and show when component be created | boolean | true, false | true |
| headers | Request headers | object | - | - |
| list-field | The key to get list data from response | string | - | data.list |
| total-field | The key to get total count of response | string | - | data.total |
| params | Search params when send request to backend | object | - | - |
| data-handler | Function as parameter of Array.map to hander list data | function | - | - |
| columns | Required. Table column settings. <br/>Has properties below：<br/>prop: column key value(required, String);<br/>label: column show value(required, String);<br/>width: column width, and the default is 140(Number);<br/>minWidth: min column width(Number);<br/>filter: filter name, only avaliable for registed on global Vue(String);<br/>render: function to handle data, and show the return value. The function will have the element of list data as parameter(Function);<br/>slotName: use slot to wrap a code block to build column content(String).<br/>className: td's className | array | - | - |
| show-pagination | Whether to show pagination component, if it's false, request parameters will not contain pagination parameters(pageIndex, pageSize) | boolean | - | true |
| page-sizes | Options of item count per page | array | - | [20, 50, 100] |
| pagination-layout | Layout of pagination, elements  separated with a comma | string | sizes, prev, pager, next, jumper, ->, total, slot | total, prev, pager, next, jumper, sizes |
| page-index-key | The key of pagination parameter of page index | string | - | pageIndex |
| page-size-key | The key of pagination parameter of page size | string | - | pageSize |

### Methods

| Method Name | Description | Parameters |
| ----- |-----|-----|
| searchHandler | Reset page index to 1, and research | - |

### Slots

| Slot Name | Description |
| ---- |-----|
| form | A form above table component to contain parameters.  this `slot`'s `scope` has two properties: <br/> loading: request loading of Element Loading directive; search: research function |
| prepend | This slot will be appended as the far lest column of the table |
| append | This slot will be appended as the far right column of the table |
