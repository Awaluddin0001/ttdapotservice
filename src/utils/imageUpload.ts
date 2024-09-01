// src/utils/imageUpload.ts

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../../src/images');
    if (req.baseUrl.includes('electrical')) {
      uploadPath = path.join(uploadPath, '/electrical');
    } else if (req.baseUrl.includes('airconditioning')) {
      uploadPath = path.join(uploadPath, '/air_conditioning');
    } else if (req.baseUrl.includes('buildingfinishes')) {
      uploadPath = path.join(uploadPath, '/building_finishes');
    } else if (req.baseUrl.includes('conveyance')) {
      uploadPath = path.join(uploadPath, '/conveyance');
    } else if (req.baseUrl.includes('extinguish')) {
      uploadPath = path.join(uploadPath, '/extinguish');
    } else if (req.baseUrl.includes('fluid')) {
      uploadPath = path.join(uploadPath, '/fluid');
    } else if (req.baseUrl.includes('furniture')) {
      uploadPath = path.join(uploadPath, '/furniture');
    } else if (req.baseUrl.includes('lighting')) {
      uploadPath = path.join(uploadPath, '/lighting');
    } else if (req.baseUrl.includes('network')) {
      uploadPath = path.join(uploadPath, '/network');
    } else if (req.baseUrl.includes('pump')) {
      uploadPath = path.join(uploadPath, '/pump');
    } else if (req.baseUrl.includes('safety')) {
      uploadPath = path.join(uploadPath, '/safety');
    } else if (req.baseUrl.includes('security')) {
      uploadPath = path.join(uploadPath, '/security');
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
