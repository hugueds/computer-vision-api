export interface Instance {
    id: number;
    name: string;
    description: string;
    type: InstanceType;
    identifierMode: IdentifierMode;
    save: boolean;
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
