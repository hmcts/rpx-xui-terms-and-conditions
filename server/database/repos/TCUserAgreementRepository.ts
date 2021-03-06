import { User } from '../../api/interfaces/users';
import { TCUserAgreement } from '../models';
import { Agreement } from '../models/agreement.model';
import { userAgreements as sql } from '../sql';
import { ExtendedProtocol } from '../index';

export class TCUserAgreementRepository {
    constructor(private db: ExtendedProtocol) {}

    // Creates the table;
    public create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Adds a new user, and returns the new object;
    public add(values: { user: string; app: string; version?: number }): Promise<TCUserAgreement> {
        if (values.version) {
            return this.db.one(sql.add, values);
        } else {
            return this.db.one(sql.addNoVersion, values);
        }
    }

    // Check if user has agreed to latest version
    // Check if user has agreed to specific version
    public get(values: { user: string; app: string; version?: number }): Promise<Agreement> {
        if (values.version) {
            return this.db.one(sql.getWithVersion, values);
        } else {
            return this.db.one(sql.getForLatestVersion, values);
        }
    }

    public getAll(values: { app: string; version?: number }): Promise<User[]> {
        if (values.version) {
            return this.db.manyOrNone<User>(sql.getAllAcceptedWithVersion, values);
        } else {
            return this.db.manyOrNone<User>(sql.getAllAcceptedWithoutVersion, values);
        }
    }
}
