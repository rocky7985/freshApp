import { Component } from '@angular/core';
import { CommonserviceService } from '../commonservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.page.html',
  styleUrls: ['./todo-task.page.scss'],
})
export class TodoTaskPage {

  title: any;
  description: any;
  selectedStudent: any = [];
  taskId: any;
  taskDetails: any = [];
  customers: any = [];

  constructor(
    public CommonService: CommonserviceService,
    public router: Router
  ) {
    this.loadCustomers();
  }

  loadCustomers() {
    const allUsers = JSON.parse(localStorage.getItem('signup') || '[]');
    this.customers = allUsers.filter((user: any) => user.role == 'customer');
  }

  addtask() {
    if (!this.selectedStudent) {
      console.log('No Customers selected to assign task to');
      return;
    }
    const user = JSON.parse(localStorage.getItem('login') || '[]');

    var newTask = {
      'Title': this.title,
      'Description': this.description,
      'TaskId': Math.floor(Math.random() * 100) + 1,
      'Seller': user.name,
      'CustomerId': this.selectedStudent,
      'SellerId': user.sellerId
      // 'CompletedTask': []
    }

    const tasklist = JSON.parse(localStorage.getItem('AllTask') || '[]');
    tasklist.push(newTask);
    localStorage.setItem('AllTask', JSON.stringify(tasklist));
    this.CommonService.presentToast('Task Assigned Successfully');
    this.resetForm();
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.selectedStudent = [];
  }
}
