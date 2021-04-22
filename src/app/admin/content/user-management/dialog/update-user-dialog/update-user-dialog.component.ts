import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/admin/services/user.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { LoginService } from 'src/app/admin/services/login.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {

  public accountFormGroup: FormGroup;

  public user;
  screenHeight: any;
  screenWidth: any;
  public status = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<UpdateUserDialogComponent>,
    private userService: UserService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService
  ) {
    this.user = this.data._user;
    console.log(this.data._user);
  }

  ngOnInit() {
    this.initAccountForm();
    this.getAllStatus();
  }

  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Khóa',
        value: 0
      }
    ];
  }
  private initAccountForm() {
    this.accountFormGroup = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      fullName: new FormControl(null, [Validators.required]),
      // tslint:disable-next-line: max-line-length
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/[0-9\+\-\ ]/), Validators.minLength(10)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      status: new FormControl(null, [Validators.required]),
    });
  }


  public updateAccount() {
    if (this.accountFormGroup.valid) {
      this.userService.putUser(this.user).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Tài khoản', 'Cập nhật thành công tài khoản!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Tài khoản', 'Lỗi, cập nhật thất bại!');
      });
    }
  }
}
