import { CourseService } from './../../../../services/course.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-course-dialog',
  templateUrl: './detail-course-dialog.component.html',
  styleUrls: ['./detail-course-dialog.component.css']
})
export class DetailCourseDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailCourseDialogComponent>,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

}
