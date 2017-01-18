import ProjectManager from './../../../src/lib/project/ProjectMaganer';
import User from './../../../src/lib/user/model/User';



describe('Project Manager', () => {
  let userId;
  before((done) => {
    User.findOne({ username: 'admin' }).exec((err, user) => {
      userId = user.id;
      done();
    });
  });


  it('should return project list of owner admin', async () => {
    const projects = await ProjectManager.getProjectsByUserId(userId);
    projects.should.have.size(1);
  });

  it('should return example project of owner admin', async () => {
    const project = await ProjectManager.getProjectByPath(userId, 'example');
    project.should.have.property('name').which.is.equal('example');
  });

  it('should not exist project "lovelive"', async () => {
    const result = await ProjectManager.existProject(userId, 'lovelive');
    result.should.be.false();
  });

  it('should exist project "example"', async () => {
    const result = await ProjectManager.existProject(userId, 'example');
    result.should.be.true();
  });
});
