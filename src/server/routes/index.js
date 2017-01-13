import { Router } from 'express';

import app from '../app';

const router = Router();

router.use('/', require('./user').default);
router.use('/api', require('../api').default);

router.get('/', (req, res) => {
  if (!req.user) {
    res.render('welcome', { title: 'Welcome', app, req });
  } else {
    res.render('spa', { title: 'AppEngine', app, req });
  }
});

export default router;
