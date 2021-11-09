const userModel = require("../models/users");
const authModel = require("../models/auth");
const responseHelper = require("../helpers/response");

const register = (req, res) => {
  const { body } = req;

  userModel
    .createUser(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => {
      if (err === 409) {
        return responseHelper.error(res, 409, "Email already exist!");
      }
      responseHelper.error(res, 500, err.message);
    });
};

const login = (req, res) => {
  const { body } = req;

  authModel
    .login(body)
    .then(({ token, userInfo }) =>
      responseHelper.success(res, 200, { token: token, userInfo: userInfo })
    )
    .catch((err) => {
      if (err === 404) {
        return responseHelper.error(res, 404, "Email not found!");
      }
      if (err === 401) {
        return responseHelper.error(
          res,
          401,
          "Login failed! Wrong email or password!"
        );
      }
      responseHelper.error(res, 500, err);
    });
};
const logout = (req, res) => {};

module.exports = {
  login,
  register,
  logout,
};
