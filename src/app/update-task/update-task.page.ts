import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.page.html',
  styleUrls: ['./update-task.page.scss'],
})
export class UpdateTaskPage {
  updateTaskform: FormGroup;
  isSubmit: boolean = false;
  loginUser: any = [];
  taskdetails: any = [];
  taskId: number = 0;
  originalTask: any = [];

  constructor(
    public CommonService: CommonserviceService,
    public router: Router,
    public acroute: ActivatedRoute
  ) {
    this.updateTaskform = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ionViewWillEnter() {
    this.getlogin();
    this.getTask();
  }

  getlogin() {
    const user = JSON.parse(localStorage.getItem('login') || '[]');
    this.loginUser = user;
    console.log('LoginData:', this.loginUser);
  }

  getTask() {
    this.acroute.queryParams.subscribe((p: any) => {
      this.taskId = p['TaskId']; // Store TaskId
      const allTasks = JSON.parse(localStorage.getItem('AllTask') || '[]');
      this.originalTask = allTasks.find((task: any) => task.TaskId == this.taskId); 
      if (this.originalTask) {
        this.updateTaskform.patchValue({
          title: p['Title'],
          description: p['Description']
        });
      }
    });
  }

  updateTask() {
    if (this.updateTaskform.valid) {
      this.isSubmit = true;
      const updatedTask = {
        ...this.originalTask,
        Title: this.updateTaskform.value.title,
        Description: this.updateTaskform.value.description,
      }

      const alltask = JSON.parse(localStorage.getItem('AllTask') || '[]');
      const findIndex = alltask.findIndex((t: any) => t.TaskId == this.taskId);
      if (findIndex > -1) {
        alltask[findIndex] = updatedTask;
        localStorage.setItem('AllTask', JSON.stringify(alltask));
        this.CommonService.presentToast('Task Updated successfully');
        console.log('Updated Task:', alltask);
        this.isSubmit = false;
      }
      else {
        console.log('Error in updating the form');
        this.isSubmit = false;
      }
    }


  }
}
