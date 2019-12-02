import {TCUserAgreementRepository} from './index';

describe('TC User Agreement Repository', () => {

    it('create() should call this.db.none with the app name.', async () => {

        const db: any = {
            none: jest.fn().mockReturnValue({}),
        };

        const userAgreementRepository = new TCUserAgreementRepository(db);

        await userAgreementRepository.create();

        expect(db.none).toHaveBeenCalled();
    });

    it('add() should take in user, app and version.', async () => {
        const USER = '123e4567-e89b-12d3-a456-426655440000';
        const APP_NAME = 'managecases';
        const VERSION = 1;

        const db: any = {
            one: jest.fn().mockReturnValue({}),
        };

        const userAgreementRepository = new TCUserAgreementRepository(db);

        const addValues = {
            user: USER,
            app: APP_NAME,
            version: VERSION,
        };

        await userAgreementRepository.add(addValues);

        expect(db.one).toHaveBeenCalledWith({}, {
            app: addValues.app,
            user: addValues.user,
            version: addValues.version,
        });
    });

    it('get() should take in user, app and version.', async () => {
        const USER = '123e4567-e89b-12d3-a456-426655440000';
        const APP_NAME = 'managecases';
        const VERSION = 1;

        const db: any = {
            one: jest.fn().mockReturnValue({}),
        };

        const userAgreementRepository = new TCUserAgreementRepository(db);

        const getValues = {
            user: USER,
            app: APP_NAME,
            version: VERSION,
        };

        await userAgreementRepository.get(getValues);

        expect(db.one).toHaveBeenCalledWith({}, {
            app: getValues.app,
            user: getValues.user,
            version: getValues.version,
        });
    });

    it('getAll() should take in app and version.', async () => {
        const VERSION = 42;
        const APP_NAME = 'managecases';

        const db: any = {
            manyOrNone: jest.fn().mockReturnValue({}),
        };

        const userAgreementRepository = new TCUserAgreementRepository(db);

        const getAllValues = {
            app: APP_NAME,
            version: VERSION,
        };

        await userAgreementRepository.getAll(getAllValues);

        expect(db.manyOrNone).toHaveBeenCalledWith({}, {
            app: getAllValues.app,
            version: getAllValues.version,
        });
    });
});
