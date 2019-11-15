import { TCApp } from './tcApp.model';

export interface TCDocument {
    id: number;
    document: string;
    mimeType: string;
    creationDate: string;
    version: number;
    apps: TCApp[];
}
