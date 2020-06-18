import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  availableInstances: Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.availableInstances = [
      'OCR', 'CAIXAS VAZIAS', 'ETIQUETA DO TANQUE'
    ];
  }

}
