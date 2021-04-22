import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { CourseService } from 'src/app/admin/services/course.service';
import { LearnerService } from 'src/app/admin/services/learner.service';
import { AttendanceSheetService } from 'src/app/admin/services/attendance-sheet.service';
import { LecturersService } from 'src/app/admin/services/lecturers.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AttendanceSheetDetailService } from 'src/app/admin/services/attendance-sheet-detail.service';

@Component({
  selector: 'app-add-out-attendance',
  templateUrl: './add-out-attendance.component.html',
  styleUrls: ['./add-out-attendance.component.css']
})
export class AddOutAttendanceComponent implements OnInit {

  learners;
  learnerSelected;
  classes;
  classSelected;

  attendanceSelected;

  public FormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddOutAttendanceComponent>,
    private languageClassesService: LanguageClassesService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService,
    public learnerService: LearnerService,
    public attendanceSheetService: AttendanceSheetService,
    public lecturersService: LecturersService,
    public datepipe: DatePipe,
    public attendanceSheetDetailService: AttendanceSheetDetailService
  ) {
    this.getClassesBySameCourse();
    this.getAttendanceByCurrentClass(this.data.classSelected, this.datepipe.transform(this.data.dateSelected, 'yyyy-MM-dd'));
  }

  ngOnInit() {
    this.initForm();
  }


  private initForm() {
    this.FormGroup = new FormGroup({
      learner: new FormControl(null, [Validators.required]),
      class: new FormControl(null, [Validators.required]),
    });
  }


  getClassesBySameCourse() {
    this.languageClassesService.getSameClass(this.data.classSelected).subscribe(result => {
      this.classes = result;
    }, error => {

    });
  }

  getLearners(classId) {
    this.learnerService.getFullLearningByClass(classId).subscribe(result => {
      this.learners = result;

    }, error => {

    });
  }

  getAttendanceByCurrentClass(classId, date) {
    this.attendanceSheetService.getAttendanceByClassAndDate(classId, date).subscribe((result: any) => {
      this.attendanceSelected = result.id;
      console.log(result);
    }, error => {

    });
  }

  changeClass(classId) {
    console.log(classId);
    this.getLearners(classId);
  }

  createAttendanceOut() {

    this.attendanceSheetDetailService._postAttendanceDetail(
      {
        learnerId: this.learnerSelected,
        languageClassId: this.classSelected,
        attendanceSheetId: this.attendanceSelected,
        dateCreated: new Date(),
        status: 1
      }
    ).subscribe(result => {
      this.notificationService.showNotification(1, '', 'Thêm thành công điểm danh!');
      this.dialogRef.close(true);
    }, error => {

    });


  }

}
