const db = require("../database/mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const getPassQs =
      "SELECT name, password, roles, gender FROM users WHERE email = ?";
    db.query(getPassQs, email, (err, result) => {
      if (err) return reject(err);
      if (!email) return reject("Please input email");
      if (!result.length) return reject(404);
      bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
        if (err) return reject(err);
        if (!password) return reject("Please input password");
        if (!isPasswordValid) return reject(401);
        const payload = {
          name: result[0].name,
          email,
          roles: result[0].roles,
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: "5h",
            issuer: "kennedy-vehicle",
          },
          (err, token) => {
            if (err) return reject(err);
            const queryGetUser = `SELECT id, name, email, picture, roles, gender, address FROM users WHERE email = "${email}"`;
            db.query(queryGetUser, (err, resultUser) => {
              if (err) return reject(err);
              return resolve({
                token: token,
                userInfo: resultUser,
              });
              // console.log(userInfo);
            });
            // return resolve(token);
          }
        );
      });
    });
    // const queryGetUser = `SELECT name, email, picture, roles FROM users WHERE email = "${email}"`;
    // db.query(queryGetUser, (err, result) => {
    //   if (err) return reject(err);
    //   return resolve(result);
    // });
  });
};

module.exports = {
  login,
};
