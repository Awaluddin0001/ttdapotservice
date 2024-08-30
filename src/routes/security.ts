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
security.post(
  '/cctv',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createCctv,
);
security.put(
  '/cctv',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateCctv,
);
security.delete('/cctv', deleteCctv);

// video recording
security.get('/videorecordings', allVideoRecording);
security.get('/videorecording', VideoRecording);
security.post(
  '/videorecording',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createVideoRecording,
);
security.put(
  '/videorecording',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateVideoRecording,
);
security.delete('/videorecording', deleteVideoRecording);

// access control
security.get('/accesscontrols', allAccessControl);
security.get('/accesscontrol', AccessControl);
security.post(
  '/accesscontrol',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createAccessControl,
);
security.put(
  '/accesscontrol',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateAccessControl,
);
security.delete('/accesscontrol', deleteAccessControl);

// alarm
security.get('/alarms', allAlarm);
security.get('/alarm', Alarm);
security.post(
  '/alarm',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createAlarm,
);
security.put(
  '/alarm',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateAlarm,
);
security.delete('/alarm', deleteAlarm);

// button
security.get('/buttons', allButton);
security.get('/button', Button);
security.post(
  '/button',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createButton,
);
security.put(
  '/button',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateButton,
);
security.delete('/button', deleteButton);

// detektor
security.get('/detektors', allDetektor);
security.get('/detektor', Detektor);
security.post(
  '/detektor',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createDetektor,
);
security.put(
  '/detektor',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateDetektor,
);
security.delete('/detektor', deleteDetektor);

// sound
security.get('/sounds', allSound);
security.get('/sound', Sound);
security.post(
  '/sound',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createSound,
);
security.put(
  '/sound',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateSound,
);
security.delete('/sound', deleteSound);

export default security;
