import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTask } from './view-task';
import { signal } from '@angular/core';
import { TaskDataService } from '../../services/TaskInformation/task-data';

describe('ViewTask', () => {
  let component: ViewTask;
  let fixture: ComponentFixture<ViewTask>;

  beforeEach(async () => {
    const mockTaskDataService = {
      tasks: signal([]),
      addTask: () => {},
      deleteTask: () => {},
      updateTask: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [ViewTask],
      providers: [
        { provide: TaskDataService, useValue: mockTaskDataService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ViewTask); 
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
