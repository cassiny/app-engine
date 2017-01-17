import { Router } from 'express';

import app from '../app';

const router = Router();

router.use('/:username/:path', (req, res, next) => {
  if (req.user.username !== req.params.username) {
    res.status(403).end();
    return;
  }
  // TODO: Check if the project is existed, otherwise throw 404
  next();
});

router.get('/:username/:path', (req, res) => {
  res.render('project/project-detail-app', { title: '', app, req });
});

router.get('/:username/:path/*', (req, res) => {
  res.render('project/project-detail-app', { title: '', app, req });
});

export default router;
