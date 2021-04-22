import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmService } from '../../services/extension/confirm.service';
import { NotificationService } from '../../services/extension/notification.service';
import { UserService } from '../../services/user.service';
import { ConstService } from 'src/app/admin/services/extension/Const.service';
@Component({
  selector: 'app-private-info',
  templateUrl: './private-info.component.html',
  styleUrls: ['./private-info.component.css']
})
export class PrivateInfoComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;

  public isOpenDialog = false;

  public user;
  public imageUser = '../../../../assets/admin/dist/img/user_def.png';
  public password;
  public confirmPassword;

  panelOpenState = false;

  constructor(
    private notificationService: NotificationService,
    public matDialog: MatDialog,
    private confirmService: ConfirmService,
    private userService: UserService,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.user = ConstService.user;
    console.log(ConstService.user);
  }

  ngOnInit() {

  }

  public DoiMatKhau() {
    this.user.password = this.password;
    // tslint:disable-next-line: triple-equals
    if (this.password == this.confirmPassword) {
      this.userService.putUser(this.user).subscribe(result => {
        this.notificationService.showNotification(1, 'Đổi mật khẩu', 'Thành công!');
      }, error => {
        this.notificationService.showNotification(3, 'Đổi mật khẩu', 'Không thành công');
      });
    } else {
      this.notificationService.showNotification(2, 'Đổi mật khẩu', 'mật khẩu không trùng khớp');
    }
  }

  getImageWidth() {
    if (this.screenWidth < 500) {
      return 0.6 * this.screenWidth;
    }
    return 0.11 * this.screenWidth;
  }
  getImageHeigth() {
    return this.getImageWidth();
  }

}
