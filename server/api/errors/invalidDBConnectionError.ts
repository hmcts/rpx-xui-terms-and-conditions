import { ApplicationError } from './applicationError';
import { ERROR_UNABLE_TO_REACH_DATABASE } from './index';

export class InvalidDBConnectionError extends ApplicationError {
    constructor(message: string = null, status = 500) {
        super(message || ERROR_UNABLE_TO_REACH_DATABASE, status);
    }
}
