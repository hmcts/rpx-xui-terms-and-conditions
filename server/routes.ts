import { Application } from 'express';

import copyManagementRouter from './api/controllers/copyManagement/router';
// import usersRouter from './api/controllers/users/router'

import userController from './api/controllers/users/userController';

/**
 * Routes
 *
 * We do not have a separate router file under each controller, as this does not allow us
 * the granularity of the url paths that we need as per the architectural doc ie. we need to have /:app as
 * a parameter before users.
 *
 * But if we were to use app.use to define a middleware, the /:app param currently returns as undefined.
 */
export default function routes(app: Application): void {
  app.use('/api/v1/termsAndConditions', copyManagementRouter);
  // app.use('/api/v1/termsAndConditions/:app/users', usersRouter);

  /**
   * Users Routing
   */
  app.post('/api/v1/termsAndConditions/:app/users/:version', userController.acceptTermsConditions);
  app.get('/api/v1/termsAndConditions/:app/users/:version', userController.getAcceptedUsers);
  app.get('/api/v1/termsAndConditions/:app/users/:userId/:version', userController.getAcceptedUsers);

  app.get('/health', (req, res, next) => {
    res.status(200).send('Terms and Conditions is Up')
  });
  app.get('/health/liveness', (req, res, next) => {
    res.status(200).send('Terms and Conditions Liveness is Up')
  });
};
