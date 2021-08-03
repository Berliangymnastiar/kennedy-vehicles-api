const transactionRouter = require("express").Router();

const transactionController = require("../controllers/transactions");

// GET DATA TRANSACTIONS / HISTORY BY DATE
transactionRouter.get("/", transactionController.getAllTransactions);
// GET TRANSACTION BY ID
transactionRouter.get("/:id", transactionController.getTransactionById);
// CREATE TRANSACTIONS
transactionRouter.post("/", transactionController.createTransaction);
// UPDATE TRANSACTION
transactionRouter.patch("/:id", transactionController.updateTransaction);
// DELETE TRANSACTION
transactionRouter.delete("/:id", transactionController.deleteTransaction);

module.exports = transactionRouter;
