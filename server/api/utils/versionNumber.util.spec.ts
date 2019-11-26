import { VersionNumber } from './versionNumber.util';

describe(`Version Number Util`, () => {

    /**
     * Node will send in the version number from /:version? as either a String if it is set,
     * or Undefined if it's not set.
     */
    it(`should take in version number as string, and out the version number
    as a number.`, () => {

        const version: string = `42`;
        const versionAsNumber = parseInt(version);
        expect(VersionNumber.getVersionNumber(version)).toBe(versionAsNumber);
    });

    it(`should output undefined if version number is undefined.`, () => {

        const version = undefined;
        expect(VersionNumber.getVersionNumber(version)).toBeUndefined();
    });
});