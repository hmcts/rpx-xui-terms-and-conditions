/* eslint @typescript-eslint/no-explicit-any: 0 */

import { IConnectionOptions } from 'pg-promise';
import { db } from '../../database/index';

export class DbWrapper {
    connect(options?: IConnectionOptions<any>): Promise<any> {
        return db.connect(options);
    }
}
