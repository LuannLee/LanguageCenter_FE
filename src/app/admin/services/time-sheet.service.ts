import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(private httpClient: HttpClient) { }

  getAllTimeSheet() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Timesheets`);
  }
  putTimeSheet(timesheet: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Timesheets/${timesheet.id}`, timesheet);
  }

  getTimeSheetConditions(month, year) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Timesheets/get-all-with-conditions?month=${month}&year=${year}`, null);
  }
  addTimeSheetCondition(month, year, userId) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Timesheets/post-timesheet-conditions?month=${month}&year=${year}&userId=${userId}`, null);
  }

  getById(id) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Timesheets/${id}`);
  }

}


