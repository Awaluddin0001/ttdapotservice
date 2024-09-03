import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRows, getBigDeviceRow } from '@/utils/getData';
import { exportBigDeviceRows, exportData } from '@/utils/exportData';
import {
  createRowSecurity,
  updateRowSecurity,
} from '@/utils/CreatePutDataSecurity';

export const allCctv = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.manufactur`,
      `cas.ip`,
      `b.name AS brand_name`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `security`,
    `security_cctv`,
    [
      `LEFT JOIN security_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN security_type t ON cas.type_id = t.id`,
      `LEFT JOIN security_link lk ON ca.link_id = lk.id`,
    ],
  );
};
export const exportCctvCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.manufactur`,
      `cas.ip`,
      `b.name AS brand_name`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `security`,
    `security_cctv`,
    `csv`,
    [
      `LEFT JOIN security_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN security_type t ON cas.type_id = t.id`,
      `LEFT JOIN security_link lk ON ca.link_id = lk.id`,
    ],
  );
};
export const exportCctvXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.manufactur`,
      `cas.ip`,
      `b.name AS brand_name`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `security`,
    `security_cctv`,
    `xlsx`,
    [
      `LEFT JOIN security_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN security_type t ON cas.type_id = t.id`,
      `LEFT JOIN security_link lk ON ca.link_id = lk.id`,
    ],
  );
};

export const Cctv = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id,
        r.brand_id,
        r.manufactur,
        r.ip,
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
      FROM security_cctv r
      LEFT JOIN security_brand b ON r.brand_id = b.id
      LEFT JOIN security el ON r.id = el.device_id
      LEFT JOIN security_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN security_maintenance m ON el.maintenance_id = m.id
      LEFT JOIN security_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN security_link lk ON el.link_id = lk.id
      LEFT JOIN security_type ty ON r.type_id = ty.id
    WHERE r.id = ?`,
  );
};

export const createCctv = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    'manufactur',
    'ip',
  ];
  const securityColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    'sub_category_id',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRowSecurity(
    req,
    res,
    'security_cctv',
    'SECCT',
    deviceColumns,
    securityColumns,
  );
};

export const updateCctv = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    'manufactur',
    'ip',
  ];
  const securityColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    'sub_category_id',
    'condition_asset',
    'maintenance_id',
    'installation_date',
    'notes',
  ];
  await updateRowSecurity(
    req,
    res,
    'security_cctv',
    deviceColumns,
    securityColumns,
  );
};

export const deleteCctv = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM security WHERE device_id = ?`,
    `DELETE FROM security_cctv WHERE id = ?`,
    `DELETE FROM security_photo WHERE asset_id = ?`,
    `security`,
    `security_photo`,
  );
};
