import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class PaySlipService {

  constructor(private httpClient: HttpClient) { }

  getAllPaySlip() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/PaySlips`);
  }

  postPaySlip(PaySlip: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/PaySlips`, PaySlip);
  }

  putPaySlip(PaySlip: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/PaySlips/${PaySlip.id}`, PaySlip);
  }

  deletePaySlip(PaySlipId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/PaySlips/${PaySlipId}`);
  }

  pagingPaySlip(keyWord, status, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/PaySlips/paging?keyword=${keyWord}&status=${status}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  searchPaySlip(startDate, endDate, keyWord, phieuchi, status) {
    if (startDate && endDate) {
      return this.httpClient
        // tslint:disable-next-line: max-line-length
        .post(`${environment.PLCServicesDomain}/api/PaySlips/get-all-with-conditions?startDate=${startDate}&endDate=${endDate}&keyword=${keyWord}&phieuchi=${phieuchi}&status=${status}`, null);
    } else {
      return this.httpClient
        // tslint:disable-next-line: max-line-length
        .post(`${environment.PLCServicesDomain}/api/PaySlips/get-all-with-conditions?keyword=${keyWord}&phieuchi=${phieuchi}&status=${status}`, null);
    }
  }


  paySlipByreport(month, year) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/PaySlips/get-all-with-conditions-report?month=${month}&year=${year}`, null);
  }
}
