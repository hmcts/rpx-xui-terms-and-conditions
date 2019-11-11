import { Copy } from '../services/copyManagement.service';

export class TCDocumentDTO {
    public version: number;
    public content: string;
    public mimeType: string;

    public static fromModel(model: Copy): TCDocumentDTO {
        const d = new TCDocumentDTO();
        d.version = model.version;
        d.content = model.content;
        d.mimeType = model.mimeType;
        return d;
    }

    public toModel(): Copy {
        return {
            version: this.version,
            content: this.content,
            mimeType: this.mimeType,
        };
    }
}
