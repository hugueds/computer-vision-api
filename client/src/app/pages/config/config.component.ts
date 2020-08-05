import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from 'src/app/models/Device';
import { InstanceService } from 'src/app/services/instance.service';
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
  tabUpdate = false;

  constructor(private _instanceService: InstanceService) { }

  ngOnInit(): void {

  }

  updateTab() {
    this.tabUpdate = true;
    setTimeout(() => this.tabUpdate = false, 100);
  }



}
