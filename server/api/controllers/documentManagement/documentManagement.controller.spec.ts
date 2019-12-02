import DocumentManagementController from './documentManagementController';
import DocumentManagementService from '../../services/documentManagement.service';
import { VersionNumber } from '../../utils/versionNumber.util';
import { User } from '../../interfaces/users';

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

describe('Document Management Controller', () => {
    describe('all()', () => {
        it('should return a 200 Success and return the response data, if DocumentManagementService.all() returns response data.', async () => {
            const APP = 'manageorg';

            const RESPONSE_DATA: any = [
                {
                    version: 1,
                    document: 'content',
                    mimeType: 'text/html',
                },
            ];

            // The property is changed from document to content so we test for this here.
            // TODO: Why does it change?
            const EXPECTED_RESPONSE_DATA: any = [
                {
                    version: 1,
                    content: 'content',
                    mimeType: 'text/html',
                },
            ];

            /**
             * Request
             */
            const req = {
                params: {
                    app: APP,
                },
            };

            const res = mockResponse();

            const next = () => {};

            const spy = jest
                .spyOn(DocumentManagementService, 'all')
                .mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await DocumentManagementController.all(req as any, res as any, next as any);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA);

            spy.mockRestore();
        });

        /**
         * TODO: Placeholder test for error handling when it is fully implemented.
         */
        it("should throw a 500 if we're not able to hit the database.", async () => {
            const req = mockRequest();
            const res = mockResponse();
            const next = () => {};

            await DocumentManagementController.all(req as any, res as any, next as any);

            expect(res.status).toHaveBeenCalledWith(500);
        });

        it(
            'should make a call to DocumentManagementService.all() with the app identifier' +
                'so that we can get all T&C documents.',
            async () => {
                const APP = 'manageorg';

                /**
                 * Request
                 */
                const req = {
                    params: {
                        app: APP,
                    },
                };

                const res = mockResponse();
                const next = () => {};

                const spy = jest.spyOn(DocumentManagementService, 'all');

                await DocumentManagementController.all(req as any, res as any, next as any);

                expect(spy).toHaveBeenCalledWith(APP);

                spy.mockRestore();
            },
        );
    });

    describe('byVersion()', () => {
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
                const next = () => {};

                const spy = jest.spyOn(VersionNumber, 'getVersionNumber');

                await DocumentManagementController.byVersion(req as any, res as any, next as any);

                expect(spy).toHaveBeenCalledWith(req.params.version);

                spy.mockRestore();
            },
        );

        it(
            'should make a call to DocumentManagementService.byVersion() with the app and versionAsNumber, so that ' +
                'we can get the T&Cs document by version.',
            async () => {
                const APP = 'manageorg';
                const VERSION = 1;

                /**
                 * Request
                 */
                const req = {
                    params: {
                        app: APP,
                        version: VERSION,
                    },
                };

                const res = mockResponse();
                const next = () => {};

                const spy = jest.spyOn(DocumentManagementService, 'byVersion');

                await DocumentManagementController.byVersion(req as any, res as any, next as any);

                expect(spy).toHaveBeenCalledWith(APP, VERSION);

                spy.mockRestore();
            },
        );

        it('should return a 200 Success and return the response data, if UserService.userAgreement() returns response data.', async () => {
            const APP = 'manageorg';
            const VERSION = 1;
            const USER: User = {
                userId: '123e4567-e89b-12d3-a456-426655440000',
            };

            const RESPONSE_DATA: any = {
                version: 1,
                document: 'content',
                mimeType: 'text/html',
            };

            // The property is changed from document to content so we test for this here.
            // TODO: Why does it change?
            const EXPECTED_RESPONSE_DATA: any = {
                version: 1,
                content: 'content',
                mimeType: 'text/html',
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
            const next = () => {};

            const spy = jest
                .spyOn(DocumentManagementService, 'byVersion')
                .mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await DocumentManagementController.byVersion(req as any, res as any, next as any);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA);

            spy.mockRestore();
        });

        /**
         * TODO: Placeholder test for error handling when it is fully implemented.
         */
        it("should throw a 500 if we're not able to hit the database.", async () => {
            const req = mockRequest();
            const res = mockResponse();
            const next = () => {};

            await DocumentManagementController.byVersion(req as any, res as any, next as any);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('latest()', () => {
        it(
            'should make a call to DocumentManagementService.latest() with the app, so that ' +
                'we can get the latest T&Cs document.',
            async () => {
                const APP = 'manageorg';

                /**
                 * Request
                 */
                const req = {
                    params: {
                        app: APP,
                    },
                };

                const res = mockResponse();
                const next = () => {};

                const spy = jest.spyOn(DocumentManagementService, 'latest');

                await DocumentManagementController.latest(req as any, res as any, next as any);

                expect(spy).toHaveBeenCalledWith(APP);

                spy.mockRestore();
            },
        );

        it('should return a 200 Success and return the response data, if DocumentManagementService.latest() returns response data.', async () => {
            const APP = 'manageorg';
            const USER: User = {
                userId: '123e4567-e89b-12d3-a456-426655440000',
            };

            const RESPONSE_DATA: any = {
                version: 1,
                document: 'content',
                mimeType: 'text/html',
            };

            // The property is changed from document to content so we test for this here.
            // TODO: Why does it change?
            const EXPECTED_RESPONSE_DATA: any = {
                version: 1,
                content: 'content',
                mimeType: 'text/html',
            };

            /**
             * Request
             */
            const req = {
                params: {
                    app: APP,
                },
                body: USER,
            };

            const res = mockResponse();
            const next = () => {};

            const spy = jest
                .spyOn(DocumentManagementService, 'latest')
                .mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await DocumentManagementController.latest(req as any, res as any, next as any);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA);

            spy.mockRestore();
        });

        /**
         * TODO: Placeholder test for error handling when it is fully implemented.
         */
        it("should throw a 500 if we're not able to hit the database.", async () => {
            const req = mockRequest();
            const res = mockResponse();
            const next = () => {};

            await DocumentManagementController.latest(req as any, res as any, next as any);

            expect(res.status).toHaveBeenCalledWith(500);
        });
    });

    describe('create()', () => {
        it(
            'should make a call to DocumentManagementService.create() with the app, content and mimeType so that ' +
                'we can create a T&Cs document.',
            async () => {
                const APP = 'manageorg';
                const CONTENT = 'content';
                const MIME_TYPE = 'text/html';

                /**
                 * Request
                 */
                const req = {
                    params: {
                        app: APP,
                    },
                    body: {
                        content: CONTENT,
                        mimeType: MIME_TYPE,
                    },
                };

                const res = mockResponse();
                const next = () => {};

                const spy = jest.spyOn(DocumentManagementService, 'create');

                await DocumentManagementController.create(req as any, res as any, next as any);

                expect(spy).toHaveBeenCalledWith(APP, CONTENT, MIME_TYPE);

                spy.mockRestore();
            },
        );

        it('should return a 200 Success and return the response data, if DocumentManagementService.create() returns response data.', async () => {
            const APP = 'manageorg';
            const USER: User = {
                userId: '123e4567-e89b-12d3-a456-426655440000',
            };

            const RESPONSE_DATA: any = {
                version: 1,
                document: 'content',
                mimeType: 'text/html',
            };

            // The property is changed from document to content so we test for this here.
            // TODO: Why does it change?
            const EXPECTED_RESPONSE_DATA: any = {
                version: 1,
                content: 'content',
                mimeType: 'text/html',
            };

            /**
             * Request
             */
            const req = {
                params: {
                    app: APP,
                },
                body: USER,
            };

            const res = mockResponse();
            const next = () => {};

            const spy = jest
                .spyOn(DocumentManagementService, 'create')
                .mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await DocumentManagementController.create(req as any, res as any, next as any);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.status().send).toHaveBeenCalledWith(EXPECTED_RESPONSE_DATA);

            spy.mockRestore();
        });
    });
});
