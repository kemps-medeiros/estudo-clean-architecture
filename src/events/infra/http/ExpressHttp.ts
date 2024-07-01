import express from 'express';
import Http from './Http';

export default class ExpressHttp implements Http {
	app: any;
	server: any;

	constructor () {
		this.app = express();
	}
	
	async route(method: string, url: string, callback: any): Promise<any> {
		this.app[method](url, async function (req: any, res: any) {
			const result = await callback(req.params, req.body);
			res.json(result);
		});
	}

	async listen(port: number): Promise<void> {
		this.server = await this.app.listen(port);
	}

	async close(): Promise<void> {
		await this.server.close();
	}
}