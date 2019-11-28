import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { getTokenDetails } from '../services/tokenDetails.service';
import { ERROR_INVALID_USER, ERROR_NO_BEARER_TOKEN } from '../errors';

/**
 * Authorisation header name has been moved to here to make it unit testable.
 */
export const AUTHORISATION_HEADER_NAME = 'authorization';

/**
 * Used to get the Idam Api url from the config.
 */
export const IDAM_API_URL_CONFIG_NAME = 'services.idam.api-url';

export async function validateBearerToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header(AUTHORISATION_HEADER_NAME);

    if (!token) {
        return next({ message: ERROR_NO_BEARER_TOKEN, status: 403 });
    }

    const url = config.get<string>(IDAM_API_URL_CONFIG_NAME);

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
