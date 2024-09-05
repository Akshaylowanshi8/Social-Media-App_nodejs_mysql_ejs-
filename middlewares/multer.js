const multer = require('multer');
const path = require('path');

// Define the upload directory
const uploadDirectory = path.join(__dirname, '../public/images');

// Filter to accept only image files
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Please upload only images.'), false);
  }
};

// Configure storage with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory); // Use the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`); // Generate a unique filename
  },
});

// Create the multer upload instance
const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;
