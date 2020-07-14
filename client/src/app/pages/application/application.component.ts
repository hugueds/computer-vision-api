import { Component, OnInit } from '@angular/core';
import { Instance } from 'src/app/models/Instance';
import { Device } from 'src/app/models/Device';
import { Inference } from 'src/app/models/Inference';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import { InstanceDevice } from 'src/app/models/InstanceDevice';
import { ComputerVisionService } from 'src/app/services/computer-vision.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {



  instanceDevice: InstanceDevice;

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
    , private _instanceService: InstanceService
    , private _computerVisionService: ComputerVisionService
    ) { }

  ngOnInit(): void {
    // ver o tamanho do device
    this.getDevice();
  }

  getDevice() {
    // se nao registrado, atribuir os valores de "default"
    // para a instancia e o identificador (NONE)
    // atribur o valor "MobileNet" ou "default" para o classificador

    this._deviceService.get_by_ip()
      .then(instanceDevice => this.instanceDevice = instanceDevice)
      .catch(this.deviceNotFound)
  }

  deviceNotFound(a) {
    console.log(a);

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
    this._computerVisionService.classify(
      picture
      , this.instanceDevice.instance.name || 'default'
      , this.instruction.identifier
      , this.instanceDevice.instance.save || false
      , this.instanceDevice.device.user
      , this.instanceDevice.device.name
    )
    .then(result => this.lastResult = result.content)
    .catch(e => console.error(e))


  }

}
