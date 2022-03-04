import { Request, Response } from 'express';
import healthStatus from '../utils/healthCheck';
import { satelliteData } from '../api/getData';

const health = async (req: Request, res: Response) => {
	if (satelliteData.length) {
		const satelliteHealth: string = healthStatus(satelliteData);
		res.send(JSON.stringify(satelliteHealth));
	}
};

export default health;
