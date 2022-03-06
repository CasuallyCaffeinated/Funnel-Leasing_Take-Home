import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send(
        `<div>
			<h1>Use either of the following endpoints to get the data you wish to see:</h1>
			<div>
			<h2>
				<a href="http://localhost:8081/api/satellite/stats" target="_blank">Satellite Stats Data</a>
			</h2>
			</div>

			<div>
			<h2>
			<a href="http://localhost:8081/api/satellite/health" target="_blank">Satellite Health Status</a>
			</h2>		
			</div>
		</div>
		`
    );
});

export default router;
