const conversationRouter = require("express").Router();
const conversationController = require("../controllers/conversations");

// new conv
conversationRouter.post("/", conversationController.createConversation);

// get conv of a user
conversationRouter.get(
  "/:userId",
  conversationController.getConversationByUser
);

module.exports = conversationRouter;
