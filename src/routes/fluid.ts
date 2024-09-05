import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  Fluid,
  allFluid,
  createFluid,
  deleteFluid,
  updateFluid,
} from '../controller/fluid/category/fluidController';
import { uploadPdf } from '@/utils/pdfUpload';
import {
  allfluidVendor,
  createfluidVendor,
  deletefluidVendor,
  fluidVendor,
  updatefluidVendor,
} from '@/controller/fluid/vendor/fluidVendorController';
import {
  allfluidMaintenance,
  createMaintenancefluid,
  deletefluidMaintenance,
  fluidMaintenance,
  updatefluidMaintenance,
} from '@/controller/fluid/maintenance/fluidMaintenanceController';
import {
  createFluidBrand,
  deleteFluidBrand,
  fluidBrand,
  fluidBrands,
  updateFluidBrand,
} from '@/controller/fluid/brand/fluidBrandController';

const fluid = Router();

// vendor security
fluid.get('/vendors', allfluidVendor);
fluid.get('/vendor', fluidVendor);
fluid.post('/vendor', createfluidVendor);
fluid.put('/vendor', updatefluidVendor);
fluid.delete('/vendor', deletefluidVendor);

// brand security
fluid.get('/brands', fluidBrands);
fluid.get('/brand', fluidBrand);
fluid.post('/brand', createFluidBrand);
fluid.put('/brand', updateFluidBrand);
fluid.delete('/brand', deleteFluidBrand);

// maintenance security
fluid.get('/maintenances', allfluidMaintenance);
fluid.get('/maintenance', fluidMaintenance);
fluid.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenancefluid,
);
fluid.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updatefluidMaintenance,
);
fluid.delete('/maintenance', deletefluidMaintenance);

// conveyance
fluid.get('/fluids', allFluid);
fluid.get('/fluid', Fluid);
fluid.post(
  '/fluid',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createFluid,
);
fluid.put(
  '/fluid',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateFluid,
);
fluid.delete('/fluid', deleteFluid);

export default fluid;
