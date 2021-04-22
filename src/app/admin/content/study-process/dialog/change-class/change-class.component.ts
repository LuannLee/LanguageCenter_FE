import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { DatePipe } from '@angular/common';
import { StudyProcessService } from 'src/app/admin/services/study-process.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { CourseService } from 'src/app/admin/services/course.service';
@Component({
  selector: 'app-change-class',
  templateUrl: './change-class.component.html',
  styleUrls: ['./change-class.component.css']
})
export class ChangeClassComponent implements OnInit {

  public studyProcess;  // infor HV                          => xong
  public oldClass = null;               // infor Lớp cũ             => xong
  public oldCourse;             // infor khóa học tương ứng  => xong
  public classList;
  public newClass;          // lớp mới
  public newCourse;         // khóa học mới
  public tempClassId;       // id lớp để chuyển
  public courseId: any;

  public show = false;
  // no hope
  public receiptsDetail;           // find list by classId and learnerId   : lấy tổng số tiền đã đóng
  public tienConLai;
  public tienPhaiDong;

  public tempDisable = false;
  public status = [];
  public statusClass;
  public startDay1;

  public newstudyProcess = {    // dùng để chuyển lớp
    languageClassId: null,
    learnerId: null,
  };

  public oldstudyProcess = {    // dùng update status
    id: null,
    status: 2,
    note: null,
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ChangeClassComponent>,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private studyProcessService: StudyProcessService,
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,

  ) {
    this.studyProcess = JSON.stringify(this.data._learnerInClass);
    this.studyProcess = JSON.parse(this.studyProcess);
  }

  ngOnInit() {
    this.findOldClass();
    this.newstudyProcess.learnerId = this.studyProcess.learner.id;
    this.oldstudyProcess.id = this.studyProcess.id;
  }


  // find Class by id and Course
  public findOldClass() {
    this.languageClassesService.getById(this.studyProcess.languageClassId).subscribe((result: any) => {
      this.oldClass = result;
      this.courseId = result.courseId;
      this.newClass = result;
      this.findOldCourse();

    });
  }
  public findOldCourse() {
    this.courseService.findCourseId(this.oldClass.courseId).subscribe((result: any) => {
      this.oldCourse = result;
      this.newCourse = result;
      this.findClassByStatus(this.studyProcess.languageClassId, this.courseId);
    });
  }

  // load lên danh sách lớp : có status =1 và 2, khác mã lớp hiện tại ( khác mã lớp đã học) viết BE.
  public findClassByStatus(id, courseId) {
    // lớp có trạng thái 1,2 và khác mã lớp hiện tại , cùng khóa học, giá tiền
    this.languageClassesService.getClassChuyenLop(id, courseId).subscribe(result => {
      this.classList = result;
    });
  }

  public inforNewClass() {
    this.show = true;
    this.findNewClass();
    this.tempDisable = true;          // = true thì ms chuyển lớp
    this.newstudyProcess.languageClassId = this.tempClassId;
  }

  // find Class by id and Course
  public findNewClass() {
    this.languageClassesService.getById(this.tempClassId).subscribe((result: any) => {
      this.newClass = result;
      //  this.studyProcessUpdate.note = result.name;
      this.findNewCourse();
    });
  }

  public findNewCourse() {
    this.courseService.findCourseId(this.newClass.courseId).subscribe(result => {
      this.newCourse = result;
    });
  }

  public ChuyenLop() {
    //  console.log(this.newstudyProcess);
    //  console.log('bên trên là add, bên dưới là edit');
    // tạo 1 study process mới ( cần learnerId và classId)  => done
    console.log(this.oldstudyProcess.id);
    // thay đổi trạng thái status thành chuyển lớp ( = 2)
    this.studyProcessService.update_Status(this.oldstudyProcess.id, 2).subscribe(result => {
      setTimeout(() => { this.notificationService.showNotification(1, 'Chuyển lớp', 'Chuyển lớp thành công!'); });
      this.studyProcessService.post_studyProcess(this.newstudyProcess).subscribe(result1 => {
      }, error => {
      });
      this.dialogRef.close(true);
    }, error => {
      this.notificationService.showNotification(3, 'Chuyển lớp', 'Lỗi, chuyển lớp không thành công!');
    });

  }

}

