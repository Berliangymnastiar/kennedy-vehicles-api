const transactionModel = require("../models/transactions");
const responseHelper = require("../helpers/response");

const getAllTransactions = (req, res) => {
  const { query } = req;

  let inputValue = `%${query.vehicle_name || ""}%`;
  transactionModel
    .getAllTransactions(inputValue)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

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
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
