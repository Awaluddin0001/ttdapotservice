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
  allPump,
  createPump,
  deletePump,
  updatePump,
} from '../controller/pump/category/pumpController';

const pump = Router();

// vendor security
pump.get('/vendors', allpumpVendor);
pump.get('/vendor', pumpVendor);
pump.post('/vendor', createpumpVendor);
pump.put('/vendor', updatepumpVendor);
pump.delete('/vendor', deletepumpVendor);

// maintenance security
pump.get('/maintenances', allpumpMaintenance);
pump.get('/maintenance', pumpMaintenance);
pump.post('/maintenance', createMaintenancepump);
pump.put('/maintenance', updatepumpMaintenance);
pump.delete('/maintenance', deletepumpMaintenance);

// pump
pump.get('/pumps', allPump);
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
