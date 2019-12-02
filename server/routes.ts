import { Application } from 'express';

import documentManagementRouter from './api/controllers/documentManagement/router';
import usersRouter from './api/controllers/users/router';
import healthRouter from './api/controllers/health/router';
import appsRouter from './api/controllers/apps/router';
import { validateS2SToken, validateBearerToken, validateDBConnection } from './api/middlewares';

export default function routes(app: Application): void {
    // open routes
    app.use('/health', healthRouter);
    // this is needed to prevent duplicate errors being thrown
    app.get('/favicon.ico', (req, res) => res.sendStatus(204));

    // closed routes
    // app.use(validateS2SToken);
    // app.use(validateBearerToken);
    app.use(validateDBConnection);

    app.use('/api/v1/termsAndConditions/:app/documents', documentManagementRouter);
    app.use('/api/v1/termsAndConditions/:app/users', usersRouter);
    app.use('/api/v1/termsAndConditions/apps', appsRouter);
}
