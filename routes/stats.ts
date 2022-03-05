import { Response, Request } from 'express';
import { appStateStats } from '../api/getData';
import StatsModel from '../api/stats.model';

const statsRouter = async (req: Request, res: Response) => {
    // Provice some default values for the stats.
    let statsData: StatsModel = { minimum: 0, maximum: 0, average: 0 };

    // Assign values once API sends a response.
    statsData.minimum = Math.min(...appStateStats.altitudesDataArray);
    statsData.maximum = Math.max(...appStateStats.altitudesDataArray);
    statsData.average = appStateStats.altitudeAvg || 0;
    res.send(statsData);
};

export default statsRouter;
