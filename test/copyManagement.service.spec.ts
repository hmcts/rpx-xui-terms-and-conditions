import 'mocha';
import { expect } from 'chai';
import CopyManagementService from '../server/api/services/copyManagement.service';

describe('CopyManagementService', () => {


    describe('all ', () => {
        it('should return all versions', () => {
            const appName: string = 'app1';
            expect(CopyManagementService.all(appName)).to.be.an('array');
        })
    });

    describe('latest ', () => {
        it('should return latest version', () => {
            const appName: string = 'app2';
            expect(CopyManagementService.latest(appName))
            .to.be.an('object')
            .that.has.property('content');
        })
    });

    describe('byVersion ', () => {
        it('should return specified version', () => {
            const appName: string = 'app2';
            const version: string = '1';
            expect(CopyManagementService.byVersion(appName, version)).to.deep.equal(
                { version: 1, content: `<h1>Version 1</h1>`, mimeType: 'text/html' }
            );
        })
    });

    describe('create ', () => {
        it('should create new version', () => {
            const appName: string = 'app2';
            CopyManagementService.create(appName, `<h1>Version post test</h1>`, 'text/html');
            expect(CopyManagementService.latest(appName))
                .to.be.an('object')
                .that.has.property('content')
                .equal(`<h1>Version post test</h1>`);
        })
    });
});
