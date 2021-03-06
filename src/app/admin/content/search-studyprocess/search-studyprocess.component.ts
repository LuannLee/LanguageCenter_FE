import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationService } from '../../services/extension/notification.service';
import { LogStudyProcessService } from '../../services/logStudyProcess.service';
import { LearnerService } from '../../services/learner.service';
import { ReceiptsService } from '../../services/receipts.service';
import { DetailReceiptComponent } from './dialog/detail-receipt/detail-receipt.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-search-studyprocess',
  templateUrl: './search-studyprocess.component.html',
  styleUrls: ['./search-studyprocess.component.css']
})
export class SearchStudyprocessComponent implements OnInit {
  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;

  public edited = false;

  public logStudyProcess;
  public receipts;
  public receiptsId;

  public receiptDetails ;

  public learner = {
    id: '',
    cardId: '',
    firstName: '',
    lastName: '',
    birthday: null,
    sex: null,
  };
  public keyWord = '';

  public isOpenDialog = false;

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'date', 'classId', 'courseName', 'className', 'manipulation', 'note'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource(this.logStudyProcess);

  // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: max-line-length
  public displayedColumnsReceipts: string[] = ['index', 'collectionDate', 'totalAmount', 'nameOfPaymentApplicant'];
  // tslint:disable-next-line: member-ordering
  public dataSourceReceipts = new MatTableDataSource(this.receipts);

  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);
  constructor(
    private notificationService: NotificationService,
    private logStudyProcessService: LogStudyProcessService,
    private learnerService: LearnerService,
    private receiptsService: ReceiptsService,
    public matDialog: MatDialog,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  panelOpenState = false;

  ngOnInit() {
  }

  public Find() {
    this.getInforLearner();
    this.getInforStudyProcess();
  }

  // qu?? tr??nh ????ng h???
  public getReceiptsByLearnerId(id) {
    this.receiptsService.getReceiptsByLearnerId(id).subscribe((result2: any) => {
      this.receipts = result2;
      this.loadTablesReceipts(result2);
    }, error => {
      this.notificationService.showNotification(3, 'Tra c???u', 'Kh??ng t??m th???y m?? sinh vi??n!');
    });
  }
  public loadTablesReceipts(data2: any) {
    this.dataSourceReceipts = new MatTableDataSource(data2);
  }
      // truy???n data chi ti???t
  public openDetail( detail: any) {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.7 * this.screenWidth;
      this.matDialog.open(DetailReceiptComponent,
        {
          width: `${widthMachine}px`,
          data: { _detail: detail }
        }).afterClosed().subscribe(result => {
          this.isOpenDialog = false;
          if (result) {
          }
        });
    }
  }



  // th??ng tin h???c vi??n theo cardId
  public getInforLearner() {
    this.learnerService.getByCarrdId(this.keyWord).subscribe((result: any) => {
      this.learner.id = result.id;
      this.learner.firstName = result.firstName;
      this.learner.lastName = result.lastName;
      this.learner.sex = result.sex;
      this.learner.birthday = result.birthday;
      this.learner.cardId = result.cardId;
      this.edited = true;
      console.log(result.id);
      this.getReceiptsByLearnerId(result.id);  // g???i phi???u c???a tk ????ng h???
    }, error => {
      this.notificationService.showNotification(3, 'Tra c???u', 'Kh??ng t??m th???y m?? sinh vi??n!');
    });
  }

  // qu?? tr??nh h???c t???p
  public getInforStudyProcess() {
    this.logStudyProcessService.getLogStudyProcess(this.keyWord, this.logStudyProcess).subscribe((result1: any) => {
      this.logStudyProcess = result1;
      this.loadTables(result1);
    }, error => {
      this.notificationService.showNotification(3, 'Tra c???u', 'Kh??ng t??m th???y m?? sinh vi??n!');
    });
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
  }


}
