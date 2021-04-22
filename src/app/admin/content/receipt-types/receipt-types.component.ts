import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddReceiptTypeComponent } from './dialog/add-receipt-type/add-receipt-type.component';
import { EditReceiptTypeComponent } from './dialog/edit-receipt-type/edit-receipt-type.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { ReceiptTypeService } from '../../services/receipt-type.service';
import { LoginService } from '../../services/login.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConstService } from '../../services/extension/Const.service';
@Component({
  selector: 'app-receipt-types',
  templateUrl: './receipt-types.component.html',
  styleUrls: ['./receipt-types.component.css']
})
export class ReceiptTypesComponent implements OnInit {

  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public receiptType;
  public status = [];

  public isOpenDialog = false;

  public length = 100;
  public pageSize = 5;
  public pageIndex = 1;
  public pageSizeOptions = [10, 15, 20, 30];

  public keyWord = '';
  public statusSelected = 2;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'name', 'status', 'note', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.receiptType);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private receiptTypeService: ReceiptTypeService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    public matDialog: MatDialog,
    private confirmService: ConfirmService,
    private loginService: LoginService
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
    this.getReceiptType();
    this.getAllStatus();
    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public getReceiptType() {
    this.startProgressBar();
    this.receiptTypeService.getAllReceiptType().subscribe(result => {
      this.receiptType = result;
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


  public openCreate_ReceiptType() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.4 * this.screenWidth;
      this.matDialog.open(AddReceiptTypeComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        this.getReceiptType();
      });
    }
  }

  public openEdit_ReceiptType(receiptType: any) {
    if (this.permissionOfFunction.canUpdate === false) {
      return;
    }
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.4 * this.screenWidth;
      this.matDialog.open(EditReceiptTypeComponent,
        {
          width: `${widthMachine}px`,
          data: { _receiptType: receiptType }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
            this.getReceiptType();
          }
        });
    }
  }

  public delete_receiptType(receiptTypeId: number) {
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
          this.receiptTypeService.deleteReceiptType(receiptTypeId).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Loại thu', 'Xóa loại thu thành công!'); });
            this.getReceiptType();
            this.isOpenDialog = false;
          }, error => {
            this.notificationService.showNotification(3, 'Loại thu', 'Lỗi, Xóa không thành công!');
            this.stopProgressBar();
          });
        }
      });
    }
  }


  public find_ReceiptType() {

    this.startProgressBar();
    this.receiptTypeService.searchWithCondition(this.keyWord, this.statusSelected).subscribe(result => {
      if (result) {
        this.receiptType = result;
        this.loadTables(result);
        this.stopProgressBar();
      }

    }, error => {
      this.notificationService.showNotification(3, 'Loại thu', 'Lỗi, tìm kiếm thất bại!');
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Loại phiếu thu')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
    if (this.permissionOfFunction.canDelete === true) {
      this.turnOnControls();
    }

  }
}
