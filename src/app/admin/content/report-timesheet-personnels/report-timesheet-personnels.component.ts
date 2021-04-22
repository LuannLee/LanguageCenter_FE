import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/extension/notification.service';
import { TimeSheetService } from '../../services/time-sheet.service';

@Component({
  selector: 'app-report-timesheet-personnels',
  templateUrl: './report-timesheet-personnels.component.html',
  styleUrls: ['./report-timesheet-personnels.component.css']
})
export class ReportTimesheetPersonnelsComponent implements OnInit {
  public checkview = false;

  public monthSelectedId;
  public yearSelectedId;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public timeSheet; // Bảng chấm công GV

  constructor(
    private notificationService: NotificationService,
    private timeSheetService: TimeSheetService,
  ) { }

  ngOnInit() {
    this.yearSelectedId = 2019;
    this.monthSelectedId = 11;
    this.getAllYear();
  }

  public hienthi() {
    if (this.monthSelectedId != null || this.yearSelectedId != null) {
      this.checkview = true;
      this.getTimeSheetPersonnel();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn tháng, năm');
    }
  }

  public getTimeSheetPersonnel() {
    this.timeSheetService.getTimeSheetConditions(this.monthSelectedId, this.yearSelectedId).subscribe((result: any) => {
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
