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
    L.info('Looking for the following environmental variables.')
    L.info(config.get('environment'))
}