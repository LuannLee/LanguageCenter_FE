import { Component, OnInit } from '@angular/core';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { CourseService } from '../../services/course.service';
import { EndingcoursePointDetailService } from '../../services/endingcourse-point-detail.service';
import { EndingcoursePointService } from '../../services/endingcourse-point.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../services/extension/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-ending-point',
  templateUrl: './report-ending-point.component.html',
  styleUrls: ['./report-ending-point.component.css']
})
export class ReportEndingPointComponent implements OnInit {
  public checkview = false;


  public endingPointDetail;
  public endingPoint;

  public endingPointId;
  public classMessageId;

  // public learnerId;
  public classList;

  // get name class and name week
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
  constructor(
    private learnerService: LearnerService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,
    private endingcoursePointDetailService: EndingcoursePointDetailService,
    private endingcoursePointService: EndingcoursePointService,
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
    this.getAllClass();
  }

  public ViewReport() {
    if (this.classMessageId != null) {
      this.load_infor_Classes(this.classMessageId);
      this.getEndingPoint();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn lớp');
    }
  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public getEndingPoint() {
    if (this.classMessageId != null) {
      this.endingcoursePointService.getEndingcoursePointConditions(this.classMessageId).subscribe((result: any) => {
        if (result != null) {
          this.endingPointId = result.id;
          this.lecturerName = result.lecturerName;
          this.dateOnPoint = result.dateOnPoint;
          this.getEdingPointDetail();
          this.checkview = true;

        }
        // tslint:disable-next-line: one-line
        else {
          this.endingPointId = 0;
          this.getEdingPointDetail();
          this.checkview = false;
          this.notificationService.showNotification(2, 'Báo cáo', 'Lớp chưa có điểm cuối khóa');
        }
      }, error => {
        this.checkview = false;
        this.notificationService.showNotification(3, 'Báo cáo', 'Lỗi');
      });
    }
  }
  public getEdingPointDetail() {
    if (this.endingPointId != null) {
      this.endingcoursePointDetailService.getEndingcoursePointDetailConditions(this.endingPointId).subscribe((result: any) => {
        this.endingPointDetail = result;
        console.log(this.endingPointDetail);
      }, error => {
      });
    }
  }

  public loadClassList() {
    this.load_infor_Classes(this.classMessageId);
  }
  ////////////// Infor lớp học của thằng Phương k quan tâm
  public load_infor_Classes(classMessageId) {
    // tslint:disable-next-line: triple-equals
    if (this.classMessageId != null) {
      this.languageClassesService.getById(classMessageId).subscribe((result: any) => {
        this.class.name = result.name;                                                         //   tên khóa học
        const startDate = this.datePipe.transform(result.startDay, 'dd-MM-yyyy');
        const endDate = this.datePipe.transform(result.endDay, 'dd-MM-yyyy');
        this.class.startDay = startDate;                                                      // ngày bắt đầu
        this.class.endDay = endDate;
        this.class.courseFee = result.courseFee;
        this.class.monthlyFee = result.monthlyFee;
        this.class.lessonFee = result.lessonFee;
        this.class.status = result.status;  // tình trạng
        this.class.courseId = result.courseId;  // mã khóa học
        this.class.note = result.note;
        this.class.maxNumber = result.maxNumber;
      }, error => {
      });
    }
  }

}
