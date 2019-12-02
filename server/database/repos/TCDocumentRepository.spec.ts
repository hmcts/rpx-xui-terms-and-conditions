/* eslint @typescript-eslint/no-explicit-any: 0 */

import { TCDocumentRepository } from './index';

describe('TC Document  Repository', () => {
    it('should create', () => {
        const db: any = {
            none: jest.fn().mockReturnValue({}),
        };

        const tcDocumentDepository = new TCDocumentRepository(db);
        tcDocumentDepository.create();
        expect(db.none).toHaveBeenCalled();
    });

    it('should total', () => {
        const db: any = {
            one: jest.fn().mockReturnValue({}),
        };
        const tcDocumentDepository = new TCDocumentRepository(db);
        tcDocumentDepository.total({ app: 'string' });
        expect(db.one).toHaveBeenCalled();
    });

    it('should all', () => {
        const db: any = {
            any: jest.fn().mockReturnValue({}),
        };
        const tcDocumentDepository = new TCDocumentRepository(db);
        tcDocumentDepository.all({ app: 'string' });
        expect(db.any).toHaveBeenCalled();
    });

    it('should findbyVersion', () => {
        const db: any = {
            oneOrNone: jest.fn().mockReturnValue({}),
        };
        const tcDocumentDepository = new TCDocumentRepository(db);
        tcDocumentDepository.findByVersion({ app: 'string', version: 123 });
        expect(db.oneOrNone).toHaveBeenCalled();
    });

    it('should findLatest', () => {
        const db: any = {
            oneOrNone: jest.fn().mockReturnValue({}),
        };
        const tcDocumentDepository = new TCDocumentRepository(db);
        tcDocumentDepository.findLatest({ app: 'string' });
        expect(db.oneOrNone).toHaveBeenCalled();
    });

    it('should find', () => {
        const db: any = {
            oneOrNone: jest.fn().mockReturnValue({}),
        };
        const tcDocumentDepository = new TCDocumentRepository(db);
        tcDocumentDepository.find({ documentId: 123 });
        expect(db.oneOrNone).toHaveBeenCalled();
    });
});
