import userController from '../server/api/controllers/users/userController';
import { VersionNumber } from '../server/api/utils/versionNumber.util';
import usersService from '../server/api/services/users.service';
import { User } from '../server/api/interfaces/users';
import { InvalidDBConnectionError } from '../server/api/errors';
import { NextFunction, Request, Response } from 'express';
import { TCUserAgreement } from '../server/database/models';
import { Agreement } from '../server/database/models/agreement.model';

/**
 * Mock Express Request Object using Jest
 */
const mockRequest = () => {
    return {
        params: {
            app: 'manageorg',
            version: 1,
        },
        body: {
            uuid: 'testUuid',
        },
    };
};

/**
 * Mock Express Response Object using Jest
 *
 * We mock the status and send so that we can test the response of
 * <code>
 *     res.status(200).send(LIVENESS_UP_AND_RUNNING);
 * </code>
 */
const mockResponse = () => {
    return {
        status: jest.fn().mockReturnValue({
            send: jest.fn().mockReturnValue({}),
        }),
    };
};

describe('Users Controller', () => {
    describe('acceptTermsConditions()', () => {
        /**
         * TODO: Placeholder test for error handling when it is fully implemented.
         */
        it("should throw a 500 if we're not able to hit the database.", async () => {
            const req = mockRequest();
            const res = mockResponse();
            const next = jest.fn().mockReturnValue({});
            jest.spyOn(usersService, 'userAgreement').mockImplementation(() => {
                throw new Error();
            });
            await userController.acceptTermsConditions(
                (req as unknown) as Request,
                (res as unknown) as Response,
                (next as unknown) as NextFunction,
            );

            expect(next).toHaveBeenCalledWith(new Error());
        });

        it(
            'should make a call to getVersionNumber() with the version, so that the version can' +
                'be converted to a number or remain as undefined.',
            async () => {
                /**
                 * Request with a version
                 */
                const req = {
                    params: {
                        version: 1,
                    },
                };

                const res = mockResponse();
                const next = jest.fn();

                const spy = jest.spyOn(VersionNumber, 'getVersionNumber');

                await userController.acceptTermsConditions(
                    (req as unknown) as Request,
                    (res as unknown) as Response,
                    (next as unknown) as NextFunction,
                );

                expect(spy).toHaveBeenCalledWith(req.params.version);

                spy.mockRestore();
            },
        );

        it(
            'should make a call to UserService.userAgreement() with the app, user and versionAsNumber, so that ' +
                'we can add the User as having agreed to the T&Cs.',
            async () => {
                const APP = 'manageorg';
                const VERSION = 1;
                const USER: User = {
                    userId: '123e4567-e89b-12d3-a456-426655440000',
                };

                /**
                 * Request
                 */
                const req = {
                    params: {
                        app: APP,
                        version: VERSION,
                    },
                    body: USER,
                };

                const res = mockResponse();
                const next = jest.fn();

                const spy = jest.spyOn(usersService, 'userAgreement');

                await userController.acceptTermsConditions(
                    (req as unknown) as Request,
                    (res as unknown) as Response,
                    (next as unknown) as NextFunction,
                );

                expect(spy).toHaveBeenCalledWith(APP, USER, VERSION);

                spy.mockRestore();
            },
        );

        it('should return a 200 Success and return the response data, if UserService.userAgreement() returns response data.', async () => {
            const APP = 'manageorg';
            const VERSION = 1;
            const USER: User = {
                userId: '123e4567-e89b-12d3-a456-426655440000',
            };

            const RESPONSE_DATA: TCUserAgreement = {
                id: 42,
                userId: 'abc123',
                documentAppId: 1,
                agreementDate: 'now',
            };

            /**
             * Request
             */
            const req = {
                params: {
                    app: APP,
                    version: VERSION,
                },
                body: USER,
            };

            const res = mockResponse();
            const next = jest.fn();

            const spy = jest
                .spyOn(usersService, 'userAgreement')
                .mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await userController.acceptTermsConditions(
                (req as unknown) as Request,
                (res as unknown) as Response,
                (next as unknown) as NextFunction,
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(RESPONSE_DATA);

            spy.mockRestore();
        });
    });

    describe('getAcceptedUsers()', () => {
        it(
            'should make a call to getVersionNumber() with the version, so that the version can' +
                'be converted to a number or remain as undefined.',
            async () => {
                /**
                 * Request with a version
                 */
                const req = {
                    params: {
                        version: 1,
                    },
                };

                const res = mockResponse();
                const next = jest.fn();

                const spy = jest.spyOn(VersionNumber, 'getVersionNumber');

                await userController.getAcceptedUsers(
                    (req as unknown) as Request,
                    (res as unknown) as Response,
                    (next as unknown) as NextFunction,
                );

                expect(spy).toHaveBeenCalledWith(req.params.version);

                spy.mockRestore();
            },
        );

        it(
            'should make a call to UserService.getUserAgreements() with the app and versionAsNumber, so that ' +
                "we can get the User's who have agreed to the T&Cs.",
            async () => {
                const APP = 'manageorg';
                const VERSION = 1;
                const USER: User = {
                    userId: '123e4567-e89b-12d3-a456-426655440000',
                };

                /**
                 * Request
                 */
                const req = {
                    params: {
                        app: APP,
                        version: VERSION,
                    },
                    body: USER,
                };

                const res = mockResponse();
                const next = jest.fn();

                const spy = jest.spyOn(usersService, 'getUserAgreements');

                await userController.getAcceptedUsers(
                    (req as unknown) as Request,
                    (res as unknown) as Response,
                    (next as unknown) as NextFunction,
                );

                expect(spy).toHaveBeenCalledWith(APP, VERSION);

                spy.mockRestore();
            },
        );

        /**
         * TODO: Placeholder test for error handling when it is fully implemented.
         */
        it("should throw a 500 if we're not able to hit the database.", async () => {
            const req = mockRequest();
            const res = mockResponse();
            const next = jest.fn().mockReturnValue({});

            jest.spyOn(usersService, 'getUserAgreements').mockImplementation(() => {
                throw new InvalidDBConnectionError();
            });

            await userController.getAcceptedUsers(
                (req as unknown) as Request,
                (res as unknown) as Response,
                (next as unknown) as NextFunction,
            );

            expect(next).toHaveBeenCalledWith(new InvalidDBConnectionError());
        });

        it('should return a 200 Success and return the response data, if UserService.getUserAgreements() returns response data.', async () => {
            const APP = 'manageorg';
            const VERSION = 1;
            const USER: User = {
                userId: '123e4567-e89b-12d3-a456-426655440000',
            };

            const RESPONSE_DATA: User[] = [
                {
                    userId: '123e4567-e89b-12d3-a456-426655440000',
                },
                {
                    userId: '123e4567-e89b-12d3-a456-426655440012',
                },
            ];

            /**
             * Request
             */
            const req = {
                params: {
                    app: APP,
                    version: VERSION,
                },
                body: USER,
            };

            const res = mockResponse();
            const next = jest.fn();

            const spy = jest
                .spyOn(usersService, 'getUserAgreements')
                .mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await userController.getAcceptedUsers(
                (req as unknown) as Request,
                (res as unknown) as Response,
                (next as unknown) as NextFunction,
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(RESPONSE_DATA);

            spy.mockRestore();
        });
    });

    describe('hasUserAccepted()', () => {
        it(
            'should make a call to getVersionNumber() with the version, so that the version can' +
                'be converted to a number or remain as undefined.',
            async () => {
                /**
                 * Request with a version
                 */
                const req = {
                    params: {
                        version: 1,
                    },
                };

                const res = mockResponse();
                const next = jest.fn();

                const spy = jest.spyOn(VersionNumber, 'getVersionNumber');

                await userController.hasUserAccepted(
                    (req as unknown) as Request,
                    (res as unknown) as Response,
                    (next as unknown) as NextFunction,
                );

                expect(spy).toHaveBeenCalledWith(req.params.version);

                spy.mockRestore();
            },
        );

        it(
            'should make a call to UserService.getUserAgreements() with the app, userId and versionAsNumber, so that ' +
                'we can get if a User has agreed to the T&Cs.',
            async () => {
                const APP = 'manageorg';
                const VERSION = 1;
                const USER_ID = '123e4567-e89b-12d3-a456-426655440000';

                /**
                 * Request
                 */
                const req = {
                    params: {
                        app: APP,
                        version: VERSION,
                        userId: USER_ID,
                    },
                };

                const res = mockResponse();
                const next = jest.fn();

                const spy = jest.spyOn(usersService, 'getUserAgreement');

                await userController.hasUserAccepted(
                    (req as unknown) as Request,
                    (res as unknown) as Response,
                    (next as unknown) as NextFunction,
                );

                expect(spy).toHaveBeenCalledWith(APP, USER_ID, VERSION);

                spy.mockRestore();
            },
        );

        it('should return a 200 Success and return the response data, if UserService.getUserAgreement() returns response data.', async () => {
            const APP = 'manageorg';
            const VERSION = 1;
            const userId = '123e4567-e89b-12d3-a456-426655440000';
            const USER: User = {
                userId,
            };

            const RESPONSE_DATA: Agreement = {
                userId,
                accepted: false,
                version: 1,
            };

            /**
             * Request
             */
            const req = {
                params: {
                    app: APP,
                    version: VERSION,
                },
                body: USER,
            };

            const res = mockResponse();
            const next = jest.fn();

            const spy = jest
                .spyOn(usersService, 'getUserAgreement')
                .mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await userController.hasUserAccepted(
                (req as unknown) as Request,
                (res as unknown) as Response,
                (next as unknown) as NextFunction,
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(RESPONSE_DATA);

            spy.mockRestore();
        });
    });
});
