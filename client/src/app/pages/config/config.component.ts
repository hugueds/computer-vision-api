import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import { Device } from 'src/app/models/Device';
import { Instance } from 'src/app/models/Instance';

const d = {
  createdAt: '',
  deviceId: '',
  deviceType: '',
  id: 1,
  instance: 1,
  ip: '0.0.0.0',
  user: 'TEST',
}
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {  

  
  deviceForm: any;

  devices: Array<Device>;
  instances: Array<Instance>;

  editMode = false;

  displayedColumns = ['id', 'name', 'user', 'ip', 'model', 'instanceId', 'createdAt', 'actions']

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

  create($event, device) {    
    this._deviceService.create(device)
    .then(res => {
      console.log(res);
      this.getDevices();
    })
    .catch(e => console.error(e))
    
    // Atualizar lista
  }

  update($event, device) {    
    console.log(device)
    this._deviceService.update(device)
    .then(res => {
      console.log(res);
      this.getDevices();
    })
    .catch(e => console.error(e))  
  }

  cancel() {
    this.editMode = false;
    this.clearForm();    
  }


  edit($event, device) {
    this.editMode = true;
    this.deviceForm = {...device};
  }

  delete($event, device) {    
    const confirm= window.confirm('Deseja excluir este dispositivo?');
    if (!confirm)
      return;

    this._deviceService.delete(device)
    .then(res => {
      console.log(res);
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
  }


}
