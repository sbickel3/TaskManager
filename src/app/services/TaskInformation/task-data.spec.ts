import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TaskDataService } from './task-data';
import { Task } from '../../model/Task';
import { vi } from 'vitest';

describe('TaskData', () => {
  let service: TaskDataService;
  let store: { [key: string]: string };

  beforeEach(() => {
    store = {};

    // Create a clean mock object that mirrors the Storage interface
    const mockLocalStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => store[key] = value,
      removeItem: (key: string) => delete store[key],
      clear: () => store = {},
      key: (index: number) => '',
      length: 0
    };

    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage, writable: true });
    vi.spyOn(window.localStorage, 'getItem');

    TestBed.configureTestingModule({
      providers: [
        TaskDataService,
        // Force the service to pass the 'isPlatformBrowser' check
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });
  });

it('should be created and initialize with an empty array if storage is blank', () => {
    service = TestBed.inject(TaskDataService);
    expect(service).toBeTruthy();
    expect(service.tasks()).toEqual([]);
  });

  it('should load initial tasks from localStorage if they exist', () => {
    const mockTasks: Task[] = [{ id: 1, title: 'Test Task', description: 'something' }];
    store['my_tasks_app'] = JSON.stringify(mockTasks);

    service = TestBed.inject(TaskDataService);

    expect(service.tasks()).toEqual(mockTasks);
  });
});


