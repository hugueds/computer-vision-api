import { Component, OnInit, Inject } from '@angular/core';
import { InstanceService } from 'src/app/services/instance.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  instanceId: number;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _instanceService: InstanceService) {
      this.instanceId = data.instanceId;
    }

  ngOnInit() {

  }

  uploadeFile(model, file) {
    const instanceId = this.instanceId;
    this._instanceService.uploadModel(instanceId, model, file).then(res => {

    });
  }

}
