import L from '../../common/logger';
import { User } from '../interfaces/users';
import { ERROR_UNABLE_TO_REACH_DATABASE, ERROR_USER_NOT_ACCEPTED_TCS } from '../errors';

/**
 * Users Service
 *
 * Currently working on.
 */
export class UsersService {
    /**
     * Get Users who have accepted Terms and Conditions for this version
     *
     * TODO: Async call to Postgres
     * TODO: Mock to test call to Postgres
     * TODO: Throw errors back up from this service to controller, to dispatch
     * errors to calling service
     * TODO: Return Promise<Example[]>
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     */
    users(appName: string, version: number) {
        L.info(`Get all users for an app, with a particular version.`);

        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);

        return [{ userId: 'jo' }, { userId: 'bob' }];
    }

    /**
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     * @param user - @see unit test
     */
    user(appName: string, version: number, userId: string) {
        L.info(`User has already accepted T&C's ${userId}`);

        // throw Error(ERROR_USER_NOT_ACCEPTED_TCS);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);

        return { userId };
    }

    /**
     * TODO: What happens if a User aleardy exists?
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     * @param user - @see unit test
     */
    addUsers(appName: string, version: number, users: User[]) {
        L.info(`Adding users ${users}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return users;
    }
}

export default new UsersService();
