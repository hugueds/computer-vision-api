export default class Instance {
    id: number;
    name: string;
    save: boolean;
    instanceType: InstanceType;
    identifierType: IdentifierType;
    createdAt: Date;
    partList: Array<string>;
}

export enum InstanceType {
    BARCODE,
    OCR,
    CLASSIFIER
}

export enum IdentifierType {
    BARCODE,
    OCR,
    NONE,
}