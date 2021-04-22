import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalaryRollpayService {

  constructor(private httpClient: HttpClient) { }

  // Đã xét duyệt lương nhân viên
  ListDaXetDuyet(month, year) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/paied-roll-personnels?month=${month}&year=${year}`, null);
  }

  // Chưa xét duyệt lương nhân viên
  ListChuaXetDuyet(month, year) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/not-paied-roll-personnels?month=${month}&year=${year}`, null);
  }

  PostRollPay(timeSheetId: any[]) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/payroll-approval-staff`, timeSheetId);
  }

  // Chưa xét duyệt lương giáo viên
  ListChuaXetDuyetGiaoVien(month, year) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/not-paied-roll-lecturers?month=${month}&year=${year}`, null);
  }

  // Đã xét duyệt lương giáo viên
  ListDaXetDuyetGiaoVien(month, year) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/paied-roll-lecturers?month=${month}&year=${year}`, null);
  }

  // add list gáo viên
  PostRollPayLecturers(listGV: any[]) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/add-lecturer-payroll`, listGV);
  }

  TimeSheetLecturers(month, year) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/time-sheet-of-lecturer?month=${month}&year=${year}`, null);
  }

  DiemDanhHocVien(month, year, classId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Salary/attendance-of-learner?month=${month}&year=${year}&_class=${classId}`, null);
  }
}
