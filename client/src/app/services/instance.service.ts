import { Injectable } from '@angular/core';
import axios from 'axios';
import { Instance } from '../models/Instance';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  baseURL = environment.server;

  constructor() { }

  async getAll(): Promise<Array<Instance>> {
    try {
      const response = await axios.get(`${this.baseURL}/instance/`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async get(id): Promise<Instance> {
    try {
      const response = await axios.get(`${this.baseURL}/instance/{id}`.replace('{id}', id));
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async create(instance) {
    try {
      const response = await axios.post(`${this.baseURL}/instance/`, instance);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async update(instance) {
    try {
      const response = await axios.put(`${this.baseURL}/instance/`, instance);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(`${this.baseURL}/instance/{id}`.replace('{id}', id));
      return response.data;
    } catch (err) {
      console.error(err);
    }
   }



}
