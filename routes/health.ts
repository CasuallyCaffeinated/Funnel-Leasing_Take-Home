import { Request, Response } from 'express';
import healthStatus from '../utils/healthCheck';
import { altitudesDataArray } from '../api/getData';

const health = async (req: Request, res: Response) => {
	if (altitudesDataArray.length) {
		const satelliteHealth: string = healthStatus(altitudesDataArray);
		res.send(JSON.stringify(satelliteHealth));
	}
};

export default health;
