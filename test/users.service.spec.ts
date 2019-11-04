import 'mocha';
import {expect} from 'chai';
import UsersService from '../server/api/services/users.service';
import {User} from '../server/api/interfaces/users';

describe('UsersService', function () {

    describe('users ', function () {
        it('should take in an application name and terms and conditions version', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            expect(UsersService.users(appName, version)).to.deep.equal({
                appName,
                version,
            });
        })
    });

    describe('user ', function () {
        it('should take in an application name, terms and conditions version, ' +
            'and a User.', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            const user: User = {
                userId: 'jo'
            };

            expect(UsersService.user(appName, version, user)).to.deep.equal({
                appName,
                version,
                user,
            });
        })
    });

    describe('addUser ', function () {
        it('should take in an application name, terms and conditions version, ' +
            'and a User.', () => {
            const appName: string = 'XUI-WEBAPP';
            const version: number = 42;
            const user: User = {
                userId: 'jo'
            };

            expect(UsersService.addUser(appName, version, user)).to.deep.equal({
                appName,
                version,
                user,
            });
        })
    });
});
