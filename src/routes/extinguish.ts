import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  extinguishVendor,
  allextinguishVendor,
  createextinguishVendor,
  deleteextinguishVendor,
  updateextinguishVendor,
} from '../controller/extinguish/vendor/extinguishVendorController';

import {
  extinguishMaintenance,
  allextinguishMaintenance,
  createMaintenanceextinguish,
  deleteextinguishMaintenance,
  updateextinguishMaintenance,
} from '../controller/extinguish/maintenance/extinguishMaintenanceController';

import {
  allExtinguish,
  createExtinguish,
  deleteExtinguish,
  Extinguish,
  updateExtinguish,
} from '@/controller/extinguish/category/extinguishController';

const extinguish = Router();

// vendor security
extinguish.get('/vendors', allextinguishVendor);
extinguish.get('/vendor', extinguishVendor);
extinguish.post('/vendor', createextinguishVendor);
extinguish.put('/vendor', updateextinguishVendor);
extinguish.delete('/vendor', deleteextinguishVendor);

// maintenance security
extinguish.get('/maintenances', allextinguishMaintenance);
extinguish.get('/maintenance', extinguishMaintenance);
extinguish.post('/maintenance', createMaintenanceextinguish);
extinguish.put('/maintenance', updateextinguishMaintenance);
extinguish.delete('/maintenance', deleteextinguishMaintenance);

// pump
extinguish.get('/extinguishs', allExtinguish);
extinguish.get('/extinguish', Extinguish);
extinguish.post(
  '/extinguish',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createExtinguish,
);
extinguish.put(
  '/extinguish',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateExtinguish,
);
extinguish.delete('/extinguish', deleteExtinguish);

export default extinguish;
