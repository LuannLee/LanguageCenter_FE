import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/extension/notification.service';
import { SalaryRollpayService } from '../../services/salary-rollpay.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-report-attendance-sheet',
  templateUrl: './report-attendance-sheet.component.html',
  styleUrls: ['./report-attendance-sheet.component.css']
})
export class ReportAttendanceSheetComponent implements OnInit {
  public checkview = false;

  public monthSelectedId;
  public yearSelectedId;
  public classSelectedId;
  public classList;
  public class = {
    name: null,
    lecturerName: null,
  };
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public diemDanh ; // Bảng chấm công GV

  constructor(
    private notificationService: NotificationService,
    private salaryRollpayService: SalaryRollpayService,
    private languageClassesService: LanguageClassesService,
    private scheduleService: ScheduleService,
  ) { }

  ngOnInit() {
    this.yearSelectedId = 2019;
    this.monthSelectedId = 11;
    this.getAllYear();
    this.getAllClass();
  }

  public hienthi() {
    if (this.monthSelectedId != null || this.yearSelectedId != null || this.classSelectedId != null) {
      this.checkview = true;
      this.DiemDanh();
      this.TenLop(this.classSelectedId);
      this.load_LectureName(this.classSelectedId);
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn tháng, năm, lớp học');
    }
  }

  public DiemDanh() {
    this.salaryRollpayService.DiemDanhHocVien(this.monthSelectedId, this.yearSelectedId, this.classSelectedId).subscribe((result: any) => {
      this.diemDanh = result;
    }, error => {
    });
  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public TenLop(classId) {
    // tslint:disable-next-line: triple-equals
    if (this.classSelectedId != null) {
      this.languageClassesService.getById(classId).subscribe((result: any) => {
        this.class.name = result.name;
      }, error => {
      });
    }
  }

  public load_LectureName(classId) {
    this.scheduleService.getScheduleByClass(classId).subscribe((result: any) => {
      this.class.lecturerName = result.lecturerName;
    }, error => {
    });
  }

  public getAllYear() {
    for (let i = 2018; i <= 2030; i++) {
      this.years.push(i);
    }
  }

}
