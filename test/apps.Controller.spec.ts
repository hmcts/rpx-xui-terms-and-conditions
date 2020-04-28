import AppsController from '../server/api/controllers/apps/appsController';
import AppsService from '../server/api/services/apps.service';

/**
 * Mock Express Request Object using Jest
 */
const mockRequest = () => {
    return {};
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

const mockNext = () => {
    return jest.fn();
};

describe('Apps Controller', () => {
    describe('allApps()', () => {
        it("should throw a 500 if we're not able to hit the database.", async () => {
            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();
            jest.spyOn(AppsService, 'getAllApps').mockImplementation(() => {
                throw new Error();
            });
            await AppsController.allApps(req as any, res as any, next as any);

            expect(next).toHaveBeenCalledWith(new Error());
        });

        it('should return a 200 Success and return the response data, if appsService.allApps() returns response data.', async () => {
            const RESPONSE_DATA: any = {
                response: 42,
            };
            const req = mockRequest();
            const res = mockResponse();
            const next = mockNext();

            const spy = jest.spyOn(AppsService, 'getAllApps').mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await AppsController.allApps(req as any, res as any, next as any);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(RESPONSE_DATA);
        });
    });
});
