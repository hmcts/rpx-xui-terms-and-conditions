import { ApplicationError } from './applicationError';
import { ERROR_NO_S2S_TOKEN } from './index';

export class InvalidS2STokenError extends ApplicationError {
    constructor(message: string = null, status = 403) {
        super(message || ERROR_NO_S2S_TOKEN, status);
    }
}
