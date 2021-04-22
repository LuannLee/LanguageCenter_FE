import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { CourseService } from 'src/app/admin/services/course.service';

@Component({
  selector: 'app-edit-language-class',
  templateUrl: './edit-language-class.component.html',
  styleUrls: ['./edit-language-class.component.css']
})
export class EditLanguageClassComponent implements OnInit {

  public languageClass = {
    id: '',
    name: '',
    courseFee: null,
    monthlyFee: null,
    lessonFee: null,
    startDay: null,
    endDay: null,
    status: null,
    note: '',
    courseId: null
  };

  public courses;
  public status = [];
  public statusSelected;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditLanguageClassComponent>,
    private languageClassesService: LanguageClassesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService
  ) {
    this.setData();
   }

  ngOnInit() {
    this.getAllStatus();
    this.getCourses();
  }

  public setData() {
    this.languageClass.id = this.data._languageClass.id;
    this.languageClass.name = this.data._languageClass.name;
    this.languageClass.courseFee = this.data._languageClass.courseFee;
    this.languageClass.monthlyFee = this.data._languageClass.monthlyFee;
    this.languageClass.lessonFee = this.data._languageClass.lessonFee;
    this.languageClass.startDay = this.data._languageClass.startDay;
    this.languageClass.endDay = this.data._languageClass.endDay;
    this.languageClass.status = this.data._languageClass.status;
    this.languageClass.note = this.data._languageClass.note;
    this.languageClass.courseId = this.data._languageClass.courseId;
  }

  public getCourses() {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
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
        name: 'Khóa',
        value: 0
      }
    ];
  }

  public updateLanguageClass() {
    this.languageClassesService.putLanguageClass(this.languageClass).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Cập nhật lớp học thành công!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, không cập nhật thành công!');
    });
  }
  /*Chỉ cho phép nhập số */
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
