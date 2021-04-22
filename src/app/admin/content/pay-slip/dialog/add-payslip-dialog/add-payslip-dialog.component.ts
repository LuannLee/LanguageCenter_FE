import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

import { PaySlipTypeService } from './../../../../services/pay-slip-type.service';
import { PaySlipService } from './../../../../services/pay-slip.service';
import { PaySlipComponent } from '../../pay-slip.component';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { PersonnelsService } from './../../../../services/personnels.service';
import { LecturersService } from './../../../../services/lecturers.service';
import { ConstService } from 'src/app/admin/services/extension/Const.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-payslip-dialog',
  templateUrl: './add-payslip-dialog.component.html',
  styleUrls: ['./add-payslip-dialog.component.css']
})
export class AddPayslipDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  public paySlip = {
    //    id: '',
    content: '',
    date: null,
    receiver: '',
    total: null,
    status: null,
    note: '',
    paySlipTypeId: null,
    appUserId: null,
    personnelId: '',
    receivePersonnelId: null,
    receiveLecturerId: null,
  };
  public cardIdPersonnel;
  public cardIdLecturer;
  public checkma = true;
  public select;
  public paySlipType;
  public personnel;
  public status = [];
  public statusSelected;
  public paySlipFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddPayslipDialogComponent>,
    private paySlipService: PaySlipService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private paySlipTypeService: PaySlipTypeService,
    private personnelService: PersonnelsService,
    private lecturersService: LecturersService,
  ) { }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.paySlipFormGroup = new FormGroup({
      personnelId: new FormControl(null, [Validators.required]),
      paySlipTypeId: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      receiver: new FormControl(),
      receiveLecturerId: new FormControl(),
      receivePersonnelId: new FormControl(),
      total: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }
  ngOnInit() {
    this.getAllStatus();
    this.getPaySlipTypes();
    this.getPersonnel();
    this.initLectureForm();
    this.paySlip.date = new Date();
    this.paySlip.appUserId = ConstService.user.id;
  }
  /////////////////////////
  public getPersonnel() {
    this.personnelService.getAllPersonnels().subscribe(result => {
      this.personnel = result;
    }, error => {
    });
  }

  public getPaySlipTypes() {
    this.paySlipTypeService.getAllPaySlipTypes().subscribe(result => {
      this.paySlipType = result;
    }, error => {
    });
  }
  public getAllStatus() {
    this.status = [
      {
        name: 'Hoàn thành',
        code: 1
      },
      {
        name: 'Chờ xử lý',
        code: 2
      },
      {
        name: 'Đã hủy',
        code: 0
      }
    ];
  }

  public create_PaySlip() {
    if (this.paySlipFormGroup.valid) {
      if (this.checkma) {
        console.log(this.paySlip.receivePersonnelId);
        this.paySlipService.postPaySlip(this.paySlip).subscribe(result => {
          setTimeout(() => { this.notificationService.showNotification(1, 'Phiếu chi', 'Tạo thành công phiếu chi!'); });
          this.dialogRef.close(true);
        }, error => {
          this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Tạo không thành công!');
        });
      } else {
        this.notificationService.showNotification(2, 'Phiếu chi', 'Lỗi, Mã NV/GV không hợp lệ !');
      }

    } else {
      this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

  public findNhanVien(key) {
    // tslint:disable-next-line: triple-equals
    if (key.key === 'Enter') {
      // tìm kiếim nhân vên có card id kia
      this.personnelService.getPersonnelByCardId(this.cardIdPersonnel).subscribe((result: any) => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Nhân viên', 'Tìm thấy nhân viên'); });
        this.checkma = true;
        this.paySlip.receivePersonnelId = result.id;
        this.paySlip.receiver = result.firstName + ' ' + result.lastName;
      }, error => {
        this.notificationService.showNotification(2, 'Phiếu chi', 'Lỗi, Mã NV không hợp lệ !');
        this.checkma = false;
      });
    }
  }

  public findGiaoVien(key) {
    // tslint:disable-next-line: triple-equals
    if (key.key === 'Enter') {
      // tìm kiếim nhân vên có card id kia
      this.lecturersService.getLectureByCardId(this.cardIdLecturer).subscribe((result: any) => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Giáo viên', 'Tìm thấy giáo viên'); });
        this.checkma = true;
        this.paySlip.receiveLecturerId = result.id;
        this.paySlip.receiver = result.firstName + ' ' + result.lastName;
      }, error => {
        this.notificationService.showNotification(2, 'Giáo viên', 'Lỗi, Mã GV không hợp lệ !');
        this.checkma = false;
      });
    }
  }


  public chinhanvien() {
    this.select = false;
  }

  public chigiaovien() {
    this.select = true;
  }
}
