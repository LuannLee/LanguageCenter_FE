import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  constructor(private httpClient: HttpClient) { }

  getPermissionForUser(userId) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/Permissions/get-permission-by-user?Id=${userId}`, userId);
  }

  putPermission(permission: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/Permissions/${permission.id}`, permission);
  }

  getPermissionByBoForUser(userId) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Permissions/get-permission-by-bo-user?userId=${userId}`, null);
  }

  createFunctionInPermission() {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/Permissions/add-all-function-permission`, null);
  }
}
