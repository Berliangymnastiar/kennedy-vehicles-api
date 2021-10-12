const responseHelper = require("../helpers/response");
const messageModel = require("../models/messages");

const createMessage = (req, res) => {
  const { body } = req;

  messageModel
    .createMessageModel(body)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

const getMessage = (req, res) => {
  const { params } = req;

  messageModel
    .getMessageModel(params.conversationId)
    .then((data) => responseHelper.success(res, 200, data))
    .catch((err) => responseHelper.error(res, 500, err));
};

module.exports = {
  createMessage,
  getMessage,
};
