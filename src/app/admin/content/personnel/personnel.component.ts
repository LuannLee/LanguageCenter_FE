import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonnelsService } from '../../services/personnels.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';
import { Router } from '@angular/router';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConstService } from '../../services/extension/Const.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

  public length = 100;
  public pageSize = 6;
  public pageIndex = 1;
  public pageSizeOptions = [6, 9, 12, 15];

  public items = [];
  public pageOfItems: Array<any>;

  public personnel;

  public isOpenDialog = false;
  public status;
  public marritalStatus;
  public genderes = [
    {
      name: 'Nam',
      value: true
    },
    {
      name: 'Nữ',
      value: false
    }
  ];

  public keyWord = '';
  public statusSelected = 2;
  public positionKeyword = 'Tất cả';
  public position;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private personnelsService: PersonnelsService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private fomatDateService: FomatDateService,
    private router: Router,
    private exchangeDataService: ExchangeDataService,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
  }

  ngOnInit() {
    this.getAllStatus();
    this.getAllMarritalStatus();
    this.getAllPosition();
    this.getPersonnels();
  }

  public getPersonnels() {
    this.startProgressBar();
    this.personnelsService.getAllPersonnels().subscribe((result: any) => {
      this.personnel = result;
      this.items = Array(this.personnel.length).fill(0).map((x, i) => (result[i]));
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
  /*Update image => success => save to learner object*/
  onFileComplete(data: any) {
    this.personnel.image = data.link;
  }

  // hàm ném dữ liệu
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }

  public controlPersonnel(id) {
    this.createExchangeId(id);  // truyền
    this.router.navigateByUrl('admin/control-personnel');
  }

  creatPersonnel() {
    this.router.navigateByUrl('admin/add-personnel');
  }

  public deletePersonnel(id) {
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
          this.personnelsService.deletePersonnel(id).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Nhân viên', 'Đã xóa nhân viên!'); });
            this.getPersonnels();
          }, error => {
            this.notificationService.showNotification(3, 'Nhân viên', 'Lỗi, Không xóa được!');
            this.stopProgressBar();
          });
        }
      });
    }
  }

  public searchPersonnel() {            // truyền điều kiện
    this.startProgressBar();
    // tslint:disable-next-line: max-line-length
    this.personnelsService.getPersonnelWithCondition(this.keyWord, this.positionKeyword, this.statusSelected, this.personnel).subscribe((result: any) => {
      this.personnel = result;
      this.items = Array(this.personnel.length).fill(0).map((x, i) => (result[i]));
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
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

  private getAllMarritalStatus() {
    this.marritalStatus = [
      {
        name: 'Đã kết hôn',
        code: 1
      },
      {
        name: 'Độc thân',
        code: 0
      },
    ];
  }

  public getAllPosition() {
    this.position = [
      {
        name: 'Nhân viên',
        code: 0
      },
      {
        name: 'Quản lý',
        code: 1
      },
      {
        name: 'Kế toán',
        code: 2
      },
      {
        name: 'Giáo viên',
        code: 3
      },
      {
        name: 'Tất cả',
        code: 4
      },
    ];
  }

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Nghỉ việc',
        code: 0
      },
      {
        name: 'Tất cả',
        code: 2
      }
    ];
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Nhân viên')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
  }
}
