import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassroomService } from 'src/app/admin/services/classroom.service';
@Component({
  selector: 'app-edit-class-room',
  templateUrl: './edit-class-room.component.html',
  styleUrls: ['./edit-class-room.component.css']
})
export class EditClassRoomComponent implements OnInit {

  public classRoom = {
    id: 0,
    name: '',
    status: null,
    note: ''
  };

  public status = [];
  public editFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditClassRoomComponent>,
    private classroomService: ClassroomService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.setData();
   }

  public setData() {
    this.classRoom.id = this.data._classRoom.id;
    this.classRoom.name = this.data._classRoom.name;
    this.classRoom.status = this.data._classRoom.status;
    this.classRoom.note = this.data._classRoom.note;
  }

  private initLectureForm() {          // bắt lỗi : edit thuộc tính
    this.editFormGroup = new FormGroup({
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

  public updateClassRoom() {
    if (this.editFormGroup.valid) {
      this.classroomService.putClassRoom(this.classRoom).subscribe(result => {
        setTimeout(() => { this.notificationService.showNotification(1, 'Phòng học', 'Cập nhật phòng học thành công!'); });
        this.dialogRef.close(true);
      }, error => {
        this.notificationService.showNotification(3, 'Phòng học', 'Lỗi, Cập nhật không thành công!');
      });
    } else {
      this.notificationService.showNotification(3, 'Phòng học', 'Lỗi, Vui lòng nhập đủ thông tin bắt buộc!');
    }
  }

}
