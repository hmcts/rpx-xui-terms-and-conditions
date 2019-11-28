/* eslint @typescript-eslint/no-explicit-any: 0 */

import config from 'config';

import { AUTHORISATION_HEADER_NAME, IDAM_API_URL_CONFIG_NAME, validateBearerToken } from './validateBearerToken';
import { ERROR_INVALID_USER, ERROR_NO_BEARER_TOKEN } from '../errors';
import * as GetTokenDetails from '../services/tokenDetails.service';

/**
 * Mock Express Response Object using Jest
 */
const mockResponse = () => {
    return {
        status: jest.fn().mockReturnValue({
            send: jest.fn().mockReturnValue({}),
        }),
    };
};

const mockNext = () => {
    return jest.fn().mockReturnValue({});
};

describe('Users Controller', () => {
    it(
        'should make a call to next() with the ERROR_NO_BEARER_TOKEN message if there is no authorisation token in ' +
            'the incoming request.',
        async () => {
            const req = {
                header: jest.fn().mockReturnValue(undefined),
            };

            const res = mockResponse();
            const next = mockNext();

            const spy = jest.spyOn(config, 'get').mockImplementation(() => 'url');

            await validateBearerToken(req as any, res as any, next as any);

            expect(next).toHaveBeenCalledWith({
                message: ERROR_NO_BEARER_TOKEN,
                status: 403,
            });
        },
    );

    /**
     * We mock the Authorisation Token in the header.
     *
     * We mock the Idam Api Url returned from the config.
     *
     * We then test that both the Authorisation and Idam Api Url are passed to getTokenDetails.
     */
    it('should make a call to getTokenDetails() with the services.idam.api-url and authorisation token.', async () => {
        const AUTHORISATION_TOKEN: string = 'authorisation token';
        const IDAM_API_URL: string = 'https://idam-api.aat.platform.hmcts.net';

        const req = {
            header: jest.fn().mockReturnValue(AUTHORISATION_TOKEN),
        };

        const res = mockResponse();
        const next = mockNext();

        const USER_TOKEN = {};

        jest.spyOn(config, 'get').mockImplementation(() => IDAM_API_URL);

        const spyOnGetTokenDetails = jest
            .spyOn(GetTokenDetails, 'getTokenDetails')
            .mockImplementation(() => Promise.resolve(USER_TOKEN));

        await validateBearerToken(req as any, res as any, next as any);

        expect(spyOnGetTokenDetails).toHaveBeenCalledWith(IDAM_API_URL, AUTHORISATION_TOKEN);
    });

    /**
     * Note the US spelling of authorization.
     */
    it("should have an Authorisation header name set as 'authorization'.", async () => {
        expect(AUTHORISATION_HEADER_NAME).toBe('authorization');
    });

    it('should have an Idam Api Url config name so that we can extract the Idam Api Url path from the config.', async () => {
        expect(IDAM_API_URL_CONFIG_NAME).toBe('services.idam.api-url');
    });

    /**
     * User Token does not have 'active' property therefore an ERROR_INVALID_USER with
     * a status of 403 should be returned.
     */
    it('should make a call to next() with the ERROR_INVALID_USER if there is no userTokenValidate.active.', async () => {
        const AUTHORISATION_TOKEN: string = 'authorisation token';
        const IDAM_API_URL: string = 'https://idam-api.aat.platform.hmcts.net';

        const req = {
            header: jest.fn().mockReturnValue(AUTHORISATION_TOKEN),
        };

        const res = mockResponse();
        const next = mockNext();

        const USER_TOKEN = {};

        jest.spyOn(config, 'get').mockImplementation(() => IDAM_API_URL);

        const spyOnGetTokenDetails = jest
            .spyOn(GetTokenDetails, 'getTokenDetails')
            .mockImplementation(() => Promise.resolve(USER_TOKEN));

        await validateBearerToken(req as any, res as any, next as any);

        expect(next).toHaveBeenCalledWith({
            message: ERROR_INVALID_USER,
            status: 403,
        });
    });

    /**
     * Success path should just call next()
     *
     * We want to make sure that it's not calling next() with an error message.
     */
    it('should make a call to next() if there is a userTokenValidate.active.', async () => {
        const AUTHORISATION_TOKEN: string = 'authorisation token';
        const IDAM_API_URL: string = 'https://idam-api.aat.platform.hmcts.net';

        const req = {
            header: jest.fn().mockReturnValue(AUTHORISATION_TOKEN),
        };

        const res = mockResponse();
        const next = mockNext();

        const USER_TOKEN = {
            active: true,
        };

        jest.spyOn(config, 'get').mockImplementation(() => IDAM_API_URL);

        const spyOnGetTokenDetails = jest
            .spyOn(GetTokenDetails, 'getTokenDetails')
            .mockImplementation(() => Promise.resolve(USER_TOKEN));

        await validateBearerToken(req as any, res as any, next as any);

        expect(next).not.toHaveBeenCalledWith({
            message: ERROR_INVALID_USER,
            status: 403,
        });
        expect(next).toHaveBeenCalled();
    });

    it('should pass up the error through next() if an error happens with the call to getTokenDetails().', async () => {
        const AUTHORISATION_TOKEN: string = 'authorisation token';
        const IDAM_API_URL: string = 'https://idam-api.aat.platform.hmcts.net';

        const req = {
            header: jest.fn().mockReturnValue(AUTHORISATION_TOKEN),
        };

        const res = mockResponse();
        const next = mockNext();

        const ERROR = { error: 'error' };

        jest.spyOn(config, 'get').mockImplementation(() => IDAM_API_URL);

        const spyOnGetTokenDetails = jest
            .spyOn(GetTokenDetails, 'getTokenDetails')
            .mockImplementation(() => Promise.reject(ERROR));

        await validateBearerToken(req as any, res as any, next as any);

        expect(next).toHaveBeenCalledWith(ERROR);
    });
});
