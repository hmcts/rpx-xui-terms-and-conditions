import { Request, Response } from 'express';
import config from 'config';
import * as secretsConfig from 'config';
import {getAppInsightsSecret, getEnvironment, getPostgresSecret} from '../../configuration'
import * as propertiesVolume from "@hmcts/properties-volume";

export class ConfigController {

    public async checkConfig(req: Request, res: Response): Promise<void> {

        propertiesVolume.addTo(secretsConfig);

        const response = {
            nodeConfigEnv: getEnvironment(),
            databaseHost: config.get<string>('database.host'),
            databasePort: parseInt(config.get<string>('database.port'), 10) as number,
            username: config.get<string>('database.username'),
            password: getPostgresSecret(secretsConfig, getEnvironment()),
            appInsightSecret: getAppInsightsSecret(secretsConfig)
        }

        res.status(200).send(response);
    }
}

export default new ConfigController();
