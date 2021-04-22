import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-detail-studyprocess',
  templateUrl: './detail-studyprocess.component.html',
  styleUrls: ['./detail-studyprocess.component.css']
})
export class DetailStudyprocessComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  public format = {
    ngaysinh: null,
    ngayvao: null,
    ngayra: null,
  };
  ngOnInit() {
      this.Date();
  }

  public Date() {
      const ngaysinh = this.datePipe.transform(this.data._learnerInClass.learner.birthday, 'dd-MM-yyyy');
      const ngayra = this.datePipe.transform(this.data._learnerInClass.outDate, 'dd-MM-yyyy');
      const ngayvao = this.datePipe.transform(this.data._learnerInClass.inDate, 'dd-MM-yyyy');
      this.format.ngaysinh = ngaysinh;
      this.format.ngayra = ngayra;
      this.format.ngayvao = ngayvao;
  }

}



