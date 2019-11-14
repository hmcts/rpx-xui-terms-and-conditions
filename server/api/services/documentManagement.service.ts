import L from '../../common/logger';
import { db } from '../../database';
import { Document } from '../interfaces/documents';
import { TCDocument } from '../../database/models';
import { ERROR_APP_NOT_FOUND } from '../errors';

let version = 1;
const documents: Document[] = [
    { version: version++, document: `<h1>Version ${version - 1}</h1>`, mimeType: 'text/html' },
    { version: version++, document: `<h1>Version ${version - 1}</h1>`, mimeType: 'text/html' },
];

const apps = {
    app1: documents,
    app2: documents,
    app3: documents,
};

export class DocumentManagementService {
    async all(app: string): Promise<TCDocument[]> {
        L.info(apps[app], `fetch all versions for ${app}`);
        const documents = await db.documents.all({app: app});
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        if (documents.length === 0) {
            throw Error(ERROR_APP_NOT_FOUND);
        }
        return documents;
    }

    byVersion(app: string, version: string): Document {
        L.info(`fetch document with version ${version}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        return apps[app].find(element => element.version.toString() === version);
    }

    latest(app: string): Document {
        L.info(`fetch latest document`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        const selectedApp = apps[app];
        return selectedApp[selectedApp.length - 1];
    }

    create(app: string, document: string, mimeType: string): Document {
        L.info(`create document with content ${document}`);
        const copy: Document = {
            document,
            mimeType,
        };
        apps[app].push(copy);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return copy;
    }
}

export default new DocumentManagementService();
