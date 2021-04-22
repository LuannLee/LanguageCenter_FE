
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { ReceiptDetailService } from 'src/app/admin/services/Receipt-Detail.service';

@Component({
  selector: 'app-detail-receipt',
  templateUrl: './detail-receipt.component.html',
  styleUrls: ['./detail-receipt.component.css']
})
export class DetailReceiptComponent implements OnInit {

  public receiptDetails;
  public receiptId ;
  public tongtien;


   // tslint:disable-next-line: member-ordering
  // tslint:disable-next-line: max-line-length
  public displayedColumnsReceiptsDetail: string[] = ['index', 'languageClassName', 'month', 'tuition', 'fundMoney', 'infrastructureMoney', 'otherMoney', 'totalMoney'];
  // tslint:disable-next-line: member-ordering
  public dataSourceReceiptsDetail = new MatTableDataSource(this.receiptDetails);
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DetailReceiptComponent>,
    public dialog: MatDialog,
    public receiptDetailService: ReceiptDetailService,
  ) {
    this.setData();
  }

  ngOnInit() {
    this.getReceiptDetailsByReceiptId();
  }

  public setData() {
    this.receiptId = this.data._detail.id;
    this.tongtien = this.data._detail.totalAmount;
  }
   // chi tiết đóng họ
public getReceiptDetailsByReceiptId() {
  this.receiptDetailService.getReceiptsDetailById(this.receiptId).subscribe((result: any) => {
   this.receiptDetails = result;
   this.loadTablesReceiptsDetail(result);
  }, error => {
  });
}
public loadTablesReceiptsDetail(data2: any) {
  this.dataSourceReceiptsDetail = new MatTableDataSource(data2);
}



}
