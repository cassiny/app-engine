import { Router } from 'express';

import app from '../app';

const router = Router();

router.use('/', require('./user').default);
router.use('/api', require('../api').default);

router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome', app, user: req.user });
});

export default router;
