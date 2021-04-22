import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {

constructor() { }
  idSource = new BehaviorSubject<any>(null);
  currentId = this.idSource.asObservable();

  changeId(message) {
    this.idSource.next(message);
  }

}
