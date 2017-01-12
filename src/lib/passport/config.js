import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import UserIdentity from '../user/UserIdentity';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
  session: true,
}, async (req, email, password, done) => {
  if (email === 'admin@cassiny.org' && password === 'admin') {
    const user = new UserIdentity({
      id: '0',
      username: 'admin',
      email,
    });
    done(null, user);
  } else {
    done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.serialize());
});

passport.deserializeUser((id, done) => {
  done(null, UserIdentity.deserialize(id));
});
