// src/utils/pdfUpload.ts

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../../src/documents/licenses');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    return cb(null, `${req.body.name}.pdf`);
  },
});

const licenseUpload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const validTypes = ['application/pdf'];
    if (!validTypes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type. Only PDF is allowed.'));
    }
    cb(null, true);
  },
});

export { licenseUpload };
