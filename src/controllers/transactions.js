const transactionModel = require("../models/transactions");
const responseHelper = require("../helpers/response");

const getAllTransactions = (req, res) => {
  const { query } = req;

  transactionModel
    .getAllTransactions(query)
    .then(({ data, count, limit, page }) => {
      const baseURL = "http://localhost:8000/transactions";
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

const getTransactionByUser = (req, res) => {
  const { params } = req;

  transactionModel
    .getTransactionByUser(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getTransactionById = (req, res) => {
  const { params } = req;

  transactionModel
    .getTransactionById(params.transactionId)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};
// const getPopularTransactions = (req, res) => {
//   transactionModel
//     .getPopularTransactions()
//     .then((data) => responseHelper.success(res, 200, data))
//     .catch((err) => responseHelper.error(res, 500, err));
// };

const createTransaction = (req, res) => {
  const { body } = req;

  transactionModel
    .createTransaction(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updateTransaction = (req, res) => {
  const { body, params } = req;

  transactionModel
    .updateTransaction(body, params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const deleteTransaction = (req, res) => {
  const { params } = req;

  transactionModel
    .deleteTransaction(params.id)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  getAllTransactions,
  getTransactionByUser,
  getTransactionById,
  // getPopularTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
