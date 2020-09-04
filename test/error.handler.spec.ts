import errorHandler from '../server/api/middlewares/error.handler';
import { NextFunction, Request, Response } from 'express';

/**
 * Mock Express Request Object using Jest
 */
const mockRequest = () => {
    return {};
};
let mockResponse;
let mockSend;
const nextFunction = function someFunction() {
    return true;
};

describe('Apps Controller', () => {
    describe('allApps()', () => {
        beforeEach(() => {
            mockResponse = (): Partial<Response> => {
                return {
                    status: jest.fn().mockReturnValue({}),
                };
            };
            mockSend = {
                send: jest.fn().mockReturnValue({}),
            };
        });

        it('should throw a 500 if error object does not have status', async () => {
            const req = mockRequest();
            const res = mockResponse();
            const error = { message: 'error Message1' };
            res.status.mockReturnValue(mockSend);
            errorHandler(
                error,
                (req as unknown) as Request,
                (res as unknown) as Response,
                (nextFunction as unknown) as NextFunction,
            );

            expect(res.status).toHaveBeenCalled();
            expect(mockSend.send).toHaveBeenCalledWith({ message: error.message, status: 500 });
        });

        it('should throw a 404 if error object has 404', async () => {
            const req = mockRequest();
            const res = mockResponse();
            const error = { message: 'error Message1', status: 404 };
            res.status.mockReturnValue(mockSend);
            errorHandler(
                error,
                (req as unknown) as Request,
                (res as unknown) as Response,
                (nextFunction as unknown) as NextFunction,
            );

            expect(res.status).toHaveBeenCalled();
            expect(mockSend.send).toHaveBeenCalledWith({ message: error.message, status: 404 });
        });
    });
});
