const db = require("../database/mysql");

const createConversationModel = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO conversations SET ?";
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const getConversationByUserModel = (id) => {
  return new Promise((resolve, reject) => {
    const queryStringSender = `SELECT c.id AS 'conversation_id', u.id, u.name, u.email, c.sender_id, c.receiver_id FROM conversations c JOIN users u ON c.receiver_id = u.id WHERE c.sender_id = ?`;
    db.query(queryStringSender, id, (err, resultsSender) => {
      if (err) return reject(err);
      const queryStringReceiver = `SELECT c.id AS 'conversation_id', u.id, u.name, u.email, c.sender_id, c.receiver_id FROM conversations c JOIN users u ON c.sender_id = u.id WHERE c.receiver_id = ?`;
      db.query(queryStringReceiver, id, (err, resultsReceiver) => {
        if (err) return reject(err);
        return resolve({ resultsSender, resultsReceiver });
      });
    });
  });
};

module.exports = {
  createConversationModel,
  getConversationByUserModel,
};
