import { createGlobalProxyAgent } from 'global-agent';
import * as globalTunnel from 'global-tunnel-ng';
import config from 'config';
import l from './logger';

const proxy = {
    host: config.get<string>('proxy.host'),
    port: <number>parseInt(config.get<string>('proxy.port'), 10) || 0
};

const useProxy = () => proxy.host !== '' && proxy.port !== 0;

export function init() {
    if (useProxy()) {
        let logMessage = '';
        const MAJOR_NODEJS_VERSION = parseInt(process.version.slice(1).split('.')[0], 10);

        if (MAJOR_NODEJS_VERSION >= 10) {
            // `global-agent` works with Node.js v10 and above.
            const globalProxyAgent = createGlobalProxyAgent();
            logMessage = 'configuring global-agent:';
            globalProxyAgent.HTTP_PROXY = `http://${proxy.host}:${proxy.port}`;
        } else {
            // `global-tunnel-ng` works only with Node.js v10 and below.
            logMessage = 'configuring global-tunnel-ng:';
            globalTunnel.initialize(proxy);
        }

        l.info('using PROXY => ', logMessage, proxy);
    }
}
