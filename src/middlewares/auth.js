const jwt = require("jsonwebtoken");

const responseHelper = require("../helpers/response");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken)
    return responseHelper.error(res, 401, "Please login first!");
  const token = bearerToken.split(" ")[1];
  jwt.verify(
    token,
    process.env.SECRET_KEY,
    {
      issuer: "kennedy-vehicle",
    },
    (err, payload) => {
      if (err) return responseHelper.error(res, 401, err);
      req.payload = payload;
      next();
    }
  );
};

module.exports = {
  checkToken,
};
