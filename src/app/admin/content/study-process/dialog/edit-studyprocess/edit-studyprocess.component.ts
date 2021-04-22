import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';

import { StudyProcessService } from 'src/app/admin/services/study-process.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-studyprocess',
  templateUrl: './edit-studyprocess.component.html',
  styleUrls: ['./edit-studyprocess.component.css']
})
export class EditStudyprocessComponent implements OnInit {

  public learnerInClass: any;

  public status1 = [];
  public temp;
  public editFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditStudyprocessComponent>,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private studyProcessService: StudyProcessService,
    private notificationService: NotificationService,

  ) {
    this.setData();
  }

  public format = {
    ngaysinh: null,
    ngayvao: null,
    ngayra: null,
  };

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.editFormGroup = new FormGroup({
      inDate: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });
  }



  ngOnInit() {
    this.Date();
    this.getAllStatus();
    this.initLectureForm();
  }

  public setData() {
    this.learnerInClass = JSON.stringify(this.data._learnerInClass);
    this.learnerInClass = JSON.parse(this.learnerInClass);
  }

  public updateStudyProcess() {
    if (this.editFormGroup.valid) {
      this.studyProcessService.put_studyProcess({
        id: this.learnerInClass.id,
        inDate: this.learnerInClass.inDate,
        outDate: this.learnerInClass.outDate,
        status: this.learnerInClass.status,
        dateCreated: this.learnerInClass.dateCreated,
        dateModified: this.learnerInClass.dateModified,
        languageClassId: this.learnerInClass.languageClassId,
        learnerId: this.learnerInClass.learnerId,
        note: this.learnerInClass.note,
      }).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Quá trình học tập', 'Cập nhật thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Quá trình học tập', 'Lỗi, Cập nhật không thành công!');
      });
    } else {
      this.notificationService.showNotification(2, 'Quá trình học tập', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

  public Date() {
    const ngaysinh = this.datePipe.transform(this.data._learnerInClass.learner.birthday, 'dd-MM-yyyy');
    const ngayra = this.datePipe.transform(this.data._learnerInClass.outDate, 'dd-MM-yyyy');
    const ngayvao = this.datePipe.transform(this.data._learnerInClass.inDate, 'dd-MM-yyyy');
    this.format.ngaysinh = ngaysinh;
    this.format.ngayra = ngayra;
    this.format.ngayvao = ngayvao;
  }

  private getAllStatus() {
    this.status1 = [
      {
        Name: 'Hoạt động',
        code: 1
      },
      {
        Name: 'Nghỉ',
        code: 0
      },
      {
        Name: 'Chuyển lớp',
        code: 2
      }];
  }
}
