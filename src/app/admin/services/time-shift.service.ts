import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimeShiftService {

  constructor(private httpClient: HttpClient) { }



  getAllTimeShift() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/TimeShifts`);
  }
}
