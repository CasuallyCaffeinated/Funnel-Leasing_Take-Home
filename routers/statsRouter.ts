import { Response, Request } from 'express';
import { satelliteState } from '../api/satelliteData.service';
import StatsModel from '../types/stats.type';

const statsRouter = async (req: Request, res: Response) => {
    // Provice some default values for the stats.
    let statsData: StatsModel = { minimum: 0, maximum: 0, average: 0 };

    // Assign values once API sends a response.
    statsData.minimum = Math.min(...satelliteState.altitudesDataArray);
    statsData.maximum = Math.max(...satelliteState.altitudesDataArray);
    statsData.average = satelliteState.altitudeAvg || 0;
    res.send(statsData);
};

export default statsRouter;
