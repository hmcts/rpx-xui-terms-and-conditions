import Server from './common/server';
import routes from './routes';
import L from './common/logger';
import {environmentCheckText, getEnvironment} from './api/configuration'
import {getDynamicConfigValue} from './api/configuration'
import {ERROR_NODE_CONFIG_ENV} from './api/configuration/constants'

/**
 * If there are no configuration properties found we highlight this to the person attempting to initialise
 * this application.
 */
if (!getEnvironment()) {
    L.info(ERROR_NODE_CONFIG_ENV)
}

L.info(environmentCheckText());

const databasePassword = getDynamicConfigValue('secrets.rpx.postgresql-admin-pw', 'database.password');

L.info('databasePassword');
L.info(databasePassword);

export default new Server().router(routes).listen(process.env.PORT || 3000);
