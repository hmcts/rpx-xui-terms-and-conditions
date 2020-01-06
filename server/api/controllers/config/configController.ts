import { Request, Response } from 'express';
import config from 'config';

export class ConfigController {

    public async checkConfig(req: Request, res: Response): Promise<void> {

        const response = {
            environment: config.get('environment'),
            environmentTest: config.get('environmentTest'),
            host: config.get('database.host'),
            port: parseInt(config.get<string>('database.port'), 10) as number,
            database: config.get<string>('database.name'),
            user: config.get<string>('database.username'),
            password: config.get<string>('secrets.rpx.postgresql-admin-pw'),
        }

        console.log(config.get<string>('environment'));

        res.status(200).send(response);
    }
}

export default new ConfigController();
