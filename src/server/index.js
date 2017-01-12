import http from 'http';

import app from './app';

console.log('Cassiny AppEngine server is now starting...');

const httpServer = http.createServer(app);
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
httpServer.listen(port, () => {
  console.log(`Cassiny AppEngine server is now listening at HTTP ${port}.`);
});
