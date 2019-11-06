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

export class CopyManagementService {
    all() {
        L.info(copies, 'fetch all versions');
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return copies;
    }

    byVersion(version: number) {
        L.info(`fetch copy with version ${version}`);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        // throw Error(ERROR_COPY_NOT_FOUND);
        return this.all()[version];
    }

    create(content: string, mime: string) {
        L.info(`create copy with content ${content}`);
        const copy: Copy = {
            version: version++,
            content,
            mime,
        };
        copies.push(copy);
        // throw Error(ERROR_UNABLE_TO_REACH_DATABASE);
        return copy;
    }
}

export default new CopyManagementService();
