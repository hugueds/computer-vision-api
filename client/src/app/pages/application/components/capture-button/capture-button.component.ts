import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-capture-button',
  templateUrl: './capture-button.component.html',
  styleUrls: ['./capture-button.component.css']
})
export class CaptureButtonComponent implements OnInit {

  @Input() enabled = false;
  @Output('capture') _capture = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  capture() {
    this._capture.emit();
  }

}
