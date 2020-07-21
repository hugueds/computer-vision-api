import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Inference } from 'src/app/models/Inference';
import { Result } from 'src/app/models/Result';
import Quagga from 'quagga';
import { InstanceDevice } from 'src/app/models/InstanceDevice';
import { IdentifierMode, Instance } from 'src/app/models/Instance';
import { quaggaConfig, cameraConstraints, MOBILE_WIDTH } from "src/environments/environment";
declare let ml5: any;

const mobileCanvasSize = 280;
const videoWidth = 640;
const videoHeight = 480;
const modelPath = `assets/models/{model}/model.json`;
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

  @Input('instance') set instance(val: any) {
    if (val) {
      this.initializeModel(val.instance);
      this._instance = val;
    }
  }

  @Input('step') set step(val: number) {
    if (val) {
      this._step = val;
      // 1 -> abrir barcode e fechar camera
      // 2 -> abrir camera e fechar barcode
    }
  }

  @Output('cameraEvent') cameraEmitter = new EventEmitter<any>();

  saveLocal = false;
  modelLoaded = false;
  cameraLoaded = false;
  isReading = true;
  isMobile = false;
  counter = 0;
  background = 'gray';
  capturedFrame: any;
  barcodeOpened = false;
  borderColor = 'navy';
  _instance: InstanceDevice;
  _step: number;

  cameraId: any;
  net: any;

  ngOnInit(): void {
    if (document.documentElement.clientWidth <= MOBILE_WIDTH) {
      this.isMobile = true;
      this.resizeCameraRegion();
    }
  }

  ngAfterViewInit() {
    this.openCamera();
    setTimeout(() => {
      this.video.nativeElement.play();
      // this.initBarcode();
    }, 2000);
  }

  initializeModel(instance) {

    let modelName = 'MobileNet';

    if (instance.name && instance.name != 'default') {
      let model = instance.name.toLowerCase();
      modelName = modelPath.replace('{model}', model);
    }
    this.net = ml5.imageClassifier(modelName, () => this.modelReady(modelName));
  }

  modelReady(modelName) {
    console.log(`Model ${modelName} loaded`);
    this.modelLoaded = true;
  }

  openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: cameraConstraints }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.addEventListener('loadedmetadata', () => {
          this.video.nativeElement.style.display = 'none';
          this.cameraLoaded = true;
          window.requestAnimationFrame(() => this.getFrames());
        });
      });
    }
  }

  resumeStream() {
    this.isReading = true;
    window.requestAnimationFrame(() => this.getFrames());
  }

  initBarcode() {

    quaggaConfig.inputStream['target'] = '#barcode';
    Quagga.init(quaggaConfig, (err) => {
      if (err) {
        window.alert(err);
        console.log(err);
        return;
      }
      console.log("Barcode initialization finished");
      Quagga.start()
    });

    Quagga.onDetected((data) => {
      this.cameraEmitter.emit({ name: 'onBarcode', params: data.codeResult.code });
      // Quagga.stop();
    });
  }

  openBarcodeScanner(): void {
    this.barcodeOpened = true;
    Quagga.start();
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
    // setInterval(() => this.getFrames(), (1 / frameNumber) * 60 );
  }

  async classify() {

    if (!this.modelLoaded)
      return;

    const res: Array<Inference> = await this.net.classify(this.video.nativeElement);
    const inference = res[0];
    inference.label = inference.label.split(',')[0];
    this.changeBackgroundColor(inference.label);
    this.cameraEmitter.emit({ name: 'onInference', params: inference })
  }

  changeBackgroundColor(label) {
    if (label == 'OK')
      this.background = 'lime';
    else if (label == 'NOT_OK')
      this.background = 'red';
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
  }

  onCancel() {
    this.resumeStream();
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


  stopCamera() {

    const stream = this.video.nativeElement.srcObject;

    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(function (track) {
        track.stop();
      });
    }

    this.video.nativeElement.srcObject = null;

  }

  ngOnDestroy() {

    this.isReading = false;
    this.stopCamera();

    if (this.barcodeOpened)
      Quagga.stop();

  }


}
