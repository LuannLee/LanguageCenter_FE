import { ToastrService } from 'ngx-toastr';
import { Injectable, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from './notification.service';
import { DeleteConfirmComponent } from '../../confirmation-dialog/delete-confirm/delete-confirm.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService implements OnInit {

  private screenHeight;
  private screenWidth;
  private isOpenDialog = false;

  notifiSource = new BehaviorSubject<any>(null);
  currentNotifi = this.notifiSource.asObservable();
  public resultConfirm = false;

  constructor(
    private courseService: CourseService,
    public matDialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.screenWidth = (window.screen.width);
    this.screenHeight = (window.screen.height);
  }


  public openDeleteConfirmDialog() {
    if (!this.isOpenDialog) {
      this.isOpenDialog = true;
      const widthMachine = (this.screenWidth < 500) ? 0.5 * this.screenWidth : 0.3 * this.screenWidth;
      this.matDialog.open(DeleteConfirmComponent, {
        width: `${widthMachine}px`,
        data: {
        },
        disableClose: false
      }).afterClosed().subscribe(result => {
        this.isOpenDialog = false;
      });
    }
  }

  // tslint:disable-next-line: contextual-lifecycle
  ngOnInit() {

    this.notifiSource.subscribe(message => {
      this.resultConfirm = message;
      console.log(this.resultConfirm);

    });
  }


  changeNotifi(message) {
    this.notifiSource.next(message);
  }
}
