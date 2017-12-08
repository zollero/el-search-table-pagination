
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
