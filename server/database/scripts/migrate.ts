import { migrate, MigrateDBConfig } from 'postgres-migrations';
import { environmentDatabaseConfig } from '../index';
import config from 'config';
import * as path from 'path';
import * as pg from 'pg';

export const MIGRATIONS_PATH = path.join(__dirname, '../migrations');

// check whether to use SSL
if (config.has('database.ssl') && JSON.parse(config.get('database.ssl'))) {
    pg.defaults.ssl = true;
}

migrate((environmentDatabaseConfig(config) as any) as MigrateDBConfig, MIGRATIONS_PATH, {
    logger: msg => console.log(msg),
})
    .then(() => {
        console.log('migrate complete');
    })
    .catch(err => {
        console.log('migrations failed', err);
    });
