import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  pumpVendor,
  allpumpVendor,
  createpumpVendor,
  deletepumpVendor,
  updatepumpVendor,
} from '../controller/pump/vendor/pumpVendorController';

import {
  pumpMaintenance,
  allpumpMaintenance,
  createMaintenancepump,
  deletepumpMaintenance,
  updatepumpMaintenance,
} from '../controller/pump/maintenance/pumpMaintenanceController';

import {
  Pump,
  Pumps,
  allPump,
  createPump,
  deletePump,
  updatePump,
} from '../controller/pump/category/pumpController';
import { uploadPdf } from '@/utils/pdfUpload';
import {
  createPumpBrand,
  deletePumpBrand,
  pumpBrand,
  pumpBrands,
  updatePumpBrand,
} from '@/controller/pump/brand/fluidBrandController';

const pump = Router();

// vendor security
pump.get('/vendors', allpumpVendor);
pump.get('/vendor', pumpVendor);
pump.post('/vendor', createpumpVendor);
pump.put('/vendor', updatepumpVendor);
pump.delete('/vendor', deletepumpVendor);
// brand security
pump.get('/brands', pumpBrands);
pump.get('/brand', pumpBrand);
pump.post('/brand', createPumpBrand);
pump.put('/brand', updatePumpBrand);
pump.delete('/brand', deletePumpBrand);

// maintenance security
pump.get('/maintenances', allpumpMaintenance);
pump.get('/maintenance', pumpMaintenance);
pump.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenancepump,
);
pump.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updatepumpMaintenance,
);
pump.delete('/maintenance', deletepumpMaintenance);

// pump
pump.get('/all', allPump);
pump.get('/pumps', Pumps);
pump.get('/pump', Pump);
pump.post(
  '/pump',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createPump,
);
pump.put(
  '/pump',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updatePump,
);
pump.delete('/pump', deletePump);

export default pump;
