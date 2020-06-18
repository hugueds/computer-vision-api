import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ComputerVisionService } from '../../services/computer-vision.service';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import Device from 'src/app/models/Device';
import Instance, { IdentifierType } from 'src/app/models/Instance';
import Quagga from 'quagga';


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

  loading = false;

  identifier = {
    value: '',
    typeString: '',
    isReading: true
  };

  step = {
    number: 0,
    name: ''
  };


  constructor(private _cvService: ComputerVisionService
    , private _deviceService: DeviceService

  ) { }


  ngOnInit(): void {

    this.step.number = 0;
    this.displayPreview = false;

    this._deviceService.get().then(result => {

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

    // 100 - Fotografe os caracteres que deseja identificar
    // 101 - Deseja enviar imagem para o servidor?
    // 102 - Resultado: XXXX / Efetuar nova leitura

    // 200 - Realize a leitura do codigo de barras
    // 201 - Fotografe o objeto desejado para a classificação
    // 202 - Deseja enviar imagem para o servidor?
    // 203 - Imagem salva com sucesso (mostrar resultado e botão para a proxima leitura)



  }


  loadOperation(instance: Instance) {

    switch (instance.identifier) {

      case IdentifierType.BARCODE:
        this.identifier.typeString = 'BARCODE';
        break;

      case IdentifierType.OCR: break; // OCR
      case IdentifierType.NONE: break; // SEM VALIDAÇÃO

    }


  }




  ngAfterViewInit() {

    const constraints = {

      video: true,
      width: {
        min: 640,
        max: 640
      },
      height: {
        min: 480,
        max: 480
      },
      advanced: [{
        facingMode: "environment"
      }]
    }


    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: constraints }).then(stream => {
        this.video.nativeElement.srcObject = stream
        this.video.nativeElement.play();
        // this.openBarcodeScanner()
      });
    }

  }


  takePicture() {
    const context = this.canvas.nativeElement.getContext('2d');
    context.canvas.width = 640;
    context.canvas.height = 480;
    context.drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.picture = this.canvas.nativeElement.toDataURL();
    this.displayPreview = true;
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
      this.displayPreview = false;
      this.loading = false;
    });
  }

  downloadPicture(href: string = '') {
    const link = document.createElement('a');
    // link.download = new Date().toISOString().slice(0, 19) + '_' + this.label + '.png';
    link.href = this.picture;
    link.click();
  }



  cancel() {
    this.identifier.value = '';
    this.displayPreview = false;
  }

  openBarcodeScanner() {

    Quagga.init({
      frequency: 2,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#video')
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }, function (err) {
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
      this.step.number = 2;
      this.step.name = 'Fotografe a Peça Desejada';
      this.takePicture();
      const context = this.canvas.nativeElement.getContext('2d');
      Quagga.ImageDebug.drawPath(data.box, { x: 0, y: 1 }, context, { color: "lime", lineWidth: 3 });

    })

  }


}
