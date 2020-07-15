import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import { Device } from 'src/app/models/Device';
import { Instance } from 'src/app/models/Instance';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {


  deviceForm: any;
  instanceForm: any;

  devices: Array<Device>;
  instances: Array<Instance>;

  editMode = false;

  displayedColumns = ['id', 'name', 'user', 'ip', 'model', 'instanceId', 'createdAt', 'actions']
  displayedInstanceColumns = ['id', 'name', 'type', 'identifierMode', 'save', 'createdAt', 'actions']
  dummyDevices = [

  ]

  constructor(
    private _deviceService: DeviceService
    , private _instanceService: InstanceService

  ) { }

  // Load instances if instances tab
  // Load Devices if devices tab
  // On Load?

  ngOnInit(): void {
    this.clearForm();
    this.getDevices();
    this.getInstances();
  }

  onSubmit(f: NgForm) {
    console.log(f.value);

  }

  getDevices() {
    this._deviceService.getAll()
    .then(devices => {
      this.devices = devices;
    })
    .catch(e => console.error(e));
  }

  getInstances() {
    this._instanceService.getAll()
    .then(instances => {
      this.instances = instances;
    })
    .catch(e => console.error(e));
  }

  create(device) {
    this._deviceService.create(device)
    .then(res => {
      this.getDevices();
    })
    .catch(e => console.error(e))
  }

  update(device) {
    this._deviceService.update(device)
    .then(res => {
      this.getDevices();
    })
    .catch(e => console.error(e))
  }

  cancel() {
    this.editMode = false;
    this.clearForm();
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

  clearForm() {

    this.deviceForm = {
      id: 0,
      name: '',
      user: '',
      ip: '',
      model: '',
      instanceId: ''
    }

    this.instanceForm = {
      id: 0,
      name: '',
      description: '',
      type: '',
      identifierMode: '',
      save: ''
    }

  }


  updateTab() {

  }

  createInstance(instance) {
    this._instanceService.create(instance)
    .then(res => {
      this.getInstances();
    })
    .catch(e => console.error(e))
  }

  editInstance(instance) {
    this.editMode = true;
    this.instanceForm = {...instance};
  }

  updateInstance(instance) {
    this._instanceService.update(instance)
    .then(res => {
      this.getInstances();
    })
    .catch(e => console.error(e))
  }

  deleteInstance(instance) {
    const confirm = window.confirm('Deseja excluir este dispositivo?');
    if (!confirm)
      return;

    this._instanceService.delete(instance.id)
    .then(res => {
      this.getInstances();
    })
    .catch(e => console.error(e))
  }

}
