import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiptTypeService {

  constructor(private httpClient: HttpClient) { }

  /* ReceiptTypes */
  getAllReceiptType() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/ReceiptTypes`);
  }


  postReceiptType(receiptType: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/ReceiptTypes`, receiptType);
  }

  putReceiptType(receiptType: any) {
    return this.httpClient
      .put(`${environment.PLCServicesDomain}/api/ReceiptTypes/${receiptType.id}`, receiptType);
  }

  deleteReceiptType(receiptTypeId: number) {
    return this.httpClient
      .delete(`${environment.PLCServicesDomain}/api/ReceiptTypes/${receiptTypeId}`);
  }
  searchReceiptType(keyWord, pageSize, pageIndex) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/ReceiptTypes/paging?keyword=${keyWord}&pageSize=${pageSize}&pageIndex=${pageIndex}`, keyWord);
  }

  searchWithCondition(keyword, status) {
    return this.httpClient
      // tslint:disable-next-line: max-line-length
      .post(`${environment.PLCServicesDomain}/api/ReceiptTypes/get-all-with-conditions?keyword=${keyword}&status=${status}`, null);
    }


}
