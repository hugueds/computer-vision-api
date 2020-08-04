import { Component, OnInit, Input } from '@angular/core';
import { Inference } from 'src/app/models/Inference';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inference-preview',
  templateUrl: './inference-preview.component.html',
  styleUrls: ['./inference-preview.component.css']
})
export class InferencePreviewComponent  {

  @Input('inference') set _inference(val: Inference) {
    if (val.confidence != 0) {
      this.inference = val;
      this.loaded = true;
    }
  }

  @Input() set modelFound(val: boolean) {
    if (val) {
      this._modelFound = val;
    }
  }

  _modelFound = false;
  loaded = false;
  inference: Inference;


  constructor() { }


}
