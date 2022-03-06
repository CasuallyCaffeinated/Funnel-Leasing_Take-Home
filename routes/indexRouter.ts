import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send(
        `<div>
			<h1>Use either of the following endpoints to get the data you wish to see:</h1>
			<div>
			<h2>Satellite Stats: /api/satellite/stats</h2>
			</div>
			<div>
			<h2>Satellite Health Status: /api/satellite/health</h2>
			</div>
			
		</div>`
    );
});

export default router;
