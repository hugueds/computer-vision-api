import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComputerVisionService {

  baseURL = environment.server;

  constructor() { }

  async sendOCR(picture) {

    if (!picture) {
      console.error('SendOCR::No picture was provided');
      return;
    }

    try {
      const response = await axios.post(`${this.baseURL}/ocr`, { picture });
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }

  async classify(picture, model, partId = "", save = 'True') {
    try {
      const response = await axios.post(`${this.baseURL}/classify/`, { picture, model, partId, save });
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }


}
