import config from 'config';
import L from '../../common/logger';
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
 * Generate Environment Check Text
 *
 * We generate text to be used for debugging purposes, so as the person attempting to initialise the application knows
 * what the NODE_CONFIG_ENV is set as and what config file is being used.
 */
export const environmentCheckText = () =>
    `NODE_CONFIG_ENV is set as ${process.env.NODE_CONFIG_ENV} therefore we are using the ${config.get(
        'environment',
    )} config.`;

export const exportAllEnvVariables = () => {
    L.info('Looking for config variables.')
    L.info(`Environment: ${config.get('environment')}`)
    L.info(`POSTGRES_DB_NAME: ${config.get('database.name')}`)
    L.info(`POSTGRES_SERVER_NAME: ${config.get('database.host')}`)
    L.info(`POSTGRES_USERNAME: ${config.get('database.username')}`)
    L.info(`POSTGRES_SERVER_PORT: ${config.get('database.port')}`)
    L.info(`POSTGRES_SSL: ${config.get('database.ssl')}`)
    L.info(`POSTGRES_PASSWORD: ${config.get('secrets.rpx.postgresql-admin-pw')}`)
    L.info(`APPINSIGHTS_INSTRUMENTATIONKEY: ${config.get('secrets.rpx.appinsights-instrumentationkey-tc')}`)
    L.info(`PROXY_HOST: ${config.get('proxy.host')}`)
    L.info(`PROXY_PORT: ${config.get('proxy.port')}`)
    L.info(`CLIENT_WHITELIST: ${config.get('client.whitelist')}`)
    L.info(`S2S_TOKEN_URL: ${config.get('services.s2s')}`)
    L.info(`IDAM_SERVICE_URL: ${config.get('services.idam.api-url')}`)
}