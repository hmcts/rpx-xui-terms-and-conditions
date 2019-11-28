import errorHandler from '../server/api/middlewares/error.handler'

/**
 * Mock Express Request Object using Jest
 */
const mockRequest = () => {
    return {
    }
};
let mockResponse: any;
let mockSend: any;
/**
 * Mock Express Response Object using Jest
 *
 * We mock the status and send so that we can test the response of
 * <code>
 *     res.status(200).send(LIVENESS_UP_AND_RUNNING);
 * </code>
 */

describe('Apps Controller', () => {

    describe('allApps()', () => {

        beforeEach( () => {
            mockResponse = () => {
                return {
                    status: jest.fn().mockReturnValue({
                    })
                };
            };
            mockSend = {
                send: jest.fn().mockReturnValue({
                })
            }
        })

        it('should throw a 500 if error object does not have status', async () => {
            
            const req = mockRequest();
            const res = mockResponse();
            const error = {message: 'error Message1'};
            const nextFunction = function someFunction(){}
            res.status.mockReturnValue(mockSend)
            errorHandler(error, req as any, res as any, nextFunction)

            expect(res.status).toHaveBeenCalled();
            expect(mockSend.send).toHaveBeenCalledWith({ message: error.message, status: 500})
        });

        it('should throw a 404 if error object has 404', async () => {
            const req = mockRequest();
            const res = mockResponse();
            const error = {message: 'error Message1', status: 404};
            const nextFunction = function someFunction(){}
            res.status.mockReturnValue(mockSend)
            errorHandler(error, req as any, res as any, nextFunction)

            expect(res.status).toHaveBeenCalled();
            expect(mockSend.send).toHaveBeenCalledWith({ message: error.message, status: 404})
        });

    });
});