import { Router } from 'express';

const router = Router();

router.use('/user', require('./user').default);
router.use('/project', require('./project').default);

export default router;
