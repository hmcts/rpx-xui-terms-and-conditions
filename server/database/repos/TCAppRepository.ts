import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {TCDocumentApp} from '../models';
import {apps as sql} from '../sql';
import {TCColumnSets} from '../models/tcColumnSet.model';

export class TCAppRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
        this.createColumnSets();
    }

    private static table = 'TCApp';

    // ColumnSet objects static namespace:
    private static cs: TCColumnSets;

    // Creates the table;
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Adds a document app
    async add(app: string): Promise<TCDocumentApp> {
        return this.db.one(sql.add, app);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    async remove(id: number): Promise<number> {
        return this.db.result(`DELETE FROM ${TCAppRepository.table} WHERE id = $1`, +id, (r: IResult) => r.rowCount);
    }

    // Returns all user records;
    async all(): Promise<TCDocumentApp[]> {
        return this.db.any(`SELECT * FROM ${TCAppRepository.table}`);
    }

    // Returns the total number of users;
    async total(): Promise<number> {
        return this.db.one(`SELECT count(*) FROM ${TCAppRepository.table}`, [], (a: { count: string }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnSets(): void {
        // create all ColumnSet objects only once:
        if (!TCAppRepository.cs) {
            const helpers = this.pgp.helpers, cs: TCColumnSets = {};

            const table = new helpers.TableName({table: TCAppRepository.table, schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            TCAppRepository.cs = cs;
        }
    }

}
