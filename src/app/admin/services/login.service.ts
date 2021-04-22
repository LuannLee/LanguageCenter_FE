import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConstService } from './extension/Const.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(user: any) {
    return this.httpClient
      .post(`${environment.PLCServicesDomain}/api/AppUsers/Login`, user);
  }

  getProfile() {
    return this.httpClient
      .get(`${environment.PLCServicesDomain}/api/UserProfile`);
  }
  /*
    - Kiểm tra nếu đã đăng nhập rồi thì tiếp các tác vụ khác
    - Nếu chưa đăng nhập thì sẽ auto cho bay về trang login, token phải còn hạn
   */
  islogged() {
    if (localStorage.getItem('token') == null) {
      this.getPermissionByUser();
      this.router.navigateByUrl('login');
    }
  }

  public getPermissionByUser() {
    this.getProfile().subscribe((result: any) => {
      ConstService.user = result.user;
      ConstService.permissions = result.permission;
    }, error => {
    });
  }
}
