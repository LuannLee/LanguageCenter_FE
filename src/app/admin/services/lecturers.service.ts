import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LecturersService {

  constructor(private httpClient: HttpClient) { }
  getAllLecturers() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Lecturers`);
  }

  getLectureId(id) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Lecturers/${id}`);
  }

  postLecturers(lecture: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Lecturers`, lecture);
  }

  putLecture(lecture: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Lecturers/${lecture.id}`, lecture);
  }

  deleteLectureId(id) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Lecturers/${id}`);
  }

  SearchLecturers(keyword, position, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Lecturers/get-all-with-conditions?keyword=${keyword}&position=${position}&status=${status}`, null);
  }
  getLectureByCardId(cardId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Lecturers/get-by-cardid/${cardId}`);
  }

  getAllTutors() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Lecturers/getalltutor`);
  }
}
