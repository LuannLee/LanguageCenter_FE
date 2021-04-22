import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/extension/notification.service';
import { SalaryRollpayService } from '../../services/salary-rollpay.service';

@Component({
  selector: 'app-report-rollpay-personnel',
  templateUrl: './report-rollpay-personnel.component.html',
  styleUrls: ['./report-rollpay-personnel.component.css']
})
export class ReportRollpayPersonnelComponent implements OnInit {
  public checkview = false;

  public monthSelectedId;
  public yearSelectedId;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public public = {
    soNV: null,
    tongTien: null,
  };

  public payRoll; // Bảng lương cho NV

  constructor(
    private notificationService: NotificationService,
    private salaryRollpayService: SalaryRollpayService,
  ) { }

  ngOnInit() {
    this.yearSelectedId = 2019;
    this.monthSelectedId = 11;
    this.getAllYear();
  }

  public hienthi() {
    if (this.monthSelectedId != null || this.yearSelectedId != null) {
      this.checkview = true;
      this.getPersonnelDaXetDuyet();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn tháng, năm');
    }
  }

  public getPersonnelDaXetDuyet() {
    this.salaryRollpayService.ListDaXetDuyet(this.monthSelectedId, this.yearSelectedId).subscribe((result: any) => {
      this.payRoll = result;
      this.public.soNV = result.length;
      this.public.tongTien = 0;
      result.forEach(element => {
        this.public.tongTien += element.salary.totalRealityAmount;
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
