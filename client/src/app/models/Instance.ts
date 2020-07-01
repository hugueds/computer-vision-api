export default class Instance {

    id: number;
    name: string;
    save: number;
    type: InstanceType;
    identifier: IdentifierType;
    createdAt: Date;
    partList: Array<string>;
    typeString: string;    

}

export enum InstanceType {
    BARCODE,
    OCR,
    CLASSIFIER,
    CLASSIFIER_OFFLINE
}

export enum IdentifierType {
    BARCODE,
    OCR,
    NONE,
}