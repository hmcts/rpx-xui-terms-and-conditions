import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { getTokenDetails } from '../services/tokenDetails.service';
import { InvalidBearerTokenError, InvalidUserError } from '../errors';

/**
 * Authorisation header name has been moved to here to make it unit testable.
 */
export const AUTHORISATION_HEADER_NAME = 'authorization';

/**
 * Used to get the Idam Api url from the config.
 *
 * TODO: Add a type on the getTokenDetails when your able to test it and see a
 * return value.
 */
export const IDAM_API_URL_CONFIG_NAME = 'services.idam-api-url';

export async function validateBearerToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header(AUTHORISATION_HEADER_NAME);

    if (!token) {
        return next(new InvalidBearerTokenError());
    }

    const url = config.get<string>(IDAM_API_URL_CONFIG_NAME);

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
