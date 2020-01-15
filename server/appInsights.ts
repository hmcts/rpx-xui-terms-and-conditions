import * as applicationinsights from 'applicationinsights'
import * as express from 'express'
import config from 'config'
import * as secretsConfig from 'config';
import {propsExist} from './api/utils/objectUtilities';
export let client

// shouldnt do this check here but this is a high level dep
const environment = config.get<string>('environment')

if (environment !== 'development' && propsExist(secretsConfig, ['secrets', 'rpx', 'appinsights-instrumentationkey-tc'])) {
    applicationinsights
        .setup(secretsConfig['secrets']['rpx']['appinsights-instrumentationkey-tc'])
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
    client.trackTrace({ message: 'App Insight Activated' })
} else {
    client = null
}

export function appInsights(req: express.Request, res: express.Response, next) {
    if (client) {
        client.trackNodeHttpRequest({ request: req, response: res })
    }
    
    next()
}
