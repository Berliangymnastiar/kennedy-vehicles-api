const chatRouter = require("express").Router();
const chatController = require("../controllers/chat");

chatRouter.get("/latest/:id", chatController.getLatestChat);
chatRouter.get("/", chatController.getChat);
chatRouter.post("/", chatController.postChat);

module.exports = chatRouter;
