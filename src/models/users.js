const db = require("../database/mysql");
const bcrypt = require("bcrypt");

const getAllUsers = (query) => {
  return new Promise((resolve, reject) => {
    let queryString =
      `SELECT * FROM users WHERE name LIKE ?` +
      (query?.filter ? ` AND gender = '${query.filter}' ` : " ") +
      (query?.order_by && query?.sort
        ? ` ORDER BY ${query.order_by} ${query.sort} `
        : " ") +
      `LIMIT ? OFFSET ?`;

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 3;
    const offset = limit * (page - 1);
    const countQs = 'SELECT count(*) AS "total_data" FROM users';

    let inputValue = `%${query.name || ""}%`;
    db.query(queryString, [inputValue, limit, offset], (err, resultGet) => {
      if (err) return reject(err);
      db.query(countQs, (err, resultCount) => {
        if (err) return reject(err);
        return resolve({
          data: resultGet,
          count: resultCount,
          limit,
          page,
        });
      });
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
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);
      bcrypt.hash(body.password, salt, (error, hash) => {
        if (error) return reject(error);
        const userData = {
          ...body,
          password: hash,
        };
        db.query(queryString, userData, (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        });
      });
    });
  });
};

const updatePassword = (body, id) => {
  return new Promise((resolve, reject) => {
    const { oldPassword, newPassword } = body;
    const getPasswordQs = "SELECT password FROM users where id = ?";
    const updateQs = "UPDATE users SET ? WHERE id = ?";
    db.query(getPasswordQs, id, (err, result) => {
      if (err) return reject(err);
      bcrypt.compare(
        oldPassword,
        result[0].password,
        (err, isPasswordValid) => {
          if (err) return reject(err);
          if (!isPasswordValid) return reject("Wrong Password!");
          bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) return reject(err);
            const newPassword = { password: hash };
            db.query(updateQs, [newPassword, id], (err, result) => {
              if (err) return reject(err);
              return resolve(result);
            });
          });
        }
      );
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
  updatePassword,
  updateUser,
  deleteUser,
};
