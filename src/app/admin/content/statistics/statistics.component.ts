import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LearnerService } from '../../services/learner.service';
import { StudyProcessService } from '../../services/study-process.service';
import { Router } from '@angular/router';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { LogStudyProcessService } from '../../services/logStudyProcess.service';
import { ReceiptsService } from '../../services/receipts.service';
import { DetailReceiptComponent } from '../search-studyprocess/dialog/detail-receipt/detail-receipt.component';
import { ReceiptDetailService } from 'src/app/admin/services/Receipt-Detail.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ConstService } from '../../services/extension/Const.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };
  public showProgressBar = true;
  public screenHeight: any;
  public screenWidth: any;
  public isOpenDialog = false;
  public pageSizeOptions = [10];
  public show = false;
  panelOpenState = false;

  public Diem;
  public class;
  public receipts;
  public receiptDetails;
  public logStudyProcess;
  public learner;
  public inforlearner = {
    id: '',
    cardId: '',
    firstName: '',
    lastName: '',
    birthday: null,
    sex: null,
    address: '',
    email: '',
    facebook: '',
    phone: '',
    status: null,
    parentFullName: '',
    parentPhone: '',
    image: '../../../../assets/admin/dist/img/user_def.png',
    note: '',
    guestTypeName: '',
  };

  public keyWord: '';

  // tslint:disable-next-line: member-ordering
  public displayedColumns: string[] = ['index', 'cardId', 'name', 'year', 'sex', 'guest'];
  // tslint:disable-next-line: member-ordering
  public dataSource = new MatTableDataSource([]);
  // tslint:disable-next-line: member-ordering
  public selection = new SelectionModel(true, []);


  public displayedColumnsReceipts: string[] = ['index', 'collectionDate', 'totalAmount', 'nameOfPaymentApplicant'];
  // tslint:disable-next-line: member-ordering
  public dataSourceReceipts = new MatTableDataSource([]);

  // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: max-line-length
  public displayedColumnsReceiptsDetail: string[] = ['index', 'languageClassName', 'month', 'tuition', 'fundMoney', 'infrastructureMoney', 'otherMoney', 'totalMoney'];
  // tslint:disable-next-line: member-ordering
  public dataSourceReceiptsDetail = new MatTableDataSource([]);

  // tslint:disable-next-line: max-line-length
  public displayedColumnsClass: string[] = ['index', 'className', 'startDay', 'endDay', 'status', 'controls'];
  // tslint:disable-next-line: member-ordering
  public dataSourceClass = new MatTableDataSource([]);

  // tslint:disable-next-line: max-line-length
  public displayedColumnsDiemDinhKi: string[] = ['index', 'week', 'point', 'averagePoint', 'sortedByPoint', 'sortedByAveragePoint'];




  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private learnerService: LearnerService,
    private studyProcessService: StudyProcessService,
    private notificationService: NotificationService,
    public matDialog: MatDialog,
    private confirmService: ConfirmService,
    private router: Router,
    private exchangeDataService: ExchangeDataService,
    private logStudyProcessService: LogStudyProcessService,
    private receiptsService: ReceiptsService,
    public receiptDetailService: ReceiptDetailService,
    public languageClassesService: LanguageClassesService,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1000);
  }

  ngOnInit() {
    this.getLearnerWithCondition(4);

    this.paginator._intl.itemsPerPageLabel = 'Kích thước trang';
  }

  public getLearnerWithCondition(id) {  //     Học viên : Hoạt động <1>,Hẹn đi học <2>,, Đã nghỉ <0>,
    this.startProgressBar();            //                       <status QTHT != 1>
    // tslint:disable-next-line: triple-equals
    if (id == 1) { // chưa có lớp  => QTHT khác 1
      this.learnerService.getChuaCoLop().subscribe(result => {
        this.learner = result;
        this.loadTables(result);
        this.stopProgressBar();
      }, error => {
        this.stopProgressBar();
      });
    }
    // tslint:disable-next-line: triple-equals
    if (id == 2) { // Đã nghỉ  => status học viên = 0 (Đã nghỉ)
      this.learnerService.getByStatus(0).subscribe(result => {
        this.learner = result;
        this.loadTables(result);
        this.stopProgressBar();
      }, error => {
        this.stopProgressBar();
      });
    }
    // tslint:disable-next-line: triple-equals
    if (id == 3) { // Hẹn đi học  => status học viên = 2 (Hẹn đi học)
      this.learnerService.getByStatus(2).subscribe(result => {
        this.learner = result;
        this.loadTables(result);
        this.stopProgressBar();
      }, error => {
        this.stopProgressBar();
      });
    }
    // tslint:disable-next-line: triple-equals
    if (id == 4) { // Đã có lớp  => status QTHT =1
      this.learnerService.getDaCoLop().subscribe(result => {
        this.learner = result;
        this.loadTables(result);
        this.stopProgressBar();
      }, error => {
        this.stopProgressBar();
      });
    }
  }

  public loadTables(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  // tìm kiếm khi click row
  public inforLearner(cardId) {
    this.getByCardId(cardId);
  }
  // tìm kiếm theo card Id
  public Find() {
    this.getByCardId(this.keyWord);
  }
  // thông tin học viên
  public getByCardId(cardId) {
    this.learnerService.getByCarrdId(cardId).subscribe((result: any) => {
      this.inforlearner.id = result.id;
      this.inforlearner.cardId = result.cardId;
      this.inforlearner.firstName = result.firstName;
      this.inforlearner.lastName = result.lastName;
      this.inforlearner.sex = result.sex;
      this.inforlearner.birthday = result.birthday;
      this.inforlearner.address = result.address;
      this.inforlearner.email = result.email;
      this.inforlearner.facebook = result.facebook;
      this.inforlearner.phone = result.phone;
      this.inforlearner.status = result.status;
      this.inforlearner.parentFullName = result.parentFullName;
      this.inforlearner.parentPhone = result.parentPhone;
      this.inforlearner.image = result.image;
      this.inforlearner.note = result.note;
      this.inforlearner.guestTypeName = result.guestTypeName;
      this.inforlearner.lastName = result.lastName;
      // gọi thông tin phiếu thu theo id
      this.getReceiptsByLearnerId(result.id);
      // gọi thông tin lớp đã học theo id học viên
      this.getClassStudied(result.id);
      // gọi thông tin điểm theo lớp đã học
      this.getDiemTheoLopDaHoc(result.id);
    }, error => {
      this.notificationService.showNotification(3, 'Tra cứu', 'Không tìm thấy mã sinh viên!');
    });
  }



  // quá trình đóng họ
  public getReceiptsByLearnerId(id) {
    this.receiptsService.getReceiptsByLearnerId(id).subscribe((result2: any) => {
      this.receipts = result2;
    }, error => {
    });
  }
  // chi tiết đóng họ
  public getReceiptDetailsByReceiptId(id) {
    this.receiptDetailService.getReceiptsDetailById(id).subscribe((result: any) => {
      this.receiptDetails = result;
      this.loadTablesReceiptsDetail(result);
    }, error => {
    });
  }
  public loadTablesReceiptsDetail(data3: any) {
    this.dataSourceReceiptsDetail = new MatTableDataSource(data3);
  }

  // Lớp đã học
  public getClassStudied(id) {
    this.languageClassesService.getLopDaHoc(id).subscribe((result4: any) => {
      this.class = result4;
      this.loadTablesClass(result4);
    }, error => {
    });
  }
  public loadTablesClass(data3: any) {
    this.dataSourceClass = new MatTableDataSource(data3);
  }

  // Điểm theo lớp đã học
  public getDiemTheoLopDaHoc(id) {
    this.learnerService.getDiem(id).subscribe((result4: any) => {
      this.Diem = result4;
    }, error => {
    });
  }


  // hàm ném dữ liệu
  createExchangeId(id) {
    this.exchangeDataService.changeId(id);
  }
  public addLearner() {
    this.router.navigateByUrl('admin/add-learner');
  }
  public editLeaerner() {
    this.createExchangeId(this.inforlearner.id);  // truyền
    this.router.navigateByUrl('admin/control-learner');
  }
  public deleteLeaerner() {
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
          this.learnerService.deleteLearner(this.inforlearner.id).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Học viên', 'Đã xóa học viên!'); });
            this.getLearnerWithCondition(4);
          }, error => {
            this.notificationService.showNotification(3, 'Học viên', 'Lỗi, Không xóa được!');
            this.stopProgressBar();
          });
        }
      });
    }
  }
  public moveStudyProcessWithClassId(id) {
    this.createExchangeId(id);  // truyền
    this.router.navigateByUrl('admin/study-process');
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Học viên')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;


  }
}
