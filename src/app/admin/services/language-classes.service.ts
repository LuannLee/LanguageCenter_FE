import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LanguageClassesService {

  constructor(private httpClient: HttpClient) { }

  getAllLanguageClasses() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/LanguageClasses`);
  }

  postLanguageClass(course: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses`, course);
  }

  putLanguageClass(course: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/LanguageClasses/${course.id}`, course);
  }

  deleteLanguageClass(courseId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/LanguageClasses/${courseId}`);
  }

  pagingCourses(keyWord, status, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  searchLanguageClass(keyWord, courseKeyword, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses/get-all-with-conditions?keyword=${keyWord}&courseKeyword=${courseKeyword}&status=${status}`, null);
  }

  searchLanguageClass_new(keyWord, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses/get-all-with-conditions?keyword=${keyWord}&status=${status}`, null);
  }

  findByStatus(status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses/get-all-with-conditions?status=${status}`, null);
  }

  getById(id) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/LanguageClasses/${id}`);
  }

  getClassChuyenLop(classId, courseId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses/get-class-chuyen-lop?classId=${classId}&courseId=${courseId}`, null);
  }

  getClassByCourse(courseId) {  // tìm lớp theo status = 1
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses/getallbycourse/${courseId}`, null);
  }

  getLopDaHoc(learnerId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/LanguageClasses/get-class-studied-with-learnerid/${learnerId}`);
  }

  getLopHoatDong() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/LanguageClasses/get-class-action`);
  }

  getAllClassByCourse(courseId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/LanguageClasses/getall-status-bycourse/${courseId}`, null);
  }

  getAllClassOfSchedule(courseId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/LanguageClasses/get-all-class-schedule/${courseId}`);
  }

  getInfoClass(classId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/LanguageClasses/get-info-class/${classId}`);
  }


  getSameClass(classId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/LanguageClasses/get-same-class/${classId}`);
  }
}




