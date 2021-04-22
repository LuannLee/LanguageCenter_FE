import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../services/extension/notification.service';
import { ConfirmService } from '../../services/extension/confirm.service';
import { ConstService } from '../../services/extension/Const.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  public message = '';
  public result = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteConfirmComponent>,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    public confirmService: ConfirmService
  ) {
    if (this.data) {
      this.message = this.data.message;
    }
  }

  ngOnInit() {
  }

  public sendResult() {
    this.confirmService.changeNotifi(true);
    ConstService.resultConfirm = true;
    this.dialogRef.close(true);
  }
}
