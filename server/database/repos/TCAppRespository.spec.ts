import { TCAppRepository } from './index';

describe('TC App Repository', () => {
    it('find() should call this.db.one with the app name.', async () => {
        const APP_NAME = ['managecases'];

        const db: any = {
            manyOrNone: jest.fn().mockReturnValue({}),
        };

        const tcAppRepository = new TCAppRepository(db);

        await tcAppRepository.find(APP_NAME);

        expect(db.manyOrNone).toHaveBeenCalledWith(
            {},
            {
                apps: APP_NAME,
            },
        );
    });

    /**
     * TODO: We're not testing sql.add
     */
    it('add() should call this.db.one with the app name.', async () => {
        const APP_NAME = 'managecases';

        const db: any = {
            one: jest.fn().mockReturnValue({}),
        };

        const tcAppRepository = new TCAppRepository(db);

        await tcAppRepository.add(APP_NAME);

        expect(db.one).toHaveBeenCalledWith({}, APP_NAME);
    });

    it('remove() should call this.db.result.', async () => {
        const ID = 42;

        const db: any = {
            result: jest.fn().mockReturnValue({}),
        };

        const tcAppRepository = new TCAppRepository(db);

        await tcAppRepository.remove(ID);

        expect(db.result).toHaveBeenCalled();
    });

    it('all() should call this.db.any.', async () => {
        const db: any = {
            any: jest.fn().mockReturnValue({}),
        };

        const tcAppRepository = new TCAppRepository(db);

        await tcAppRepository.all();

        expect(db.any).toHaveBeenCalled();
    });

    it('total() should call this.db.one.', async () => {
        const db: any = {
            one: jest.fn().mockReturnValue({}),
        };

        const tcAppRepository = new TCAppRepository(db);

        await tcAppRepository.total();

        expect(db.one).toHaveBeenCalled();
    });
});
