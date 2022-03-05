import { Request, Response } from 'express';
import getHealthStatus, { satelliteState } from '../api/satelliteData.service';

const healthRouter = async (req: Request, res: Response) => {
    if (satelliteState.altitudesDataArray.length) {
        const satelliteHealth = getHealthStatus();
        res.send(JSON.stringify(satelliteHealth));
    } else {
        res.send(JSON.stringify(`Error: No data`));
    }
};

export default healthRouter;
