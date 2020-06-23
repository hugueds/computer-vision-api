import { Component, OnInit } from '@angular/core';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import Device from 'src/app/models/Device';
import Instance from 'src/app/models/Instance';

const d =  { 
  createdAt : '',
  deviceId : '',
  deviceType : '',
  id : 1,
  instance : 1,
  ip : '0.0.0.0',
  user : 'TEST',
}
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  
  devices: Array<Device>;
  instances: Array<Instance>;

  displayedColumns = ['id', 'deviceId',  'user', 'ip', 'instance',  'createdAt', 'actions']

  dummyDevices = [
    new Device(d),
    new Device(d),
    new Device(d),
    new Device(d),
    new Device(d),
  ]

  constructor(
    private _deviceService: DeviceService
    , private _instanceService: InstanceService
    
    ) { }

  // Load instances if instances tab
  // Load Devices if devices tab
  // On Load?

  ngOnInit(): void {     
    
    this._deviceService.getAll().then(devices => {
      this.devices = devices;
    });

  }

  getDevices() {

  }

  create() {
    // Atualizar lista
  }


  update() {

    // Atualizar lista
    // isUpdate? 

  }

  delete(device) {

    console.log(device);

    // Atualizar lista
    
  }


}
