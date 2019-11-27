import pgPromise = require('pg-promise'); // pg-promise core library
import process from 'process';
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import {
    Extensions,
    TCAppRepository,
    TCDocumentAppRepository,
    TCDocumentRepository,
    TCUserAgreementRepository
} from './repos';
import {Diagnostics} from './diagnostics';
import config from 'config';

export type ExtendedProtocol = IDatabase<Extensions> & Extensions;

// pg-promise initialization options:
const initOptions: IInitOptions<Extensions> = {

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: ExtendedProtocol, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases with different access API.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        obj.documents = new TCDocumentRepository(obj);
        obj.apps = new TCAppRepository(obj, pgp);
        obj.documentApps = new TCDocumentAppRepository(obj, pgp);
        obj.userAgreements = new TCUserAgreementRepository(obj);
    }
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
const environmentDatabaseConfig = config => {
    return {
        host: config.get('database.host'),
        port: <number>parseInt(config.get('database.port')),
        database: config.get('database.name'),
        user: config.get('database.username'),
        //password: config.get('secrets.rpx.postgresql-pw'),
        password: config.get('atabase.username'),
    }
};

// Initializing the library:
// TODO: Remove from global scope
const pgp: IMain = pgPromise(initOptions);

/**
 * initialiseDatabase
 *
 * When we are running unit tests we do not want to connect to the Postgres database on
 * our local machine, and on our Jenkins pipelines.
 *
 * Using the package.json scripts tag `test` we pass in UNIT_TEST_ENVIRONMENT=true
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
