import {TCDocumentRepository} from './TCDocumentRepository';
import {TCUserAgreementRepository} from './TCUserAgreementRepository';
import {TCDocumentAppRepository} from './TCDocumentAppRepository';
import {TCAppRepository} from './TCAppRepository';

// Database Interface Extensions:
interface IExtensions {
    documents: TCDocumentRepository,
    apps: TCAppRepository,
    documentApps: TCDocumentAppRepository,
    userAgreements: TCUserAgreementRepository,
}

export {
    IExtensions,
    TCDocumentRepository,
    TCAppRepository,
    TCDocumentAppRepository,
    TCUserAgreementRepository,
};
