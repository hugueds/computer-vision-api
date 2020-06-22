import Instance from './Instance';

export default class Device {
    
    id: number;
    instance: number;
    ip: string;
    user: string;
    deviceId: string;
    deviceType: DeviceType;
    createdAt: Date;

    constructor({ ...params }) {
        this.id = params.id
        this.ip = params.ip
        this.user = params.user
        this.deviceId = params.deviceId
        this.instance = params.instance
        this.deviceType = params.deviceType
        this.createdAt = params.createdAt
    }

}

export class ResultDevice {
    device: Device;
    instance: Instance;
}

export enum DeviceType {
    TABLET = 0,
    MOBILE,
    PC
}