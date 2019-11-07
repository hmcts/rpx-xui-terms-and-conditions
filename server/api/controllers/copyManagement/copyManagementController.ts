import { Request, Response } from 'express';
import { ERROR_APP_NOT_FOUND, ERROR_COPY_NOT_FOUND, ERROR_UNABLE_TO_REACH_DATABASE } from '../../errors';
import { TCDocumentDTO } from '../../models/document.dto';
import CopyManagementService from '../../services/copyManagement.service';

export class CopyManagementController {
  all(req: Request, res: Response): void {
    try {
      const { app } = req.params;
      const allResponse = CopyManagementService.all(app);
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

  byVersion(req: Request, res: Response): void {
    const { app, version } = req.params;

    try {
      const byVersionResponse = CopyManagementService.byVersion(app, version);
      res.status(200).send(TCDocumentDTO.fromModel(byVersionResponse));
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
      if (ERROR_COPY_NOT_FOUND) {
        res.status(404).send(error.message);
      }
    }
  }

  latest(req: Request, res: Response): void {
    const { app } = req.params;

    try {
      const byVersionResponse = CopyManagementService.latest(app);
      res.status(200).send(TCDocumentDTO.fromModel(byVersionResponse));
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
      if (ERROR_COPY_NOT_FOUND) {
        res.status(404).send(error.message);
      }
    }
  }

  create(req: Request, res: Response): void {
    const { app } = req.params;
    const { content, mimeType } = req.body;

    try {
      const createResponse = CopyManagementService.create(app, content, mimeType);
      res.status(200)
        .location(`/api/v1/termsAndConditions/${createResponse.version}`)
        .send(TCDocumentDTO.fromModel(createResponse));
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new CopyManagementController();