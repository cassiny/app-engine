const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('./src/client'),
  entry: {
    vendor: ['babel-polyfill', 'jquery', 'react'],

    common: ['./common/res/index.less'],

    login: ['./user/login/index.js', './user/login/res/index.less'],
    join: ['./user/join/index.js', './user/join/res/index.less'],
    welcome: ['./welcome/res/index.less'],

    'project-detail-app': ['./project/app/ProjectDetailApp.jsx', './project/res/index.less']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      bootstrap: path.resolve('./node_modules/bootstrap'),
      joi: 'joi-browser',
      common: path.resolve('./src/client/common'),
      'variables.less$': path.resolve('./src/client/common/res/variables.less')
    }
  },
  output: {
    path: path.resolve('./dist/assets'),
    publicPath: '/',
    filename: './js/[name].min.js'
  },
  devServer: {
    contentBase: path.resolve('../dist/assets')
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10240&name=images/[name].[hash].[ext]&outputPath=/images/'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/[name].min.css'
    })
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './js/vendor.min.js',
      minChunks: Infinity
    })
  ]
};
