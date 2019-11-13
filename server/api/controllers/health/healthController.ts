import { Request, Response } from 'express';
import { SERVER_UP_AND_RUNNING, LIVENESS_UP_AND_RUNNING } from '../../messages';

export class HealthController {
  health(req: Request, res: Response): void {
    res.status(200).send(SERVER_UP_AND_RUNNING);
  }

  liveness(req: Request, res: Response): void {
    res.status(200).send(LIVENESS_UP_AND_RUNNING);
  }
}

export default new HealthController();
