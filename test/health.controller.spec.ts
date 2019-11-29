import {
    LIVENESS_UP_AND_RUNNING,
} from '../server/api/messages';
import { HealthController } from '../server/api/controllers/health/healthController';

/**
 * Mock Express Request Object using Jest
 */
const mockRequest = () => {
  return {}
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

const mockWrapper = { connect: jest.fn() }

const mockWrapperReturnVal = Promise.resolve({done: jest.fn()})

describe('Health controller', () => {

    /**
     * Note that the Jenkins pipeline requires health liveness to available for a successful build.
     */
    it('should return a 200 for health liveness, so that the build passes through the Jenkins pipeline.', () => {

        const req = mockRequest();
        const res = mockResponse();
        const healthController = new HealthController(mockWrapper);
        healthController.liveness(req as any, res as any);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.status().send).toHaveBeenCalledWith(LIVENESS_UP_AND_RUNNING);
    })

    it('should return a 200 for health', () => {

        const req = mockRequest();
        const res = mockResponse();
        mockWrapper.connect.mockReturnValue(mockWrapperReturnVal);
        let healthController = new HealthController(mockWrapper);
        healthController.health(req as any, mockResponse as any);


        // expect(res.status().send).toHaveBeenCalledWith(LIVENESS_UP_AND_RUNNING);
        expect(mockWrapper.connect).toHaveBeenCalled();
    })
});
