import ExamplesService from '../../services/examples.service';
import { Request, Response } from 'express';

export class Controller {
  all(req: Request, res: Response): void {
    ExamplesService.all().then(result => res.json(result));
  }

  byId(req: Request, res: Response): void {
    const id = Number.parseInt(req.params['id'])
    ExamplesService.byId(id).then(result => {
      if (result) res.json(result);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    ExamplesService.create(req.body.name).then(result =>
      res
        .status(201)
        .location(`/api/v1/examples/${result.id}`)
        .json(result),
    );
  }
}
export default new Controller();
