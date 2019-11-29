import { NextFunction, Request, Response } from 'express';
import AppsService from '../../services/apps.service';

export class AppsController {
    /**
     * allApps
     *
     * Gets all app names.
     *
     */
    public async allApps(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userAgreementResponse = await AppsService.getAllApps();
            res.status(200).send(userAgreementResponse);
        } catch (error) {
            next(error);
        }
    }
}

export default new AppsController();
