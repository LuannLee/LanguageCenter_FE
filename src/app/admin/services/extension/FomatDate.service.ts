import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FomatDateService {

  constructor(private datePipe: DatePipe) { }

  transformDate(date) {
    const result = this.datePipe.transform(date, 'yyyy-MM-dd');
    return result;
  }
}
