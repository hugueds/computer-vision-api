import { Component, OnInit } from '@angular/core';
import { Instance, InstanceType, IdentifierMode } from 'src/app/models/Instance';
import { Device } from 'src/app/models/Device';
import { Inference } from 'src/app/models/Inference';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import { InstanceDevice } from 'src/app/models/InstanceDevice';
import { ComputerVisionService } from 'src/app/services/computer-vision.service';
import { SystemService } from 'src/app/services/system.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})

export class ApplicationComponent implements OnInit {

  instanceDevice: InstanceDevice;
  status: any;
  sub;

  defaultInstanceDevice = {
    instance: { name: 'default' }
  }

  instruction = {
    step: 0,
    name: 'DEFAULT',
    identifier: ''
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

     // Verificar tipo de validação inicial
    // 0 - Leitura de barcode
    // 1 - Leitura de OCR
    // 2 - Sem leitura

    // Verificar a configuração da aplicação
    // 0 - Leitura de Barcode
    // 1 - Leitura de OCR
    // 2 - Classificação de imagem no servidor
    // 3 - Classificação de imagem no cliente
    // 4 - Armazenamento de imagem

    // Device type for rendering

    // Intruções / Steps

    // Application Type | Read Type | St

    // 000 - Aproxime o leitor a um codigo de barras
    // 001 - Resultado: (exibir imagem com quadrado sobre a imagem scaneada) / Botao efetuar nova leitura

    // 010 - Fotografe os caracteres que deseja identificar
    // 011 - Deseja enviar imagem para o servidor?
    // 012 - Resultado: XXXX / Efetuar nova leitura

    // 020 - Realize a leitura do codigo de barras
    // 021 - Fotografe o objeto desejado para a classificação
    // 022 - Deseja enviar imagem para o servidor?
    // 023 - Imagem salva com sucesso (mostrar resultado e botão para a proxima leitura)

  ngOnInit(): void {
    this.sub = this._systemService.start().subscribe(res => this.status = res);
    this.getDevice();
  }

  getDevice() {
    this._deviceService.get_by_ip()
      .then(res => this.deviceLoaded(res))
      .catch(this.deviceNotFound)
  }

  deviceLoaded(instanceDevice: InstanceDevice) {
    const idMode = instanceDevice.instance.identifierMode;
    this.instanceDevice = instanceDevice;
    this.instruction.step = 0;
    this.instruction.identifier = '000000';
    if (idMode == IdentifierMode.BARCODE) {
      this.instruction.step = 1;
      this.instruction.name = 'Aproxime o leitor de código de barras';
    } else if (idMode == IdentifierMode.NONE) {
      this.instruction.step = 2;
      this.instruction.name = 'Fotografe a peça';
    }

  }

  deviceNotFound(err) {
    console.error(err);
    this.instanceDevice = this.defaultInstanceDevice as InstanceDevice;
  }

  onInference(inference: Inference) {
    this.inferencePreview = inference;
  }

  onBarcode(barcode) {
    this.instruction.identifier = barcode;
    this.instruction.step = 2;
    this.instruction.name = 'Fotografe a peça';
    console.log('BARCODE READ: ' + barcode);
  }

  onResult(result) {
    this.lastResult = result;
  }

  onCapture() {
    this.instruction.step = 3;
    this.instruction.name = 'Confirme a imagem';
  }

  onCancel() {
    this.instruction.step = 2;
    this.instruction.name = 'Fotografe a peça';
  }

  onCameraEvent($event) {
    const event: string = $event.name;
    this[event]($event.params);
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
    .then(result => {
      this.lastResult = result.content;
      this.deviceLoaded(this.instanceDevice);
    })
    .catch(e => console.error(e))

  }

  ngOnDestroy(): void {
    this._systemService.stop();
  }

}
