import { Router } from 'express';

import app from '../app';

const router = Router();

router.use('/', require('./user').default);
router.use('/api', require('../api').default);

router.get('/', (req, res) => {
  res.render('welcome', { title: 'Welcome', app, req });
});

export default router;
