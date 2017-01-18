import { Router } from 'express';

import ProjectManager from '../../lib/project/ProjectMaganer';

import app from '../app';

const router = Router();

router.param('username', (req, res, next) => {
  if (req.user.username !== req.params.username) {
    res.status(403).end();
  } else {
    next();
  }
});

const projectPathValidationFilter = async (req, res, next) => {
  const project = await ProjectManager.getProjectByPath(req.user.id, req.params.path);
  if (project) {
    res.set('projectJSON', JSON.stringify(project));
    next();
  } else {
    res.status(404).end();
  }
};


router.get('/:username', (req, res) => {
  res.render('project/project-dashboard-app', {
    app,
    req
  });
});

router.post('/:username/:path', async (req, res, next) => {
  const projectInput = {
    userId: req.user.id,
    name: req.body.name,
    path: req.params.path,
    desc: req.body.desc,
  };

  const repositoryInput = {
    url: req.body['git.url'],
    username: req.body['git.username'],
    password: req.body['git.password'],
    branch: req.body['git.branch'],
  };

  try {
    const project = await ProjectManager.createProject(projectInput, repositoryInput);
    if (project) {
      res.redirect(`/project/${req.user.username}/${projectInput.path}`);
    }
  } catch (err) {
    if (err.isClientError) {
      res.redirect(`/project/${req.user.username}`);
    } else {
      next(err);
    }
  }
});

router.get('/:username/:path*', projectPathValidationFilter, (req, res) => {
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
