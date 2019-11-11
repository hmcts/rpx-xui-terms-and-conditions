import { Request, Response } from 'express';

export class HealthController {
  health(req: Request, res: Response): void {
    try {
      res.status(200).send('Terms and Conditions is up');
    } catch (error) {
        res.status(error.status).send(error.message);
    }
  }

  liveness(req: Request, res: Response): void {
    try {
      res.status(200).send('Terms and Conditions Liveness is up');
    } catch (error) {
        res.status(error.status).send(error.message);
    }
  }
}

export default new HealthController();
