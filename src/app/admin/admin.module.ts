
import { AddGuestDialogComponent } from './content/guest-type/dialog/add-guest-dialog/add-guest-dialog.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { EditLanguageClassComponent } from './content/language-classes/dialog/edit-language-class/edit-language-class.component';
import { LanguageClassesComponent } from './content/language-classes/language-classes.component';
import { EditPaysliptypeDialogComponent } from './content/pay-slip-types/dialog/edit-paysliptype-dialog/edit-paysliptype-dialog.component';
import { AddReceiptTypeComponent } from './content/receipt-types/dialog/add-receipt-type/add-receipt-type.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './content/user-management/user-management.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { CourseComponent } from './content/course/course.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseDialogComponent } from './content/course/dialog/add-course-dialog/add-course-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditCourseDialogComponent } from './content/course/dialog/edit-course-dialog/edit-course-dialog.component';
import { DeleteCourseDialogComponent } from './content/course/dialog/delete-course-dialog/delete-course-dialog.component';
import { DetailCourseDialogComponent } from './content/course/dialog/detail-course-dialog/detail-course-dialog.component';
import { BidiModule } from '@angular/cdk/bidi';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ConfirmDialogComponent } from './extension-dialog/confirm-dialog/confirm-dialog.component';
import { PaySlipTypesComponent } from './content/pay-slip-types/pay-slip-types.component';
import { ClassRoomComponent } from './content/class-room/class-room.component';
import { ReceiptTypesComponent } from './content/receipt-types/receipt-types.component';
import { EditReceiptTypeComponent } from './content/receipt-types/dialog/edit-receipt-type/edit-receipt-type.component';
import { AddClassRoomComponent } from './content/class-room/dialog/add-class-room/add-class-room.component';
import { EditClassRoomComponent } from './content/class-room/dialog/edit-class-room/edit-class-room.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddPaysliptypeDialogComponent } from './content/pay-slip-types/dialog/add-paysliptype-dialog/add-paysliptype-dialog.component';
import { PaySlipComponent } from './content/pay-slip/pay-slip.component';
import { AddPayslipDialogComponent } from './content/pay-slip/dialog/add-payslip-dialog/add-payslip-dialog.component';
import { EditPayslipDialogComponent } from './content/pay-slip/dialog/edit-payslip-dialog/edit-payslip-dialog.component';
import { DetailPayslipDialogComponent } from './content/pay-slip/dialog/detail-payslip-dialog/detail-payslip-dialog.component';
import { AddLanguageClassComponent } from './content/language-classes/dialog/add-language-class/add-language-class.component';
import { DetailLanguageClassComponent } from './content/language-classes/dialog/detail-language-class/detail-language-class.component';
import { TimeSheetComponent } from './content/time-sheet/time-sheet.component';
import { StudyProcessComponent } from './content/study-process/study-process.component';
import { AddPageLearnerComponent } from './content/learner/pages/add-page-learner/add-page-learner.component';
import { AddLearnerClassComponent } from './content/add-learner-class/add-learner-class.component';
import { MaterialFileUploadComponent } from './extension-dialog/material-file-upload/material-file-upload.component';
import { GuestTypeComponent } from './content/guest-type/guest-type.component';
import { EditGuestDialogComponent } from './content/guest-type/dialog/edit-guest-dialog/edit-guest-dialog.component';
import { DetailStudyprocessComponent } from './content/study-process/dialog/detail-studyprocess/detail-studyprocess.component';
import { HomeComponent } from './content/home/home.component';
import { EditStudyprocessComponent } from './content/study-process/dialog/edit-studyprocess/edit-studyprocess.component';
import { ChangeClassComponent } from './content/study-process/dialog/change-class/change-class.component';
import { LecturersComponent } from './content/lecturers/lecturers.component';
import { AddPageLectureComponent } from './content/lecturers/page/add-page-lecture/add-page-lecture.component';
import { AddPersonnelComponent } from './content/personnel/page/add-personnel/add-personnel.component';
import { PersonnelComponent } from './content/personnel/personnel.component';
import { ControlsPersonnelComponent } from './content/personnel/page/controls-personnel/controls-personnel.component';
import { EditPageLectureComponent } from './content/lecturers/page/edit-page-lecture/edit-page-lecture.component';

import { BrowserModule } from '@angular/platform-browser';
import { JwPaginationComponent } from 'jw-angular-pagination';

import { ClassComponent } from './content/class/class.component';
import { AddClassComponent } from './content/class/dialog/add-class/add-class.component';
import { EditClassComponent } from './content/class/dialog/edit-class/edit-class.component';
import { AddUserDialogComponent } from './content/user-management/dialog/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './content/user-management/dialog/update-user-dialog/update-user-dialog.component';
import { CommonPointComponent } from './content/common-point/common-point.component';
import { SearchStudyprocessComponent } from './content/search-studyprocess/search-studyprocess.component';
import { PermissionsForUserComponent } from './content/user-management/permissions-for-user/permissions-for-user.component';
import { CreatPointComponent } from './content/common-point/dialog/creat-point/creat-point.component';
import { DetailReceiptComponent } from './content/search-studyprocess/dialog/detail-receipt/detail-receipt.component';
import { ScheduleForLearnerComponent } from './content/schedule-school/schedule-for-learner/schedule-for-learner.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScheduleInTableComponent } from './content/schedule-school/schedule-in-table/schedule-in-table.component';
// tslint:disable-next-line: max-line-length
import { AddScheduleDialogComponent } from './content/schedule-school/schedule-in-table/dialog/add-schedule-dialog/add-schedule-dialog.component';
import { LearnerComponent } from './content/learner/learner.component';
import { ControlLearnerComponent } from './content/learner/pages/control-learner/control-learner.component';
import { StatisticsComponent } from './content/statistics/statistics.component';
// tslint:disable-next-line: max-line-length
import { UpdateScheduleDialogComponent } from './content/schedule-school/schedule-in-table/dialog/update-schedule-dialog/update-schedule-dialog.component';
import { EndingPointComponent } from './content/ending-point/ending-point.component';
import { CreatEndingPointComponent } from './content/ending-point/creat-ending-point/creat-ending-point.component';
import { ReceiptComponent } from './content/receipt/receipt.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { AttendanceSheetComponent } from './content/attendance-sheet/attendance-sheet.component';
import { CreatReceiptComponent } from './content/receipt/page/creat-receipt/creat-receipt.component';
import { AddAttendanceDialogComponent } from './content/attendance-sheet/dialog/add-attendance-dialog/add-attendance-dialog.component';
import { DeleteConfirmComponent } from './confirmation-dialog/delete-confirm/delete-confirm.component';
import { PrivateInfoComponent } from './content/private-info/private-info.component';

import { RollPayComponent } from './content/roll-pay/roll-pay.component';
import { DeleteDialogComponent } from './content/delete-dialog/delete-dialog.component';
import { PickClassComponent } from './content/schedule-school/schedule-in-table/dialog/pick-class/pick-class.component';
import { DetailReceiptBoComponent } from './content/receipt/page/detail-receipt-bo/detail-receipt-bo.component';
import { DeleteReceiptComponent } from './content/receipt/dialog/delete-receipt/delete-receipt.component';
import { TestReportComponent } from './content/test-report/test-report.component';
// tslint:disable-next-line: max-line-length
import { CreateClassSecDialogComponent } from './content/schedule-school/schedule-for-learner/dialog/create-class-sec-dialog/create-class-sec-dialog.component';
import { ReportPeriodicPointComponent } from './content/report-periodic-point/report-periodic-point.component';
import { ReportEndingPointComponent } from './content/report-ending-point/report-ending-point.component';
import { ReportTuitionLearningComponent } from './content/report-tuition-learning/report-tuition-learning.component';
import { ReportNotPaidTuitionComponent } from './content/report-not-paid-tuition/report-not-paid-tuition.component';
import { ConfirmTranferComponent } from './content/schedule-school/schedule-for-learner/dialog/confirm-tranfer/confirm-tranfer.component';
import { TestReportNgcssComponent } from './content/test-report-ngcss/test-report-ngcss.component';
import { NgxPrintModule } from 'ngx-print';
import { ReportListlearnerClassComponent } from './content/report-listlearner-class/report-listlearner-class.component';
import { ReportRollpayPersonnelComponent } from './content/report-rollpay-personnel/report-rollpay-personnel.component';
import { ReportRollpayLecturersComponent } from './content/report-rollpay-lecturers/report-rollpay-lecturers.component';
// tslint:disable-next-line: max-line-length
import { DeleteScheduleDialogComponent } from './content/schedule-school/schedule-in-table/dialog/delete-schedule-dialog/delete-schedule-dialog.component';
import { ReportTimesheetLectureComponent } from './content/report-timesheet-lecture/report-timesheet-lecture.component';
import { ReportTimesheetPersonnelsComponent } from './content/report-timesheet-personnels/report-timesheet-personnels.component';
import { ReportAttendanceSheetComponent } from './content/report-attendance-sheet/report-attendance-sheet.component';
// tslint:disable-next-line: max-line-length
import { AddOutAttendanceComponent } from './content/attendance-sheet/dialog/add-attendance-dialog/add-out-attendance/add-out-attendance.component';
import { ReportPayslipsComponent } from './content/report-payslips/report-payslips.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatCardModule,
    MatCheckboxModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatBadgeModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    BidiModule,
    TextFieldModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    CKEditorModule,
    ReactiveFormsModule,
    BrowserModule,
    DragDropModule,
    MatChipsModule,
    NgxPrintModule



  ],
  declarations: [
    JwPaginationComponent,
    UserManagementComponent,
    CourseComponent,
    AdminManagementComponent,
    EditCourseDialogComponent,
    DeleteCourseDialogComponent,
    DetailCourseDialogComponent,
    AddCourseDialogComponent,
    ConfirmDialogComponent,
    PaySlipTypesComponent,
    ClassRoomComponent,
    ReceiptTypesComponent,
    AddReceiptTypeComponent,
    EditReceiptTypeComponent,
    AddClassRoomComponent,
    EditClassRoomComponent,
    EditPaysliptypeDialogComponent,
    AddPaysliptypeDialogComponent,
    PaySlipComponent,
    AddPayslipDialogComponent,
    EditPayslipDialogComponent,
    DetailPayslipDialogComponent,
    LanguageClassesComponent,
    AddLanguageClassComponent,
    EditLanguageClassComponent,
    DetailLanguageClassComponent,

    TimeSheetComponent,
    StudyProcessComponent,
    AddPageLearnerComponent,
    AddLearnerClassComponent,
    MaterialFileUploadComponent,
    GuestTypeComponent,
    AddGuestDialogComponent,
    EditGuestDialogComponent,
    HomeComponent,
    LecturersComponent,
    AddPageLectureComponent,
    DetailStudyprocessComponent,
    EditPageLectureComponent,
    EditStudyprocessComponent,
    ChangeClassComponent,
    AddPersonnelComponent,
    PersonnelComponent,
    ControlsPersonnelComponent,
    ClassComponent,
    AddClassComponent,
    EditClassComponent,
    AddUserDialogComponent,
    UpdateUserDialogComponent,
    CommonPointComponent,
    SearchStudyprocessComponent,
    PermissionsForUserComponent,
    CreatPointComponent,
    DetailReceiptComponent,
    ScheduleForLearnerComponent,
    ScheduleInTableComponent,
    AddScheduleDialogComponent,
    LearnerComponent,
    ControlLearnerComponent,
    StatisticsComponent,
    UpdateScheduleDialogComponent,
    EndingPointComponent,
    CreatEndingPointComponent,
    ReceiptComponent,
    DashboardComponent,
    AttendanceSheetComponent,
    CreatReceiptComponent,
    AddAttendanceDialogComponent,
    DeleteConfirmComponent,
    PrivateInfoComponent,
    RollPayComponent,
    DeleteDialogComponent,
    PickClassComponent,
    DetailReceiptBoComponent,
    DeleteReceiptComponent,
    TestReportComponent,
    CreateClassSecDialogComponent,
    ReportPeriodicPointComponent,
    ReportEndingPointComponent,
    ReportTuitionLearningComponent,
    ReportNotPaidTuitionComponent,
    ConfirmTranferComponent,
    TestReportNgcssComponent,
    ReportListlearnerClassComponent,
    ReportRollpayPersonnelComponent,
    ReportRollpayLecturersComponent,
    DeleteScheduleDialogComponent,
    ReportTimesheetLectureComponent,
    ReportTimesheetPersonnelsComponent,
    ReportAttendanceSheetComponent,
    AddOutAttendanceComponent,
    ReportPayslipsComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false, direction: 'ltr' } },
    DatePipe,
  ]
})
export class AdminModule { }
