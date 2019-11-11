import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {TCUserAgreement} from '../models';
import {userAgreements as sql} from '../sql';

export class TCUserAgreementRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
        this.createColumnSets();
    }

    private static table = 'tcuseragreement';

    // ColumnSet objects static namespace:
    private static cs: UserColumnSets;

    // Creates the table;
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Adds a new user, and returns the new object;
    async add(name: string): Promise<TCUserAgreement> {
        return this.db.one(sql.add, name);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    async remove(id: number): Promise<number> {
        return this.db.result(`DELETE FROM ${TCUserAgreementRepository.table} WHERE id = $1`, +id, (r: IResult) => r.rowCount);
    }

    // Returns all user records;
    async all(): Promise<TCUserAgreement[]> {
        return this.db.any(`SELECT * FROM ${TCUserAgreementRepository.table}`);
    }

    // Returns the total number of users;
    async total(): Promise<number> {
        return this.db.one(`SELECT count(*) FROM ${TCUserAgreementRepository.table}`, [], (a: { count: string }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnSets(): void {
        // create all ColumnSet objects only once:
        if (!TCUserAgreementRepository.cs) {
            const helpers = this.pgp.helpers, cs: UserColumnSets = {};

            const table = new helpers.TableName({table: TCUserAgreementRepository.table, schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            TCUserAgreementRepository.cs = cs;
        }
    }

}

type UserColumnSets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
