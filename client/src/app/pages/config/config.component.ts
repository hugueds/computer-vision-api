import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Device } from 'src/app/models/Device';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  deviceForm: any;
  instanceForm: any;
  devices: Array<Device>;  

  constructor() { }  

  ngOnInit(): void {
    
  }

  updateTab() {

  }



}
