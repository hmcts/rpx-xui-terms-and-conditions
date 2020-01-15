import { migrate, MigrateDBConfig } from 'postgres-migrations';
import { db } from '../index';
import * as path from 'path';

export const MIGRATIONS_PATH = path.join(__dirname, '../migrations');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
migrate(({ client: db.$pool as any } as unknown) as MigrateDBConfig, MIGRATIONS_PATH, {
    logger: msg => console.log(msg),
})
    .then(() => {
        console.log('migrate complete');
        db.$pool.end();
    })
    .catch(err => {
        console.log('migrations failed', err);
    });
