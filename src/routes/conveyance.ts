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
import {
  conveyanceBrand,
  conveyanceBrands,
  createConveyanceBrand,
  deleteConveyanceBrand,
  updateConveyanceBrand,
} from '@/controller/conveyance/brand/electricalBrandController';
import {
  conveyanceType,
  conveyanceTypes,
  createConveyanceType,
  deleteConveyanceType,
  updateConveyanceType,
} from '@/controller/conveyance/type/conveyanceTypeController';
import { uploadPdf } from '@/utils/pdfUpload';

const conveyance = Router();

// vendor conveyance
conveyance.get('/vendors', allconveyanceVendor);
conveyance.get('/vendor', conveyanceVendor);
conveyance.post('/vendor', createconveyanceVendor);
conveyance.put('/vendor', updateconveyanceVendor);
conveyance.delete('/vendor', deleteconveyanceVendor);

// brand conveyance
conveyance.get('/brands', conveyanceBrands);
conveyance.get('/brand', conveyanceBrand);
conveyance.post('/brand', createConveyanceBrand);
conveyance.put('/brand', updateConveyanceBrand);
conveyance.delete('/brand', deleteConveyanceBrand);

// brand conveyance
conveyance.get('/types', conveyanceTypes);
conveyance.get('/type', conveyanceType);
conveyance.post('/type', createConveyanceType);
conveyance.put('/type', updateConveyanceType);
conveyance.delete('/type', deleteConveyanceType);

// maintenance conveyance
conveyance.get('/maintenances', allconveyanceMaintenance);
conveyance.get('/maintenance', conveyanceMaintenance);
conveyance.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenanceconveyance,
);
conveyance.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updateconveyanceMaintenance,
);
conveyance.delete('/maintenance', deleteconveyanceMaintenance);

// conveyance
conveyance.get('/all', allConveyance);
conveyance.get('/conveyances', allConveyance);
conveyance.get('/conveyance', Conveyance);
conveyance.post(
  '/conveyance',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createConveyance,
);
conveyance.put(
  '/conveyance',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateConveyance,
);
conveyance.delete('/conveyance', deleteConveyance);

export default conveyance;
