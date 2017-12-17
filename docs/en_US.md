# API

## Attributes

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
| form-options | form item settings(See [**Form Option Attributes**](#form-option-attributes) below) | object | - | - |
| data-handler | Function as parameter of Array.map to hander list data | function | - | - |
| columns | Array of table column settings object. See [**Table column Attributes**](#table-column-attribute) below | array | - | - |
| show-pagination | Whether to show pagination component, if it's false, request parameters will not contain pagination parameters(pageIndex, pageSize) | boolean | - | true |
| page-sizes | Options of item count per page | array | - | [20, 50, 100] |
| pagination-layout | Layout of pagination, elements  separated with a comma | string | sizes, prev, pager, next, jumper, ->, total, slot | total, prev, pager, next, jumper, sizes |
| page-index-key | The key of pagination parameter of page index | string | - | pageIndex |
| page-size-key | The key of pagination parameter of page size | string | - | pageSize |

PS: Also support more attributes, please refer to Element UI [Table attributes](https://github.com/ElemeFE/element/blob/dev/examples/docs/en-US/table.md#table-attributes)。

Supported attributes of `Element UI Table`: stripe / border / height / max-height / fit / show-header / highlight-current-row / current-row-key / row-class-name / row-style / row-key / empty-text / default-expand-all / expand-row-keys / default-sort / tooltip-effect / show-summary / sum-text / summary-method.

### Table column Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- |------|:----:|-----|:-----:|
| prop | column key value | string | - | - |
| label | column show value | string | - | - |
| width| column width | number | - | 140 |
| minWidth | min column width | number | - | - |
| filter | filter name, only avaliable for registed on global Vue | string | - | - |
| render | function to handle data, and show the return value. The function will have the element of list data as parameter | function | - | - |
| slotName | use slot to wrap a code block to build column content | string | - | - |

PS: Also support more attributes, please refer to Element UI  [Table column Attribute](https://github.com/ElemeFE/element/blob/dev/examples/docs/en-US/table.md#table-column-attributes)。

Supported attributes of `Element UI Table column`: column-key / fixed / render-header / sortable / sort-method / resizable / formatter / show-overflow-tooltip / align / header-align / class-name / label-class-name / selectable / reserve-selection / filters / filter-placement / filter-multiple / filter-method / filtered-value.

### Form Option Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- |------|:----:|-----|:-----:|
| forms | Array of object about form item settings.See [**Form Item Attributes**](#form-item-attributes) | array[object] | - | - |
| size | size of form item | string | large/small/mini | - |
| showResetBtn | whether to show the reset button | boolean | - | false
| inline | whether the form is inline | boolean | - | false |
| fuzzy | whether the form support fuzzy search, global setting, only avaliable for `local` data | boolean | - | false |
| labelWidth | width of form label, and all its direct child form items will inherit this value | number | - | - |
| itemWidth | width of form item, and all its direct child form items will inherit this value | number | - | - |
submitHandler | function to hander click event of submit button, the will receive the form object as the first argument | function | - | - |
| submitLoading | detemine whether the button is loading | boolean | - | - |
| submitBtnText | text of submit button | string | - | 查询 |
| resetBtnText | text of reset button | string | - | 重置 |

### Form Item Attributes

| Attribute | Description | Type | Accepted Values | Default |
| --- |------|:----:|-----|:-----:|
| label | form item label value | string | - | - |
| prop | form item prop's key | string | - | - |
| fuzzy | whether form item support fuzzy search, only avaliable for `local` data | boolean | - | false |
| itemType | form item type, Recently, only input/select/date/daterange are avaliable | string | input/select/date/daterange | - |
| size | form item size | string | large/small/mini | - |
| labelWidth | width of form label | - | - |
| itemWidth | width of form item | number | - | - |
| placeholder | placeholder of form item | string | - | - |
| editable | whether the input is editable, only avaliable for date/daterange | boolean | true/false | true |
| disabled | whether the form item is disabled | boolean | true/false | false |
| readonly | same as `readonly` in native input, only avaliable for input/date/daterange | boolean | true/false | false |
| options | array of select options, the element of array can be string or object | [string]/[object] | - | - |
| selectFetch | function to get remote data for select options, the function must return a `promise`, and only avaliable without the attribute `selectUrl` | function | - | - |
| selectResultField | the `key` value of remote data, default value is `result` | string | | - | result |
| selectResultHandler | function as parameter of Array.map to hander remote data of select options | function | - | - |
| selectUrl | url of remote select options | string - | - |
| selectMethod | method type for remote url(`selectUrl`) | string | get/post | - |
| selectParams | the params of remote url | object | - | - |
| valueKey | the key of select options's value attribute, only avaliable when the type of options element's is object | string | - | value |
| labelKey | the key of select options's label attribute, only avaliable when the type of options element's is object | string | - | label |
| rules | validation rules of form | object | - | - |
| format | a function to foramt form item value, it receive two arguments: form item value and form item key(as prop), and the function should return the formatted value | function | - | - |
| pickerOptions | additional options, only avaliable for date/daterange | object | - | - |

## Methods

| Method Name | Description | Parameters |
| ----- |-----|-----|
| searchHandler | Reset page index to 1, and research | - |

## Slots

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
| cell-mouse-enter | triggers when hovering into a cell | row, column, cell, event |
| cell-mouse-leave | triggers when hovering out of a cell | row, column, cell, event |
| cell-click | triggers when clicking a cell | row, column, cell, event |
| cell-dblclick | triggers when double clicking a cell | row, column, cell, event |
|row-click | triggers when clicking a row | row, event, column |
| row-contextmenu | triggers when user right clicks on a row | row, event |
| row-dblclick | triggers when double clicking a row | row, event |
| header-click | triggers when clicking a column header | column, event |
| sort-change | triggers when Table's sorting changes | { column, prop, order } |
| filter-change | column's key. If you need to use the filter-change event, this attribute is mandatory to identify which column is being filtered | filters |
| current-change | triggers when current row changes | currentRow, oldCurrentRow |
| header-dragend | triggers when finish dragging header | newWidth, oldWidth, column, event |
| expand (v1.x) | triggers when user expands or collapses a row | row, expandedRows |
| expand-change (v2.x) | triggers when user expands or collapses a row | row, expandedRows |
