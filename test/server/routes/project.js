import agent from './../agent';
import actions from './../../basic/defaultActions';

const username = 'admin';
const projectPath = 'example-test';

const url = `/project/${username}`;

describe('GET /project', () => {
  before(actions.all(actions.adminLoginAction));


  describe(`/${username}`, () => {
    it('should able be access', (done) => {
      agent.get(url).expect(200).end(done);
    });
  });

  describe(`/${username}/${projectPath}`, () => {
    it('should be able to access', (done) => {
      agent.get(`${url}/${projectPath}`).expect(200).end(done);
    });
  });

  describe('/prpr/asds', () => {
    it('should not be able to access', (done) => {
      agent.get('/project/prpr/asds').expect(403).end(done);
    });
  });
});
