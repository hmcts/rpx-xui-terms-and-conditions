import { IMain } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { TCApp } from '../models';
import { apps as sql } from '../sql';
import { TCColumnSets } from '../models/tcColumnSet.model';
import { ExtendedProtocol } from '../index';

export class TCAppRepository {
    constructor(private db: ExtendedProtocol, private pgp: IMain) {
        this.createColumnSets();
    }

    private static table = 'TCApp';

    // ColumnSet objects static namespace:
    private static cs: TCColumnSets;

    // Creates the table;
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

    async init(): Promise<IResult> {
        const values: { app: string }[] = [
            {
                app: 'xuiwebapp',
            },
            {
                app: 'xuimowebapp',
            },
        ];
        const helpers = this.pgp.helpers;
        const insert = helpers.insert(values, TCAppRepository.cs.insert) + ' ON CONFLICT DO NOTHING';
        return this.db.result(insert);
    }

    // Tries to find a user product from user id + product name;
    async find(apps: string[]): Promise<TCApp[] | null> {
        return this.db.manyOrNone(sql.find, {
            apps: apps,
        });
    }

    // Adds a document app
    async add(app: string): Promise<TCApp> {
        return this.db.one(sql.add, app);
    }

    // Tries to delete an app by id, and returns the number of records deleted;
    async remove(id: number): Promise<number> {
        return this.db.result(`DELETE FROM ${TCAppRepository.table} WHERE id = $1`, +id, (r: IResult) => r.rowCount);
    }

    // Returns all app records;
    async all(): Promise<TCApp[]> {
        return this.db.any(sql.all);
    }

    // Returns the total number of apps;
    async total(): Promise<number> {
        return this.db.one(`SELECT count(*) FROM ${TCAppRepository.table}`, [], (a: { count: string }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnSets(): void {
        // create all ColumnSet objects only once:
        if (!TCAppRepository.cs) {
            const helpers = this.pgp.helpers,
                cs: TCColumnSets = {};

            const table = new helpers.TableName({ table: TCAppRepository.table, schema: 'public' });

            cs.insert = new helpers.ColumnSet(['app'], { table });
            cs.update = cs.insert.extend(['?id']);

            TCAppRepository.cs = cs;
        }
    }
}
