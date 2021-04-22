import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassSessionService {

  constructor(private httpClient: HttpClient) { }

  postClassSessions(classId, timeShiftId, days) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/ClassSessions/class-session?classId=${classId}&timeShiftId=${timeShiftId}`, days);
  }


  putClassSession(clasSession) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/ClassSessions/${clasSession.id}`, clasSession);
  }



  putList(list) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/ClassSessions/put-list`, list);
  }

}
