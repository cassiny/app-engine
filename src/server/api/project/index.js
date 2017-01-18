import { Router } from 'express';

import ProjectManager from './../../../lib/project/ProjectMaganer';


const router = Router();

// username filter
router.use('username', (req, res, next, username) => {
  if (req.user.username !== username) {
    res.redirect('/');
  } else {
    next();
  }
});

// username,path filter
const projectPathValidationFilter = async (req, res, next) => {
  if (req.params.path) {
    const exists = await ProjectManager.existProject(req.user.id, req.params.path);
    if (exists) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  }
};


// Project list
router.get('/:username',
  async (req, res) => {
    res.json('Project list');
  },
  async (req, res) => {
    res.json();
  });

// Get project
router.get('/:username/:path', projectPathValidationFilter, async (req, res) => {
  const project = await ProjectManager.getProjectByPath(req.user.id, req.params.path);
  res.json(project);
});

// Create new project
//
// { userId, name, desc, path },
// { url, username, password, branch },
//
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
    res.json(project);
  } catch (err) {
    next(err);
  }
});

// Modify project
router.put('/:username/:path', projectPathValidationFilter, async (req, res) => {
  res.json('Modify project');
});

// Delete project
router.delete('/:username/:path', projectPathValidationFilter, async (req, res) => {
  res.json('Delete the project');
});

// Add build subroute
router.use('/:username/:path/build', require('./../build').default);

export default router;
