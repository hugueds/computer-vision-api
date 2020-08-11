import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  baseURL = `${environment.server}/api`;

  constructor() { }

  async sendOCR(picture) {
    try {
      const response = await axios.post(`${this.baseURL}/ocr`, { picture });
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }

  async classify(picture, model='default', partId = "", save=false,  user="", device="") {
    try {
      const response = await axios.post(`${this.baseURL}/classify/`, { picture, model, partId, save, user, device });
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }


}
