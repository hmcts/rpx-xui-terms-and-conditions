import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';

import installValidator from './swagger';

import l from './logger';
import * as tunnel from './tunnel';
import { appInsights } from '../appInsights';

const app = express();

export default class ExpressServer {
    constructor() {
        const requestLimit = '100kb';
        const sessionSecret = 'secret';
        const root = path.normalize(__dirname + '/../..');

        /**
         * Removing Tunnel to check if we get less errors on Flux.
         */
        // tunnel.init();

        app.set('appPath', root + 'client');
        app.use(bodyParser.json({ limit: requestLimit || '100kb' }));
        app.use(bodyParser.urlencoded({ extended: true, limit: requestLimit || '100kb' }));
        app.use(bodyParser.text({ limit: requestLimit || '100kb' }));
        app.use(cookieParser(sessionSecret));
        app.use(express.static(`${root}/public`));
        app.use(appInsights);
    }

    router(routes: (app: Application) => void): ExpressServer {
        installValidator(app, routes);
        return this;
    }

    // TODO: Hard-coded 8080 for now, until we have environmental
    // variables in our pipeline.
    listen(p: string | number = 3000): Application {
        const welcome = port => () => l.info(`up and running in @: ${os.hostname()} on port: ${port}}`);
        http.createServer(app).listen(p, welcome(p));
        return app;
    }
}
