import { Component, OnInit } from '@angular/core';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { CourseService } from '../../services/course.service';
import { PeriodicPointDeltailService } from '../../services/periodic-point-deltail.service';
import { PeriodicPointService } from '../../services/periodic-point.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../services/extension/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-report-periodic-point',
  templateUrl: './report-periodic-point.component.html',
  styleUrls: ['./report-periodic-point.component.css']
})
export class ReportPeriodicPointComponent implements OnInit {
  public checkview = false;

  public weekSelected;

  public periodicPointDetail = [];
  public periodicPoint;

  // select class
  public classMessageId;

  // public learnerId;
  public classList;

  // get name class and name week
  public weekName: number;
  public lecturerName;
  public lecturerId;

  public dateOnPoint;



  public class = {
    id: null,
    name: null,
    courseFee: null,
    monthlyFee: null,
    lessonFee: null,
    startDay: null,
    endDay: null,
    status: null,
    courseId: null,
    courseName: null,
    total: null,
    maxNumber: null,
    note: null,
  };
  public dataSource = new MatTableDataSource(this.periodicPointDetail);
  constructor(
    private learnerService: LearnerService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,
    private periodicPointDeltailService: PeriodicPointDeltailService,
    private periodicPointService: PeriodicPointService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    public matDialog: MatDialog,
    private loginService: LoginService,

    private exchangeDataService: ExchangeDataService,
    private router: Router,
  ) {
    this.loginService.islogged();

  }


  ngOnInit() {
    // this.getPeriodicWeek();
    this.getAllClass();
    // this.load_infor_Classes(this.classMessageId);
  }
  public getPeriodicWeek() {
    if (this.classMessageId != null) {
      this.periodicPointService.getPeriodicPointConditions(this.classMessageId).subscribe((result: any) => {
        this.periodicPoint = result;
        // tslint:disable-next-line: triple-equals
        if (this.periodicPoint.length == 0) {
          this.notificationService.showNotification(2, 'B??o c??o', 'L???p ch??a c?? ??i???m ?????nh k???');
          this.checkview = false;
        }
        console.log(this.periodicPoint);
      }, error => {
      });
    }
  }

  /// ????? l???y t??n tu???n g??n ngo??i html
  public getPeriodicId() {
    this.periodicPointService.getByPeriodicPointId(this.weekSelected).subscribe((result: any) => {
      this.weekName = result.week;
      this.lecturerName = result.lecturerName;
      this.dateOnPoint = result.dateOnPoint;
      console.log(this.weekName);
      console.log(this.lecturerName);
      console.log(this.dateOnPoint);
    }, error => {
    });
  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public loadClassList() {
    this.weekSelected = null;
    this.getPeriodicWeek();
  }

  public getPeriodicDetail() {
    this.periodicPointDeltailService.getPeriodicPointDeltailConditions(this.weekSelected).subscribe((result: any) => {
      this.periodicPointDetail = result;
      console.log(this.periodicPointDetail);
    }, error => {
    });
  }

  // change b???ng ??i???m ?????nh k??? chi ti???t
  public reloadTable() {

  }

  public ViewReport() {
    if (this.weekSelected != null && this.classMessageId != null) {
      this.checkview = true;
      this.load_infor_Classes(this.classMessageId);
      this.getPeriodicId();
      this.getPeriodicDetail();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'B??o c??o', 'H??y ch???n l???p v?? tu???n');
    }
  }

  ////////////// Infor l???p h???c c???a th???ng Ph????ng k quan t??m
  public load_infor_Classes(classMessageId) {
    // tslint:disable-next-line: triple-equals
    if (this.classMessageId != null) {
      this.languageClassesService.getById(classMessageId).subscribe((result: any) => {
        this.class.name = result.name;                                                         //   t??n kh??a h???c
        const startDate = this.datePipe.transform(result.startDay, 'dd-MM-yyyy');
        const endDate = this.datePipe.transform(result.endDay, 'dd-MM-yyyy');
        this.class.startDay = startDate;                                                      // ng??y b???t ?????u
        this.class.endDay = endDate;
        this.class.courseFee = result.courseFee;
        this.class.monthlyFee = result.monthlyFee;
        this.class.lessonFee = result.lessonFee;
        this.class.status = result.status;  // t??nh tr???ng
        this.class.courseId = result.courseId;  // m?? kh??a h???c
        this.class.note = result.note;
        this.class.maxNumber = result.maxNumber;
      }, error => {
      });
    }
  }


}
