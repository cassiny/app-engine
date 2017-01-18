import agent from './../../agent';
import logger from './../../../../src/lib/log/logger';
import Project from './../../../../src/lib/project/model/Project';

const username = 'admin';
const projectPath = 'example';

const all = (...handlers) => {
  const len = handlers.length;

  let i = -1;
  const next = () => {
    i += 1;
    try {
      if (i < len - 1) {
        handlers[i](next);
      } else if (i === len - 1) {
        handlers[i]();
      }
    } catch (err) {
      logger.error(err);
    }
  };

  try {
    next();
  } catch (err) {
    logger.error(err);
  }
};



const adminLogin = next =>
  agent
      .post('/login')
      .send({
        password: 'admin',
        login_name: 'Admin',
      })
      .end(next)
;

describe('POST /api/project', () => {
  before(done => all(
    adminLogin,
    next =>
      Project.findOneAndRemove({ id: projectId, path: projectPath }).exec((err, res) => next()),
    done
  ));

  let projectId;

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
      projectId = res.body.id;
    })
    .end(agent.debug(done));
  });
});
