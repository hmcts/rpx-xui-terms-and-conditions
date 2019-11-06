import L from '../../common/logger';

let version = 1;
interface Copy {
    version: number;
    content: string;
}

const copies: Copy[] = [
    { version: version++, content: `<h1>Version ${version - 1}</h1>` },
    { version: version++, content: `<h1>Version ${version - 1}</h1>` },
];

export class CopyManagementService {
    all(): Promise<Copy[]> {
        L.info(copies, 'fetch all versions');
        return Promise.resolve(copies);
    }

    byVersion(version: number): Promise<Copy> {
        L.info(`fetch copy with version ${version}`);
        return this.all().then(result => result[version]);
    }

    create(content: string): Promise<Copy> {
        L.info(`create copy with content ${content}`);
        const copy: Copy = {
            version: version++,
            content,
        };
        copies.push(copy);
        return Promise.resolve(copy);
    }
}

export default new CopyManagementService();
