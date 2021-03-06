import agent from './../agent';

const login = '/login';
const logout = '/logout';
const logoutAction = () => agent.get(logout);

describe('GET /login', () => {
  it('page should be ok', (done) => {
    agent
      .get(login)
      .expect(200)
      .expect('Content-Type', 'text/html; charset=utf-8')
      .expect(res =>
        res.text.includes('Sign in').should.be.true(),
      )
      .end(done);
  });
});



describe('POST /login', () => {
  describe('admin login', () => {
    beforeEach(logoutAction);
    after(logoutAction);

    it('should remain when username is incorrect', (done) => {
      agent
        .post(login)
        .send({
          password: 'admin',
          login_name: 'Admin3',
        })
        .expect(302)
        .expect('Location', login)
        .end(done);
    });

    it('should remain when password is incorrect', (done) => {
      agent
        .post(login)
        .send({
          password: 'admin3',
          login_name: 'Admin',
        })
        .expect(302)
        .expect('Location', login)
        .end(done);
    });

    it('should be ok.', (done) => {
      agent
        .post(login)
        .send({
          password: 'admin',
          login_name: 'Admin',
        })
        .expect(302)
        .expect('Location', '/')
        .expect(res =>
          res.text.includes('Sign in').should.be.false(),
         )
        .end(done);
    });
  });
});
