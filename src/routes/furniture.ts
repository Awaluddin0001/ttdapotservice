import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  allFurniture,
  Furniture,
  createFurniture,
  deleteFurniture,
  updateFurniture,
  Furnitures,
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

// vendor furniture
furniture.get('/vendors', allfurnitureVendor);
furniture.get('/vendor', furnitureVendor);
furniture.post('/vendor', createfurnitureVendor);
furniture.put('/vendor', updatefurnitureVendor);
furniture.delete('/vendor', deletefurnitureVendor);

// brand furniture
furniture.get('/brands', furnitureBrands);
furniture.get('/brand', furnitureBrand);
furniture.post('/brand', createFurnitureBrand);
furniture.put('/brand', updateFurnitureBrand);
furniture.delete('/brand', deleteFurnitureBrand);

// rackserver
furniture.get('/all', allFurniture);
furniture.get('/furnitures', Furnitures);
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
