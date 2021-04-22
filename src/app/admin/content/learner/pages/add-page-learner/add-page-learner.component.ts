import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { LearnerService } from 'src/app/admin/services/learner.service';
import { GuestTypeService } from 'src/app/admin/services/guest-type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { LoginService } from 'src/app/admin/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-page-learner',
  templateUrl: './add-page-learner.component.html',
  styleUrls: ['./add-page-learner.component.css']
})
export class AddPageLearnerComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;

  public learnerFormGroup: FormGroup;
  public floatLabel = 'always';
  public showProgressBar = false;
  public guestTypes;
  public learner = {
    firstName: null,
    lastName: null,
    sex: null,
    birthday: null,
    address: null,
    email: null,
    facebook: null,
    phone: null,
    parentFullName: null,
    parentPhone: null,
    image: '../../../../../../assets/admin/dist/img/user_def.png',
    status: 1,
    note: null,
    guestTypeId: null
  };

  public genderes = [
    {
      name: 'Nam',
      value: true
    },
    {
      name: 'Nữ',
      value: false
    }
  ];

  public status;

  constructor(
    private learnerService: LearnerService,
    private guestTypeService: GuestTypeService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private fomatDateService: FomatDateService,
    private loginService: LoginService,
    private router: Router,

  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Nghỉ',
        code: 0
      },
      {
        name: 'Hẹn đi học',
        code: 2
      },
    ];
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }

  public getGuestType() {
    this.startProgressBar();
    this.guestTypeService.getAllGuestTypes().subscribe(result => {
      this.guestTypes = result;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public changeDate(event) {

  }

  private initLearnerForm() {
    this.learnerFormGroup = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      birthday: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      facebook: new FormControl(),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern(/[0-9\+\-\ ]/)]),
      parentFullName: new FormControl(),
      parentPhone: new FormControl(),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl(),
      sex: new FormControl(),
      guestTypeId: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.getGuestType();
    this.initLearnerForm();
    this.learner.sex = this.genderes[0].value;
  }

  public createLearner() {
    if (this.learnerFormGroup.valid) {
      this.learner.birthday = this.fomatDateService.transformDate(this.learner.birthday);
      this.learnerService.postLearner(this.learner).subscribe(result => {
        this.notificationService.showNotification(1, 'Học viên', 'Thêm học viên thành công!');
        this.router.navigateByUrl('admin/learners');
      }, error => {
        this.stopProgressBar();
        this.notificationService.showNotification(3, 'Học viên', 'Lỗi, thêm học viên thất bại!');
      });
    } else {
      this.notificationService.showNotification(2, 'Học viên', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

  public back() {
    this.router.navigateByUrl('admin/learners');
  }


  /*Update image => success => save to learner object*/
  onFileComplete(data: any) {
    this.learner.image = data.link;
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
