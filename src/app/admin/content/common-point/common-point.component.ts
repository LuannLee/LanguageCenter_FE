import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { LoginService } from '../../services/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { CourseService } from '../../services/course.service';
import { DatePipe } from '@angular/common';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { DetailStudyprocessComponent } from '../study-process/dialog/detail-studyprocess/detail-studyprocess.component';
import { EditStudyprocessComponent } from '../study-process/dialog/edit-studyprocess/edit-studyprocess.component';
import { ChangeClassComponent } from '../study-process/dialog/change-class/change-class.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, max } from 'rxjs/operators';
import { PeriodicPointDeltailService } from '../../services/periodic-point-deltail.service';
import { PeriodicPointService } from '../../services/periodic-point.service';
import { ToastrService } from 'ngx-toastr';
import { CreatPointComponent } from './dialog/creat-point/creat-point.component';
import { ConstService } from '../../services/extension/Const.service';

@Component({
  selector: 'app-common-point',
  templateUrl: './common-point.component.html',
  styleUrls: ['./common-point.component.css']
})
export class CommonPointComponent implements OnInit {


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
  public pageSizeOptions = [5, 10, 15, 20, 30, 50];

  public isOpenDialog = false;

  // ????? th???c hi???n v???i tu???n
  public weekSelected;
  public maxWeek;
  /////////////////
  public periodicPointDetail = [];
  public periodicPoint;


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

  // tslint:disable-next-line: max-line-length
  public displayedColumns: string[] = ['index', 'learnerCardId', 'learnerName', 'learnerSex', 'learnerBriday', 'point', 'averagePoint', 'sortedByPoint', 'sortedByAveragePoint', 'note'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.periodicPointDetail);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
    this.paginator._intl.itemsPerPageLabel = 'K??ch th?????c trang';
  }

  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  public getPeriodicWeek() {
    if (this.classMessageId != null) {
      this.periodicPointService.getPeriodicPointConditions(this.classMessageId).subscribe((result: any) => {
        this.periodicPoint = result;
        // get tu???n l???n nh???t
        // tslint:disable-next-line: only-arrow-functions
        this.maxWeek = Math.max.apply(Math, result.map(function(weekMax) {
          return weekMax.week;
        }));
        console.log(this.maxWeek);

        // tslint:disable-next-line: triple-equals
        if (result.length == 0) {
          this.notificationService.showNotification(2, '??i???m', 'L???p ch??a c?? b???ng ??i???m ?????nh k??? n??o!');

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
    this.load_infor_Classes(this.classMessageId);
    this.weekSelected = 0;
    this.getPeriodicWeek();
    this.getPeriodicDetail();
    this.weekName = null;
    this.lecturerName = null;
    this.dateOnPoint = null;
    console.log(this.weekSelected);
  }

  public getPeriodicDetail() {
    // if  (this.weekSelected != null) {
    this.periodicPointDeltailService.getPeriodicPointDeltailConditions(this.weekSelected).subscribe((result: any) => {
      this.loadTables(result);
      this.periodicPointDetail = result;
      console.log(this.periodicPointDetail);

    }, error => {
    });
  }
  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  // change b???ng ??i???m ?????nh k??? chi ti???t
  public reloadTable() {
    this.getPeriodicDetail();
    this.getPeriodicId();
  }

  public CreatPeriodicPoint() {
    if (!this.isOpenDialog) {
      if (this.classMessageId == null) {
        this.notificationService.showNotification(3, '??i???m', 'L???i, H??y ch???n l???p h???c!');
      }
      // tslint:disable-next-line: one-line
      else {
        this.isOpenDialog = true;
        const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
        this.matDialog.open(CreatPointComponent, {
          width: `${widthMachine}px`,
          data: {
            classId: this.classMessageId
          },
          disableClose: false
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.periodicPointDeltailService.addPeriodicPointDeltailCondition().subscribe(done => {
            }, error => {
            });
            this.getPeriodicWeek();
          }
        });
      }
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
        this.load_total(classMessageId);
        this.load_CourseName(result.courseId);
      }, error => {
      });
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

  // h??m n??m d??? li???u
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // ch??? nh???p s???
  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  public updatePeriodicPoint(periodicDetail) {
    this.periodicPointDeltailService.putPeriodicPointDeltail(periodicDetail, this.classMessageId).subscribe(result => {
      console.log('success');
      this.getPeriodicDetail();
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Qu???n l?? ??i???m ?????nh k???')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;

  }


}
