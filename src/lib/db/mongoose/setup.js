import mongoose from 'mongoose';

import logger from '../../log/logger';
// Import all models
import './models';

mongoose.connection.on('error', (err) => {
  logger.error(err);
});

mongoose.connection.once('open', () => {
  logger.info('MongoDB is now connected.');
});
