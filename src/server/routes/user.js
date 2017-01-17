import passport from 'passport';
import { Router } from 'express';

import app from '../app';
import logger from './../../lib/log/logger';
import UserManager from './../../lib/user/UserManager';

const router = Router();

router.get('/login', (req, res) => {
  const info = req.flash('info')[0];
  const error = req.flash('error')[0];
  res.render('user/login', { title: 'Sign in', app, req, error, info });
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
  const error = req.flash('error')[0];
  res.render('user/join', { title: 'Join', req, app, error });
});

router.post('/join', async (req, res) => {
  try {
    const user = await UserManager.registerUser({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    req.flash('info', 'Congradulations! Sign in now.');
    req.flash('loginName', user.email);
    res.redirect('/login');
  } catch (err) {
    if (err.isClientError) {
      req.flash('error', err.message);
      res.redirect('/join');
    }
    logger.error(err);
    res.status(500).end();
  }
});

export default router;
