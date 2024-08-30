import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import {
  createRowNetwork,
  updateRowNetwork,
} from '@/utils/CreatePutDataNetwork';

export const allFirewall = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.display`,
      `cas.keyboard`,
      `cas.mouse`,
      `cas.motherboard`,
      `cas.case`,
      `cas.processor`,
      `cas.vga`,
      `cas.hardisk`,
      `cas.ram`,
      `cas.cooling`,
      `cas.power_supply`,
      `ca.ne_id as ne_id`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
    ],
    `network`,
    `network_firewalls`,
    [`LEFT JOIN network_link lk ON ca.link_id = lk.id`],
  );
};

export const Firewall = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
          t.*, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM network_firewalls t
    LEFT JOIN network_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_network m ON t.maintenance_id = m.id
    LEFT JOIN network_it el ON t.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id
    WHERE t.id = ?`,
  );
};

export const createFirewall = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'display',
    'keyboard',
    'mouse',
    'motherboard',
    'case',
    'processor',
    'vga',
    'hardisk',
    'ram',
    'cooling',
    'power_supply',
    'maintenance_id',
    'installation_date',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await createRowNetwork(
    req,
    res,
    'firewall',
    'NICOM',
    deviceColumns,
    electricalColumns,
  );
};

export const updateFirewall = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'display',
    'keyboard',
    'mouse',
    'motherboard',
    'case',
    'processor',
    'vga',
    'hardisk',
    'ram',
    'cooling',
    'power_supply',
    'maintenance_id',
    'installation_date',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await updateRowNetwork(
    req,
    res,
    'firewall',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteFirewall = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM network_it WHERE category_id = ?`,
    `DELETE FROM firewall WHERE id = ?`,
    `DELETE FROM network_photo WHERE asset_id = ?`,
    `network`,
  );
};
