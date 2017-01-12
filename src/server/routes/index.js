import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.render('templates/index', { title: 'Welcome' });
});

export default router;
