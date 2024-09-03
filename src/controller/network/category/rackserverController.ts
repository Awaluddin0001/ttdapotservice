import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRows, getBigDeviceRow } from '@/utils/getData';
import {
  createRowNetwork,
  updateRowNetwork,
} from '@/utils/CreatePutDataNetwork';
import { exportBigDeviceRows } from '@/utils/exportData';

export const allRackserver = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.manufactur`,
      `cas.capacity`,
      `cas.port`,
      `cas.case_pc`,
      `cas.rack_sn`,
      `cas.kvm_id`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `network`,
    `network_rack_server`,
    [
      `LEFT JOIN network_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN network_type t ON cas.type_id = t.id`,
      `LEFT JOIN network_link lk ON ca.link_id = lk.id`,
    ],
  );
};

export const exportRackserverCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.manufactur`,
      `cas.capacity`,
      `cas.port`,
      `cas.case_pc`,
      `cas.rack_sn`,
      `cas.kvm_id`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `network`,
    `network_rack_server`,
    `csv`,
    [
      `LEFT JOIN network_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN network_type t ON cas.type_id = t.id`,
      `LEFT JOIN network_link lk ON ca.link_id = lk.id`,
    ],
  );
};
export const exportRackserverXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.manufactur`,
      `cas.capacity`,
      `cas.port`,
      `cas.case_pc`,
      `cas.rack_sn`,
      `cas.kvm_id`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `network`,
    `network_rack_server`,
    `xlsx`,
    [
      `LEFT JOIN network_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN network_type t ON cas.type_id = t.id`,
      `LEFT JOIN network_link lk ON ca.link_id = lk.id`,
    ],
  );
};

export const Rackserver = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id,
        r.manufactur,
        r.capacity,
        r.port,
        r.case_pc,
        r.rack_sn,
        r.kvm_id,
        r.power,
        DATE_FORMAT(el.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        m.activity AS maintenance_activity,
        m.document_name AS maintenance_document,
        b.name AS brand_name, 
        v.company AS vendor_name, 
        v.company_user_name AS vendor_user_name, 
        v.number_phone AS vendor_phone,
        u.name AS user_name,
        ep.foto1 AS photo1,
        ep.foto2 AS photo2,
        ep.foto3 AS photo3,
        el.id as asset_id,
        el.ne_id as ne_id,
        el.site_id as site_id,
        el.floor_id as floor_id,
        el.room_id as room_id,
        el.link_id as link_id,
        el.status as status,
        el.condition_asset,
        el.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name,
        lk.incoming as incoming,
        lk.outgoing as outgoing,
        ty.name as type_name,
        ty.id as type_id
      FROM network_rack_server r
      LEFT JOIN network el ON r.id = el.device_id
      LEFT JOIN network_brand b ON r.brand_id = b.id
      LEFT JOIN network_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN network_maintenance m ON el.maintenance_id = m.id
      LEFT JOIN network_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN network_link lk ON el.link_id = lk.id
      LEFT JOIN network_type ty ON r.type_id = ty.id
    WHERE r.id = ?`,
  );
};

export const createRackserver = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    `manufactur`,
    `capacity`,
    `port`,
    `case_pc`,
    `rack_sn`,
    `kvm_id`,
    `power`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `condition_asset`,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
    'sub_category_id',
  ];
  await createRowNetwork(
    req,
    res,
    'network_rack_server',
    'NERAS',
    deviceColumns,
    electricalColumns,
  );
};

export const updateRackserver = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    `manufactur`,
    `capacity`,
    `port`,
    `case_pc`,
    `rack_sn`,
    `kvm_id`,
    `power`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `condition_asset`,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
    'sub_category_id',
  ];
  await updateRowNetwork(
    req,
    res,
    'network_rack_server',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteRackserver = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM network WHERE device_id = ?`,
    `DELETE FROM network_rack_server WHERE id = ?`,
    `DELETE FROM network_photo WHERE asset_id = ?`,
    `network`,
    `network_photo`,
  );
};
