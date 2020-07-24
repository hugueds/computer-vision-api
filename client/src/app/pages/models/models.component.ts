import { Component, OnInit } from '@angular/core';
import { InstanceService } from 'src/app/services/instance.service';
import { Instance } from 'src/app/models/Instance';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  instances: Array<Instance>;
  instance: Instance;
  file = {
    server: null,
    client: null
  }

  constructor(private _instanceService: InstanceService) { }

  ngOnInit(): void {
    this._instanceService.getAll().then(instances => this.instances = instances);
    // listar pastas com modelos no cliente, guardar no array como true ou false
    // listar pastas com modelos no servidor, guardar no array como true ou false

  }

  handleFileInput(file, model) {
    this.file[model] = file;
  }

  uploadModel() {
    this._instanceService.uploadModel(this.instance);
  }


  deleteModel() {
    this._instanceService.deleteModel(this.instance);
  }



}
