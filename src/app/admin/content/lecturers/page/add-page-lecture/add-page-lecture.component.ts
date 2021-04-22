import { Component, OnInit } from '@angular/core';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ConfirmService } from 'src/app/admin/services/extension/confirm.service';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-page-lecture',
  templateUrl: './add-page-lecture.component.html',
  styleUrls: ['./add-page-lecture.component.css']
})
export class AddPageLectureComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public showProgressBar = false;

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
    private router: Router,
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
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
      basicSalary: new FormControl(null, [Validators.required]),
      allowance: new FormControl(null, [Validators.required]),
      bonus: new FormControl(),
      insurancePremium: new FormControl(null, [Validators.required]),
      wageOfLecturer: new FormControl(),
      wageOfTutor: new FormControl(),
      isVisitingLecturer: new FormControl(),
      isTutor: new FormControl(),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }
  ngOnInit() {
    this.getAllStatus();
    this.getAllMarritalStatus();
    this.getAllPosition();
    this.initLectureForm();
    this.lecture.sex = String(this.genderes[0].value);
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


  public createLecture() {
    if (this.lectureFormGroup.valid) {
      this.lecture.birthday = this.fomatDateService.transformDate(this.lecture.birthday);
      this.lecturersService.postLecturers(this.lecture).subscribe(result => {
        this.notificationService.showNotification(1, 'Giáo viên', 'Thêm giáo viên thành công!');
        this.router.navigateByUrl('admin/lecturer');
      }, error => {
        this.stopProgressBar();
        this.notificationService.showNotification(3, 'Giáo viên', 'Lỗi, thêm giáo viên thất bại!');
      });
    } else {
      this.notificationService.showNotification(2, 'Nhân viên', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }


  public back() {
    this.router.navigateByUrl('admin/lecturer');
  }

  /*Update image => success => save to learner object*/
  onFileComplete(data: any) {
    this.lecture.image = data.link;
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
}
