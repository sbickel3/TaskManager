import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateTask } from './update-task';
import { signal } from '@angular/core';
import { TaskDataService } from '../../services/TaskInformation/task-data';

describe('UpdateTask', () => {
  let component: UpdateTask;
  let fixture: ComponentFixture<UpdateTask>;

  beforeEach(async () => {
    const mockTaskDataService = {
      tasks: signal([]),
      addTask: () => {},
      deleteTask: () => {},
      updateTask: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [UpdateTask],
      providers: [
        { provide: TaskDataService, useValue: mockTaskDataService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(UpdateTask); 
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
