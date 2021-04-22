
import { ConstService } from './../../../../services/extension/Const.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { CourseService } from 'src/app/admin/services/course.service';
import { LearnerService } from 'src/app/admin/services/learner.service';
import { AttendanceSheetService } from 'src/app/admin/services/attendance-sheet.service';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-attendance-dialog',
  templateUrl: './add-attendance-dialog.component.html',
  styleUrls: ['./add-attendance-dialog.component.css']
})
export class AddAttendanceDialogComponent implements OnInit {

  public attendanceSheet = {
    date: null,
    appUserId: '',
    tutorId: 0,
    lecturerId: 0,
    languageClassId: ''

  };

  public classes;
  public lecturers;
  public tutors;
  public user;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddAttendanceDialogComponent>,
    private languageClassesService: LanguageClassesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService,
    public learnerService: LearnerService,
    public attendanceSheetService: AttendanceSheetService,
    public lecturersService: LecturersService,
    public datepipe: DatePipe
  ) {
    this.user = this.data._user;
    this.attendanceSheet.appUserId = this.data._user.id;
  }

  ngOnInit() {
    this.getAllClasses();
    this.getAllLecturers();
    this.getAllTutor();
    console.log(ConstService.user);
  }


  public createAttendance() {
    console.log(this.attendanceSheet);
    this.attendanceSheetService.postAttendance(this.attendanceSheet).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, '', 'Tạo thành công điểm danh!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, '', 'Lỗi, Vui lòng thử lại sau!');
    });
  }

  public getAllClasses() {
    this.languageClassesService.getAllLanguageClasses().subscribe(result => {
      this.classes = result;
    }, error => {

    });
  }

  public getAllLecturers() {
    this.lecturersService.getAllLecturers().subscribe(result => {
      this.lecturers = result;
    }, error => {

    });
  }


  public getAllTutor() {
    this.lecturersService.getAllTutors().subscribe(result => {
      this.tutors = result;
    }, error => {

    });
  }

  public changDate(e) {
    this.attendanceSheet.date = this.datepipe.transform(e, 'yyyy-MM-dd');
    this.attendanceSheet.date = new Date(this.attendanceSheet.date);

  }
}
