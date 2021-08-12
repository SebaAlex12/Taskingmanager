const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const path = "./client/public/files/" + req.params.dest.replace("-", "/");
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    const miniPath = path + "/mini/";
    if (!fs.existsSync(miniPath)) {
      fs.mkdirSync(miniPath);
    }
    cb(null, path);
    // cb(null, "./client/public/files/" + req.params.dest.replace("-", "/"));
  },
  filename: function(req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  }
});

function sanitizeFile(file, cb) {
  // Define the allowed extension
  let fileExts = ["png", "jpg", "jpeg", "gif"];
  // Check allowed extensions
  let isAllowedExt = fileExts.includes(
    file.originalname.split(".")[1].toLowerCase()
  );
  // Mime type must be an file
  let isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb("Error: File type not allowed!");
  }
}

module.exports = {
  upload: multer({
    storage: storage,
    limits: {
      fileSize: 10000000
    },
    fileFilter: function(req, file, cb) {
      sanitizeFile(file, cb);
    }
  }).array("files"),
  resize: function(path, format, width, height) {
    const readStream = fs.createReadStream(path);
    let transform = sharp();

    if (format) {
      transform = transform.toFormat(format);
    }

    if (width || height) {
      transform = transform.resize(width, height);
    }

    return readStream.pipe(transform);
  }
};
