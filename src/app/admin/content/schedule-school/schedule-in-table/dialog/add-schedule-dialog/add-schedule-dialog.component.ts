import { Component, OnInit, Inject } from '@angular/core';
import { ScheduleService } from 'src/app/admin/services/schedule.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { ClassroomService } from 'src/app/admin/services/classroom.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-schedule-dialog',
  templateUrl: './add-schedule-dialog.component.html',
  styleUrls: ['./add-schedule-dialog.component.css']
})
export class AddScheduleDialogComponent implements OnInit {

  public floatLabel = 'always';
  public schedule = {
    fromDate: '',
    toDate: '',
    timeShift: '',
    daysOfWeek: '',
    status: 1,
    dateCreated: new Date(),
    note: '',
    lecturerId: '',
    classroomId: 0,
    languageClassId: '',
    content: ''
  };

  public lecturers;
  public classroom;
  public classes;

  public status = [];

  public learnerFormGroup: FormGroup;

  constructor(
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddScheduleDialogComponent>,
    public dialog: MatDialog,
    public lecturersService: LecturersService,
    public languageClassesService: LanguageClassesService,
    public classroomService: ClassroomService,
    public datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.getAllStatus();
    this.initializeForm();
    this.getAllLecturer();
    this.getAllClasses();
    this.getAllClassrooms();
  }


  public initializeForm() {
    this.learnerFormGroup = new FormGroup({
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
      daysOfWeek: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      lecturerId: new FormControl(null, [Validators.required]),
      languageClassId: new FormControl(null, [Validators.required]),
      classroomId: new FormControl(null, [Validators.required]),
      content: new FormControl()
    });
  }


  private getAllStatus() {
    this.status = [
      {
        Name: 'Chờ xếp lịch',
        code: 2
      },
      {
        Name: 'Khóa',
        code: 0
      }];
  }

  public getAllLecturer() {
    this.lecturersService.getAllLecturers().subscribe(result => {
      this.lecturers = result;

    });
  }

  public getAllClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.classes = result;
    });
  }

  public getAllClassrooms() {
    this.classroomService.getAllClassRoom().subscribe(result => {
      this.classroom = result;
    });
  }

  public changeFromDate(e) {
    // console.log(e);
    // this.schedule.fromDate = this.datepipe.transform(e, 'YYYY-MM-dd');
  }

  public changeToDate(e) {
    // console.log(e);
    // this.schedule.fromDate = this.datepipe.transform(e, 'YYYY-MM-dd');
  }

  public createSchedule() {

    if (this.learnerFormGroup.valid) {
      this.scheduleService.postSchedule(this.schedule).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Xếp lịch', 'Tạo khung lịch thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Xếp lịch', 'Lỗi, tạo khung lịch không thành công!');
      });
    }

  }
}

