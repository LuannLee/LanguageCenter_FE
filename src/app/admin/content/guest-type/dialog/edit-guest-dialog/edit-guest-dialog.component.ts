import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { GuestTypeService } from 'src/app/admin/services/guest-type.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

@Component({
  selector: 'app-edit-guest-dialog',
  templateUrl: './edit-guest-dialog.component.html',
  styleUrls: ['./edit-guest-dialog.component.css']
})
export class EditGuestDialogComponent implements OnInit {

  public guestFormGroup: FormGroup;
  public status;
  screenHeight: any;
  screenWidth: any;

  public guest = {
    id: '',
    name: '',
    status: 0
  };

  private initLearnerForm() {
    this.guestFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required])
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditGuestDialogComponent>,
    private guestTypeService: GuestTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }


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

  ngOnInit() {
    this.initLearnerForm();
    this.getAllStatus();
    this.guest.id = this.data._guest.id;
    this.guest.name = this.data._guest.name;
    this.guest.status = this.data._guest.status;
  }

  public updateGuestType() {
    if (this.guestFormGroup.valid) {
      this.guestTypeService.putGuestType(this.guest).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Đối tượng', 'Cập nhật thành công đối tượng!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Đối tượng', 'Lỗi, cập nhật thất bại!');
      });
    }
  }
}
