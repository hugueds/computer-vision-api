import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ComputerVisionService } from '../../services/computer-vision.service';
import Quagga from 'quagga';
import { DeviceService } from 'src/app/services/device.service';
import { InstanceService } from 'src/app/services/instance.service';
import Device from 'src/app/models/Device';
import Instance from 'src/app/models/Instance';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video', { static: true }) public video: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  picture: string;
  label: string;
  response: any;
  displayPreview: boolean;
  device: Device;
  instance: Instance;


  applicationType = 2;
  readType = 0;

  barcode = {
    value: '',
    isReading: true
  };

  step = {
    number: 0,
    name: ''
  };


  constructor(private _cvService: ComputerVisionService
    , private _deviceService: DeviceService
    , private _instanceService: InstanceService
  ) { }


  ngOnInit(): void {

    this.step.number = 0;
    this.displayPreview = false;

    this._deviceService.get().then(device => {
        this.device = device;
        console.log(device)
        // this._instanceService.get(device.instance).then(inst => this.instance = inst);
      }
    );

    // Simular configuração do device / instancia

    if (this.applicationType == 2) {

      if (this.readType == 0) {
        this.step.number = 1;
        this.step.name = 'Aguardando leitura do Código de Barras';
        this.openBarcodeScanner();
      }

    }

    
    // Verificar a configuração da aplicação
    // 0 - Leitura de Barcode 
    // 1 - Leitura de OCR
    // 2 - Classificação de imagem
    // 3 - Armazenamento de imagem
    
    // Verificar tipo de validação inicial
    // 0 - Leitura de barcode
    // 1 - Leitura de OCR
    // 2 - Sem leitura
    
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


  public ngAfterViewInit() {

    const videoWidth = 0;

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
      });
    }

  }


  takePicture() {
    let context = this.canvas.nativeElement.getContext('2d');
    context.drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.picture = this.canvas.nativeElement.toDataURL();
    this.displayPreview = true;
  }

  sendPicture(picture: string = '') {
    this._cvService.sendOCR(this.picture).then(res => {
      let strings = res.result.label.split(' ');
      this.response = res;
      this.displayPreview = false;
    });
  }

  classify() {
    const model = 'emptybox'
    this._cvService.classify(this.picture, model).then(res => {
      console.log(res);
      this.response = res;
      this.displayPreview = false;
    })
  }

  downloadPicture(href: string = '') {
    const link = document.createElement('a');
    link.download = new Date().toISOString().slice(0, 19) + '_' + this.label + '.png';
    link.href = this.picture;
    link.click();
  }

  onKey(event: any) {
    this.label = (event.target.value);
  }

  cancel() {
    this.barcode.value = '';
    this.displayPreview = false;
  }

  openBarcodeScanner() {

    Quagga.init({
      frequency: 2,
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#video'),
        constraints: {
          width: 640,
          height: 480,
          facingMode: "environment",
          deviceId: "7832475934759384534"
        }
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
      this.barcode.value = data.codeResult.code;
      Quagga.stop();
      this.step.number = 2;      
      this.step.name = 'Fotografe a Peça Desejada';
      // this.takePicture();
      // let context = this.canvas.nativeElement.getContext('2d');
      // Quagga.ImageDebug.drawPath(data.box, { x: 0, y: 1 }, context, { color: "lime", lineWidth: 3 });

    })
  }


}
