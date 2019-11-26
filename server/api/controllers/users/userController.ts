import { Request, Response } from 'express';
import { ERROR_UNABLE_TO_REACH_DATABASE, ERROR_USER_NOT_ACCEPTED_TCS } from '../../errors';
import { User } from '../../interfaces/users';
import { UserDto } from '../../models/user.dto';
import UsersService from '../../services/users.service';
import { VersionNumber } from '../../utils/versionNumber.util';

export class UserController {

    /**
     * acceptTermsConditions
     *
     * Add a UUID who has accepted the Terms and Conditions.
     *
     * Note that the POST body is currently defined within the api.yml file.
     */
    public async acceptTermsConditions(req: Request, res: Response): Promise<void> {

        const { app, version } = req.params;

        const user = req.body as User;

        let versionAsNumber: number | undefined = VersionNumber.getVersionNumber(version);

        try {
            const userAgreementResponse = await UsersService.userAgreement(app, user, versionAsNumber);
            res.status(200).send(userAgreementResponse);
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
    public async getAcceptedUsers(req: Request, res: Response): Promise<void> {
        const { app, version } = req.params;

        let versionAsNumber: number | undefined = VersionNumber.getVersionNumber(version);

        try {
            const users = await UsersService.getUserAgreements(app, versionAsNumber);
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
     */
    async hasUserAccepted(req: Request, res: Response): Promise<void> {

        const {app, version, userId} = req.params;

        let versionAsNumber: number | undefined = VersionNumber.getVersionNumber(version);

        try {
            const agreement = await UsersService.getUserAgreement(app, userId, versionAsNumber);
            res.status(200).send(agreement);
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
