import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {TCDocumentApp} from '../models';
import {documentApps as sql} from '../sql';
import {TCColumnSets} from '../models/tcColumnSet.model';

export class TCDocumentAppRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
        this.createColumnSets();
    }

    private static table = 'TCDocumentApp';

    // ColumnSet objects static namespace:
    private static cs: TCColumnSets;

    // Creates the table;
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Adds a document app
    async add(values: {documentId: number, app: string}): Promise<TCDocumentApp> {
        return this.db.one(sql.add, values);
    }

    /**
     * Insert multi
     * @param values
     */
    async insert(values: { documentId: number, appId: number }[]): Promise<IResult> {
        const helpers = this.pgp.helpers;
        const insert = helpers.insert(values, TCDocumentAppRepository.cs.insert);
        return this.db.result(insert)
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    async remove(id: number): Promise<number> {
        return this.db.result(`DELETE FROM ${TCDocumentAppRepository.table} WHERE id = $1`, +id, (r: IResult) => r.rowCount);
    }

    // Returns all user records;
    async all(): Promise<TCDocumentApp[]> {
        return this.db.any(`SELECT * FROM ${TCDocumentAppRepository.table}`);
    }

    // Returns the total number of users;
    async total(): Promise<number> {
        return this.db.one(`SELECT count(*) FROM ${TCDocumentAppRepository.table}`, [], (a: { count: string }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnSets(): void {
        // create all ColumnSet objects only once:
        if (!TCDocumentAppRepository.cs) {
            const helpers = this.pgp.helpers, cs: TCColumnSets = {};

            const table = new helpers.TableName({table: TCDocumentAppRepository.table, schema: 'public'});

            cs.insert = new helpers.ColumnSet(['documentId', 'appId'], {table});
            cs.update = cs.insert.extend(['?id']);

            TCDocumentAppRepository.cs = cs;
        }
    }

}
