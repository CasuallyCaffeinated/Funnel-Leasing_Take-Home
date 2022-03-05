import express from 'express';
import routerIdx from './routes/index';
import statsRouter from './routes/stats';
import healthRouter from './routes/health';
import { initSatelliteDataService } from './api/satelliteData.service';

initSatelliteDataService();

const app = express();

app.use('/', routerIdx);
app.get('/api/satellite/stats', statsRouter);
app.get('/api/satellite/health', healthRouter);

export default app;
