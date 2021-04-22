import { Component, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/admin/services/function.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { LoginService } from 'src/app/admin/services/login.service';

import { PermissionService } from 'src/app/admin/services/permission.service';
import { UserService } from 'src/app/admin/services/user.service';
@Component({
  selector: 'app-permissions-for-user',
  templateUrl: './permissions-for-user.component.html',
  styleUrls: ['./permissions-for-user.component.css']
})
export class PermissionsForUserComponent implements OnInit {
  panelOpenState = false;
  step = 0;
  groupFunctions;
  public listUser;
  userId = '72ce1231-9441-4072-0989-08d769e162d7';
  numberPer = 0;
  permissionsForUser;
  permissionList = {
    id: 0,
    appUserId: '',
    functionId: '',
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
    status: false
  };

  constructor(
    private functionService: FunctionService,
    private permissionService: PermissionService,
    private userService: UserService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private loginService: LoginService,
  ) {
    this.loginService.islogged();
  }


  ngOnInit() {
    this.getAllUser();
    this.getPermissionByBo();
  }

  // bò
  public getPermissionByBo() {
    this.permissionService.getPermissionByBoForUser(this.userId).subscribe(result => {
      this.permissionsForUser = result;
    }, error => {

    });

  }

  public getAllUser() {
    this.userService.getAllUser().subscribe(result => {
      this.listUser = result;
    }, error => {
    });
  }

  public ChangeUser() {
    this.getPermissionByBo();
  }

  // kết thúc bò

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  public changeAdd(childItem) {
    this.permissionService.putPermission(childItem).subscribe(result => {
      console.log('cặc');
    }, error => {
    });
  }
  public changeUpdate(childItem) {
    this.permissionService.putPermission(childItem).subscribe(result => {
      console.log('cặc');
    }, error => {
    });
  }
  public changeDelete(childItem) {
    this.permissionService.putPermission(childItem).subscribe(result => {
      console.log('cặc');
    }, error => {
    });
  }

  public changeRead(childItem) {
    this.permissionService.putPermission(childItem).subscribe(result => {
      console.log('cặc');
    }, error => {
    });
  }

  public changeStatus(childItem) {
    this.permissionService.putPermission(childItem).subscribe(result => {
      console.log('cặc');
    }, error => {
    });
  }
}
