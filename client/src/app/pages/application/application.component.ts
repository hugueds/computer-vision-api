import { Component, OnInit } from '@angular/core';
import { Instance, InstanceType, IdentifierMode } from 'src/app/models/Instance';
import { Device } from 'src/app/models/Device';
import { Inference } from 'src/app/models/Inference';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import { InstanceDevice } from 'src/app/models/InstanceDevice';
import { ComputerVisionService } from 'src/app/services/computer-vision.service';
import { SystemService } from 'src/app/services/system.service';
import { sequence } from './Sequence';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})

export class ApplicationComponent implements OnInit {

  instanceDevice: InstanceDevice;
  subscription: any;
  status: any;
  modelFound = false;
  last10Results = [];

  defaultInstanceDevice = {
    instance: { name: 'default' }
  }

  instruction = {
    step: 0,
    initialStep: 0,
    code: '999',
    name: 'DEFAULT',
    identifier: '',
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
    , private _systemService: SystemService
    ) { }

  ngOnInit(): void {
    this._systemService.getStatus().then(res => this.status = res);
    this.subscription = this._systemService.start().subscribe(res => this.status = res );
    this.getDevice();
  }

  getDevice() {
    this._deviceService.get_by_ip()
      .then(res => this.deviceLoaded(res))
      .catch(this.deviceNotFound)
  }

  deviceLoaded(instanceDevice: InstanceDevice) {
    if (instanceDevice.instance.clientModel || instanceDevice.instance.type != InstanceType.CLASSIFIER)
      this.modelFound = true;
    this.instanceDevice = instanceDevice;
    console.log('Device Loaded');
    this.startOperation();
  }

  startOperation() {
    this.instruction.step = 1;
    this.instruction.identifier = '000000';
    this.updateStepCode();
  }

  deviceNotFound(err) {
    console.error(err);
    this.instanceDevice = this.defaultInstanceDevice as InstanceDevice;
  }

  onInference(inference: Inference) {
    this.inferencePreview = inference;
  }

  onBarcode(barcode: string) {
    this.instruction.identifier = barcode;
    this.instruction.step = 2;

    console.log('BARCODE READ: ' + barcode);
    this.updateStepCode();
  }

  onResult(result) {
    this.lastResult = result;
  }

  onCapture() {
    this.instruction.step = 3;
    this.updateStepCode();
  }

  onCancel() {
    this.instruction.step = 2;
    this.updateStepCode();
  }

  onCameraEvent($event) {
    const event: string = $event.name;
    this[event]($event.params);
  }

  onSubmit(picture: string) {

    // this._computerVisionService.sendOCR(picture).then(r => console.log(r));

    this._computerVisionService.classify(
      picture
      , this.instanceDevice.instance.name || 'default'
      , this.instruction.identifier
      , this.instanceDevice.instance.save || false
      , this.instanceDevice.device.user
      , this.instanceDevice.device.name
    )
    .then(result => {
      if (this.last10Results.length > 10)
        this.last10Results.pop();
      this.last10Results.unshift(result);
      this.lastResult = result.content;
      this.updateStepCode();
      this.startOperation();
    })
    .catch(e => console.error(e))

  }

  updateStepCode() {
    const instanceType = this.instanceDevice.instance.type.toString();
    const identifierMode = this.instanceDevice.instance.identifierMode.toString();
    const step = this.instruction.step.toString();
    this.instruction.code = instanceType + identifierMode + step;
    this.instruction.name =  sequence[this.instruction.code];
    console.log('STEP CODE: ' + this.instruction.code);
  }

  ngOnDestroy(): void {
    this._systemService.stop();
  }

}
