import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
export const deleteCombinedRow = async (
  req: Request,
  res: Response,
  poolMysql: () => Promise<Pool>,
  query1: string,
  query2: string,
) => {
  const { id } = req.query;
  try {
    const pool = await poolMysql();
    await pool.query<RowDataPacket[]>(query1, [id]);
    await pool.query<RowDataPacket[]>(query2, [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
export const deleteRow = async (
  req: Request,
  res: Response,
  poolMysql: () => Promise<Pool>,
  query: string,
) => {
  const { id } = req.query;
  try {
    const pool = await poolMysql();
    await pool.query<RowDataPacket[]>(query, [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
