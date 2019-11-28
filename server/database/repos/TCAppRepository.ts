import { IResult } from 'pg-promise/typescript/pg-subset';
import { TCApp } from '../models';
import { apps as sql } from '../sql';
import { ExtendedProtocol } from '../index';

export class TCAppRepository {
    constructor(private db: ExtendedProtocol) {}

    private static table = 'TCApp';

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
}
