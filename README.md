# Element search table pagination

A component which combines form、table with pagination components in Element UI. 一个封装 Form、Table 和 Pagination 的组件



## Install

```
npm i --save el-search-table-pagination
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

[Screen shot](./screenshot/el-search-table-pagination.png)

## API

## LICENSE

MIT
