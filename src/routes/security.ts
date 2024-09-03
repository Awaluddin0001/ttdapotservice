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
  Detector,
  allDetector,
  createDetector,
  deleteDetector,
  updateDetector,
} from '../controller/security/category/detectorController';

import {
  Sound,
  allSound,
  createSound,
  deleteSound,
  updateSound,
} from '../controller/security/category/soundController';
import { allSecurity } from '@/controller/security/category/secuirtyController';
import {
  createSecurityBrand,
  deleteSecurityBrand,
  securityBrand,
  securityBrands,
  updateSecurityBrand,
} from '@/controller/security/brand/securityBrandController';
import {
  createSecurityType,
  deleteSecurityType,
  securitySubCategories,
  securityType,
  securityTypes,
  updateSecurityType,
} from '@/controller/security/type/securityTypeController';
import { uploadPdf } from '@/utils/pdfUpload';
import {
  allSecurityLink,
  createSecurityLink,
  deleteSecurityLink,
  SecurityLink,
  updateSecurityLink,
} from '@/controller/security/link/securityLinkController';

const security = Router();

// vendor security
security.get('/vendors', allsecurityVendor);
security.get('/vendor', securityVendor);
security.post('/vendor', createsecurityVendor);
security.put('/vendor', updatesecurityVendor);
security.delete('/vendor', deletesecurityVendor);

// brand security
security.get('/brands', securityBrands);
security.get('/brand', securityBrand);
security.post('/brand', createSecurityBrand);
security.put('/brand', updateSecurityBrand);
security.delete('/brand', deleteSecurityBrand);

// type security
security.get('/types', securityTypes);
security.get('/type', securityType);
security.post('/type', createSecurityType);
security.put('/type', updateSecurityType);
security.delete('/type', deleteSecurityType);
// sub category security
security.get('/subcategories', securitySubCategories);

// maintenance security
security.get('/maintenances', allsecurityMaintenance);
security.get('/maintenance', securityMaintenance);
security.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenancesecurity,
);
security.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updatesecurityMaintenance,
);
security.delete('/maintenance', deletesecurityMaintenance);

// link security
security.get('/links', allSecurityLink);
security.get('/link', SecurityLink);
security.post('/link', createSecurityLink);
security.put('/link', updateSecurityLink);
security.delete('/link', deleteSecurityLink);

// security
security.get('/all', allSecurity);

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
security.get('/detectors', allDetector);
security.get('/detector', Detector);
security.post(
  '/detector',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createDetector,
);
security.put(
  '/detector',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateDetector,
);
security.delete('/detector', deleteDetector);

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
