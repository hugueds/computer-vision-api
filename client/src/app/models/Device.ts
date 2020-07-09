import { Instance } from './Instance';

export class Device {

  id: number;
  name: string;
  ip: string;
  user: string;
  instanceId: number;
  deviceType: DeviceType;
  createdAt: Date;

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
