import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allLinkNetwork = async (req: Request, res: Response) => {
  await getAllRow(req, res, pool, `SELECT * FROM network_link`, `network_link`);
};

export const linkNetwork = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM network_link WHERE id = ?`);
};

export const deleteLinkNetwork = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM network_link WHERE id = ?`);
};

export const createLinkNetwork = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await createEntity(req, res, 'network_link', 'NILIN', columns);
};

export const updateLinkNetwork = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await updateEntity(req, res, 'network_link', columns);
};
