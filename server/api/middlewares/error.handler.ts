import { Request, Response } from 'express';

// Error handler to display the error as HTML
// eslint-disable-next-line no-unused-vars, no-shadow,
/**
 * To get the nextFunction you will need next here, and to import NextFunction from Express
 *
 * <code>
 *     (err, req: Request, res: Response, next: NextFunction)
 * </code>
 */
export default function errorHandler(err, req: Request, res: Response) {
    res.status(err.status || 500);
    res.send(`<h1>${err.status || 500} Error</h1>` + `<pre>${err.message}</pre>`);
}
