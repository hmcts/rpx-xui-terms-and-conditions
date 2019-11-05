import { Application } from 'express';

import examplesRouter from './api/controllers/examples/router'
import copyManagementRouter from './api/controllers/copyManagement/router';
import usersRouter from './api/controllers/users/router'

// TODO: Clean up our routes
export default function routes(app: Application): void {
  app.use('/api/v1/examples', examplesRouter);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/termsAndConditions', copyManagementRouter);
};
