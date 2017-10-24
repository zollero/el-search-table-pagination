# Element search table pagination

> Combine table and pagination components of [Element UI](https://github.com/ElemeFE/element) together. Based on Vue 2.x.

> You can use this package to show local and remote list data in table with pagination.

![Screen shot](./screenshot/el-search-table-pagination.png)

## Install

```
$ npm i --save el-search-table-pagination
```

## API

[API](./api/API_en.md)  |  [中文API](./api/API_zh_CN.md)

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


> Use this package to show **remote** data in a page:

```vue
<template>
  <div>
    <el-search-table-pagination
      url="example.xxx.com/list"
      :params="searchParams"
      :columns="columns">
            
      <!-- If you are using Vue v2.5 or higher version, 
           please replace `scope="scope"` to `slot-scope="scope"` -->
      <template slot="form" scope="scope">
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


And the Test page is the image above.

> Use this package to show **local** data in a page:

```vue
<template>
  <div>
    <el-search-table-pagination
      type="local"
      :data="tableData"
      :page-sizes="[2, 5, 10]"
      :params="searchParams"
      :columns="columns">
            
      <!-- If you are using Vue v2.5 or higher version, 
           please replace `scope="scope"` to `slot-scope="scope"` -->
      <template slot="form" scope="scope">
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
        }],
        tableData: [{
          name: 'Sam',
          mobile: '15299xxxx',
          sex: 0
        }, {
          name: 'Jean',
          mobile: '13452xxxx',
          sex: 1
        }, {
          name: 'Tony',
          mobile: '187233xxxx',
          sex: 0
        }]
      }
    }
  }
</script>
```

## LICENSE

MIT
