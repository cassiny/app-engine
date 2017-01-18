import agent from './../../agent';
import Project from './../../../../src/lib/project/model/Project';
import actions from './../../../basic/defaultActions';

const username = 'admin';
const projectPath = 'example';

describe('POST /api/project', () => {
  before(actions.all(
    actions.adminLoginAction,
    next =>
      Project.findOneAndRemove({ username, path: projectPath }).exec((err, res) => next()),
  ));

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
