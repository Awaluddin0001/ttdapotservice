import { Router } from 'express';
import { upload } from '../utils/imageUpload';

import {
  airconditioningVendor,
  allairconditioningVendor,
  createairconditioningVendor,
  deleteairconditioningVendor,
  updateairconditioningVendor,
} from '../controller/airconditioningVendorController';

import {
  airconditioningMaintenance,
  allairconditioningMaintenance,
  createMaintenanceairconditioning,
  deleteairconditioningMaintenance,
  updateairconditioningMaintenance,
} from '../controller/airconditioningMaintenanceController';

import {
  Air,
  allAir,
  allBrandAir,
  brandAir,
  createAir,
  createBrandAir,
  deleteAir,
  deleteBrandAir,
  updateAir,
  updateBrandAir,
} from '../controller/airController';

import {
  Heater,
  allHeater,
  createHeater,
  deleteHeater,
  updateHeater,
} from '../controller/heaterController';

import {
  Cooling,
  allBrandCooling,
  allCooling,
  allmodelCooling,
  brandCooling,
  createBrandCooling,
  createCooling,
  createmodelCooling,
  deleteBrandCooling,
  deleteCooling,
  deletemodelCooling,
  modelCooling,
  updateBrandCooling,
  updateCooling,
  updatemodelCooling,
} from '../controller/coolingController';

const ac = Router();

// vendor security
ac.get('/vendors', allairconditioningVendor);
ac.get('/vendor', airconditioningVendor);
ac.post('/vendor', createairconditioningVendor);
ac.put('/vendor', updateairconditioningVendor);
ac.delete('/vendor', deleteairconditioningVendor);

// maintenance security
ac.get('/maintenances', allairconditioningMaintenance);
ac.get('/maintenance', airconditioningMaintenance);
ac.post('/maintenance', createMaintenanceairconditioning);
ac.put('/maintenance', updateairconditioningMaintenance);
ac.delete('/maintenance', deleteairconditioningMaintenance);

// air
ac.get('/airs', allAir);
ac.get('/air', Air);
ac.post('/air', upload.array('images', 3), createAir);
ac.put('/air', upload.array('images', 3), updateAir);
ac.delete('/air', deleteAir);

// brand air
ac.get('/air/brands', allBrandAir);
ac.get('/air/brand', brandAir);
ac.post('/air/brand', createBrandAir);
ac.put('/air/brand', updateBrandAir);
ac.delete('/air/brand', deleteBrandAir);

// heater
ac.get('/heaters', allHeater);
ac.get('/heater', Heater);
ac.post('/heater', upload.array('images', 3), createHeater);
ac.put('/heater', upload.array('images', 3), updateHeater);
ac.delete('/heater', deleteHeater);

// cooling
ac.get('/coolings', allCooling);
ac.get('/cooling', Cooling);
ac.post('/cooling', upload.array('images', 3), createCooling);
ac.put('/cooling', upload.array('images', 3), updateCooling);
ac.delete('/cooling', deleteCooling);

// brand cooling
ac.get('/cooling/brands', allBrandCooling);
ac.get('/cooling/brand', brandCooling);
ac.post('/cooling/brand', createBrandCooling);
ac.put('/cooling/brand', updateBrandCooling);
ac.delete('/cooling/brand', deleteBrandCooling);

// model cooling
ac.get('/cooling/models', allmodelCooling);
ac.get('/cooling/model', modelCooling);
ac.post('/cooling/model', createmodelCooling);
ac.put('/cooling/model', updatemodelCooling);
ac.delete('/cooling/model', deletemodelCooling);

export default ac;
