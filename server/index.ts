import Server from './common/server';
import routes from './routes';
import L from './common/logger';
import {environmentCheckText, getEnvironment, checkSecret} from './api/configuration'
import {getDynamicConfigValue} from './api/configuration'
import {ERROR_NODE_CONFIG_ENV} from './api/configuration/constants'

// const config = require('@hmcts/properties-volume').addTo(require('config'))
// This is an actual non-mutated object
import initConfig from 'config';

// Allow propertiesVolume to mutate this
import * as config from 'config';
// import * as secretsConfig from 'config';
import * as propertiesVolume from "@hmcts/properties-volume";

/**
 * If there are no configuration properties found we highlight this to the person attempting to initialise
 * this application.
 */
if (!getEnvironment()) {
    L.info(ERROR_NODE_CONFIG_ENV)
}

L.info(environmentCheckText());

/**
 * Allows us to integrate the Azure key-vault flex volume, so that we are able to access Node configuration values.
 *
 * So this mutates the config and adds the secrets to it.
 */
propertiesVolume.addTo(config, {failOnError: false});
// propertiesVolume.addTo(config, {failOnError: false});

console.log(initConfig);
console.log('mutated config')
console.log(config);
const cloneConfig = Object.assign({}, config);



console.log('cloneConfig')
console.log(config['secrets']['rpx']['postgresql-admin-pw'])
// console.log(cloneConfig['secrets'].rpx['postgresql-admin-pw'])

// But then we can't call config.get() as we've included it as * as config from 'config'
// console.log(config.get('secrets.rpx.postgresql-admin-pw'))

// console.log(initConfig.config.get('secrets.rpx.postgresql-admin-pw'))

// const databasePassword = getDynamicConfigValue('secrets.rpx.postgresql-admin-pw', 'database.password');

// L.info('databasePassword');
// L.info(databasePassword);

export default new Server().router(routes).listen(process.env.PORT || 3000);
