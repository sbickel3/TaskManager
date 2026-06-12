import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteTask } from './delete-task';
import { signal } from '@angular/core';
import { TaskDataService } from '../../services/TaskInformation/task-data';

describe('DeleteTask', () => {
  let component: DeleteTask;
  let fixture: ComponentFixture<DeleteTask>;

  beforeEach(async () => {
    const mockTaskDataService = {
      tasks: signal([]),
      addTask: () => {},
      deleteTask: () => {},
      updateTask: () => {}
    };

    await TestBed.configureTestingModule({
      imports: [DeleteTask],
      providers: [
        { provide: TaskDataService, useValue: mockTaskDataService }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DeleteTask); 
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
