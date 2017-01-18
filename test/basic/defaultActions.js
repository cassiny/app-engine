import agent from './../server/agent';
import logger from './logger';

const actions = {};

actions.adminLoginAction = (next) => {
  agent
      .post('/login')
      .send({
        password: 'admin',
        login_name: 'Admin',
      })
      .end(next);
};

actions.logoutAction = next => agent.get('/logout').end(next);

actions.all = (...handlers) => (done) => {
  const len = handlers.length;

  let i = -1;
  const next = () => {
    i += 1;
    try {
      if (i <= len - 1) {
        handlers[i](next);
      } else {
        done();
      }
    } catch (err) {
      done();
      logger.error(err);
    }
  };
  next();
};

export default actions;
