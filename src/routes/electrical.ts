import { Router } from 'express';
import { upload } from '../utils/imageUpload';
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
} from '../controller/rectifierController';

import {
  allElectricalVendor,
  electricalVendor,
  deleteElectricalVendor,
  createElectricalVendor,
  updateElectricalVendor,
} from '../controller/electricalVendorController';

import {
  allElectricalMaintenance,
  electricalMaintenance,
  createMaintenanceElectrical,
  updateElectricalMaintenance,
  deleteElectricalMaintenance,
} from '../controller/electricalMaintenanceController';

import {
  allLinkElectrical,
  linkElectrical,
  createLinkElectrical,
  deleteLinkElectrical,
  updateLinkElectrical,
} from '../controller/electricalLinkController';

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
} from '../controller/batteryController';

import {
  allPanel,
  Panel,
  createPanel,
  deletePanel,
  updatePanel,
} from '../controller/panelController';

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
} from '../controller/upsController';

import {
  allTrafo,
  Trafo,
  createTrafo,
  deleteTrafo,
  updateTrafo,
} from '../controller/trafoController';

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
} from '../controller/gensetController';

import {
  allPdu,
  Pdu,
  allBrandPdu,
  brandPdu,
  createBrandPdu,
  createPdu,
  deleteBrandPdu,
  deletePdu,
  updateBrandPdu,
  updatePdu,
} from '../controller/pduController';

import {
  allCubicle,
  Cubicle,
  createCubicle,
  deleteCubicle,
  updateCubicle,
} from '../controller/cubicleController';

import {
  getElectricalImagesByAssetId,
  updateElectricalImages,
  uploadElectricalImage,
} from '../controller/electricalImageUploadController';

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
electrical.post('/rectifier', upload.array('images', 3), createRectifier);
electrical.put('/rectifier', upload.array('images', 3), updateRectifier);
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

// pdu
electrical.get('/pdus', allPdu);
electrical.get('/pdu', Pdu);
electrical.post('/pdu', upload.array('images', 3), createPdu);
electrical.put('/pdu', upload.array('images', 3), updatePdu);
electrical.delete('/pdu', deletePdu);

// brand pdu
electrical.get('/pdu/brands', allBrandPdu);
electrical.get('/pdu/brand', brandPdu);
electrical.post('/pdu/brand', createBrandPdu);
electrical.put('/pdu/brand', updateBrandPdu);
electrical.delete('/pdu/brand', deleteBrandPdu);

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
