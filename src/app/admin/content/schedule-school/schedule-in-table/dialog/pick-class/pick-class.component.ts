import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CourseService } from 'src/app/admin/services/course.service';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { AttendanceSheetService } from 'src/app/admin/services/attendance-sheet.service';

@Component({
  selector: 'app-pick-class',
  templateUrl: './pick-class.component.html',
  styleUrls: ['./pick-class.component.css']
})
export class PickClassComponent implements OnInit {

  public classes;
  public courseSelected;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PickClassComponent>,
    private courseService: CourseService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public languageClassesService: LanguageClassesService,
    public attendanceSheetService: AttendanceSheetService
  ) {
    this.courseSelected = this.data.courseSelected;
  }

  ngOnInit() {
    this.attendanceSheetService.getClassesByCoure(this.data.courseSelected).subscribe(result => {
      this.classes = result;
      console.log(result);
    }, error => {

    });
  }

  public chooseClass() {
    this.dialogRef.close();
  }
}
