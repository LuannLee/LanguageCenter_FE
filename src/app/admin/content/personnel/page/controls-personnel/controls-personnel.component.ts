import { Component, OnInit } from '@angular/core';
import { PersonnelsService } from 'src/app/admin/services/personnels.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { ConstService } from 'src/app/admin/services/extension/Const.service';

@Component({
  selector: 'app-controls-personnel',
  templateUrl: './controls-personnel.component.html',
  styleUrls: ['./controls-personnel.component.css']
})
export class ControlsPersonnelComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

  public personnelFormGroup: FormGroup;
  public floatLabel = 'always';
  public isOpenDialog = false;

  public position;
  public status;
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
    id: null,
    cardId: null,
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
    position: null,
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
    private exchangeDataService: ExchangeDataService,
    private router: Router,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    setTimeout(() => {
      this.openPermissionOfFuncition();
    }, 1500);
  }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.personnelFormGroup = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      cardId: new FormControl(),
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
    this.exchangeDataService.idSource.subscribe(message => {
      this.personnel.id = message;
      console.log(this.personnel.id);

    });

    this.getAllStatus();
    this.getAllMarritalStatus();
    this.getAllPosition();
    this.getPersonnelId();
    this.initLectureForm();
  }

  public getPersonnelId() {
    this.personnel.birthday = this.fomatDateService.transformDate(this.personnel.birthday);
    this.startProgressBar();
    this.personnelsService.getPersonnelId(this.personnel.id).subscribe((result: any) => {
      this.personnel.cardId = result.cardId;
      this.personnel.cardId = result.cardId;
      this.personnel.firstName = result.firstName;
      this.personnel.lastName = result.lastName;
      this.personnel.sex = String(result.sex);
      this.personnel.birthday = result.birthday;
      this.personnel.address = result.address;
      this.personnel.nationality = result.nationality;
      this.personnel.marritalStatus = result.marritalStatus;
      this.personnel.experienceRecord = result.experienceRecord;
      this.personnel.email = result.email;
      this.personnel.facebook = result.facebook;
      this.personnel.phone = result.phone;
      this.personnel.position = result.position;
      this.personnel.certificate = result.certificate;
      this.personnel.image = result.image;
      this.personnel.basicSalary = result.basicSalary;
      this.personnel.allowance = result.allowance;
      this.personnel.bonus = result.bonus;
      this.personnel.insurancePremium = result.insurancePremium;
      this.personnel.status = result.status;
      this.personnel.note = result.note;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }

  public updatePersonnel() {      // hàm sửa
    if (this.personnelFormGroup.valid) {
      this.personnel.birthday = this.fomatDateService.transformDate(this.personnel.birthday);
      this.startProgressBar();
      this.personnelsService.putPersonnel(this.personnel).subscribe(result => {
        this.notificationService.showNotification(1, 'Nhân viên', 'Cập nhật thành công!');
        this.getPersonnelId();
        this.stopProgressBar();
      }, error => {
        this.stopProgressBar();
        this.notificationService.showNotification(3, 'Nhân viên', 'Lỗi, Cập nhật thất bại!');
      });
    } else {
      this.notificationService.showNotification(3, 'Nhân viên', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
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
          this.personnelsService.deletePersonnel(this.personnel.id).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Nhân viên', 'Đã xóa nhân viên!'); });
            this.router.navigateByUrl('admin/personnels');
          }, error => {
            this.notificationService.showNotification(3, 'Nhân viên', 'Lỗi, Không xóa được!');
            this.stopProgressBar();
          });
        }
      });
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
      {
        name: 'Giáo viên',
        code: 3
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

  public openPermissionOfFuncition() {

    if (ConstService.user.userName === 'admin') {
      this.permissionOfFunction.canCreate = true;
      this.permissionOfFunction.canDelete = true;
      this.permissionOfFunction.canRead = true;
      this.permissionOfFunction.canUpdate = true;

      return;
    }
    const temp = ConstService.permissions.filter(y => y.functionName === 'Nhân viên')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
  }
}
