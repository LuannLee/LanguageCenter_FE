import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PaySlipTypeService {

  constructor(private httpClient: HttpClient) { }

  /* PaySlipType */
  getAllPaySlipTypes() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/PaySlipTypes`);
  }

  postPaySlipType(PaySlipType: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/PaySlipTypes`, PaySlipType);
  }

  putPaySlipType(PaySlipType: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/PaySlipTypes/${PaySlipType.id}`, PaySlipType);
  }

  deletePaySlipType(PaySlipTypeId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/PaySlipTypes/${PaySlipTypeId}`);
  }

  pagingPaySlipType(keyWord, status, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/PaySlipType/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  searchPaySlipType(keyWord, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/PaySlipTypes/get-all-with-conditions?keyword=${keyWord}&status=${status}`, null);
  }

  getById(id) {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/PaySlipTypes/${id}`);
  }
}
