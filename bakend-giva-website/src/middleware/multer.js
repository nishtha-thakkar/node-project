const multer = require("multer");

const storage = multer.memoryStorage(); // to store img temporary in Ram

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // max 5 mb img allow
  },
  fileFilter: (req, file, cb) => {
    if (["image/jpeg", "image/png"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG images are allowed"));
    }
  }
});

module.exports = upload;