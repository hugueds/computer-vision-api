import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/models/Instance';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  instances: Array<Instance>;
  instance: Instance;
  model = {
    name: '',
    file: null
  };

  file = null;

  constructor(
    private _instanceService: InstanceService
    , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getInstances();
    // listar pastas com modelos no cliente, guardar no array como true ou false
    // listar pastas com modelos no servidor, guardar no array como true ou false
    // this.mockPost();
  }

  getInstances() {
    this._instanceService.getAll().then(instances => this.instances = instances);

  }

  mockPost() {
    this._instanceService.uploadModel(43, 'server', this.file).then(r => this.getInstances());
  }

  updateFileChange(file) {
    this.file = file;
  }

  handleFileInput(file, model) {
    this.model.file = file;
    this.model.name = model;
  }

  uploadModel(instance) {

  }


  deleteModel() {
    this._instanceService.deleteModel(this.instance);
  }

  openDialog(instanceId) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { instanceId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getInstances();
    });
  }

}

