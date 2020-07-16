import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  @Input('instruction') instruction: any;
  @Input('status') status: any;

  constructor() { }

  ngOnInit(): void {
  }

}
