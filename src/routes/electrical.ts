import { Router } from 'express';
import { upload } from '@/utils/imageUpload';
import {
  allRectifier,
  Rectifier,
  createRectifier,
  updateRectifier,
  deleteRectifier,
} from '@/controller/electrical/category/rectifierController';

import {
  electricalVendor,
  deleteElectricalVendor,
  createElectricalVendor,
  updateElectricalVendor,
  electricalVendors,
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
  createBattery,
  deleteBattery,
  updateBattery,
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
  createGenset,
  deleteGenset,
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

import {
  electricalBrands,
  electricalBrand,
  createElectricalBrand,
  deleteElectricalBrand,
  updateElectricalBrand,
} from '@/controller/electrical/brand/electricalBrandController';
import {
  createElectricalType,
  deleteElectricalType,
  electricalSubCategories,
  electricalType,
  electricalTypes,
  updateElectricalType,
} from '@/controller/electrical/type/electricalTypeController';
import { uploadPdf } from '@/utils/pdfUpload';

const electrical = Router();

// vendor electrical
electrical.get('/vendors', electricalVendors);
electrical.get('/vendor', electricalVendor);
electrical.post('/vendor', createElectricalVendor);
electrical.put('/vendor', updateElectricalVendor);
electrical.delete('/vendor', deleteElectricalVendor);

// maintenance electrical
electrical.get('/maintenances', allElectricalMaintenance);
electrical.get('/maintenance', electricalMaintenance);
electrical.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenanceElectrical,
);
electrical.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updateElectricalMaintenance,
);
electrical.delete('/maintenance', deleteElectricalMaintenance);

// link electrical
electrical.get('/links', allLinkElectrical);
electrical.get('/link', linkElectrical);
electrical.post('/link', createLinkElectrical);
electrical.put('/link', updateLinkElectrical);
electrical.delete('/link', deleteLinkElectrical);

// brand electrical
electrical.get('/brands', electricalBrands);
electrical.get('/brand', electricalBrand);
electrical.post('/brand', createElectricalBrand);
electrical.put('/brand', updateElectricalBrand);
electrical.delete('/brand', deleteElectricalBrand);

// type electrical
electrical.get('/types', electricalTypes);
electrical.get('/type', electricalType);
electrical.post('/type', createElectricalType);
electrical.put('/type', updateElectricalType);
electrical.delete('/type', deleteElectricalType);

// sub category electrical
electrical.get('/subcategories', electricalSubCategories);

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

// Battery
electrical.get('/batteries', allBattery);
electrical.get('/battery', Battery);
electrical.post('/battery', upload.array('images', 3), createBattery);
electrical.put('/battery', upload.array('images', 3), updateBattery);
electrical.delete('/battery', deleteBattery);

// panel
electrical.get('/panels', allPanel);
electrical.get('/panel', Panel);
electrical.post('/panel', upload.array('images', 3), createPanel);
electrical.put('/panel', upload.array('images', 3), updatePanel);
electrical.delete('/panel', deletePanel);

// ups
electrical.get('/upses', allUps);
electrical.get('/ups', Ups);
electrical.post('/ups', upload.array('images', 3), createUps);
electrical.put('/ups', upload.array('images', 3), updateUps);
electrical.delete('/ups', deleteUps);

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

// images
electrical.get('/images', getElectricalImagesByAssetId);
electrical.post('/images', upload.array('images', 3), uploadElectricalImage);
electrical.put('/images', upload.array('images', 3), updateElectricalImages);

export default electrical;
