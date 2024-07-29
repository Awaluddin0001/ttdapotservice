// src/index.ts
import express from 'express';
import cors from 'cors';
import ac from '@/routes/air_conditioning';
import building_finishes from '@/routes/building_finishes';
import conveyance from '@/routes/conveyance';
import electrical from '@/routes/electrical';
import extinguish from '@/routes/extinguish';
import fluid from '@/routes/fluid';
import furniture from '@/routes/furniture';
import lighting from '@/routes/lighting';
import network from '@/routes/network';
import safety from '@/routes/safety';
import security from '@/routes/security';
import position from '@/routes/position';

const app = express();
const hostname = '0.0.0.0'; // Specify the host you want

app.use(cors());
app.use(express.json());

app.use('/api/v1/dapot/airconditioning', ac);
app.use('/api/v1/dapot/buildingfinishes', building_finishes);
app.use('/api/v1/dapot/conveyance', conveyance);
app.use('/api/v1/dapot/electrical', electrical);
app.use('/api/v1/dapot/extinguish', extinguish);
app.use('/api/v1/dapot/fluid', fluid);
app.use('/api/v1/dapot/furniture', furniture);
app.use('/api/v1/dapot/lighting', lighting);
app.use('/api/v1/dapot/network', network);
app.use('/api/v1/dapot/safety', safety);
app.use('/api/v1/dapot/security', security);
app.use('/api/v1/dapot/position', position);

app.listen(Number(process.env.PORT || 2001), hostname, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
