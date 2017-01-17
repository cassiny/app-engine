export default function clientErrorHandler() {
  return (err, req, res, next) => {
    if (err.isClientError) {
      res.status(500).json({ message: err.message });
    } else {
      next(err);
    }
  };
}
