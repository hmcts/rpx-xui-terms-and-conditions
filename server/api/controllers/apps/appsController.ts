import { Request, Response } from 'express';
import { ERROR_UNABLE_TO_REACH_DATABASE } from '../../errors';
import AppsService from '../../services/apps.service';

export class AppsController {
    /**
     * allApps
     *
     * Gets all app names.
     *
     */
    public async allApps(req: Request, res: Response): Promise<void> {
    
        try {
            const userAgreementResponse = await AppsService.getAllApps();
            res.status(200).send(userAgreementResponse);
        } catch (error) {
            if (ERROR_UNABLE_TO_REACH_DATABASE) {
                res.status(500).send(error.message);
            }
        }
    }
}

export default new AppsController();
