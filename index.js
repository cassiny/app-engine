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
}
