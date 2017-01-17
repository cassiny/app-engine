import { Router } from 'express';

import logger from './../../../lib/log/logger';
import ProjectManager from './../../../lib/project/ProjectMaganer';


const router = Router();

// username filter
router.use('username', (req, res, next, username) => {
  logger.debug('Check user!');
  if (req.user.username !== username) {
    res.redirect('/');
  } else {
    next();
  }
});

// Project list
router.get('/:username',
  async (req, res) => {
    res.json('Project list');
  },
  async (req, res) => {
    res.json();
  });

// Get project
router.get('/:username/:path', async (req, res) => {
  const project = await ProjectManager.getProjectByPath(req.user.id, req.params.path);
  res.json(project);
});

// Create new project
//
// { userId, name, desc, path },
// { url, username, password, branch },
//
router.post('/:username/:path', async (req, res) => {
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

  const project = await ProjectManager.createProject(projectInput, repositoryInput);
  res.json(project);
});

// Modify project
router.put('/:username/:path', async (req, res) => {
  res.json('Modify project');
});

// Delete project
router.delete('/:username/:path', async (req, res) => {
  res.json('Delete the project');
});

export default router;
