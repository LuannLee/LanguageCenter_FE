import { buildDayTable } from '@fullcalendar/timegrid/TimeGridView';
import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { LanguageClassesService } from '../../services/language-classes.service';
import { from } from 'rxjs';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.css']
})
export class TestReportComponent implements OnInit {

  public class;
  constructor(
    private languageClassesService: LanguageClassesService,
  ) { }

  ngOnInit() {
    this.getClass();
  }
  public getClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.class = result;
    }, error => {
    });
  }
  public testClick() {
    window.print();
  }
}
