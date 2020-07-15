import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subscription, timer, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import axios from 'axios';

interface Dictionary<T> {
  [Key: string]: T
}


@Injectable({
  providedIn: 'root'
})
export class SystemService {

  baseURL = environment.server;
  running = false;

  eventEmitter = new EventEmitter<Dictionary<any>>();

  subscription: Subscription;
  serverStatus: boolean;
  statusText: string;

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

    this.subscription = timer(0, 1000).pipe(
      switchMap(() => this.getStatus()))
      .subscribe(result => this.eventEmitter.emit(result.status));

    // this.subscription = timer(0, 10000).pipe(
    //   switchMap(() => this.myservice.checkdata())
    // ).subscribe(result => this.statustext = result);

    this.running = true;
  }


  stop() {
    this.running = false;
    this.subscription.unsubscribe();
  }

}
