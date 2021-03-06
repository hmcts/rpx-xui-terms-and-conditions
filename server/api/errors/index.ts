export const ERROR_UNABLE_TO_REACH_DATABASE = 'Error unable to reach database.';
export const ERROR_DOCUMENT_NOT_FOUND = 'Error Terms and Conditions document not found.';
export const ERROR_APP_NOT_FOUND = 'Error No Terms and Conditions for app found.';
export const ERROR_NO_S2S_TOKEN = 'Error No S2S token found';
export const ERROR_CLIENT_NOT_WHITELISTED = 'Error Not whitelisted';
export const ERROR_NO_BEARER_TOKEN = 'Error No Bearer token found';
export const ERROR_INVALID_USER = 'Error invalid user';

export { ApplicationError } from './applicationError';
export { InvalidUserError } from './invalidUserError';
export { InvalidBearerTokenError } from './invalidBearerTokenError';
export { InvalidS2STokenError } from './invalidS2STokenError';
export { InvalidClientError } from './invalidClientError';
export { DocumentNotFoundError } from './documentNotFoundError';
export { AppsNotFoundError } from './appsNotFoundError';
export { InvalidDBConnectionError } from './invalidDBConnectionError';
