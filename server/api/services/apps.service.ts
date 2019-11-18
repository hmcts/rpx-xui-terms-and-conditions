import L from '../../common/logger';
import { db } from '../../database';
import { TCApp } from '../../database/models';

/**
 * Apps Service
 *
 */
export class AppsService {
    /**
     * getAllApps
     *
     * Get All app names
     *
     *
     */
    public getAllApps(): Promise<TCApp[]> {
        L.info(`Get all app names.`);

        return db.apps.all();
    }
}

export default new AppsService();
