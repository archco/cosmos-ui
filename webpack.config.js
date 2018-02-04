const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const Rules = require('./task/webpack-module-rules');

//
// Configs.
//

const common = {
  entry: ['./src/js/script.js', './src/scss/moss.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
};
const dist = merge(common, {
  output: {
    filename: 'moss.js',
  },
  module: {
    rules: [Rules.sourceMap, Rules.js, Rules.vue, Rules.scss()],
  },
  plugins: [
    new ExtractTextPlugin('moss.css'),
    new WebpackNotifierPlugin({
      alwaysNotify: true,
      sound: false,
    }),
  ],
  devtool: 'source-map',
});
const min = merge(common, {
  output: {
    filename: 'moss.min.js',
  },
  module: {
    rules: [Rules.sourceMap, Rules.js, Rules.vue, Rules.scss(true)],
  },
  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin('moss.min.css'),
  ],
});
const mod = merge(common, {
  entry: './src/js/moss.js',
  output: {
    filename: 'moss.mod.js',
    library: 'Moss',
    libraryTarget: 'umd',
  },
  module: {
    rules: [Rules.sourceMap, Rules.js, Rules.vue],
  },
  devtool: 'source-map',
});

module.exports = env => (env && env.task == 'dev')
  ? dist
  : [mod, dist, min];
