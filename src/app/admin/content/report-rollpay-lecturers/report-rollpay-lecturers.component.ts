import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/extension/notification.service';
import { SalaryRollpayService } from '../../services/salary-rollpay.service';
@Component({
  selector: 'app-report-rollpay-lecturers',
  templateUrl: './report-rollpay-lecturers.component.html',
  styleUrls: ['./report-rollpay-lecturers.component.css']
})
export class ReportRollpayLecturersComponent implements OnInit {

  public checkview = false;

  public monthSelectedId;
  public yearSelectedId;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public public = {
    soGiaoVien: null,
    tongTien: null,
  };

  public payRoll; // Bảng lương cho GV

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
      this.getLectureDaXetDuyet();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn lớp');
    }
  }

  public getLectureDaXetDuyet() {
    this.salaryRollpayService.ListDaXetDuyetGiaoVien(this.monthSelectedId, this.yearSelectedId).subscribe((result: any) => {
      this.payRoll = result;
      this.public.soGiaoVien = result.length;
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
