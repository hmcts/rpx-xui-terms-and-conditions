import CopyManagementService from '../../services/copyManagement.service';
import { Request, Response } from 'express';
import { ERROR_UNABLE_TO_REACH_DATABASE, ERROR_COPY_NOT_FOUND } from '../../errors';

export class Controller {
  all(req: Request, res: Response): void {
    try {
      const allResponse = CopyManagementService.all();
      res.json(allResponse);
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
    }
  }

  byVersion(req: Request, res: Response): void {
    const version = Number.parseInt(req.params['version']);

    try {
      const byVersionResponse = CopyManagementService.byVersion(version);
      res.json(byVersionResponse);
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
    try {
      const createResponse = CopyManagementService.create(req.body.content, req.body.mime);
      res.status(201)
        .location(`/api/v1/termsAndConditions/${createResponse.version}`)
        .json(createResponse);
    } catch (error) {
      if (ERROR_UNABLE_TO_REACH_DATABASE) {
        res.status(500).send(error.message);
      }
    }
  }
}

export default new Controller();
