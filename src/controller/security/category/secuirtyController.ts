import pool from '@/config/mySql';
import { getBigAssetRows } from '@/utils/getData';
import { Request, Response } from 'express';

export const allSecurity = async (req: Request, res: Response) => {
  await getBigAssetRows(
    req,
    res,
    pool,
    [
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.device_id`,
      `suca.name AS type_name`,
    ],
    `security`,
  );
};
