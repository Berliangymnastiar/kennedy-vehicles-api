const conversationModel = require("../models/conversations");
const responseHelper = require("../helpers/response");

const createConversation = (req, res) => {
  const { body } = req;

  conversationModel
    .createConversationModel(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getConversationByUser = (req, res) => {
  const { params } = req;

  conversationModel
    .getConversationByUserModel(params.userId)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  createConversation,
  getConversationByUser,
};
