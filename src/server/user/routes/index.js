import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
  res.render('user/templates/login', { title: 'Sign in' });
});

export default router;
