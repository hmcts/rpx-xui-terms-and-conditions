import {Request, Response} from 'express';
import {
    SERVER_UP_AND_RUNNING,
    LIVENESS_UP_AND_RUNNING,
    DATABASE_CONNECTION_DOWN,
    DATABASE_CONNECTION_UP
} from '../../messages';
import {db} from '../../../database'

export class HealthController {

    public async health(req: Request, res: Response): Promise<void> {

        const dbStatus = {
            status: 'UP',
            message: DATABASE_CONNECTION_UP
        };
        try {
            const result = await db.connect();
            result.done();
        } catch (e) {
            dbStatus.status = 'DOWN';
            dbStatus.message = DATABASE_CONNECTION_DOWN;
            console.log(e.message);
        }

        const response = {
            status: SERVER_UP_AND_RUNNING,
            database: dbStatus
        }
        res.status(200).send(response);
    }

    public liveness(req, res): void {
        this.shouldReturnFalse();
        res.status(200).send(LIVENESS_UP_AND_RUNNING);
    }

    // public liveness(req: Request, res: Response): void {
    //     this.shouldReturnFalse();
    //     res.status(200).send(LIVENESS_UP_AND_RUNNING);
    // }

    public shouldReturnFalse(): boolean {
        return false;
    }
}

export default new HealthController();
