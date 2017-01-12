const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('./src/client'),
  entry: {
    vendor: ['babel-polyfill', 'jquery'],
    common: ['./common/res/index.less'],
    login: ['./login/res/index.less'],
  },
  resolve: {
    alias: {
      bootstrap: path.resolve('./node_modules/bootstrap'),
      common: path.resolve('./src/client/common'),
    },
  },
  output: {
    path: path.resolve('./dist/assets'),
    publicPath: '/',
    filename: '[name]/min.js',
  },
  devServer: {
    contentBase: path.resolve('../dist/assets'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('./[name]/res/min.css'),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor/min.js',
      minChunks: Infinity,
    }),
  ],
};
