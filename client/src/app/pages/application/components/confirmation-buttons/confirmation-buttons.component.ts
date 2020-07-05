import { EventEmitter, Component, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-confirmation-buttons',
  templateUrl: './confirmation-buttons.component.html',
  styleUrls: ['./confirmation-buttons.component.css']
})
export class ConfirmationButtonsComponent implements OnInit {

  @Output('submit') submitEmitter = new EventEmitter();
  @Output('cancel') cancelEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.submitEmitter.emit();
  }

  cancel() {
    this.cancelEmitter.emit();
  }

}
