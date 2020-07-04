import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from '../../environments/environment';
import Instance from '../models/Instance';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {

  baseURL = environment.server;

  constructor() { }

  async get(id): Promise<Instance> {

    try {
      const response = await axios.get(`${this.baseURL}/instance/{id}`.replace('{id}', id));
      return response.data;
    } catch (err) {
      console.error(err);
    }

  }

  async create(){}
  async update(){}
  async delete(){}



}
