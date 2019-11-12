import * as pgMonitor from 'pg-monitor';
import {IInitOptions} from 'pg-promise';
import l from '../server/common/logger';

// Flag to indicate whether we are in a DEV environment:
const $DEV = process.env.NODE_ENV === 'development';

pgMonitor.setLog((msg, info) => {
    if ( info.event in l) {
        l[info.event](msg);
    } else {
        l.info(msg)
    }
});

export class Diagnostics {
    // Monitor initialization function;
    static init<Ext = {}>(options: IInitOptions<Ext>) {
        if ($DEV) {
            // In a DEV environment, we attach to all supported events:
            pgMonitor.attach(options);
        } else {
            // In a PROD environment we should only attach to the type of events
            // that we intend to log. And we are only logging event 'error' here:
            pgMonitor.attach(options, ['error']);
        }
    }
}
