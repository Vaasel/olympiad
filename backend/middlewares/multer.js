const multer = require('multer');
const path = require('path');

const singleEventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/singleEvent')); // Store files in the "uploads" folder within the project directory.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/posts')); // Store files in the "uploads" folder within the project directory.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const singleUpload = multer({ storage: singleEventStorage }).single('image');
const multipleUpload = multer({ storage: postStorage }).array('images', 10);

module.exports = singleUpload
module.exports = multipleUpload