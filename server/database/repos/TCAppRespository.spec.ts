import {TCAppRepository} from "./index";
import {apps as sql} from '../sql';
import UsersService from "../../api/services/users.service";

/**
 * Mock Express Request Object using Jest
 */
const mockRequest = () => {
    return {
        params: {
            app: 'manageorg',
            version: 1,
        },
        body: {
            uuid: 'testUuid'
        }
    }
};

/**
 * Mock Express Response Object using Jest
 *
 * We mock the status and send so that we can test the response of
 * <code>
 *     res.status(200).send(LIVENESS_UP_AND_RUNNING);
 * </code>
 */
const mockResponse = () => {
    return {
        status: jest.fn().mockReturnValue({
            send: jest.fn().mockReturnValue({})
        })
    };
};

describe('TC App Repository', () => {

    it('create() should call this.db.none.', async () => {

        const db: any = {
            none: jest.fn().mockReturnValue({})
        };

        const pgp: any = {};

        const tcAppRepository = new TCAppRepository(db, pgp);

        await tcAppRepository.create();

        expect(db.none).toHaveBeenCalled();
    });

    it('find() should call this.db.one with the app name.', async () => {

        const APP_NAME = ['managecases'];

        const db: any = {
            manyOrNone: jest.fn().mockReturnValue({})
        };

        const pgp: any = {};

        const tcAppRepository = new TCAppRepository(db, pgp);

        await tcAppRepository.find(APP_NAME);

        expect(db.manyOrNone).toHaveBeenCalledWith({}, {
            apps: APP_NAME,
        });
    });

    /**
     * TODO: We're not testing sql.add
     */
    it('add() should call this.db.one with the app name.', async () => {

        const APP_NAME = 'managecases';

        const db: any = {
            one: jest.fn().mockReturnValue({})
        };

        const pgp: any = {};

        const tcAppRepository = new TCAppRepository(db, pgp);

        await tcAppRepository.add(APP_NAME);

        expect(db.one).toHaveBeenCalledWith({}, APP_NAME);
    });

    it('remove() should call this.db.result.', async () => {

        const ID = 42;

        const db: any = {
            result: jest.fn().mockReturnValue({})
        };

        const pgp: any = {};

        const tcAppRepository = new TCAppRepository(db, pgp);

        await tcAppRepository.remove(ID);

        expect(db.result).toHaveBeenCalled();
    });

    it('all() should call this.db.any.', async () => {

        const db: any = {
            any: jest.fn().mockReturnValue({})
        };

        const pgp: any = {};

        const tcAppRepository = new TCAppRepository(db, pgp);

        await tcAppRepository.all();

        expect(db.any).toHaveBeenCalled();
    });

    it('total() should call this.db.one.', async () => {

        const db: any = {
            one: jest.fn().mockReturnValue({})
        };

        const pgp: any = {};

        const tcAppRepository = new TCAppRepository(db, pgp);

        await tcAppRepository.total();

        expect(db.one).toHaveBeenCalled();
    });
});



