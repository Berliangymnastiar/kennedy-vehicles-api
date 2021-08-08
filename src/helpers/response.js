const success = (res, status, result, info) => {
  const objectResponse = {
    result,
    info,
  };
  res.status(status).json(objectResponse);
};

const error = (res, status, errMessage) => {
  const objectResponse = {
    errMessage,
    data: null,
  };
  res.status(status).json(objectResponse);
};

module.exports = {
  success,
  error,
};
