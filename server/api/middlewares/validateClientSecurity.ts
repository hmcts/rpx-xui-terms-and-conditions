import { Request, Response, NextFunction } from 'express';
import { validateS2sToken } from '../services/s2sTokenValidation.service';
import { validateUserToken } from '../services/userTokenValidation.service';
import * as process from 'process';

export async function validateIncomingRequest(req: Request, res: Response, next: NextFunction) {
    let clientServiceName
    const urlS2s = process.env.S2S_TOKEN_URL
    let rawS2sToken:any = req.headers.serviceauthorization
    let s2sToken

    // Check if authorisation header exists, if not add dummy value
    if (req.headers.serviceauthorization) {
        rawS2sToken = req.headers.serviceauthorization
    } else {
        rawS2sToken = 'invalid token'
    }

    // Check if S2S token contains 'Bearer', if not , add it.
    if (rawS2sToken.startsWith('Bearer ')) {
        s2sToken = rawS2sToken
    } else {
        s2sToken = `Bearer ${rawS2sToken}`
    }

    // Start S2S token verification
    try {
        const validateToken = await validateS2sToken(urlS2s, s2sToken);
        if (validateToken) {
            // Set service name we need it later for whitelist check
            clientServiceName = validateToken

            // Check if the service name is whitelisted
            if (clientServiceName === 'xui_webapp') {
                const urlUser = process.env.IDAM_SERVICE_URL
                const userToken: any = req.headers.authorization
                // Verify user token
                try {
                    const userTokenValidate = await validateUserToken(urlUser, userToken)
                    if (userTokenValidate) {
                        next()
                    }
                } catch (e) {
                    res.status(e.response.status).send(e.response.status);
                }
            } else {
                res.status(403).send('Not whitelisted')
            }
        }
    } catch (e) {
        res.status(e.response.status).send(e.response.data);
    }
}
