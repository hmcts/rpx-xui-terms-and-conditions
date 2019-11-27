/**
 * VersionNumberUtil
 *
 * Node will send in the version number from /:version? as either a String if it is set,
 * or Undefined if it's not set.
 *
 * If the version number has been set then convert the String to a Number to send on,
 * if it has not been set keep it as Undefined.
 */
export class VersionNumber {
    public static getVersionNumber(version: string | undefined): number | undefined {
        return version ? parseInt(version) : undefined;
    }
}
