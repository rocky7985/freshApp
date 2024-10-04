import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TodoTaskPageRoutingModule } from './todo-task-routing.module';

import { TodoTaskPage } from './todo-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TodoTaskPageRoutingModule
  ],
  declarations: [TodoTaskPage]
})
export class TodoTaskPageModule {}
