import { Request, Response, NextFunction } from 'express';

// Error handler to display the error as HTML
/**
 * To get the nextFunction you will need next here, and to import NextFunction from Express
 *
 * <code>
 *     (err, req: Request, res: Response, next: NextFunction)
 * </code>
 */
// eslint-disable-next-line no-unused-vars, no-shadow,
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    res.status(err.status || 500);
    res.send(`<h1>${err.status || 500} Error</h1>` + `<pre>${err.message}</pre>`);
}
