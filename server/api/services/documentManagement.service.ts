import L from '../../common/logger';
import { db } from '../../database';
import { Document } from '../interfaces/documents';
import { TCDocument } from '../../database/models';
import { ApplicationError } from '../errors';

export class DocumentManagementService {
    public async all(app: string): Promise<TCDocument[]> {
        L.info(`fetch all versions for ${app}`);
        const values = { app };
        const documents = await db.documents.all(values);
        if (!documents.length) {
            throw new ApplicationError(`No documents found for ${values}`, 404);
        }
        return Promise.resolve(documents);
    }

    public async byVersion(app: string, version: number): Promise<Document> {
        L.info(`fetch document with version ${version}`);
        const values = { app, version };
        const document = await db.documents.findByVersion(values);
        if (!document) {
            throw new ApplicationError(`No document found for ${values}`, 404);
        }
        return Promise.resolve(document);
    }

    public async latest(app: string): Promise<Document> {
        L.info(`fetch latest document`);
        const values = { app };
        const document = await db.documents.findLatest(values);
        if (!document) {
            throw new ApplicationError(`No latest document found for ${values}`, 404);
        }
        return Promise.resolve(document);
    }

    create(app: string, document: string, mimeType: string): Promise<Document> {
        L.info(`create document with content ${document}`);
        return db.documents.add({ document: document, mimeType: mimeType, apps: [app] });
    }
}

export default new DocumentManagementService();
