const categoryModel = require("../models/categories");
const responseHelper = require("../helpers/response");

const getAllCategories = (req, res) => {
  const { query } = req;

  let inputValue = `%${query.name || ""}%`;
  categoryModel
    .getAllCategories(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) =>
      responseHelper.error(
        res,
        500,
        send({
          message: err.message || "some error occured while delete data",
        })
      )
    );
};

// const getCategoryById = (req, res) => {
//   const { params } = req;

//   categoryModel
//     .getCategoryById(params.id)
//     .then((data) => responseHelper.success(res, 200, data))
//     .catch((err) =>
//       responseHelper.error(
//         res,
//         500,
//         send({
//           message: err.message || "some error occured while delete data",
//         })
//       )
//     );
// };

// const createCategory = (req, res) => {
//   const { body } = req;

//   categoryModel
//     .createCategory(body)
//     .then((data) => responseHelper.success(res, 200, data))
//     .catch((err) =>
//       responseHelper.error(
//         res,
//         500,
//         send({
//           message: err.message || "some error occured while delete data",
//         })
//       )
//     );
// };

// const updateCategory = (req, res) => {
//   const { body, params } = req;

//   categoryModel
//     .updateCategory(body, params.id)
//     .then((data) => responseHelper.success(res, 200, data))
//     .catch((err) =>
//       responseHelper.error(
//         res,
//         500,
//         send({
//           message: err.message || "some error occured while delete data",
//         })
//       )
//     );
// };

// const deleteCategory = (req, res) => {
//   const { params } = req;

//   categoryModel
//     .deleteCategory(params.id)
//     .then((data) => responseHelper.success(res, 200, data))
//     .catch((err) =>
//       responseHelper.error(
//         res,
//         500,
//         send({
//           message: err.message || "some error occured while delete data",
//         })
//       )
//     );
// };

module.exports = {
  getAllCategories,
  // getCategoryById,
  // createCategory,
  // updateCategory,
  // deleteCategory,
};
