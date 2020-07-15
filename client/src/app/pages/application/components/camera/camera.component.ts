import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Inference } from 'src/app/models/Inference';
import { Result } from 'src/app/models/Result';
import { quaggaConfig, cameraConstraints, MOBILE_WIDTH } from "src/environments/environment";
import Quagga from 'quagga';
import { InstanceDevice } from 'src/app/models/InstanceDevice';
import { IdentifierMode, Instance } from 'src/app/models/Instance';
declare let ml5: any;
// import * as mob from "@tensorflow-models/mobilenet"

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, OnChanges {

  @ViewChild('video', { static: true }) public video: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  @Input('instance') instance: InstanceDevice;

  @Output('inference') inferenceEmitter = new EventEmitter<Inference>();
  @Output('barcode') barcodeEmitter = new EventEmitter<string>();
  @Output('submit') submitEmitter = new EventEmitter<any>();

  net: any;
  modelLoaded = false;
  isReading = true;
  isMobile = false;
  counter = 0;
  background = 'gray';
  capturedFrame: any;
  barcodeOpened = false;

  ngOnInit(): void {
    if (document.documentElement.clientWidth <= MOBILE_WIDTH) {
      this.isMobile = true;
      this.resizeCameraRegion();
    }
  }

  ngAfterViewInit() {

    let modelName = 'MobileNet';

    this.openCamera();

    // if (this.instanceDevice.instance.identifierMode == IdentifierMode.BARCODE) {
    //   this.openBarcodeScanner();
    // }

    // if (this.instanceDevice.instance.name) {
    //   let model = this.instanceDevice.instance.name;
    //   modelName = `assets/${model}/model.json`;
    // }

    // this.net = ml5.imageClassifier(modelName, () => this.modelReady(modelName));

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(changes);

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
          this.video.nativeElement.style.display = 'none';
          this.getFrames();
          window.requestAnimationFrame(() => this.getFrames());
        });
      });
    }
  }

  resumeStream() {
    this.isReading = true;
    window.requestAnimationFrame(() => this.getFrames());
  }

  openBarcodeScanner(): void {

    this.barcodeOpened = true;

    quaggaConfig.inputStream.target = this.video.nativeElement;

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
      this.barcodeEmitter.emit(data.codeResult.code)
      Quagga.stop();
    });

  }

  resizeCameraRegion() {
    const newCanvasSize = 280;
    if (this.isMobile) {
      this.canvas.nativeElement.width = newCanvasSize;
      this.canvas.nativeElement.height = newCanvasSize;
    }
  }

  async getFrames() {

    if (!this.isReading)
      return;

    const ctx = this.canvas.nativeElement.getContext('2d');
    const canvasWidth = this.canvas.nativeElement.width;
    const canvasHeight = this.canvas.nativeElement.height;
    const frameNumber = 15;

    ctx.drawImage(this.video.nativeElement, 0, 0, canvasWidth, canvasHeight);
    if (this.counter >= frameNumber) {
      await this.classify();
      this.counter = 0;
    }
    this.counter++;
    window.requestAnimationFrame( () =>  this.getFrames());
    // setInterval(() => this.getFrames(), 100);
  }


  async classify() {

    if (!this.modelLoaded)
      return;

    const res: Array<Inference> = await this.net.classify(this.video.nativeElement);
    const inference = res[0];
    inference.label = inference.label.split(',')[0];
    this.changeBackgroundColor(inference.label);
    this.inferenceEmitter.emit(inference);
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
    const videoWidth = 640;
    const videoHeight = 480;
    this.isReading = false;
    ctx.drawImage(this.video.nativeElement, 0, 0, videoWidth, videoHeight);
    this.capturedFrame = this.canvas.nativeElement.toDataURL();
  }

  onCancel() {
    this.resumeStream();
  }

  onSubmit() {
    this.submitEmitter.emit(this.capturedFrame);
    this.resumeStream();
  }

  ngOnDestroy() {
    this.isReading = false;
    const stream = this.video.nativeElement.srcObject;

    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(function(track) {
        track.stop();
      });
    }

    this.video.nativeElement.srcObject = null;

    if (this.barcodeOpened)
      Quagga.stop();

  }


}
