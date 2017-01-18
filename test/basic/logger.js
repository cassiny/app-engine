import winston from 'winston';

const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)(),
    // Add other logger transports here
  ],
});

export default logger;
