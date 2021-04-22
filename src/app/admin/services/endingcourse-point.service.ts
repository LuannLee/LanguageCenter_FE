import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EndingcoursePointService {

constructor( private httpClient: HttpClient) {}
getAllEndingcoursePoint() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/EndingCoursePoints`);
}
putEndingcoursePoint(endingPoint: any) {
  return this.httpClient
    .put(`${environment.PLCServicesDomain}/api/EndingCoursePoints/${endingPoint.id}`, endingPoint);
}

// lấy theo điều kiện id lớp học
getEndingcoursePointConditions(languageClassId) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/EndingCoursePoints/get-all-with-conditions?languageClassId=${languageClassId}`, null);
}
// thêm điểm định kỳ
addEndingcoursePoint(endingPoint: any , userId) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/EndingCoursePoints?userId=${userId}`, endingPoint);
}

getByEndingcoursePointId(endingPointId) {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/EndingCoursePoints/${endingPointId}`);
}
}
