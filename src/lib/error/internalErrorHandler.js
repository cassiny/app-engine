export default function internalErrorHandler() {
  if (process.env.NODE_ENV === 'production') {
    return (err, req, res, next) => {
      res.status(500).json({ message: 'System is busy' });
      // next(err);
    };
  }
  return (err, req, res, next) => {
    res.status(500).send(err);
  };
}
