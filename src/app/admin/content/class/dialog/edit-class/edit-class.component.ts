import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { CourseService } from 'src/app/admin/services/course.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {

  public class = {
    id: '',
    name: '',
    courseFee: null,
    monthlyFee: null,
    lessonFee: null,
    maxNumber: null,
    startDay: null,
    endDay: null,
    status: null,
    note: '',
    courseId: null,
    wageOfTutor: 0,
    wageOfLecturer: 0,
  };

  public courses;
  public status = [];
  public statusSelected;

  public classFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditClassComponent>,
    private languageClassesService: LanguageClassesService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private courseService: CourseService
  ) {
    this.setData();
  }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.classFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      courseFee: new FormControl(null, [Validators.required]),
      monthlyFee: new FormControl(null, [Validators.required]),
      lessonFee: new FormControl(null, [Validators.required]),
      startDay: new FormControl(null, [Validators.required]),
      endDay: new FormControl(null, [Validators.required]),
      maxNumber: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      courseId: new FormControl(null, [Validators.required]),
      note: new FormControl(),
      wageOfLecturer: new FormControl(),
      wageOfTutor: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.getCourses();
    this.initLectureForm();
  }

  public setData() {
    this.class.id = this.data._class.id;
    this.class.name = this.data._class.name;
    this.class.courseFee = this.data._class.courseFee;
    this.class.monthlyFee = this.data._class.monthlyFee;
    this.class.lessonFee = this.data._class.lessonFee;
    this.class.startDay = this.data._class.startDay;
    this.class.endDay = this.data._class.endDay;
    this.class.status = this.data._class.status;
    this.class.note = this.data._class.note;
    this.class.courseId = this.data._class.courseId;
    this.class.maxNumber = this.data._class.maxNumber;
    this.class.wageOfLecturer = this.data._class.wageOfLecturer;
    this.class.wageOfTutor = this.data._class.wageOfTutor;
  }

  public getCourses() {
    this.courseService.getAllCourses().subscribe(result => {
      this.courses = result;
    }, error => {
    });
  }

  public updateClass() {
    if (this.classFormGroup.valid) {
      this.languageClassesService.putLanguageClass(this.class).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Lớp học', 'Cập nhật lớp học thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, không cập nhật thành công!');
      });
    } else {
      this.notificationService.showNotification(3, 'Lớp học', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

  private getAllStatus() {
    this.status = [
      {
        name: 'Hoạt động',
        value: 1
      },
      {
        name: 'Kết thúc',
        value: 0
      },
      {
        name: 'Đã đầy',
        value: 2
      }
    ];
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
