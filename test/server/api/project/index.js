import mongoose from 'mongoose';

import agent from './../../agent';
import logger from './../../../../src/lib/log/logger';

const username = 'admin';
const projectPath = 'example';

const adminLogin = (done) => {
  agent
      .post('/login')
      .send({
        password: 'admin',
        login_name: 'Admin',
      })
      .end(done);
};

describe('POST /api/project', () => {
  before(adminLogin);
  before((done) => {
    mongoose.connection.db.dropCollection('project', (err) => {
      logger.debug(err);
      done();
    });
  });

  it('should create project successful', (done) => {
    agent.post(`/api/project/${username}/${projectPath}`)
    .send({
      username,
      name: projectPath,
      path: projectPath,
      desc: 'A demo of example using Node.js',
      'git.username': 'emengjzs',
      'git.branch': 'master',
      'git.url': 'https://github.com/emengjzs/node-es6-demo.git',
    })
    .expect(200)
    .expect((res) => {
      res.body.shoud.have.property('id').which.should.be.number();
    })
    .end(agent.debug(done));
  });
});
