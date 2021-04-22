import { EditClassRoomComponent } from './admin/content/class-room/dialog/edit-class-room/edit-class-room.component';
import { EditReceiptTypeComponent } from './admin/content/receipt-types/dialog/edit-receipt-type/edit-receipt-type.component';
import { OnlyNumberDirective } from './admin/services/only-number.directive';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AddCourseDialogComponent } from './admin/content/course/dialog/add-course-dialog/add-course-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
import { BidiModule } from '@angular/cdk/bidi';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditCourseDialogComponent } from './admin/content/course/dialog/edit-course-dialog/edit-course-dialog.component';
import { DetailCourseDialogComponent } from './admin/content/course/dialog/detail-course-dialog/detail-course-dialog.component';
import { DatePipe, CurrencyPipe, CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { ConfirmDialogComponent } from './admin/extension-dialog/confirm-dialog/confirm-dialog.component';
import { AddReceiptTypeComponent } from './admin/content/receipt-types/dialog/add-receipt-type/add-receipt-type.component';
import { AddClassRoomComponent } from './admin/content/class-room/dialog/add-class-room/add-class-room.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// tslint:disable-next-line: max-line-length
import { EditPaysliptypeDialogComponent } from './admin/content/pay-slip-types/dialog/edit-paysliptype-dialog/edit-paysliptype-dialog.component';
// tslint:disable-next-line: max-line-length
import { AddPaysliptypeDialogComponent } from './admin/content/pay-slip-types/dialog/add-paysliptype-dialog/add-paysliptype-dialog.component';

import { PaySlipComponent } from './admin/content/pay-slip/pay-slip.component';
import { AddPayslipDialogComponent } from './admin/content/pay-slip/dialog/add-payslip-dialog/add-payslip-dialog.component';
import { EditPayslipDialogComponent } from './admin/content/pay-slip/dialog/edit-payslip-dialog/edit-payslip-dialog.component';
import { DetailPayslipDialogComponent } from './admin/content/pay-slip/dialog/detail-payslip-dialog/detail-payslip-dialog.component';
import { AddLanguageClassComponent } from './admin/content/language-classes/dialog/add-language-class/add-language-class.component';
import { EditLanguageClassComponent } from './admin/content/language-classes/dialog/edit-language-class/edit-language-class.component';
// tslint:disable-next-line: max-line-length
import { DetailLanguageClassComponent } from './admin/content/language-classes/dialog/detail-language-class/detail-language-class.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CKEditorModule } from 'ngx-ckeditor';
import { AddGuestDialogComponent } from './admin/content/guest-type/dialog/add-guest-dialog/add-guest-dialog.component';
import { EditGuestDialogComponent } from './admin/content/guest-type/dialog/edit-guest-dialog/edit-guest-dialog.component';
import { DetailStudyprocessComponent } from './admin/content/study-process/dialog/detail-studyprocess/detail-studyprocess.component';
import { EditStudyprocessComponent } from './admin/content/study-process/dialog/edit-studyprocess/edit-studyprocess.component';
import { ChangeClassComponent } from './admin/content/study-process/dialog/change-class/change-class.component';
import { BlockUIModule } from 'ng-block-ui';
import { InterceptorService } from './auth/interceptor.service';
import { AddClassComponent } from './admin/content/class/dialog/add-class/add-class.component';
import { EditClassComponent } from './admin/content/class/dialog/edit-class/edit-class.component';
import { AddUserDialogComponent } from './admin/content/user-management/dialog/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from './admin/content/user-management/dialog/update-user-dialog/update-user-dialog.component';
import { CreatPointComponent } from './admin/content/common-point/dialog/creat-point/creat-point.component';
import { DetailReceiptComponent } from './admin/content/search-studyprocess/dialog/detail-receipt/detail-receipt.component';
// tslint:disable-next-line: max-line-length
import { AddScheduleDialogComponent } from './admin/content/schedule-school/schedule-in-table/dialog/add-schedule-dialog/add-schedule-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ControlLearnerComponent } from './admin/content/learner/pages/control-learner/control-learner.component';
// tslint:disable-next-line: max-line-length
import { UpdateScheduleDialogComponent } from './admin/content/schedule-school/schedule-in-table/dialog/update-schedule-dialog/update-schedule-dialog.component';
import { CreatEndingPointComponent } from './admin/content/ending-point/creat-ending-point/creat-ending-point.component';
// tslint:disable-next-line: max-line-length
import { AddAttendanceDialogComponent } from './admin/content/attendance-sheet/dialog/add-attendance-dialog/add-attendance-dialog.component';
import { DeleteConfirmComponent } from './admin/confirmation-dialog/delete-confirm/delete-confirm.component';
import { DeleteCourseDialogComponent } from './admin/content/course/dialog/delete-course-dialog/delete-course-dialog.component';
import { DeleteDialogComponent } from './admin/content/delete-dialog/delete-dialog.component';
import { PickClassComponent } from './admin/content/schedule-school/schedule-in-table/dialog/pick-class/pick-class.component';
import { DetailReceiptBoComponent } from './admin/content/receipt/page/detail-receipt-bo/detail-receipt-bo.component';
import { DeleteReceiptComponent } from './admin/content/receipt/dialog/delete-receipt/delete-receipt.component';
// tslint:disable-next-line: max-line-length
import { CreateClassSecDialogComponent } from './admin/content/schedule-school/schedule-for-learner/dialog/create-class-sec-dialog/create-class-sec-dialog.component';
import { NgxPrintModule } from 'ngx-print';

// tslint:disable-next-line: max-line-length
import { ConfirmTranferComponent } from './admin/content/schedule-school/schedule-for-learner/dialog/confirm-tranfer/confirm-tranfer.component';
// tslint:disable-next-line: max-line-length
import { DeleteScheduleDialogComponent } from './admin/content/schedule-school/schedule-in-table/dialog/delete-schedule-dialog/delete-schedule-dialog.component';
// tslint:disable-next-line: max-line-length
import { AddOutAttendanceComponent } from './admin/content/attendance-sheet/dialog/add-attendance-dialog/add-out-attendance/add-out-attendance.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OnlyNumberDirective,

  ],
  imports: [
    AdminModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
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
    BidiModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    CKEditorModule,
    BlockUIModule.forRoot(),
    DragDropModule,
    NgxPrintModule,


  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false, direction: 'ltr' } },
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    AddCourseDialogComponent,
    EditCourseDialogComponent,
    DetailCourseDialogComponent,
    ConfirmDialogComponent,
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
    AddLanguageClassComponent,
    EditLanguageClassComponent,
    DetailLanguageClassComponent,
    AddGuestDialogComponent,
    EditGuestDialogComponent,
    DetailStudyprocessComponent,
    EditStudyprocessComponent,
    ChangeClassComponent,
    AddClassComponent,
    EditClassComponent,
    AddUserDialogComponent,
    UpdateUserDialogComponent,
    CreatPointComponent,
    DetailReceiptComponent,
    AddScheduleDialogComponent,
    ControlLearnerComponent,
    UpdateScheduleDialogComponent,
    CreatEndingPointComponent,
    AddAttendanceDialogComponent,
    DeleteConfirmComponent,
    DeleteCourseDialogComponent,
    DeleteDialogComponent,
    PickClassComponent,
    DetailReceiptBoComponent,
    DeleteReceiptComponent,
    CreateClassSecDialogComponent,
    ConfirmTranferComponent,
    DeleteScheduleDialogComponent,
    AddOutAttendanceComponent
  ]

})
export class AppModule {

  constructor(router: Router) {

  }
}
