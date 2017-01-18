import { Router } from 'express';

import ProjectManager from '../../lib/project/ProjectMaganer';

import app from '../app';

const router = Router();

router.use('/:username', (req, res, next) => {
  if (req.user.username !== req.params.username) {
    res.status(403).end();
  } else {
    next();
  }
});

router.use('/:username/:path', async (req, res, next) => {
  const project = await ProjectManager.getProjectByPath(req.user.id, req.params.path);
  if (project) {
    res.set('projectJSON', JSON.stringify(project));
    next();
  } else {
    res.status(404).end();
  }
});


router.get('/:username', (req, res) => {
  res.render('project/project-dashboard-app', {
    app,
    req
  });
});

router.get('/:username/:path*', (req, res) => {
  res.render('project/project-detail-app',
    {
      title: 'Loading',
      app,
      req,
      injections: {
        project: JSON.parse(res.get('projectJSON'))
      }
    });
});

export default router;
