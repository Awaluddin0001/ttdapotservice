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
  Pump,
  allBrandpump,
  allPump,
  brandpump,
  createBrandpump,
  createPump,
  deleteBrandpump,
  deletePump,
  updateBrandpump,
  updatePump,
} from '../controller/pump/category/pumpController';

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
extinguish.get('/pumps', allPump);
extinguish.get('/pump', Pump);
extinguish.post('/pump', upload.array('images', 3), createPump);
extinguish.put('/pump', upload.array('images', 3), updatePump);
extinguish.delete('/pump', deletePump);

// pump brand
extinguish.get('/pump/brands', allBrandpump);
extinguish.get('/pump/brand', brandpump);
extinguish.post('/pump/brand', createBrandpump);
extinguish.put('/pump/brand', updateBrandpump);
extinguish.delete('/pump/brand', deleteBrandpump);

export default extinguish;
