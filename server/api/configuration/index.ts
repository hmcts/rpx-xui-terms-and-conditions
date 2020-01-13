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
 * Get Dynamic Secret Value
 *
 * If the secret value is available, ie. the secret from the environments with Flux,
 * then we use the secrets value.
 *
 * If it's not we fallback use the reference to pull out the value
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
 * @param {string} secret
 * @param fallbackSecret
 * @returns {string}
 */
export const getDynamicSecret = (secret, fallbackSecret): string => {
    if (secret) {
        return secret;
    } else {
        return config.get(fallbackSecret);
    }
};

/**
 * Get Postgres Secret
 *
 * Table showing the Branches, Environment names set via NODE_CONFIG_ENV, their deployment pipelines,
 * and where the secrets for that environment are coming from.
 *
 * Note that the application uses the NODE_CONFIG_ENV to firstly hit the .yaml files within /config for configuration.
 *
 * VALUES within /config are set using the values.yaml file in /charts/xui-terms-and-conditions
 *
 * ie. config.get('database.port') in app code picks out database.port from aat.yaml on all aat
 * environments. POSTGRES_SERVER_PORT in aat.yaml is set by POSTGRES_SERVER_PORT within charts/xui-terms-and-conditions/
 * values.yaml
 *
 * Note that values.aat.template.yaml and values.preview.template.yaml are the parent of values.yaml and are
 * therefore used first on Jenkins AAT and Jenkins AAT environments. TODO: Deprecate values.aat.template.yaml
 * and values.preview.template.yaml
 *
 * |--------------------------------------------------------
 * | Branch | Environment | Deployment via | Postgres Secret
 * |--------------------------------------------------------
 * | local  | development | -              | local within /mnt/secrets/rpx
 * |        |             |                | @see readme on how to create /mnt
 * | PR     | preview     | Jenkins        | POSTGRES_PASSWORD within values.preview.template.yaml passed into application via preview.yaml
 * | Master | aat         | Jenkins        | keyVaults.rpx.secrets.postgresql-admin-pw within charts/xui-terms-and-conditions/values.yaml passed into application using /mnt/secrets/rpx and
 *  propertiesVolume.addTo(secretsConfig);
 * | Master | aat         | Flux
 * | Master | ithc        | Flux
 * | Master | production  | Flux
 *
 *
 * Information on Postgres Secret on Environments
 *
 * On all environments include local (see above) the Secrets are contained with /mnt/secrets/rpx
 *
 * The Secrets are pulled into the application using properties-volume Node Module, using
 * propertiesVolume.addTo(secretsConfig);
 *
 * We're able to pull in the secrets into the application using the following:
 * secretsConfig['secrets']['rpx']['postgresql-admin-pw']
 *
 * The secrets are in all environments BUT on the PR environment we need to use the POSTGRES_PASSWORD
 * from values.preview.template.yaml pulled in the application through the preview.yaml file. Why?
 * There is only one instance of Postgres used by the environments higher than AAT, and of course do not want to publish
 * passwords into git.
 *
 * There is a secret in the PR but we don't want to use it.
 *
 * @returns {string}
 */
export const getPostgresSecret = (environmentSecret, environment): string => {
    const PREVIEW = 'preview';
    const ERROR_POSTGRES_SECRET_NOT_FOUND =
        'secrets.rpx.postgresql-admin-pw not found on this environment, please ' +
        'make sure its setup within /mnt/secrets.';

    if (environment === PREVIEW) {
        return config.get('database.password');
    }

    // The environment secrete should be found on
    // all environments.
    if (environmentSecret) {
        return environmentSecret;
    } else {
        console.log(ERROR_POSTGRES_SECRET_NOT_FOUND);
        return '';
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
