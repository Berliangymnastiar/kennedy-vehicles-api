const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const formatImg = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;
    cb(null, formatImg);
  },
});

const upload = multer({
  storage,
});

module.exports = upload;
