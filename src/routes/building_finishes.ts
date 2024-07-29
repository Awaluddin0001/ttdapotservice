import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  buildingfinishesVendor,
  allbuildingfinishesVendor,
  createbuildingfinishesVendor,
  deletebuildingfinishesVendor,
  updatebuildingfinishesVendor,
} from '../controller/finishing_building/vendor/buildingFinisherVendorController';

import {
  buildingfinisherMaintenance,
  allbuildingfinisherMaintenance,
  createMaintenancebuildingfinisher,
  deletebuildingfinisherMaintenance,
  updatebuildingfinisherMaintenance,
} from '../controller/finishing_building/maintenance/buildingFinisherMaintenanceController';

import {
  Ceiling,
  allCeiling,
  createCeiling,
  deleteCeiling,
  updateCeiling,
} from '../controller/finishing_building/category/ceilingController';

import {
  Ceramic,
  allCeramic,
  createCeramic,
  deleteCeramic,
  updateCeramic,
} from '../controller/finishing_building/category/ceramicController';

import {
  door,
  alldoor,
  createdoor,
  deletedoor,
  updatedoor,
} from '../controller/finishing_building/category/doorController';

import {
  window,
  allwindow,
  createwindow,
  deletewindow,
  updatewindow,
} from '../controller/finishing_building/category/windowController';

import {
  wallpaper,
  allwallpaper,
  createwallpaper,
  deletewallpaper,
  updatewallpaper,
} from '../controller/finishing_building/category/wallpaperController';

import {
  mebel,
  allmebel,
  createmebel,
  deletemebel,
  updatemebel,
} from '../controller/finishing_building/category/mebelController';

const building_finishes = Router();

// vendor security
building_finishes.get('/vendors', allbuildingfinishesVendor);
building_finishes.get('/vendor', buildingfinishesVendor);
building_finishes.post('/vendor', createbuildingfinishesVendor);
building_finishes.put('/vendor', updatebuildingfinishesVendor);
building_finishes.delete('/vendor', deletebuildingfinishesVendor);

// maintenance security
building_finishes.get('/maintenances', allbuildingfinisherMaintenance);
building_finishes.get('/maintenance', buildingfinisherMaintenance);
building_finishes.post('/maintenance', createMaintenancebuildingfinisher);
building_finishes.put('/maintenance', updatebuildingfinisherMaintenance);
building_finishes.delete('/maintenance', deletebuildingfinisherMaintenance);

// ceiling
building_finishes.get('/ceilings', allCeiling);
building_finishes.get('/ceiling', Ceiling);
building_finishes.post('/ceiling', upload.array('images', 3), createCeiling);
building_finishes.put('/ceiling', upload.array('images', 3), updateCeiling);
building_finishes.delete('/ceiling', deleteCeiling);

// ceramic
building_finishes.get('/ceramics', allCeramic);
building_finishes.get('/ceramic', Ceramic);
building_finishes.post('/ceramic', upload.array('images', 3), createCeramic);
building_finishes.put('/ceramic', upload.array('images', 3), updateCeramic);
building_finishes.delete('/ceramic', deleteCeramic);

// door
building_finishes.get('/doors', alldoor);
building_finishes.get('/door', door);
building_finishes.post('/door', upload.array('images', 3), createdoor);
building_finishes.put('/door', upload.array('images', 3), updatedoor);
building_finishes.delete('/door', deletedoor);

// window
building_finishes.get('/windows', allwindow);
building_finishes.get('/window', window);
building_finishes.post('/window', upload.array('images', 3), createwindow);
building_finishes.put('/window', upload.array('images', 3), updatewindow);
building_finishes.delete('/window', deletewindow);

// wallpaper
building_finishes.get('/wallpapers', allwallpaper);
building_finishes.get('/wallpaper', wallpaper);
building_finishes.post(
  '/wallpaper',
  upload.array('images', 3),
  createwallpaper,
);
building_finishes.put('/wallpaper', upload.array('images', 3), updatewallpaper);
building_finishes.delete('/wallpaper', deletewallpaper);

// mebel
building_finishes.get('/mebels', allmebel);
building_finishes.get('/mebel', mebel);
building_finishes.post('/mebel', upload.array('images', 3), createmebel);
building_finishes.put('/mebel', upload.array('images', 3), updatemebel);
building_finishes.delete('/mebel', deletemebel);

export default building_finishes;
