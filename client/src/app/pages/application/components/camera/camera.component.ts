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

  @Output('cameraEvent') cameraEmitter = new EventEmitter<any>();

  net: any;
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

  cameraId: any;

  ngOnInit(): void {
    if (document.documentElement.clientWidth <= MOBILE_WIDTH) {
      this.isMobile = true;
      this.resizeCameraRegion();
    }
  }

  initializeModel(instance) {

    let modelName = 'MobileNet';

    if (instance.name && instance.name != 'default') {
      let model = instance.name.toLowerCase();
      modelName = `assets/models/${model}/model.json`;
    }
    this.net = ml5.imageClassifier(modelName, () => this.modelReady(modelName));
  }

  ngAfterViewInit() {
    this.openCamera();
    setTimeout(() => this.openCamera(), 3000); // only for iPad
  }

  modelReady(modelName) {
    console.log(`Model ${modelName} loaded`);
    this.modelLoaded = true;
  }

  openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: cameraConstraints }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.video.nativeElement.addEventListener('loadedmetadata', () => {
          this.cameraLoaded = true;
          this.video.nativeElement.style.display = 'none';
          // this.initBarcode();
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

    Quagga.init(quaggaConfig, (err) => {
      if (err) {
        window.alert(err);
        console.log(err);
        return;
      }
      console.log("Barcode initialization finished");
      Quagga.start();
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
    const frameNumber = 30;

    ctx.drawImage(this.video.nativeElement, 0, 0, canvasWidth, canvasHeight);
    if (this.counter >= frameNumber) {
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
    if (label == 'OK') {
      this.background = 'lime';
    } else if (label == 'NOT_OK') {
      this.background = 'red';
    }
  }

  onCapture() {

    const ctx = this.canvas.nativeElement.getContext('2d');
    const hiddenCtx = this.hiddenCanvas.nativeElement.getContext('2d');

    this.isReading = false;

    if (this.isMobile) {
      ctx.drawImage(this.video.nativeElement, 0, 0, mobileCanvasSize, mobileCanvasSize);
    } else {
      ctx.drawImage(this.video.nativeElement, 0, 0, videoWidth, videoHeight);
    }
    hiddenCtx.drawImage(this.video.nativeElement, 0, 0, videoWidth, videoHeight);
    this.capturedFrame = this.hiddenCanvas.nativeElement.toDataURL();
    this.cameraEmitter.emit({ name: 'onCapture', params: '' })
  }

  onCancel() {
    this.resumeStream();
  }

  onSubmit() {
    this.saveImage(this.capturedFrame);
    this.cameraEmitter.emit({ name: 'onSubmit', params: this.capturedFrame });
    this.resumeStream();
  }

  saveImage(image) {

    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 19).replace('T', '-').replace(/:/g,'').replace(/-/g,'');
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
