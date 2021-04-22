import { ConstService } from './../../services/extension/Const.service';
import { DetailCourseDialogComponent } from './dialog/detail-course-dialog/detail-course-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCourseDialogComponent } from './dialog/add-course-dialog/add-course-dialog.component';
import { EditCourseDialogComponent } from './dialog/edit-course-dialog/edit-course-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { LoginService } from '../../services/login.service';
import { DeleteCourseDialogComponent } from './dialog/delete-course-dialog/delete-course-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {

  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };


  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;

  public courses;

  public status = [];

  public isOpenDialog = false;


  public pageSizeOptions = [10, 15, 20];

  public keyWord = '';
  public statusSelected = null;
  public showTrainingTime = false;


  public displayedColumns: string[] = ['index', 'name', 'traingTime', 'status', 'price', 'controls'];
  public dataSource = new MatTableDataSource([]);
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private courseService: CourseService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    if (this.screenWidth > 500) {
      this.showTrainingTime = true;
    }
    this.turnOnControls();
    this.loginService.islogged();
    console.log(ConstService.permissions);
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1500);

  }

  ngOnInit() {
    this.getCourses();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';

  }

  private getAllStatus() {
    this.status = [
      {
        Name: 'Hoạt động',
        code: 1
      },
      {
        Name: 'Khóa',
        code: 0
      },
      {
        Name: 'Tất cả',
        code: 2
      }];
  }

  public getCourses() {
    this.startProgressBar();
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
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

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      const dialogRef = this.matDialog.open(AddCourseDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
      });
      dialogRef.backdropClick().subscribe(_ => {
        // Close the dialog
        dialogRef.close();
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getCourses();
        }

      });
    }
  }

  public openEditCourse(course: any) {
    if (this.permissionOfFunction.canUpdate === false) {
      return;
    }
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(EditCourseDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _course: course }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getCourses();
          }
        });
    }
  }


  public deleteCourse(courseId: number) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.2 * this.screenWidth;
      this.matDialog.open(DeleteCourseDialogComponent, {
        width: `${widthMachine}px`,
        data: {
          message: 'xóa khóa học'
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result === true) {

          this.courseService.deleteCourse(courseId).subscribe(data => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Khóa học', 'Xóa khóa học thành công!'); });
            this.getCourses();
            this.isOpenDialog = false;
          }, error => {
            this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, không xóa thành công!');
            this.stopProgressBar();
          });
        }
      });
    }
  }



  public searchCourses() {
    this.startProgressBar();
    this.courseService.searchCourses(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.courses = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Khóa học')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
    if (this.permissionOfFunction.canDelete === true) {
      this.turnOnControls();
    }

  }


}
