import { Response, Request } from 'express';
import { satelliteData, altitudeAvg } from '../api/getData';
import StatsModel from '../api/stats.model';

const stats = async (req: Request, res: Response) => {
	// Provice some default values for the stats.
	let statsData: StatsModel = { minimum: 0, maximum: 0, average: 0 };

	// Assign values once API sends a response.
	statsData.minimum = Math.min(...satelliteData);
	statsData.maximum = Math.max(...satelliteData);
	statsData.average = altitudeAvg || 0;
	res.send(statsData);
};

export default stats;
