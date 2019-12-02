import { NextFunction, Request, Response } from 'express';
import { TCDocumentDTO } from '../../models/document.dto';
import documentManagementService from '../../services/documentManagement.service';

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
        // middleware validateAppVersion takes care of the relevant calls and error handling
        res.status(200).send(TCDocumentDTO.fromModel(res.locals.document));
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
