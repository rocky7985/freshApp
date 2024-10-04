import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTaskPage } from './todo-task.page';

describe('TodoTaskPage', () => {
  let component: TodoTaskPage;
  let fixture: ComponentFixture<TodoTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
