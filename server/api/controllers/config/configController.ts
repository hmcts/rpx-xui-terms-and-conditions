import { Request, Response } from 'express';
import config from 'config';
import * as secretsConfig from 'config';

export class ConfigController {

    public async checkConfig(req: Request, res: Response): Promise<void> {

        const response = {
            nodeConfigEnv: process.env.NODE_CONFIG_ENV,

            environment: config.get('environment'),

            // Postgres Server Name
            databaseHost: config.get<string>('database.host'),

            // Postgres Server Port
            databasePort: parseInt(config.get<string>('database.port'), 10) as number,

            // Postgres Username
            username: config.get<string>('database.username'),

            // Postgres Password
            password: secretsConfig['secrets']['rpx']['postgresql-admin-pw'],
        }

        console.log(config.get<string>('environment'));

        res.status(200).send(response);
    }
}

export default new ConfigController();
