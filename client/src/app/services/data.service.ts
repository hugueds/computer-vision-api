import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Inference from '../models/Inference';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }


  updateInference(message: string) {
    this.messageSource.next(message);
  }



}
