import { NotificationService } from './../../../../services/extension/notification.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassroomService } from 'src/app/admin/services/classroom.service';

@Component({
  selector: 'app-add-class-room',
  templateUrl: './add-class-room.component.html',
  styleUrls: ['./add-class-room.component.css']
})
export class AddClassRoomComponent implements OnInit {
  screenHeight: any;
  screenWidth: any;

  public classRoom = {
    name: '',
    status: null,
    note: ''
  };

  public status = [];

  public statusSelected;
  public classRoomFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddClassRoomComponent>,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.classRoomFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      note: new FormControl()
    });
  }

  ngOnInit() {
    this.getAllStatus();
    this.initLectureForm();
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

  public createClassRoom() {
    if (this.classRoomFormGroup.valid) {
      this.classroomService.postClassRoom(this.classRoom).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Phòng học', 'Tạo thành công phòng học!'); });
        this.dialogRef.close(true);
      });
    } else {
      this.notificationService.showNotification(3, 'Phòng học', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

}
