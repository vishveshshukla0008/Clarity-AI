export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.log(err)
  const validationErrors =
    err.errors && Array.isArray(err.errors) ? err.errors.map(e => e.msg) : [];

  const response = { success: false, message };
  if (validationErrors.length > 0) response.errors = validationErrors;

  // Include stack trace in development
  if (process.env.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};