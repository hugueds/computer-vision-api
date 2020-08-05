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
  model = '';
  file: File = null;
  isUploading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DialogComponent>,
    private _instanceService: InstanceService) {
      this.instanceId = data.instanceId;
    }

  ngOnInit() {

  }

  onFileChange(file: FileList) {
    this.file = null;
    this.file = file[0];
  }

  updateModel(model) {
    this.model = model;
  }

  uploadFile() {
    const instanceId = this.instanceId;
    const model = this.model;
    const file = this.file;
    this.isUploading = true;
    // BLOQUEAR BOTAO
    this._instanceService.uploadModel(instanceId, model, file).then(res => {
      this.dialogRef.close('DONE');
      this.isUploading = false;
    });
  }

}
