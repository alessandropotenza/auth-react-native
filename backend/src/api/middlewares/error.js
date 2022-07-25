module.exports = (error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  res.status(status).json({ error: true, message });
};
