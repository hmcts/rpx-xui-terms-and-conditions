import 'mocha';
import {expect} from 'chai';
import UsersService from '../server/api/services/users.service';
import {User} from '../server/api/interfaces/users';

describe('UsersService', function () {

    describe('users ', function () {
        it('should take in an application name and terms and conditions version', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            expect(UsersService.getUserAgreements(appName, version)).to.deep.equal(
                [{userId: 'jo'}, {userId: 'bob'}
                ]);
        })
    });

    describe('user ', function () {
        it('should take in an application name, terms and conditions version, ' +
            'and a User.', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            const userId: string = 'bob';

            expect(UsersService.getUserAgreement(appName, userId, version)).to.deep.equal({
                userId,
            });
        })
    });

    describe('addUser ', function () {
        it('should take in an application name, terms and conditions version, ' +
            'and a User.', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            const user = {
                userId: 'jo'
            };

            expect(UsersService.userAgreement(appName, user, version)).to.deep.equal(
                user,
            );
        })
    });
});
