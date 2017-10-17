
import SearchTablePagination from '../package/search-table-pagination/index.js'

import packageInfo from '../package.json'

const components = [
  SearchTablePagination
];

const install = function(Vue) {
  components.map(component => {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  version: packageInfo.version,
  install,
  SearchTablePagination
}
