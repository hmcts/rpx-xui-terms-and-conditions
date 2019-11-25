import * as pgMonitor from 'pg-monitor';
import {IInitOptions} from 'pg-promise';

// Flag to indicate whether we are in a DEV environment:
// TODO: Get from config
const $PROD = process.env.XUI_ENV === 'prod';

export class Diagnostics {
    static init<Ext = {}>(options: IInitOptions<Ext>) {
        if ($PROD) {
            pgMonitor.attach(options, ['error']);
        } else {
            pgMonitor.attach(options);
        }
    }
}
