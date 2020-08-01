import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Instance, InstanceType, IdentifierMode } from 'src/app/models/Instance';
import { InstanceDevice } from 'src/app/models/InstanceDevice';

@Component({
  selector: 'app-instance-info',
  templateUrl: './instance-info.component.html',
  styleUrls: ['./instance-info.component.css']
})
export class InstanceInfoComponent implements OnInit {

  @Input('instanceDevice') set _instanceDevice(val: InstanceDevice) {
    if (val) {
      this.instanceDevice = val;
      const mode = this.instanceDevice.instance.identifierMode
      this.readMode = IdentifierMode[mode];
    }
  }

  @Input('status') set status(val: any) {
    this.background = 'red';
    if (val && val.status) {
      this.background = 'lime';
    }
  };

  background = 'red';
  instanceDevice: InstanceDevice;
  readMode :string;

  constructor() { }



  ngOnInit(): void {
  }

}
