const messageRouter = require("express").Router();
const messageController = require("../controllers/messages");

// add
messageRouter.post("/", messageController.createMessage);

// get
messageRouter.get("/:conversationId", messageController.getMessage);

module.exports = messageRouter;
