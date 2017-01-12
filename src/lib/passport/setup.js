import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserManager from '../user/UserManager';
import UserIdentity from '../user/UserIdentity';

UserManager.getUserByEmail('admin@cassiny.org').then((user) => {
  if (!user) {
    UserManager.registerUser({
      email: 'admin@cassiny.org',
      password: 'admin',
      username: 'Admin',
    });
  }
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true,
}, async (req, email, password, done) => {
  const user = await UserManager.verifyEmailPassword(email, password);
  if (user) {
    const userIdentity = new UserIdentity({
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
    });
    done(null, userIdentity);
  } else {
    done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.serialize());
});

passport.deserializeUser(async (id, done) => {
  const userIdentity = await UserIdentity.deserialize(id);
  done(null, userIdentity);
});
