import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ComputerVisionService } from '../../services/computer-vision.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

  @ViewChild('video', { static: true }) public video: ElementRef;
  @ViewChild('canvas', { static: true }) public canvas: ElementRef;

  picture: String;
  response: String;

  constructor(private _cvService: ComputerVisionService) {
    
  }

  ngOnInit(): void {

  }

  public ngAfterViewInit() {

    const constraints = {
      video: true,
      width: {
        min: 480,
        max: 480
      },
      height: {
        min: 360,
        max: 360
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
    context.drawImage(this.video.nativeElement, 0, 0, 480, 360);
    this.picture = this.canvas.nativeElement.toDataURL();
    console.log(this.picture);
  }

  sendPicture(picture: String) {
    this._cvService.sendOCR(picture).then(res => {
      console.log(res);
    });
    return '';
  }

  downloadPicture(href) {
    const link = document.createElement('a');
    
    link.download = 'filename.png';
    link.href = href;
    link.click();
  }


}
