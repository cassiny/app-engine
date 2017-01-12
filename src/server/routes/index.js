import { Router } from 'express';

import app from '../app';

const router = Router();

router.get('/', (req, res) => {
  res.render('templates/index', { title: 'Welcome', app, user: req.user });
});

export default router;
