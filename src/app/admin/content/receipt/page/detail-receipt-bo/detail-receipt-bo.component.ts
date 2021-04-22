import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { ReceiptTypeService } from 'src/app/admin/services/receipt-type.service';
import { ReceiptsService } from 'src/app/admin/services/receipts.service';
import { ReceiptDetailService } from 'src/app/admin/services/Receipt-Detail.service';
import { LearnerService } from 'src/app/admin/services/learner.service';
import { PersonnelsService } from 'src/app/admin/services/personnels.service';
import { StudyProcessService } from 'src/app/admin/services/study-process.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginService } from 'src/app/admin/services/login.service';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { ConstService } from 'src/app/admin/services/extension/Const.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { stringify } from 'querystring';
import { TestReportComponent } from '../../../test-report/test-report.component';

@Component({
  selector: 'app-detail-receipt-bo',
  templateUrl: './detail-receipt-bo.component.html',
  styleUrls: ['./detail-receipt-bo.component.css']
})
export class DetailReceiptBoComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public pageSizeOptions = [5, 10, 15, 20];


  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public monthSelected;
  public yearSelected;
  // trạng thái chơi
  public status;
  // loại thu
  public receiptType;
  public receiptTypeSelected;

  // load Lớp trong chi tiết
  public classInReceiptDetail;

  // học viên
  public learners;
  public learnersSelected = null;
  public cardId;
  public address;

  // Nhân viên
  public personels;

  // 2 cái noằn noằn
  public receipt = {
    id: null,
    nameOfPaymentApplicant: null,
    collectionDate: null,
    totalAmount: null,
    status: null,
    note: null,
    receiptTypeId: null,
    personnelId: null,
    learnerId: null,
    appUserId: null,
    learnerName: null,
    personnelName: null,
    learnerPhone: null
  };

  public receiptDetail;

  public receiptDetailTable;
  public dataSource = new MatTableDataSource(this.receiptDetail);
  public selection = new SelectionModel(true, []);


  displayedColumns1 = ['index', 'languageClassId', 'month', 'year', 'tuition', 'fundMoney',
    'infrastructureMoney', 'otherMoney', 'totalMoney', 'note'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;

  }

  // Lấy năm
  public getAllYear() {
    for (let i = 2017; i <= 2999; i++) {
      this.years.push(i);
    }
  }
  // Lấy loai thu
  public getReceiptType() {
    this.receiptTypeService.getAllReceiptType().subscribe((result: any) => {
      this.receiptType = result;
    }, error => {
    });
  }

  // lấy all học viên đã có lớp
  public getAllLearner() {
    this.learnerService.getDaCoLop().subscribe((result: any) => {
      this.learners = result;
    }, error => {
    });
  }

  // lấy all nhân viên
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
        name: 'Hoàn thành',
        code: 1
      },
      {
        name: 'Chưa Hoàn thành',
        code: 0
      }
    ];
  }

  // tslint:disable-next-line: member-ordering
  @ViewChild(TestReportComponent, { static: true }) private testReportComponent: TestReportComponent;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
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
    private dialogRef: MatDialogRef<DetailReceiptBoComponent>,
  ) {
    this.setData();
  }

  ngOnInit() {
    this.getAllYear();
    this.getStatus();
    this.getReceiptType();
    this.getAllLearner();
    this.getAllPersonel();
    this.getReceiptDetail();
  }

  public setData() {
    this.receipt.id = this.data._receipt.id;
    this.receipt.nameOfPaymentApplicant = this.data._receipt.nameOfPaymentApplicant;
    this.receipt.collectionDate = this.data._receipt.collectionDate;
    this.receipt.totalAmount = this.data._receipt.totalAmount;
    this.receipt.receiptTypeId = String(this.data._receipt.receiptTypeId);
    this.receipt.personnelId = this.data._receipt.personnelId;
    this.receipt.learnerId = this.data._receipt.learnerId;
    this.receipt.status = String(this.data._receipt.status);
    this.receipt.note = this.data._receipt.note;
    this.cardId = this.data._receipt.learnerCardId;
    this.address = this.data._receipt.learnerAdress;
    this.receipt.appUserId = ConstService.user.id;
    this.receipt.learnerName = this.data._receipt.learnerName;
    this.receipt.personnelName = this.data._receipt.personnelName;
    this.receipt.learnerPhone = this.data._receipt.learnerPhone;
    console.log(this.receipt.receiptTypeId);
    console.log(this.receipt.status);
    console.log(this.receipt.learnerId);
  }

  public getReceiptDetail() {
    this.receiptDetailService.getReceiptsDetailForReceipt(this.receipt.id).subscribe((result: any) => {
      this.receiptDetail = result;
      this.loadTables(result);
    }, error => {
    });
  }

  public UpdateStatus() {
    this.receiptsService.putReceipt(this.receipt).subscribe((result: any) => {
      this.notificationService.showNotification(1, 'Phiếu thu', 'Đã cập nhật');
    }, error => {
    });
  }

  public PrintReceipt() {
  }
}
