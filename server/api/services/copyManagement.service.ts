import L from '../../common/logger';

let version = 1;
export interface Copy {
    version: number;
    content: string;
    mimeType: string;
}

const copies: Copy[] = [
    { version: version++, content: `<h1>Version ${version - 1}</h1>`, mimeType: 'text/html' },
    { version: version++, content: `<h1>Version ${version - 1}</h1>`, mimeType: 'text/html' },
];

const apps = {
    app1: copies,
    app2: copies,
    app3: copies,
};

export class CopyManagementService {
    all(app: string): Copy[] {
        L.info(apps[app], `fetch all versions for ${app}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_APP_NOT_FOUND);
        return apps[app];
    }

    byVersion(app: string, version: string): Copy {
        L.info(`fetch copy with version ${version}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        return apps[app].find(element => element.version.toString() === version);
    }

    latest(app: string): Copy {
        L.info(`fetch latest copy`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        const selectedApp = apps[app];
        return selectedApp[selectedApp.length - 1];
    }

    create(app: string, content: string, mimeType: string): Copy {
        L.info(`create copy with content ${content}`);
        const copy: Copy = {
            version: version++,
            content,
            mimeType,
        };
        apps[app].push(copy);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return copy;
    }
}

export default new CopyManagementService();
