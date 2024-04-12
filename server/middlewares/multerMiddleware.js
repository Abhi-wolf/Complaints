const multer=require('multer');
const fs = require('fs');
const destination = './temp';

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destination);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  }
});
const upload = multer({ storage });
module.exports=upload;