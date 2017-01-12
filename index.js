// Cassiny AppEngine's startup scripts
// in pure ES5 code

var env = process.env.NODE_ENV;
if (env === 'production')
{
  require('./dist/server');
}
else
{
  require('./src/server');
}
