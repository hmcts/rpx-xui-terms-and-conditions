import L from '../../common/logger';
import {User} from '../interfaces/users';

export class UsersService {

    /**
     * Get Users who have accepted Terms and Conditions for this version
     *
     * TODO: Async call to Postgres
     * TODO: Mock to test call to Postgres
     * TODO: Throw errors back up from this service to controller, to dispatch
     * errors to calling service
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     */
    users(appName: string, version: number) {
        L.info(`Get all users for an app, with a particular version.`);
        return {
            appName,
            version,
        };
    }

    /**
     * Returns whether the user has previously accepted this Terms and Conditions version
     *
     * TODO: Throw errors back up from this service to controller, to dispatch
     * errors to calling service, it should be a 404 if the User has not, 200 if the User
     * has accepted the T&C's
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     * @param user - @see unit test
     */
    user(appName: string, version: number, user: User) {
        L.info(`User has already accepted T&C's ${user}`);
        return {
            appName,
            version,
            user,
        };
    }

    /**
     * Add a User who has accepted Terms and Conditions of this version
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     * @param user - @see unit test
     */
    addUser(appName: string, version: number, user: User) {
        L.info(`Adding user ${user}`);
        return {
            appName,
            version,
            user,
        };
    }
}

export default new UsersService();
