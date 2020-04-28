import { ApplicationError } from './applicationError';
import { ERROR_NO_BEARER_TOKEN } from './index';

export class InvalidBearerTokenError extends ApplicationError {
    constructor(message: string = null, status = 403) {
        super(message || ERROR_NO_BEARER_TOKEN, status);
    }
}
