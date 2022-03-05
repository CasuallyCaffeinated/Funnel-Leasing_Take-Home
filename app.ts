import express from 'express';
import routerIdx from './routes/index';
import routerStats from './routes/stats';
import routerHealth from './routes/health';
import { getAltitudesArray } from './api/getData';

const app = express();

app.use('/', routerIdx);
app.get('/api/satellite/stats', routerStats);
app.get('/api/satellite/health', routerHealth);

setInterval(getAltitudesArray, 10000);

export default app;
