import CopyManagementService from '../../services/copyManagement.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    CopyManagementService.all().then(result => res.json(result));
  }

  byVersion(req: Request, res: Response): void {
    const version = Number.parseInt(req.params['version'])
    CopyManagementService.byVersion(version).then(result => {
      if (result) res.json(result);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    CopyManagementService.create(req.body.content).then(result =>
      res
        .status(201)
        .location(`/api/v1/termsAndConditions/${result.version}`)
        .json(result),
    );
  }
}
export default new Controller();
