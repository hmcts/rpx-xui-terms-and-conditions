import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';

import installValidator from './swagger';

import l from './logger';

const app = express();

export default class ExpressServer {
    constructor() {
        // const requestLimit = process.env.REQUEST_LIMIT;
        const requestLimit = '100kb';
        // const sessionSecret = process.env.SESSION_SECRET;
        const sessionSecret = 'secret';
        const root = path.normalize(__dirname + '/../..');
        app.set('appPath', root + 'client');
        app.use(bodyParser.json({ limit: requestLimit || '100kb' }));
        app.use(bodyParser.urlencoded({ extended: true, limit: requestLimit || '100kb' }));
        app.use(bodyParser.text({ limit: requestLimit || '100kb' }));
        app.use(cookieParser(sessionSecret));
        app.use(express.static(`${root}/public`));
    }

    router(routes: (app: Application) => void): ExpressServer {
        installValidator(app, routes);
        return this;
    }

    // TODO: Hard-coded 8080 for now, until we have environmental
    // variables in our pipeline.
    listen(p: string | number = 3000): Application {
        const welcome = port => () =>
            l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
        http.createServer(app).listen(p, welcome(p));
        return app;
    }
}
