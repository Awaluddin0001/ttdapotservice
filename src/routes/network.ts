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

const network = Router();

// vendor rectifier
network.get('/vendors', allNetworkVendor);
network.get('/vendor', NetworkVendor);
network.post('/vendor', createNetworkVendor);
network.put('/vendor', updateNetworkVendor);
network.delete('/vendor', deleteNetworkVendor);

// maintenance rectifier
network.get('/maintenances', allNetworkMaintenance);
network.get('/maintenance', NetworkMaintenance);
network.post('/maintenance', createMaintenanceNetwork);
network.put('/maintenance', updateNetworkMaintenance);
network.delete('/maintenance', deleteNetworkMaintenance);

// link rectifier
network.get('/links', allLinkNetwork);
network.get('/link', linkNetwork);
network.post('/link', createLinkNetwork);
network.put('/link', updateLinkNetwork);
network.delete('/link', deleteLinkNetwork);

// rackserver
network.get('/rackservers', allRackserver);
network.get('/rackserver', Rackserver);
network.post('/rackserver', upload.array('images', 3), createRackserver);
network.put('/rackserver', upload.array('images', 3), updateRackserver);
network.delete('/rackserver', deleteRackserver);

// brand rackserver
network.get('/rackserver/brands', allBrandRackserver);
network.get('/rackserver/brand', brandRackserver);
network.post('/rackserver/brand', createBrandRackserver);
network.put('/rackserver/brand', updateBrandRackserver);
network.delete('/rackserver/brand', deleteBrandRackserver);

// storage
network.get('/storages', allStorage);
network.get('/storage', Storage);
network.post('/storage', upload.array('images', 3), createStorage);
network.put('/storage', upload.array('images', 3), updateStorage);
network.delete('/storage', deleteStorage);

// brand storage
network.get('/storage/brands', allBrandStorage);
network.get('/storage/brand', brandStorage);
network.post('/storage/brand', createBrandStorage);
network.put('/storage/brand', updateBrandStorage);
network.delete('/storage/brand', deleteBrandStorage);

// networkswitch
network.get('/switchs', allNetworkswitch);
network.get('/switch', Networkswitch);
network.post('/switch', upload.array('images', 3), createNetworkswitch);
network.put('/switch', upload.array('images', 3), updateNetworkswitch);
network.delete('/switch', deleteNetworkswitch);

// brand networkswitch
network.get('/switch/brands', allBrandNetworkswitch);
network.get('/switch/brand', brandNetworkswitch);
network.post('/switch/brand', createBrandNetworkswitch);
network.put('/switch/brand', updateBrandNetworkswitch);
network.delete('/switch/brand', deleteBrandNetworkswitch);

// routes
network.get('/routers', allRouter);
network.get('/router', routes);
network.post('/router', upload.array('images', 3), createRouter);
network.put('/router', upload.array('images', 3), updateRouter);
network.delete('/router', deleteRouter);

// brand routes
network.get('/router/brands', allBrandRouter);
network.get('/router/brand', brandRouter);
network.post('/router/brand', createBrandRouter);
network.put('/router/brand', updateBrandRouter);
network.delete('/router/brand', deleteBrandRouter);

// firewall
network.get('/firewalls', allFirewall);
network.get('/firewall', Firewall);
network.post('/firewall', upload.array('images', 3), createFirewall);
network.put('/firewall', upload.array('images', 3), updateFirewall);
network.delete('/firewall', deleteFirewall);

// brand firewall
network.get('/firewall/brands', allBrandFirewall);
network.get('/firewall/brand', brandFirewall);
network.post('/firewall/brand', createBrandFirewall);
network.put('/firewall/brand', updateBrandFirewall);
network.delete('/firewall/brand', deleteBrandFirewall);

// patchpanel
network.get('/patchpanels', allPatchpanels);
network.get('/patchpanel', Patchpanels);
network.post('/patchpanel', upload.array('images', 3), createPatchpanels);
network.put('/patchpanel', upload.array('images', 3), updatePatchpanels);
network.delete('/patchpanel', deletePatchpanels);

// brand patchpanel
network.get('/patchpanel/brands', allBrandPatchpanels);
network.get('/patchpanel/brand', brandPatchpanels);
network.post('/patchpanel/brand', createBrandPatchpanels);
network.put('/patchpanel/brand', updateBrandPatchpanels);
network.delete('/patchpanel/brand', deleteBrandPatchpanels);

// computer
network.get('/computers', allComputer);
network.get('/computer', Computer);
network.post('/computer', upload.array('images', 3), createComputer);
network.put('/computer', upload.array('images', 3), updateComputer);
network.delete('/computer', deleteComputer);

export default network;
