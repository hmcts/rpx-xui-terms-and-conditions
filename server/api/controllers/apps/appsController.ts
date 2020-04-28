import { NextFunction, Request, Response } from 'express';
import appsService from '../../services/apps.service';

export class AppsController {
    /**
     * allApps
     *
     * Gets all app names.
     *
     */
    public async allApps(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userAgreementResponse = await appsService.getAllApps();
            res.status(200).send(userAgreementResponse);
        } catch (error) {
            next(error);
        }
    }
}

export default new AppsController();
