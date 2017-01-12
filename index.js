/**
 *  Cassiny AppEngine's startup scripts in pure ES5 code
 */

/* eslint-disable */

const env = process.env.NODE_ENV;
if (env === 'production') {
  console.info('Cassiny AppEngine server is now starting in [PRODUCTION] mode...');
  require('./dist/server');
} else {
  console.info('Cassiny AppEngine server is now starting in [DEVELOPMENT] mode...');
  require('./src/server');

  console.info('Starting webpack-dev-server at HTTP 8080...');
  const WebpackDevServer = require('webpack-dev-server');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const webpackCompiler = webpack(webpackConfig);
  const webpackDevServer = new WebpackDevServer(webpackCompiler, webpackConfig.devServer);
  webpackDevServer.listen(8080);
}
