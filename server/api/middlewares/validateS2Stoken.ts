import { Request, Response, NextFunction } from 'express';
import config from 'config';
import { InvalidS2STokenError, InvalidClientError } from '../errors';
import { getTokenDetails } from '../services/tokenDetails.service';

// Check if S2S token contains 'Bearer', if not , add it.
export const formatS2SToken = (token: string): string => {
    if (!token) {
        return null;
    }
    return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
};

// this is just a string split function but has default value of the whitelist
export const getClientWhitelist = (whitelist: string = config.get<string>('client.whitelist')) => whitelist.split(',');

export async function validateS2SToken(req: Request, res: Response, next: NextFunction) {
    const urlS2s = config.get<string>('services.s2s');

    const s2sToken = formatS2SToken(req.header('serviceauthorization'));

    // Check if authorisation header exists
    if (!s2sToken) {
        return next(new InvalidS2STokenError());
    }

    // Start S2S token verification
    try {
        const clientServiceName = await getTokenDetails<string>(urlS2s, s2sToken);

        // Check if the service name is whitelisted
        const whitelist = getClientWhitelist();

        if (whitelist.indexOf(clientServiceName) === -1) {
            return next(new InvalidClientError());
        }

        return next();
    } catch (e) {
        return next(e);
    }
}
