import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/extension/notification.service';
import { PaySlipService } from '../../services/pay-slip.service';
@Component({
  selector: 'app-report-payslips',
  templateUrl: './report-payslips.component.html',
  styleUrls: ['./report-payslips.component.css']
})
export class ReportPayslipsComponent implements OnInit {

  public checkview = false;

  public monthSelectedId;
  public yearSelectedId;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public listPayslip;
  public tongtien;
  constructor(
    private notificationService: NotificationService,
    private paySlipService: PaySlipService,
  ) { }

  ngOnInit() {
    this.yearSelectedId = 2019;
    this.monthSelectedId = 11;
    this.getAllYear();
  }

  public hienthi() {
    if (this.monthSelectedId != null && this.yearSelectedId != null) {
      this.checkview = true;
      this.getAllPaySlip();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn tháng, ngày');
    }
  }

  public getAllPaySlip() {
    this.paySlipService.paySlipByreport(this.monthSelectedId, this.yearSelectedId).subscribe((result: any) => {
      this.listPayslip = result;

      this.tongtien = 0;
      result.forEach(element => {
        this.tongtien += element.total;
      });
    }, error => {
    });
  }


  public getAllYear() {
    for (let i = 2018; i <= 2030; i++) {
      this.years.push(i);
    }
  }
}
