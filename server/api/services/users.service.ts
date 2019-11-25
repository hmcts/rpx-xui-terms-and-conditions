import L from '../../common/logger';
import { db } from '../../database';
import { TCUserAgreement } from '../../database/models';
import { User } from '../interfaces/users';
import { Agreement } from '../../database/models/agreement.model';
import { TCUserAgreementRepository } from '../../database/repos/TCUserAgreementRepository';

/**
 * Users Service
 *
 * Currently working on.
 */
export class UsersService {

    // Ok so here we have lots of calls to the db

    /**
     * getUserAgreements
     *
     * Get Users who have accepted Terms and Conditions for this version
     *
     * TODO: Async call to Postgres
     * TODO: Mock to test call to Postgres
     * TODO: Return Promise<Example[]>
     *
     * @param appName - 'xui_webapp'
     * @param version - 2
     */
    public getUserAgreements(appName: string, version?: number): Promise<User[]> {
        L.info(`Get all users for an app, with a particular version.`);
        return this.getAgreements().getAll({ app: appName, version });
    }

    /**
     * getUserAgreement
     *
     * @param appName - 'xui_webapp'
     * @param userId - ''
     * @param version (optional) - 1
     */
    public getUserAgreement(appName: string, userId: string, version?: number): Promise<Agreement> {
        L.info(`Has user ${userId} accepted T&C's ${version ? 'version ' + version : 'latest version'}?`);
        return this.getAgreements().get({ user: userId, app: appName, version });
    }

    /**
     * userAgreement
     *
     * If the version is supplied then we query against that version, if no version
     * is supplied we query against the latest version
     *
     * @param appName - 'xui_webapp'
     * @param version - 2
     * @param user - @see unit test
     */
    public userAgreement(appName: string, user: User, version?: number): Promise<TCUserAgreement> {
        L.info(`Adding users ${user}`);
        return this.getAgreements().add({ user: user.userId, app: appName, version });
    }

    /**
     * Can we mock this? therefore we do not call the DB.
     * @returns {TCUserAgreementRepository}
     */
    public getAgreements(): TCUserAgreementRepository {
        return db.userAgreements;
    }
}

export default new UsersService();
