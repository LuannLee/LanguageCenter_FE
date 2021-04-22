import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/admin/services/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddScheduleDialogComponent } from './dialog/add-schedule-dialog/add-schedule-dialog.component';
import { ScheduleService } from 'src/app/admin/services/schedule.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateScheduleDialogComponent } from './dialog/update-schedule-dialog/update-schedule-dialog.component';
import { Router } from '@angular/router';
import { DeleteScheduleDialogComponent } from './dialog/delete-schedule-dialog/delete-schedule-dialog.component';
import { ConstService } from 'src/app/admin/services/extension/Const.service';

@Component({
  selector: 'app-schedule-in-table',
  templateUrl: './schedule-in-table.component.html',
  styleUrls: ['./schedule-in-table.component.css']
})
export class ScheduleInTableComponent implements OnInit {


  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public screenHeight: any;
  public screenWidth: any;

  public pageSizeOptions = [10, 15, 20];
  public statusSelected = null;
  public status = [];
  public schedules;
  public schedulesSource;
  public className = '';
  public isOpenDialog = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public scheduledColumns: string[] = ['index', 'fromDate', 'toDate', 'daysOfWeek', 'content', 'status', 'lecturer', 'controls'];

  constructor(
    private loginService: LoginService,
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    public router: Router,
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.turnOnDelete();
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
  }


  ngOnInit() {
    this.getAllStatus();
    this.getAllSchedule();
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


  public loadTables(data: any) {
    this.schedulesSource = new MatTableDataSource(data);
    this.schedulesSource.paginator = this.paginator;
  }

  public searchSchedule() {

  }

  public openDetailSchedule(schedule) {

  }

  getAllSchedule() {
    this.scheduleService.getAllSchedules().subscribe(data => {
      if (data) {
        this.loadTables(data);
      }

    }, error => {

    });
  }

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const dialogRef = this.dialog.open(AddScheduleDialogComponent, {
        width: '80vh',
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

        }
        this.getAllSchedule();
      });
    }
  }


  public openUpdateDialog(schedule) {
    if (this.permissionOfFunction.canUpdate === false) {
      return;
    }
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const dialogRef = this.dialog.open(UpdateScheduleDialogComponent, {
        width: '80vh',
        data: {
          _schedule: schedule
        },
      });
      dialogRef.backdropClick().subscribe(_ => {
        // Close the dialog
        dialogRef.close();
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {

        }
        this.getAllSchedule();
      });
    }
  }

  public gotoSchedule() {
    this.router.navigateByUrl('admin/schedule');
  }



  turnOnDelete() {
    if (this.scheduledColumns.indexOf('controls') > -1) {
      this.scheduledColumns.pop();
    } else {
      this.scheduledColumns.push('controls');
    }
  }


  public deleteSchedule(scheduleId: number) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.2 * this.screenWidth;
      this.dialog.open(DeleteScheduleDialogComponent, {
        width: `${widthMachine}px`,
        data: {
          message: 'xóa khung lịch'
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result === true) {

          this.scheduleService.deleteSchedule(scheduleId).subscribe(data => {
            setTimeout(() => { this.notificationService.showNotification(1, '', 'Xóa khung lịch thành công!'); });
            this.getAllSchedule();
            this.isOpenDialog = false;
          }, error => {
            this.notificationService.showNotification(3, '', 'Lỗi, không xóa thành công!');
          });
        }
      });
    }
  }


  public turnOnControls() {
    if (this.scheduledColumns.indexOf('controls') > -1) {
      this.scheduledColumns.pop();
    } else {
      this.scheduledColumns.push('controls');
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Xếp lịch')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
    if (this.permissionOfFunction.canDelete === true) {
      this.turnOnControls();
    }
  }

}
