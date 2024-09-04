import pool from '@/config/mySql';
import { getBigAssetRows } from '@/utils/getData';
import { Request, Response } from 'express';

export const allFinishing = async (req: Request, res: Response) => {
  await getBigAssetRows(
    req,
    res,
    pool,
    [`ca.device_id`, `suca.name AS type_name`],
    `building_finishes`,
  );
};
