import { NgModule } from '@angular/core';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { UserManagementComponent } from './content/user-management/user-management.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './content/course/course.component';
import { PaySlipTypesComponent } from './content/pay-slip-types/pay-slip-types.component';
import { ClassRoomComponent } from './content/class-room/class-room.component';
import { ReceiptTypesComponent } from './content/receipt-types/receipt-types.component';
import { PaySlipComponent } from './content/pay-slip/pay-slip.component';
import { TimeSheetComponent } from './content/time-sheet/time-sheet.component';
import { LanguageClassesComponent } from './content/language-classes/language-classes.component';
import { StudyProcessComponent } from './content/study-process/study-process.component';
import { AddPageLearnerComponent } from './content/learner/pages/add-page-learner/add-page-learner.component';
import { AddLearnerClassComponent } from './content/add-learner-class/add-learner-class.component';
import { GuestTypeComponent } from './content/guest-type/guest-type.component';
import { HomeComponent } from './content/home/home.component';
import { AddPageLectureComponent } from './content/lecturers/page/add-page-lecture/add-page-lecture.component';
import { AddPersonnelComponent } from './content/personnel/page/add-personnel/add-personnel.component';
import { ControlsPersonnelComponent } from './content/personnel/page/controls-personnel/controls-personnel.component';
import { LecturersComponent } from './content/lecturers/lecturers.component';
import { EditPageLectureComponent } from './content/lecturers/page/edit-page-lecture/edit-page-lecture.component';
import { PersonnelComponent } from './content/personnel/personnel.component';
import { ClassComponent } from './content/class/class.component';
import { CommonPointComponent } from './content/common-point/common-point.component';
import { SearchStudyprocessComponent } from './content/search-studyprocess/search-studyprocess.component';
import { ScheduleForLearnerComponent } from './content/schedule-school/schedule-for-learner/schedule-for-learner.component';
import { ScheduleInTableComponent } from './content/schedule-school/schedule-in-table/schedule-in-table.component';
import { LearnerComponent } from './content/learner/learner.component';
import { ControlLearnerComponent } from './content/learner/pages/control-learner/control-learner.component';
import { StatisticsComponent } from './content/statistics/statistics.component';
import { EndingPointComponent } from './content/ending-point/ending-point.component';
import { ReceiptComponent } from './content/receipt/receipt.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { AttendanceSheetComponent } from './content/attendance-sheet/attendance-sheet.component';
import { CreatReceiptComponent } from './content/receipt/page/creat-receipt/creat-receipt.component';
import { PrivateInfoComponent } from './content/private-info/private-info.component';
import { RollPayComponent } from './content/roll-pay/roll-pay.component';
import { DetailReceiptComponent } from './content/search-studyprocess/dialog/detail-receipt/detail-receipt.component';
import { DetailReceiptBoComponent } from './content/receipt/page/detail-receipt-bo/detail-receipt-bo.component';
import { TestReportComponent } from './content/test-report/test-report.component';
import { ReportPeriodicPointComponent } from './content/report-periodic-point/report-periodic-point.component';
import { ReportEndingPointComponent } from './content/report-ending-point/report-ending-point.component';
import { ReportTuitionLearningComponent } from './content/report-tuition-learning/report-tuition-learning.component';
import { ReportNotPaidTuitionComponent } from './content/report-not-paid-tuition/report-not-paid-tuition.component';
import { ReportListlearnerClassComponent } from './content/report-listlearner-class/report-listlearner-class.component';
import { ReportRollpayLecturersComponent } from './content/report-rollpay-lecturers/report-rollpay-lecturers.component';
import { ReportRollpayPersonnelComponent } from './content/report-rollpay-personnel/report-rollpay-personnel.component';
import { ReportTimesheetLectureComponent } from './content/report-timesheet-lecture/report-timesheet-lecture.component';
import { ReportTimesheetPersonnelsComponent } from './content/report-timesheet-personnels/report-timesheet-personnels.component';
import { ReportAttendanceSheetComponent } from './content/report-attendance-sheet/report-attendance-sheet.component';
import { ReportPayslipsComponent } from './content/report-payslips/report-payslips.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminManagementComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'user', component: UserManagementComponent },
          { path: 'course', component: CourseComponent },
          { path: 'pay-slip-type', component: PaySlipTypesComponent },
          { path: 'pay-slip', component: PaySlipComponent },
          { path: 'classroom', component: ClassRoomComponent },
          { path: 'receipt-type', component: ReceiptTypesComponent },
          { path: 'receipt', component: ReceiptComponent },
          { path: 'creat-receipt', component: CreatReceiptComponent },
          { path: 'time-sheet', component: TimeSheetComponent },
          { path: 'language-classes', component: LanguageClassesComponent },
          { path: 'add-learner-class', component: AddLearnerClassComponent },
          { path: 'study-process', component: StudyProcessComponent },
          { path: 'add-learner', component: AddPageLearnerComponent },
          { path: 'learners', component: LearnerComponent },
          { path: 'control-learner', component: ControlLearnerComponent },
          { path: 'statisc-learner', component: StatisticsComponent },
          { path: 'guest-type', component: GuestTypeComponent },
          { path: 'personnels', component: PersonnelComponent },
          { path: 'add-personnel', component: AddPersonnelComponent },
          { path: 'control-personnel', component: ControlsPersonnelComponent },
          { path: 'addlecturer', component: AddPageLectureComponent },
          { path: 'editlecturer', component: EditPageLectureComponent },
          { path: 'lecturer', component: LecturersComponent },
          { path: 'class-list', component: ClassComponent },
          { path: 'periodic-points', component: CommonPointComponent },
          { path: 'ending-points', component: EndingPointComponent },
          { path: 'roll-pay', component: RollPayComponent },
          { path: 'schedule', component: ScheduleForLearnerComponent },
          { path: 'attendance-sheet', component: AttendanceSheetComponent },
          { path: 'schedule-table', component: ScheduleInTableComponent },
          { path: 'search-learner', component: SearchStudyprocessComponent },
          { path: '', component: HomeComponent },
          { path: 'home', component: HomeComponent },
          { path: 'private-info', component: PrivateInfoComponent },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'report', component: TestReportComponent },
          { path: 'report-periodic', component: ReportPeriodicPointComponent },
          { path: 'report-ending', component: ReportEndingPointComponent },
          { path: 'report-tuition', component: ReportTuitionLearningComponent },
          { path: 'report-not-tuition', component: ReportNotPaidTuitionComponent },

          { path: 'report-listlearner-class', component: ReportListlearnerClassComponent },
          { path: 'report-rollpay-lecturers', component: ReportRollpayLecturersComponent },
          { path: 'report-rollpay-personnels', component: ReportRollpayPersonnelComponent },
          { path: 'report-timesheet-lecturers', component: ReportTimesheetLectureComponent },
          { path: 'report-timesheet-personnels', component: ReportTimesheetPersonnelsComponent },
          { path: 'report-attendance-sheet', component: ReportAttendanceSheetComponent },
          { path: 'report-payslips', component: ReportPayslipsComponent },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
