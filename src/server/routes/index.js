import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.user);
  res.render('templates/index', { title: 'Welcome' });
});

export default router;
