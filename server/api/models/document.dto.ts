import { Document } from '../interfaces/documents';

export class TCDocumentDTO {
    public version: number;
    public content: string;
    public mimeType: string;

    public static fromModel(model: Document): TCDocumentDTO {
        const d = new TCDocumentDTO();
        d.version = model.version;
        d.content = model.document;
        d.mimeType = model.mimeType;
        return d;
    }

    public toModel(): Document {
        return {
            version: this.version,
            document: this.content,
            mimeType: this.mimeType,
        };
    }
}
