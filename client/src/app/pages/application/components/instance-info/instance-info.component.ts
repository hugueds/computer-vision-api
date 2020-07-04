import { Component, OnInit } from '@angular/core';
import Instance, {InstanceType, IdentifierType} from 'src/app/models/Instance';

@Component({
  selector: 'app-instance-info',
  templateUrl: './instance-info.component.html',
  styleUrls: ['./instance-info.component.css']
})
export class InstanceInfoComponent implements OnInit {

  instance: Instance;

  constructor() { }

  ngOnInit(): void {
    
  }

}
