import express from 'express';
import indexRouter from './routes/indexRouter';
import statsRouter from './routes/statsRouter';
import healthRouter from './routes/healthRouter';
import { initSatelliteDataService } from './api/satelliteData.service';

initSatelliteDataService();

const app = express();

app.use('/', indexRouter);
app.get('/api/satellite/stats', statsRouter);
app.get('/api/satellite/health', healthRouter);

export default app;
