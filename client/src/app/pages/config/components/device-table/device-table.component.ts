import { Component, OnInit, Input } from '@angular/core';
import { Device, DeviceModel } from 'src/app/models/Device';
import { DeviceService } from 'src/app/services/device.service';
import { Instance } from 'src/app/models/Instance';
import { InstanceService } from 'src/app/services/instance.service';


@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.css']
})
export class DeviceTableComponent implements OnInit {

  @Input() instances: Array<Instance> = [];

  models = Object.keys(DeviceModel).filter(k => isNaN(Number(k)));
  devices: Array<Device>;

  deviceForm = {
    id: 0,
    name: '',
    user: '',
    ip: '',
    model: '',
    instanceId: ''
  }

  editMode = false;
  displayedColumns = ['id', 'name', 'user', 'ip', 'model', 'instanceId', 'createdAt', 'actions']

  constructor(private _deviceService: DeviceService
    ,private _instanceService: InstanceService) { }

  ngOnInit(): void {
    this.clearForm();
    this.getInstances();
    this.getDevices();
  }

  getInstanceName(instanceId) {
    if (!this.instances.length)
      return;
    const instance = this.instances.filter(i => i.id == instanceId)[0];
    return instance.name;

  }

  getInstances() {
    this._instanceService.getAll().then(r => this.instances  = r);
  }

  getDevices() {
    this._deviceService.getAll()
    .then(devices => {
      this.devices = devices;
    })
    .catch(e => console.error(e));
  }

  clearForm() {

    this.deviceForm = {
      id: 0,
      name: '',
      user: '',
      ip: '',
      model: '',
      instanceId: ''
    }

  }

  cancel() {
    this.editMode = false;
    this.clearForm();
  }

  create(device) {
    this._deviceService.create(device)
    .then(res => {
      this.editMode = false;
      this.clearForm();
      this.getDevices();
    })
    .catch(e => console.error(e))
  }

  update(device) {
    this._deviceService.update(device)
    .then(res => {
      this.editMode = false;
      this.clearForm();
      this.getDevices();
    })
    .catch(e => console.error(e))
  }

  edit(device) {
    this.editMode = true;
    this.deviceForm = {...device};
  }



  delete(device) {
    const confirm = window.confirm('Deseja excluir este dispositivo?');
    if (!confirm)
      return;

    this._deviceService.delete(device)
    .then(res => {
      this.getDevices();
    })
    .catch(e => console.error(e))
  }



}
