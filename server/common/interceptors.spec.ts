import {requestInterceptor, successInterceptor, errorInterceptor} from './interceptors'

describe('Interceptors', () => {

    describe('requestInterceptor()', () => {
        it('should return the request', () => {

            const request = {
                method: '',
            };

            expect(requestInterceptor(request)).toBe(request);
        })
    });

    describe('successInterceptor()', () => {
        it('should return the response', () => {

            const response = {
                config: {
                    metadata: {
                        endTime: '',
                    },
                    method: '',
                }
            };

            expect(successInterceptor(response)).toBe(response);
        })
    });

    describe('errorInterceptor()', () => {

        /**
         * Error duration is endTime minus startTime
         *
         * Note that we are using .toBeGreaterThanOrEqual() as usually the time duration for this unit test
         * will be 0, but on occasion it is 1 (hardly ever). But we want confidence that our unit test suite
         * won't fail intermittently therefore we use .toBeGreaterThanOrEqual() as a matcher.
         */
        it('should contain a duration of how long it took for an error to occur, within the error response,' +
            'sent back via a Promise.reject().', () => {

            const error = {
                config: {
                    metadata: {
                        endTime: '',
                        startTime: new Date(),
                    },
                    method: 'GET',
                }
            };

            errorInterceptor(error).catch((errorResponse )=> {
                expect(errorResponse.duration).toBeGreaterThanOrEqual(0);
            })
        })
    });
});