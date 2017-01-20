import { Router } from 'express';

import BuildManager from './../../../lib/build/BuildManager';

const router = Router();

router.get('/', async (req, res) => {
  const buildList = await BuildManager.getBuildRecordsByPath(req.user.id, req.params.path);
  res.json(buildList);
});

export default router;
