import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { ScheduleService } from 'src/app/admin/services/schedule.service';
import { CourseService } from 'src/app/admin/services/course.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { MatDialog } from '@angular/material/dialog';
import { PickClassComponent } from '../schedule-in-table/dialog/pick-class/pick-class.component';
import { CreateClassSecDialogComponent } from './dialog/create-class-sec-dialog/create-class-sec-dialog.component';
import { ConfirmTranferComponent } from './dialog/confirm-tranfer/confirm-tranfer.component';
import { ClassSessionService } from 'src/app/admin/services/class-session.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

@Component({
  selector: 'app-schedule-for-learner',
  templateUrl: './schedule-for-learner.component.html',
  styleUrls: ['./schedule-for-learner.component.css']
})
export class ScheduleForLearnerComponent implements OnInit {

  isOpenDialog = false;
  public courses;
  public classes;
  public courseSelected;
  public classSelected;
  public monthSelected = new Date().getMonth();
  public yearSelected = new Date().getFullYear();

  public fullDayOfMonth = [];
  public connectedTo = [];

  public lastDay: Date;
  public firstDayOfMonth;

  public dateOfweek = [];
  public oldDateOfweek;
  public scheduleMonth;

  public daysOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'];
  public showProgressBar = false;


  public infoClass = {
    name: 'Vui lòng chọn lớp',
    status: 'Vui lòng chọn lớp',
    scheduleStatus: 'Vui lòng chọn lớp',
    nameOfLecturer: 'Vui lòng chọn lớp',
    numberOfPeople: 0,
    time: 'Vui lòng chọn lớp',
  };

  constructor(
    public datepipe: DatePipe,
    public scheduleService: ScheduleService,
    public courseService: CourseService,
    public languageClassesService: LanguageClassesService,
    public matDialog: MatDialog,
    public classSessionService: ClassSessionService,
    public notificationService: NotificationService,

  ) {
    this.getDateOfMonth();
  }


  ngOnInit() {
    this.setCourses();
  }

  public getInfoClass(classId) {
    this.languageClassesService.getInfoClass(classId).subscribe((result: any) => {
      this.infoClass = result;
    }, error => {

    });
  }

  public getDateOfMonth() {
    this.dateOfweek = [];
    this.connectedTo = [];
    const day = new Date(this.yearSelected, this.monthSelected, 1).getDay();
    if (day === 0) {
      for (let i = 0; i < 6; i++) {
        this.dateOfweek.push('');
      }
    } else {
      for (let i = 0; i < day - 1; i++) {
        this.dateOfweek.push('');
      }
    }

    const numberOfMonth = new Date(this.yearSelected, this.monthSelected + 1, 0).getDate();

    for (let i = 1; i <= numberOfMonth; i++) {

      const date = this.datepipe.transform(new Date(this.yearSelected, this.monthSelected, i), 'dd-MM-yyyy');
      const schedule = [];

      /* duyệt xem có lịch học trong ngày không thì gắn vào. */
      if (this.scheduleMonth) {
        if (this.scheduleMonth.classSessions) {
          (this.scheduleMonth.classSessions).forEach(classSecssion => {
            const dateOfSchedule = this.datepipe.transform(classSecssion.date, 'dd-MM-yyyy');
            if (dateOfSchedule === date) {
              schedule.push({
                classSession: classSecssion,
                content: this.scheduleMonth.classroomName + ' - ' + classSecssion.fromTime.substring(0, 5) +
                  '-' + classSecssion.toTime.substring(0, 5) + ' GV: ' + this.scheduleMonth.lecturerName
              });
            }
          });
        }

      }


      this.dateOfweek.push(
        {
          date,
          schedule
        }
      );
    }
    console.log(this.dateOfweek);
    this.oldDateOfweek = JSON.stringify(this.dateOfweek);
    this.oldDateOfweek = JSON.parse(this.oldDateOfweek);

    /* Xử lí để đưa các item buổi học vào từng ngày.*/
    for (const item of this.dateOfweek) {
      this.connectedTo.push(item.date);
    }

  }

  public getScheduleMonthByClass(classId: any) {
    this.scheduleService.getScheduleMonthByClass(classId).subscribe(result => {
      this.scheduleMonth = result;
      console.log(this.scheduleMonth);
      this.getDateOfMonth();
    }, error => {
      this.getDateOfMonth();

    });
  }

  public forwardMonth() {
    console.log(this.scheduleMonth);
    if (this.monthSelected === 0) {
      this.monthSelected = 11;
      this.yearSelected = this.yearSelected - 1;
    } else {
      this.monthSelected = this.monthSelected - 1;
    }
    this.dateOfweek = [];
    this.connectedTo = [];
    this.getDateOfMonth();

  }

  public nextMonth() {
    console.log(this.scheduleMonth);
    if (this.monthSelected === 11) {
      this.monthSelected = 0;
      this.yearSelected = this.yearSelected + 1;
    } else {
      this.monthSelected = this.monthSelected + 1;
    }
    this.dateOfweek = [];
    this.connectedTo = [];
    this.getDateOfMonth();

  }



  drop(event: CdkDragDrop<string[]>) {

    // this.matDialog.open(ConfirmTranferComponent, {
    //   width: '30vh',
    //   data: {
    //     classSession: event.container.data
    //   },
    // }).afterClosed().subscribe(result => {
    //   this.isOpenDialog = false;
    //   if (result) {

    //   }

    // });




    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

    }


    let stringDate = event.container.id;

    stringDate = stringDate.substring(6, 10) + '/' + stringDate.substring(3, 5) + '/' + stringDate.substring(0, 2);

    const date = new Date(stringDate);

    const temp = this.datepipe.transform(date, 'yyyy-MM-dd');

    const updateList = [];
    // tslint:disable-next-line: no-shadowed-variable
    event.container.data.forEach((element: any) => {
      element.classSession.date = temp;
      updateList.push(element.classSession);
    });

    console.log(updateList);
    this.classSessionService.putList(updateList).subscribe(result => {
      this.notificationService.showNotification(1, '', 'Cập nhật thành công!');
    }, error => {

    });





  }

  public setCourses() {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
      this.courseSelected = result[0].id;
      this.changValueCourse(result[0].id);
    }, error => {

    });
  }

  public setClasses() {

  }

  public changValueCourse(courseId) {
    this.languageClassesService.getClassByCourse(courseId).subscribe(result => {
      this.classes = result;
      this.classSelected = result[0].id;
      this.getScheduleMonthByClass(this.classSelected);
      this.getInfoClass(this.classSelected);
    }, error => {

    });
  }

  public changValueClass(classId) {
    this.getScheduleMonthByClass(classId);
    this.getInfoClass(classId);
  }

  public autoCreateSchedule() {
    console.log(this.courseSelected);
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(PickClassComponent, {
        width: '100vh',
        data: {
          courseSelected: this.courseSelected
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {

        }

      });
    }
  }


  public openCreateClassSection() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      this.matDialog.open(CreateClassSecDialogComponent, {
        width: '80vh',
        data: {
          courseSelected: this.courseSelected,
          classSelected: this.classSelected,
        },
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
        if (result) {
          this.getScheduleMonthByClass(this.classSelected);
        }

      });
    }
  }

  dragStarted(event: CdkDragStart) {
    console.log(event);
  }
  dragEnded(event: CdkDragEnd) {
    console.log(event);
  }



}

