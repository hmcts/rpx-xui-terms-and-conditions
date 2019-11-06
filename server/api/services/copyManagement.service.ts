import L from '../../common/logger';

let version = 1;
interface Copy {
    version: number;
    content: string;
    mime: string;
}

const copies: Copy[] = [
    { version: version++, content: `<h1>Version ${version - 1}</h1>`, mime: 'text/html' },
    { version: version++, content: `<h1>Version ${version - 1}</h1>`, mime: 'text/html' }
];

const apps = {
    app1: copies,
    app2: copies,
    app3: copies
}

export class CopyManagementService {
    all(app: string) {
        L.info(apps[app], `fetch all versions for ${app}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_APP_NOT_FOUND);
        return apps[app];
    }

    byVersion(app: string, version: string) {
        L.info(`fetch copy with version ${version}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        return this.all(app)[version];
    }

    create(app: string, content: string, mime: string) {
        L.info(`create copy with content ${content}`);
        const copy: Copy = {
            version: version++,
            content,
            mime,
        };
        apps[app].push(copy);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return copy;
    }
}

export default new CopyManagementService();
