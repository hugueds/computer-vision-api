import { Component, OnInit } from '@angular/core';
import Result from 'src/app/models/Result';
import { ResultService } from 'src/app/services/result.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {


  quantity = 50;
  offset = 10;

  results: Array<Result>;

  displayedColumns = [
    'id',
    'instance',
    'probability',
    'label',
    'user',
    'device',
    'timestamp',
    'file_path',
  ]

  constructor(private _resultService: ResultService) { }

  ngOnInit(): void {
    this.getResults();
  }

  getResults() {
    this._resultService.get().then(res => {
      this.results = res;
    });
  }

  next() {

  }

  back() {

  }

  update() {
    this.getResults();
  }

}
