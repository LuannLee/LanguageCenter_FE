import { View } from '@fullcalendar/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ReceiptsService } from 'src/app/admin/services/receipts.service';
import { ReceiptDetailService } from 'src/app/admin/services/Receipt-Detail.service';
import { LearnerService } from 'src/app/admin/services/learner.service';
import { StudyProcessService } from 'src/app/admin/services/study-process.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/app/admin/services/login.service';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { ReceiptTypeService } from 'src/app/admin/services/receipt-type.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { PersonnelsService } from 'src/app/admin/services/personnels.service';
import { MatPaginator } from '@angular/material/paginator';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { ConstService } from 'src/app/admin/services/extension/Const.service';

export interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-creat-receipt',
  templateUrl: './creat-receipt.component.html',
  styleUrls: ['./creat-receipt.component.css']
})

export class CreatReceiptComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public pageSizeOptions = [5, 10, 15, 20];


  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public monthSelected;
  public yearSelected;
  // tr???ng th??i ch??i
  public status;
  // lo???i thu
  public receiptType;
  public receiptTypeSelected;

  // load L???p trong chi ti???t
  public classInReceiptDetail;

  // h???c vi??n
  public learners;
  public learnersSelected = null;
  public cardId;
  public address;

  // Nh??n vi??n
  public personels;

  // 2 c??i no???n no???n
  public receipt = {
    id: null,
    nameOfPaymentApplicant: null,
    collectionDate: null,
    totalAmount: null,
    status: null,
    note: null,
    receiptTypeId: null,
    personnelId: null,
    learnerId: null
  };
  public receiptDetail: Array<{
    month,
    year,
    tuition: number,
    fundMoney: number,
    infrastructureMoney: number,
    otherMoney: number,
    totalMoney: number,
    status,
    note,
    languageClassId,
    languageClassName
  }> = [];
  public month = (new Date().getMonth() + 1).toString();
  public year = new Date().getFullYear().toString();
  public tuition = 0;
  public fundMoney = 0;
  public infrastructureMoney = 0;
  public otherMoney = 0;
  public totalMoney = 0;
  public statusDetail = '1';
  public note;
  public languageClassId;
  public languageClassName;


  public receiptDetailTable;
  public dataSource = new MatTableDataSource(this.receiptDetail);
  public selection = new SelectionModel(true, []);


  displayedColumns1 = ['index', 'languageClassId', 'month', 'year', 'tuition', 'fundMoney',
    'infrastructureMoney', 'otherMoney', 'totalMoney', 'note', 'control'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

  }
  ///////////////////////////////
  public ResetReceiptDetail() {
    this.month = (new Date().getMonth() + 1).toString();
    this.year = new Date().getFullYear().toString();
    this.tuition = 0;
    this.fundMoney = 0;
    this.infrastructureMoney = 0;
    this.otherMoney = 0;
    this.totalMoney = 0;
    this.status = '1';
    this.note = null;
    this.languageClassId = null;
    this.receiptDetail.pop();
  }
  getTotalCost() {
    return this.receiptDetailTable.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }
  // L???y n??m
  public getAllYear() {
    for (let i = 2017; i <= 2999; i++) {
      this.years.push(i);
    }
  }
  // L???y loai thu
  public getReceiptType() {
    this.receiptTypeService.getAllReceiptType().subscribe((result: any) => {
      this.receiptType = result;
    }, error => {
    });
  }

  // l???y all h???c vi??n ???? c?? l???p
  public getAllLearner() {
    this.learnerService.getDaCoLop().subscribe((result: any) => {
      this.learners = result;
    }, error => {
    });
  }

  // l???y all nh??n vi??n
  public getAllPersonel() {
    this.personnelsService.getAllPersonnels().subscribe((result: any) => {
      this.personels = result;
    }, error => {
    });
  }

  // get status
  public getStatus() {
    this.status = [
      {
        name: 'Ho??n th??nh',
        code: 1
      },
      {
        name: 'Ch??a Ho??n th??nh',
        code: 0
      }
    ];
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
    private router: Router,
    private fomatDateService: FomatDateService,

  ) { }

  ngOnInit() {
    this.getAllYear();
    this.getStatus();
    this.getReceiptType();
    this.getAllLearner();
    this.getAllPersonel();
    this.receipt.status = '1';
    console.log(this.year);
    console.log(this.month);

  }

  // g?? m?? h???c vi??n ch???n ra h???c vi??n n??i t??m l???i thay ?????i th??ng tin h???c vi??n cho ????? l???ng nh???ng
  public ChangeInfoLearner() {
    this.learnerService.getLearnerCardIdReceipt(this.cardId).subscribe((result: any) => {
      if (result) {
        this.receipt.learnerId = result.id;
        this.address = result.address;
        this.getClassInReceiptDetail();
        this.ResetTableChange();
      }
      // tslint:disable-next-line: one-line
      else {
        this.notificationService.showNotification(3, 'Phi???u thu', 'Kh??ng t??m th???y m?? h???c vi??n n??y m???i ki???m tra l???i');
        this.address = null;
        this.receipt.learnerId = null;
        this.getClassInReceiptDetail();
        this.ResetTableChange();


      }

    }, error => {
      this.notificationService.showNotification(3, 'Phi???u thu', 'Kh??ng t??m th???y m?? h???c vi??n n??y m???i ki???m tra l???i');
      this.address = null;
      this.receipt.learnerId = null;
      this.getClassInReceiptDetail();
      this.ResetTableChange();


    });
    console.log(this.classInReceiptDetail);
  }
  public ChangeSelectLearner() {
    this.learnerService.getById(this.receipt.learnerId).subscribe((result: any) => {
      this.address = result.address;
      this.cardId = result.cardId;
    }, error => {
    });
    this.getClassInReceiptDetail();
    this.ResetTableChange();

    console.log(this.classInReceiptDetail);

  }
  public getClassInReceiptDetail() {
    this.studyProcessService.getLanguageClassOfLearner(this.receipt.learnerId).subscribe((result: any) => {
      this.classInReceiptDetail = result;
      console.log(this.classInReceiptDetail);
    }, error => {
    });
  }

  ResetTableChange() {
    for (let i = 0; i < this.receiptDetail.length; ++i) {

      this.receiptDetail.splice(i);
    }
    this.totalMoney = 0;
    this.tuition = 0;
    this.languageClassId = null;
    this.loadTables(this.receiptDetail);
    this.getTotalReceipt();

  }


  // ch??n data v??o table

  public ChangeSelectClassOfDetail() {
    this.languageClassesService.getById(this.languageClassId).subscribe((result: any) => {
      this.tuition = result.monthlyFee;
      this.languageClassName = result.name;
      console.log(this.tuition);
    }, error => {
    });

  }
  // ch??n data v??o table
  public insertRowInTable() {
    if (this.languageClassId != null) {
      this.receiptDetail.push({
        month: this.month,
        year: this.year,
        tuition: this.tuition,
        fundMoney: this.fundMoney,
        infrastructureMoney: this.infrastructureMoney,
        otherMoney: this.otherMoney,
        totalMoney: (+this.tuition + +this.fundMoney + +this.infrastructureMoney + +this.otherMoney),
        status: this.statusDetail,
        note: this.note,
        languageClassId: this.languageClassId,
        languageClassName: this.languageClassName
      });
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(3, 'Phi???u thu', 'H??y ch???n l???p');

    }
    this.fundMoney = 0;
    this.infrastructureMoney = 0;
    this.otherMoney = 0;
    this.totalMoney = 0;
    this.note = null;
    this.loadTables(this.receiptDetail);
    console.log(this.receiptDetail);
    this.getTotalReceipt();

  }

  // tinh t???ng ti???n cho phi???u thu
  public getTotalReceipt() {
    this.receipt.totalAmount = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.receiptDetail.length; ++i) {

      this.receipt.totalAmount += +this.receiptDetail[i].totalMoney;
    }
    console.log(this.receipt.totalAmount);
  }

  // delete row in table
  deleteRow(d) {
    const index = this.receiptDetail.indexOf(d);
    this.receiptDetail.splice(index, 1);
    this.loadTables(this.receiptDetail);
    this.notificationService.showNotification(1, 'Phi???u thu', '???? x??a');
    this.getTotalReceipt();

  }
  // delete all table
  deleteAllRow() {
    for (let i = 0; i < this.receiptDetail.length; ++i) {

      this.receiptDetail.splice(i);
    }
    this.loadTables(this.receiptDetail);
    this.notificationService.showNotification(1, 'Phi???u thu', '???? x??a');
    this.getTotalReceipt();

  }

  // b???t ?????u m??a phi???u thu
  public CreatReceipt() {
    this.receipt.collectionDate = this.fomatDateService.transformDate(this.receipt.collectionDate);
    if (this.receipt.nameOfPaymentApplicant != null
      && this.receipt.collectionDate != null
      && this.receipt.totalAmount != null
      && this.receipt.status != null
      && this.receipt.receiptTypeId != null
      && this.receipt.personnelId != null
      && this.receipt.learnerId != null && this.receiptDetail.length !== 0 ) {
      this.receiptsService.postReceipt(this.receipt, ConstService.user.id).subscribe((result: any) => {
        this.CreatReceiptDetail();
        this.notificationService.showNotification(1, 'Phi???u thu', '???? c???p nh???t phi???u thu');
        this.router.navigateByUrl('admin/receipt');

      }, error => {
      });
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(3, 'Phi???u thu', 'Ch??a nh???p ????? th??ng tin m???i ki???m tra l???i');

    }
  }
  // t???o chi ti???t thu
  public CreatReceiptDetail() {

    this.receiptDetailService.AddListReceiptDetail(this.receiptDetail).subscribe((result: any) => {
      this.notificationService.showNotification(1, 'Phi???u thu', '???? c???p nh???t chi ti???t');
    }, error => {
      this.notificationService.showNotification(3, 'Phi???u thu', 'L???i c???p nh???t chi ti???t');
    });
  }

  // ch??? nh???p s???
  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode === 189) {
      return false;
    }
    return true;

  }

}

