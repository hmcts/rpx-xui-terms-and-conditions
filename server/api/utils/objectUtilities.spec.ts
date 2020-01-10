import { propsExist } from './objectUtilities';

describe('Object Utilities ', () => {
    describe('propsExist()', () => {
        it('Should return true if all the properties exist on an object.', () => {
            const object = { level1: { level2: { level3: 'level3' } } };

            expect(propsExist(object, ['level1', 'level2', 'level3'])).toBe(true);
        });

        it('Should return false if a property does not exist on an object.', () => {
            const object = { level1: { level2: { level3: 'level3' } } };

            expect(propsExist(object, ['level1', 'breakingProperty', 'level3'])).toBe(false);
        });

        it('Should return false if the object is undefined.', () => {
            const object = undefined;

            expect(propsExist(object, ['level1', 'level2', 'level3'])).toBe(false);
        });

        it('Should return false if the object is null.', () => {
            const object = null;

            expect(propsExist(object, ['level1', 'level2', 'level3'])).toBe(false);
        });
    });
});
