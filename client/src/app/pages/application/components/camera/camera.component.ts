import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Inference } from 'src/app/models/Inference';
import { Result } from 'src/app/models/Result';
import Quagga from 'quagga';
import { InstanceDevice } from 'src/app/models/InstanceDevice';
import { IdentifierMode, Instance } from 'src/app/models/Instance';
import { quaggaConfig, cameraConstraints, MOBILE_WIDTH, environment } from "src/environments/environment";
declare let ml5: any;

const mobileCanvasSize = 300;
const videoWidth = 640;
const videoHeight = 480;
const modelPath = `${environment.server}/${environment.modelPath}`;
const frameRate = 60;
@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video', { static: true }) public video: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;
  @ViewChild('hiddenCanvas', { static: true }) public hiddenCanvas: ElementRef;
  @ViewChild('barcode', { static: true }) public barcode: ElementRef;

  @Input('instanceDevice') set _instanceDevice(val: InstanceDevice) {
    if (val) {
      this.initializeModel(val);
    }
  }

  @Input('code') set _code(val: string) {
    if (val) {
      this.code = val;
    }
  }

  @Output('cameraEvent') cameraEmitter = new EventEmitter<any>();

  instanceDevice: InstanceDevice;
  serverModel = false;
  saveLocal = false;
  modelLoaded = false;
  cameraLoaded = false;
  isReading = true;
  isMobile = false;
  barcodeOpened = false;
  counter = 0;
  backgroundColor = 'gray';
  borderColor = 'navy';
  code: string;
  capturedFrame: any;
  cameraId: any;
  net: any;

  ngOnInit(): void {
    if (document.documentElement.clientWidth <= MOBILE_WIDTH) { // User the device config instead
      this.isMobile = true;
      this.resizeCameraRegion();
    }
  }

  ngAfterViewInit() {
    this.openCamera();
    window.requestAnimationFrame(() => this.getFrames());
  }

  initializeModel(instanceDevice: InstanceDevice) {
    this.instanceDevice = instanceDevice;
    let instance = instanceDevice.instance.name;
    if (!instanceDevice.instance.clientModel)
      return;
    if (instance != 'default')
      instance = modelPath.replace('{model}', instance.toLowerCase());
    else
      instance = 'MobileNet';
    this.net = ml5.imageClassifier(instance, () => this.modelReady(instance));
    this.serverModel = instanceDevice.instance.serverModel;
  }

  modelReady(modelName) {
    console.log(`Model ${modelName} loaded`);
    this.modelLoaded = true;
    // this.startCapture();
  }

  startCapture() {
    if (this.instanceDevice.instance.identifierMode == IdentifierMode.BARCODE)
      this.openBarcodeScanner();
    else
      this.openCamera();
  }

  openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: cameraConstraints }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.addEventListener('loadedmetadata', () => {
          this.video.nativeElement.style.display = 'none';
          this.canvas.nativeElement.style.display = 'block';
          this.cameraLoaded = true;
          setTimeout(() => { this.video.nativeElement.play() }, 2000);
        });
      });
    }
  }

  closeCamera() {
    const stream = this.video.nativeElement.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    this.video.nativeElement.srcObject = null;
    this.canvas.nativeElement.style.display = 'none';
  }

  resumeStream() {
    this.isReading = true;
    window.requestAnimationFrame(() => this.getFrames());
  }

  openBarcodeScanner() {

    this.closeCamera();
    this.barcodeOpened = true;
    this.barcode.nativeElement.style.display = 'block';

    const quaggaConfig = {
      debug: false,
      frequency: 5,
      numOfWorkers: 2,
      constraints: {
        width: 640,
        height: 480,
        facingMode: "environment"
      },
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#barcode')
      },
      decoder: {
        readers: ["code_128_reader", 'ean_reader', 'ean_8_reader']
      }
    }

    Quagga.init(quaggaConfig, (err) => {
      if (err) {
        window.alert(err);
        console.log(err);
        return;
      }
      console.log("Barcode initialization finished");
      if (this.isMobile) {
        const a: Element = document.querySelector('.drawingBuffer')
        const b: Element = document.querySelector('#barcode > video')
        a.setAttribute('width', '300');
        a.setAttribute('height', '300');
        b.setAttribute('width', '300');
        b.setAttribute('height', '300');
        this.barcode.nativeElement.width = 300;
        this.barcode.nativeElement.height = 300;
      }
      Quagga.start();
    });

    Quagga.onDetected((data) => {
      this.cameraEmitter.emit({ name: 'onBarcode', params: data.codeResult.code });
      this.closeBarcodeScanner();
    });
  }

  closeBarcodeScanner() {
    this.barcodeOpened = false;
    this.barcode.nativeElement.style.display = 'none';
    Quagga.stop();
    this.openCamera();
  }

  resizeCameraRegion() {
    this.canvas.nativeElement.width = mobileCanvasSize;
    this.canvas.nativeElement.height = mobileCanvasSize;
  }

  async getFrames() {

    if (!this.isReading)
      return;

    const ctx = this.canvas.nativeElement.getContext('2d');
    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;

    ctx.drawImage(this.video.nativeElement, 0, 0, canvasWidth, canvasHeight);
    if (this.counter >= frameRate) {
      await this.classify();
      this.counter = 0;
    }
    this.counter++;
    window.requestAnimationFrame(() => this.getFrames());
    // setInterval(() => this.getFrames(), (1 / frameNumber) * frameRate );
  }

  async classify() {

    if (!this.modelLoaded)
      return;

    const res: Array<Inference> = await this.net.classify(this.video.nativeElement);
    const inference = res[0];
    inference.label = inference.label.split(',')[0];
    this.changeBackgroundColor(inference.label);
    this.cameraEmitter.emit({ name: 'onInference', params: inference });
  }

  changeBackgroundColor(label) {
    if (label == 'OK')
      this.backgroundColor = 'lime';
    else if (label == 'NOT_OK')
      this.backgroundColor = 'red';
  }

  onCapture() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const hiddenCtx = this.hiddenCanvas.nativeElement.getContext('2d');

    this.isReading = false;

    if (this.isMobile)
      ctx.drawImage(this.video.nativeElement, 0, 0, mobileCanvasSize, mobileCanvasSize);
    else
      ctx.drawImage(this.video.nativeElement, 0, 0, videoWidth, videoHeight);

    hiddenCtx.drawImage(this.video.nativeElement, 0, 0, videoWidth, videoHeight);
    this.capturedFrame = this.hiddenCanvas.nativeElement.toDataURL();
    this.cameraEmitter.emit({ name: 'onCapture', params: '' });
    // this.closeCamera();
    // this.startCapture();
  }

  onCancel() {
    this.resumeStream();
    this.cameraEmitter.emit({ name: 'onCancel', params: '' });
  }

  onSubmit() {
    if (this.saveLocal)
      this.saveImage(this.capturedFrame);

    this.cameraEmitter.emit({ name: 'onSubmit', params: this.capturedFrame });
    this.resumeStream();
  }

  saveImage(image) {
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 19).replace('T', '-').replace(/:/g, '').replace(/-/g, '');
    document.body.appendChild(link); // for Firefox
    link.setAttribute("href", image);
    link.target = '_blank';
    link.setAttribute("download", date + '.jpg');
    link.click();
  }


  ngOnDestroy() {
    this.isReading = false;
    this.closeCamera();
    if (this.barcodeOpened)
      Quagga.stop();
  }


}
