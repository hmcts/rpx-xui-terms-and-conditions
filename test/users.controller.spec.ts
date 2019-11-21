import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock';
import userController from '../server/api/controllers/users/userController';
import UsersService from '../server/api/services/users.service';

// chai.use(sinonChai);

/**
 * Example Unit test spying on User Controller to check if it calls User Service.
 */
describe('Users controller', () => {

    it('should be true', () => {

        expect(true).toBe(true);
    });

    it('should be able to accept Terms & Conditions by calling UserService.userAgreement', () => {

        const req = mockReq();
        const res = mockRes();

        // we need a mock spy so we do not call through

        const spyOn = sinon.spy(UsersService, 'userAgreement');

        userController.acceptTermsConditions(req, res);

        sinon.assert.called(spyOn);
    });
});



