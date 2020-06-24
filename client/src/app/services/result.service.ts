import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import Result from '../models/Result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {  

  baseURL = environment.server;

  constructor() { }

  async get(): Promise<Array<Result>> {

    try {
      const response = await axios.get(`${this.baseURL}/result`);
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }
}
