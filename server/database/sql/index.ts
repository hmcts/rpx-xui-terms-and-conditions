import { QueryFile, IQueryFileOptions } from 'pg-promise';
import * as path from 'path';

/**
 * get a QueryFile based on file path
 * @param file
 */
function sql(file: string): QueryFile {
    // generating full path;
    const fullPath: string = path.join(__dirname, file);

    const options: IQueryFileOptions = {
        minify: true,
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
}

export const documents = {
    create: sql('TCDocument/create.sql'),
    find: sql('TCDocument/find.sql'),
    findLatest: sql('TCDocument/findLatest.sql'),
    findByVersion: sql('TCDocument/findByVersion.sql'),
    add: sql('TCDocument/add.sql'),
    all: sql('TCDocument/all.sql'),
    total: sql('TCDocument/total.sql'),
};

export const apps = {
    create: sql('TCApp/create.sql'),
    find: sql('TCApp/find.sql'),
    add: sql('TCApp/add.sql'),
    all: sql('TCApp/all.sql')
};

export const documentApps = {
    create: sql('TCDocumentApp/create.sql'),
    find: sql('TCDocumentApp/find.sql'),
    add: sql('TCDocumentApp/add.sql'),
};

export const userAgreements = {
    create: sql('TCUserAgreement/create.sql'),
    find: sql('TCUserAgreement/find.sql'),
    add: sql('TCUserAgreement/add.sql'),
    addNoVersion: sql('TCUserAgreement/addNoVersion.sql'),
    getWithVersion: sql('TCUserAgreement/getWithVersion.sql'),
    getForLatestVersion: sql('TCUserAgreement/getForLatestVersion.sql'),
    getAllAcceptedWithVersion: sql('TCUserAgreement/getAllAcceptedWithVersion.sql'),
    getAllAcceptedWithoutVersion: sql('TCUserAgreement/getAllAcceptedWithoutVersion.sql')
};
