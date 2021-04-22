import { Component, OnInit } from '@angular/core';
import { StudyProcessService } from '../../services/study-process.service';
import { LanguageClassesService } from '../../services/language-classes.service';
import { CourseService } from '../../services/course.service';
import { NotificationService } from '../../services/extension/notification.service';
import { ExchangeDataService } from '../../services/extension/exchange-data.service';
import { Router } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-report-listlearner-class',
  templateUrl: './report-listlearner-class.component.html',
  styleUrls: ['./report-listlearner-class.component.css']
})
export class ReportListlearnerClassComponent implements OnInit {

  public checkview = false;

  public courseSelectedId;
  public classSelectedId;
  public classList;
  public courseList;
  public learnerInClass;

  public class = {
    id: null,
    name: null,
    startDay: null,
    totalLearners: null,
    maxNumber: null,
    lecturerName: null,
  };

  constructor(
    private languageClassesService: LanguageClassesService,
    private courseService: CourseService,
    private studyProcessService: StudyProcessService,
    private scheduleService: ScheduleService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.getAllCourse();
    this.getAllClass();
  }

  public getAllCourse() {
    this.courseService.getAllCourses().subscribe((result: any) => {
      this.courseList = result;
    }, error => {
    });
  }

  public getAllClass() {
    this.languageClassesService.getAllLanguageClasses().subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public getClassByCourseId() {
    this.languageClassesService.getAllClassByCourse(this.courseSelectedId).subscribe((result: any) => {
      this.classList = result;
    }, error => {
    });
  }

  public hienthi() {
    if (this.classSelectedId != null ) {
      this.checkview = true;
    }
    // tslint:disable-next-line: one-line
    else {
      this.notificationService.showNotification(2, 'Báo cáo', 'Hãy chọn lớp');
    }
  }

  public getAddInfoClass() {
    this.getLearnerInClass();
    this.load_LectureName(this.classSelectedId);
    this.load_infor_Classes(this.classSelectedId);
  }

  // lấy danh sách học viên trong lớp
  public getLearnerInClass() {
    this.studyProcessService.getAll_byClassId(this.classSelectedId, 1).subscribe((result: any) => {
      this.learnerInClass = result;
      this.class.totalLearners = result.length;
    }, error => {
    });
  }

  public load_infor_Classes(classId) {
    // tslint:disable-next-line: triple-equals
    if (this.classSelectedId != null) {
      this.languageClassesService.getById(classId).subscribe((result: any) => {
        this.class.name = result.name;
        this.class.startDay = result.startDay;
        this.class.maxNumber = result.maxNumber;
      }, error => {
      });
    }
  }
  // lấy tên giáo viên theo mã lớp
  public load_LectureName(classId) {
    this.scheduleService.getScheduleByClass(classId).subscribe((result: any) => {
      this.class.lecturerName = result.lecturerName;
    }, error => {
    });
  }
}
