import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-receipt',
  templateUrl: './delete-receipt.component.html',
  styleUrls: ['./delete-receipt.component.css']
})
export class DeleteReceiptComponent implements OnInit {
  message = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteReceiptComponent>,
  ) {
    this.message = this.data.message;

   }

  ngOnInit() {
  }
  sendResult() {
    this.dialogRef.close(true);
  }

}
