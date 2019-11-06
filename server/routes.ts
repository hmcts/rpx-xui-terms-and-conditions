import { Application } from 'express';

import copyManagementRouter from './api/controllers/copyManagement/router';
import usersRouter from './api/controllers/users/router'

export default function routes(app: Application): void {
  app.use('/api/v1/termsAndConditions', copyManagementRouter);
  app.use('/api/v1/termsAndConditions/:app/users', usersRouter);
};