import { Request, Response } from 'express';
import { ERROR_APP_NOT_FOUND, ERROR_DOCUMENT_NOT_FOUND, ERROR_UNABLE_TO_REACH_DATABASE } from '../../errors';
import { TCDocumentDTO } from '../../models/document.dto';
import DocumentManagementService from '../../services/documentManagement.service';

export class DocumentManagementController {
  async all(req: Request, res: Response): Promise<void> {
    try {
      const { app } = req.params;
      const allResponse = await DocumentManagementService.all(app);
      res.status(200).send(allResponse.map(c => TCDocumentDTO.fromModel(c)));
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
      if (ERROR_APP_NOT_FOUND) {
        res.status(404).send(error.message);
      }
    }
  }

  async byVersion(req: Request, res: Response): Promise<void> {
    const { app, version } = req.params;
    const versionAsNumber: number = version ? parseInt(version) : null;

    try {
      const byVersionResponse = await DocumentManagementService.byVersion(app, versionAsNumber);
      res.status(200).send(TCDocumentDTO.fromModel(byVersionResponse));
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
      if (ERROR_DOCUMENT_NOT_FOUND) {
        res.status(404).send(error.message);
      }
    }
  }

  async latest(req: Request, res: Response): Promise<void> {
    const { app } = req.params;

    try {
      const byVersionResponse = await DocumentManagementService.latest(app);
      res.status(200).send(TCDocumentDTO.fromModel(byVersionResponse));
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
      if (ERROR_DOCUMENT_NOT_FOUND) {
        res.status(404).send(error.message);
      }
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const { app } = req.params;
    const { content, mimeType } = req.body;

    try {
      const createResponse = await DocumentManagementService.create(app, content, mimeType);
      res.status(200)
        .location(`/api/v1/termsAndConditions/${app}/${createResponse.version}`)
        .send(TCDocumentDTO.fromModel(createResponse));
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new DocumentManagementController();
