import './common/env';
import Server from './common/server';
import routes from './routes';

// TODO: Hard-coded 8080 for now, until we have environmental
// variables in our pipeline.
// const port = parseInt(process.env.PORT);
const port = 3000;
export default new Server()
  .router(routes)
  .listen(port);
