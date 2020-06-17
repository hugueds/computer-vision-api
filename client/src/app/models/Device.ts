import Instance from './Instance';

export default class Device {    
    id: number;
    ip: string;
    user: string;
    deviceId: string;
    instance: number;
    deviceType: DeviceType;
    createdAt: Date;
}

export enum DeviceType {
    TABLET = 0,
    MOBILE,
    PC
}