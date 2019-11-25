import {Application} from 'express';

import documentManagementRouter from './api/controllers/documentManagement/router';
import usersRouter from './api/controllers/users/router';
import healthRouter from './api/controllers/health/router';
import appsRouter from './api/controllers/apps/router';
import {validateS2SToken, validateBearerToken} from './api/middlewares';

export default function routes(app: Application): void {
    // open routes
    app.use('/health', healthRouter);

    app.use(validateS2SToken);
    app.use(validateBearerToken);

    // closed routes
    app.use('/api/v1/termsAndConditions/:app/documents', documentManagementRouter);
    app.use('/api/v1/termsAndConditions/:app/users', usersRouter);
    app.use('/api/v1/termsAndConditions/apps', appsRouter);
};
