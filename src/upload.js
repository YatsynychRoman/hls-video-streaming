const multer = require('multer');
const { extname } = require('node:path');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'raw/');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const ext = extname(file.originalname);
    if(ext !== '.mp4') {
      return cb(new Error('Only .mp4 videos are allowed'));
    }
    cb(null, true)
  }
}).single('video');

module.exports = upload;
