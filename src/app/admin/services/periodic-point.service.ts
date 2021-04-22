import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodicPointService {

constructor(private httpClient: HttpClient) { }

getAllPeriodicPoint() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/PeriodicPoints`);
}
putPeriodicPoint(periodicPoint: any) {
  return this.httpClient
    .put(`${environment.PLCServicesDomain}/api/PeriodicPoints/${periodicPoint.id}`, periodicPoint);
}

// lấy theo điều kiện id lớp học
getPeriodicPointConditions(languageClassId) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/PeriodicPoints/get-all-with-conditions?languageClassId=${languageClassId}`, null);
}
// thêm điểm định kỳ
addPeriodicPoint(periodicPoint: any , userId) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/PeriodicPoints?userId=${userId}`, periodicPoint);
}

getByPeriodicPointId(periodicPointId) {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/PeriodicPoints/${periodicPointId}`);
}

}
