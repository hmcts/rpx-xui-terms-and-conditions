import {TCDocument} from '../models';
import {documents as sql} from '../sql';
import {ExtendedProtocol} from '../index';

/**
 * TCDocumentRepository class - managed repository to the database table
 */
export class TCDocumentRepository {

    constructor(private db: ExtendedProtocol) {}

    /**
     * Create the schema table
     * @return Promise<null>
     */
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

    /**
     * Create a new version of a document for the specific apps
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

    /**
     * Retrieve a document by it's unique id
     * @param values: { documentId: number }
     */
    async find(values: { documentId: number }): Promise<TCDocument | null> {
        return this.db.oneOrNone(sql.find, {
            id: +values.documentId
        });
    }

    /**
     * Retrieve the latest version of a document for the specified app
     * @param values: { app: string }
     */
    async findLatest(values: { app: string }) {
        return this.db.oneOrNone(sql.findLatest, values);
    }

    /**
     * Retrieve a specific version of a document for the specified app
     * @param values
     */
    async findByVersion(values: { app: string, version: number }) {
        return this.db.oneOrNone(sql.findByVersion, values);
    }

    /**
     * Retrieve all documents
     * @returns Promise<TCDocument[]>
     */
    async all( values: { app: string }): Promise<TCDocument[]> {
        return this.db.any(sql.all, values);
    }

    /**
     * @returns number the total count of documents
     */
    async total( values: { app: string }): Promise<number> {
        return this.db.one(sql.total, values, (data: { count: string }) => +data.count);
    }
}
