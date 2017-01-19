import agent from './../../agent';
import actions from './../../../basic/defaultActions';

const username = 'admin';
const projectPath = 'example';

describe(`GET /api/project/${username}/${projectPath}/build`, () => {
  before(actions.all(
    actions.adminLoginAction,
  ));

  it('should return build list successfully', (done) => {
    agent.get(`/api/project/${username}/${projectPath}/build`).expect(200).expect(res => res.body.length.should.be.aboveOrEqual(3)).end(done);
  });
});

