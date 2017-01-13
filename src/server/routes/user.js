import passport from 'passport';
import { Router } from 'express';

import app from '../app';
import UserManager from './../../lib/user/UserManager';
import logger from './../../lib/log/logger';

const router = Router();

router.get('/login', (req, res) => {
  const error = req.flash('error')[0];
  res.render('user/login', { title: 'Sign in', app, error });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  (req, res) => {
    // If successfully signed in
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/join', (req, res) => {
  res.render('user/join', { title: 'Join', req, app });
});

router.post('/join', async (req, res) => {
  let result = null;
  try {
    result = await UserManager.registerUser(
        req.body.email,
        req.body.password,
        req.body.username,
      );
  } catch (err) {
    logger.error(err);
    res.status(400).send('Error');
    return;
  }

  if (result instanceof Error) {
    res.send(result.message);
  } else {
    res.json({
      message: 'success',
    });
  }
});

export default router;
