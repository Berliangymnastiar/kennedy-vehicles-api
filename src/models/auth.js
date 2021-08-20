const db = require("../database/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const getPassQs = "SELECT name, password, roles FROM users WHERE email = ?";
    db.query(getPassQs, email, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject("Email not found!");
      bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
        if (err) return reject(err);
        if (!isPasswordValid)
          return reject("Login failed or check your password!");
        const payload = {
          name: result[0].name,
          email,
          roles: result[0].roles,
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: "5m",
            issuer: "kennedy-vehicle",
          },
          (err, token) => {
            if (err) return reject(err);
            return resolve(token);
          }
        );
      });
    });
  });
};

module.exports = {
  login,
};
