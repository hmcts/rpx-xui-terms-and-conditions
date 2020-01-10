import config from 'config';

/**
 * Get Environment
 *
 * See Readme for more information on how the configuration file is set.
 * 'Environmental Variables Setup & Error Handling'
 *
 * @see Readme
 * @returns {string} ie. - development / preview / aat / ithc, prod
 */
export const getEnvironment = () => process.env.NODE_CONFIG_ENV;

/**
 * Get Dynamic Config Value
 *
 * TODO: Test returns reference if other reference is not available.
 *
 * @param reference - 'secrets.rpx.postgresql-admin-pw'
 * @param fallbackReference - 'database.password'
 */
export const getDynamicConfigValue = (reference, fallbackReference): string => {
    if (config.has(reference)) {
        return config.get(reference);
    } else {
        return config.get(fallbackReference);
    }
};

/**
 * Has Config Value
 *
 * Returns if the configuration value is available, using a config reference. It uses the reference to pull out the value
 * from the .yaml file
 *
 * Note: If within a .yaml file you have
 *
 * database:
 *   name: POSTGRES_DB_NAME
 *
 * If POSTGRES_DB_NAME is unable to be pulled from the JenkinsFile_CNP,
 * then .yaml will return a string of 'POSTGRES_DB_NAME'
 *
 * This means that config.has('database.name') will always return true
 * as 'database.name'.
 *
 * This also means that config.get('database.name') will return 'POSTGRES_DB_NAME' and not
 * undefined.
 *
 * We return null if the value config.get receives has not been overridden.
 *
 * @see /config .yaml
 * @see references.ts
 * @param reference - ie. 'services.ccdDefApi'
 * @param shouldBeOverridden - ie. 'POSTGRES_DB_NAME'
 */
export const hasConfigValue = (reference, shouldBeOverridden) => {
    const configurationValue = config.get(reference);

    return configurationValue !== shouldBeOverridden;
};

/**
 * Generate Environment Check Text
 *
 * We generate text to be used for debugging purposes, so as the person attempting to initialise the application knows
 * what the NODE_CONFIG_ENV is set as and what config file is being used.
 */
export const environmentCheckText = () =>
    `NODE_CONFIG_ENV is set as ${process.env.NODE_CONFIG_ENV} therefore we are using the ${config.get(
        'environment',
    )} config.`;
