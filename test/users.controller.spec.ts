import UserController from '../server/api/controllers/users/userController';
import {VersionNumber} from '../server/api/utils/versionNumber.util';
import UsersService from '../server/api/services/users.service';
import {User} from '../server/api/interfaces/users';

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

describe('Users Controller', () => {

    describe('acceptTermsConditions()', () => {

        it('should throw a 500 if we\'re not able to hit the database.', async () => {

            const req = mockRequest();
            const res = mockResponse();

            await UserController.acceptTermsConditions(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(500);
        });

        it('should make a call to getVersionNumber() with the version, so that the version can' +
            'be converted to a number or remain as undefined.', async () => {

            /**
             * Request with a version
             */
            const req = {
                params: {
                    version: 1,
                }
            };

            const res = mockResponse();

            const spy = jest.spyOn(VersionNumber, 'getVersionNumber');

            await UserController.acceptTermsConditions(req as any, res as any);

            expect(spy).toHaveBeenCalledWith(req.params.version);

            spy.mockRestore();
        });

        it('should make a call to UserService.userAgreement() with the app, user and versionAsNumber, so that ' +
            'we can add the User as having agreed to the T&Cs.', async () => {

            const APP: string = 'manageorg';
            const VERSION: number = 1;
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

            const spy = jest.spyOn(UsersService, 'userAgreement');

            await UserController.acceptTermsConditions(req as any, res as any);

            expect(spy).toHaveBeenCalledWith(APP, USER, VERSION);

            spy.mockRestore();
        });

        it('should return a 200 Success and return the response data, if UserService.userAgreement() returns response data.', async () => {

            const APP: string = 'manageorg';
            const VERSION: number = 1;
            const USER: User = {
                userId: '123e4567-e89b-12d3-a456-426655440000',
            };

            const RESPONSE_DATA = {
                response: 42,
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

            const spy = jest.spyOn(UsersService, 'userAgreement').mockImplementation(() => Promise.resolve(RESPONSE_DATA));

            await UserController.acceptTermsConditions(req as any, res as any);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().send).toHaveBeenCalledWith(RESPONSE_DATA);

            spy.mockRestore();
        });
    });
});



