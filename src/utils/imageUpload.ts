// src/utils/imageUpload.ts

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../../src/images');
    if (req.url.includes('electrical')) {
      uploadPath = path.join(uploadPath, '/electrical');
    } else if (req.url.includes('air_conditioning')) {
      uploadPath = path.join(uploadPath, '/air_conditioning');
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.mimetype)) {
      return cb(
        new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'),
      );
    }
    cb(null, true);
  },
});

export { upload };
