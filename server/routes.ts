import { Application } from 'express';

import documentManagementRouter from './api/controllers/documentManagement/router';
import usersRouter from './api/controllers/users/router';
import healthRouter from './api/controllers/health/router';
import { validateIncomingRequest } from './api/middlewares/validateClientSecurity';
import appsRouter from './api/controllers/apps/router';

export default function routes(app: Application): void {
  app.use('/api/v1/termsAndConditions/:app/documents', validateIncomingRequest, documentManagementRouter);
  app.use('/api/v1/termsAndConditions/:app/users', validateIncomingRequest, usersRouter);
  app.use('/api/v1/termsAndConditions/apps', validateIncomingRequest, appsRouter);
  app.use('/health', healthRouter);
};
