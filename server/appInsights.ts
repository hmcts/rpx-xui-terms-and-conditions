import * as applicationinsights from 'applicationinsights'
import * as express from 'express'
import config from 'config'
export let client

// shouldnt do this check here but this is a high level dep
const environment = config.get<string>('environment')
if (environment !== 'local') {
    applicationinsights
        .setup(config.get<string>('secrets.rpx.appinsights-instrumentationkey-tc'))
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
