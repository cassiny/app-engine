export default function internalErrorHandler() {
  return (err, req, res, next) => {
    res.status(500).json({ message: 'System is busy' });
    next(err);
  };
}
