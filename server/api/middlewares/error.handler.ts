import { Request, Response, NextFunction } from 'express';

/**
 * Note that the next, NextFunction is required here.
 */
// eslint-disable-next-line no-unused-vars, no-shadow,
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.send(`<h1>${err.status || 500} Error</h1>` + `<pre>${err.message}</pre>`);
}
