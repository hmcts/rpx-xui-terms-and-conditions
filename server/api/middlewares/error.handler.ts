import { Request, Response, NextFunction } from 'express';
import L from '../../common/logger';

/**
 * Note that the next, NextFunction is required here.
 */
// eslint-disable-next-line no-unused-vars, no-shadow,
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    // TODO: we can keep the logs clean and use appInsights in the future
    L.error(err);
    res.status(status).send({ message: err.message, status: status });
}
