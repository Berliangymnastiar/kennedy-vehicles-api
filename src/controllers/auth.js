const userModel = require("../models/users");
const authModel = require("../models/auth");
const responseHelper = require("../helpers/response");

const register = (req, res) => {
  const { body } = req;

  userModel
    .createUser(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => responseHelper.error(res, 500, err.message));
};

const login = (req, res) => {
  const { body } = req;

  authModel
    .login(body)
    .then((result) => responseHelper.success(res, 200, { token: result }))
    .catch((err) => responseHelper.error(res, 500, err));
};
const logout = (req, res) => {};

module.exports = {
  login,
  register,
  logout,
};
