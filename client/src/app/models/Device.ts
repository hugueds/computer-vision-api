export class Device {

  id: number;
  name: string;
  user: string;
  ip: string;
  model: DeviceModel;
  instanceId: number;
  createdAt: Date;
}

export enum DeviceModel {
  TABLET = 0,
  MOBILE,
  PC
}
