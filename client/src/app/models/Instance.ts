export class Instance {
    id: number;
    name: string;
    save: boolean;
    type: InstanceType;
    identifierMode: IdentifierMode;
    createdAt: Date;
}

export enum InstanceType {
    BARCODE,
    OCR,
    CLASSIFIER,
    CLASSIFIER_OFFLINE
}

export enum IdentifierMode {
    BARCODE,
    OCR,
    NONE,
}
