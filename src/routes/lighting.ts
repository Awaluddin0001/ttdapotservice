import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  lightingMaintenance,
  alllightingMaintenance,
  createMaintenancelighting,
  deletelightingMaintenance,
  updatelightingMaintenance,
} from '../controller/lighting/maintenance/lightMaintenanceController';

import {
  Lighting,
  Lightings,
  allLighting,
  createLighting,
  deleteLighting,
  updateLighting,
} from '../controller/lighting/category/lightingController';
import { uploadPdf } from '@/utils/pdfUpload';
import {
  alllightingVendor,
  createlightingVendor,
  deletelightingVendor,
  lightingVendor,
  updatelightingVendor,
} from '@/controller/lighting/vendor/lightVendorController';
import {
  createLightingBrand,
  deleteLightingBrand,
  lightingBrand,
  lightingBrands,
  updateLightingBrand,
} from '@/controller/lighting/brand/lightingBrandController';

const lighting = Router();

// vendor security
lighting.get('/vendors', alllightingVendor);
lighting.get('/vendor', lightingVendor);
lighting.post('/vendor', createlightingVendor);
lighting.put('/vendor', updatelightingVendor);
lighting.delete('/vendor', deletelightingVendor);

// brand security
lighting.get('/brands', lightingBrands);
lighting.get('/brand', lightingBrand);
lighting.post('/brand', createLightingBrand);
lighting.put('/brand', updateLightingBrand);
lighting.delete('/brand', deleteLightingBrand);

// maintenance security
lighting.get('/maintenances', alllightingMaintenance);
lighting.get('/maintenance', lightingMaintenance);
lighting.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenancelighting,
);
lighting.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updatelightingMaintenance,
);
lighting.delete('/maintenance', deletelightingMaintenance);

// lighting
lighting.get('/all', allLighting);
lighting.get('/lightings', Lightings);
lighting.get('/lighting', Lighting);
lighting.post(
  '/lighting',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createLighting,
);
lighting.put(
  '/lighting',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateLighting,
);
lighting.delete('/lighting', deleteLighting);

export default lighting;
