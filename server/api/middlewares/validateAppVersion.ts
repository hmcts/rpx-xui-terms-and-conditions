import { NextFunction, Request, Response } from 'express';
import { VersionNumber } from '../utils/versionNumber.util';
import documentManagementService from '../services/documentManagement.service';

export async function validateAppVersion(req: Request, res: Response, next: NextFunction) {
    try {
        const app: string = req.params.app;
        const version: number | undefined = VersionNumber.getVersionNumber(req.params.version);
        if (version) {
            res.locals.document = await documentManagementService.byVersion(app, version);
        }
    } catch (error) {
        next(error);
    }
    return next();
}
