import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {TCDocument} from '../models';
import {documents as sql} from '../sql';
import {TCColumnSets} from '../models/tcColumnSet.model';

/**
 * TCDocumentRepository class - managed repository to the database table
 */
export class TCDocumentRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
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
    async add(values: { document: string, app: string, mimeType: string }): Promise<TCDocument> {
        return this.db.one(sql.add, values);
    }

    /**
     * Insert multi
     * @param values
     */
    async insert(values: { document: string, mimetype: string }[]): Promise<IResult> {
        const helpers = this.pgp.helpers;
        const insert = helpers.insert(values, TCDocumentRepository.cs.insert);
        return this.db.result(insert)
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

            cs.insert = new helpers.ColumnSet(['document', 'app', 'mimetype'], {table});
            cs.update = cs.insert.extend(['?id']);

            TCDocumentRepository.cs = cs;
        }
    }
}
