const success = (res, status, data) => {
  const objectResponse = {
    errMessage: null,
    data,
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
