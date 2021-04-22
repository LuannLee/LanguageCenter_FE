import { element } from 'protractor';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/extension/notification.service';
import { LoginService } from '../services/login.service';
import { ConstService } from '../services/extension/Const.service';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: [
    './admin-management.component.css',
  ]
})
export class AdminManagementComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService) {
    this.getPermissionByUser();
  }

  public user;
  public permissions = [];

  public avatar = '';
  public name = '';

  public permissionsOfUser = [
    {
      Name: 'Danh sách lớp',
      Value: false
    },
    {
      Name: 'Danh mục',
      Value: false
    },
    {
      Name: 'Lớp học',
      Value: false
    },
    {
      Name: 'Phòng học',
      Value: false
    },
    {
      Name: 'Đối tượng',
      Value: false
    },
    {
      Name: 'Khóa học',
      Value: false
    },
    {
      Name: 'Loại phiếu thu',
      Value: false
    },
    {
      Name: 'Loại phiếu chi',
      Value: false
    }
    ,
    {
      Name: 'Quản lý học tập',
      Value: false
    }
    ,
    {
      Name: 'Xếp lịch học',
      Value: false
    }
    ,
    {
      Name: 'Quản lý điểm định kỳ',
      Value: false
    }
    ,
    {
      Name: 'Quản lý điểm cuối khóa',
      Value: false
    },
    {
      Name: 'Quản lý học viên',
      Value: false
    },
    {
      Name: 'Học viên',
      Value: false
    },
    {
      Name: 'Thêm mới học viên',
      Value: false
    },
    {
      Name: 'Điểm danh',
      Value: false
    },
    {
      Name: 'Xếp lớp',
      Value: false
    },
    {
      Name: 'Quá trình học tập',
      Value: false
    },
    {
      Name: 'Quản lý nhân sự',
      Value: false
    },
    {
      Name: 'Giáo viên',
      Value: false
    },
    {
      Name: 'Nhân viên',
      Value: false
    },
    {
      Name: 'Chấm công nhân viên',
      Value: false
    },
    {
      Name: 'Tính lương',
      Value: false
    },
    {
      Name: 'Quản lý thu chi',
      Value: false
    },
    {
      Name: 'Phiếu thu',
      Value: false
    },
    {
      Name: 'Phiếu chi',
      Value: false
    },
    {
      Name: 'Báo cáo, thống kê',
      Value: false
    },
    {
      Name: 'Báo cáo chấm công',
      Value: false
    },
    {
      Name: 'Báo cáo điểm cuối khóa',
      Value: false
    },
    {
      Name: 'Báo cáo điểm đình kỳ',
      Value: false
    },
    {
      Name: 'Báo cáo đóng học phí',
      Value: false
    },
    {
      Name: 'Báo cáo điểm danh',
      Value: false
    },
    {
      Name: 'Báo cáo danh sách lớp',
      Value: false
    },
    {
      Name: 'Báo cáo chưa đóng học phí',
      Value: false
    },



  ];




  ngOnInit() {
    this.loginService.islogged();

  }

  public getPermissionByUser() {
    this.loginService.getProfile().subscribe((result: any) => {
      ConstService.user = result.user;
      ConstService.permissions = result.permission;
      this.avatar = result.user.avatar;
      this.name = result.user.fullName;
      this.user = result.user;
      this.permissions = result.permission;

      console.log(this.permissions);
      this.permissionsOfUser.forEach(per => {
        this.permissions.forEach(p => {
          if (per.Name === p.functionName) {
            if (p.status === 1) {
              per.Value = true;
            } else {
              per.Value = false;
            }
          }
        });
      });

    }, error => {
      this.logout();
    });
  }


  public checkPermission(functionName) {

    if (this.user && this.user.userName === 'admin') {
      return true;
    }

    const per = this.permissions.filter(x => x.functionName === functionName)[0];
    if (per.status !== 1 && per) {
      return false;
    } else {
      return true;
    }
  }

  public checkAdmin() {
    if (this.user && this.user.userName !== 'admin') {
      return false;
    } else {
      return true;
    }

  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
