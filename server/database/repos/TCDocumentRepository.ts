import {IMain} from 'pg-promise';
import {TCDocument} from '../models';
import {documents as sql} from '../sql';
import {TCColumnSets} from '../models/tcColumnSet.model';
import {ExtendedProtocol} from '../index';

/**
 * TCDocumentRepository class - managed repository to the database table
 */
export class TCDocumentRepository {

    constructor(private db: ExtendedProtocol, private pgp: IMain) {
        this.createColumnSets();
    }

    private static table = 'TCDocument';

    // ColumnSet objects static namespace:
    private static cs: TCColumnSets;

    /**
     * Create the schema table
     * @return Promise<null>
     */
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }


    /**
     * Adds a new record and returns the full object;
     * It is also an example of mapping HTTP requests into query parameters;
     * @param values
     */
    async add(values: { document: string, mimeType: string, apps: string[] }): Promise<TCDocument> {

        const dbApps = await this.db.apps.find(values.apps);

        if (!dbApps.length) {
            throw new Error(`Unknown apps: ${values.apps.join(',')}`);
        }

        const documentValues = {...values };
        delete documentValues.apps;

        return this.db.task(async task => {
            const document: TCDocument = await task.one(sql.add, documentValues);
            const docAppsInsert = dbApps.map( dbApp => {
                return { documentId: document.id, appId: dbApp.id }
            });
            await task.documentApps.insert(docAppsInsert);
            document.apps = dbApps;
            return Promise.resolve(document);
        });
    }

    // Tries to find a user product from user id + product name;
    async find(values: { userId: number, name: string }): Promise<TCDocument | null> {
        return this.db.oneOrNone(sql.find, {
            userId: +values.userId,
            productName: values.name
        });
    }

    // Returns all product records;
    async all(): Promise<TCDocument[]> {
        return this.db.any(`SELECT * FROM ${TCDocumentRepository.table}`);
    }

    // Returns the total number of products;
    async total(): Promise<number> {
        return this.db.one(`SELECT count(*) FROM ${TCDocumentRepository.table}`, [], (data: { count: string }) => +data.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnSets(): void {
        // create all ColumnSet objects only once:
        if (!TCDocumentRepository.cs) {
            const helpers = this.pgp.helpers, cs: TCColumnSets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: TCDocumentRepository.table, schema: 'public'});

            cs.insert = new helpers.ColumnSet(['document', 'mimeType'], {table});
            cs.update = cs.insert.extend(['?id']);

            TCDocumentRepository.cs = cs;
        }
    }
}
