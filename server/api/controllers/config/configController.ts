import { Request, Response } from 'express';
import config from 'config';

export class ConfigController {

    public async checkConfig(req: Request, res: Response): Promise<void> {

        const response = {
            environment: config.get('environment'),

            // Postgres Server Name
            databaseHost: config.get<string>('database.host'),

            // Postgres Server Port
            databasePort: parseInt(config.get<string>('database.port'), 10) as number,

            // Postgres Username
            username: config.get<string>('database.username'),

            // Postgres Password
            password: config.get<string>('secrets.rpx.postgresql-admin-pw'),
        }

        console.log(config.get<string>('environment'));

        res.status(200).send(response);
    }
}

export default new ConfigController();
