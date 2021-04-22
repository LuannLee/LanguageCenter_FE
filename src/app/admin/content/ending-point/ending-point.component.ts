import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { LoginService } from '../../services/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { CourseService } from '../../services/course.service';
import { DatePipe } from '@angular/common';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { CreatEndingPointComponent } from './creat-ending-point/creat-ending-point.component';
import { EndingcoursePointDetailService } from '../../services/endingcourse-point-detail.service';
import { EndingcoursePointService } from '../../services/endingcourse-point.service';
import { ConstService } from '../../services/extension/Const.service';
@Component({
  selector: 'app-ending-point',
  templateUrl: './ending-point.component.html',
  styleUrls: ['./ending-point.component.css']
})
export class EndingPointComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public screenHeight: any;
  public screenWidth: any;

  public length = 100;
  public pageSize = 20;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public isOpenDialog = false;


  public periodicPointDetail = [];
  public periodicPoint;

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

  // tslint:disable-next-line: max-line-length
  public displayedColumns: string[] = ['index', 'learnerCardId', 'learnerName', 'learnerSex', 'learnerBriday',
    'listeningPoint', 'sayingPoint', 'readingPoint', 'writingPoint', 'totalPoint', 'averagePoint', 'sortOrder', 'note'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource([]);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);

    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
  }

  ngOnInit() {
    this.exchangeDataService.idSource.subscribe(message => {
      this.classMessageId = message;
    });

    this.getAllClass();
    this.load_infor_Classes(this.classMessageId);
    // this.getEdingPointDetail();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////


  public getEndingPoint() {
    if (this.classMessageId != null) {
      this.endingcoursePointService.getEndingcoursePointConditions(this.classMessageId).subscribe((result: any) => {
        if (result != null) {
          this.endingPointId = result.id;
          this.lecturerName = result.lecturerName;
          this.dateOnPoint = result.dateOnPoint;
          console.log(result);
          this.getEdingPointDetail();

        }
        // tslint:disable-next-line: one-line
        else {
          this.endingPointId = 0;
          this.getEdingPointDetail();
          this.endingPointId = null;
          this.lecturerName = null;
          this.dateOnPoint = null;
          this.notificationService.showNotification(2, 'Điểm', 'Lớp học chưa có bảng điểm cuối khóa!');


        }
      }, error => {
      });
    }
  }
  public getEdingPointDetail() {
    if (this.endingPointId != null) {
      this.endingcoursePointDetailService.getEndingcoursePointDetailConditions(this.endingPointId).subscribe((result: any) => {
        this.loadTables(result);
        this.endingPointDetail = result;
        console.log(this.endingPointDetail);

      }, error => {
      });
    }

  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public loadClassList() {
    this.load_infor_Classes(this.classMessageId);
    this.getEndingPoint();
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
        this.load_total(classMessageId);
        this.load_CourseName(result.courseId);
      }, error => {
      });
    }
  }



  public CreatEndingPoint() {
    if (!this.isOpenDialog) {
      if (this.classMessageId == null) {
        this.notificationService.showNotification(3, 'Điểm', 'Lỗi, Hãy chọn lớp học!');
      }
      // tslint:disable-next-line: one-line
      else {
        this.isOpenDialog = true;
        const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
        this.matDialog.open(CreatEndingPointComponent, {
          width: `${widthMachine}px`,
          data: {
            classId: this.classMessageId
          },
          disableClose: false
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.endingcoursePointDetailService.addEndingcoursePointDetailCondition().subscribe(done => {
            }, error => {
            });
            this.getEndingPoint();
          }
        });
      }
    }
  }


  public load_total(classId) {
    // tslint:disable-next-line: triple-equals
    this.studyProcessService.search_studyProcess(classId, '', 1).subscribe((result: any) => {
      this.class.total = result.length;
    }, error => {
    });
  }

  public load_CourseName(courseId: number) {
    // tslint:disable-next-line: triple-equals
    this.courseService.findCourseId(courseId).subscribe((result: any) => {
      this.class.courseName = result.name;
    }, error => {
    });
  }

  // hàm ném dữ liệu
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // chỉ nhập số
  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  public updatePeriodicPoint(endingPointDetail) {
    this.endingcoursePointDetailService.putEndingcoursePointDetail(endingPointDetail).subscribe(result => {
      this.getEndingPoint();
    }, error => {
    });
  }


  public openPermissionOfFuncition() {

    if (ConstService.user.userName === 'admin') {
      this.permissionOfFunction.canCreate = true;
      this.permissionOfFunction.canDelete = true;
      this.permissionOfFunction.canRead = true;
      this.permissionOfFunction.canUpdate = true;

      return;
    }
    const temp = ConstService.permissions.filter(y => y.functionName === 'Quản lý điểm cuối khóa')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;


  }
}
