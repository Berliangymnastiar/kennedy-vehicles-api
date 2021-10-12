const db = require("../database/mysql");

const createMessageModel = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO messages SET ?";
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const getMessageModel = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = `SELECT * FROM messages WHERE conversation_id = ?`;
    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = {
  createMessageModel,
  getMessageModel,
};
