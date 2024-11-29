const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure storage location and filename format for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => { 
    const uploadPath = path.join(__dirname, '../uploads/documents');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);

  },
  filename: (req, file, cb) => {

    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName + path.extname(file.originalname)); // Add unique suffix to avoid name collisions
  
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept file
  } else {
    cb(new Error('Invalid file type. Only PDF and DOCX are allowed'), false); // Reject file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
});


module.exports = upload;
