import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Quagga from 'quagga';
import { quaggaConfig, cameraConstraints, MOBILE_WIDTH } from "src/environments/environment";


@Component({
  selector: 'app-barcode-test',
  templateUrl: './barcode-test.component.html',
  styleUrls: ['./barcode-test.component.css']
})
export class BarcodeTestComponent implements OnInit {

  @ViewChild('video', {static: true }) video: ElementRef;

  constructor() { }

  ngOnInit(): void {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#canvas')
      },
      decoder : {
        readers : ["code_128_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });

    Quagga.onDetected((data) => alert(data.codeResult.code))


  }

}
