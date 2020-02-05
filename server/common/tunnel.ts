import { createGlobalProxyAgent } from 'global-agent';
import config from 'config';
import l from './logger';

export function init() {
    if (config.has('proxy.host') && config.has('proxy.port')) {
        const proxy = {
            host: config.get<string>('proxy.host'),
            port: parseInt(config.get<string>('proxy.port'), 10) as number,
        };

        const globalProxyAgent = createGlobalProxyAgent();
        globalProxyAgent.HTTP_PROXY = `http://${proxy.host}:${proxy.port}`;
        globalProxyAgent.NO_PROXY = 'localhost';

        l.info('configuring global-agent:', proxy);
    }
}
