import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  constructor(private httpClient: HttpClient) { }

  /* ClassRoom */
  getAllClassRoom() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Classrooms`);
  }

  postClassRoom(classRoom: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Classrooms`, classRoom);
  }

  putClassRoom(classRoom: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Classrooms/${classRoom.id}`, classRoom);
  }

  deleteClassRoom(classRoomId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Classrooms/${classRoomId}`);
  }
  searchClassRoom(keyWord, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Classrooms/paging?keyword=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  searchWithByCondition(keyword, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Classrooms/get-all-with-conditions?keyword=${keyword}&status=${status}`, null);
    }
}
