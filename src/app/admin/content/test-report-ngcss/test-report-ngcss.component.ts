import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-report-ngcss',
  templateUrl: './test-report-ngcss.component.html',
  styleUrls: ['./test-report-ngcss.component.css']
})
export class TestReportNgcssComponent implements OnInit {

  reportServer = 'http://myreportserver/reportserver';
  reportUrl = 'MyReports/SampleReport';
  showParameters = 'true';
  parameters: any = {
    SampleStringParameter: null,
    SampleBooleanParameter: false,
    SampleDateTimeParameter: '9/1/2017',
    SampleIntParameter: 1,
    SampleFloatParameter: '123.1234',
    SampleMultipleStringParameter: ['Parameter1', 'Parameter2']
  };
  language = 'en-us';
  width = 100;
  height = 100;
  toolbar = true;

  constructor() { }

  ngOnInit() {
  }



}
