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
import { EndingcoursePointDetailService } from 'src/app/admin/services/endingcourse-point-detail.service';
import { EndingcoursePointService } from 'src/app/admin/services/endingcourse-point.service';

@Component({
  selector: 'app-creat-ending-point',
  templateUrl: './creat-ending-point.component.html',
  styleUrls: ['./creat-ending-point.component.css']
})
export class CreatEndingPointComponent implements OnInit {
  public screenHeight: any;
  public screenWidth: any;
  public endingPointFormGroup: FormGroup;
  public floatLabel = 'always';

  public endingPoint = {
    examinationDate: null,
    languageClassId: null,
    lecturerId: null,
    status: 1,
    note: null
  };

  public endingPoints: any;
  public classList;

  public lecturerList;

  public status = [];
  public statusSelected;

  public checkExitsWeek;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreatEndingPointComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private endingcoursePointDetailService: EndingcoursePointDetailService,
    private endingcoursePointService: EndingcoursePointService,
    private loginService: LoginService,
    private fomatDateService: FomatDateService,
    private languageClassesService: LanguageClassesService,
    private lecturersService: LecturersService
  ) {
    this.loginService.islogged();
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
    this.endingPoint.languageClassId = this.data.classId;
  }

  private initLearnerForm() {
    this.endingPointFormGroup = new FormGroup({
      examinationDate: new FormControl(null, [Validators.required]),
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
    this.getEndingPointOfClass();

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
        name: 'Ho???t ?????ng',
        value: 1
      },
      {
        name: 'Ng???ng ho???t ?????ng',
        value: 0
      }
    ];
  }





  public getEndingPointOfClass() {
    this.endingcoursePointService.getEndingcoursePointConditions(this.endingPoint.languageClassId).subscribe((result: any) => {
      this.endingPoints = result;
      console.log(this.endingPoints);
    }, error => {
    });
  }

  public checkExits() {
    if (this.endingPoints != null) {
      return true;
    }
    return false;
  }
  public createEndingPoint() {
    if (this.checkExits()) {
      this.notificationService.showNotification(3, '??i???m cu???i kh??a', 'L???i, b???ng ??i???m ???? ???????c t???o m???i ki???m tra!');
    }
    // tslint:disable-next-line: one-line
    else {
      this.endingPoint.examinationDate = this.fomatDateService.transformDate(this.endingPoint.examinationDate);
      this.endingcoursePointService.addEndingcoursePoint(this.endingPoint, ConstService.user.id).subscribe((result: any) => {
        setTimeout(() => { this.notificationService.showNotification(1, '??i???m cu???i kh??a', 'T???o th??nh c??ng!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, '??i???m cu???i kh??a', 'L???i, m???i ki???m tra l???i d??? li???u nh???p!');
      });
    }
  }

  // ch??? nh???p s???
  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


}
