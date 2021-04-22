import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
import { DatePipe } from '@angular/common';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from '../../services/course.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LoginService } from '../../services/login.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConstService } from '../../services/extension/Const.service';
@Component({
  selector: 'app-add-learner-class',
  templateUrl: './add-learner-class.component.html',
  styleUrls: ['./add-learner-class.component.css']
})
export class AddLearnerClassComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };
  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;
  public isOpenDialog = false;
  public pageSizeOptions1 = [10, 20, 30, 50];
  public pageSizeOptions2 = [10, 20, 30, 50];

  public learnerOutClass;
  public learnerInClass;
  public classId;
  public learnerId;
  public keyword;
  public classList;

  //  public sisomax = 0; ////
  // public l1 = 1;      //
  // public initialstate;
  public class = {
    id: null,
    cardId: null,
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
    dateCreated: null,
    dateModified: null,
  };
  public studyProcess = {
    languageClassId: null,
    learnerId: null,
  };


  // tslint:disable-next-line: member-ordering
  public displayedColumnsOutClass: string[] = ['index', 'cardId', 'name', 'sex', 'birthday', 'controls'];
  public displayedColumnsInClass: string[] = ['index', 'cardId', 'name', 'sex', 'birthday', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSourceOutClass = new MatTableDataSource(this.learnerOutClass);
  public dataSourceInClass = new MatTableDataSource(this.learnerInClass);

  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild('Paginator1', { static: true, read: MatPaginator }) paginator1: MatPaginator;
  @ViewChild('Paginator2', { static: true, read: MatPaginator }) paginator2: MatPaginator;
  constructor(
    private learnerService: LearnerService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    private loginService: LoginService,
    private exchangeDataService: ExchangeDataService,
    private router: Router,
    public matDialog: MatDialog,
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
      this.classId = message;
    });

    //  this.classId = 'LC1';
    this.load_infor_languageClasses(this.classId);
    this.getAllClass();
    this.getLearnerOutClass();
    this.getLearnerInClass();
    this.studyProcess.languageClassId = this.classId;
    this.paginator1._intl.itemsPerPageLabel = 'Kích thước trang';
    this.paginator2._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public loadForm() {
    this.load_infor_languageClasses(this.classId);
    this.getLearnerOutClass();
    this.getLearnerInClass();
    this.studyProcess.languageClassId = this.classId;
  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public getLearnerOutClass() {
    this.startProgressBar();
    this.learnerService.getOutClass(this.classId).subscribe((result: any) => {
      this.learnerOutClass = result;
      this.loadTablesOutClass(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public getLearnerInClass() {
    this.startProgressBar();
    this.learnerService.getInClass(this.classId).subscribe((result: any) => {
      this.learnerInClass = result;
      this.loadTablesInClass(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTablesOutClass(data: any) {
    this.dataSourceOutClass = new MatTableDataSource(data);
    this.dataSourceOutClass.paginator = this.paginator1;
  }

  public loadTablesInClass(data: any) {
    this.dataSourceInClass = new MatTableDataSource(data);
    this.dataSourceInClass.paginator = this.paginator2;
  }


  public createStudyProcess(learnerId: any) {   // cập nhật tình trạng lớp nếu full
    this.studyProcess.learnerId = learnerId;
    // tslint:disable-next-line: triple-equals
    this.studyProcessService.post_studyProcess(this.studyProcess).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Xếp lớp', 'Thêm học viên thành công!'); });
      this.getLearnerOutClass();
      this.getLearnerInClass();
      this.load_infor_languageClasses(this.classId);
    }, error => {
      this.notificationService.showNotification(3, 'Xếp lớp', 'Lỗi, Thêm học viên không thành công!');
    });
  }

  public deleteStudyProcess(learnerId: any) { // cập nhật tình trạng lớp nếu k full
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.2 * this.screenWidth;
      this.matDialog.open(DeleteDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result === true) {
          this.studyProcessService.delete_studyProcess_byLearnerId(this.studyProcess.languageClassId, learnerId).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Xếp lớp', 'Xóa học viên thành công!'); });
            this.getLearnerOutClass();
            this.getLearnerInClass();
            this.load_infor_languageClasses(this.classId);
          }, error => {
            this.notificationService.showNotification(3, 'Xếp lớp', 'Lỗi, Xóa không thành công!');
            this.stopProgressBar();
          });
        }
      });
    }
  }

  /*
  public updateClass() {
    this.languageClassesService.putLanguageClass({
      id: this.class.id,      // đủ 13 thuộc tính
      name: this.class.name,
      courseFee: this.class.courseFee,
      monthlyFee: this.class.monthlyFee,
      lessonFee: this.class.lessonFee,
      startDay: this.class.startDay,
      endDay: this.class.endDay,
      maxNumber: this.class.maxNumber,
      dateCreated: this.class.dateCreated,    //
      dateModified: this.class.dateModified,  //
      note: this.class.note,
      courseId: this.class.courseId,
      status: this.class.status,
    }).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Cập nhật trạng thái thành công!'); });
    }, error => {
    });
  }
  */

  ////////////// Infor lớp học
  public load_infor_languageClasses(classId) {
    this.languageClassesService.getById(classId).subscribe((result: any) => {
      this.class.name = result.name;
      this.class.id = result.id;
      const startDate = this.datePipe.transform(result.startDay, 'dd-MM-yyyy');
      const endDate = this.datePipe.transform(result.endDay, 'dd-MM-yyyy');
      this.class.courseFee = result.courseFee;
      this.class.monthlyFee = result.monthlyFee;
      this.class.lessonFee = result.lessonFee;
      this.class.startDay = startDate;
      this.class.endDay = endDate;
      this.class.status = result.status;
      this.class.courseId = result.courseId;
      this.class.note = result.note;
      this.class.maxNumber = result.maxNumber;
      this.class.dateCreated = result.dateCreated;
      this.class.dateModified = result.dateModified;
      this.load_total(classId);
      this.load_CourseName(result.courseId);
    }, error => {
    });
  }

  public load_total(classId) {
    // tslint:disable-next-line: triple-equals
    this.studyProcessService.search_studyProcess(classId, '', 1).subscribe((result: any) => {
      this.class.total = result.length;
      // tslint:disable-next-line: triple-equals
      if (this.class.maxNumber <= this.class.total) {     //  1. hoạt động,  0 : kết thúc, 2 đã đầy
        this.class.status = 2;
        this.notificationService.showNotification(2, 'Xếp lớp', 'Thông báo, Lớp đã đầy!');
      } else {
        this.class.status = 1;
      }
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

  public loadFind() {
    // tslint:disable-next-line: triple-equals
    if (this.keyword == '') {
      this.getLearnerOutClass();
    } else {
      this.findOutClass();
    }
  }

  public findOutClass() {
    this.startProgressBar();
    this.learnerService.getOutClassWithCondition(this.classId, this.keyword).subscribe((result: any) => {
      this.learnerOutClass = result;
      this.loadTablesOutClass(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }




  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }


  public openPermissionOfFuncition() {

    if (ConstService.user.userName === 'admin') {
      this.permissionOfFunction.canCreate = true;
      this.permissionOfFunction.canDelete = true;
      this.permissionOfFunction.canRead = true;
      this.permissionOfFunction.canUpdate = true;

      return;
    }
    const temp = ConstService.permissions.filter(y => y.functionName === 'Thêm học viên mới')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;


  }
}
