import { NotificationService } from './../../../../services/extension/notification.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/admin/services/course.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})

export class AddCourseDialogComponent implements OnInit {

  screenHeight: any;
  screenWidth: any;

  public course = {
    name: '',
    price: null,
    content: '',
    traingTime: null,
    numberOfSession: null,
    status: null,
    note: ''
  };

  public status = [];

  public statusSelected;
  public FormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) {
  }

  private initForm() {          // bắt lỗi : edit thuộc tính
    this.FormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      traingTime: new FormControl(null, [Validators.required]),
      numberOfSession: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.initForm();
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

  public createCourse() {
    if (this.FormGroup.valid) {
      this.courseService.postCourse(this.course).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Khóa học', 'Tạo thành công khóa học!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, không tạo thành công!');
      });
    } else {
      this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

}
