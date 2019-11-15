import { IDatabase, IMain } from 'pg-promise';
import { TCUserAgreement } from '../models';
import { userAgreements as sql } from '../sql';
import { Agreement } from '../models/agreement.model';

export class TCUserAgreementRepository {

    constructor(private db: IDatabase<any>, private pgp: IMain) {
    }

    // Creates the table;
    public create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Adds a new user, and returns the new object;
    public add(values: { user: string, app: string, version?: number }): Promise<TCUserAgreement> {
        if (values.version) {
            return this.db.one(sql.add, values);
        } else {
            return this.db.one(sql.addNoVersion, values);
        }
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
}
