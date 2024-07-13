import { Router } from 'express';
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
electrical.post('/rectifier', createRectifier);
electrical.put('/rectifier', updateRectifier);
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
electrical.post('/battery', createBattery);
electrical.put('/battery', updateBattery);
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
electrical.post('/panel', createPanel);
electrical.put('/panel', updatePanel);
electrical.delete('/panel', deletePanel);

// ups
electrical.get('/upsies', allUps);
electrical.get('/ups', Ups);
electrical.post('/ups', createUps);
electrical.put('/ups', updateUps);
electrical.delete('/ups', deleteUps);

// brand ups
electrical.get('/ups/brands', allBrandUps);
electrical.get('/ups/brand', brandUps);
electrical.post('/ups/brand', createBrandUps);
electrical.put('/ups/brand', updateBrandUps);
electrical.delete('/ups/brand', deleteBrandUps);

// trafo
electrical.get('/trafos', allTrafo);
electrical.get('/trafo', Trafo);
electrical.post('/trafo', createTrafo);
electrical.put('/trafo', updateTrafo);
electrical.delete('/trafo', deleteTrafo);

export default electrical;
