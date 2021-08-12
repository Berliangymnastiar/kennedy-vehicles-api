// Rute utama
// Router utama
const mainRouter = require("express").Router();

// Sub-router
const pingRouter = require("./ping");
const vehicleRouter = require("./vehicles");
const userRouter = require("./users");
const categoryRouter = require("./categories");
const transactionRouter = require("./transactions");
const authRouter = require("./auth");

mainRouter.use("/", pingRouter);
mainRouter.use("/vehicles", vehicleRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/categories", categoryRouter);
mainRouter.use("/transactions", transactionRouter);
mainRouter.use("/auth", authRouter);

module.exports = mainRouter;
