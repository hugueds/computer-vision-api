import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  baseURL = 'http://10.33.22.113:5000/api'

  constructor() { }

  async sendOCR(picture) {
      try {
        const response = await axios.post(`${this.baseURL}/ocr`, { picture });
        return response;
      } catch(err) {
        console.error(err);
      }
  }


}
