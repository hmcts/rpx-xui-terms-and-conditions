import { migrate, MigrateDBConfig } from 'postgres-migrations';
import { environmentDatabaseConfig } from '../index';
import config from 'config';
import * as path from 'path';

console.log(environmentDatabaseConfig);

export const MIGRATIONS_PATH = path.join(__dirname, '../migrations');

migrate((environmentDatabaseConfig(config) as any) as MigrateDBConfig, MIGRATIONS_PATH, {
    logger: msg => console.log(msg),
})
    .then(() => {
        console.log('migrate complete');
    })
    .catch(err => {
        console.log('migrations failed', err);
    });
