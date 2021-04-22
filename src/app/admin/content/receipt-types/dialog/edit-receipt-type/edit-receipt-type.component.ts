import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ReceiptTypeService } from 'src/app/admin/services/receipt-type.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-receipt-type',
  templateUrl: './edit-receipt-type.component.html',
  styleUrls: ['./edit-receipt-type.component.css']
})
export class EditReceiptTypeComponent implements OnInit {

  public receiptType = {
    id: 0,
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  public editFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditReceiptTypeComponent>,
    private receiptTypeService: ReceiptTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService

  ) {
    this.setData();
  }

  public setData() {
    this.receiptType.id = this.data._receiptType.id;
    this.receiptType.name = this.data._receiptType.name;
    this.receiptType.status = this.data._receiptType.status;
    this.receiptType.note = this.data._receiptType.note;
  }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.editFormGroup = new FormGroup({
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

  public update_ReceiptType() {
    if (this.editFormGroup.valid) {
      this.receiptTypeService.putReceiptType(this.receiptType).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Loại thu', 'Cập nhật loại thu thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Loại thu', 'Lỗi, Cập nhật không thành công!');
      });
    } else {
      this.notificationService.showNotification(3, 'Loai phiếu thu', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }
}
