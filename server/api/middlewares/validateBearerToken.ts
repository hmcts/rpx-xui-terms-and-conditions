import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { getTokenDetails } from '../services/tokenDetails.service';
import { InvalidBearerTokenError, InvalidUserError } from '../errors';

export async function validateBearerToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization');
    if (!token) {
        return next(new InvalidBearerTokenError());
    }

    const url = config.get<string>('services.idam.api-url');

    // Verify user token
    try {
        // TODO: define an interface for getTokenDetails response rather than any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userTokenValidate = await getTokenDetails<any>(url, token);
        if (!userTokenValidate || !userTokenValidate.active) {
            return next(new InvalidUserError());
        }
        return next();
    } catch (e) {
        return next(e);
    }
}
