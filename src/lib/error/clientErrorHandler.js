export default function clientErrorHandler() {
  return (err, req, res, next) => {
    if (err.isClientError) {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  };
}
