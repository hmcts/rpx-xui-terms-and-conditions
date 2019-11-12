import pgPromise = require('pg-promise'); // pg-promise core library
import process from 'process';
import {IInitOptions, IDatabase, IMain} from 'pg-promise';
import {
    IExtensions,
    TCAppRepository,
    TCDocumentAppRepository,
    TCDocumentRepository,
    TCUserAgreementRepository
} from './repos';
import {Diagnostics} from './diagnostics';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: ExtendedProtocol, dc: any) {
        // Database Context (dc) is mainly needed for extending multiple databases with different access API.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        obj.documents = new TCDocumentRepository(obj, pgp);
        obj.apps = new TCAppRepository(obj, pgp);
        obj.documentApps = new TCDocumentAppRepository(obj, pgp);
        obj.userAgreements = new TCUserAgreementRepository(obj, pgp);
    }
};

/*const dbConfig = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_HOST
};*/


const dbConfig = {
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres_user',
    password: 'password'
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
export const db: ExtendedProtocol = pgp(dbConfig);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);


