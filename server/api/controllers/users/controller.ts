import UsersService from '../../services/users.service';
import {Request, Response} from 'express';
import {ERROR_UNABLE_TO_REACH_DATABASE, ERROR_USER_NOT_ACCEPTED_TCS} from '../../errors';
import {User} from '../../interfaces/users';

export class Controller {

    putUser(req: Request, res: Response): void {

        const { app, version } = req.params;
        const { userId } = req.body;

        // try {
        //     const users = UsersService.users(app, versionAsNumber);
        //     res.status(200).send(users);
        // } catch (error) {
        //     if (ERROR_UNABLE_TO_REACH_DATABASE) {
        //         res.status(500).send(error.message);
        //     }
        // }
    }


    // TODO: Connect up these to the service
    // TODO: Unit test
    // TODO: No result
    /**
     * Get Users
     */
    getUsers(req: Request, res: Response): void {

        const {app, version} = req.params;
        const versionAsNumber: number = parseInt(version);

        try {
            const users = UsersService.users(app, versionAsNumber);
            res.status(200).send(users);
        } catch (error) {
            if (ERROR_UNABLE_TO_REACH_DATABASE) {
                res.status(500).send(error.message);
            }
        }
    }

    /**
     * Get if the User has accepted a particular version of
     * Terms and Conditions copy.
     *
     * hasUserAcceptedTermsAndConditions
     */
    getUser(req: Request, res: Response): void {

        const {app, version, userId} = req.params;
        const versionAsNumber: number = parseInt(version);

        try {
            const user = UsersService.user(app, versionAsNumber, userId);
            res.status(200).send(user);
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

export default new Controller();
