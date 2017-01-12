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
      urlPrefix: 'http://localhost:8080',
    },
  },
};
