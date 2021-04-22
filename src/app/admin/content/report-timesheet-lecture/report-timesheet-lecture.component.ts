import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/extension/notification.service';
import { SalaryRollpayService } from '../../services/salary-rollpay.service';

@Component({
  selector: 'app-report-timesheet-lecture',
  templateUrl: './report-timesheet-lecture.component.html',
  styleUrls: ['./report-timesheet-lecture.component.css']
})
export class ReportTimesheetLectureComponent implements OnInit {

  public checkview = false;

  public monthSelectedId;
  public yearSelectedId;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public timeSheet; // Bảng chấm công GV

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
      this.getTimeSheetLecturers();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn tháng, năm');
    }
  }

  public getTimeSheetLecturers() {
    this.salaryRollpayService.TimeSheetLecturers(this.monthSelectedId, this.yearSelectedId).subscribe((result: any) => {
      this.timeSheet = result;
    }, error => {
    });
  }

  public getAllYear() {
    for (let i = 2018; i <= 2030; i++) {
      this.years.push(i);
    }
  }

}
