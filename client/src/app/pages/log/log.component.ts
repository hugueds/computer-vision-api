import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ResultService } from 'src/app/services/result.service';
import { PageEvent } from '@angular/material/paginator';
import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/models/Instance';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  test = null;

  date =  new Date();
  instance: string;
  pageSize = 10; // Get the db size first
  offset = 0;
  pageEvent: PageEvent;
  length = 999;
  instances: Array<Instance>;
  results: Array<Result>;

  displayedColumns = [
    'id',
    'user',
    'device',
    'instance',
    'label',
    'confidence',
    'timestamp',
    'path',
  ]

  constructor(
    private _resultService: ResultService
    , private _instanceService: InstanceService) { }

  ngOnInit(): void {
    this.getInstances();
    this.getResults(0, this.pageSize);
  }

  getInstances() {
    this._instanceService.getAll().then(inst => this.instances = inst);
  }

  getResults(offset = 0, quantity = 10, instance='', date=new Date().toISOString().slice(0,10)) {
    this._resultService.get(offset, quantity, instance, date).then(res => {
      this.results = res;
      if (!res.length) {
        this.length = offset;
      }
      this.length = res.length;
    });
  }

  update($event) {
    const offset = $event.pageIndex * this.pageSize;
    const quantity = this.pageSize;
    this.getResults(offset, quantity, this.instance, this.date.toISOString().slice(0,10));
  }

  updateDate($event) {
    this.date = $event.target.value;
    let instance = this.instance;
    if (this.instance == 'TODAS')
      instance = '';
    this.getResults(0, 999, instance, this.date.toISOString().slice(0,10));
  }

  updateInstance($event) {
    let instance = this.instance;
    if (this.instance == 'TODAS')
      instance = '';

    this.getResults(0, 999, instance, this.date.toISOString().slice(0,10));
  }

}
