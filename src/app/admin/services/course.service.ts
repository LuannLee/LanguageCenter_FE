import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  getAllCourses() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/courses`);
  }

  postCourse(course: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Courses`, course);
  }

  putCourse(course: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Courses/${course.id}`, course);
  }

  deleteCourse(courseId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Courses/${courseId}`);
  }

  pagingCourses(keyWord, status, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Course/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  searchCourses(keyWord, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Courses/get-all-with-conditions?keyword=${keyWord}&status=${status}`, null);
  }

  findCourseId(courseId: number) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/courses/${courseId}`);
  }
}
