import UserController from '../server/api/controllers/users/userController';

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

/**
 * Example Unit test spying on User Controller to check if it calls User Service.
 */
describe('Users controller', () => {

    it('should be true', () => {

        expect(true).toBe(true);
    });

    it('should throw a 500 if we\'re not able to hit the database.', async () => {

        const req = mockRequest();
        const res = mockResponse();

        await UserController.acceptTermsConditions(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    });

    /**
     * TODO: We need to mock the UsersService to get back a 200 response.
     */
    it('should call the UsersService.userAgreement for a User to accept ', async () => {

        const req = mockRequest();
        const res = mockResponse();

        await UserController.acceptTermsConditions(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(500);
    });

});



