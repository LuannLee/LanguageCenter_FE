import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { LanguageClassesService } from 'src/app/admin/services/language-classes.service';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/admin/services/extension/notification.service';
import { CourseService } from 'src/app/admin/services/course.service';

@Component({
  selector: 'app-detail-language-class',
  templateUrl: './detail-language-class.component.html',
  styleUrls: ['./detail-language-class.component.css']
})
export class DetailLanguageClassComponent implements OnInit {

  public courses;
  public status = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailLanguageClassComponent>,
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
        name: 'Khóa',
        value: 0
      }
    ];
  }

}
