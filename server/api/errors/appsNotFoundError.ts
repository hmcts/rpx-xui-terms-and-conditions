import { ApplicationError } from './applicationError';
import { ERROR_APP_NOT_FOUND } from './index';

export class AppsNotFoundError extends ApplicationError {
    constructor(message: string = null, status = 404) {
        super(message || ERROR_APP_NOT_FOUND, status);
    }
}
