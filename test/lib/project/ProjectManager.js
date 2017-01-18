import agent from './../../server/agent';
import logger from './../../../src/lib/log/logger';
import ProjectManager from './../../../src/lib/project/ProjectMaganer';
import User from './../../../src/lib/user/model/User';
import Project from './../../../src/lib/project/model/Project';

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

const adminLogin = (next) => {
  agent
      .post('/login')
      .send({
        password: 'admin',
        login_name: 'Admin',
      })
      .end(next);
};

const username = 'admin';
const projectPath = 'ooo';

describe('Project Manager', () => {
  let userId;
  before(done => all(
    (next) => {
      User.findOne({ username }).exec((err, user) => {
        userId = user.id;
        next();
      });
    },
    adminLogin,
    done)
  );

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
      res.body.should.have.property('_id');
    })
    .end(done);
  });

  it('should create project fail when path already exists', (done) => {
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
    .expect(500)
    .expect(res => res.body.message.should.containEql('exists'))
    .end(done);
  });

  it('should return project list of owner admin', async () => {
    logger.log(userId);
    const projects = await ProjectManager.getProjectsByUserId(userId);
    projects.length.should.greaterThanOrEqual(1);
  });

  it('should return example project of owner admin', async () => {
    const project = await ProjectManager.getProjectByPath(userId, projectPath);
    project.should.have.property('name').which.is.equal(projectPath);
  });

  it('should not exist project "lovelive"', async () => {
    const result = await ProjectManager.existProject(userId, 'lovelive');
    result.should.be.false();
  });

  it('should exist project "example"', async () => {
    const result = await ProjectManager.existProject(userId, projectPath);
    result.should.be.true();
  });

  after(async () => {
    try {
      logger.info('AFTER');
      await Project.findOneAndRemove({ ownerId: userId, path: projectPath }).exec();
    } catch (err) {
      logger.error(err);
    }
  });
});
