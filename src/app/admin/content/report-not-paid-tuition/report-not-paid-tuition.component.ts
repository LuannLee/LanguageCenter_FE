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
  selector: 'app-report-not-paid-tuition',
  templateUrl: './report-not-paid-tuition.component.html',
  styleUrls: ['./report-not-paid-tuition.component.css']
})
export class ReportNotPaidTuitionComponent implements OnInit {
  public showProgressBar = false;

  public checkView = false;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];
  public classList;

  // để chuyển tháng năm and gán dữ liệu lên lable
  public monthSelected = (new Date().getMonth() + 1).toString();
  public yearSelected = new Date().getFullYear().toString();
  public classSelected;
  public className;

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
    this.getAllClass();
    this.getAllYear();

  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }
  // Lấy năm
  public getAllYear() {
    for (let i = 2017; i <= 2999; i++) {
      this.years.push(i);
    }
  }

  public ViewPrint() {
    if (this.classSelected != null && this.monthSelected != null && this.yearSelected != null) {
      this.load_infor_Classes();
      this.getReceiptDetailReport();
      this.stopProgressBar();
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Chọn đầy đủ thông tin');

    }
  }
  public getReceiptDetailReport() {
    this.startProgressBar();
    this.studyProcessService.getLearnerNotTution(this.monthSelected, this.yearSelected, this.classSelected).subscribe((result: any) => {
      this.receiptDetail = result;
      console.log(this.receiptDetail);
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
    }, error => {
      this.stopProgressBar();
    });
  }
  public PrintClick() {
    setTimeout(() => {
      // tslint:disable-next-line: prefer-const
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

  public load_infor_Classes() {
    if (this.classSelected != null) {
      this.languageClassesService.getById(this.classSelected).subscribe((result: any) => {
        this.className = result.name;
      }, error => {
      });
    }
  }

}
