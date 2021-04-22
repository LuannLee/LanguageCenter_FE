import { LoginService } from './../../services/login.service';
import { LanguageClassesService } from './../../services/language-classes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { AddLanguageClassComponent } from './dialog/add-language-class/add-language-class.component';
import { EditLanguageClassComponent } from './dialog/edit-language-class/edit-language-class.component';
import { DetailLanguageClassComponent } from './dialog/detail-language-class/detail-language-class.component';
import { EditClassComponent } from '../class/dialog/edit-class/edit-class.component';
import { AddClassComponent } from '../class/dialog/add-class/add-class.component';
import { CourseService } from '../../services/course.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConstService } from '../../services/extension/Const.service';
@Component({
  selector: 'app-language-classes',
  templateUrl: './language-classes.component.html',
  styleUrls: ['./language-classes.component.css']
})
export class LanguageClassesComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;
  public courseList;
  public languageClasses;

  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [5, 10, 15, 20];

  public courseKeyword = -1;
  public keyWord = '';
  public statusSelected = -1;
  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'maxNumber', 'courseFee', 'startDay', 'endDay', 'status', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource([]);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private languageClassesService: LanguageClassesService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService,
    private courseService: CourseService,
  ) {
    this.loginService.islogged();
    this.turnOnControls();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
  }

  ngOnInit() {
    this.getLanguageClass();
    this.getAllStatus();
    this.getAllCourse();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';

  }

  public getLanguageClass() {
    this.startProgressBar();
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.languageClasses = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

  }

  public getAllCourse() {
    this.courseService.getAllCourses().subscribe((result: any) => {
      this.courseList = result;
    }, error => {
    });
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Kết thúc',
        code: 0
      },
      {
        name: 'Đã đầy',
        code: 2
      },
      {
        name: 'Tất cả',
        code: -1
      }];
  }

  public createClass() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.6 * this.screenWidth;
      this.matDialog.open(AddClassComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getLanguageClass();
        }
      });
    }
  }

  public editClass(classes: any) {
    if (this.permissionOfFunction.canUpdate === false) {
      return;
    }
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.5 * this.screenWidth;
      this.matDialog.open(EditClassComponent,
        {
          width: `${widthMachine}px`,
          data: { _class: classes }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getLanguageClass();
          }
        });
    }
  }

  public deleteLanguageClass(languageClassId: number) {
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
          this.languageClassesService.deleteLanguageClass(languageClassId).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Xóa lớp học thành công!'); });
            this.getLanguageClass();
            this.isOpenDialog = false;
          }, error => {
            this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, xóa không thành công!');
            this.stopProgressBar();
          });
        }
      });
    }
  }

  public findClass() {
    this.startProgressBar();
    this.languageClassesService.searchLanguageClass(this.keyWord, this.courseKeyword, this.statusSelected).subscribe(result => {
      if (result) {
        this.languageClasses = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
  }


  public getPaginatorData(event) {
    console.log(event);
  }


  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }


  public turnOnControls() {
    if (this.displayedColumns.indexOf('controls') > -1) {
      this.displayedColumns.pop();
    } else {
      this.displayedColumns.push('controls');
    }
  }

  public openPermissionOfFuncition() {

    if (ConstService.user.userName === 'admin') {
      this.permissionOfFunction.canCreate = true;
      this.permissionOfFunction.canDelete = true;
      this.permissionOfFunction.canRead = true;
      this.permissionOfFunction.canUpdate = true;
      if (this.permissionOfFunction.canDelete === true) {
        this.turnOnControls();
      }
      return;
    }
    const temp = ConstService.permissions.filter(y => y.functionName === 'Lớp học')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
    if (this.permissionOfFunction.canDelete === true) {
      this.turnOnControls();
    }

  }

}
