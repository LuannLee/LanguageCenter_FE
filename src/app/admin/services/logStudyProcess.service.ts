import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogStudyProcessService {

  constructor(private httpClient: HttpClient) { }

  getLogStudyProcess( keyword, logStudyProcess: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/LogStudyProcesses/GetAllConditions?keyword=${keyword}`, logStudyProcess);
  }

}
