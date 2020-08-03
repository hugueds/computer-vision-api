import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/Result';
import { ResultService } from 'src/app/services/result.service';
import { PageEvent } from '@angular/material/paginator';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/models/Instance';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {


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

  getResults(offset = 0, quantity = 10) {
    this._resultService.get(offset, quantity).then(res => {
      this.results = res;
      if (!res.length) {
        this.length = offset;
      }
    });
  }

  update($event) {
    const offset = $event.pageIndex * this.pageSize;
    const quantity = this.pageSize;
    this.getResults(offset, quantity);
  }





}
