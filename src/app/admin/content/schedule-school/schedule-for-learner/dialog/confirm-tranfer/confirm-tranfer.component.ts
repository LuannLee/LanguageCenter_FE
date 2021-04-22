import { TimeShiftService } from './../../../../../services/time-shift.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/admin/services/course.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { ClassSessionService } from 'src/app/admin/services/class-session.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-confirm-tranfer',
  templateUrl: './confirm-tranfer.component.html',
  styleUrls: ['./confirm-tranfer.component.css']
})
export class ConfirmTranferComponent implements OnInit {

  ScheduleGroup: FormGroup;
  classSessionSelected;
  timeShifts;
  timeShiftSelected;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmTranferComponent>,
    private courseService: CourseService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public languageClassesService: LanguageClassesService,
    public timeShiftService: TimeShiftService,
    public classSessionService: ClassSessionService
  ) {
    this.classSessionSelected = this.data.classSession;
  }

  ngOnInit() {
    this.initScheduleForm();
    this.getAllTimeShift();
    console.log(this.classSessionSelected);
  }


  private initScheduleForm() {
    this.ScheduleGroup = new FormGroup({
      timeShift: new FormControl(null, [Validators.required]),

    });
  }

  public updateSchedule() {
    this.classSessionService.putClassSession(this.classSessionSelected).subscribe(result => {
      this.notificationService.showNotification(1, '', 'Cập nhật thành công!');
    }, error => {

    });
  }


  getAllTimeShift() {
    this.timeShiftService.getAllTimeShift().subscribe(result => {
      this.timeShifts = result;
      this.timeShiftSelected = result[0].id;
    }, error => {

    });
  }
}
