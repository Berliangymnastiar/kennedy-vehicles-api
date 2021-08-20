const userModel = require("../models/users");
const responseHelper = require("../helpers/response");

const getAllUsers = (req, res) => {
  const { query } = req;

  userModel
    .getAllUsers(query)
    .then(({ data, count, limit, page }) => {
      const baseURL = "http://localhost:8000/users";
      const totalData = count[0].total_data;
      const totalPage = Math.ceil(totalData / Number(limit));
      const currentPage = Number(page);
      const prevPage =
        currentPage > 1
          ? baseURL + `?page=${currentPage - 1}&limit=${limit}`
          : null;
      const nextPage =
        currentPage < totalPage
          ? baseURL + `?page=${currentPage + 1}&limit=${limit}`
          : null;
      const info = {
        totalData,
        currentPage,
        totalPage,
        nextPage,
        prevPage,
      };
      responseHelper.success(res, 200, data, info);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while get data users",
      });
    });
};

const getUserById = (req, res) => {
  const { params } = req;

  userModel
    .getUserById(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while get data user by id",
      });
    });
};

const createUser = (req, res) => {
  const { body } = req;

  userModel
    .createUser(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating the user",
      });
    });
};

const updateUser = (req, res) => {
  const { body, file, params } = req;

  let input = { ...body };
  if (file) {
    const host = "http://localhost:8000";
    const imageURL = `/images/${file.filename}`;
    input = {
      picture: host + imageURL,
      ...input,
    };
  }
  userModel
    .updateUser(input, params)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while update data vehicles",
      });
    });
};

const updatePassword = (req, res) => {
  const { body, params } = req;
  userModel
    .updatePassword(body, params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while update password",
      });
    });
};

const deleteUser = (req, res) => {
  const { params } = req;

  userModel
    .deleteUser(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while delete user",
      });
    });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
};
