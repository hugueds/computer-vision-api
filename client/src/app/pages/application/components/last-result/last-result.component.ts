import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-last-result',
  templateUrl: './last-result.component.html',
  styleUrls: ['./last-result.component.css']
})
export class LastResultComponent implements OnInit {

  @Input('lastResult') lastResult;

  constructor() { }

  ngOnInit(): void {
  }

}
