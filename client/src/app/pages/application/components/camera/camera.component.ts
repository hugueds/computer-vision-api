import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Inference } from 'src/app/models/Inference';
import { Result } from 'src/app/models/Result';
import { quaggaConfig, cameraConstraints, MOBILE_WIDTH } from "src/environments/environment";
import Quagga from 'quagga';
declare let ml5: any;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video', { static: true }) public video: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  @Input('instanceModel') instanceModel = 'MobileNet';

  @Output('inference') inferenceEmitter = new EventEmitter<Inference>();
  @Output('barcode') barcodeEmitter = new EventEmitter<string>();
  @Output('submit') submitEmitter = new EventEmitter<any>();

  net: any;
  modelLoaded = false;
  isReading = true;
  isMobile = false;
  counter = 0;
  background = 'gray';


  ngOnInit(): void {
    if (document.documentElement.clientWidth <= MOBILE_WIDTH) {
      this.isMobile = true;
      this.resizeCameraRegion();
    }
  }

  ngAfterViewInit() {
    this.openCamera();
    this.openBarcodeScanner(); // Only IF Barcode is needed
    this.net = ml5.imageClassifier('MobileNet', () => this.modelReady());
  }

  modelReady() {
    console.log('model {model name} loaded');
    this.modelLoaded = true;
  }

  openCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: cameraConstraints }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
        this.video.nativeElement.addEventListener('loadedmetadata', () => {
          this.video.nativeElement.style.display = 'none';
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

    ctx.drawImage(this.video.nativeElement, 0, 0, canvasWidth, canvasHeight);
    if (this.counter >= 15) {
      await this.classify();
      this.counter = 0;
    }
    this.counter++;

    window.requestAnimationFrame(() => this.getFrames());
  }


  async classify() {
    const res: Array<Inference> = await this.net.classify(this.video.nativeElement);
    const inference = res[0]
    inference.label = inference.label.split(',')[0];
    this.changeBackgroundColor(inference.label);
    this.inferenceEmitter.emit(inference);
    // Rise event with the result
  }

  changeBackgroundColor(label) {
    if (label == 'OK') {
      this.background = 'lime';
    } else if (label == 'NOT_OK') {
      this.background = 'red';
    }
  }

  onCapture() {
    this.isReading = !this.isReading;
    if (this.isReading)
      window.requestAnimationFrame(() => this.getFrames());
  }

  onCancel() {
    this.resumeStream();
  }

  onSubmit() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    const videoWidth = 640;
    const videoHeight = 480;
    ctx.drawImage(this.video.nativeElement, 0, 0, videoWidth, videoHeight);
    const frame = this.canvas.nativeElement.toDataURL();
    this.submitEmitter.emit(frame);
    this.resumeStream();
  }

  ngOnDestroy() {
    this.isReading = false;
    const stream = this.video.nativeElement.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function(track) {
      track.stop();
    });

    this.video.nativeElement.srcObject = null;
    Quagga.stop();
  }


}
