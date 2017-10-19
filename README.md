# Element search table pagination

> Combine table and pagination components of [Element UI](https://github.com/ElemeFE/element) together.

![Screen shot](./screenshot/el-search-table-pagination.png)

## Install

```
$ npm i --save el-search-table-pagination
```

## Quick Start

Import modules and set up settings in `main.js`:

```js
import Vue from 'vue'
import ElSearchTablePagination from 'el-search-table-pagination'

// Default use axios as HTTP tool
Vue.use(ElSearchTablePagination)
// or set a custom HTTP tool
import axios from 'axios'
Vue.use(ElSearchTablePagination, {
    axios
})
```


Use this component in a page:

```
<template>
  <div>
    <el-search-table-pagination
      url="example.xxx.com/list"
      :params="searchParams"
      :columns="columns">
            
      <!-- If you are using Vue v2.5 or higher version, please replace `scope="scope"` to `slot-scope="scope"` -->
      <template slot="search-form" scope="scope">
        <el-form :inline="true" :model="searchParams">
          <el-form-item label="Name" prop="name">
            <el-input v-model="searchParams.name" ></el-input>
          </el-form-item>
          <el-form-item label="Mobile" prop="mobile">
            <el-input v-model="searchParams.mobile" ></el-input>
          </el-form-item>

          <el-button @click="scope.search" :loading="scope.loading">
            Search
          </el-button>
        </el-form>
      </template>
    </el-search-table-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchParams: {
          name: '',
          mobile: ''
        },
        columns: [{
          prop: 'name',
          label: 'Name',
          width: 140
        }, {
          prop: 'mobile',
          label: 'Mobile',
          minWidth: 180
        }, {
          prop: 'sex',
          label: 'Sex',
          width: 80,
          render: row => {
            if (row.sex === 0) {
              return 'Male'
            } else if (row.sex === 1) {
              return 'Female'
            } else {
              return 'Unknow'
            }
          }
        }]
      }
    }
  }
</script>
```


And the Test page is the image below:

![Screen shot](./screenshot/el-search-table-pagination.png)

## API

### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| url | 后端数据接口 | string | - | - |
| method| 接口请求方式 | string | get, post, delete, put | get |
| headers | 请求头信息 | object | - | - |
| list-field | 接口返回值对应数据的字段值 | string | - | data.list |
| total-field | 接口返回值对应数据总数的字段值 | string | - | data.total |
| params | 搜索参数 | object | - | - |
| data-handler | 数组数据的 map 处理函数 | function | - | - |
| columns | table 列配置对象。
            包含的属性有： 
            prop: 展示字段的字段值。string。
            label: 列名。string。
            width: 列宽。number。
            minWidth: 最小列宽。number。
            filter: 过滤器名（只有配置在全局的filter才有效）。string。
            render: 处理数据的函数，接收行数据作为参数。function。
            slotName：使用 slot 标记的代码块的 slot 属性值。string。
          | array | - | - |
| show-pagination | 是否显示分页组件，如设为false，查询时不传分页参数 | boolean | - | true |
| page-sizes | 每页显示个数的控件选项 | array | - | [20, 50, 100] |
| pagination-layout | 分页空间的结构 | string | - | total, prev, pager, next, jumper, sizes |
| page-index-key | 参数：页码数 的 key 值 | string | - | pageIndex |
| page-size-key | 参数：每页展示个数 的 key 值 | string | - | pageSize |

### Methods

| 方法名 | 说明 | 参数 |
| searchHandler | 重置分页页码参数为1，重新搜索数据 | - |

### Slots

| name | 说明 |
| search-form | table 上部展示一个搜索区域，该`slot`下通过`scope`可以访问到两个属性：loading（查询中的loading状态值），search（搜索方法）|
| prepend | table中，在最左边添加的列 |
| append | table中，在最右边添加的列，一般可放置`操作列` |

## LICENSE

MIT
