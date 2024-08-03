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
  allCctv,
  createCctv,
  deleteCctv,
  updateCctv,
} from '../controller/security/category/cctvController';

import {
  VideoRecording,
  allVideoRecording,
  createVideoRecording,
  deleteVideoRecording,
  updateVideoRecording,
} from '../controller/security/category/videoRecordingController';

import {
  AccessControl,
  allAccessControl,
  createAccessControl,
  deleteAccessControl,
  updateAccessControl,
} from '../controller/security/category/accessControlController';

import {
  Alarm,
  allAlarm,
  createAlarm,
  deleteAlarm,
  updateAlarm,
} from '../controller/security/category/alarmController';

import {
  Button,
  allButton,
  createButton,
  deleteButton,
  updateButton,
} from '../controller/security/category/buttonController';

import {
  Detektor,
  allDetektor,
  createDetektor,
  deleteDetektor,
  updateDetektor,
} from '../controller/security/category/detectorController';

import {
  Sound,
  allSound,
  createSound,
  deleteSound,
  updateSound,
} from '../controller/security/category/soundController';

const security = Router();

// vendor security
security.get('/vendors', allsecurityVendor);
security.get('/vendor', securityVendor);
security.post('/vendor', createsecurityVendor);
security.put('/vendor', updatesecurityVendor);
security.delete('/vendor', deletesecurityVendor);

// maintenance security
security.get('/maintenances', allsecurityMaintenance);
security.get('/maintenance', securityMaintenance);
security.post('/maintenance', createMaintenancesecurity);
security.put('/maintenance', updatesecurityMaintenance);
security.delete('/maintenance', deletesecurityMaintenance);

// cctv
security.get('/cctvs', allCctv);
security.get('/cctv', Cctv);
security.post('/cctv', upload.array('images', 3), createCctv);
security.put('/cctv', upload.array('images', 3), updateCctv);
security.delete('/cctv', deleteCctv);

// video recording
security.get('/videorecordings', allVideoRecording);
security.get('/videorecording', VideoRecording);
security.post(
  '/videorecording',
  upload.array('images', 3),
  createVideoRecording,
);
security.put(
  '/videorecording',
  upload.array('images', 3),
  updateVideoRecording,
);
security.delete('/videorecording', deleteVideoRecording);

// access control
security.get('/accesscontrols', allAccessControl);
security.get('/accesscontrol', AccessControl);
security.post('/accesscontrol', upload.array('images', 3), createAccessControl);
security.put('/accesscontrol', upload.array('images', 3), updateAccessControl);
security.delete('/accesscontrol', deleteAccessControl);

// alarm
security.get('/alarms', allAlarm);
security.get('/alarm', Alarm);
security.post('/alarm', upload.array('images', 3), createAlarm);
security.put('/alarm', upload.array('images', 3), updateAlarm);
security.delete('/alarm', deleteAlarm);

// button
security.get('/buttons', allButton);
security.get('/button', Button);
security.post('/button', upload.array('images', 3), createButton);
security.put('/button', upload.array('images', 3), updateButton);
security.delete('/button', deleteButton);

// detektor
security.get('/detektors', allDetektor);
security.get('/detektor', Detektor);
security.post('/detektor', upload.array('images', 3), createDetektor);
security.put('/detektor', upload.array('images', 3), updateDetektor);
security.delete('/detektor', deleteDetektor);

// sound
security.get('/sounds', allSound);
security.get('/sound', Sound);
security.post('/sound', upload.array('images', 3), createSound);
security.put('/sound', upload.array('images', 3), updateSound);
security.delete('/sound', deleteSound);

export default security;
