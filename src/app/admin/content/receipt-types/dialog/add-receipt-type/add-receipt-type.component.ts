import { NotificationService } from './../../../../services/extension/notification.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ReceiptTypeService } from 'src/app/admin/services/receipt-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-receipt-type',
  templateUrl: './add-receipt-type.component.html',
  styleUrls: ['./add-receipt-type.component.css']
})
export class AddReceiptTypeComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;

  public receiptType = {
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  public statusSelected;
  public receiptTypeFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddReceiptTypeComponent>,
    private receiptTypeService: ReceiptTypeService,
    private notificationService: NotificationService,
  ) { }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.receiptTypeFormGroup = new FormGroup({
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

  public create_ReceiptType() {
    if (this.receiptTypeFormGroup.valid) {
      this.receiptTypeService.postReceiptType(this.receiptType).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Loại phiếu thu', 'Tạo thành công loại thu!'); });
        this.dialogRef.close(true);
      });
    } else {
      this.notificationService.showNotification(3, 'Loại phiếu thu', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }
}
