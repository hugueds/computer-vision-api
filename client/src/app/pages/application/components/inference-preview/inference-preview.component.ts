import { Component, OnInit, Input } from '@angular/core';
import Inference from 'src/app/models/Inference';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-inference-preview',
  templateUrl: './inference-preview.component.html',
  styleUrls: ['./inference-preview.component.css']
})
export class InferencePreviewComponent implements OnInit {

  @Input('inference') inference: Inference;
  
  constructor(private _dataService: DataService) {  }

  ngOnInit(): void {   
    
    // this._dataService.currentMessage.subscribe(m => console.log('OK ' + m ));
  }

  // onInference(inference: Inference) {

  // }

}
