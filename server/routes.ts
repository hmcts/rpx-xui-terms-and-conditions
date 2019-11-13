import { Application } from 'express';

import copyManagementRouter from './api/controllers/copyManagement/router';
import usersRouter from './api/controllers/users/router';
import healthRouter from './api/controllers/health/router';
import { validateIncomingRequest } from './api/middlewares/validateClientSecurity';

export default function routes(app: Application): void {
  app.use('/api/v1/termsAndConditions', validateIncomingRequest, copyManagementRouter);
  app.use('/api/v1/termsAndConditions/:app/users', usersRouter);
  app.use('/health', healthRouter);
};
