import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket type
import moment from 'moment-timezone';
import { makeIdTable } from '../utils/makeIdTable';

export const allElectricalMaintenance = async (req: Request, res: Response) => {
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM maintenance_electrical`,
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const electricalMaintenance = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM maintenance_electrical WHERE id = ?`,
      [id],
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: 'Maintenance not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const deleteElectricalMaintenance = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.query;
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `DELETE FROM maintenance_electrical WHERE id = ?`,
      [id],
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const createMaintenanceElectrical = async (
  req: Request,
  res: Response,
) => {
  const { activity, document_name, user_id } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');

  try {
    const pool = await connectMySQL();

    const [idDevice] = await pool.query<RowDataPacket[]>(
      'SELECT id From maintenance_electrical order by id desc limit 1',
    );

    let newId = 'ELMAI000001';
    if (idDevice[0].id) {
      newId = makeIdTable(idDevice[0].id, 'ELMAI', 6);
    }
    const [rows] = await pool.query<RowDataPacket[]>(
      `INSERT INTO maintenance_electrical (id, activity, document_name, created_at, user_id) VALUES (?, ?, ?, ?, ?)`,
      [newId, activity, document_name, now, user_id],
    );
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const updateElectricalMaintenance = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.query;
  const { activity, document_name, user_id } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `UPDATE electrical_vendor SET activity = ?, document_name = ?,created_at = ?, user_id = ? WHERE id = ?`,
      [activity, document_name, now, user_id, id],
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
