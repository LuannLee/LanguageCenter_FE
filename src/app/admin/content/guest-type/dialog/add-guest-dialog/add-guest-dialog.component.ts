import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GuestTypeService } from 'src/app/admin/services/guest-type.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

@Component({
  selector: 'app-add-guest-dialog',
  templateUrl: './add-guest-dialog.component.html',
  styleUrls: ['./add-guest-dialog.component.css']
})
export class AddGuestDialogComponent implements OnInit {

  public guestFormGroup: FormGroup;

  screenHeight: any;
  screenWidth: any;

  public guest = {
    name: '',
  };


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddGuestDialogComponent>,
    private guestTypeService: GuestTypeService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  private initLearnerForm() {
    this.guestFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit() {
    this.initLearnerForm();
  }

  public createGuestType() {
    if (this.guestFormGroup.valid) {
      this.guestTypeService.postGuestType(this.guest).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Đối tượng', 'Tạo thành công đối tượng!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Đối tượng', 'Lỗi, tạo mới thất bại!');
      });
    }
  }
}
