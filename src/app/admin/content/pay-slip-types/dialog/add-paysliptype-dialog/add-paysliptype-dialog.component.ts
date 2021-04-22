import { NotificationService } from './../../../../services/extension/notification.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PaySlipTypeService } from 'src/app/admin/services/pay-slip-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-paysliptype-dialog',
  templateUrl: './add-paysliptype-dialog.component.html',
  styleUrls: ['./add-paysliptype-dialog.component.css']
})
export class AddPaysliptypeDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  public paysliptype = {
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  public statusSelected;
  public paysliptypeFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddPaysliptypeDialogComponent>,
    private paySlipTypeService: PaySlipTypeService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.paysliptypeFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.initLectureForm();
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Ngừng hoạt động',
        value: 0
      }
    ];
  }

  public create_Paysliptype() {
    if (this.paysliptypeFormGroup.valid) {
      this.paySlipTypeService.postPaySlipType(this.paysliptype).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Loại chi', 'Tạo thành công loại chi!'); });
        this.dialogRef.close(true);
      });
    } else {
      this.notificationService.showNotification(3, 'Loai phiếu chi', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }
}
