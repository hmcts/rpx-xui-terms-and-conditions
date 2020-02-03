import { Request, Response } from 'express';
import config from 'config';
import * as secretsConfig from 'config';
import {getAppInsightsSecret, getPostgresSecret} from '../../configuration'
import * as propertiesVolume from "@hmcts/properties-volume";

export class ConfigController {

    public async checkConfig(req: Request, res: Response): Promise<void> {

        propertiesVolume.addTo(secretsConfig);

        const response = {
            nodeConfigEnv: process.env.NODE_CONFIG_ENV,
            environment: config.get('environment'),
            databaseHost: config.get<string>('database.host'),
            databasePort: parseInt(config.get<string>('database.port'), 10) as number,
            username: config.get<string>('database.username'),
            // usekeyvaultsecret: config.get('database.usekeyvaultsecret'),
            password: getPostgresSecret(secretsConfig, process.env.NODE_CONFIG_ENV),
            appInsightSecret: getAppInsightsSecret(secretsConfig)
        }

        console.log(config.get<string>('environment'));

        res.status(200).send(response);
    }
}

export default new ConfigController();
