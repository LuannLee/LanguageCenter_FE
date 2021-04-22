import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { LoginService } from 'src/app/admin/services/login.service';
import { UserService } from 'src/app/admin/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PermissionService } from 'src/app/admin/services/permission.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent implements OnInit {

  public accountFormGroup: FormGroup;

  screenHeight: any;
  screenWidth: any;
  public status = [];

  public user = {
    userName: '',
    email: '',
    fullName: '',
    phoneNumber: '',
    birthDay: new Date(),
    balance: 0,
    avatar: '',
    dateCreated: new Date(),
    dateModified: new Date(),
    status: 1,
    password: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private userService: UserService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService,
    private permissionService: PermissionService,
  ) { }

  ngOnInit() {
    this.getAllStatus();
    this.initAccountForm();
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


  public createAccount() {
    if (this.accountFormGroup.valid) {
      this.userService.postUser(this.user).subscribe(result => {
        this.createFunctionInPermission();
        setTimeout(() => { this.notificationService.showNotification(1, 'Tài khoản', 'Tạo thành công tài khoản mới!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Tài khoản', 'Lỗi, tạo mới thất bại!');
      });
    }
  }

  public createFunctionInPermission() {
    this.permissionService.createFunctionInPermission().subscribe(result => {
    }, error => {

    });
  }
}
