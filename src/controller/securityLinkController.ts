import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allSecurityLink = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM security_link`,
    `security_link`,
  );
};

export const SecurityLink = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM security_link WHERE id = ?`,
  );
};

export const deleteSecurityLink = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM security_link WHERE id = ?`,
  );
};

export const createSecurityLink = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await createEntity(req, res, 'security_link', 'SELIN', columns);
};

export const updateSecurityLink = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await updateEntity(req, res, 'security_link', columns);
};
