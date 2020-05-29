import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  baseURL = 'http://localhost:5000/api';

  constructor() { }

  async sendOCR(picture = '') {
      try {
        console.log(picture)
        const response = await axios.post(`${this.baseURL}/ocr`, { picture });
        return response.data;
      } catch(err) {
        console.error(err);
      }
  }


}
