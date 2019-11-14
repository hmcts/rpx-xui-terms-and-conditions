import { Application } from 'express';

import documentManagementRouter from './api/controllers/documentManagement/router';
import usersRouter from './api/controllers/users/router';
import healthRouter from './api/controllers/health/router';

export default function routes(app: Application): void {
  app.use('/api/v1/termsAndConditions/:app', documentManagementRouter);
  app.use('/api/v1/termsAndConditions/:app/users', usersRouter);
  app.use('/health', healthRouter);
};
