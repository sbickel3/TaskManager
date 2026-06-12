import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTask } from './add-task';
import { signal } from '@angular/core';
import { TaskDataService } from '../../services/TaskInformation/task-data';

describe('AddTask', () => {
  let component: AddTask;
  let fixture: ComponentFixture<AddTask>;

  beforeEach(async () => {
    const mockTaskDataService = {
      tasks: signal([]),
      addTask: () => {},
      deleteTask: () => {},
      updateTask: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [AddTask],
      providers: [
        { provide: TaskDataService, useValue: mockTaskDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTask); 
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
