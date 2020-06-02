import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-camera',
  templateUrl: './video-camera.component.html',
  styleUrls: ['./video-camera.component.css']
})
export class VideoCameraComponent implements OnInit {

  @ViewChild('video', { static: true }) public video: ElementRef;

  constructor() { }

  ngOnInit(): void {

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

}
