import 'mocha';
import {expect} from 'chai';
import UsersService from '../server/api/services/users.service';
import {User} from '../server/api/interfaces/users';

describe('UsersService', function () {

    describe('users ', function () {
        it('should take in an application name and terms and conditions version', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            expect(UsersService.users(appName, version)).to.deep.equal(
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

            expect(UsersService.user(appName, version, userId)).to.deep.equal({
                userId,
            });
        })
    });

    describe('addUser ', function () {
        it('should take in an application name, terms and conditions version, ' +
            'and a User.', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            const users = [{
                userId: 'jo'
            }];

            expect(UsersService.addUsers(appName, version, users)).to.deep.equal(
                users,
            );
        })
    });
});
