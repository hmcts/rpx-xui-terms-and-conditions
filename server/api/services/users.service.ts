import L from '../../common/logger';
import {User} from '../interfaces/users';
import {ERROR_UNABLE_TO_REACH_DATABASE, ERROR_USER_NOT_ACCEPTED_TCS} from '../errors';

// TODO: Let's get it to return mock data, using Promise
export class UsersService {
    // all(): Promise<Example[]> {
    //     L.info(examples, 'fetch all examples');
    //     return Promise.resolve(examples);
    // }
    //
    // byId(id: number): Promise<Example> {
    //     L.info(`fetch example with id ${id}`);
    //     return this.all().then(result => result[id]);
    // }

    /**
     * Get Users who have accepted Terms and Conditions for this version
     *
     * TODO: Async call to Postgres
     * TODO: Mock to test call to Postgres
     * TODO: Throw errors back up from this service to controller, to dispatch
     * errors to calling service
     * TODO: Return type
     * TODO: Should we pass back the status code to the controller as well?
     * Shouldn't this be up to the controller to set?
     *
     * @param appName - 'XUI-WEBAPP'
     * @param version - 2
     */
    users(appName: string, version: number) {
        L.info(`Get all users for an app, with a particular version.`);

        // You're able to throw errors here which will bubble up
        // to the controller catch to handle
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);

        return [{userId: 'jo'}, {userId: 'bob'}];
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
    user(appName: string, version: number, userId: string) {
        L.info(`User has already accepted T&C's ${userId}`);

        // throw Error(ERROR_USER_NOT_ACCEPTED_TCS);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);

        return { userId };
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
