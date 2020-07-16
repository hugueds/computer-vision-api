import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { from, Observable, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import axios from 'axios';

const updateTime = 10000;

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  baseURL = environment.server;
  running = false;

  serverStatus: boolean;
  interval;
  sub;

  constructor() { }

  async getStatus() {
    try {
      const result = await axios.get(`${this.baseURL}/system/`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  }

  start() {

    if (this.running)
      return;

    this.running = true;

    const serverStatus = new Observable(o => {
      this.sub = interval(updateTime).subscribe(a => this.getStatus().then(b => o.next(b)))
    });
    return serverStatus;
  }


  stop() {
    this.running = false;
    this.sub.unsubscribe();
    clearInterval(this.interval);
  }

}
