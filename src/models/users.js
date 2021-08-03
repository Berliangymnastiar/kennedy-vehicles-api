const db = require("../database/mysql");

const getAllUsers = (inputValue) => {
  return new Promise((resolve, reject) => {
    let queryString = "SELECT * FROM users WHERE name LIKE ?";
    db.query(queryString, inputValue, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = "SELECT * FROM users WHERE id = ?";
    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const createUser = (body) => {
  return new Promise((resolve, reject) => {
    const queryString = "INSERT INTO users SET ?";
    db.query(queryString, body, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const updateUser = (body, id) => {
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE users SET ? WHERE id = ?";
    db.query(queryString, [body, id], (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    const queryString = "DELETE FROM users WHERE id = ?";
    db.query(queryString, id, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
