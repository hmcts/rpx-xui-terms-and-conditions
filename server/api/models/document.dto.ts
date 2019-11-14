import { Document } from '../interfaces/documents';

export class TCDocumentDTO {
    public version: number;
    public document: string;
    public mimeType: string;

    public static fromModel(model: Document): TCDocumentDTO {
        const d = new TCDocumentDTO();
        d.version = model.version;
        d.document = model.document;
        d.mimeType = model.mimeType;
        return d;
    }

    public toModel(): Document {
        return {
            version: this.version,
            document: this.document,
            mimeType: this.mimeType,
        };
    }
}
