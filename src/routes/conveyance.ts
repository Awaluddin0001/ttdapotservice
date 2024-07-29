import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  conveyanceVendor,
  allconveyanceVendor,
  createconveyanceVendor,
  deleteconveyanceVendor,
  updateconveyanceVendor,
} from '../controller/conveyance/vendor/conveyanceVendorController';

import {
  allconveyanceMaintenance,
  conveyanceMaintenance,
  createMaintenanceconveyance,
  deleteconveyanceMaintenance,
  updateconveyanceMaintenance,
} from '../controller/conveyance/maintenance/conveyanceMaintenanceController';

import {
  Conveyance,
  allConveyance,
  createConveyance,
  deleteConveyance,
  updateConveyance,
} from '../controller/conveyance/category/conveyanceController';

const conveyance = Router();

// vendor security
conveyance.get('/vendors', allconveyanceVendor);
conveyance.get('/vendor', conveyanceVendor);
conveyance.post('/vendor', createconveyanceVendor);
conveyance.put('/vendor', updateconveyanceVendor);
conveyance.delete('/vendor', deleteconveyanceVendor);

// maintenance security
conveyance.get('/maintenances', allconveyanceMaintenance);
conveyance.get('/maintenance', conveyanceMaintenance);
conveyance.post('/maintenance', createMaintenanceconveyance);
conveyance.put('/maintenance', updateconveyanceMaintenance);
conveyance.delete('/maintenance', deleteconveyanceMaintenance);

// conveyance
conveyance.get('/conveyances', allConveyance);
conveyance.get('/conveyance', Conveyance);
conveyance.post('/conveyance', upload.array('images', 3), createConveyance);
conveyance.put('/conveyance', upload.array('images', 3), updateConveyance);
conveyance.delete('/conveyance', deleteConveyance);

export default conveyance;
