import Server from './common/server';
import routes from './routes';
import * as config from 'config'
import * as propertiesVolume from '@hmcts/properties-volume'
propertiesVolume.addTo(config)

export default new Server()
  .router(routes)
  .listen(3000);
