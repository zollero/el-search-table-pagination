var cooking = require('cooking');
var webpack = require('webpack');
var config = require('./config');

cooking.set({
  entry: './src/index.js',
  dist: './lib',
  clean: false,
  format: 'umd',
  moduleName: 'EL-SEARCH-TABLE-PAGINATION',
  extends: ['vue2'],
  alias: config.alias,
  externals: { vue: config.vue }
});

cooking.add('output.filename', 'index.js');
cooking.add('loader.js.exclude', config.jsexclude);
cooking.add('loader.scss', {
  test: /\.scss$/,
  loaders: ['style-loader', 'css-loader', 'sass-loader']
});
cooking.add('vue.preserveWhitespace', false);
cooking.add('plugin.banner', new webpack.BannerPlugin({
  banner: 'el-search-table-pagination\nCopyright(c) 2017 zollero\nMIT Licensed',
  entryOnly: true
}));

module.exports = cooking.resolve();
