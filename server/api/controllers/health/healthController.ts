import { Request, Response } from 'express';
import { SERVER_UP_AND_RUNNING, LIVENESS_UP_AND_RUNNING, DATABASE_CONNECTION_UP } from '../../messages';

export class HealthController {
    public async health(req: Request, res: Response): Promise<void> {
        const response = {
            status: SERVER_UP_AND_RUNNING,
            database: {
                status: 'UP',
                message: DATABASE_CONNECTION_UP,
            },
        };
        res.status(200).send(response);
    }

    public liveness(req: Request, res: Response): void {
        res.status(200).send({ message: LIVENESS_UP_AND_RUNNING });
    }
}

export default new HealthController();
