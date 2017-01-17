import request from 'supertest';

import app from './../../src/server/app';
import logger from './../../src/lib/log/logger';

const agent = request.agent(app);

agent.debug = done => (err, res) => {
  if (err) {
    logger.debug({
      text: res.test,
    });
  }
  done();
};

export default agent;
