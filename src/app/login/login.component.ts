import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../admin/services/login.service';
import { NotificationService } from '../admin/services/extension/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { userInfo } from 'os';
import { ConstService } from '../admin/services/extension/Const.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  public user = {
    userName: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/admin');
    }
  }

  ngOnInit() {

    this.initLoginForm();
  }
  private initLoginForm() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }


  public login() {
    if (this.loginFormGroup.valid) {
      this.loginService.login(this.user).subscribe((result: any) => {
        localStorage.setItem('token', result.token);
        this.router.navigateByUrl('/admin');

      }, error => {
        // tslint:disable-next-line: triple-equals
        if (error.status == 400) {
          this.notificationService.showNotification(3, 'Login', 'Sai tên đăng nhập hoặc mật khẩu!');
        } else {
          console.log(error);
        }
      });
    } else {
      setTimeout(() => {
        this.notificationService.showNotification(3, 'Login', 'Yêu cầu nhập đầy đủ tài khoản!');
      });
    }

  }
}
