import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Fungsi untuk menghapus file gambar
const deleteImageFiles = async (
  pool: Pool,
  assetId: string,
  folderPath: string,
): Promise<void> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT foto1, foto2, foto3 FROM electrical_photo WHERE asset_id = ?',
    [assetId],
  );

  if (rows.length > 0) {
    const images = rows[0];
    for (let i = 1; i <= 3; i++) {
      const imageFile = images[`foto${i}`];
      if (imageFile) {
        const imagePath = path.join(
          __dirname,
          `../../src/images/${folderPath}`,
          imageFile,
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }
  }
};

export const deleteCombinedRow = async (
  req: Request,
  res: Response,
  pool: Pool,
  query1: string,
  query2: string,
  query3: string,
  folderPath: string,
) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();

    // Hapus file gambar terkait
    await deleteImageFiles(pool, id as string, folderPath);

    // Hapus data dari database
    await connection.query<RowDataPacket[]>(query1, [id]);
    await connection.query<RowDataPacket[]>(query2, [id]);
    await connection.query<RowDataPacket[]>(query3, [id]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
};

export const deleteRow = async (
  req: Request,
  res: Response,
  pool: Pool,
  query: string,
  query2?: string,
  folderPath?: string,
) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();

    // Hapus file gambar terkait
    if (folderPath && query2) {
      await deleteImageFiles(pool, id as string, folderPath);
      await connection.query<RowDataPacket[]>(query2, [id]);
    }

    await connection.query<RowDataPacket[]>(query, [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
};
