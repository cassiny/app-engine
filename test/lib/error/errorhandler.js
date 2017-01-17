import express from 'express';
import request from 'supertest';

import errorLogHandler from './../../../src/lib/error/errorLogHandler';
import clientErrorHandler from './../../../src/lib/error/clientErrorHandler';
import internalErrorHandler from './../../../src/lib/error/internalErrorHandler'
import CassinyError from './../../../src/lib/error/CassinyError';

describe('Error Handler', () => {
  const app = express();

  app.get('/1', (req, res) => {
    throw CassinyError.INVALID_REGISTRATION('client err');
  });

  app.get('/2', (req, res) => {
    throw CassinyError.UNHANDLE_ERROR('server err');
  });

  app.use(errorLogHandler());
  app.use(clientErrorHandler());
  app.use(internalErrorHandler());


  it('should return client error message when client error raises', (done) => {
    request(app)
      .get('/1')
      .expect(500)
      .expect({ message: 'client err' })
      .end(done);
  });

  it('should return server error message when server error raises in dev mode', (done) => {
    request(app)
      .get('/2')
      .expect(500)
      .expect(res => res.body.message.should.be.equal('server err'))
      .end(done);
  });
});
