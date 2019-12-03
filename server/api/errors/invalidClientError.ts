import { ApplicationError } from './applicationError';
import { ERROR_CLIENT_NOT_WHITELISTED } from './index';

export class InvalidClientError extends ApplicationError {
    constructor(message: string = null, status = 403) {
        super(message || ERROR_CLIENT_NOT_WHITELISTED, status);
    }
}
