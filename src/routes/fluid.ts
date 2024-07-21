import { Router } from 'express';
import { upload } from '../utils/imageUpload';

import {
  FluidVendor,
  allFluidVendor,
  createFluidVendor,
  deleteFluidVendor,
  updateFluidVendor,
} from '../controller/fluidVendorController';

import {
  fluidMaintenance,
  allFluidMaintenance,
  createMaintenanceFluid,
  deleteFluidMaintenance,
  updateFluidMaintenance,
} from '../controller/fluidMaintenanceController';

import {
  Fluid,
  allFluid,
  createFluid,
  deleteFluid,
  updateFluid,
} from '../controller/fluidController';

const fluid = Router();

// vendor security
fluid.get('/vendors', allFluidVendor);
fluid.get('/vendor', FluidVendor);
fluid.post('/vendor', createFluidVendor);
fluid.put('/vendor', updateFluidVendor);
fluid.delete('/vendor', deleteFluidVendor);

// maintenance security
fluid.get('/maintenances', allFluidMaintenance);
fluid.get('/maintenance', fluidMaintenance);
fluid.post('/maintenance', createMaintenanceFluid);
fluid.put('/maintenance', updateFluidMaintenance);
fluid.delete('/maintenance', deleteFluidMaintenance);

// conveyance
fluid.get('/fluids', allFluid);
fluid.get('/fluid', Fluid);
fluid.post('/fluid', upload.array('images', 3), createFluid);
fluid.put('/fluid', upload.array('images', 3), updateFluid);
fluid.delete('/fluid', deleteFluid);

export default fluid;
