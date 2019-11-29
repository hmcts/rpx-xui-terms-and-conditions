import { NextFunction, Request, Response } from 'express';
import { TCDocumentDTO } from '../../models/document.dto';
import documentManagementService from '../../services/documentManagement.service';
import { VersionNumber } from "../../utils/versionNumber.util";

export class DocumentManagementController {
    async all(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { app } = req.params;
            const allResponse = await documentManagementService.all(app);
            res.status(200).send(allResponse.map(document => TCDocumentDTO.fromModel(document)));
        } catch (error) {
            next(error);
        }
    }

    async byVersion(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { app, version } = req.params;
        let versionAsNumber: number | undefined = VersionNumber.getVersionNumber(version);

        try {
            const byVersionResponse = await documentManagementService.byVersion(app, versionAsNumber);
            res.status(200).send(TCDocumentDTO.fromModel(byVersionResponse));
        } catch (error) {
            next(error);
        }
    }

    async latest(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { app } = req.params;

        try {
            const byVersionResponse = await documentManagementService.latest(app);
            res.status(200).send(TCDocumentDTO.fromModel(byVersionResponse));
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { app } = req.params;
        const { content, mimeType } = req.body;

        try {
            const createResponse = await documentManagementService.create(app, content, mimeType);
            res.status(201).send(TCDocumentDTO.fromModel(createResponse));
        } catch (error) {
            next(error);
        }
    }
}

export default new DocumentManagementController();
