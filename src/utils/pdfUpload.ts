// src/utils/pdfUpload.ts

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../../src/documents/maintenance');
    if (req.url.includes('electrical')) {
      uploadPath = path.join(uploadPath, '/electrical');
    } else if (req.url.includes('airconditioning')) {
      uploadPath = path.join(uploadPath, '/air_conditioning');
    } else if (req.url.includes('buildingfinishes')) {
      uploadPath = path.join(uploadPath, '/building_finishes');
    } else if (req.url.includes('conveyance')) {
      uploadPath = path.join(uploadPath, '/conveyance');
    } else if (req.url.includes('extinguish')) {
      uploadPath = path.join(uploadPath, '/extinguish');
    } else if (req.url.includes('fluid')) {
      uploadPath = path.join(uploadPath, '/fluid');
    } else if (req.url.includes('furniture')) {
      uploadPath = path.join(uploadPath, '/furniture');
    } else if (req.url.includes('lighting')) {
      uploadPath = path.join(uploadPath, '/lighting');
    } else if (req.url.includes('network')) {
      uploadPath = path.join(uploadPath, '/network');
    } else if (req.url.includes('pump')) {
      uploadPath = path.join(uploadPath, '/pump');
    } else if (req.url.includes('safety')) {
      uploadPath = path.join(uploadPath, '/safety');
    } else if (req.url.includes('security')) {
      uploadPath = path.join(uploadPath, '/security');
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadPdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const validTypes = ['application/pdf'];
    if (!validTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only PDF is allowed.'));
    }
    cb(null, true);
  },
});

export { uploadPdf };
