import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExchangeDataService } from 'src/app/admin/services/extension/exchange-data.service';
import { DeleteDialogComponent } from '../../../delete-dialog/delete-dialog.component';
import { ConstService } from 'src/app/admin/services/extension/Const.service';

@Component({
  selector: 'app-edit-page-lecture',
  templateUrl: './edit-page-lecture.component.html',
  styleUrls: ['./edit-page-lecture.component.css']
})
export class EditPageLectureComponent implements OnInit {
  public permissionOfFunction = {
    canCreate: false,
    canUpdate: false,
    canDelete: false,
    canRead: false
  };
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;
  public isOpenDialog = false;

  public lectureFormGroup: FormGroup;
  public floatLabel = 'always';

  public check;
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
  public lecture = {
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
    basicSalary: 0,
    allowance: 0,
    bonus: 0,
    insurancePremium: 0,
    wageOfLecturer: 0,
    wageOfTutor: 0,
    isVisitingLecturer: false,
    isTutor: false,
    status: 1,
    note: null,
  };
  public selected;
  constructor(
    private lecturersService: LecturersService,
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
  private initLectureForm() {
    this.lectureFormGroup = new FormGroup({
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
      certificate: new FormControl(null, [Validators.required]),
      basicSalary: new FormControl(),
      allowance: new FormControl(),
      bonus: new FormControl(),
      insurancePremium: new FormControl(),
      wageOfLecturer: new FormControl(),
      wageOfTutor: new FormControl(),
      isVisitingLecturer: new FormControl(),
      isTutor: new FormControl(),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }
  ngOnInit() {

    this.exchangeDataService.idSource.subscribe(message => {
      this.lecture.id = message;
    });
    this.getLectureId();
    this.getAllStatus();
    this.getAllMarritalStatus();
    this.getAllPosition();
    this.initLectureForm();
  }

  public setting() {
    // tslint:disable-next-line: triple-equals
    if (this.selected == 0) {
      this.lecture.position = 'Giáo viên';
      this.lecture.isVisitingLecturer = false;
      this.lecture.wageOfLecturer = 0;
    }
    // tslint:disable-next-line: triple-equals
    if (this.selected == 1) {
      this.lecture.position = 'Thỉnh giảng';
      this.lecture.isVisitingLecturer = true;
      this.lecture.isTutor = false;
      this.lecture.basicSalary = 0;
      this.lecture.insurancePremium = 0;
    }
    // tslint:disable-next-line: triple-equals
    if (this.selected == 2) {
      this.lecture.position = 'Trợ giảng';
      this.lecture.isTutor = true;
      this.lecture.isVisitingLecturer = false;
    }
  }

  public getAllPosition() {
    this.position = [
      {
        name: 'Giáo viên',
        code: 0
      },
      {
        name: 'Thỉnh giảng',
        code: 1
      },
      {
        name: 'Trợ giảng',
        code: 2
      },
    ];
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
  public getLectureId() {
    this.lecture.birthday = this.fomatDateService.transformDate(this.lecture.birthday);
    this.startProgressBar();
    this.lecturersService.getLectureId(this.lecture.id).subscribe((result: any) => {
      this.lecture.id = result.id;
      this.lecture.cardId = result.cardId;
      this.lecture.firstName = result.firstName;
      this.lecture.lastName = result.lastName;
      this.lecture.sex = String(result.sex);
      this.lecture.birthday = result.birthday;
      this.lecture.address = result.address;
      this.lecture.nationality = result.nationality;
      this.lecture.marritalStatus = result.marritalStatus;
      this.lecture.experienceRecord = result.experienceRecord;
      this.lecture.email = result.email;
      this.lecture.facebook = result.facebook;
      this.lecture.phone = result.phone;

      // tslint:disable-next-line: triple-equals
      if (result.position == 'Giáo viên') {
        this.lecture.position = result.position;
        this.selected = 0;
      }
      // tslint:disable-next-line: triple-equals
      if (result.position == 'Thỉnh giảng') {
        this.lecture.position = result.position;
        this.selected = 1;
      }
      // tslint:disable-next-line: triple-equals
      if (result.position == 'Trợ giảng') {
        this.lecture.position = result.position;
        this.selected = 2;
      }

      this.lecture.certificate = result.certificate;
      this.lecture.image = result.image;
      this.lecture.basicSalary = result.basicSalary;
      this.lecture.allowance = result.allowance;
      this.lecture.bonus = result.bonus;
      this.lecture.insurancePremium = result.insurancePremium;
      this.lecture.wageOfLecturer = result.wageOfLecturer;
      this.lecture.wageOfTutor = result.wageOfTutor;
      this.lecture.isVisitingLecturer = result.isVisitingLecturer;
      this.lecture.isTutor = result.isTutor;
      this.lecture.status = result.status;
      this.lecture.note = result.note;
      this.stopProgressBar();
    }, error => {
      this.stopProgressBar();
    });
  }
  public updateLecture() {
    this.lecture.birthday = this.fomatDateService.transformDate(this.lecture.birthday);
    console.log(this.lecture);
    this.lecturersService.putLecture(this.lecture).subscribe(result => {
      this.notificationService.showNotification(1, 'Giáo viên', 'Update giáo viên thành công!');
      this.router.navigateByUrl('admin/lecture');
    }, error => {
      this.stopProgressBar();
      this.notificationService.showNotification(3, 'Giáo viên', 'Lỗi, Update giáo viên thất bại!');
    });
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
          this.lecturersService.deleteLectureId(this.lecture.id).subscribe(result1 => {
            setTimeout(() => { this.notificationService.showNotification(1, 'Giáo viên', 'Đã xóa giáo viên!'); });
            this.router.navigateByUrl('admin/lecture');
          }, error => {
            this.notificationService.showNotification(3, 'Giáo viên', 'Lỗi, Không xóa được!');
            this.stopProgressBar();
          });
        }
      });
    }
  }

  public back() {
    this.router.navigateByUrl('admin/lecturer');
  }

  /*Update image => success => save to learner object*/
  onFileComplete(data: any) {
    this.lecture.image = data.link;
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
    const temp = ConstService.permissions.filter(y => y.functionName === 'Giáo viên')[0];
    this.permissionOfFunction.canCreate = temp.canCreate;
    this.permissionOfFunction.canDelete = temp.canDelete;
    this.permissionOfFunction.canRead = temp.canRead;
    this.permissionOfFunction.canUpdate = temp.canUpdate;
  }
}
