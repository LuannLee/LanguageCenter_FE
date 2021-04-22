import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-schedule-dialog',
  templateUrl: './delete-schedule-dialog.component.html',
  styleUrls: ['./delete-schedule-dialog.component.css']
})
export class DeleteScheduleDialogComponent implements OnInit {

  message = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteScheduleDialogComponent>,
  ) {
    this.message = this.data.message;
  }

  ngOnInit() {
  }

  sendResult() {
    this.dialogRef.close(true);
  }
}
