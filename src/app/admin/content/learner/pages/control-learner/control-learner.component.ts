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
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-control-learner',
  templateUrl: './control-learner.component.html',
  styleUrls: ['./control-learner.component.css']
})
export class ControlLearnerComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;

  public isOpenDialog = false;
  public learnerFormGroup: FormGroup;
  public floatLabel = 'always';
  public showProgressBar = false;
  public guestTypes;
  public learner = {
    id: null,
    cardId: null,
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
    private exchangeDataService: ExchangeDataService,
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
        name: 'Khóa',
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
    this.exchangeDataService.idSource.subscribe(message => {
      this.learner.id = message;
    });
    this.getLearnerId();
    this.getAllStatus();
    this.getGuestType();
    this.initLearnerForm();
  }

  public getLearnerId() {
    this.learner.birthday = this.fomatDateService.transformDate(this.learner.birthday);
    this.startProgressBar();
    this.learnerService.getById(this.learner.id).subscribe((result: any) => {
      this.learner.id = result.id;
      this.learner.cardId = result.cardId;
      this.learner.firstName = result.firstName;
      this.learner.lastName = result.lastName;
      this.learner.birthday = result.birthday;
      this.learner.address = result.address;
      this.learner.facebook = result.facebook;
      this.learner.phone = result.phone;
      this.learner.email = result.email;
      this.learner.sex = String(result.sex);
      this.learner.parentFullName = result.parentFullName;
      this.learner.parentPhone = result.parentPhone;
      this.learner.image = result.image;
      this.learner.status = result.status;
      this.learner.guestTypeId = result.guestTypeId;
      this.learner.status = result.status;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public updateLearner() {
    if (this.learnerFormGroup.valid) {
      this.learner.birthday = this.fomatDateService.transformDate(this.learner.birthday);
      this.learnerService.putLearner(this.learner).subscribe(result => {
        this.notificationService.showNotification(1, 'Học viên', 'Update học viên thành công!');
      }, error => {
        this.stopProgressBar();
        this.notificationService.showNotification(3, 'Học viên', 'Lỗi, Update học viên thất bại!');
      });
    } else {
      this.notificationService.showNotification(2, 'Học viên', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

  public delete() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.8 * this.screenWidth : 0.2 * this.screenWidth;
      this.matDialog.open(DeleteDialogComponent, {
        width: `${widthMachine}px`,
        data: {
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result === true) {
          this.learnerService.deleteLearner(this.learner.id).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Học viên', 'Đã xóa học viên!'); });
            this.router.navigateByUrl('admin/learners');
          }, error => {
            this.notificationService.showNotification(3, 'Học viên', 'Lỗi, Không xóa được!');
            this.stopProgressBar();
          });
        }
      });
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
