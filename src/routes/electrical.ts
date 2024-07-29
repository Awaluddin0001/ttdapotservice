import { Router } from 'express';
import { upload } from '@/utils/imageUpload';
import {
  allRectifier,
  Rectifier,
  createRectifier,
  updateRectifier,
  deleteRectifier,
  allBrandRecti,
  brandRectifier,
  createBrandRectifier,
  updateBrandRectifier,
  deleteBrandRectifier,
} from '@/controller/electrical/category/rectifierController';

import {
  allElectricalVendor,
  electricalVendor,
  deleteElectricalVendor,
  createElectricalVendor,
  updateElectricalVendor,
} from '@/controller/electrical/vendor/electricalVendorController';

import {
  allElectricalMaintenance,
  electricalMaintenance,
  createMaintenanceElectrical,
  updateElectricalMaintenance,
  deleteElectricalMaintenance,
} from '@/controller/electrical/maintenance/electricalMaintenanceController';

import {
  allLinkElectrical,
  linkElectrical,
  createLinkElectrical,
  deleteLinkElectrical,
  updateLinkElectrical,
} from '@/controller/electrical/link/electricalLinkController';

import {
  allBattery,
  Battery,
  allBrandBattery,
  brandBattery,
  createBattery,
  createBrandBattery,
  deleteBattery,
  deleteBrandBattery,
  updateBattery,
  updateBrandBattery,
} from '@/controller/electrical/category/batteryController';

import {
  allPanel,
  Panel,
  createPanel,
  deletePanel,
  updatePanel,
} from '@/controller/electrical/category/panelController';

import {
  allUps,
  Ups,
  createUps,
  deleteUps,
  updateUps,
  allBrandUps,
  brandUps,
  createBrandUps,
  deleteBrandUps,
  updateBrandUps,
} from '@/controller/electrical/category/upsController';

import {
  allTrafo,
  Trafo,
  createTrafo,
  deleteTrafo,
  updateTrafo,
} from '@/controller/electrical/category/trafoController';

import {
  allGenset,
  Genset,
  allBrandGenset,
  brandGenset,
  createBrandGenset,
  createGenset,
  deleteBrandGenset,
  deleteGenset,
  updateBrandGenset,
  updateGenset,
} from '@/controller/electrical/category/gensetController';

import {
  Lvmdp,
  allLvmdp,
  createLvmdp,
  deleteLvmdp,
  updateLvmdp,
} from '@/controller/electrical/category/lvmdpController';

import {
  allCubicle,
  Cubicle,
  createCubicle,
  deleteCubicle,
  updateCubicle,
} from '@/controller/electrical/category/cubicleController';

import {
  getElectricalImagesByAssetId,
  updateElectricalImages,
  uploadElectricalImage,
} from '@/controller/electrical/image/electricalImageUploadController';

const electrical = Router();

// vendor rectifier
electrical.get('/vendors', allElectricalVendor);
electrical.get('/vendor', electricalVendor);
electrical.post('/vendor', createElectricalVendor);
electrical.put('/vendor', updateElectricalVendor);
electrical.delete('/vendor', deleteElectricalVendor);

// maintenance rectifier
electrical.get('/maintenances', allElectricalMaintenance);
electrical.get('/maintenance', electricalMaintenance);
electrical.post('/maintenance', createMaintenanceElectrical);
electrical.put('/maintenance', updateElectricalMaintenance);
electrical.delete('/maintenance', deleteElectricalMaintenance);

// link rectifier
electrical.get('/links', allLinkElectrical);
electrical.get('/link', linkElectrical);
electrical.post('/link', createLinkElectrical);
electrical.put('/link', updateLinkElectrical);
electrical.delete('/link', deleteLinkElectrical);

// Rectifier
electrical.get('/rectifiers', allRectifier);
electrical.get('/rectifier', Rectifier);
electrical.post(
  '/rectifier',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createRectifier,
);
electrical.put(
  '/rectifier',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateRectifier,
);
electrical.delete('/rectifier', deleteRectifier);

// brand rectifier
electrical.get('/rectifier/brands', allBrandRecti);
electrical.get('/rectifier/brand', brandRectifier);
electrical.post('/rectifier/brand', createBrandRectifier);
electrical.put('/rectifier/brand', updateBrandRectifier);
electrical.delete('/rectifier/brand', deleteBrandRectifier);

// Battery
electrical.get('/batteries', allBattery);
electrical.get('/battery', Battery);
electrical.post('/battery', upload.array('images', 3), createBattery);
electrical.put('/battery', upload.array('images', 3), updateBattery);
electrical.delete('/battery', deleteBattery);

// brand Battery
electrical.get('/battery/brands', allBrandBattery);
electrical.get('/battery/brand', brandBattery);
electrical.post('/battery/brand', createBrandBattery);
electrical.put('/battery/brand', updateBrandBattery);
electrical.delete('/battery/brand', deleteBrandBattery);

// panel
electrical.get('/panels', allPanel);
electrical.get('/panel', Panel);
electrical.post('/panel', upload.array('images', 3), createPanel);
electrical.put('/panel', upload.array('images', 3), updatePanel);
electrical.delete('/panel', deletePanel);

// ups
electrical.get('/upsies', allUps);
electrical.get('/ups', Ups);
electrical.post('/ups', upload.array('images', 3), createUps);
electrical.put('/ups', upload.array('images', 3), updateUps);
electrical.delete('/ups', deleteUps);

// brand ups
electrical.get('/ups/brands', allBrandUps);
electrical.get('/ups/brand', brandUps);
electrical.post('/ups/brand', upload.array('images', 3), createBrandUps);
electrical.put('/ups/brand', upload.array('images', 3), updateBrandUps);
electrical.delete('/ups/brand', deleteBrandUps);

// trafo
electrical.get('/trafos', allTrafo);
electrical.get('/trafo', Trafo);
electrical.post('/trafo', upload.array('images', 3), createTrafo);
electrical.put('/trafo', upload.array('images', 3), updateTrafo);
electrical.delete('/trafo', deleteTrafo);

// genset
electrical.get('/gensets', allGenset);
electrical.get('/genset', Genset);
electrical.post('/genset', upload.array('images', 3), createGenset);
electrical.put('/genset', upload.array('images', 3), updateGenset);
electrical.delete('/genset', deleteGenset);

// brand genset
electrical.get('/genset/brands', allBrandGenset);
electrical.get('/genset/brand', brandGenset);
electrical.post('/genset/brand', createBrandGenset);
electrical.put('/genset/brand', updateBrandGenset);
electrical.delete('/genset/brand', deleteBrandGenset);

// lvmdp
electrical.get('/lvmdps', allLvmdp);
electrical.get('/lvmdp', Lvmdp);
electrical.post('/lvmdp', upload.array('images', 3), createLvmdp);
electrical.put('/lvmdp', upload.array('images', 3), updateLvmdp);
electrical.delete('/lvmdp', deleteLvmdp);

// pdu
electrical.get('/cubicles', allCubicle);
electrical.get('/cubicle', Cubicle);
electrical.post('/cubicle', upload.array('images', 3), createCubicle);
electrical.put('/cubicle', upload.array('images', 3), updateCubicle);
electrical.delete('/cubicle', deleteCubicle);

electrical.post('/images', upload.array('images', 3), uploadElectricalImage);
electrical.get('/images', getElectricalImagesByAssetId);
electrical.put('/images', upload.array('images', 3), updateElectricalImages);

export default electrical;
