// src/controllers/electricalDocumentUploadController.ts

import { Request, Response } from 'express';
import pool from '@/config/mySql'; // Mengimpor pool langsung dari konfigurasi MySQL
import moment from 'moment-timezone';
import { RowDataPacket } from 'mysql2';
import { getNewId } from '@/utils/idManipulation';

export const uploadElectricalDocument = async (req: Request, res: Response) => {
  const { activity, user_id } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  let connection;
  const newId = await getNewId(pool, 'electrical_maintenance', 'ELMAI', 3);

  try {
    connection = await pool.getConnection();
    const fileName = req.file.filename;
    const storeData = [newId, activity, fileName, now, user_id];
    const query =
      'INSERT INTO electrical_maintenance (asset_id, activity, document_name, created_at, user_id) VALUES (?, ?, ?, ?)';
    await connection.query(query, storeData);

    res.status(200).json({ message: 'File uploaded successfully.', fileName });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
};

export const getElectricalDocumentByAssetId = async (
  req: Request,
  res: Response,
) => {
  const { asset_id } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();
    const query = 'SELECT * FROM electrical_document WHERE asset_id = ?';
    const [rows] = await connection.query<RowDataPacket[]>(query, [asset_id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'No document found for this asset_id.' });
    }

    const document = rows[0].document;
    res.status(200).json({ document });
  } catch (error) {
    console.error('Error retrieving from database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
};

export const updateElectricalDocument = async (req: Request, res: Response) => {
  const { asset_id, user_id } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  let connection;

  try {
    connection = await pool.getConnection();
    const fileName = req.file.filename;
    const updateData = [fileName, now, user_id, asset_id];
    const query =
      'UPDATE electrical_document SET document = ?, updated_at = ?, user_id = ? WHERE asset_id = ?';
    await connection.query(query, updateData);

    res.status(200).json({ message: 'File updated successfully.', fileName });
  } catch (error) {
    console.error('Error updating database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
};
