const transactionRouter = require("express").Router();

const transactionController = require("../controllers/transactions");

transactionRouter.get("/", transactionController.getAllTransactions);
transactionRouter.get(
  "/history/:id",
  transactionController.getTransactionByUser
);
transactionRouter.get(
  "/:transactionId",
  transactionController.getTransactionById
);
// transactionRouter.get("/popular", transactionController.getPopularTransactions);
// CREATE TRANSACTIONS
transactionRouter.post("/", transactionController.createTransaction);
// UPDATE TRANSACTION
transactionRouter.patch("/:id", transactionController.updateTransaction);
// DELETE TRANSACTION
transactionRouter.delete("/:id", transactionController.deleteTransaction);

module.exports = transactionRouter;
