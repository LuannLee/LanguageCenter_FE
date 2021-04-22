import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GuestTypeService {

  constructor(private httpClient: HttpClient) { }

  getAllGuestTypes() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/GuestTypes`);
  }

  postGuestType(guestType: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/GuestTypes`, guestType);
  }

  putGuestType(guestType: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/GuestTypes/${guestType.id}`, guestType);
  }

  deleteGuestType(guestTypeId) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/GuestTypes/${guestTypeId}`);
  }

  searchGuestType(keyWord, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/GuestTypes/get-all-with-conditions?keyword=${keyWord}&status=${status}`, null);
  }

}
