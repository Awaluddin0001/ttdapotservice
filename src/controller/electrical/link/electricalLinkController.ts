import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allLinkElectrical = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM electrical_link`,
    `electrical_link`,
  );
};

export const linkElectrical = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM electrical_link WHERE id = ?`);
};

export const deleteLinkElectrical = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM electrical_link WHERE id = ?`);
};

export const createLinkElectrical = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await createEntity(req, res, 'electrical_link', 'ELLIN', columns);
};

export const updateLinkElectrical = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await updateEntity(req, res, 'electrical_link', columns);
};
