import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudyProcessService {

  constructor(private httpClient: HttpClient) { }

  getAll_studyProcess() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/StudyProcesses`);
  }

  get_studyProcess_by_classId_learnerId(classId: string, learnerId: string) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Learners/get-by-classId-learnerId?classId=${classId}&learnerId=${learnerId}`);
  }

  post_studyProcess(StudyProcess: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses`, StudyProcess);
  }


  put_studyProcess(StudyProcess: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/StudyProcesses/${StudyProcess.id}`, StudyProcess);
  }

  delete_studyProcess(StudyProcessId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/StudyProcesses/${StudyProcessId}`);
  }

  delete_studyProcess_byLearnerId(classId: string, learnerId: string) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/StudyProcesses/delete-by-classId-learnerId?classId=${classId}&learnerId=${learnerId}`);
  }

  paging_studyProcess(keyWord, status, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  search_studyProcess(LanguageClassId, LearnerId, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/get-all-with-conditions?LanguageClassId=${LanguageClassId}`, null);
  }

  getAll_byClassId(ClassId, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/get-by-classId?classId=${ClassId}&status=${status}`, null);
  }

  getLanguageClassOfLearner(learnerId) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/get-language-class-of-learner?learnerId=${learnerId}`, null);
  }

  update_Status(studyProcessId, status) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/update-status?studyProcessId=${studyProcessId}&status=${status}`, null);
  }

  getLearnerNotTution(month, year, classId) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/StudyProcesses/get-learner-not-paid-tuition?month=${month}&year=${year}&classId=${classId}`, null);
  }

}
