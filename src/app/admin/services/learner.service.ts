import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {

  constructor(private httpClient: HttpClient) { }

  getAllLearners() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners`);
  }

  getById(id) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/${id}`);
  }

  getOutClass(id) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/get-out-class/${id}`);
  }

  getInClass(id) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/get-in-class/${id}`);
  }

  postLearner(learner: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Learners`, learner);
  }
  getOutClassWithCondition(classId, keyword) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/get-out-class-with-condition/${classId}/${keyword}`);
  }

  getByCarrdId(cardId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/get-by-cardid/${cardId}`);
  }

  putLearner(learner: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Learners/${learner.id}`, learner);
  }

  deleteLearner(learnerId) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/Learners/${learnerId}`);
  }

  getLearnerWithCondition(keyword, status) {    // tìm kiếm theo keyword + status
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Learners/get-all-with-conditions?keyword=${keyword}&status=${status}`, null);
  }

  getByStatus(status) {    // tìm kiếm theo status
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/Learners/get-all-with-conditions?status=${status}`, null);
  }

  getDaCoLop() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/get-da-co-lop`);
  }
  getChuaCoLop() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/get-chua-co-lop`);
  }

  getLearnerCardIdReceipt(cardId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Learners/get-learner-cardId?cardId=${cardId}`, null);
  }
  getFullLearningByClass(classId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/getlearninginclass/${classId}`);
  }
  getDiem(id) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Learners/get-score-by-learner?id=${id}`, null);
  }
}


