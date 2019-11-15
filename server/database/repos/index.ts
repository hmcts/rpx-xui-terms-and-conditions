import { TCDocumentRepository } from './TCDocumentRepository';
import { TCUserAgreementRepository } from './TCUserAgreementRepository';
import { TCDocumentAppRepository } from './TCDocumentAppRepository';
import { TCAppRepository } from './TCAppRepository';

// Database Interface Extensions:
interface Extensions {
    documents: TCDocumentRepository;
    apps: TCAppRepository;
    documentApps: TCDocumentAppRepository;
    userAgreements: TCUserAgreementRepository;
}

export { Extensions, TCDocumentRepository, TCAppRepository, TCDocumentAppRepository, TCUserAgreementRepository };
