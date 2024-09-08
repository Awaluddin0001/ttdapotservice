import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  Safety,
  Safetys,
  allSafety,
  createSafety,
  deleteSafety,
  updateSafety,
} from '../controller/safety/category/safetyController';
import {
  createSafetyBrand,
  deleteSafetyBrand,
  safetyBrand,
  safetyBrands,
  updateSafetyBrand,
} from '@/controller/safety/brand/safetyBrandController';
import {
  allsafetyVendor,
  createsafetyVendor,
  deletesafetyVendor,
  safetyVendor,
  updatesafetyVendor,
} from '@/controller/safety/vendor/safetyVendorController';

const safety = Router();

// vendor furniture
safety.get('/vendors', allsafetyVendor);
safety.get('/vendor', safetyVendor);
safety.post('/vendor', createsafetyVendor);
safety.put('/vendor', updatesafetyVendor);
safety.delete('/vendor', deletesafetyVendor);

// brand safety
safety.get('/brands', safetyBrands);
safety.get('/brand', safetyBrand);
safety.post('/brand', createSafetyBrand);
safety.put('/brand', updateSafetyBrand);
safety.delete('/brand', deleteSafetyBrand);

// safety
safety.get('/safetys', Safetys);
safety.get('/safety', Safety);
safety.post(
  '/safety',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createSafety,
);
safety.put(
  '/safety',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateSafety,
);
safety.delete('/safety', deleteSafety);

export default safety;
