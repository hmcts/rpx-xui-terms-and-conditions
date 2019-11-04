import UsersService from '../../services/users.service';
import { Request, Response } from 'express';
import {ERROR_UNABLE_TO_REACH_DATABASE} from '../../errors';

export class Controller {
  // all(req: Request, res: Response): void {
  //   ExamplesService.all().then(result => res.json(result));
  // }
  //
  // byId(req: Request, res: Response): void {
  //   const id = Number.parseInt(req.params['id'])
  //   ExamplesService.byId(id).then(result => {
  //     if (result) res.json(result);
  //     else res.status(404).end();
  //   });
  // }
  //
  // create(req: Request, res: Response): void {
  //   ExamplesService.create(req.body.name).then(result =>
  //     res
  //       .status(201)
  //       .location(`/api/v1/examples/${result.id}`)
  //       .json(result),
  //   );
  // }

  // TODO: Connect up these to the service
  // TODO: Unit test
  // TODO: No result
  /**
   * Get Users
   */
  getUsers(req: Request, res: Response): void {

    const app: string = req.params.app;
    const version: number = parseInt(req.params.version);

    try {
      const users = UsersService.users(app, version);
      res.status(200).send(users);
    } catch(error) {
        if (ERROR_UNABLE_TO_REACH_DATABASE){
            res.status(500).send(error.message);
        }
    }
  }
}
export default new Controller();
