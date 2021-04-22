import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodicPointDeltailService {

  constructor(private httpClient: HttpClient) { }

  getAllPeriodicPointDeltail() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/PeriodicPointDetails`);
  }
  putPeriodicPointDeltail(periodicPointDeltail: any, classId) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/PeriodicPointDetails/${periodicPointDeltail.id}?classId=${classId}`, periodicPointDeltail);
  }

  // lấy theo điều kiện id của điểm định kì
  getPeriodicPointDeltailConditions(periodicPointId) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/PeriodicPointDetails/get-all-with-conditions?periodicPointId=${periodicPointId}`, null);
  }
  // thêm những thằng học viên có trong cái lớp loằn này
  addPeriodicPointDeltailCondition() {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/PeriodicPointDetails/post-periodic-point-conditions`, null);
  }
}
