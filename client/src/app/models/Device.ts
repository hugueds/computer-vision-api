import { Instance } from './Instance';

export class Device {

  id: number;
  name: string;
  ip: string;
  user: string;
  model: DeviceModel;
  instanceId: number;
  createdAt: Date;

}

export enum DeviceModel {
  TABLET = 0,
  MOBILE,
  PC
}
