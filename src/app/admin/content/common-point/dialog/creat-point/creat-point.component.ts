import { ConstService } from 'src/app/admin/services/extension/Const.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { PeriodicPointDeltailService } from 'src/app/admin/services/periodic-point-deltail.service';
import { PeriodicPointService } from 'src/app/admin/services/periodic-point.service';
import { LoginService } from 'src/app/admin/services/login.service';
import { FomatDateService } from 'src/app/admin/services/extension/FomatDate.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { LecturersService } from 'src/app/admin/services/lecturers.service';

@Component({
  selector: 'app-creat-point',
  templateUrl: './creat-point.component.html',
  styleUrls: ['./creat-point.component.css']
})
export class CreatPointComponent implements OnInit {

  public screenHeight: any;
  public screenWidth: any;
  public periodicPointFormGroup: FormGroup;
  public floatLabel = 'always';

  public periodicPoint = {
    examinationDate: null,
    week: null,
    languageClassId: null,
    lecturerId: null,
    status: 1,
    note: null
  };

  public periodicPointList: any;
  public classList;

  public lecturerList;

  public status = [];
  public statusSelected;

  public checkExitsWeek;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreatPointComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private periodicPointDeltailService: PeriodicPointDeltailService,
    private periodicPointService: PeriodicPointService,
    private loginService: LoginService,
    private fomatDateService: FomatDateService,
    private languageClassesService: LanguageClassesService,
    private lecturersService: LecturersService



  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.periodicPoint.languageClassId = this.data.classId;
  }

  private initLearnerForm() {
    this.periodicPointFormGroup = new FormGroup({
      examinationDate: new FormControl(null, [Validators.required]),
      week: new FormControl(null, [Validators.required]),
      languageClassId: new FormControl(null, [Validators.required]),
      lecturerId: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }

  ngOnInit() {
    this.initLearnerForm();
    this.getAllStatus();
    this.getAllLecturers();
    this.getAllClass();
    this.getAllPeriodicPointConditions();
  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public getAllLecturers() {
    this.lecturersService.getAllLecturers().subscribe((result: any) => {
      this.lecturerList = result;
    }, error => {
    });
  }
  public getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Ngừng hoạt động',
        value: 0
      }
    ];
  }
  public getAllPeriodicPointConditions() {
    this.periodicPointService.getPeriodicPointConditions(this.periodicPoint.languageClassId).subscribe((result: any) => {
      this.periodicPointList = result;
      console.log(this.periodicPointList);
    }, error => {
    });
  }

  public checkExits() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.periodicPointList.length; i++) {
      // tslint:disable-next-line: triple-equals
      if (this.periodicPoint.week == this.periodicPointList[i].week) {
        this.periodicPoint.week = null;
        return true;
      }
    }
    return false;
  }
  public createPeriodicPoint() {
    if (this.checkExits()) {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, bảng điểm của tuần này đã được tạo mời kiểm tra!');
    }
    // tslint:disable-next-line: one-line
    else if (this.periodicPoint.week == 0) {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, mời kiểm tra lại dữ liệu nhập!');
    }
    // tslint:disable-next-line: one-line
    else {
      this.periodicPoint.examinationDate = this.fomatDateService.transformDate(this.periodicPoint.examinationDate);
      this.periodicPointService.addPeriodicPoint(this.periodicPoint, ConstService.user.id).subscribe((result: any) => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Điểm định kỳ', 'Tạo thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, mời kiểm tra lại dữ liệu nhập!');
      });
    }
  }

  // chỉ nhập số
  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
