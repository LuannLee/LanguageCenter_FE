import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SalaryRollpayService } from '../../services/salary-rollpay.service';
import { SelectionModel } from '@angular/cdk/collections';
import { TimeSheetService } from '../../services/time-sheet.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/extension/notification.service';
@Component({
  selector: 'app-roll-pay',
  templateUrl: './roll-pay.component.html',
  styleUrls: ['./roll-pay.component.css'],
})
export class RollPayComponent implements OnInit {
  public showProgressBar = true;

  public timeSheets = [];
  public salaryLecturerPaied = [];
  // để tìm kiếm
  public monthSearch;
  public yearSearch;
  public months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public years = [];

  public isBangLuong = true;
  public chamcong;

  public overviewRollPay = {
    totalOfMonth: 25,
    totalOfStaffsPaid: 0,
    totalOfStaffsNotPaid: 0,
    totalOfLecturersPaid: 0,
    totalOfLecturersNotPaid: 0,
    totalMoney: 0,
    totalMoneyPersonel: 0,
    totalMoneyPersonelPaid: 0,
    totalMoneyPersonelNotPaid: 0,
    totalMoneyLecture: 0,
    totalMoneyLecturePaid: 0,
    totalMoneyLectureNotPaid: 0,
  };

  public payRollForPersonnel; // Bảng lương cho NV chưa xét duyệt
  public payRollForPersonnelOK; // Bảng lương cho NV
  public payRollForLecture; // Bảng lương cho GV
  public payRollForLectureOK; // Bảng lương cho GV

  // tslint:disable-next-line: max-line-length
  BangLuongNhanVienColumns: string[] = ['index', 'name', 'position', 'salary', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdays', 'totalSalary', 'advancePayment', 'totalActualSalary'];
  BangLuongNhanVienDataSource = new MatTableDataSource([]);

  // tslint:disable-next-line: max-line-length
  XetDuyetNhanVienColumns: string[] = ['index', 'name', 'position', 'salary', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdays', 'totalSalary', 'advancePayment', 'totalActualSalary', 'select'];
  XetDuyetNhanVienDataSource = new MatTableDataSource([]);

  // tslint:disable-next-line: max-line-length
  BangLuongGiaoVienColumns: string[] = ['index', 'name', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdays', 'totalGiangday', 'totalSalary', 'advancePayment', 'totalActualSalary'];
  BangLuongGiaoVienDataSource = new MatTableDataSource([]);

  // tslint:disable-next-line: max-line-length
  XetDuyetGiaoVienColumns: string[] = ['index', 'name', 'allowance', 'bonus', 'insurancePremiums', 'totalWorkdays', 'totalGiangday', 'totalSalary', 'advancePayment', 'totalActualSalary', 'select'];
  XetDuyetGiaoVienDataSource = new MatTableDataSource([]);

  public selection = new SelectionModel(true, []);
  public selectionGV = new SelectionModel(true, []);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private salaryRollpayService: SalaryRollpayService,
    private timeSheetService: TimeSheetService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.monthSearch = new Date().getMonth() + 1;
    this.yearSearch = new Date().getFullYear();
    this.getAllYear();
    this.getPersonnelChuaXetDuyet();
    this.getPersonnelDaXetDuyet();
    this.getLectureChuaXetDuyet();
    this.getLectureDaXetDuyet();
  }

  //#region Checkbox
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.XetDuyetNhanVienDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.XetDuyetNhanVienDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelectedGV() { // giáo viên
    const numSelected = this.selectionGV.selected.length;
    const numRows = this.XetDuyetGiaoVienDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleGV() {  // giáo viên
    this.isAllSelectedGV() ?
      this.selectionGV.clear() :
      this.XetDuyetGiaoVienDataSource.data.forEach(row => this.selectionGV.select(row));
  }
  //#endregion

  //#region update chấm công khi sửa thưởng và phụ cấp.  id chấm công nhân viên, update luong giáo viên
  public updatePeriodicPoint(chamcongId, phucap, thuong) {
    this.timeSheetService.getById(chamcongId).subscribe(result => {
      this.chamcong = result;
      this.chamcong.allowance = phucap;
      this.chamcong.bonus = thuong;
      this.updateChamCong();
    }, error => {
    });
  }

  public updateChamCong() {
    this.timeSheetService.putTimeSheet(this.chamcong).subscribe(result => {
      this.getPersonnelChuaXetDuyet();
    }, error => {
    });
  }

  public updateLuong(bien) {
    bien.salary.totalTheoreticalAmount = bien.salary.totalAllowance + bien.salary.totalBonus + bien.salary.totalGiangday;
    bien.salary.totalInsurancePremium = bien.salary.totalTheoreticalAmount * 0.08;
    // tslint:disable-next-line: max-line-length
    bien.salary.totalRealityAmount = bien.salary.totalTheoreticalAmount - bien.salary.totalInsurancePremium - bien.salary.totalAdvancePayment;
  }
  //#endregion

  //#region Click button

  // click nút đã xét duyệt
  public ClickDaXetDuyet() {
    this.isBangLuong = true;
    this.getPersonnelDaXetDuyet();
    this.getLectureDaXetDuyet();
  }

  // click nút chưa xét duyệt
  public ClickChuaXetDuyet() {
    this.isBangLuong = false;
    this.getPersonnelChuaXetDuyet();
    this.getLectureChuaXetDuyet();
  }

  public TimKiem() {
    this.getPersonnelChuaXetDuyet();
    this.getPersonnelDaXetDuyet();
    this.getLectureChuaXetDuyet();
    this.getLectureDaXetDuyet();
  }

  // Cập nhật list xét duyệt vào bảng nhân viên
  public updateSalaryPaied() {
    this.timeSheets = [];
    // tslint:disable-next-line: no-shadowed-variable
    this.selection.selected.forEach((element: any) => {
      this.timeSheets.push(element.salary.id);
    });
    this.salaryRollpayService.PostRollPay(this.timeSheets).subscribe(result => {
      this.getPersonnelChuaXetDuyet();
      this.selection.clear();
      setTimeout(() => { this.notificationService.showNotification(1, 'Xét duyệt', 'Xét duyệt lương thành công!'); });
    }, error => {
      this.notificationService.showNotification(3, 'Xét duyệt', 'Xét duyệt lương không thành công!');
    });
  }

  // Cập nhật list xét duyệt vào bảng giáo viên
  public updateLecturePaied() {
    this.salaryLecturerPaied = [];
    console.log(this.selectionGV.selected);
    // tslint:disable-next-line: no-shadowed-variable
    this.selectionGV.selected.forEach((element: any) => {
      this.salaryLecturerPaied.push(element.salary);
    });
    this.salaryRollpayService.PostRollPayLecturers(this.salaryLecturerPaied).subscribe(result => {
      this.getLectureChuaXetDuyet();
      this.selectionGV.clear();
      setTimeout(() => { this.notificationService.showNotification(1, 'Xét duyệt', 'Xét duyệt lương thành công!'); });
    }, error => {
      this.notificationService.showNotification(3, 'Xét duyệt', 'Xét duyệt lương không thành công!');
    });
  }

  // Xem chấm công
  XemChamCong() {
    this.router.navigateByUrl('admin/time-sheet');
  }
  //#endregion

  //#region Lấy danh sách  lương Nhân viên
  // DS nhân viên chưa xét duyệt
  public getPersonnelChuaXetDuyet() {
    this.salaryRollpayService.ListChuaXetDuyet(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.payRollForPersonnel = result;
      this.SoNguoi();
      this.loadTablePersonnel(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  // DS nhân viên đã xét duyệt
  public getPersonnelDaXetDuyet() {
    this.salaryRollpayService.ListDaXetDuyet(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.payRollForPersonnelOK = result;
      this.SoNguoi();
      this.loadTablePersonnelOK(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  // load data nhân viên chưa xét duyệt
  public loadTablePersonnel(data: any) {
    this.XetDuyetNhanVienDataSource = new MatTableDataSource(data);
  }
  // load data nhân viên đã xét duyệt
  public loadTablePersonnelOK(data: any) {
    this.BangLuongNhanVienDataSource = new MatTableDataSource(data);
  }
  //#endregion

  //#region Lấy danh sách  lương Giáo viên -
  public getLectureChuaXetDuyet() {
    this.salaryRollpayService.ListChuaXetDuyetGiaoVien(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.payRollForLecture = result;
      this.SoNguoi();
      this.loadTableLecture(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  // DS giáo viên đã xét duyệt
  public getLectureDaXetDuyet() {
    // log
    this.salaryRollpayService.ListDaXetDuyetGiaoVien(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.payRollForLectureOK = result;
      this.SoNguoi();
      this.loadTableLectureOK(result);
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  // load data giáo viên chưa xét duyệt
  public loadTableLecture(data: any) {
    this.XetDuyetGiaoVienDataSource = new MatTableDataSource(data);
  }

  // load data giáo viên đã xét duyệt
  public loadTableLectureOK(data: any) {
    this.BangLuongGiaoVienDataSource = new MatTableDataSource(data);
  }

  public SoNguoi() {
    this.salaryRollpayService.ListChuaXetDuyet(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.overviewRollPay.totalOfStaffsNotPaid = result.length;
      this.overviewRollPay.totalMoneyPersonelNotPaid = 0;
      // tslint:disable-next-line: prefer-for-of
      result.forEach(item => {
        this.overviewRollPay.totalMoneyPersonelNotPaid += item.salary.totalRealityAmount;
      });
    }); // tổng nhân viên chưa xét duyệt
    this.salaryRollpayService.ListDaXetDuyet(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.overviewRollPay.totalOfStaffsPaid = result.length;
      this.overviewRollPay.totalMoneyPersonelPaid = 0;
      result.forEach(item => {
        this.overviewRollPay.totalMoneyPersonelPaid += item.salary.totalRealityAmount;
      });
    }); // tổng nhân viên đã xét duyệt

    this.salaryRollpayService.ListChuaXetDuyetGiaoVien(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.overviewRollPay.totalOfLecturersNotPaid = result.length;
      this.overviewRollPay.totalMoneyLectureNotPaid = 0;
      result.forEach(item => {
        this.overviewRollPay.totalMoneyLectureNotPaid += item.salary.totalRealityAmount;
      });
    }); // tổng giáo viên chưa xét duyệt

    this.salaryRollpayService.ListDaXetDuyetGiaoVien(this.monthSearch, this.yearSearch).subscribe((result: any) => {
      this.overviewRollPay.totalOfLecturersPaid = result.length;
      this.overviewRollPay.totalMoneyLecturePaid = 0;
      result.forEach(item => {
        this.overviewRollPay.totalMoneyLecturePaid += item.salary.totalRealityAmount;
      });
    }); // tổng giáo viên đã xét duyệt

  }
  //#endregion

  //#region Linh tinh
  // Lấy năm
  public getAllYear() {
    for (let i = 2018; i <= 2030; i++) {
      this.years.push(i);
    }
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }
  public stopProgressBar() {
    this.showProgressBar = false;
  }
  //#endregion


}
