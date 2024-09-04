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
import { allFinishing } from '@/controller/finishing_building/category/finishingController';
import {
  buildingFinishesBrand,
  buildingFinishesBrands,
  createBuildingFinishesBrand,
  deleteBuildingFinishesBrand,
  updateBuildingFinishesBrand,
} from '@/controller/finishing_building/brand/finishingBrandController';
import {
  budildingSubCategories,
  budildingType,
  budildingTypes,
  createBudildingType,
  deleteBudildingType,
  updateBudildingType,
} from '@/controller/finishing_building/type/finishingTypeController';
import { uploadPdf } from '@/utils/pdfUpload';
import {
  allDoor,
  createDoor,
  deleteDoor,
  Door,
  updateDoor,
} from '@/controller/finishing_building/category/doorController';
import {
  allWindow,
  createWindow,
  deleteWindow,
  updateWindow,
  Window,
} from '@/controller/finishing_building/category/windowController';
import {
  allWallpaper,
  createWallpaper,
  deleteWallpaper,
  updateWallpaper,
  Wallpaper,
} from '@/controller/finishing_building/category/wallpaperController';
import {
  allMebel,
  createMebel,
  deleteMebel,
  Mebel,
  updateMebel,
} from '@/controller/finishing_building/category/mebelController';

const building_finishes = Router();

// vendor security
building_finishes.get('/vendors', allbuildingfinishesVendor);
building_finishes.get('/vendor', buildingfinishesVendor);
building_finishes.post('/vendor', createbuildingfinishesVendor);
building_finishes.put('/vendor', updatebuildingfinishesVendor);
building_finishes.delete('/vendor', deletebuildingfinishesVendor);

// brand security
building_finishes.get('/brands', buildingFinishesBrands);
building_finishes.get('/brand', buildingFinishesBrand);
building_finishes.post('/brand', createBuildingFinishesBrand);
building_finishes.put('/brand', updateBuildingFinishesBrand);
building_finishes.delete('/brand', deleteBuildingFinishesBrand);
// brand security
building_finishes.get('/types', budildingTypes);
building_finishes.get('/type', budildingType);
building_finishes.post('/type', createBudildingType);
building_finishes.put('/type', updateBudildingType);
building_finishes.delete('/type', deleteBudildingType);
building_finishes.get('/subcategories', budildingSubCategories);

// maintenance security
building_finishes.get('/maintenances', allbuildingfinisherMaintenance);
building_finishes.get('/maintenance', buildingfinisherMaintenance);
building_finishes.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenancebuildingfinisher,
);
building_finishes.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updatebuildingfinisherMaintenance,
);
building_finishes.delete('/maintenance', deletebuildingfinisherMaintenance);

building_finishes.get('/all', allFinishing);

// ceiling
building_finishes.get('/ceilings', allCeiling);
building_finishes.get('/ceiling', Ceiling);
building_finishes.post(
  '/ceiling',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createCeiling,
);
building_finishes.put(
  '/ceiling',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateCeiling,
);
building_finishes.delete('/ceiling', deleteCeiling);

// ceramic
building_finishes.get('/ceramics', allCeramic);
building_finishes.get('/ceramic', Ceramic);
building_finishes.post(
  '/ceramic',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createCeramic,
);
building_finishes.put(
  '/ceramic',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateCeramic,
);
building_finishes.delete('/ceramic', deleteCeramic);

// door
building_finishes.get('/doors', allDoor);
building_finishes.get('/door', Door);
building_finishes.post(
  '/door',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createDoor,
);
building_finishes.put(
  '/door',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateDoor,
);
building_finishes.delete('/door', deleteDoor);

// window
building_finishes.get('/windows', allWindow);
building_finishes.get('/window', Window);
building_finishes.post(
  '/window',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createWindow,
);
building_finishes.put(
  '/window',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateWindow,
);
building_finishes.delete('/window', deleteWindow);

// wallpaper
building_finishes.get('/wallpapers', allWallpaper);
building_finishes.get('/wallpaper', Wallpaper);
building_finishes.post(
  '/wallpaper',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createWallpaper,
);
building_finishes.put(
  '/wallpaper',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateWallpaper,
);
building_finishes.delete('/wallpaper', deleteWallpaper);

// mebel
building_finishes.get('/mebels', allMebel);
building_finishes.get('/mebel', Mebel);
building_finishes.post(
  '/mebel',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createMebel,
);
building_finishes.put(
  '/mebel',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateMebel,
);
building_finishes.delete('/mebel', deleteMebel);

export default building_finishes;
