import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {


  constructor(private httpClient: HttpClient) { }


  getAllSchedules() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/TeachingSchedules`);
  }


  postSchedule(schedule: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/TeachingSchedules/Add`, schedule);
  }

  deleteSchedule(scheduleId: any) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/TeachingSchedules/${scheduleId}`);
  }

  putchedule(schedule: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/TeachingSchedules/${schedule.id}`, schedule);
  }

  getScheduleMonthByClass(classId: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/TeachingSchedules/getbyclass/${classId}`, classId);
  }

  getScheduleByClass(classId: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/TeachingSchedules/getbyclass/${classId}`, null);
  }
}
