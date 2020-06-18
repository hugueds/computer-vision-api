import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import Device, { ResultDevice } from '../models/Device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseURL = environment.server;

  constructor() { }

  async get(id = ''): Promise<ResultDevice> {

    try {
      const response = await axios.get(`${this.baseURL}/device/{id}`.replace('{id}', id));
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }

  async create() { }
  async update() { }
  async delete() { }

}
