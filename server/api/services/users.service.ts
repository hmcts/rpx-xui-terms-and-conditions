import L from '../../common/logger';
import { db } from '../../database';
import { TCUserAgreement } from '../../database/models';
import { User } from '../interfaces/users';
import { Agreement } from '../../database/models/agreement.model';
import documentManagementService from './documentManagement.service';

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
     * @param app - 'xui_webapp'
     * @param version? - 2
     */
    public async getUserAgreements(app: string, version?: number): Promise<User[]> {
        L.info(`Get all users for an app, with a particular version.`);
        const values = { app, version };

        if (version) {
            // test if a document for app/version exists
            await documentManagementService.byVersion(app, version);
        }
        return db.userAgreements.getAll(values);
    }

    /**
     * getUserAgreement
     *
     * @param app - 'xui_webapp'
     * @param userId - ''
     * @param version (optional) - 1
     */
    public getUserAgreement(app: string, userId: string, version?: number): Promise<Agreement> {
        L.info(`Has user ${userId} accepted T&C's ${version ? 'version ' + version : 'latest version'}?`);
        return db.userAgreements.get({ user: userId, app: app, version });
    }

    /**
     * userAgreement
     *
     * If the version is supplied then we query against that version, if no version
     * is supplied we query against the latest version
     *
     * @param app - 'xui_webapp'
     * @param version - 2
     * @param user - @see unit test
     */
    public userAgreement(app: string, user: User, version?: number): Promise<TCUserAgreement> {
        L.info(`Adding users ${user}`);
        return db.userAgreements.add({ user: user.userId, app: app, version });
    }
}

export default new UsersService();
