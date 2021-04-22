import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPayslipDialogComponent } from './dialog/add-payslip-dialog/add-payslip-dialog.component';
import { EditPayslipDialogComponent } from './dialog/edit-payslip-dialog/edit-payslip-dialog.component';
import { DetailPayslipDialogComponent } from './dialog/detail-payslip-dialog/detail-payslip-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { PaySlipService } from '../../services/pay-slip.service';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { PaySlipTypeService } from '../../services/pay-slip-type.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConstService } from '../../services/extension/Const.service';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css']
})
export class PaySlipComponent implements OnInit {

  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public startDate;
  public endDate;
  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public paySlipType;
  public paySlip;
  public status = [];

  public isOpenDialog = false;

  public pageSizeOptions = [10, 15, 20];

  public keyWord = '';
  public statusSelected = -1;
  public keywordPhieuChi = -1;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'id', 'paySlipTypeName', 'date', 'receiver', 'total', 'status', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.paySlip);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private paySlipServies: PaySlipService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private confirmService: ConfirmService,
    private datePipe: DatePipe,
    private loginService: LoginService,
    private paySlipTypeService: PaySlipTypeService,
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.turnOnControls();
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
  }

  ngOnInit() {
    this.getPaySlips();
    this.getAllStatus();
    this.getPaySlipTypes();
    this.statusSelected = this.status[3].code;
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';

  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public getPaySlipTypes() {
    this.paySlipTypeService.getAllPaySlipTypes().subscribe(result => {
      this.paySlipType = result;
    }, error => {
    });
  }

  public getPaySlips() {
    this.startProgressBar();
    this.paySlipServies.getAllPaySlip().subscribe(result => {
      this.paySlip = result;
      this.loadTables(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  private getAllStatus() {
    this.status = [
      {
        Name: 'Hoàn thành',
        code: 1
      },
      {
        Name: 'Chờ xử lý',
        code: 2
      },
      {
        Name: 'Đã hủy',
        code: 0
      },
      {
        Name: 'Tất cả',
        code: -1
      }];

    this.statusSelected = this.status[3].code;
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
  /////////////////////////////////////////////////////////////////
  /* Control */
  public openCreate_PaySlip() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.5 * this.screenWidth;
      console.log(widthMachine);
      this.matDialog.open(AddPayslipDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getPaySlips();
      });
    }
  }

  public openEdit_PaySlip(paySlip: any) {
    if (this.permissionOfFunction.canUpdate === false) {
      return;
    }

    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.5 * this.screenWidth;
      this.matDialog.open(EditPayslipDialogComponent,
        {
          width: `${widthMachine}px`,
          data: { _paySlip: paySlip }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getPaySlips();
          }
        });
    }
  }

  public delete_PaySlip(paySlipId: number) {
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
          this.paySlipServies.deletePaySlip(paySlipId).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Phiếu chi', 'Xóa phiếu chi thành công!'); });
            this.getPaySlips();
            this.isOpenDialog = false;
          }, error => {
            this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Xóa không thành công!');
            this.stopProgressBar();
          });
        }
      });
    }
  }

  public find_PaySlip() {

    this.startProgressBar();
    const startDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const endDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    this.paySlipServies.searchPaySlip(startDate, endDate, this.keyWord, this.keywordPhieuChi, this.statusSelected).subscribe(result => {
      if (result) {
        this.paySlip = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, tìm kiếm thất bại!');
      this.stopProgressBar();
    });
  }

  public styleOfStatus(element) {
    // tslint:disable-next-line: triple-equals
    if (element.status == 1) {
      return 'badge badge-success';
    }
    // tslint:disable-next-line: triple-equals
    if (element.status == 0) {
      return 'badge badge-danger';
    }
    // tslint:disable-next-line: triple-equals
    if (element.status == 2) {
      return 'badge badge-warning';
    }
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Đối tượng')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
    if (this.permissionOfFunction.canDelete === true) {
      this.turnOnControls();
    }

  }

}
