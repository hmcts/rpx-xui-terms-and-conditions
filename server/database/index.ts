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

const dbConfig = {
    host: process.env.POSTGRE_SERVER_NAME,
    port: <number>parseInt(process.env.POSTGRE_SERVER_PORT),
    database: process.env.POSTGRE_DB_NAME,
    user: process.env.POSTGRE_USERNAME,
    password: process.env.POSTGRE_PW,
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// so over here we are passing in the dbConfig object
// to pgp to initialise the db.

// Creating the database instance with extensions:
export const db: ExtendedProtocol = pgp(dbConfig);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);


