import pgPromise = require('pg-promise'); // pg-promise core library
import process from 'process';
import { IDatabase, IInitOptions, IMain } from 'pg-promise';
import {
    Extensions,
    TCAppRepository,
    TCDocumentAppRepository,
    TCDocumentRepository,
    TCUserAgreementRepository,
} from './repos';
import { Diagnostics } from './diagnostics';
import config from 'config';

export type ExtendedProtocol = IDatabase<Extensions> & Extensions;

// pg-promise initialization options:
const initOptions: IInitOptions<Extensions> = {
    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: ExtendedProtocol) {
        obj.documents = new TCDocumentRepository(obj);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        obj.apps = new TCAppRepository(obj);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        obj.documentApps = new TCDocumentAppRepository(obj, pgp);
        obj.userAgreements = new TCUserAgreementRepository(obj);
    },
};

/**
 * environmentDatabaseConfig
 *
 * On the higher environments ie. AAT & Production these configuration values
 * are coming from custom-environment-variables.yaml
 *
 * This is as per the Reform standard. [25.11.2019]
 *
 * @see customer-environment-variables.yaml
 *
 * @param config
 * @returns
 */
export const environmentDatabaseConfig = (config: config.IConfig) => {
    return {
        host: config.get<string>('database.host'),
        port: parseInt(config.get<string>('database.port'), 10) as number,
        database: config.get<string>('database.name'),
        user: config.get<string>('database.username'),
        password: config.get<string>('secrets.rpx.postgresql-admin-pw'),
    };
};

// Initializing the library:
// TODO: Remove from global scope
const pgp: IMain = pgPromise(initOptions);

const setPgp = (unitTestEnvironment) => {
    if (unitTestEnvironment) {
        return null;
    }

    if (config.has('database.ssl') && JSON.parse(config.get('database.ssl'))) {
        pgp.pg.defaults.ssl = true;
    }
}

setPgp(process.env.UNIT_TEST_ENVIRONMENT);

/**
 * initialiseDatabase
 *
 * When we are running unit tests we do not want to connect to the Postgres database on
 * our local machine, and on our Jenkins pipelines.
 *
 * Using the package.send scripts tag `test` we pass in UNIT_TEST_ENVIRONMENT=true
 * which means when the Unit tests are run we do not attempt to connect to the db.
 *
 * Note that
 * <code>Diagnostics.init(initOptions);</code>
 * is used to allow database debugging.
 *
 * TODO: Place Diagnostics init into here.
 *
 * @param unitTestEnvironment ie. 'true'
 * @returns {ExtendedProtocol | null}
 */
const initialiseDatabase = (unitTestEnvironment): ExtendedProtocol | null => {
    if (unitTestEnvironment) {
        return null;
    }

    return pgp(environmentDatabaseConfig(config));
};

export const db: ExtendedProtocol = initialiseDatabase(process.env.UNIT_TEST_ENVIRONMENT);

Diagnostics.init(initOptions);
