import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LoginService } from '../../services/login.service';
import { ReceiptTypeService } from '../../services/receipt-type.service';
import { ReceiptsService } from '../../services/receipts.service';
import { ReceiptDetailService } from '../../services/Receipt-Detail.service';
import { PersonnelsService } from '../../services/personnels.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';
import { DetailReceiptBoComponent } from './page/detail-receipt-bo/detail-receipt-bo.component';
import { DeleteReceiptComponent } from './dialog/delete-receipt/delete-receipt.component';
import { ConstService } from '../../services/extension/Const.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };

  public screenHeight: any;
  public screenWidth: any;
  public pageSizeOptions = [10, 15, 20];

  public isOpenDialog = false;

  // keyword để tìm kiếm
  public keyWord;
  // phiếu thu
  public receipts;

  public dataSource = new MatTableDataSource(this.receipts);
  public selection = new SelectionModel(true, []);


  displayedColumns1 = ['index', 'id', 'receiptTypeId', 'collectionDate', 'learnerId', 'nameOfPaymentApplicant',
    'personnelId', 'totalAmount', 'status', 'note', 'control'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

  }

  // get all phiếu thu
  public getAllReceipt() {
    this.receiptsService.getAllReceipts().subscribe((result: any) => {
      this.receipts = result;
      this.loadTables(result);
      console.log(this.receipts);
    }, error => {
    });
  }
  constructor(
    private receiptTypeService: ReceiptTypeService,
    private receiptsService: ReceiptsService,
    private receiptDetailService: ReceiptDetailService,
    private learnerService: LearnerService,
    private personnelsService: PersonnelsService,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private datePipe: DatePipe,
    private notificationService: NotificationService,
    public matDialog: MatDialog,
    private loginService: LoginService,
    private exchangeDataService: ExchangeDataService,
    private fomatDateService: FomatDateService,
    private router: Router,
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
    this.turnOnControls();

  }

  ngOnInit() {
    this.getAllReceipt();

  }

  public openDetailReceipt(receipt: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.1 * this.screenWidth : 0.50 * this.screenWidth;
      this.matDialog.open(DetailReceiptBoComponent,
        {
          width: `${widthMachine}px`,
          data: { _receipt: receipt }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          this.getAllReceipt();
        });
    }
  }
  public deleteReceipt(receiptId: number) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.2 * this.screenWidth;
      this.matDialog.open(DeleteReceiptComponent, {
        width: `${widthMachine}px`,
        data: {
          message: 'xóa khóa học'
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result === true) {

          this.receiptsService.deleteReceipt(receiptId).subscribe(data => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Phiếu thu', 'Đã xóa!'); });
            this.getAllReceipt();
            this.isOpenDialog = false;
          }, error => {
            this.notificationService.showNotification(3, 'Phiếu thu', 'Lỗi, xóa không thành công!');
          });
        }
      });
    }
  }

  public CreatReceipt() {
    this.router.navigateByUrl('admin/creat-receipt');

  }

  public SearchReceipt() {
    if (this.keyWord !== '') {
      this.receiptsService.searchReceipt(this.keyWord).subscribe((result: any) => {
        this.receipts = result;
        this.loadTables(result);
      }, error => {
      });
    }
    // tslint:disable-next-line: one-line
    else {
      this.getAllReceipt();
    }
  }

  public turnOnControls() {
    if (this.displayedColumns1.indexOf('control') > -1) {
      this.displayedColumns1.pop();
    } else {
      this.displayedColumns1.push('control');
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Phiếu thu')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
    if (this.permissionOfFunction.canDelete === true) {
      this.turnOnControls();
    }

  }
}
