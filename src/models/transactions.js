const db = require("../database/mysql");

const getAllTransactions = (inputValue) => {
  return new Promise((resolve, reject) => {
    let queryString =
      "SELECT t.id, u.name, u.email, u.phonenumber, u.address, u.gender, v.vehicle_name, v.price, t.date FROM vehicles v JOIN transactions t ON t.vehicle_id = v.id JOIN users u ON t.user_id = u.id WHERE v.vehicle_name LIKE ? ORDER BY t.date ASC";

    db.query(queryString, inputValue, (err, results) => {
      if (err) return err;
      return resolve(results);
    });
  });
};

const getTransactionById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString =
      "SELECT t.id, u.name, u.email, u.phonenumber, u.address, u.gender, v.vehicle_name, v.price, t.date FROM vehicles v JOIN transactions t ON t.vehicle_id = v.id JOIN users u ON t.user_id = u.id WHERE t.id = ? ORDER BY t.date ASC";
    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const createTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO transactions SET ?";
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const updateTransaction = (body, id) => {
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE transactions SET ? WHERE id = ?";
    db.query(queryString, [body, id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM transactions WHERE id = ?";
    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
