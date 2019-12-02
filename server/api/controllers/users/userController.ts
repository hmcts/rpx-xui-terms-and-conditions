import { NextFunction, Request, Response } from 'express';
import { User } from '../../interfaces/users';
import { UserDto } from '../../models/user.dto';
import usersService from '../../services/users.service';
import { VersionNumber } from '../../utils/versionNumber.util';

export class UserController {
    /**
     * acceptTermsConditions
     *
     * Add a UUID who has accepted the Terms and Conditions.
     *
     * Note that the POST body is currently defined within the api.yml file.
     */
    public async acceptTermsConditions(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { app, version } = req.params;

        const user = req.body as User;

        const versionAsNumber: number | undefined = VersionNumber.getVersionNumber(version);

        try {
            const userAgreementResponse = await usersService.userAgreement(app, user, versionAsNumber);
            res.status(200).send(userAgreementResponse);
        } catch (error) {
            next(error);
        }
    }

    /**
     * getAcceptedUsers
     *
     * TODO: Need to pass in documentId or roles.
     *
     * Gets all UUID's who have accepted a specific version of T&C's.
     */
    public async getAcceptedUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { app, version } = req.params;

        const versionAsNumber: number | undefined = VersionNumber.getVersionNumber(version);

        try {
            const users = await usersService.getUserAgreements(app, versionAsNumber);
            res.status(200).send(users.map(user => UserDto.fromModel(user)));
        } catch (error) {
            next(error);
        }
    }

    /**
     * hasUserAccepted
     *
     * Gets if a UUID has accepted a specific version of T&C's.
     *
     */
    async hasUserAccepted(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { app, version, userId } = req.params;

        const versionAsNumber: number | undefined = VersionNumber.getVersionNumber(version);

        try {
            const agreement = await usersService.getUserAgreement(app, userId, versionAsNumber);
            res.status(200).send(agreement);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
