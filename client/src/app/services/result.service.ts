import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from '../models/Result';
import axios from 'axios';

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
