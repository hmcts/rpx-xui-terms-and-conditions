import { IDatabase, IMain } from 'pg-promise';
import { User } from '../../api/interfaces/users';
import { TCUserAgreement } from '../models';
import { Agreement } from '../models/agreement.model';
import { userAgreements as sql } from '../sql';

export class TCUserAgreementRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
    }

    // Creates the table;
    public create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Adds a new user, and returns the new object;
    public add(values: { user: string, app: string, version: number }): Promise<TCUserAgreement> {
        return this.db.one(sql.add, values);
    }

    // Check if user has agreed to latest version
    // Check if user has agreed to specific version
    public get(values: {user: string, app: string, version?: number}): Promise<Agreement> {
        if (values.version) {
            return this.db.one(sql.getWithVersion, values);
        } else {
            return this.db.one(sql.getForLatestVersion, values);
        }
    }

    public getAll(values: { app: string, version?: number }): Promise<User[]> {
        if (values.version) {
            return this.db.manyOrNone<User>(sql.getAllAcceptedWithVersion, values);
        } else {
            return this.db.manyOrNone<User>(sql.getAllAcceptedWithoutVersion, values);
        }
    }
}
