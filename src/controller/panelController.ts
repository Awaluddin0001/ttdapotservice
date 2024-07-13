import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { format } from 'date-fns';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket type
import moment from 'moment-timezone';
import { makeIdTable } from '../utils/makeIdTable';

export const allPanel = async (req: Request, res: Response) => {
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
            p.*, 
            v.company AS vendor_name, 
            u.name AS user_name,
            DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
            DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
            DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
          FROM panel p
          LEFT JOIN electrical_vendor v ON p.vendor_id = v.id
          LEFT JOIN user u ON p.user_id = u.id
          LEFT JOIN maintenance_electrical m ON p.maintenance_id = m.id`,
    );

    // Map through the rows to format each date
    const formattedRows = rows.map((row: any) => ({
      ...row,
      installation_date: format(
        new Date(row.installation_date),
        'dd-MMMM-yyyy',
      ),
      created_at: format(new Date(row.created_at), 'dd-MMMM-yyyy'),
      maintenance_date: row.maintenance_date
        ? format(new Date(row.maintenance_date), 'dd-MMMM-yyyy')
        : '-',
    }));

    res.json(formattedRows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
export const Panel = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
            p.*, 
            v.company AS vendor_name, 
            u.name AS user_name,
            DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
            DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
            DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
          FROM panel p
          LEFT JOIN electrical_vendor v ON p.vendor_id = v.id
          LEFT JOIN user u ON p.user_id = u.id
          LEFT JOIN maintenance_electrical m ON p.maintenance_id = m.id
          WHERE p.id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).send('Battery   not found');
    }

    // Map through the rows to format each date
    const formattedRows = rows.map((row: any) => ({
      ...row,
      installation_date: format(
        new Date(row.installation_date),
        'dd-MMMM-yyyy',
      ),
      created_at: format(new Date(row.created_at), 'dd-MMMM-yyyy'),
      maintenance_date: row.maintenance_date
        ? format(new Date(row.maintenance_date), 'dd-MMMM-yyyy')
        : '-',
    }));

    res.json(formattedRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const createPanel = async (req: Request, res: Response) => {
  const {
    vendor_id,
    user_id,
    maintenance_id,
    installation_date,
    name,
    capacity,
    function_category,
    ne_id,
    site_id,
    floor_id,
    room_id,
    link_id,
    status,
    condition,
    notes,
  } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  try {
    const pool = await connectMySQL();

    const [idDevice] = await pool.query<RowDataPacket[]>(
      'SELECT id From panel order by id desc limit 1',
    );
    const [idEl] = await pool.query<RowDataPacket[]>(
      'SELECT id From electrical order by id desc limit 1',
    );

    let newId = 'ELPAN001';
    if (idDevice[0].id) {
      newId = makeIdTable(idDevice[0].id, 'ELPAN', 3);
    }
    let elId = 'EL000001';
    if (idEl[0].id) {
      elId = makeIdTable(idEl[0].id, 'EL', 6);
    }

    await pool.query<RowDataPacket[]>(
      `INSERT INTO panel (id, vendor_id, user_id, maintenance_id, installation_date, created_at, name, capacity, function_category ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newId,
        vendor_id,
        user_id,
        maintenance_id || null,
        installation_date || null,
        now,
        name,
        capacity,
        function_category,
      ],
    );

    await pool.query<RowDataPacket[]>(
      `INSERT INTO electrical (id, ne_id, site_id, floor_id, room_id, device_id, link_id, status, condition, notes, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        elId,
        ne_id,
        site_id,
        floor_id,
        room_id,
        newId,
        link_id,
        status,
        condition,
        notes,
        now,
        user_id,
      ],
    );
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const updatePanel = async (req: Request, res: Response) => {
  const { id } = req.query;
  const {
    vendor_id,
    user_id,
    maintenance_id,
    installation_date,
    name,
    capacity,
    function_category,
    ne_id,
    site_id,
    floor_id,
    room_id,
    link_id,
    status,
    condition,
    notes,
  } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');

  try {
    const pool = await connectMySQL();
    await pool.query<RowDataPacket[]>(
      `UPDATE panel SET 
      vendor_id = ?,
      user_id = ?,
      maintenance_id = ?,
      installation_date = ?,
      created_at = ?,
      name = ?,
      capacity = ?,
      function_category = ?
      WHERE id = ?`,
      [
        vendor_id,
        user_id,
        maintenance_id || null,
        installation_date || null,
        now,
        name,
        capacity,
        function_category,
        id,
      ],
    );

    await pool.query<RowDataPacket[]>(
      `
      UPDATE electrical SET
      ne_id = ?,
      site_id = ?,
      floor_id = ?,
      room_id = ?,
      device_id = ?,
      link_id = ?,
      status = ?,
      condition = ?,
      notes = ?,
      created_at = ?,
      user_id = ?
      WHERE device_id = ?
      `,
      [
        ne_id,
        site_id,
        floor_id,
        room_id,
        id,
        link_id,
        status,
        condition,
        notes,
        now,
        user_id,
        id,
      ],
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const deletePanel = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    const pool = await connectMySQL();
    await pool.query<RowDataPacket[]>(`DELETE FROM panel WHERE id = ?`, [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
