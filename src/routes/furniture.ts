import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  allFurniture,
  Furniture,
  createFurniture,
  deleteFurniture,
  updateFurniture,
} from '../controller/furniture/category/furnitureController';
import {
  allfurnitureVendor,
  createfurnitureVendor,
  deletefurnitureVendor,
  furnitureVendor,
  updatefurnitureVendor,
} from '@/controller/furniture/vendor/furnitureVendorController';
import {
  createFurnitureBrand,
  deleteFurnitureBrand,
  furnitureBrand,
  furnitureBrands,
  updateFurnitureBrand,
} from '@/controller/furniture/brand/furnitureBrandController';

const furniture = Router();

// vendor rectifier
furniture.get('/vendors', allfurnitureVendor);
furniture.get('/vendor', furnitureVendor);
furniture.post('/vendor', createfurnitureVendor);
furniture.put('/vendor', updatefurnitureVendor);
furniture.delete('/vendor', deletefurnitureVendor);
// brand rectifier
furniture.get('/brands', furnitureBrands);
furniture.get('/brand', furnitureBrand);
furniture.post('/brand', createFurnitureBrand);
furniture.put('/brand', updateFurnitureBrand);
furniture.delete('/brand', deleteFurnitureBrand);

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
