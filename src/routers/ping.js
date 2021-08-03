// Sub-router utk test ping
const pingRouter = require("express").Router();

const pingController = require("../controllers/ping");

pingRouter.get("/", pingController.greeting);

module.exports = pingRouter;
