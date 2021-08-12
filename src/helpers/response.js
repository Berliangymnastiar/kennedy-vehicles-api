const success = (res, status, result, info) => {
  const objectResponse = {
    result,
    info,
  };
  res.status(status).json(objectResponse);
};

const error = (res, status, message) => {
  const objectResponse = {
    message,
    data: null,
  };
  res.status(status).json(objectResponse);
};

module.exports = {
  success,
  error,
};
