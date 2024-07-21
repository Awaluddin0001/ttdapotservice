import { Router } from 'express';
import { upload } from '../utils/imageUpload';
import {
  NetworkVendor,
  allNetworkVendor,
  createNetworkVendor,
  deleteNetworkVendor,
  updateNetworkVendor,
} from '../controller/networkVendorController';

import {
  NetworkMaintenance,
  allNetworkMaintenance,
  createMaintenanceNetwork,
  deleteNetworkMaintenance,
  updateNetworkMaintenance,
} from '../controller/networkMaintenanceController';

import {
  linkNetwork,
  allLinkNetwork,
  createLinkNetwork,
  deleteLinkNetwork,
  updateLinkNetwork,
} from '../controller/networkLinkController';

import {
  allRackserver,
  Rackserver,
  allBrandRackserver,
  brandRackserver,
  createRackserver,
  updateRackserver,
  createBrandRackserver,
  deleteBrandRackserver,
  deleteRackserver,
  updateBrandRackserver,
} from '../controller/rackserverController';

import {
  allStorage,
  Storage,
  allBrandStorage,
  brandStorage,
  createBrandStorage,
  createStorage,
  deleteBrandStorage,
  deleteStorage,
  updateBrandStorage,
  updateStorage,
} from '../controller/storageController';

import {
  allNetworkswitch,
  Networkswitch,
  allBrandNetworkswitch,
  brandNetworkswitch,
  createBrandNetworkswitch,
  createNetworkswitch,
  deleteBrandNetworkswitch,
  deleteNetworkswitch,
  updateBrandNetworkswitch,
  updateNetworkswitch,
} from '../controller/networkswitchController';

import {
  allRouter,
  Router as routes,
  allBrandRouter,
  brandRouter,
  createBrandRouter,
  createRouter,
  deleteBrandRouter,
  deleteRouter,
  updateBrandRouter,
  updateRouter,
} from '../controller/routerController';

import {
  Firewall,
  allBrandFirewall,
  allFirewall,
  brandFirewall,
  createBrandFirewall,
  createFirewall,
  deleteBrandFirewall,
  deleteFirewall,
  updateBrandFirewall,
  updateFirewall,
} from '../controller/firewallController';

import {
  Patchpanels,
  allBrandPatchpanels,
  allPatchpanels,
  brandPatchpanels,
  createBrandPatchpanels,
  createPatchpanels,
  deleteBrandPatchpanels,
  deletePatchpanels,
  updateBrandPatchpanels,
  updatePatchpanels,
} from '../controller/patchpanelsController';

import {
  Computer,
  allComputer,
  createComputer,
  deleteComputer,
  updateComputer,
} from '../controller/computerController';

const security = Router();

// vendor rectifier
security.get('/vendors', allNetworkVendor);
security.get('/vendor', NetworkVendor);
security.post('/vendor', createNetworkVendor);
security.put('/vendor', updateNetworkVendor);
security.delete('/vendor', deleteNetworkVendor);

// maintenance rectifier
security.get('/maintenances', allNetworkMaintenance);
security.get('/maintenance', NetworkMaintenance);
security.post('/maintenance', createMaintenanceNetwork);
security.put('/maintenance', updateNetworkMaintenance);
security.delete('/maintenance', deleteNetworkMaintenance);

// link rectifier
security.get('/links', allLinkNetwork);
security.get('/link', linkNetwork);
security.post('/link', createLinkNetwork);
security.put('/link', updateLinkNetwork);
security.delete('/link', deleteLinkNetwork);

// rackserver
security.get('/rackservers', allRackserver);
security.get('/rackserver', Rackserver);
security.post('/rackserver', upload.array('images', 3), createRackserver);
security.put('/rackserver', upload.array('images', 3), updateRackserver);
security.delete('/rackserver', deleteRackserver);

// brand rackserver
security.get('/rackserver/brands', allBrandRackserver);
security.get('/rackserver/brand', brandRackserver);
security.post('/rackserver/brand', createBrandRackserver);
security.put('/rackserver/brand', updateBrandRackserver);
security.delete('/rackserver/brand', deleteBrandRackserver);

// storage
security.get('/storages', allStorage);
security.get('/storage', Storage);
security.post('/storage', upload.array('images', 3), createStorage);
security.put('/storage', upload.array('images', 3), updateStorage);
security.delete('/storage', deleteStorage);

// brand storage
security.get('/storage/brands', allBrandStorage);
security.get('/storage/brand', brandStorage);
security.post('/storage/brand', createBrandStorage);
security.put('/storage/brand', updateBrandStorage);
security.delete('/storage/brand', deleteBrandStorage);

// networkswitch
security.get('/switchs', allNetworkswitch);
security.get('/switch', Networkswitch);
security.post('/switch', upload.array('images', 3), createNetworkswitch);
security.put('/switch', upload.array('images', 3), updateNetworkswitch);
security.delete('/switch', deleteNetworkswitch);

// brand networkswitch
security.get('/switch/brands', allBrandNetworkswitch);
security.get('/switch/brand', brandNetworkswitch);
security.post('/switch/brand', createBrandNetworkswitch);
security.put('/switch/brand', updateBrandNetworkswitch);
security.delete('/switch/brand', deleteBrandNetworkswitch);

// routes
security.get('/routers', allRouter);
security.get('/router', routes);
security.post('/router', upload.array('images', 3), createRouter);
security.put('/router', upload.array('images', 3), updateRouter);
security.delete('/router', deleteRouter);

// brand routes
security.get('/router/brands', allBrandRouter);
security.get('/router/brand', brandRouter);
security.post('/router/brand', createBrandRouter);
security.put('/router/brand', updateBrandRouter);
security.delete('/router/brand', deleteBrandRouter);

// firewall
security.get('/firewalls', allFirewall);
security.get('/firewall', Firewall);
security.post('/firewall', upload.array('images', 3), createFirewall);
security.put('/firewall', upload.array('images', 3), updateFirewall);
security.delete('/firewall', deleteFirewall);

// brand firewall
security.get('/firewall/brands', allBrandFirewall);
security.get('/firewall/brand', brandFirewall);
security.post('/firewall/brand', createBrandFirewall);
security.put('/firewall/brand', updateBrandFirewall);
security.delete('/firewall/brand', deleteBrandFirewall);

// patchpanel
security.get('/patchpanels', allPatchpanels);
security.get('/patchpanel', Patchpanels);
security.post('/patchpanel', upload.array('images', 3), createPatchpanels);
security.put('/patchpanel', upload.array('images', 3), updatePatchpanels);
security.delete('/patchpanel', deletePatchpanels);

// brand patchpanel
security.get('/patchpanel/brands', allBrandPatchpanels);
security.get('/patchpanel/brand', brandPatchpanels);
security.post('/patchpanel/brand', createBrandPatchpanels);
security.put('/patchpanel/brand', updateBrandPatchpanels);
security.delete('/patchpanel/brand', deleteBrandPatchpanels);

// computer
security.get('/computers', allComputer);
security.get('/computer', Computer);
security.post('/computer', upload.array('images', 3), createComputer);
security.put('/computer', upload.array('images', 3), updateComputer);
security.delete('/computer', deleteComputer);

export default security;
