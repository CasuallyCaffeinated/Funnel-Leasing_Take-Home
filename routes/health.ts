import { Request, Response } from 'express';
import getHealthStatus, { appStateStats } from '../api/getData';

const healthRouter = async (req: Request, res: Response) => {
    if (appStateStats.altitudesDataArray.length) {
        const satelliteHealth: string = getHealthStatus(
            appStateStats.altitudesDataArray
        );
        res.send(JSON.stringify(satelliteHealth));
    } else {
        res.send(JSON.stringify(`Error: No data`));
    }
};

export default healthRouter;
