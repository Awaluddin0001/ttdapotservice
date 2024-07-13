import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket type
import moment from 'moment-timezone';
import { makeIdTable } from '../utils/makeIdTable';

export const allLinkElectrical = async (req: Request, res: Response) => {
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM electrical_link`,
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const linkElectrical = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM electrical_link WHERE id = ?`,
      [id],
    );
    if (rows.length === 0) {
      return res
        .status(404)
        .send({ success: false, message: 'Link not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const deleteLinkElectrical = async (req: Request, res: Response) => {
  const { id } = req.query;
  try {
    const pool = await connectMySQL();
    const [rows] = await pool.query<RowDataPacket[]>(
      `DELETE FROM electrical_link WHERE id = ?`,
      [id],
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const createLinkElectrical = async (req: Request, res: Response) => {
  const { incoming, outgoing, user_id } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');

  try {
    const pool = await connectMySQL();

    const [idDevice] = await pool.query<RowDataPacket[]>(
      'SELECT id From electrical_link order by id desc limit 1',
    );

    let newId = 'ELLIN000001';
    if (idDevice[0].id) {
      newId = makeIdTable(idDevice[0].id, 'ELLIN', 6);
    }
    const [rows] = await pool.query<RowDataPacket[]>(
      `INSERT INTO electrical_link (id, incoming, outgoing, created_at, user_id) VALUES (?, ?, ?, ?, ?)`,
      [newId, incoming, outgoing, now, user_id],
    );
    res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const updateLinkElectrical = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { incoming, outgoing, user_id } = req.body;

  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  try {
    const pool = await connectMySQL();
    await pool.query<RowDataPacket[]>(
      `UPDATE electrical_link SET incoming = ?, outgoing = ?,created_at = ?, user_id = ? WHERE id = ?`,
      [incoming, outgoing, now, user_id, id],
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
