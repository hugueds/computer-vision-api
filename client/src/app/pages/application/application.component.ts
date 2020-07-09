import { Component, OnInit } from '@angular/core';
import { Instance } from 'src/app/models/Instance';
import { Device } from 'src/app/models/Device';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Inference } from 'src/app/models/Inference';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  instance: Instance;
  device: Device;

  cameraMode: number;
  identifierMode: number;

  instruction = {
    step: 0,
    name: 'DEFAULT',
    identifier: '000000'
  };

  inferencePreview = {
    label: '',
    confidence: 0.0
  }

  lastResult = {
    identifier: '',
    label: '',
    confidence: 0.0,
  }

  constructor(
    private _deviceService: DeviceService
    , private _instanceService: InstanceService) { }

  ngOnInit(): void {
    // ver o tamanho do device
  }

  getDevice() {
    // se nao registrado, atribuir os valores de "default"
    // para a instancia e o identificador (NONE)
    // atribur o valor "MobileNet" ou "default" para o classificador

    this._deviceService.get()
      .then()
      .catch()
  }

  onInference(inference: Inference) {
    this.inferencePreview = inference;
  }

  onBarcode(barcode) {
    this.instruction.identifier = barcode;
    console.log('BARCODE READ: ' + barcode);
  }

  onResult(result) {
    this.lastResult = result;
  }

  onSubmit(picture: string) {


  }

}
