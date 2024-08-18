import { Router } from 'express';
import { upload } from '@/utils/imageUpload';
import {
  allRectifier,
  Rectifier,
  createRectifier,
  updateRectifier,
  deleteRectifier,
  exportRectifierCsv,
  exportRectifierXlsx,
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
  exportBatteryCsv,
  exportBatteryXlsx,
  updateBattery,
} from '@/controller/electrical/category/batteryController';

import {
  allPanel,
  Panel,
  createPanel,
  deletePanel,
  updatePanel,
  exportPanelCsv,
  exportPanelXlsx,
} from '@/controller/electrical/category/panelController';

import {
  allUps,
  Ups,
  createUps,
  deleteUps,
  updateUps,
  exportUpsCsv,
  exportUpsXlsx,
} from '@/controller/electrical/category/upsController';

import {
  allTrafo,
  Trafo,
  createTrafo,
  deleteTrafo,
  updateTrafo,
  exportTrafoCsv,
  exportTrafoXlsx,
} from '@/controller/electrical/category/trafoController';

import {
  allGenset,
  Genset,
  createGenset,
  deleteGenset,
  updateGenset,
  exportGensetCsv,
  exportGensetXlsx,
} from '@/controller/electrical/category/gensetController';

import {
  Lvmdp,
  allLvmdp,
  createLvmdp,
  deleteLvmdp,
  exportLvmdpCsv,
  exportLvmdpXlsx,
  updateLvmdp,
} from '@/controller/electrical/category/lvmdpController';

import {
  allCubicle,
  Cubicle,
  createCubicle,
  deleteCubicle,
  updateCubicle,
  exportCubicleCsv,
  exportCubicleXlsx,
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
import { allElectrical } from '@/controller/electrical/category/electricalController';

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

// electrical
electrical.get('/all', allElectrical);

// Rectifier
electrical.get('/rectifiers', allRectifier);
electrical.get('/rectifier', Rectifier);
electrical.get('/rectifier-export-csv', exportRectifierCsv);
electrical.get('/rectifier-export-xlsx', exportRectifierXlsx);
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
electrical.get('/battery-export-csv', exportBatteryCsv);
electrical.get('/battery-export-xlsx', exportBatteryXlsx);
electrical.post(
  '/battery',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createBattery,
);
electrical.put(
  '/battery',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateBattery,
);
electrical.delete('/battery', deleteBattery);

// panel
electrical.get('/panels', allPanel);
electrical.get('/panel', Panel);
electrical.get('/panel-export-csv', exportPanelCsv);
electrical.get('/panel-export-xlsx', exportPanelXlsx);
electrical.post(
  '/panel',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createPanel,
);
electrical.put(
  '/panel',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updatePanel,
);
electrical.delete('/panel', deletePanel);

// ups
electrical.get('/upses', allUps);
electrical.get('/ups', Ups);
electrical.get('/ups-export-csv', exportUpsCsv);
electrical.get('/ups-export-xlsx', exportUpsXlsx);
electrical.post(
  '/ups',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createUps,
);
electrical.put(
  '/ups',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateUps,
);
electrical.delete('/ups', deleteUps);

// trafo
electrical.get('/trafos', allTrafo);
electrical.get('/trafo', Trafo);
electrical.get('/trafo-export-csv', exportTrafoCsv);
electrical.get('/trafo-export-xlsx', exportTrafoXlsx);
electrical.post(
  '/trafo',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createTrafo,
);
electrical.put(
  '/trafo',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateTrafo,
);
electrical.delete('/trafo', deleteTrafo);

// genset
electrical.get('/gensets', allGenset);
electrical.get('/genset', Genset);
electrical.get('/genset-export-csv', exportGensetCsv);
electrical.get('/genset-export-xlsx', exportGensetXlsx);
electrical.post(
  '/genset',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createGenset,
);
electrical.put(
  '/genset',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateGenset,
);
electrical.delete('/genset', deleteGenset);

// lvmdp
electrical.get('/lvmdps', allLvmdp);
electrical.get('/lvmdp', Lvmdp);
electrical.get('/lvmdp-export-csv', exportLvmdpCsv);
electrical.get('/lvmdp-export-xlsx', exportLvmdpXlsx);
electrical.post(
  '/lvmdp',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createLvmdp,
);
electrical.put(
  '/lvmdp',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateLvmdp,
);
electrical.delete('/lvmdp', deleteLvmdp);

// pdu
electrical.get('/cubicles', allCubicle);
electrical.get('/cubicle', Cubicle);
electrical.get('/cubicle-export-csv', exportCubicleCsv);
electrical.get('/cubicle-export-xlsx', exportCubicleXlsx);
electrical.post(
  '/cubicle',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createCubicle,
);
electrical.put(
  '/cubicle',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateCubicle,
);
electrical.delete('/cubicle', deleteCubicle);

// images
electrical.get('/images', getElectricalImagesByAssetId);
electrical.post(
  '/images',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  uploadElectricalImage,
);
electrical.put(
  '/images',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateElectricalImages,
);

export default electrical;
