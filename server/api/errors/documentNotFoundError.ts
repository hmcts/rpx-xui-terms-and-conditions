import { ApplicationError } from './applicationError';
import { ERROR_DOCUMENT_NOT_FOUND } from './index';

export class DocumentNotFoundError extends ApplicationError {
    constructor(message: string = null, status = 404) {
        super(message || ERROR_DOCUMENT_NOT_FOUND, status);
    }
}
