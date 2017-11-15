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
| form-options | form item settings(See **Form Option Attributes** below) | object | - | - |
| data-handler | Function as parameter of Array.map to hander list data | function | - | - |
| columns | Required. Array of table column settings object. <br/>Has properties below：<br/>**prop**: column key value(required, String);<br/>**label**: column show value(required, String);<br/>**width**: column width, and the default is 140(Number);<br/>**minWidth**: min column width(Number);<br/>**filter**: filter name, only avaliable for registed on global Vue(String);<br/>**render**: function to handle data, and show the return value. The function will have the element of list data as parameter(Function);<br/>**slotName**: use slot to wrap a code block to build column content(String).<br/>**className**: td's className | array | - | - |
| show-pagination | Whether to show pagination component, if it's false, request parameters will not contain pagination parameters(pageIndex, pageSize) | boolean | - | true |
| page-sizes | Options of item count per page | array | - | [20, 50, 100] |
| pagination-layout | Layout of pagination, elements  separated with a comma | string | sizes, prev, pager, next, jumper, ->, total, slot | total, prev, pager, next, jumper, sizes |
| page-index-key | The key of pagination parameter of page index | string | - | pageIndex |
| page-size-key | The key of pagination parameter of page size | string | - | pageSize |

## Form Option Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- |------|:----:|-----|:-----:|
| forms | Array of object about form item settings.<br/>**label**: form item label value.<br/>**prop**: form item prop's key.string.<br/>**itemType**: form item type, Recently, only input/select/date/daterange are avaliable.string.<br/>**size**: form item size, optional values of large/small/mini.string.<br/>**placeholder**: placeholder of form item. string.<br/>**editable**: whether the input is editable, only avaliable for date/daterange. boolean.<br/>**disabled**: whether the form item is disabled. boolean.<br/>**readonly**: same as `readonly` in native input, only avaliable for input/date/daterange. boolean.<br/>**options**: array of select options, the element of array can be string or object. array.<br/>**selectFetch**: function to get remote data for select options, the function must return a `promise`, and only avaliable without the attribute `selectUrl`. function.<br/>**selectResultField**: the `key` value of remote data, default value is `result`. string.<br/>**selectResultHandler**: function as parameter of Array.map to hander remote data of select options. function.<br/>**selectUrl**: url of remote select options. string.<br/>**selectMethod**: method type for remote url(`selectUrl`). string.<br/>**selectParams**: the params of remote url. object.<br/>**valueKey**: the key of select options's value attribute, only avaliable when the type of options element's is object. the default value is `value`. string.<br/>**labelKey**: the key of select options's label attribute, only avaliable when the type of options element's is object. the default value is `label`. string.<br/>**pickerOptions**: additional options, only avaliable for date/daterange. object. | array[object] | - | - |
| size | size of form item | string | large/small/mini | - |
| showResetBtn | whether to show the reset button | boolean | - | false
| inline | whether the form is inline | boolean | - | false |
| labelWidth | width of label, and all its direct child form items will inherit this value | number | - | - |
| itemWidth | width of form item, and all its direct child form items will inherit this value | number | - | - |
submitHandler | function to hander click event of submit button, the will receive the form object as the first argument | function | - | - |
| submitLoading | detemine whether the button is loading | boolean | - | - |
| submitBtnText | text of submit button | string | - | 查询 |
| resetBtnText | text of reset button | string | - | 重置 |

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

## Events

| Event Name | Description | Parameters |
| ---- |-----| ----- |
| select | triggers when user clicks the checkbox in a row | selection, row |
| select-all | triggers when user clicks the checkbox in table header | selection |
| selection-change | triggers when selection changes | selection |

