import DocumentManagementController from './documentManagementController';
import DocumentManagementService from '../../services/documentManagement.service';

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
            uuid: 'testUuid'
        }
    }
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
            send: jest.fn().mockReturnValue({})
        })
    };
};

describe('Document Management Controller', () => {

    describe('all()', () => {

        it('should return a 200 Success and return the response data, if DocumentManagementService.all() returns response data.', async () => {

            const APP: string = 'manageorg';

            const RESPONSE_DATA: any = [
                {
                    version: 1,
                    document: 'content',
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

            const spy = jest.spyOn(DocumentManagementService, 'all').mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await DocumentManagementController.all(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith([
                {
                    version: 1,
                    // The property is changed from document to content so we test for this here.
                    // TODO: Why does it change?
                    content: 'content',
                    mimeType: 'text/html',
                },
            ]);

            spy.mockRestore();
        });

        /**
         * TODO: Placeholder test for error handling when it is fully implemented.
         */
        it('should throw a 500 if we\'re not able to hit the database.', async () => {

            const req = mockRequest();
            const res = mockResponse();

            await DocumentManagementController.all(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(500);
        });

        it('should make a call to DocumentManagementService.all() with the app identifier' +
            'so that we can get all T&C documents.', async () => {

            const APP: string = 'manageorg';

            /**
             * Request
             */
            const req = {
                params: {
                    app: APP,
                },
            };

            const res = mockResponse();

            const spy = jest.spyOn(DocumentManagementService, 'all');

            await DocumentManagementController.all(req as any, res as any);

            expect(spy).toHaveBeenCalledWith(APP);

            spy.mockRestore();
        });
    });
});



