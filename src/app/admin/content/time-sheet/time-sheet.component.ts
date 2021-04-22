import { ConstService } from './../../services/extension/Const.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { TimeSheetService } from '../../services/time-sheet.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public showProgressBar = true;

  public screenHeight: any;
  public screenWidth: any;
  public timeSheet;

  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];
  // để tìm kiếm
  public monthSearch;
  public yearSearch;

  // để chuyển tháng năm and gán dữ liệu lên lable
  public monthSelected = new Date().getMonth();
  public yearSelected = new Date().getFullYear();

  public selectOption = [];
  public dates = [];
  public dateOfweek = [];
  displayedColumns = ['index', 'personnelName', 'day_1', 'day_2', 'day_3', 'day_4', 'day_5',
    'day_6', 'day_7', 'day_8', 'day_9', 'day_10', 'day_11', 'day_12', 'day_13', 'day_14', 'day_15',
    'day_16', 'day_17', 'day_18', 'day_19', 'day_20', 'day_21', 'day_22', 'day_23', 'day_24', 'day_25',
    'day_26', 'day_27', 'day_28', 'day_29', 'day_30', 'day_31', 'totalWorkday'];

  public dataSource = new MatTableDataSource([]);

  public selection = new SelectionModel(true, []);

  constructor(
    private timeSheetService: TimeSheetService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.monthSearch = (this.monthSelected + 1).toString();
    this.yearSearch = (this.yearSelected).toString();
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);

  }

  ngOnInit() {
    this.getDateOfMonth();
    this.getAllYear();
    this.getTimeSheet();

  }

  // tslint:disable-next-line: member-ordering
  public lastDay: Date;
  // tslint:disable-next-line: comment-format
  //Lấy tất cả ngày trong tháng
  public getDateOfMonth() {
    this.lastDay = new Date(this.yearSelected, this.monthSelected + 1, 0);
    for (let i = 1; i <= this.lastDay.getDate(); i++) {
      // tslint:disable-next-line: prefer-const
      let str = new Date(this.yearSelected, this.monthSelected, i).toString();
      // tslint:disable-next-line: prefer-const
      let res = str.substring(0, 3);
      this.dateOfweek.push(res);
    }
  }
  // chuyển tháng
  public forwardMonth() {
    if (this.monthSelected === 0) {
      this.monthSelected = 11;
      this.yearSelected = this.yearSelected - 1;
    }
    // tslint:disable-next-line: one-line
    else {
      this.monthSelected = this.monthSelected - 1;
    }
    this.dateOfweek = [];
    this.getDateOfMonth();
    this.getTimeSheet();
    this.monthSearch = (this.monthSelected + 1).toString();
    this.yearSearch = (this.yearSelected).toString();
    console.log(this.monthSelected);
    console.log(this.yearSelected);

  }

  public nextMonth() {
    if (this.monthSelected === 11) {
      this.monthSelected = 0;
      this.yearSelected = this.yearSelected + 1;
    }
    // tslint:disable-next-line: one-line
    else {
      this.monthSelected = this.monthSelected + 1;
    }
    this.dateOfweek = [];
    this.getDateOfMonth();
    this.getTimeSheet();
    this.monthSearch = (this.monthSelected + 1).toString();
    this.yearSearch = (this.yearSelected).toString();
  }

  // Lấy năm
  public getAllYear() {
    for (let i = 2017; i <= 2999; i++) {
      this.years.push(i);
    }
  }

  // tslint:disable-next-line: comment-format
  //load dữ liệu
  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
  }

  public getTimeSheet() {
    this.startProgressBar();
    this.timeSheetService.getTimeSheetConditions(this.monthSelected + 1, this.yearSelected).subscribe(result => {
      this.timeSheet = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public CreateTimeSheet() {
    this.timeSheetService.addTimeSheetCondition(this.monthSelected, this.yearSelected, ConstService.user.id).subscribe((result: any) => {

      this.notificationService.showNotification(1, 'Chấm Công', 'Đã tạo bảng chấm công');
      console.log('success');
      this.getTimeSheet();
      console.log(result);


    }, error => {
      this.notificationService.showNotification(3, 'Chấm Công', 'Lỗi, Bảng công đã được tạo');

    });
  }
  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }

  onChange(timesheet) {
    this.timeSheetService.putTimeSheet(timesheet).subscribe(result => {
      console.log('success');
      this.getTimeSheet();
    }, error => {
    });
  }

  public searchTimeSheet() {
    this.monthSelected = this.monthSearch - 1;
    this.yearSelected = this.yearSearch;
    this.dateOfweek = [];
    this.getDateOfMonth();
    this.getTimeSheet();
  }

  ShowColumn(date) {
    if (!date) {
      return false;
    }
    return true;
  }

  public openPermissionOfFuncition() {

    if (ConstService.user.userName === 'admin') {
      this.permissionOfFunction.canCreate = true;
      this.permissionOfFunction.canDelete = true;
      this.permissionOfFunction.canRead = true;
      this.permissionOfFunction.canUpdate = true;
      return;
    }
    const temp = ConstService.permissions.filter(y => y.functionName === 'Chấm công nhân viên')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;

  }




}

