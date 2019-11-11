import { Request, Response } from 'express';
import { ERROR_UNABLE_TO_REACH_DATABASE, ERROR_USER_NOT_ACCEPTED_TCS } from '../../errors';
import { User } from '../../interfaces/users';
import { UserDto } from '../../models/user.dto';
import UsersService from '../../services/users.service';

// TODO: Unit test the following
export class UserController {

    /**
     * Add Users who have accepted the Terms and Conditions to the Database.
     *
     * Note that the POST body is currently defined within the api.yml file.
     */
    addUsers(req: Request, res: Response): void {

        const {app, version} = req.params;

        const users = req.body as User[];
        const versionAsNumber: number = parseInt(version);

        try {
            const addUsersResponse = UsersService.addUsers(app, versionAsNumber, users);
            res.status(200).send(addUsersResponse.map(u => UserDto.fromModel(u)));
        } catch (error) {
            if (ERROR_UNABLE_TO_REACH_DATABASE) {
                res.status(500).send(error.message);
            }
        }
    }

    /**
     * Get all Users who have accepted a specific version of T&C's.
     */
    getUsers(req: Request, res: Response): void {

        const {app, version} = req.params;
        const versionAsNumber: number = parseInt(version);

        try {
            const users = UsersService.users(app, versionAsNumber);
            res.status(200).send(users.map(u => UserDto.fromModel(u)));
        } catch (error) {
            if (ERROR_UNABLE_TO_REACH_DATABASE) {
                res.status(500).send(error.message);
            }
        }
    }

    /**
     * Get all Users who have accepted a specific version of T&C's.
     *
     * Returns a 404 status code if the User has not accepted T&C's ie.
     * The User is not within the T&C's database.
     */
    getUser(req: Request, res: Response): void {

        const {app, version, userId} = req.params;
        const versionAsNumber: number = parseInt(version);

        try {
            const user = UsersService.user(app, versionAsNumber, userId);
            res.status(200).send(UserDto.fromModel(user));
        } catch (error) {
            switch (error.message) {
                case ERROR_UNABLE_TO_REACH_DATABASE:
                    res.status(500).send(error.message);
                    break;
                case ERROR_USER_NOT_ACCEPTED_TCS:
                    res.status(404).send(error.message);
                    break;
            }
        }
    }
}

export default new UserController();
