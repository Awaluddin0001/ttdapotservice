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
  Extinguishs,
  updateExtinguish,
} from '@/controller/extinguish/category/extinguishController';
import { uploadPdf } from '@/utils/pdfUpload';
import {
  createExtinguishBrand,
  deleteExtinguishBrand,
  extinguishBrand,
  extinguishBrands,
  updateExtinguishBrand,
} from '@/controller/extinguish/brand/extinguishBrandController';
import {
  createExtinguishType,
  deleteExtinguishType,
  extinguishType,
  extinguishTypes,
  updateExtinguishType,
} from '@/controller/extinguish/type/extinguishTypeController';

const extinguish = Router();

// vendor extinguish
extinguish.get('/vendors', allextinguishVendor);
extinguish.get('/vendor', extinguishVendor);
extinguish.post('/vendor', createextinguishVendor);
extinguish.put('/vendor', updateextinguishVendor);
extinguish.delete('/vendor', deleteextinguishVendor);
// brand extinguish
extinguish.get('/brands', extinguishBrands);
extinguish.get('/brand', extinguishBrand);
extinguish.post('/brand', createExtinguishBrand);
extinguish.put('/brand', updateExtinguishBrand);
extinguish.delete('/brand', deleteExtinguishBrand);
// type extinguish
extinguish.get('/types', extinguishTypes);
extinguish.get('/type', extinguishType);
extinguish.post('/type', createExtinguishType);
extinguish.put('/type', updateExtinguishType);
extinguish.delete('/type', deleteExtinguishType);

// maintenance extinguish
extinguish.get('/maintenances', allextinguishMaintenance);
extinguish.get('/maintenance', extinguishMaintenance);
extinguish.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenanceextinguish,
);
extinguish.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updateextinguishMaintenance,
);
extinguish.delete('/maintenance', deleteextinguishMaintenance);

// extinguish
extinguish.get('/all', allExtinguish);
extinguish.get('/extinguishs', Extinguishs);
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
