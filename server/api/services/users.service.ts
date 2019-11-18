import L from '../../common/logger';
import { db } from '../../database';
import { TCUserAgreement } from '../../database/models';
import { User } from '../interfaces/users';
import { Agreement } from '../../database/models/agreement.model';

/**
 * Users Service
 *
 * Currently working on.
 */
export class UsersService {
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

        return db.userAgreements.getAll({ app: appName, version });
    }

    /**
     * getUserAgreement
     *
     * @param appName - 'xui_webapp'
     * @param userId - ''
     * @param version (optional) - 1
     */
    public getUserAgreement(appName: string, userId: string, version?: number): Promise<Agreement> {
        L.info(`User has already accepted T&C's ${userId}`);
        return db.userAgreements.get({ user: userId, app: appName, version });
    }

    /**
     * userAgreement
     *
     * TODO: version is optional, if there is no version it defaults to the latest.
     * Happening on the DB side where it will automatically get the latest version,
     * if the latest version is not passed in.
     *
     * If the version is supplied then we query against that version, if no version
     * is supplied we query against the latest version
     *
     * @param appName - 'xui_webapp'
     * @param version - 2
     * @param user - @see unit test
     */
    public userAgreement(appName: string, user: User, version: number): Promise<TCUserAgreement> {
        L.info(`Adding users ${user}`);
        return db.userAgreements.add({ user: user.userId, app: appName, version });
    }
}

export default new UsersService();
