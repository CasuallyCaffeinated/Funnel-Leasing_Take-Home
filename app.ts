import express from 'express';
import indexRouter from './routers/indexRouter';
import statsRouter from './routers/statsRouter';
import healthRouter from './routers/healthRouter';
import { initSatelliteDataService } from './api/satelliteData.service';

initSatelliteDataService();

const app = express();

app.use('/', indexRouter);
app.get('/api/satellite/stats', statsRouter);
app.get('/api/satellite/health', healthRouter);

export default app;
