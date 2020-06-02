import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ComputerVisionService } from '../../services/computer-vision.service';
import Quagga from 'quagga';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video',  { static: true }) public video: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  picture: string;
  label: string;
  response: any;

  displayPreview: boolean;
  step: number;


  partList = [
    '2287886' // validate on Server
  ]

  constructor(private _cvService: ComputerVisionService) { }


  ngOnInit(): void {

    this.displayPreview = false;
    
    // Quagga.init({
    //   inputStream : {
    //     name : "Live",
    //     type : "LiveStream",
    //     target: document.querySelector('#barcode'),
    //     constraints: {
    //       width: 640,
    //       height: 480,
    //       facingMode: "environment",
    //       deviceId: "7832475934759384534"
    //     }
    //   },
    //   decoder : {
    //     readers : ["code_128_reader"]
    //   }
    // }, function(err) {
    //     if (err) {
    //         console.log(err);
    //         return
    //     }
    //     console.log("Initialization finished. Ready to start");
    //     Quagga.start();
    // });

    // Quagga.onDetected(function(data) {
    //   console.log(data)
    // })

  }


  public ngAfterViewInit() {

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
    // context.drawImage(this.video.nativeElement, 0, 0, 0, 0);
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
    const model = 'tanklabels'
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
    this.displayPreview = false;
  }


}
