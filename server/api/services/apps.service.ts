import L from '../../common/logger';
import { db } from '../../database';
import { TCApp } from '../../database/models';
import { ApplicationError } from '../errors';

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
    public async getAllApps(): Promise<TCApp[]> {
        L.info(`Get all app names.`);
        const apps = await db.apps.all();
        if (!apps.length) {
            throw new ApplicationError('No apps found', 404);
        }
        return Promise.resolve(apps);
    }
}

export default new AppsService();
