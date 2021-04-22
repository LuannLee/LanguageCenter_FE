import { trigger } from '@angular/animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReceiptTypeService } from '../../services/receipt-type.service';
import { ReceiptsService } from '../../services/receipts.service';
import { ReceiptDetailService } from '../../services/Receipt-Detail.service';
import { LearnerService } from '../../services/learner.service';
import { PersonnelsService } from '../../services/personnels.service';
import { StudyProcessService } from '../../services/study-process.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../../services/extension/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from '../../services/login.service';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { FomatDateService } from '../../services/extension/FomatDate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report-tuition-learning',
  templateUrl: './report-tuition-learning.component.html',
  styleUrls: ['./report-tuition-learning.component.css']
})
export class ReportTuitionLearningComponent implements OnInit {
  public showProgressBar = false;

  public checkView = false;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  // để chuyển tháng năm and gán dữ liệu lên lable
  public monthSelected = (new Date().getMonth() + 1).toString();
  public yearSelected = new Date().getFullYear().toString();

  public totalTuition = 0;
  public totalFunMoney = 0;
  public totalInfrastructureMoney = 0;
  public totalOtherMoney = 0;
  public totalTotal = 0;

  public receiptDetail;
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

  }

  ngOnInit() {
    this.getAllYear();
  }

  // Lấy năm
  public getAllYear() {
    for (let i = 2017; i <= 2999; i++) {
      this.years.push(i);
    }
  }

  public getReceiptDetailReport() {
    this.totalTuition = 0;
    this.totalFunMoney = 0;
    this.totalInfrastructureMoney = 0;
    this.totalOtherMoney = 0;
    this.totalTotal = 0;
    this.startProgressBar();
    this.receiptDetailService.getReceiptsDetailForReport(this.monthSelected, this.yearSelected).subscribe((result: any) => {
      this.receiptDetail = result;
      this.getTotal();
      // tslint:disable-next-line: triple-equals
      if (this.receiptDetail.length != 0) {
        this.checkView = true;
        this.PrintClick();
      }
      // tslint:disable-next-line: one-line
      else{
        this.checkView = false;
        this.notificationService.showNotification(3, 'Báo cáo', 'Lỗi, không tìm thấy danh sách');

      }
      this.stopProgressBar();
      console.log(this.receiptDetail);
    }, error => {
      this.stopProgressBar();
    });
  }

  public getTotal() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.receiptDetail.length; ++i) {
      this.totalTuition += this.receiptDetail[i].tuition;
      this.totalFunMoney += this.receiptDetail[i].fundMoney;
      this.totalInfrastructureMoney += this.receiptDetail[i].infrastructureMoney;
      this.totalOtherMoney += this.receiptDetail[i].otherMoney;
      this.totalTotal += this.receiptDetail[i].totalMoney;
      console.log(this.totalTuition);
    }
  }
  public PrintClick() {
    setTimeout(() => {
      let el: HTMLElement = document.getElementById('printClick');
      el.click();
    }, 1000);
  }
  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
