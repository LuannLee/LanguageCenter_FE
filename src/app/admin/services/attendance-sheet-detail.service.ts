import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceSheetDetailService {

  constructor(private httpClient: HttpClient) { }

  postAttendanceDetail(attendanceDetails: any[]) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AttendanceSheetDetails/attendance-list`, attendanceDetails);
  }

  _postAttendanceDetail(attendanceDetails) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AttendanceSheetDetails`, attendanceDetails);
  }

  deleteAttendanceDetails(attendanceDetails: any[]) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AttendanceSheetDetails/delete-attendance-list`, attendanceDetails);
  }

  getAttendanceDetailsByAttendance(attendaceId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/AttendanceSheetDetails/get-details-by-date-attendance?attendanceId=${attendaceId}`);
  }
}
