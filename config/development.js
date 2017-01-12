module.exports = {
  db: {
    mongo: {
      host: 'localhost',
      port: 27017,
      database: 'cassiny-app-engine',
    },
  },
  web: {
    assets: {
      urlPrefix: 'http://127.0.0.1:8080',
    },
  },
};
