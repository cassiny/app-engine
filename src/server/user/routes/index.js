import passport from 'passport';
import { Router } from 'express';

import app from '../../app';

const router = Router();

router.get('/login', (req, res) => {
  res.render('user/templates/login', { title: 'Sign in', app });
});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    // If successfully signed in
    res.redirect('/');
  });

export default router;
