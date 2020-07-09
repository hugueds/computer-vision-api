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

  async getAll(): Promise<Array<Result>> {
    try {
      const response = await axios.get(`${this.baseURL}/result`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async get(offset=0, quantity=10): Promise<Array<Result>> {
    try {
      const response = await axios.get(`${this.baseURL}/result?offset=${offset}&quantity=${quantity}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }



}
