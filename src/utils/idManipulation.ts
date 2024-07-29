import { Pool } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
import { Request } from 'express';
// Fungsi untuk mendapatkan ID terbaru dan membuat ID baru
export const getNewId = async (
  pool: Pool,
  tableName: string,
  prefix: string,
  length: number,
): Promise<string> => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT id FROM ${tableName} ORDER BY id DESC LIMIT 1`,
    );
    if (rows.length === 0 || !rows[0]?.id) {
      return `${prefix}${'0'.repeat(length - 1)}1`;
    }
    return makeIdTable(rows[0].id, prefix, length);
  } catch (err) {
    console.error('Failed to fetch data from MySQL:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

export const makeIdTable = (
  currentCode: string,
  idName: string,
  digits: number,
) => {
  const numericPart = currentCode.substring(5);
  // Convert the numeric part to an integer
  let number = parseInt(numericPart, 10);
  // Increment the number
  number += 1;

  // Format the number with leading zeros (up to 3 digits)
  const incrementedCode = `${idName}` + String(number).padStart(digits, '0');
  return incrementedCode;
};

export const queryPage = (req: Request) => {
  const { noPage } = req.query;

  let page;
  let limit;

  if (noPage === 'no') {
    // When noPage is 'no', fetch all records
    page = 1;
    limit = 1000000;
  } else {
    // Get pagination parameters from the query string
    page = parseInt(req.query.page as string) || 1;
    limit = parseInt(req.query.limit as string) || 100;
  }

  const offset = (page - 1) * limit;

  return { page, limit, offset };
};

export const queryBigDevice = (
  newColumns?: string[] | null,
  categoryname: string,
  subCategoryname: string,
) => {
  return `SELECT 
        cas.id, 
        cas.vendor_id,
        cas.brand_id,
        cas.name,
        cas.role,
        cas.type,
        cas.capacity,
        cas.modul,
        cas.capacity_modul,
        cas.load_current,
        cas.occupancy,
        cas.system_device,
        cas.remark_aging,
        cas.warranty,
        DATE_FORMAT(ca.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(ca.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        b.name AS brand_name, 
        v.company AS vendor_name, 
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
        lk.outgoing as outgoing
      FROM ${subCategoryname} cas
      LEFT JOIN ${categoryname} ca ON r.id = el.device_id
      LEFT JOIN rectifier_brand b ON r.brand_id = b.id
      LEFT JOIN electrical_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN maintenance_electrical m ON r.maintenance_id = m.id
      LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN electrical_link lk ON el.link_id = lk.id
      WHERE 1=1`;
};
