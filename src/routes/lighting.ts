import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  lightVendor,
  allLigtVendor,
  createLightVendor,
  deleteLightVendor,
  updateLightVendor,
} from '../controller/lighting/vendor/lightVendorController';

import {
  lightingMaintenance,
  alllightingMaintenance,
  createMaintenancelighting,
  deletelightingMaintenance,
  updatelightingMaintenance,
} from '../controller/lighting/maintenance/lightMaintenanceController';

import {
  Lighting,
  allLighting,
  createLighting,
  deleteLighting,
  updateLighting,
} from '../controller/lighting/category/lightingController';

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
