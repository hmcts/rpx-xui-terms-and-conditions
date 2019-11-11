import {TCDocumentRepository} from './TCDocumentRepository';
import {TCUserAgreementRepository} from './TCUserAgreementRepository';

// Database Interface Extensions:
interface IExtensions {
    userAgreements: TCUserAgreementRepository,
    documents: TCDocumentRepository
}

export {
    IExtensions,
    TCUserAgreementRepository,
    TCDocumentRepository
};
