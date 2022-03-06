import { Response, Request } from 'express';
import { satelliteState } from '../api/satelliteData.service';
import { Stats } from '../types/stats.type';

const statsRouter = async (req: Request, res: Response) => {
    const statsData: Stats = {};

    if (satelliteState.altitudesDataArray.length) {
        statsData.minimum = Math.min(...satelliteState.altitudesDataArray);
        statsData.maximum = Math.max(...satelliteState.altitudesDataArray);
        statsData.average = satelliteState.altitudeAvg;
    } else {
        statsData.minimum = 0;
        statsData.maximum = 0;
        statsData.average = 0;
    }
    res.send(statsData);
};

export default statsRouter;
