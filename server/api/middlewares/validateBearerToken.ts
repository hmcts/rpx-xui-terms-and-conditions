import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { getTokenDetails } from '../services/tokenDetails.service';
import { ERROR_INVALID_USER, ERROR_NO_BEARER_TOKEN } from '../errors';

/**
 * Authorisation header name has been moved to here to make it unit testable.
 */
export const AUTHORISATION_HEADER_NAME: string = 'authorization';

/**
 * Used to get the Idam Api url from the config.
 *
 * TODO: Add a type on the getTokenDetails when your able to test it and see a
 * return value.
 */
export const IDAM_API_URL_CONFIG_NAME: string = 'services.idam.api-url';

export async function validateBearerToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header(AUTHORISATION_HEADER_NAME);

    if (!token) {
        return next({ message: ERROR_NO_BEARER_TOKEN, status: 403 });
    }

    const url = config.get<string>(IDAM_API_URL_CONFIG_NAME);

    // Verify user token
    try {
        /*eslint-disable */
        const userTokenValidate = await getTokenDetails<any>(url, token);
        /*eslint-enable */

        if (!userTokenValidate || !userTokenValidate.active) {
            return next({ message: ERROR_INVALID_USER, status: 403 });
        }
        return next();
    } catch (e) {
        return next(e);
    }
}
