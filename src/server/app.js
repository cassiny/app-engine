import express from 'express';

const app = express();
app.get('/', (req, res) => {
  res.type('html');
  res.send('<h1>Welcome</h1><p>Welcome to Cassiny AppEngine</p>');
});

export default app;
