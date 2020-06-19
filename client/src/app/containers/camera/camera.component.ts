import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ComputerVisionService } from '../../services/computer-vision.service';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import Device from 'src/app/models/Device';
import Instance, { IdentifierType } from 'src/app/models/Instance';
import Quagga from 'quagga';


const CAMERA_MODE = {
  BARCODE: 0,
  CAMERA:  1,
  PREVIEW: 2
}

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video', { static: true }) public video: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  picture: "";
  response: any;
  displayPreview: boolean;
  device: Device;
  instance: Instance;
  cameraMode;

  CAMERA_MODE = CAMERA_MODE;

  loading = false;

  identifier = {
    value: '',
    typeString: '',
    isReading: true
  };

  step = {
    number: 0,
    name: '',
    initial: 0
  };


  constructor(private _cvService: ComputerVisionService
    , private _deviceService: DeviceService

  ) { }


  ngOnInit(): void {

    this.cameraMode = CAMERA_MODE.BARCODE;

    this.step.number = 0;
    this.displayPreview = false;
    this.loading = true;

    this._deviceService.get().then(result => {
      this.loading = false;
      this.device = result.device;
      if (result.device.instance == 0) return;
      this.instance = result.instance;
      console.log(result.device);
      console.log(result.instance);
      this.loadOperation(result.instance);
    });


    // Simular configuração do device / instancia


    // Verificar tipo de validação inicial
    // 0 - Leitura de barcode
    // 1 - Leitura de OCR
    // 2 - Sem leitura

    // Verificar a configuração da aplicação
    // 0 - Leitura de Barcode 
    // 1 - Leitura de OCR
    // 2 - Classificação de imagem
    // 3 - Armazenamento de imagem 

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

  }


  loadOperation(instance: Instance) {   
    
    
    switch (instance.identifier) {

      case IdentifierType.BARCODE:
        this.identifier.typeString = 'BARCODE';        
        this.step.initial = CAMERA_MODE.BARCODE;
        this.openBarcodeScanner();
        break;

      case IdentifierType.OCR:
        this.identifier.typeString = 'OCR';
        this.step.initial = CAMERA_MODE.CAMERA;
        this.openCamera();
        break;

      case IdentifierType.NONE:
        this.identifier.typeString = 'COMUM';
        this.step.initial = CAMERA_MODE.CAMERA;
        this.cameraMode = CAMERA_MODE.CAMERA;
        break; // SEM VALIDAÇÃO

    }


  }

  ngAfterViewInit() {
    // 
  }

  openCamera() {

    this.cameraMode = CAMERA_MODE.CAMERA;

    const constraints = {

      video: true,
      width: {
        min: 224,
        max: 640
      },
      height: {
        min: 224,
        max: 480
      },
      advanced: [{
        facingMode: "environment"
      }]
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: constraints }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }

  }


  takePicture() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.canvas.width = 640;
    context.canvas.height = 480;
    context.drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.picture = this.canvas.nativeElement.toDataURL();
    this.cameraMode = this.CAMERA_MODE.PREVIEW;
  }

  sendPicture(picture: string = '') {
    this._cvService.sendOCR(this.picture).then(res => {
      const strings = res.result.label.split(' ');
      this.response = res;
      this.displayPreview = false;
    });
  }

  classify() {
    this.loading = true;
    this._cvService.classify(
      this.picture
      , this.instance.name
      , this.identifier.value
      , this.instance.save
      , this.instance.name
      , this.device.deviceId
      , this.device.user
    ).then(res => {
      console.log(res);
      this.response = res;      
      this.loading = false;
      this.loadOperation(this.instance);
    });
  }

  downloadPicture(href: string = '') {
    const link = document.createElement('a');
    // link.download = new Date().toISOString().slice(0, 19) + '_' + this.label + '.png';
    link.href = this.picture;
    link.click();
  }





  openBarcodeScanner() {

    this.cameraMode = CAMERA_MODE.BARCODE;

    const quaggaConfig = {
      debug: false,
      frequency: 2,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: '#barcode'
        // target: this.video.nativeElement
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }

    Quagga.init(quaggaConfig, (err) => {

      if (err) {
        window.alert(err);
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      console.log(data);
      this.identifier.value = data.codeResult.code;
      Quagga.stop();
      this.openCamera();
      // VALIDAR SE VAI PARA CAMERA OU NAO
      // this.takePicture();
    });

  }

  cancel() {
    this.cameraMode = CAMERA_MODE.CAMERA;
  }

}
