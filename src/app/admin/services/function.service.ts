import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private httpClient: HttpClient) { }

  getAllFunctionsByGroup() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Functions/get-functions-group`);
  }
}
