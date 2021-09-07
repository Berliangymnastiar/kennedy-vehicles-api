const success = (res, status, result, info) => {
  const objectResponse = {
    result,
    info,
    status: true,
  };
  res.status(status).json(objectResponse);
};

const error = (res, status, message) => {
  const objectResponse = {
    message,
    status: false,
  };
  res.status(status).json(objectResponse);
};

module.exports = {
  success,
  error,
};
