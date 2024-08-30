import { Router } from 'express';
import { upload } from '@/utils/imageUpload';
import {
  FurnitureVendor,
  allFurnitureVendor,
  createFurnitureVendor,
  deleteFurnitureVendor,
  updateFurnitureVendor,
} from '../controller/furniture/vendor/furnitureVendorController';

import {
  allFurniture,
  Furniture,
  createFurniture,
  deleteFurniture,
  updateFurniture,
} from '../controller/furniture/category/furnitureController';

const furniture = Router();

// vendor rectifier
furniture.get('/vendors', allFurnitureVendor);
furniture.get('/vendor', FurnitureVendor);
furniture.post('/vendor', createFurnitureVendor);
furniture.put('/vendor', updateFurnitureVendor);
furniture.delete('/vendor', deleteFurnitureVendor);

// rackserver
furniture.get('/furnitures', allFurniture);
furniture.get('/furniture', Furniture);
furniture.post(
  '/furniture',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createFurniture,
);
furniture.put(
  '/furniture',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateFurniture,
);
furniture.delete('/furniture', deleteFurniture);

export default furniture;
