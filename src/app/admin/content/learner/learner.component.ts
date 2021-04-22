import { Component, OnInit, ViewChild } from '@angular/core';
import { LearnerService } from '../../services/learner.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';
import { Router } from '@angular/router';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.css']
})
export class LearnerComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;
  public isOpenDialog = false;
  // dùng để tìm kiếm
  public statusSelected = 1;
  public keyWord = '';

  public statusGenderes = '';
  public learner;

  public length = 100;
  public pageSize = 6;
  public pageIndex = 1;
  public pageSizeOptions = [6, 9, 12, 15];

  public items = [];
  public pageOfItems: Array<any>;

  public status;
  public genderes;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private learnerService: LearnerService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private fomatDateService: FomatDateService,
    private router: Router,
    private exchangeDataService: ExchangeDataService,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }
  ngOnInit() {
    this.getAllStatus();
    this.getstatusGenderes();

    this.getLearner();
  }

  public getLearner() {
    this.startProgressBar();
    this.learnerService.getLearnerWithCondition(this.keyWord, this.statusSelected).subscribe((result: any) => {
      this.learner = result;
      this.items = Array(this.learner.length).fill(0).map((x, i) => (result[i]));
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  public getstatusGenderes() {
    this.genderes = [
      {
        name: 'Nam',
        value: true
      },
      {
        name: 'Nữ',
        value: false
      },
      {
        name: 'Tất cả',
        value: ''
      }
    ];
  }
  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Khóa',
        code: 0
      },
      {
        name: 'Hẹn đi học',
        code: 2
      },
      {
        name: 'Tất cả',
        code: -1
      }
    ];
  }



  /*Update image => success => save to learner object*/
  onFileComplete(data: any) {
    this.learner.image = data.link;
  }

  getImageWidth() {
    if (this.screenWidth < 500) {
      return 0.6 * this.screenWidth;
    }
    return 0.11 * this.screenWidth;
  }
  getImageHeigth() {
    return this.getImageWidth();
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }

  // hàm ném dữ liệu
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }

  public controlLearner(id) {
    this.createExchangeId(id);
    this.router.navigateByUrl('admin/control-learner');
  }
  public deleteLearner(id) {
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
          this.learnerService.deleteLearner(id).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Học viên', 'Đã xóa học viên!'); });
            this.getLearner();
          }, error => {
            this.notificationService.showNotification(3, 'Học viên', 'Lỗi, Không xóa được!');
            this.stopProgressBar();
          });
        }
      });
    }
  }

  creatLearner() {
    this.router.navigateByUrl('admin/add-learner');
  }


  public searchLearner() {
    // tslint:disable-next-line: max-line-length
    this.learnerService.getLearnerWithCondition(this.keyWord, this.statusSelected).subscribe(result => {
      // tslint:disable-next-line: triple-equals
      if (result != 0) {
        this.learner = result;
        this.items = Array(this.learner.length).fill(0).map((x, i) => (result[i]));
      }
      // tslint:disable-next-line: one-line
      else {
        this.notificationService.showNotification(2, 'Học viên', 'Không tìm thấy học viên!');
      }
    }, error => {
      this.notificationService.showNotification(2, 'Học viên', 'Không tìm thấy học viên!');
    });
  }
}
