import { NextFunction, Request, Response, Router } from 'express';
import { uploadPdf } from '@/utils/pdfUpload';

import {
  allLicenses,
  createMaintenancelicense,
  deletelicenseMaintenance,
  licenseMaintenance,
  updatelicenseMaintenance,
} from '@/controller/licenses/licensesController';
import { licenseUpload } from '@/utils/licenseUpload';

const license = Router();

// maintenance license
license.get('/licenses', allLicenses);
license.get('/license', licenseMaintenance);
license.post(
  '/license',
  licenseUpload.single('document_name'),
  createMaintenancelicense,
);
license.put(
  '/license',
  licenseUpload.single('document_name'),
  updatelicenseMaintenance,
);
license.delete('/license', deletelicenseMaintenance);

export default license;
