import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EndingcoursePointDetailService {

constructor(private httpClient: HttpClient) { }
getAllEndingcoursePointDetail() {
  return this.httpClient
    .get(`${environment.PLCServicesDomain}/api/EndingCoursePointDetails`);
}
putEndingcoursePointDetail(endingPointDetail: any) {
  return this.httpClient
    .put(`${environment.PLCServicesDomain}/api/EndingCoursePointDetails/${endingPointDetail.id}`, endingPointDetail);
}

// lấy theo điều kiện id của điểm định kì
getEndingcoursePointDetailConditions(endingPointDetailId) {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/EndingCoursePointDetails/get-all-with-conditions?endingPointId=${endingPointDetailId}`, null);
}
// thêm những thằng học viên có trong cái lớp loằn này
addEndingcoursePointDetailCondition() {
  return this.httpClient
    // tslint:disable-next-line: max-line-length
    .post(`${environment.PLCServicesDomain}/api/EndingCoursePointDetails/post-ending-point-conditions`, null);
}
}
