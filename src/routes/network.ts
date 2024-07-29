import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  securityVendor,
  allsecurityVendor,
  createsecurityVendor,
  deletesecurityVendor,
  updatesecurityVendor,
} from '../controller/security/vendor/securityVendorController';

import {
  createMaintenancesecurity,
  allsecurityMaintenance,
  deletesecurityMaintenance,
  securityMaintenance,
  updatesecurityMaintenance,
} from '../controller/security/maintenance/securityMaintenanceController';

import {
  Cctv,
  allBrandCctv,
  allCctv,
  brandCctv,
  createBrandCctv,
  createCctv,
  deleteBrandCctv,
  deleteCctv,
  updateBrandCctv,
  updateCctv,
} from '../controller/security/category/cctvController';

import {
  VideoRecording,
  allBrandVideoRecording,
  allVideoRecording,
  brandVideoRecording,
  createBrandVideoRecording,
  createVideoRecording,
  deleteBrandVideoRecording,
  deleteVideoRecording,
  updateBrandVideoRecording,
  updateVideoRecording,
} from '../controller/security/category/vicdeoRecordingController';

import {
  AccessControl,
  allAccessControl,
  allBrandAccessControl,
  brandAccessControl,
  createAccessControl,
  createBrandAccessControl,
  deleteAccessControl,
  deleteBrandAccessControl,
  updateAccessControl,
  updateBrandAccessControl,
} from '../controller/security/category/accessControlController';

import {
  Alarm,
  allAlarm,
  allBrandAlarm,
  brandAlarm,
  createAlarm,
  createBrandAlarm,
  deleteAlarm,
  deleteBrandAlarm,
  updateAlarm,
  updateBrandAlarm,
} from '../controller/security/category/alarmController';

import {
  Button,
  allBrandButton,
  allButton,
  brandButton,
  createBrandButton,
  createButton,
  deleteBrandButton,
  deleteButton,
  updateBrandButton,
  updateButton,
} from '../controller/security/category/buttonController';

import {
  Detektor,
  allBrandDetektor,
  allDetektor,
  brandDetektor,
  createBrandDetektor,
  createDetektor,
  deleteBrandDetektor,
  deleteDetektor,
  updateBrandDetektor,
  updateDetektor,
} from '../controller/security/category/detectorController';

import {
  Sound,
  allBrandSound,
  allSound,
  brandSound,
  createBrandSound,
  createSound,
  deleteBrandSound,
  deleteSound,
  updateBrandSound,
  updateSound,
} from '../controller/security/category/soundController';

const network = Router();

// vendor security
network.get('/vendors', allsecurityVendor);
network.get('/vendor', securityVendor);
network.post('/vendor', createsecurityVendor);
network.put('/vendor', updatesecurityVendor);
network.delete('/vendor', deletesecurityVendor);

// maintenance security
network.get('/maintenances', allsecurityMaintenance);
network.get('/maintenance', securityMaintenance);
network.post('/maintenance', createMaintenancesecurity);
network.put('/maintenance', updatesecurityMaintenance);
network.delete('/maintenance', deletesecurityMaintenance);

// cctv
network.get('/cctvs', allCctv);
network.get('/cctv', Cctv);
network.post('/cctv', upload.array('images', 3), createCctv);
network.put('/cctv', upload.array('images', 3), updateCctv);
network.delete('/cctv', deleteCctv);

// brand cctv
network.get('/cctv/brands', allBrandCctv);
network.get('/cctv/brand', brandCctv);
network.post('/cctv/brand', createBrandCctv);
network.put('/cctv/brand', updateBrandCctv);
network.delete('/cctv/brand', deleteBrandCctv);

// video recording
network.get('/videorecordings', allVideoRecording);
network.get('/videorecording', VideoRecording);
network.post(
  '/videorecording',
  upload.array('images', 3),
  createVideoRecording,
);
network.put('/videorecording', upload.array('images', 3), updateVideoRecording);
network.delete('/videorecording', deleteVideoRecording);

// brand video recording
network.get('/videorecording/brands', allBrandVideoRecording);
network.get('/videorecording/brand', brandVideoRecording);
network.post('/videorecording/brand', createBrandVideoRecording);
network.put('/videorecording/brand', updateBrandVideoRecording);
network.delete('/videorecording/brand', deleteBrandVideoRecording);

// access control
network.get('/accesscontrols', allAccessControl);
network.get('/accesscontrol', AccessControl);
network.post('/accesscontrol', upload.array('images', 3), createAccessControl);
network.put('/accesscontrol', upload.array('images', 3), updateAccessControl);
network.delete('/accesscontrol', deleteAccessControl);

// brand access control
network.get('/accesscontrol/brands', allBrandAccessControl);
network.get('/accesscontrol/brand', brandAccessControl);
network.post('/accesscontrol/brand', createBrandAccessControl);
network.put('/accesscontrol/brand', updateBrandAccessControl);
network.delete('/accesscontrol/brand', deleteBrandAccessControl);

// alarm
network.get('/alarms', allAlarm);
network.get('/alarm', Alarm);
network.post('/alarm', upload.array('images', 3), createAlarm);
network.put('/alarm', upload.array('images', 3), updateAlarm);
network.delete('/alarm', deleteAlarm);

// brand alarm
network.get('/alarm/brands', allBrandAlarm);
network.get('/alarm/brand', brandAlarm);
network.post('/alarm/brand', createBrandAlarm);
network.put('/alarm/brand', updateBrandAlarm);
network.delete('/alarm/brand', deleteBrandAlarm);

// button
network.get('/buttons', allButton);
network.get('/button', Button);
network.post('/button', upload.array('images', 3), createButton);
network.put('/button', upload.array('images', 3), updateButton);
network.delete('/button', deleteButton);

// brand button
network.get('/button/brands', allBrandButton);
network.get('/button/brand', brandButton);
network.post('/button/brand', createBrandButton);
network.put('/button/brand', updateBrandButton);
network.delete('/button/brand', deleteBrandButton);

// detektor
network.get('/detektors', allDetektor);
network.get('/detektor', Detektor);
network.post('/detektor', upload.array('images', 3), createDetektor);
network.put('/detektor', upload.array('images', 3), updateDetektor);
network.delete('/detektor', deleteDetektor);

// brand detektor
network.get('/detektor/brands', allBrandDetektor);
network.get('/detektor/brand', brandDetektor);
network.post('/detektor/brand', createBrandDetektor);
network.put('/detektor/brand', updateBrandDetektor);
network.delete('/detektor/brand', deleteBrandDetektor);

// sound
network.get('/sounds', allSound);
network.get('/sound', Sound);
network.post('/sound', upload.array('images', 3), createSound);
network.put('/sound', upload.array('images', 3), updateSound);
network.delete('/sound', deleteSound);

// brand sound
network.get('/sound/brands', allBrandSound);
network.get('/sound/brand', brandSound);
network.post('/sound/brand', createBrandSound);
network.put('/sound/brand', updateBrandSound);
network.delete('/sound/brand', deleteBrandSound);

export default network;
