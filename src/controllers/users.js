const userModel = require("../models/users");
const responseHelper = require("../helpers/response");

const getAllUsers = (req, res) => {
  const { query } = req;

  let inputValue = `%${query.name || ""}%`;
  userModel
    .getAllUsers(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getUserById = (req, res) => {
  const { params } = req;

  userModel
    .getUserById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const createUser = (req, res) => {
  const { body } = req;

  userModel
    .createUser(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updateUser = (req, res) => {
  const { body, params } = req;

  userModel
    .updateUser(body, params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteUser = (req, res) => {
  const { params } = req;

  userModel
    .deleteUser(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
