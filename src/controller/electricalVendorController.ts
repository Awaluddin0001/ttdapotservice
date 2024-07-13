import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket type
import moment from 'moment-timezone';
import { makeIdTable } from '../utils/makeIdTable';

export const allElectricalVendor = async (req: Request, res: Response) => {
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM electrical_vendor`,
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const electricalVendor = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM electrical_vendor WHERE id = ?`,
      [id],
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: 'Vendor not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const deleteElectricalVendor = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `DELETE FROM electrical_vendor WHERE id = ?`,
      [id],
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const createElectricalVendor = async (req: Request, res: Response) => {
  const { company, company_user_name, number_phone, user_id } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');

  try {
    const pool = await connectMySQL();

    const [idDevice] = await pool.query<RowDataPacket[]>(
      'SELECT id From electrical_vendor order by id desc limit 1',
    );

    let newId = 'ELVEN001';
    if (idDevice[0].id) {
      newId = makeIdTable(idDevice[0].id, 'ELVEN', 3);
    }
    const [rows] = await pool.query<RowDataPacket[]>(
      `INSERT INTO electrical_vendor (id, company, company_user_name, number_phone, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [newId, company, company_user_name, number_phone, now, user_id],
    );
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const updateElectricalVendor = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { company, company_user_name, number_phone, user_id } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `UPDATE electrical_vendor SET company = ?, company_user_name = ?, number_phone = ?, created_at = ?, user_id = ? WHERE id = ?`,
      [company, company_user_name, number_phone, now, user_id, id],
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
