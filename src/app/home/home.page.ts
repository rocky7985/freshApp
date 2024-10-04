import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tasklist: any = [];
  searchTask: string = '';

  constructor(
    public CommonService: CommonserviceService,
    public router: Router
  ) { }

  ionViewWillEnter() {
    this.showTask();
  }

  logout() {
    localStorage.removeItem('login');
    this.CommonService.presentToast('Logout Successful');
    this.router.navigate(['/login']);
    console.log('Logout Clicked');
  }

  showTask() {
    const tasks = JSON.parse(localStorage.getItem('AllTask') || '[]');
    this.tasklist = tasks;
  }

  deleteTask(taskId: number) {
    const taskIndex = this.tasklist.findIndex((task: any) => task.TaskId == taskId);

    if (taskIndex > -1) {
      this.tasklist.splice(taskIndex, 1);
      localStorage.setItem('AllTask', JSON.stringify(this.tasklist));
      this.CommonService.presentToast('Task Deleted Successfully');
    }
  }

  deleteAlert(Id: number) {
    this.CommonService.presentAlert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteTask(Id);
          },
        },
      ]
    );
  }

  search() {
    if (this.searchTask.trim() !== '') {
      const task = JSON.parse(localStorage.getItem('AllTask') || '[]');
      const filterTask = task.filter((s: any) => {
        return s.Title.toLowerCase().includes(this.searchTask.toLowerCase()) ||
          s.Seller.toLowerCase().includes(this.searchTask.toLowerCase())
      });
      this.tasklist = filterTask;
    }
    else {
      this.showTask();
    }
  }

  updateTask(taskId:number){
    const findTask = this.tasklist.find((t:any)=> t.TaskId == taskId);
    this.router.navigate(['/update-task'], {
      queryParams: {
        TaskId: findTask.TaskId,
        Title: findTask.Title,
        Description: findTask.Description,
      }
    });
  }
}
