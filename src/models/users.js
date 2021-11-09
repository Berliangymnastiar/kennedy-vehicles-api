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
    const getQuerySelect = "SELECT email FROM users WHERE email = ?";
    db.query(getQuerySelect, body.email, (err, result) => {
      if (err) return reject(err);
      if (result[0]?.email !== undefined) return reject(409);
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
          if (!isPasswordValid) return reject(403);
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

const forgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;

    const queryString = "SELECT id FROM users WHERE email = ?";
    db.query(queryString, email, (err, results) => {
      if (err) return reject(err);
      if (!results.length) return reject(404);
      const min = Math.ceil(111111);
      const max = Math.floor(999999);
      const code = Math.floor(Math.random() * (max - min) + min);
      const codeForgotPass =
        "INSERT INTO forgot_password (user_id, code) VALUES (? ,?)";
      db.query(codeForgotPass, [results[0].id, code], (err, res) => {
        if (err) return reject(err);
        return resolve("Code has sent to database");
      });
    });
  });
};

const checkCodeForgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email, code } = body;

    const queryString = "SELECT id FROM users WHERE email = ?";
    db.query(queryString, email, (err, results) => {
      if (err) return reject(err);
      const id = results[0].id;
      const checkCode =
        "SELECT code FROM forgot_password WHERE id = (SELECT max(id) FROM forgot_password) AND user_id = ? AND code = ?";
      db.query(checkCode, [id, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        return resolve("check code success");
      });
    });
  });
};

const changePassword = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email, password } = body;
    const queryString = "SELECT id FROM users WHERE email = ?";
    db.query(queryString, email, (err, result) => {
      if (err) return reject(err);
      const id = result[0].id;
      const checkCode =
        "SELECT code FROM forgot_password WHERE id = (SELECT max(id) FROM forgot_password) AND user_id = ? AND code = ?";
      db.query(checkCode, [id, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        const queryUpdatePass = "UPDATE users SET ? WHERE email = ?";
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) return reject(err);
          const newPassword = {
            password: hash,
          };
          db.query(queryUpdatePass, [newPassword, email], (err, result) => {
            if (err) return reject(err);
            return resolve("Password sudah diganti");
          });
        });
      });
    });
  });
};

const updateUser = (body, params) => {
  return new Promise((resolve, reject) => {
    const queryString = "UPDATE users SET ? WHERE id = ?";
    db.query(queryString, [body, params.id], (err, results) => {
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
  forgotPassword,
  checkCodeForgotPassword,
  changePassword,
  deleteUser,
};
