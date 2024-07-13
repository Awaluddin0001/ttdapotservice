// src/index.ts
import express from 'express';
import cors from 'cors';
import electrical from './routes/electrical';

const app = express();
const hostname = '0.0.0.0'; // Specify the host you want

app.use(cors());
app.use(express.json());

app.use('/api/v1/dapot/electrical', electrical);

app.listen(Number(process.env.PORT || 2001), hostname, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
