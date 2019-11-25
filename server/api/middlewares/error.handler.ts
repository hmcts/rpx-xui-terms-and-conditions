import { Request, Response, NextFunction } from 'express';

/**
 * Note that the next, NextFunction is required here.
 */
// eslint-disable-next-line no-unused-vars, no-shadow,
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    res.status(status).send({ message: err.message, status: status });
}
