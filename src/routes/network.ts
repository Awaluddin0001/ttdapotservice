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
import {
  createNetworkBrand,
  deleteNetworkBrand,
  networkBrand,
  networkBrands,
  updateNetworkBrand,
} from '@/controller/network/brand/networkBrandController';
import {
  createNetworkType,
  deleteNetworkType,
  networkSubCategories,
  networkType,
  networkTypes,
  updateNetworkType,
} from '@/controller/network/type/electricalTypeController';
import { uploadPdf } from '@/utils/pdfUpload';

const network = Router();

// vendor
network.get('/vendors', allNetworkVendor);
network.get('/vendor', NetworkVendor);
network.post('/vendor', createNetworkVendor);
network.put('/vendor', updateNetworkVendor);
network.delete('/vendor', deleteNetworkVendor);

// brand
network.get('/brands', networkBrands);
network.get('/brand', networkBrand);
network.post('/brand', createNetworkBrand);
network.put('/brand', updateNetworkBrand);

// type
network.get('/types', networkTypes);
network.get('/subcategories', networkSubCategories);
network.get('/type', networkType);
network.post('/type', createNetworkType);
network.put('/type', updateNetworkType);
network.delete('/type', deleteNetworkType);

// maintenance
network.get('/maintenances', allNetworkMaintenance);
network.get('/maintenance', NetworkMaintenance);
network.post(
  '/maintenance',
  uploadPdf.single('document_name'),
  createMaintenanceNetwork,
);
network.put(
  '/maintenance',
  uploadPdf.single('document_name'),
  updateNetworkMaintenance,
);
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
network.post(
  '/rackserver',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createRackserver,
);
network.put(
  '/rackserver',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateRackserver,
);
network.delete('/rackserver', deleteRackserver);

// storage
network.get('/storages', allStorage);
network.get('/storage', Storage);
network.post(
  '/storage',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createStorage,
);
network.put(
  '/storage',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateStorage,
);
network.delete('/storage', deleteStorage);

// networkswitch
network.get('/switchs', allNetworkswitch);
network.get('/switch', Networkswitch);
network.post(
  '/switch',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createNetworkswitch,
);
network.put(
  '/switch',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateNetworkswitch,
);
network.delete('/switch', deleteNetworkswitch);

// routes
network.get('/routers', allRouter);
network.get('/router', routes);
network.post(
  '/router',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createRouter,
);
network.put(
  '/router',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateRouter,
);
network.delete('/router', deleteRouter);

// firewall
network.get('/firewalls', allFirewall);
network.get('/firewall', Firewall);
network.post(
  '/firewall',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createFirewall,
);
network.put(
  '/firewall',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateFirewall,
);
network.delete('/firewall', deleteFirewall);

// patchpanel
network.get('/patchpanels', allPatchpanels);
network.get('/patchpanel', Patchpanels);
network.post(
  '/patchpanel',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createPatchpanels,
);
network.put(
  '/patchpanel',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updatePatchpanels,
);
network.delete('/patchpanel', deletePatchpanels);

// computer
network.get('/computers', allComputer);
network.get('/computer', Computer);
network.post(
  '/computer',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createComputer,
);
network.put(
  '/computer',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateComputer,
);
network.delete('/computer', deleteComputer);

export default network;
