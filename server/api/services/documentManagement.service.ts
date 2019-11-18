import L from '../../common/logger';
import { db } from '../../database';
import { Document } from '../interfaces/documents';
import { TCDocument } from '../../database/models';
import { ERROR_APP_NOT_FOUND } from '../errors';

export class DocumentManagementService {
    all(app: string): Promise<TCDocument[]> {
        L.info(`fetch all versions for ${app}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_APP_NOT_FOUND);
        return db.documents.all({app});
    }

    byVersion(app: string, version: number): Promise<Document> {
        L.info(`fetch document with version ${version}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        // return apps[app].find(element => element.version.toString() === version);
        return db.documents.findByVersion({app, version});
    }

    latest(app: string): Promise<Document> {
        L.info(`fetch latest document`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        return db.documents.findLatest({app});
    }

    create(app: string, document: string, mimeType: string): Promise<Document> {
        L.info(`create document with content ${document}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return db.documents.add({document: document, mimeType: mimeType, apps:[app]});
    }
}

export default new DocumentManagementService();
