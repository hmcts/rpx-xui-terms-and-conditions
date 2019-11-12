import { Request, Response } from 'express';
import { ERROR_UNABLE_TO_REACH_DATABASE, ERROR_USER_NOT_ACCEPTED_TCS } from '../../errors';
import { User } from '../../interfaces/users';
import { UserDto } from '../../models/user.dto';
import UsersService from '../../services/users.service';

// TODO: Unit test the following
export class UserController {

    /**
     * acceptTermsConditions
     *
     * Add a UUID who has accepted the Terms and Conditions.
     *
     * Note that the POST body is currently defined within the api.yml file.
     */
    acceptTermsConditions(req: Request, res: Response): void {

        const {app, version} = req.params;

        console.log('app');
        console.log(app);

        const user = req.body as User;
        const versionAsNumber: number = parseInt(version);

        try {
            const userAgreementResponse = UsersService.userAgreement(app, user, versionAsNumber);
            res.status(200).send(UserDto.fromModel(userAgreementResponse));
        } catch (error) {
            if (ERROR_UNABLE_TO_REACH_DATABASE) {
                res.status(500).send(error.message);
            }
        }
    }

    /**
     * getAcceptedUsers
     *
     * TODO: Need to pass in documentId or roles.
     *
     * Gets all UUID's who have accepted a specific version of T&C's.
     */
    getAcceptedUsers(req: Request, res: Response): void {

        const {app, version} = req.params;
        const versionAsNumber: number = parseInt(version);

        try {
            const users = UsersService.getUserAgreements(app, versionAsNumber);
            res.status(200).send(users.map(user => UserDto.fromModel(user)));
        } catch (error) {
            if (ERROR_UNABLE_TO_REACH_DATABASE) {
                res.status(500).send(error.message);
            }
        }
    }

    /**
     * hasUserAccepted
     *
     * Gets if a UUID has accepted a specific version of T&C's.
     *
     * Returns a 404 status code if the User has not accepted T&C's ie.
     * The User is not within the T&C's database.
     */
    hasUserAccepted(req: Request, res: Response): void {

        const {app, version, userId} = req.params;
        const versionAsNumber: number = parseInt(version);

        // TODO: If there is no version then it should get if the User has accepted the latest
        // document

        try {
            const user = UsersService.getUserAgreement(app, userId, versionAsNumber);
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
