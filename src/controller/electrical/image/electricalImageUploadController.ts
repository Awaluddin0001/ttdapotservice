// src/controllers/electricalImageUploadController.ts

import { Request, Response } from 'express';
import pool from '@/config/mySql'; // Mengimpor pool langsung dari konfigurasi MySQL
import moment from 'moment-timezone';
import { RowDataPacket } from 'mysql2';

export const uploadElectricalImage = async (req: Request, res: Response) => {
  const { asset_id, user_id } = req.body;
  if (!req.body.images || !req.body.images.length) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  let connection;

  try {
    connection = await pool.getConnection();
    const fileNames = req.body.images.map((file: any) => file.filename);
    const storeData = [asset_id, ...fileNames, now, user_id];
    const query =
      'INSERT INTO electrical_photo (asset_id, foto1, foto2, foto3, created_at, user_id) VALUES (?, ?, ?, ?, ?, ?)';
    await connection.query(query, storeData);

    res
      .status(200)
      .json({ message: 'Files uploaded successfully.', fileNames });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
};

export const getElectricalImagesByAssetId = async (
  req: Request,
  res: Response,
) => {
  const { asset_id } = req.body;
  let connection;

  try {
    connection = await pool.getConnection();
    const query =
      'SELECT foto1, foto2, foto3 FROM electrical_photo WHERE asset_id = ?';
    const [rows] = await connection.query<RowDataPacket[]>(query, [asset_id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'No images found for this asset_id.' });
    }

    const images = rows[0];
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error retrieving from database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
};

export const updateElectricalImages = async (req: Request, res: Response) => {
  const { asset_id, user_id } = req.body;
  if (!req.body.images || !req.body.images.length) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  let connection;

  try {
    connection = await pool.getConnection();
    const fileNames = req.body.images.map((file: any) => file.filename);
    const updateData = [
      fileNames[0],
      fileNames[1],
      fileNames[2],
      now,
      user_id,
      asset_id,
    ];
    const query =
      'UPDATE electrical_photo SET foto1 = ?, foto2 = ?, foto3 = ?, updated_at = ?, user_id = ? WHERE asset_id = ?';
    await connection.query(query, updateData);

    res.status(200).json({ message: 'Files updated successfully.', fileNames });
  } catch (error) {
    console.error('Error updating database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  } finally {
    if (connection) connection.release();
  }
};
