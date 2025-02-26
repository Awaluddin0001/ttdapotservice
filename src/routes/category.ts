import { countRowData } from '@/controller/category/countAllRowCategory';
import { Router } from 'express';

const categoryRoutes = Router();

// conveyance
categoryRoutes.get('/count', countRowData);

export default categoryRoutes;
