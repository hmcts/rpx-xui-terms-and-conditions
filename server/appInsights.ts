import * as applicationinsights from 'applicationinsights'
import * as express from 'express'
import * as secretsConfig from 'config';
import {propsExist} from './api/utils/objectUtilities';
import {getAppInsightsSecret} from './api/configuration';

export let client

if (propsExist(secretsConfig, ['secrets', 'rpx', 'appinsights-instrumentationkey-tc'])) {
    applicationinsights
        .setup(getAppInsightsSecret(secretsConfig))
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setSendLiveMetrics(true)
        .setUseDiskRetryCaching(true)
        .start()

    client = applicationinsights.defaultClient
    client.trackTrace({message: 'App Insight Activated'})
} else {
    client = null
}

export function appInsights(req: express.Request, res: express.Response, next) {
    if (client) {
        client.trackNodeHttpRequest({request: req, response: res})
    }

    next()
}
