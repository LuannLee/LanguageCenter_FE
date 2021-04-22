import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddClassRoomComponent } from './dialog/add-class-room/add-class-room.component';
import { EditClassRoomComponent } from './dialog/edit-class-room/edit-class-room.component';
import { ClassroomService } from '../../services/classroom.service';
import { LoginService } from '../../services/login.service';
import { NotificationService } from '../../services/extension/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConstService } from '../../services/extension/Const.service';
@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.css']
})
export class ClassRoomComponent implements OnInit {

  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;

  public classRooms;
  public status = [];

  public isOpenDialog = false;

  public pageSizeOptions = [10, 15, 20, 30];

  public keyWord = '';
  public statusSelected = 2;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'note', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.classRooms);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private classroomService: ClassroomService,
    private notificationService: NotificationService,
    public matDialog: MatDialog,
    private loginService: LoginService
  ) {
    this.turnOnControls();
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.turnOnControls();
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
  }

  ngOnInit() {

    this.getClassRooms();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';


  }
  public getClassRooms() {
    this.startProgressBar();
    this.classroomService.getAllClassRoom().subscribe((result: []) => {
      this.classRooms = result;
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

  public getAllStatus() {
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
        code: -1
      }];
  }

  public openCreateDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.4 * this.screenWidth;
      this.matDialog.open(AddClassRoomComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getClassRooms();
      });
    }
  }

  public openEditClassRoom(classRoom: any) {
    if (this.permissionOfFunction.canUpdate === false) {
      return;
    }
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.4 * this.screenWidth;
      this.matDialog.open(EditClassRoomComponent,
        {
          width: `${widthMachine}px`,
          data: { _classRoom: classRoom }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getClassRooms();
          }
        });
    }
  }

  public deleteClassRoom(classRoomId: number) {
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
          this.classroomService.deleteClassRoom(classRoomId).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Phòng học', 'Xóa phòng học thành công!'); });
            this.getClassRooms();
            this.isOpenDialog = false;
          }, error => {
            this.notificationService.showNotification(3, 'Loại chi', 'Lỗi, Xóa không thành công!');
            this.stopProgressBar();
          });
        }
      });
    }
  }

  public find_PaySlipType() {
    this.startProgressBar();
    this.classroomService.searchWithByCondition(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.classRooms = result;
        this.loadTables(result);
        this.stopProgressBar();
      }
    }, error => {
      this.notificationService.showNotification(3, 'Phòng học', 'Lỗi, tìm kiếm thất bại!');
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Phòng học')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
    if (this.permissionOfFunction.canDelete === true) {
      this.turnOnControls();
    }

  }

}
