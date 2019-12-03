import { ApplicationError } from './applicationError';
import { ERROR_INVALID_USER } from './index';

export class InvalidUserError extends ApplicationError {
    constructor(message: string = null, status = 403) {
        super(message || ERROR_INVALID_USER, status);
    }
}
