import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  baseURL = 'http://10.33.22.113:5000/api';

  constructor() { }

  async get(id = '') {

    try {
      const response = await axios.get(`${this.baseURL}/device/{id}`.replace('{id}', id));
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }

  async create(){}
  async update(){}
  async delete(){}
  
}
