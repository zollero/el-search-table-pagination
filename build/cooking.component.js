var cooking = require('cooking');
var webpack = require('webpack');
var Components = require('../components.json');
var config = require('./config');

cooking.set({
  entry: Components,
  dist: './lib',
  clean: false,
  format: 'cjs',
  extends: ['vue2'],
  minimize: false,
  externals: config.externals,
  alias: config.alias
});

cooking.add('output.filename', '[name].js');
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
