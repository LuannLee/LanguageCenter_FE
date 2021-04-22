import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { CourseService } from 'src/app/admin/services/course.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-course-dialog',
  templateUrl: './edit-course-dialog.component.html',
  styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent implements OnInit {

  public status = [];

  public course = {
    id: null,
    name: '',
    price: null,
    content: '',
    traingTime: null,
    numberOfSession: null,
    status: null,
    note: ''
  };
  public FormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditCourseDialogComponent>,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.setData();
  }
  private initForm() {
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

  public updateCourse() {
    if (this.FormGroup.valid) {
      this.courseService.putCourse(this.course).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Khóa học', 'Cập nhật khóa học thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, Cập nhật thất bại!');
      });
    } else {
      this.notificationService.showNotification(3, 'Khóa học', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
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

  public setData() {
    this.course.id = this.data._course.id;
    this.course.name = this.data._course.name;
    this.course.price = this.data._course.price;
    this.course.traingTime = this.data._course.traingTime;
    this.course.content = this.data._course.content;
    this.course.numberOfSession = this.data._course.numberOfSession;
    this.course.status = this.data._course.status;
    this.course.note = this.data._course.note;
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
