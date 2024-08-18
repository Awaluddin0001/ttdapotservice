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
  categoryName: string,
  subCategoryName: string,
  newColumnsCas: string[],
  newJoin?: string[] | null,
) => {
  if (newJoin) {
    return `SELECT 
    cas.id, 
    cas.vendor_id,
    DATE_FORMAT(cas.created_at, "%Y-%m-%d") AS created_at,
    cas.user_id,
    ca.id as asset_id,
    ca.site_id as site_id,
    ca.floor_id as floor_id,
    ca.room_id as room_id,
    ca.sub_category_id as sub_category_id,
    DATE_FORMAT(ca.installation_date, "%Y-%m-%d") AS installation_date, 
    ca.maintenance_id as maintenance_id,
    ca.notes as notes,
    DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
    rm.name as room_name,
    fl.name as floor_name,
    st.name as site_name,
    v.company AS vendor_name, 
    u.name AS user_name,
    ep.foto1 AS photo1,
    ep.foto2 AS photo2,
    ep.foto3 AS photo3,
    ${newColumnsCas.join(', ')}
  FROM ${subCategoryName} cas
  LEFT JOIN ${categoryName} ca ON cas.id = ca.device_id
  LEFT JOIN ${categoryName}_vendor v ON cas.vendor_id = v.id
  LEFT JOIN ${categoryName}_maintenance m ON ca.maintenance_id = m.id
  LEFT JOIN ${categoryName}_photo ep ON ca.id = ep.asset_id
  LEFT JOIN user u ON ca.user_id = u.id
  LEFT JOIN room rm ON ca.room_id = rm.id
  LEFT JOIN floor fl ON ca.floor_id = fl.id
  LEFT JOIN site st ON ca.site_id = st.id
  ${newJoin.join(' ')}
  WHERE 1=1`;
  }

  return `SELECT 
    cas.id, 
    cas.vendor_id,
    DATE_FORMAT(cas.created_at, "%Y-%m-%d") AS created_at,
    cas.user_id,
    ca.id as asset_id,
    ca.site_id as site_id,
    ca.floor_id as floor_id,
    ca.room_id as room_id,
    ca.sub_category_id as sub_category_id,
    DATE_FORMAT(ca.installation_date, "%Y-%m-%d") AS installation_date, 
    ca.maintenance_id as maintenance_id,
    ca.notes as notes,
    DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
    rm.name as room_name,
    fl.name as floor_name,
    st.name as site_name,
    v.company AS vendor_name, 
    u.name AS user_name,
    ep.foto1 AS photo1,
    ep.foto2 AS photo2,
    ep.foto3 AS photo3,
    ${newColumnsCas.join(', ')}
  FROM ${subCategoryName} cas
  LEFT JOIN ${categoryName} ca ON cas.id = ca.device_id
  LEFT JOIN ${categoryName}_vendor v ON cas.vendor_id = v.id
  LEFT JOIN ${categoryName}_maintenance m ON ca.maintenance_id = m.id
  LEFT JOIN ${categoryName}_photo ep ON ca.id = ep.asset_id
  LEFT JOIN user u ON ca.user_id = u.id
  LEFT JOIN room rm ON ca.room_id = rm.id
  LEFT JOIN floor fl ON ca.floor_id = fl.id
  LEFT JOIN site st ON ca.site_id = st.id
  WHERE 1=1`;
};

export const queryBigAsset = (categoryName: string, newColumnsCa: string[]) => {
  return `SELECT 
    ca.id as asset_id,
    DATE_FORMAT(ca.created_at, "%Y-%m-%d") AS created_at,
    ca.user_id,
    ca.site_id as site_id,
    ca.floor_id as floor_id,
    ca.room_id as room_id,
    ca.sub_category_id as sub_category_id,
    DATE_FORMAT(ca.installation_date, "%Y-%m-%d") AS installation_date, 
    ca.maintenance_id as maintenance_id,
    ca.notes as notes,
    suca.name as sub_category_name,
    DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
    rm.name as room_name,
    fl.name as floor_name,
    st.name as site_name,
    u.name AS user_name,
    ep.foto1 AS photo1,
    ep.foto2 AS photo2,
    ep.foto3 AS photo3,
    ${newColumnsCa.join(', ')}
  FROM ${categoryName} ca
  LEFT JOIN ${categoryName}_maintenance m ON ca.maintenance_id = m.id
  LEFT JOIN ${categoryName}_photo ep ON ca.id = ep.asset_id
  LEFT JOIN ${categoryName}_sub_category suca ON ca.sub_category_id = suca.id
  LEFT JOIN user u ON ca.user_id = u.id
  LEFT JOIN room rm ON ca.room_id = rm.id
  LEFT JOIN floor fl ON ca.floor_id = fl.id
  LEFT JOIN site st ON ca.site_id = st.id
  WHERE 1=1`;
};
export const queryBigNetwork = (
  otherCategoryName: string,
  categoryName: string,
  newColumnsCa: string[],
) => {
  return `SELECT 
    ca.id as asset_id,
    DATE_FORMAT(ca.created_at, "%Y-%m-%d") AS created_at,
    ca.user_id,
    ca.site_id as site_id,
    ca.floor_id as floor_id,
    ca.room_id as room_id,
    ca.sub_category_id as sub_category_id,
    DATE_FORMAT(ca.installation_date, "%Y-%m-%d") AS installation_date, 
    ca.maintenance_id as maintenance_id,
    ca.notes as notes,
    suca.name as sub_category_name,
    DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
    rm.name as room_name,
    fl.name as floor_name,
    st.name as site_name,
    u.name AS user_name,
    ep.foto1 AS photo1,
    ep.foto2 AS photo2,
    ep.foto3 AS photo3,
    ${newColumnsCa.join(', ')}
  FROM ${categoryName} ca
  LEFT JOIN ${otherCategoryName}_maintenance m ON ca.maintenance_id = m.id
  LEFT JOIN ${otherCategoryName}_photo ep ON ca.id = ep.asset_id
  LEFT JOIN ${otherCategoryName}_sub_category suca ON ca.sub_category_id = suca.id
  LEFT JOIN user u ON ca.user_id = u.id
  LEFT JOIN room rm ON ca.room_id = rm.id
  LEFT JOIN floor fl ON ca.floor_id = fl.id
  LEFT JOIN site st ON ca.site_id = st.id
  WHERE 1=1`;
};

export const globalFilterDevice = (
  req: Request,
  columnFilter?: string[] | null,
) => {
  const { globalFilter } = req.query;
  if (columnFilter) {
    const query = `
    AND (
            cas.id LIKE '%${globalFilter}%' 
            OR cas.vendor_id LIKE '%${globalFilter}%'
            OR cas.user_id LIKE '%${globalFilter}%'
            OR ca.id LIKE '%${globalFilter}%'
            OR ca.site_id LIKE '%${globalFilter}%'
            OR ca.floor_id LIKE '%${globalFilter}%'
            OR ca.room_id LIKE '%${globalFilter}%'
            OR ca.sub_category_id LIKE '%${globalFilter}%' 
            OR rm.name LIKE '%${globalFilter}%'
            OR v.company LIKE '%${globalFilter}%',
            OR u.name LIKE '%${globalFilter}%'
            OR v.company LIKE '%${globalFilter}%'
            OR u.name LIKE '%${globalFilter}%'
          )
    `;
    let queryFilter = +columnFilter.map((filter) => `OR ${filter}`).join(' ');
    return query + queryFilter;
  }
  return `
  AND (
          cas.id LIKE '%${globalFilter}%' 
          OR cas.vendor_id LIKE '%${globalFilter}%'
          OR cas.user_id LIKE '%${globalFilter}%'
          OR ca.id LIKE '%${globalFilter}%'
          OR ca.site_id LIKE '%${globalFilter}%'
          OR ca.floor_id LIKE '%${globalFilter}%'
          OR ca.room_id LIKE '%${globalFilter}%'
          OR ca.sub_category_id LIKE '%${globalFilter}%' 
          OR rm.name LIKE '%${globalFilter}%'
          OR v.company LIKE '%${globalFilter}%',
          OR u.name LIKE '%${globalFilter}%'
          OR v.company LIKE '%${globalFilter}%'
          OR u.name LIKE '%${globalFilter}%'
        )
  `;
};
export const globalFilterAsset = (
  req: Request,
  columnFilter?: string[] | null,
) => {
  const { globalFilter } = req.query;
  if (columnFilter) {
    const query = `
    AND (
            ca.id LIKE '%${globalFilter}%'
            OR ca.site_id LIKE '%${globalFilter}%'
            OR ca.floor_id LIKE '%${globalFilter}%'
            OR ca.room_id LIKE '%${globalFilter}%'
            OR ca.sub_category_id LIKE '%${globalFilter}%' 
            OR rm.name LIKE '%${globalFilter}%'
            OR v.company LIKE '%${globalFilter}%',
            OR u.name LIKE '%${globalFilter}%'
            OR v.company LIKE '%${globalFilter}%'
            OR u.name LIKE '%${globalFilter}%'
          )
    `;
    let queryFilter = +columnFilter.map((filter) => `OR ${filter}`).join(' ');
    return query + queryFilter;
  }
  return `
  AND (
          ca.id LIKE '%${globalFilter}%'
          OR ca.site_id LIKE '%${globalFilter}%'
          OR ca.floor_id LIKE '%${globalFilter}%'
          OR ca.room_id LIKE '%${globalFilter}%'
          OR ca.sub_category_id LIKE '%${globalFilter}%' 
          OR rm.name LIKE '%${globalFilter}%'
          OR v.company LIKE '%${globalFilter}%',
          OR u.name LIKE '%${globalFilter}%'
          OR v.company LIKE '%${globalFilter}%'
          OR u.name LIKE '%${globalFilter}%'
        )
  `;
};
