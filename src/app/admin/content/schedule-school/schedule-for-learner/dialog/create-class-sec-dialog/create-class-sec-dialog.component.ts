import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/admin/services/course.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { TimeShiftService } from 'src/app/admin/services/time-shift.service';
import { ClassSessionService } from 'src/app/admin/services/class-session.service';

@Component({
  selector: 'app-create-class-sec-dialog',
  templateUrl: './create-class-sec-dialog.component.html',
  styleUrls: ['./create-class-sec-dialog.component.css']
})
export class CreateClassSecDialogComponent implements OnInit {

  ScheduleGroup: FormGroup;

  timeShiftSelected;
  courseSelected;
  classSelected;
  timeShifts;
  courses;
  classes;

  learnDays = [
    { name: 'Thứ 2', value: 'Monday' },
    { name: 'Thứ 3', value: 'Tuesday' },
    { name: 'Thứ 4', value: 'Wednesday' },
    { name: 'Thứ 5', value: 'Thursday' },
    { name: 'Thứ 6', value: 'Friday' },
    { name: 'Thứ 7', value: 'Saturday' },
    { name: 'Chủ nhật', value: 'Sunday' }
  ];

  learnDayList = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateClassSecDialogComponent>,
    private courseService: CourseService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public languageClassesService: LanguageClassesService,
    public timeShiftService: TimeShiftService,
    public classSessionService: ClassSessionService

  ) {
    this.courseSelected = this.data.courseSelected;
    this.classSelected = this.data.classSelected;
    this.getAllCourse();
    this.getAllTimeShift();
  }




  ngOnInit() {
    this.initScheduleForm();
  }


  getAllCourse() {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
      if (this.data.courseSelected) {
        this.courseSelected = this.data.courseSelected;
        this.getAllClassesByCourse(this.courseSelected);
      } else {
        this.courseSelected = result[0].id;
      }

    }, error => {

    });
  }

  getAllClassesByCourse(courseId) {
    this.languageClassesService.getAllClassOfSchedule(courseId).subscribe(result => {
      this.classes = result;
      if (this.classSelected) {
        this.classSelected = this.data.classSelected;
      } else {
        this.classSelected = result[0].id;
      }

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


  createSchedule() {

    const days = [];
    this.learnDayList.forEach(element => {
      days.push(element.value);
    });
    if (days.length !== 0) {
      this.classSessionService.postClassSessions(
        this.classSelected, this.timeShiftSelected, days
      ).subscribe(result => {
        this.notificationService.showNotification(1, '', 'Tạo thành công lịch học!');
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(2, '', error);
        console.log(error);
      });
    }

  }

  changeCourse(e) {
    this.getAllClassesByCourse(e);
    console.log(this.courseSelected);
  }

  private initScheduleForm() {
    this.ScheduleGroup = new FormGroup({
      course: new FormControl(null, [Validators.required]),
      class: new FormControl(null, [Validators.required]),
      timeShift: new FormControl(null, [Validators.required]),

    });
  }

  public ChangeDays(checked, day) {
    if (checked === true) {
      const dayTest = this.learnDayList.filter(x => x.value === day.value);
      if (dayTest.length === 0) {
        this.learnDayList.push(day);
      }
    } else {
      const dayTest = this.learnDayList.filter(x => x.value === day.value);
      if (dayTest.length !== 0) {
        const index = this.learnDayList.indexOf(day);
        this.learnDayList.splice(index, 1);
      }
    }
    console.log(this.learnDayList);
  }




}
