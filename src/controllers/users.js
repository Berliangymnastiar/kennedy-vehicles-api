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
  const { file, params } = req;

  const host = "http://localhost:8000";
  const imageURL = `/images/${file.filename}`;
  const body = {
    picture: host + imageURL,
  };

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
