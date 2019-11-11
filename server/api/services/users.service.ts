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
     * getUserAgreements
     *
     * Get Users who have accepted Terms and Conditions for this version
     *
     * TODO: Async call to Postgres
     * TODO: Mock to test call to Postgres
     * TODO: Return Promise<Example[]>
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     */
    public getUserAgreements(appName: string, version: number) {
        L.info(`Get all users for an app, with a particular version.`);

        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);

        return [{ userId: 'jo' }, { userId: 'bob' }];
    }

    /**
     * getUserAgreement
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     * @param user - @see unit test
     */
    public getUserAgreement(appName: string, version: number, userId: string) {
        L.info(`User has already accepted T&C's ${userId}`);

        // throw Error(ERROR_USER_NOT_ACCEPTED_TCS);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);

        return { userId };
    }

    /**
     * userAgreement
     *
     * TODO: Calls the repository to add a row to TCUserAgreement indicating that the user has agreed to the specified
     * version of the T&Cs.
     *
     * TODO: version is optional, if there is no version it defaults to the latest.
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     * @param user - @see unit test
     */
    public userAgreement(appName: string, user: User, version: number) {
        L.info(`Adding users ${user}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return user;
    }
}

export default new UsersService();
