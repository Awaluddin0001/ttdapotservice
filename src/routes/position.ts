import { Router } from 'express';

import {
  allRoom,
  allFloor,
} from '../controller/site/category/positionController';

const position = Router();

// position
position.get('/rooms', allRoom);
position.get('/floors', allFloor);

export default position;
