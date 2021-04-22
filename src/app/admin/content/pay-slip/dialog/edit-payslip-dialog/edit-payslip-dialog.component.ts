import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

import { PaySlipTypeService } from './../../../../services/pay-slip-type.service';
import { PaySlipService } from './../../../../services/pay-slip.service';
import { PaySlipComponent } from '../../pay-slip.component';
import { dateToLocalArray } from '@fullcalendar/core/datelib/marker';
import { PersonnelsService } from './../../../../services/personnels.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-payslip-dialog',
  templateUrl: './edit-payslip-dialog.component.html',
  styleUrls: ['./edit-payslip-dialog.component.css']
})
export class EditPayslipDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  public paySlip = {
    id: '',
    content: '',
    date: null,
    receiver: '',
    total: null,
    status: null,
    note: '',
    paySlipTypeId: null,
    appUserId: null,
    personnelId: '',
    sendPersonnelId: ''
  };
  public tenloaichi;
  public tennhanvien;
  public personnel;
  public paySlipType;
  public status = [];
  public statusSelected;
  public paySlipFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditPayslipDialogComponent>,
    private paySlipService: PaySlipService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private paySlipTypeService: PaySlipTypeService,
    private personnelComponent: PersonnelsService,
  ) {
    this.setData();
  }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.paySlipFormGroup = new FormGroup({
      personnelId: new FormControl(null, [Validators.required]),
      paySlipTypeId: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      receiver: new FormControl(),
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
    this.getLoaichi();
    this.getNhanVienChi();
  }

  public getLoaichi() {
    this.paySlipTypeService.getById(this.paySlip.paySlipTypeId).subscribe((result: any) => {
      this.tenloaichi = result.name;
    }, error => {
    });
  }

  public getNhanVienChi() {
    this.personnelComponent.getPersonnelId(this.paySlip.personnelId).subscribe((result: any) => {
      this.tennhanvien = result.firstName + result.lastName;
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
  public getPersonnel() {
    this.personnelComponent.getAllPersonnels().subscribe(result => {
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

  public setData() {
    this.paySlip.id = this.data._paySlip.id;
    this.paySlip.content = this.data._paySlip.content;
    this.paySlip.total = this.data._paySlip.total;
    this.paySlip.date = this.data._paySlip.date;
    this.paySlip.receiver = this.data._paySlip.receiver;
    this.paySlip.status = this.data._paySlip.status;
    this.paySlip.note = this.data._paySlip.note;
    this.paySlip.paySlipTypeId = this.data._paySlip.paySlipTypeId;
    this.paySlip.appUserId = this.data._paySlip.appUserId;
    this.paySlip.personnelId = this.data._paySlip.personnelId;
    this.paySlip.sendPersonnelId = this.data._paySlip.sendPersonnelId;
  }

  public update_PaySlip() {
    if (this.paySlipFormGroup.valid) {
      this.paySlipService.putPaySlip(this.paySlip).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Phiếu chi', 'Cập nhật phiếu chi thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Cập nhật không thành công!');
      });
    } else {
      this.notificationService.showNotification(3, 'Phiếu chi', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

}
