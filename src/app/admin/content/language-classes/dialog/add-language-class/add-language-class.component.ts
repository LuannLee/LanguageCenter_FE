import { CourseService } from './../../../../services/course.service';
import { LanguageClassesService } from './../../../../services/language-classes.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

@Component({
  selector: 'app-add-language-class',
  templateUrl: './add-language-class.component.html',
  styleUrls: ['./add-language-class.component.css']
})
export class AddLanguageClassComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;

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
    private dialogRef: MatDialogRef<AddLanguageClassComponent>,
    private languageClassesService: LanguageClassesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.getAllStatus();
    this.getCourses();
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
        name: 'Ngừng hoạt động',
        value: 0
      }
    ];
  }

  public createLanguageClass() {
    this.languageClassesService.postLanguageClass(this.languageClass).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Tạo thành công lớp học!'); });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, không tạo thành công!');
    });
  }
}
