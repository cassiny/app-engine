import logger from './../log/logger';

export default function errorLogHandler() {
  return (err, req, res, next) => {
    if (err.isClientError) {
      logger.warn(err);
    } else {
      logger.error(err);
    }
    next(err);
  };
}
