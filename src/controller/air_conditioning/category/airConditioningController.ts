import pool from '@/config/mySql';
import { getBigAssetRows } from '@/utils/getData';
import { Request, Response } from 'express';

export const allAirconditioning = async (req: Request, res: Response) => {
  await getBigAssetRows(
    req,
    res,
    pool,
    [
      `ca.ne_id as ne_id`,
      `ca.amount as amount`,
      `ca.waranty as waranty`,
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.device_id`,
      `suca.name AS type_name`,
    ],
    `air_conditioning`,
  );
};
