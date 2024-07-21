import { Router } from 'express';
import { upload } from '../utils/imageUpload';

import {
  lightVendor,
  allLigtVendor,
  createLightVendor,
  deleteLightVendor,
  updateLightVendor,
} from '../controller/lightVendorController';

import {
  lightingMaintenance,
  alllightingMaintenance,
  createMaintenancelighting,
  deletelightingMaintenance,
  updatelightingMaintenance,
} from '../controller/lightMaintenanceController';

import {
  Lighting,
  allBrandLighting,
  allLighting,
  brandLighting,
  createBrandLighting,
  createLighting,
  deleteBrandLighting,
  deleteLighting,
  updateBrandLighting,
  updateLighting,
} from '../controller/lightingController';

const lighting = Router();

// vendor security
lighting.get('/vendors', allLigtVendor);
lighting.get('/vendor', lightVendor);
lighting.post('/vendor', createLightVendor);
lighting.put('/vendor', updateLightVendor);
lighting.delete('/vendor', deleteLightVendor);

// maintenance security
lighting.get('/maintenances', alllightingMaintenance);
lighting.get('/maintenance', lightingMaintenance);
lighting.post('/maintenance', createMaintenancelighting);
lighting.put('/maintenance', updatelightingMaintenance);
lighting.delete('/maintenance', deletelightingMaintenance);

// lighting
lighting.get('/lightings', allLighting);
lighting.get('/lighting', Lighting);
lighting.post('/lighting', upload.array('images', 3), createLighting);
lighting.put('/lighting', upload.array('images', 3), updateLighting);
lighting.delete('/lighting', deleteLighting);

// lighting brand
lighting.get('/lighting/brands', allBrandLighting);
lighting.get('/lighting/brand', brandLighting);
lighting.post('/lighting/brand', createBrandLighting);
lighting.put('/lighting/brand', updateBrandLighting);
lighting.delete('/lighting/brand', deleteBrandLighting);

export default lighting;
