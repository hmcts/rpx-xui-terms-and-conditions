import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { getTokenDetails } from '../services/tokenDetails.service';
import { ERROR_INVALID_USER, ERROR_NO_BEARER_TOKEN } from '../errors';

export async function validateBearerToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('authorization');
    if (!token) {
        return next({ message: ERROR_NO_BEARER_TOKEN, status: 403 });
    }

    const url = config.get<string>('services.idam.api-url');

    // Verify user token
    try {
        const userTokenValidate = await getTokenDetails<any>(url, token);
        if (!userTokenValidate || !userTokenValidate.active) {
            return next({ message: ERROR_INVALID_USER, status: 403 });
        }
        return next();
    } catch (e) {
        return next(e);
    }
}
