import Server from './common/server';
import routes from './routes';
import L from './common/logger';
import * as config from 'config';
import * as propertiesVolume from '@hmcts/properties-volume';
import {environmentCheckText, getEnvironment} from './api/configuration'
import {ERROR_NODE_CONFIG_ENV} from './api/configuration/constants'

/**
 * Allows us to integrate the Azure key-vault flex volume, so that we are able to access Node configuration values.
 */
propertiesVolume.addTo(config);

/**
 * If there are no configuration properties found we highlight this to the person attempting to initialise
 * this application.
 */
if (!getEnvironment()) {
    L.info(ERROR_NODE_CONFIG_ENV)
}

L.info(environmentCheckText())

export default new Server().router(routes).listen(process.env.PORT || 3000);
