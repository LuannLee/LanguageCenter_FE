import { Component, OnInit } from '@angular/core';
import { PersonnelsService } from 'src/app/admin/services/personnels.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.css']
})
export class AddPersonnelComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

  public personnelFormGroup: FormGroup;
  public floatLabel = 'always';

  public status;
  public position;
  public marritalStatus;
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

  public personnel = {    // edit thuộc tính
    firstName: null,
    lastName: null,
    sex: null,
    birthday: null,
    address: null,
    nationality: null,
    marritalStatus: 0,
    experienceRecord: null,
    email: null,
    facebook: null,
    phone: null,
    position: 'Nhân viên',
    certificate: null,
    image: '../../../../../../assets/admin/dist/img/user_def.png',
    basicSalary: null,
    allowance: null,
    bonus: null,
    insurancePremium: null,
    status: 1,
    note: null,
  };


  constructor(
    private personnelsService: PersonnelsService,
    public matDialog: MatDialog,
    private notificationService: NotificationService,
    private confirmService: ConfirmService,
    private fomatDateService: FomatDateService,
    private router: Router,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.personnelFormGroup = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      sex: new FormControl(),
      birthday: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      nationality: new FormControl(null, [Validators.required]),
      marritalStatus: new FormControl(null, [Validators.required]),
      experienceRecord: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.email]),
      facebook: new FormControl(),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern(/[0-9\+\-\ ]/)]),
      position: new FormControl(null, [Validators.required]),
      certificate: new FormControl(),
      basicSalary: new FormControl(null, [Validators.required]),
      allowance: new FormControl(null, [Validators.required]),
      bonus: new FormControl(null, [Validators.required]),
      insurancePremium: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.getAllMarritalStatus();
    this.getAllPosition();
    this.initLectureForm();
    this.personnel.sex = this.genderes[0].value;
  }

  public createPersonnel() {
    if (this.personnelFormGroup.valid) {
      this.personnel.birthday = this.fomatDateService.transformDate(this.personnel.birthday);
      this.startProgressBar();
      this.personnelsService.postPersonnel(this.personnel).subscribe(result => {
        this.notificationService.showNotification(1, 'Nhân viên', 'Thêm nhân viên thành công!');
        this.router.navigateByUrl('admin/personnels');
        this.stopProgressBar();
      }, error => {
        this.stopProgressBar();
        this.notificationService.showNotification(3, 'Nhân viên', 'Lỗi, thêm nhân viên thất bại!');
      });
    } else {
      this.notificationService.showNotification(2, 'Nhân viên', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

  public back() {
    this.router.navigateByUrl('admin/personnels');
  }

  /*Update image => success => save to personnel object*/
  onFileComplete(data: any) {
    this.personnel.image = data.link;
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

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        code: 1
      },
      {
        name: 'Nghỉ việc',
        code: 0
      },
    ];
  }

  public getAllPosition() {
    this.position = [
      {
        name: 'Nhân viên',
        code: 0
      },
      {
        name: 'Quản lý',
        code: 1
      },
      {
        name: 'Kế toán',
        code: 2
      },
    ];
  }

  private getAllMarritalStatus() {
    this.marritalStatus = [
      {
        name: 'Đã kết hôn',
        code: 1
      },
      {
        name: 'Độc thân',
        code: 0
      },
    ];
  }

  public startProgressBar() {
    this.showProgressBar = true;
  }

  public stopProgressBar() {
    this.showProgressBar = false;
  }
}
