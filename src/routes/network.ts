import { Router } from 'express';
import { upload } from '@/utils/imageUpload';
import {
  NetworkVendor,
  allNetworkVendor,
  createNetworkVendor,
  deleteNetworkVendor,
  updateNetworkVendor,
} from '../controller/network/vendor/networkVendorController';

import {
  NetworkMaintenance,
  allNetworkMaintenance,
  createMaintenanceNetwork,
  deleteNetworkMaintenance,
  updateNetworkMaintenance,
} from '../controller/network/maintenance/networkMaintenanceController';

import {
  linkNetwork,
  allLinkNetwork,
  createLinkNetwork,
  deleteLinkNetwork,
  updateLinkNetwork,
} from '../controller/network/link/networkLinkController';

import {
  allRackserver,
  Rackserver,
  createRackserver,
  updateRackserver,
  deleteRackserver,
} from '../controller/network/category/rackserverController';

import {
  allStorage,
  Storage,
  createStorage,
  deleteStorage,
  updateStorage,
} from '../controller/network/category/storageController';

import {
  allNetworkswitch,
  Networkswitch,
  createNetworkswitch,
  deleteNetworkswitch,
  updateNetworkswitch,
} from '../controller/network/category/networkswitchController';

import {
  allRouter,
  Router as routes,
  createRouter,
  deleteRouter,
  updateRouter,
} from '../controller/network/category/routerController';

import {
  Firewall,
  allFirewall,
  createFirewall,
  deleteFirewall,
  updateFirewall,
} from '../controller/network/category/firewallController';

import {
  Patchpanels,
  allPatchpanels,
  createPatchpanels,
  deletePatchpanels,
  updatePatchpanels,
} from '../controller/network/category/patchpanelsController';

import {
  Computer,
  allComputer,
  createComputer,
  deleteComputer,
  updateComputer,
} from '../controller/network/category/computerController';
import { allNetwork } from '@/controller/network/category/networkController';

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

// network
network.get('/all', allNetwork);

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

// storage
network.get('/storages', allStorage);
network.get('/storage', Storage);
network.post('/storage', upload.array('images', 3), createStorage);
network.put('/storage', upload.array('images', 3), updateStorage);
network.delete('/storage', deleteStorage);

// networkswitch
network.get('/switchs', allNetworkswitch);
network.get('/switch', Networkswitch);
network.post('/switch', upload.array('images', 3), createNetworkswitch);
network.put('/switch', upload.array('images', 3), updateNetworkswitch);
network.delete('/switch', deleteNetworkswitch);

// routes
network.get('/routers', allRouter);
network.get('/router', routes);
network.post('/router', upload.array('images', 3), createRouter);
network.put('/router', upload.array('images', 3), updateRouter);
network.delete('/router', deleteRouter);

// firewall
network.get('/firewalls', allFirewall);
network.get('/firewall', Firewall);
network.post('/firewall', upload.array('images', 3), createFirewall);
network.put('/firewall', upload.array('images', 3), updateFirewall);
network.delete('/firewall', deleteFirewall);

// patchpanel
network.get('/patchpanels', allPatchpanels);
network.get('/patchpanel', Patchpanels);
network.post('/patchpanel', upload.array('images', 3), createPatchpanels);
network.put('/patchpanel', upload.array('images', 3), updatePatchpanels);
network.delete('/patchpanel', deletePatchpanels);

// computer
network.get('/computers', allComputer);
network.get('/computer', Computer);
network.post('/computer', upload.array('images', 3), createComputer);
network.put('/computer', upload.array('images', 3), updateComputer);
network.delete('/computer', deleteComputer);

export default network;
