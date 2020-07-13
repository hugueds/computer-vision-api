import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Device } from '../models/Device';
import { InstanceDevice } from "../models/InstanceDevice";
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseURL = environment.server;

  constructor() { }

  async get(id): Promise<InstanceDevice> {
    try {
      const response = await axios.get(`${this.baseURL}/device/{id}`.replace('{id}', id));
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async get_by_ip(): Promise<InstanceDevice> {
    try {
      const response = await axios.get(`${this.baseURL}/device/ip`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async getAll(): Promise<Array<Device>> {
    try {
      const response = await axios.get(`${this.baseURL}/device/`);
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }

  async create() { }
  async update() { }
  async delete() { }

}
