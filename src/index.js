
import SearchTablePagination from '../packages/search-table-pagination/index.js'
import SearchForm from '../packages/search/index.js'

import packageInfo from '../package.json'

const components = [
  SearchTablePagination,
  SearchForm
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });
  if (!opts.axios) {
    opts.axios = require('axios')
    opts.axios.interceptors.response.use(
      response => {
        return JSON.parse(JSON.stringify(response.data))
      },
      error => {
        return Promise.reject(error.response)
      }
    )
  }
  Vue.prototype.$axios = opts.axios
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  version: packageInfo.version,
  install,
  SearchTablePagination,
  SearchForm
}
