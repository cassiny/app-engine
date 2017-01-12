import http from 'http';

import app from './app';
import logger from '../lib/log/logger';

const httpServer = http.createServer(app);
const port = process.env.PORT ? parseInt(process.env.PORT, 0) : 3000;
httpServer.listen(port, () => {
  logger.info(`Cassiny AppEngine server is now listening at HTTP ${port}.`);
});
