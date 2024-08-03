import { Router } from 'express';
import { upload } from '@/utils/imageUpload';
import {
  airconditioningVendor,
  allairconditioningVendor,
  createairconditioningVendor,
  deleteairconditioningVendor,
  updateairconditioningVendor,
} from '../controller/air_conditioning/vendor/airconditioningVendorController';

import {
  airconditioningMaintenance,
  allairconditioningMaintenance,
  createMaintenanceairconditioning,
  deleteairconditioningMaintenance,
  updateairconditioningMaintenance,
} from '../controller/air_conditioning/maintenance/airconditioningMaintenanceController';

import {
  Air,
  allAir,
  createAir,
  deleteAir,
  updateAir,
} from '../controller/air_conditioning/category/airController';

import {
  Heater,
  allHeater,
  createHeater,
  deleteHeater,
  updateHeater,
} from '../controller/air_conditioning/category/heaterController';

import {
  Cooling,
  allCooling,
  createCooling,
  deleteCooling,
  updateCooling,
} from '../controller/air_conditioning/category/coolingController';
import {
  airConditioningBrand,
  airConditioningBrands,
  createAirConditioningBrand,
  deleteAirConditioningBrand,
  updateAirConditioningBrand,
} from '@/controller/air_conditioning/brand/airConditioningBrandController';
import {
  airConditioningTypes,
  airConditioningType,
  createAirConditioningType,
  deleteAirConditioningType,
  updateAirConditioningType,
} from '@/controller/air_conditioning/type/airConditioningTypeController';

const ac = Router();

// vendor ac
ac.get('/vendors', allairconditioningVendor);
ac.get('/vendor', airconditioningVendor);
ac.post('/vendor', createairconditioningVendor);
ac.put('/vendor', updateairconditioningVendor);
ac.delete('/vendor', deleteairconditioningVendor);

// maintenance ac
ac.get('/maintenances', allairconditioningMaintenance);
ac.get('/maintenance', airconditioningMaintenance);
ac.post('/maintenance', createMaintenanceairconditioning);
ac.put('/maintenance', updateairconditioningMaintenance);
ac.delete('/maintenance', deleteairconditioningMaintenance);

// brand ac
ac.get('/brands', airConditioningBrands);
ac.get('/brand', airConditioningBrand);
ac.post('/brand', createAirConditioningBrand);
ac.put('/brand', updateAirConditioningBrand);
ac.delete('/brand', deleteAirConditioningBrand);

// type cooling
ac.get('/types', airConditioningTypes);
ac.get('/type', airConditioningType);
ac.post('/type', createAirConditioningType);
ac.put('/type', updateAirConditioningType);
ac.delete('/type', deleteAirConditioningType);

// air
ac.get('/airs', allAir);
ac.get('/air', Air);
ac.post('/air', upload.array('images', 3), createAir);
ac.put('/air', upload.array('images', 3), updateAir);
ac.delete('/air', deleteAir);

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

export default ac;
